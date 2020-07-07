import React from 'react';

interface Props {
    label: string;
    frozen: boolean;
    hidden: boolean;
    disabled?: boolean;

    changed(state: { hidden: boolean; frozen: boolean }): void;
}

const SettingItem = (props: Props) => {
    const onChangeHandler = (value) => {
        const changedObj = {
            hidden: props.hidden,
            frozen: props.frozen,
            ...value
        };
        props.changed(changedObj);
    };

    const classes = ['cols', props.disabled && 'disabled'];

    return (
        <div className={classes.join(' ')}>
            <span className="name">{props.label}</span>
            <span className="hidden">
                <input
                    disabled={props.disabled}
                    type="checkbox"
                    checked={props.hidden}
                    onChange={event => onChangeHandler({hidden: event.target.checked})}/>
            </span>
            <span className="frozen">
                <input
                    disabled={props.disabled}
                    type="checkbox"
                    checked={props.frozen}
                    onChange={event => onChangeHandler({frozen: event.target.checked})}/>
            </span>
        </div>
    );
};

export default SettingItem;
