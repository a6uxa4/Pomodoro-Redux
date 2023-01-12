import { CHANGE_STATE } from './action'

const localPomodorState = JSON.parse(localStorage.getItem('pomodorState'))

const initialState = {
	workTime: 25,
	shortBreak: 5,
	longBreak: 10,
	pomodoros: 4,
}

export const rootReducer = (
	state = localPomodorState ? localPomodorState : initialState,
	action,
) => {
	switch (action.type) {
		case CHANGE_STATE:
			return {
				...state,
				workTime: parseInt(action.obj.pomodoroInterval),
				shortBreak: parseInt(action.obj.shortBrake),
				longBreak: parseInt(action.obj.longBrake),
				pomodoros: parseInt(action.obj.pomodoros),
			}
		default:
			return state
	}
}
