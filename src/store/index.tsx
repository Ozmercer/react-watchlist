import Instrument from "../models/Instrument";
import {Column} from "../models/Column";

export interface RootState {
  watchlist: {
    instruments: Instrument[],
    filteredInstruments: Instrument[],
    is1Click: boolean,
    columns: Column[]
  }
}
