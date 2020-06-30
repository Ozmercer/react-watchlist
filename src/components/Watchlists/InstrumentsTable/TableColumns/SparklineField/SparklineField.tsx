import React from 'react';
import {Sparklines, SparklinesLine} from 'react-sparklines';
import './SparklineField.scss'

interface Props {
    points: number[];
}

const SparklineField = (props: Props) => {
    const isUp = props.points[0] < props.points[props.points.length - 1];
    return (
        <div className="SparklineField">
            <Sparklines data={props.points} height={20} width={100}>
                <SparklinesLine color={isUp ? 'blue' : 'red'} />
            </Sparklines>
        </div>
           )
};

export default React.memo(SparklineField);
