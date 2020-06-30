import React, {useCallback, useState} from 'react';
import TableColumns from "./TableColumns/TableColumns";
import './InstrumentsTable.scss';
import TableHeaders from "./TableHeaders/TableHeaders";
import {useSelector} from "react-redux";
import {RootState} from "../../../store";

const InstrumentsTable = () => {
    const [scrollX, setScrollX] = useState(0);
    const allColumns = useSelector((state: RootState) => state.watchlist.columns.filter(col => !col.hidden));

    const frozenColumns = allColumns.filter(column => column.frozen);
    const otherColumns = allColumns.filter(column => !column.frozen);

    const onScroll = useCallback( (e: React.UIEvent<HTMLElement>) => {
        setScrollX(e.currentTarget.scrollLeft)
    }, []);

    return (
        <div className="InstrumentsTable">
            <div className="thead">
                <TableHeaders columnTitles={frozenColumns} frozen={true} />
                <TableHeaders columnTitles={otherColumns} scrollX={scrollX} />
            </div>
            <div className="tbody" onScroll={onScroll}>
                <TableColumns columnTitles={frozenColumns} frozen={true} scrollX={scrollX} />
                <TableColumns columnTitles={otherColumns} />
            </div>
        </div>
    );
};

export default InstrumentsTable;
