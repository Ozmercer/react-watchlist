import React from 'react';
import './ClientPositionData.scss';

interface Props {
  positionsData: Array<any>
}

const ClientPositionData = (props: Props) => {

  const [ positions, profitLoss ] = props.positionsData;

  const profitLossClass = profitLoss < 0 ? 'loss' : 'profit';

  return(
    <div className='ClientPostionDataContainer'>
      <>
        {positions !== 0 ?
          <>
            <div className='numberOfPositionsIndicator'>
              <span>+{positions}</span>
            </div>
          <span className={profitLossClass}>{profitLoss > 0 ? `+£${profitLoss}` : `-£${profitLoss.toString().substr(1)}`}</span>
          </> :
          <span className='noPositions'>No positions</span>
        }
      </>
    </div>
  )
};

export default React.memo(ClientPositionData);
