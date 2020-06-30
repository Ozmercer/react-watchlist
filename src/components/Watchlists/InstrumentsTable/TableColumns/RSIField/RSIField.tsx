import React from 'react';

interface Props {
    rsi: string;
}

const RsiField = (props: Props) => {
    return (
        <span className="RSIField">
            {props.rsi}
        </span>
    );
};

export default React.memo(RsiField);
