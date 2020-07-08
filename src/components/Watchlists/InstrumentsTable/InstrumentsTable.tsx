import React, {useCallback, useEffect, useState} from 'react';
import TableColumns from "./TableColumns/TableColumns";
import './InstrumentsTable.scss';
import TableHeaders from "./TableHeaders/TableHeaders";
import {useSelector} from "react-redux";
import {RootState} from "../../../store";

const InstrumentsTable = () => {
    const [scrollX, setScrollX] = useState(0);
    const [frozenColumns, setFrozenColumns] = useState([]);
    const [otherColumns, setOtherColumns] = useState([]);
    const columns = useSelector((state: RootState) => state.watchlist.columns);

    useEffect(() => {
        const allColumns = columns.filter((col => !col.hidden));
        setFrozenColumns(allColumns.filter(column => column.frozen));
        setOtherColumns(allColumns.filter(column => !column.frozen));
    }, [columns]);

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
