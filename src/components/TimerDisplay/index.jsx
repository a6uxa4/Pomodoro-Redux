import React from 'react';
import './TimerDisplay.css';

const TimeDisplay = (props) => {
    const radius = 150;
    const stroke = 5;
    const normalizedRadius = radius - stroke * 2;
    const circumference = normalizedRadius * 2 * Math.PI;
    const strokeDashoffset = circumference - (props.progress / 100) * circumference;

    return (
        <div className="TimeDisplay">
            <svg width="100%" viewBox={`0 0 ${radius * 2} ${radius * 2}`}>
                <circle
                    stroke="#ddd"
                    fill="#fff"
                    strokeWidth={stroke}
                    r={normalizedRadius}
                    cx={radius}
                    cy={radius}
                />
                <circle
                    stroke="#D9534F"
                    fill="transparent"
                    strokeWidth={stroke}
                    strokeDasharray={circumference + ' ' + circumference}
                    style={{ strokeDashoffset }}
                    r={normalizedRadius}
                    cx={radius}
                    cy={radius}
                />
            </svg>
            <div>
                {props.children}
                <p>Pomodoro Technique</p>
            </div>
        </div>
    );
};

export default TimeDisplay;
