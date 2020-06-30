import React, {useEffect, useState} from 'react';
import {useSelector} from "react-redux";
import {RootState} from "../../../../store";
import WinnerSentimentField from "./WinnerSentimentField/WinnerSentimentField";
import CandleStickGraph from "./CandleStickGraph/CandleStickGraph";
import QuickTradeField from "./QuickTradeField/QuickTradeField";
import SparklineField from "./SparklineField/SparklineField";
import ClientPositionsData from "./ClientPositionsData/ClientPositionData";
import RsiField from "./RSIField/RSIField";

interface Props {
    columnTitles: {name: string, label: string, classes?: string[]}[];
    frozen?: boolean;
    scrollX?: number;
}

const TableColumns = (props: Props) => {
    const instruments = useSelector((state: RootState) => state.watchlist.filteredInstruments);
    const [rows, setRows] = useState([]);
    const {columnTitles} = props;

    const getSpan = (content: any, key: number, classes: string[] = []) => {
        const classNames = ['td', ...classes];
        return <span className={classNames.join(' ')} key={key}>{content}</span>
    };

    useEffect(() => {
        const newRows = instruments.map((instrument, i) => {
            const row = [];
            columnTitles.forEach((title, i) => {
                switch (title.name) {
                    case 'positions':
                        row.push(getSpan(<ClientPositionsData positionsData={[instrument.positions, instrument.profitLoss]}/>, i));
                        break;
                    case 'buySentiment':
                        row.push(getSpan(<WinnerSentimentField value={instrument[title.name]}/>, i));
                        break;
                    case 'quickTrade':
                        row.push(getSpan(<QuickTradeField instrument={instrument}/>, i, ['trade']));
                        break;
                    case 'sparklineDay':
                        row.push(getSpan(<SparklineField points={instrument.sparklineDay} />, i, ['static']));
                        break;
                    case 'sparklineWeek':
                      row.push(getSpan(<SparklineField points={instrument.sparklineWeek} />, i, ['static']));
                        break;
                    case 'sparklineMonth':
                      row.push(getSpan(<SparklineField points={instrument.sparklineMonth} />, i, ['static']));
                        break;
                    case 'candleStickGraphDay':
                        row.push(getSpan(<CandleStickGraph candleData={instrument.candleData.day}/>, i, ['static']));
                        break;
                    case 'candleStickGraphWeek':
                        row.push(getSpan(<CandleStickGraph candleData={instrument.candleData.week}/>, i, ['static']));
                        break;
                    case 'candleStickGraphMonth':
                        row.push(getSpan(<CandleStickGraph candleData={instrument.candleData.month}/>, i, ['static']));
                        break;
                    case 'rsi':
                        row.push(getSpan(<RsiField rsi={instrument.rsi}/>, i, title.classes));
                        break;
                    default: row.push(getSpan(instrument[title.name], i, title.classes));
                }

            });

            return <div className="marketItem" key={i}>{row}</div>;
        });

        setRows(newRows);
    }, [instruments, columnTitles]);

    const classes = ['body', props.frozen ? 'frozen' : 'scroll'];

    return (
        <div className={classes.join(' ')} style={{'left': props.scrollX}}>
            {rows}
        </div>
    );
};

export default TableColumns;
