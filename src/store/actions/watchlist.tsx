import Instrument from "../../models/Instrument";
import {ActionTypes, WatchlistActionTypes} from "./actionTypes";
import {Column} from "../../models/Column";

export const setInstruments = (instruments: Instrument[]): WatchlistActionTypes => {
  return {
    type: ActionTypes.SET_INSTRUMENTS,
    instruments,
  }
};

export const setFilteredInstruments = (instruments: Instrument[]): WatchlistActionTypes => {
  return {
    type: ActionTypes.SET_FILTERED_INSTRUMENTS,
    instruments,
  }
};

export const set1Click = (is1Click: boolean): WatchlistActionTypes => {
  return {
    type: ActionTypes.SET_1_CLICK,
    value: is1Click,
  }
};

export const editColumns = (state: {hidden: boolean, frozen: boolean}, id) => {
  return {
    type: ActionTypes.EDIT_COLUMNS,
    state,
    id,
  }
};

export const reorderColumns = (columns: Column[]) => {
  return {
    type: ActionTypes.REORDER_COLUMNS,
    columns
  }
};
