import React, {useCallback, useEffect, useState} from 'react';
import './TableSettings.scss';
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../../store";
import SettingsItem from './SettingsItem/SettingsItem';
import * as actions from '../../../store/actions/index';
import {DragDropContext, Droppable, Draggable} from "react-beautiful-dnd";
import {Column} from "../../../models/Column";

const reorder = (list, startIndex, endIndex): Column[] => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result as Column[];
};

const getItemStyle = (isDragging, draggableStyle) => ({
    // some basic styles to make the items look a bit nicer
    userSelect: 'none',
    borderRadius: '5px',
    padding: '1px',
    fontSize: '0.8rem',
    lineHeight: '0.8rem',
    // change background colour if dragging
    background: isDragging ? "#dbffdd" : "initial",

    // styles we need to apply on draggables
    ...draggableStyle
});

interface Props {
    close(): void;
}

const TableSettings = (props: Props) => {
    const dispatch = useDispatch();
    const columns = useSelector((state: RootState) => state.watchlist.columns);
    const [settingItems, setSettingItems] = useState<JSX.Element[]>();

    const itemChangeHandler = useCallback((state, id) => {
        dispatch(actions.editColumns(state, id))
    }, [dispatch]);

    const onDragEnd = (result) => {
        const frozenLength = columns.filter(col => col.frozen).length;
        const draggedCol = columns.find(col => col.id === +result.draggableId);

        // dropped outside the list
        if (!result.destination || draggedCol.disabled) {
            return;
        }

        const items = reorder(
            columns,
            result.source.index,
            result.destination.index
        );

        if (draggedCol.frozen && result.destination.index >= frozenLength - 1) {
            items[result.destination.index].frozen = false;
        } else if (!draggedCol.frozen && result.destination.index < frozenLength) {
            items[result.destination.index].frozen = true;
        }
        dispatch(actions.reorderColumns(items))
    };

    const setDraggableItem = useCallback((column: Column) => {
        return (provided, snapshot) => (
            <div
                ref={provided.innerRef}
                {...provided.draggableProps}
                {...provided.dragHandleProps}
                style={getItemStyle(
                    snapshot.isDragging,
                    provided.draggableProps.style
                )}
            >
                <SettingsItem
                    label={column.label}
                    hidden={column.hidden}
                    frozen={column.frozen}
                    disabled={column.disabled}
                    changed={state => itemChangeHandler(state, column.id)}/>
            </div>
        )
    }, [itemChangeHandler]);

    useEffect(() => {
        const frozenItems = columns.filter(item => item.frozen)
            .map((column, i) => (
            <Draggable key={column.id} draggableId={column.id.toString()} index={i} isDragDisabled={column.disabled}>
                {setDraggableItem(column)}
            </Draggable>
        ));
        const otherItems = columns.filter(item => !item.frozen)
            .map((column, i) => (
            <Draggable key={column.id} draggableId={column.id.toString()} index={i + frozenItems.length}>
                {setDraggableItem(column)}
            </Draggable>
        ));
        setSettingItems([...frozenItems, <hr key="hr"/>, ...otherItems])
    }, [columns, itemChangeHandler, setDraggableItem]);

    return (
        <>
            <div className="TableSettings" onClick={event => event.stopPropagation()}>
                <div className="head">
                    <h3>Settings</h3>
                    <div className="btn-wrapper">
                        <button onClick={props.close}><img src="/assets/close.svg" alt="close"/></button>
                    </div>
                </div>
                <hr/>
                <div className="cols titles">
                    <span className="name">Name</span>
                    <span className="hidden">hidden</span>
                    <span className="frozen">frozen</span>
                </div>
                <div className="titles-list">
                    <DragDropContext onDragEnd={onDragEnd}>
                        <Droppable droppableId="dropabble">
                            {(provided) => (
                                <div
                                    {...provided.droppableProps}
                                    ref={provided.innerRef}>
                                    {settingItems}
                                    {provided.placeholder}
                                </div>
                            )}

                        </Droppable>
                    </DragDropContext>
                </div>
            </div>
            <div className="overlay"/>
        </>
    );
};

export default TableSettings;
