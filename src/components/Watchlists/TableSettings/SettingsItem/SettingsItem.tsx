import React from 'react';

interface Props {
    name: string;
    label: string;
    frozen: boolean;
    hidden: boolean;

    changed(state: {hidden: boolean; frozen: boolean}): void;
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

    return (
        <div className="cols">
            <span className="name">{props.label}</span>
            <span className="hidden"><input type="checkbox" checked={props.hidden}  onChange={event => onChangeHandler({hidden: event.target.checked})} /></span>
            <span className="frozen"><input type="checkbox" checked={props.frozen}  onChange={event => onChangeHandler({frozen: event.target.checked})} /></span>
        </div>
    );
};

export default SettingItem;
