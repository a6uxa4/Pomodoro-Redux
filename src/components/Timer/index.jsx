import React, { useState, useEffect } from 'react'
import TimerDisplay from '../TimerDisplay'
import SettingsBtn from '../SettingsBtn'
import Settings from '../SettingsModal'
import css from './Timer.module.css'
import bellSound from '../../audio/bell.flac'
import Swal from 'sweetalert2'
import InfoBtn from '../InfoBtn'
import Info from '../InfoModal'
import { Button, FormControlLabel, Checkbox } from '@material-ui/core'
import TextField from '@material-ui/core/TextField'
import { useDispatch, useSelector } from 'react-redux'
import { change_state } from '../../store/action'

function Timer() {

	const state = useSelector((state) => state)
	const dispatch = useDispatch()

  useEffect(() => {
    localStorage.setItem('pomodorState', JSON.stringify(state))
  },[state])

	// Here are time value hooks
	const [pomodoroInterval, setPomodoroInterval] = useState(state.workTime)
	const [shortBrake, setShortBrake] = useState(state.shortBreak)
	const [longBrake, setLongBreak] = useState(state.longBreak)
	const [pomodoros, setPomodoros] = useState(state.pomodoros)
	const [autoPlay, setAutoPlay] = useState(true)

	// Hooks for sounds
	const [bell] = useState(new Audio(bellSound))

	// Other hooks
	const [time, setTime] = useState(pomodoroInterval * 60)
	const [pomodoro, setPomodoro] = useState(1)
	const [restFlag, setRestFlag] = useState(false)
	const [buttonText, setButtonText] = useState('Pause')
	const [startStatus, setStartStatus] = useState(false)

	// Hooks for Modals
	const [settings, setSettings] = useState(false)
	const [info, setInfo] = useState(false)

	// Here is a temporary value for progress bar
	const [temporary, setTemporary] = useState(pomodoroInterval)

	useEffect(() => {
		if (startStatus) {
			if (buttonText === 'Pause') {
				if (time !== 0) {
					setTimeout(() => {
						setTime(time - 1)
					}, 1000)
				} else {
					bell.play()
					pomodoroCount()
				}
			}
		}
	})

	const start = () => {
		console.log('test')
		setStartStatus(true)
	}

	const minutes = Math.floor(time / 60)
	const seconds = time - minutes * 60

	function pomodoroCount() {
		let pomodoroCount = pomodoro
		let interval
		let flag
		if (pomodoro < pomodoros && !restFlag) {
			interval = shortBrake
			flag = true
			setTemporary(shortBrake)

			autoPlay === true &&
				Swal.fire({
					title: 'Time to have a rest',
					allowOutsideClick: false,
					onOpen: () => {
						setButtonText('Continue')
					},
					onClose: () => {
						setButtonText('Pause')
						blueBg()
					},
					allowEnterKey: true,
					confirmButtonColor: 'red',
				})
		} else if (pomodoro < pomodoros && restFlag) {
			pomodoroCount = pomodoro + 1
			interval = pomodoroInterval
			flag = false
			setTemporary(pomodoroInterval)

			autoPlay === true &&
				Swal.fire({
					title: 'Time to work',
					allowOutsideClick: false,
					onOpen: () => {
						setButtonText('Continue')
					},
					onClose: () => {
						setButtonText('Pause')
						redBg()
					},
					allowEnterKey: true,
					confirmButtonColor: 'blue',
				})
		} else if (pomodoro >= pomodoros) {
			pomodoroCount = 1
			interval = longBrake
			flag = true
			setTemporary(longBrake)
			blueBg()

			autoPlay === true &&
				Swal.fire({
					title: 'Time to have the longest break',
					allowOutsideClick: false,
					onOpen: () => {
						setButtonText('Continue')
					},
					onClose: () => {
						setButtonText('Pause')
					},
					allowEnterKey: true,
					confirmButtonColor: 'red',
				})
		}
		setPomodoro(pomodoroCount)
		setTime(interval * 60)
		setRestFlag(flag)
	}

	function pauseAndResume() {
		let newText
		if (buttonText === 'Pause') {
			newText = 'Continue'
		} else {
			newText = 'Pause'
		}
		setButtonText(newText)
	}

	// Func for progress bar
	const getProgress = () => {
		const current = time
		const total = temporary * 60
		return ((total - current) / total) * 100
	}

	const onModal = () => {
		return setSettings(true)
	}

	const onInfo = () => {
		return setInfo(true)
	}

	const onCheckBox = () => {
		return setAutoPlay(!autoPlay)
	}

	const reset = () => {
		if (buttonText === 'Continue') {
			setStartStatus(false)
			setRestFlag(false)
			setTime(temporary * 60)
			setButtonText('Pause')
		}
	}

	// Func for changing bg Color while a break
	const blueBg = () => {
		document.body.classList.remove('restout')
		document.body.classList.add('workout')
	}

	const redBg = () => {
		document.body.classList.remove('workout')
		document.body.classList.add('restout')
	}

	return (
		<div>
			<InfoBtn onclick={onInfo} />
			<SettingsBtn onclick={onModal} />

			<TimerDisplay time={pomodoroInterval} progress={getProgress()}>
				<h2 className={css.test}>
					{minutes < 10 ? `0${minutes}` : minutes} :{' '}
					{seconds < 10 ? `0${seconds}` : seconds}
				</h2>
			</TimerDisplay>
			<br />

			{startStatus ? (
				<div>
					<Button
						size='large'
						variant='outlined'
						onClick={pauseAndResume}
					>
						{buttonText}
					</Button>
					<Button
						size='large'
						title='Click <Pause> to reset'
						onClick={reset}
					>
						Reset
					</Button>
				</div>
			) : (
				<Button variant='outlined' onClick={start} size='large'>
					Start
				</Button>
			)}

			<Settings active={settings} onChange={onModal}>
				<h3>Settings</h3>
				<div>Pomodoro</div>
				<TextField
					id='standard-basic'
					variant='outlined'
					type='number'
					fullWidth
					value={pomodoroInterval}
					onChange={(e) => {
						setPomodoroInterval(e.target.value)
						setTime(e.target.value * 60)
						setTemporary(e.target.value)
					}}
				/>

				<div>Short Break</div>
				<TextField
					id='standard-basic'
					variant='outlined'
					fullWidth
					value={shortBrake}
					onChange={(e) => setShortBrake(e.target.value)}
					type='number'
				/>

				<div>Long Break</div>
				<TextField
					id='standard-basic'
					variant='outlined'
					fullWidth
					value={longBrake}
					onChange={(e) => setLongBreak(e.target.value)}
					type='number'
				/>

				<div>Pomodoro Count</div>
				<TextField
					id='standard-basic'
					variant='outlined'
					fullWidth
					value={pomodoros}
					onChange={(e) => {
						setPomodoros(e.target.value)
						console.log('count')
					}}
					type='number'
				/>

				<FormControlLabel
					control={
						<Checkbox
							checked={autoPlay}
							onChange={onCheckBox}
							value='checkedA'
						/>
					}
					label='Auto Play without push notifications'
				/>
				<br />

				<Button
					variant='outlined'
					size='large'
					color='primary'
					onClick={() => {
						dispatch(
							change_state({
								pomodoroInterval,
								longBrake,
								shortBrake,
								pomodoros,
							}),
						)
						setSettings(false)
					}}
				>
					All ok
				</Button>
			</Settings>

			<Info active={info} onChange={onInfo}>
				<h2>About Pomodoro Technique</h2>
				Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nihil
				labore sit quas nam repellat perspiciatis autem, distinctio
				suscipit ex, quae in fuga?
				<h2>Use Experience</h2>
				Lorem ipsum dolor sit amet consectetur adipisicing elit.
				Reiciendis aliquid cupiditate fugiat velit? Quam explicabo
				consequuntur, odio non qui recusandae vitae dolore nam odit eius
				maxime maiores voluptate quaerat provident?
				<br />
				<br />
				<Button
					variant='outlined'
					size='large'
					onClick={() => {
						setInfo(false)
						setPomodoro(1)
					}}
				>
					Close
				</Button>
			</Info>
		</div>
	)
}

export default Timer
