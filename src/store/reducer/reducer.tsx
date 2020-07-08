import {ActionTypes} from "../actions/actionTypes";
import {updateObject} from "../../shared/utility";
import Instrument from "../../models/Instrument";
import {Column} from "../../models/Column";
import defaultColumns from "../../models/defaultColumns";

interface Action {
    type: any;
    [key: string]: any;
}

export interface WatchlistState {
    instruments: Instrument[];
    filteredInstruments: Instrument[];
    is1Click: boolean;
    columns: Column[];
    marketCustomNamesMap: {[key: string]: string};
}

const initialState: WatchlistState = {
    instruments: [],
    filteredInstruments: [],
    is1Click: true,
    columns: defaultColumns,
    marketCustomNamesMap: JSON.parse(localStorage.getItem('marketNamesPreference')) || {},
};

const setInstruments = (state: WatchlistState, action: Action) => {
  return updateObject(state, {instruments: action.instruments})
};

const setFilteredInstruments = (state: WatchlistState, action: Action) => {
  return updateObject(state, {filteredInstruments: action.instruments})
};

const set1Click = (state: WatchlistState, action: Action) => {
  return updateObject(state, {is1Click: action.value})
};

const editColumns = (state: WatchlistState, action: Action) => {
    const frozenColumns = [...state.columns.filter(col => col.frozen)];
    const otherColumns = [...state.columns.filter(col => !col.frozen)];
    const columns = [...frozenColumns, ...otherColumns];
    let updatedColumn: {} = columns.find(column => column.id === action.id);
    const updatedColumnIdx = columns.findIndex(column => column.id === action.id);
    updatedColumn = updateObject(updatedColumn, action.state);
    columns[updatedColumnIdx] = updatedColumn as Column;

    return updateObject(state, {columns: columns});
};

const reorderColumns = (state: WatchlistState, action: Action) => {
    return updateObject(state, {columns: action.columns});
};
const setMarketCustomNames = (state: WatchlistState, action: Action) => {
    localStorage.setItem('marketNamesPreference', JSON.stringify(action.map));
    return updateObject(state, {marketCustomNamesMap: action.map})
};

const reducer = ((state = initialState, action: Action) => {
    switch (action.type) {
    case ActionTypes.SET_INSTRUMENTS: return setInstruments(state, action);
    case ActionTypes.SET_FILTERED_INSTRUMENTS: return setFilteredInstruments(state, action);
    case ActionTypes.SET_1_CLICK: return set1Click(state, action);
    case ActionTypes.EDIT_COLUMNS: return editColumns(state, action);
    case ActionTypes.REORDER_COLUMNS: return reorderColumns(state, action);
    case ActionTypes.SET_MARKET_CUSTOM_NAMES: return setMarketCustomNames(state, action);
    default: return state
  }
});

export default reducer;
