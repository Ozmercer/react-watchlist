const userWatchListMarketInfo = () => {

    const marketNames = [
        'GBP/USD',
        'EUR/USD',
        'USD/JPY',
        'EUR/GBP',
        'AUD/USD',
        'USD/CAD',
        'EUR/JPY',
        'GBP/EUR',
        'USD/CHF',
        'EUR/CHF',
        'US Dollar Basket',
        'GBP/JPY',
        'EUR/CAD',
        'GBP/CHF',
        'CHF/JPY',
        'CAD/JPY',
        'GBP/CAD',
        'CAD/CHF',
        'USD/ZAR',
        'SGD/JPY',
        'USD/SGD',
    ];

    const getData = (baseValue: number) => {

      const open = (Math.random() * 0.7 + 0.6) * baseValue;// ±30% from base value
      const close = (Math.random() * 0.7 + 0.6) * baseValue; // ±30% from base value
      const high = (Math.random() * 0.3 + 1) * Math.max(open, close); //up to 30% above highest
      const low = (1 - Math.random() * 0.3) * Math.min(open, close);

      return {
        open: +open.toFixed(),
        close: +close.toFixed(),
        high: +high.toFixed(),
        low: +low.toFixed(),
        change: (+close.toFixed() - +open.toFixed()) / +open.toFixed()
      }
    };

    const getEpic = () => {
        return Math.random().toString();
    };

    const randomPercent = () => {
        return (Math.random() * 100).toFixed()
    };

    const getGrapgh = (open, close, high, low): number[] => {
        let points = [];

        for (let i = 0; i < 10; i++) {
            points.push(Math.random());
        }
        const min = Math.min(...points);
        points = points.map(point => point - min);                  // transpose min to 0
        const max = Math.max(...points);
        points = points.map(point => (point / max * (high - low)) + low);   // make range from low to high
        points.unshift(open);                                       // add open
        points.push(close);                                         // add close

        return points;
    };

    return marketNames.map(name => {
        const baseValueDay = (Math.random() * 800 + 200);
        const baseValueWeek = (Math.random() * 800 + 200);
        const baseValueMonth = (Math.random() * 800 + 200);
        const dataDay = getData(baseValueDay);
        const dataWeek = getData(baseValueWeek);
        const dataMonth = getData(baseValueMonth);
        return {
            instrumentName: name,
            changeDay: `${dataDay.change > 0 ? '+' : ''}${(dataDay.change * 100).toFixed(1)}%`,
            changeWeek: `${dataWeek.change > 0 ? '+' : ''}${(dataWeek.change * 100).toFixed(1)}%`,
            changeMonth: `${dataMonth.change > 0 ? '+' : ''}${(dataMonth.change * 100).toFixed(1)}%`,
            bid: (dataDay.close * 101.4).toFixed(1),
            ask: (dataDay.close * (100 - 1.4)).toFixed(1),
            positions: Math.floor(Math.random() * 10),
            profitLoss: Math.floor((Math.random() - 0.5) * 1000),
            epic: getEpic(),
            buySentiment: randomPercent(),
            candleData: {
              day: dataDay,
              week: dataWeek,
              month: dataMonth,
            },
            sparklineDay: getGrapgh(dataDay.open, dataDay.close, dataDay.high, dataDay.low),
            sparklineWeek: getGrapgh(dataWeek.open, dataWeek.close, dataWeek.high, dataWeek.low),
            sparklineMonth: getGrapgh(dataMonth.open, dataMonth.close, dataMonth.high, dataMonth.low),
            rsi: randomPercent(),
        }
    });
};

export default userWatchListMarketInfo;
