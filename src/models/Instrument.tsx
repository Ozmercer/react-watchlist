interface CellData {
  open: number,
  close: number,
  high: number,
  low: number,
  change: number
}

interface Instrument {
    instrumentName: string;
    changeDay: string;
    changeWeek: string;
    changeMonth: string;
    bid: string | number;
    ask: string | number;
    positions: string | number;
    profitLoss: string | number;
    candleData: {
      day: CellData,
      week: CellData,
      month: CellData
    };
    sparklineDay: number[];
    sparklineWeek: number[];
    sparklineMonth: number[];
    rsi: string;
    value: any;
}

export default Instrument;
