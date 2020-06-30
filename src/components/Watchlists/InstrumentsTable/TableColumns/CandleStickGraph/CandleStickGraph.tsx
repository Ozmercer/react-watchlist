import React from 'react';
import './CandleStickGraph.scss';

interface Props {
  candleData: { open: number, high: number, low: number, close: number }
}

const CandleStickGraph = (props: Props) => {

  const { open, high, low, close } = props.candleData;

  const leftLine = high - close;
  const rightLine = open - low;
  const isUp = close > open;

  const classes = [
    'CandleStickGraph-container',
    isUp ? 'up' : 'down',
  ];

  return(
    <div className={classes.join(' ')}>
      <hr style={{width: leftLine}} />
      <div  id='rectangle'/>
      <hr style={{width: rightLine}} />
      <div className='CandleStickGraph-container_labels'>
        <span>{low}</span>
        <span>{high}</span>
      </div>
    </div>
  )
};

export default React.memo(CandleStickGraph);
