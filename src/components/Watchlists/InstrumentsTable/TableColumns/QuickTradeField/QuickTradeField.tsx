import React, {useState} from 'react';
import Instrument from "../../../../../models/Instrument";
import {useSelector} from "react-redux";
import {RootState} from "../../../../../store";
import './QuickTradeField.scss';

interface Props {
    instrument: Instrument
}

const QuickTradeField = (props: Props) => {
    const is1Click = useSelector((state: RootState) => state.watchlist.is1Click);
    const [size, setSize] = useState(0);
    const [direction, setDirection] = useState(null);
    const [price, setPrice] = useState(null);
    const [lotSize, setLotSize] = useState(null);

    let input = <span className="size"/>;

    if (is1Click) {
        input = (
            <input
                className="size"
                type="number"
                min={0}
                max={50}
                step={0.5}
                value={size}
                onChange={event => setSize(+event.target.value)}/>
        )
    }

    const transformPrice = (price: string) => {
        let leadBreak = price.length - 4;
        let tailbreak = price.length - 2;
        const lead = <small>{price.slice(0, leadBreak)}</small>;
        const bold = <span style={{'fontSize': '1rem'}}>{price.slice(leadBreak, tailbreak)}</span>;
        const tail = <small>{price.slice(tailbreak)}</small>;

        return <span>{lead}{bold}{tail}</span>
    };

    const submitHandler = (direction: string) => {
        if (!size || !is1Click) {
            return;
        }
        setLotSize(size);
        setDirection(direction);
        setPrice(props.instrument[direction === 'Sell' ? 'ask' : 'bid'].toString());
        setSize(0);

        setTimeout(() => {
            setDirection(null);
            setPrice(null);
            setLotSize(null)
        }, 3000)
    };

    const classes = ['buttons'];
    if (!is1Click) {
        classes.push('view')
    }

    let popup = null;
    if (direction) {
        popup = (
            <div className="popup">
                {direction} {lotSize} @ {price}
            </div>
        )
    }

    return (
        <div className="QuickTradeField">
            {input}
            <div className={classes.join(' ')}>
                <button
                    className="sell"
                    disabled={is1Click && !size}
                    onClick={() => submitHandler('Sell')}>
                    {transformPrice(props.instrument.ask.toString())}
                </button>
                <button
                    className="buy"
                    disabled={is1Click && !size}
                    onClick={() => submitHandler('Buy')}>
                    {transformPrice(props.instrument.bid.toString())}
                </button>
            </div>
            {popup}
        </div>
    );
};

export default React.memo(QuickTradeField);
