import React from 'react';
import './WinnerSentimentField.scss';

interface Props {
    value: string;
}

const WinnerSentimentField = (props: Props) => {
    const value = 100 - +props.value;
    const size = 20;
    const strokewidth = 5;
    const halfsize = (size * 0.5);
    const radius = halfsize - (strokewidth * 0.5);
    const circumference = 2 * Math.PI * radius;
    const strokeval = ((value * circumference) / 100);
    const dashval = (strokeval + ' ' + circumference);

    const trackstyle = {strokeWidth: strokewidth};
    const indicatorstyle = {strokeWidth: strokewidth, strokeDasharray: dashval};
    const rotateval = 'rotate(-90 ' + halfsize + ',' + halfsize + ')';

    return (
        <span className="WinnerSentimentField">
            <svg width={size} height={size} className="donutchart">
                <circle r={radius} cx={halfsize} cy={halfsize} transform={rotateval} style={trackstyle} className="donutchart-track"/>
                <circle r={radius} cx={halfsize} cy={halfsize} transform={rotateval} style={indicatorstyle} className="donutchart-indicator"/>
            </svg>
            <span className="text">{props.value}% Buy</span>
        </span>
    );
};

export default React.memo(WinnerSentimentField);
