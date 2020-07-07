import React, {useCallback, useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../../../store";
import WinnerSentimentField from "./WinnerSentimentField/WinnerSentimentField";
import CandleStickGraph from "./CandleStickGraph/CandleStickGraph";
import QuickTradeField from "./QuickTradeField/QuickTradeField";
import SparklineField from "./SparklineField/SparklineField";
import ClientPositionsData from "./ClientPositionsData/ClientPositionData";
import RsiField from "./RSIField/RSIField";
import MarketName from "./MarketName/MarketName";
import * as actions from '../../../../store/actions/index';

interface Props {
    columnTitles: { name: string, label: string, classes?: string[] }[];
    frozen?: boolean;
    scrollX?: number;
}

const TableColumns = (props: Props) => {
    const instruments = useSelector((state: RootState) => state.watchlist.filteredInstruments);
    const getMarketNickNames = useSelector((state: RootState) => state.watchlist.marketCustomNamesMap);
    const [rows, setRows] = useState([]);
    const dispatch = useDispatch();

    const {columnTitles} = props;
    const getSpan = (content: any, key: number, classes: string[] = []) => {
        const classNames = ['td', ...classes];
        return <span className={classNames.join(' ')} key={key}>{content}</span>
    };

    const setNewMarketName = useCallback((marketName: string, newMarketName: string) => {
        if (newMarketName) {
            getMarketNickNames.set(marketName, newMarketName);
        } else {
            getMarketNickNames.delete(marketName);
        }
        dispatch(actions.setMarketCustomNames(getMarketNickNames))
    }, [getMarketNickNames, dispatch]);

    useEffect(() => {
        const newRows = instruments.map((instrument, instrumentIndex) => {
            const row = [];
            columnTitles.forEach((title, titleIndex) => {
                switch (title.name) {
                    case 'instrumentName':
                        row.push(
                            getSpan(<MarketName
                                    setNewMarketName={setNewMarketName}
                                    marketNamesPreference={getMarketNickNames.get(instrument.instrumentName)}
                                    marketName={instrument.instrumentName}/>,
                                titleIndex, title.classes));
                        break;
                    case 'positions':
                        row.push(getSpan(<ClientPositionsData positionsData={[instrument.positions, instrument.profitLoss]}/>, titleIndex, title.classes));
                        break;
                    case 'buySentiment':
                        row.push(getSpan(<WinnerSentimentField value={instrument[title.name]}/>, titleIndex, title.classes));
                        break;
                    case 'quickTrade':
                        row.push(getSpan(<QuickTradeField instrument={instrument}/>, titleIndex, title.classes));
                        break;
                    case 'sparklineDay':
                        row.push(getSpan(<SparklineField points={instrument.sparklineDay}/>, titleIndex, title.classes));
                        break;
                    case 'sparklineWeek':
                        row.push(getSpan(<SparklineField points={instrument.sparklineWeek}/>, titleIndex, title.classes));
                        break;
                    case 'sparklineMonth':
                        row.push(getSpan(<SparklineField points={instrument.sparklineMonth}/>, titleIndex, title.classes));
                        break;
                    case 'candleStickGraphDay':
                        row.push(getSpan(<CandleStickGraph candleData={instrument.candleData.day}/>, titleIndex, title.classes));
                        break;
                    case 'candleStickGraphWeek':
                        row.push(getSpan(<CandleStickGraph candleData={instrument.candleData.week}/>, titleIndex, title.classes));
                        break;
                    case 'candleStickGraphMonth':
                        row.push(getSpan(<CandleStickGraph candleData={instrument.candleData.month}/>, titleIndex, title.classes));
                        break;
                    case 'rsi':
                        row.push(getSpan(<RsiField rsi={instrument.rsi}/>, titleIndex, title.classes));
                        break;
                    default:
                        row.push(getSpan(instrument[title.name], titleIndex, title.classes));
                }
            });

            return(
                <div className="marketItem" key={instrumentIndex}>
                    {row}
                </div>
            );
        });

        setRows(newRows);
    }, [instruments, columnTitles, setNewMarketName, getMarketNickNames]);

    const classes = ['body', props.frozen ? 'frozen' : 'scroll'];

    return (
        <div className={classes.join(' ')} style={{'left': props.scrollX}}>
            {rows}
        </div>
    );
};

export default React.memo(TableColumns);
