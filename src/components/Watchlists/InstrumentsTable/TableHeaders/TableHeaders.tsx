import React, {useEffect, useState} from 'react';
import {useSelector} from "react-redux";
import {RootState} from "../../../../store";

interface Props {
    columnTitles: { name: string, label: string, classes?: string[] }[];
    frozen?: boolean;
    scrollX?: number;
}

const TableHeaders = (props: Props) => {
    const is1Click = useSelector((state: RootState) => state.watchlist.is1Click);
    const [titles, setTitles] = useState();
    const {columnTitles} = props;

    useEffect(() => {
        // @ts-ignore
        return setTitles(columnTitles.map((title, i) => {
            if (title.name === 'quickTrade') {
                return (
                    <span className='td trade' key={i}>
                        <span className="size" style={{'opacity': is1Click ? 1 : 0}}>Size</span>
                        <span className="actions">
                            <span>Sell</span>
                            <span>Buy</span>
                        </span>
                    </span>
                );
            }

            const classes = ['td'];
            if (title.classes) {
                classes.push(...title.classes);
            }
            return <span className={classes.join(' ')} key={i}>{title.label}</span>;
        }));
    }, [columnTitles, is1Click]);

    const classes = ['titles', props.frozen ? 'frozen' : 'scroll'];
    const styles = props.scrollX ? {'left': -props.scrollX} : null;

    return (
        <div className={classes.join(' ')} style={styles}>
            {titles}
        </div>
    );
};

export default React.memo(TableHeaders);
