import Instrument from "../../models/Instrument";
import {Column} from "../../models/Column";

export enum ActionTypes {
  SET_INSTRUMENTS = 'SET_INSTRUMENTS',
  SET_FILTERED_INSTRUMENTS = 'SET_FILTERED_INSTRUMENTS',
  SET_1_CLICK = 'SET_1_CLICK',
  EDIT_COLUMNS = 'EDIT_COLUMNS',
  REORDER_COLUMNS = 'REORDER_COLUMNS',
  SET_MARKET_CUSTOM_NAMES = 'SET_MARKET_CUSTOM_NAMES',
}

interface GetInstruments {
  type: ActionTypes;
  instruments: Instrument[];
}

interface Set1Click {
  type: ActionTypes;
  value: boolean;
}

interface EditColumns {
  type: ActionTypes;
  value: { hidden: boolean, frozen: boolean, id: number };
}

interface RedorderColumns {
  type: ActionTypes;
  columns: Column[];
}

interface SetMarketCustomNames {
  type: ActionTypes;
  map: Map<string, string>;
}

export type WatchlistActionTypes = GetInstruments | Set1Click | EditColumns | RedorderColumns | SetMarketCustomNames;
