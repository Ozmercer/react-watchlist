import React from 'react';
import './Toggle.scss';

interface Props {
    value: boolean;

    onChange(value: boolean): void;
}

const Toggle = (props: Props) => {
    return (
        <span className="Toggle">
            <input type="checkbox" id="switch" checked={props.value} onChange={event => props.onChange(event.target.checked)}/>
            <label htmlFor="switch"/>
        </span>
    );
};

export default Toggle;
