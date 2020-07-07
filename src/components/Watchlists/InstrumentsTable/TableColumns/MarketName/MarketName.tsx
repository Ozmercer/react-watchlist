import React, {useEffect, useState} from 'react';
import './MarketName.scss';

interface Props {
  marketName: string;
  marketNamesPreference: string;
  setNewMarketName(marketName: string, newMarketName: string): void,
}

const MarketName = (props: Props) => {
  const [isEditing, setIsEditing] = useState(false);
  const [marketName, setMarketName] = useState(props.marketNamesPreference);
  const [marketNamesPreference, setMarketNamesPreference] = useState(props.marketNamesPreference);
  const {marketName: propsMarketName, marketNamesPreference: propsMarketNamesPreference} = props;

  useEffect(() => {
    setMarketName(propsMarketName);
    setMarketNamesPreference(propsMarketNamesPreference);
  }, [propsMarketName, propsMarketNamesPreference]);

  const changeMarketName = (event) => {
    const element = event.currentTarget as HTMLInputElement;
    if(event.keyCode === 13 || event.type === 'blur') {       // keyCode 13 = ENTER
      event.preventDefault();
      if(element.value !== '') {
        props.setNewMarketName(props.marketName, element.value);
        setMarketName(element.value);
      } else {
        props.setNewMarketName(props.marketName, null);
        setMarketName(props.marketName);
      }
      setIsEditing(false);
    } else if (event.keyCode === 27) {                        // keyCode 27 = ESC
      setIsEditing(false)
    }
  };

  return(
    <div className='marketNameContainer'>
      {isEditing ?
        <input
          onKeyUp={changeMarketName}
          onBlur={changeMarketName}
          id='nickNameInput'
          defaultValue={marketNamesPreference || marketName}
          placeholder={marketName}
          autoFocus
        /> :
        <span>{marketNamesPreference || marketName}</span>
      }
      <div className='edit' onClick={()=> setIsEditing(!isEditing)}>
        <img src="/assets/edit.svg" alt="Edit"/>
      </div>
    </div>
  );
};

export default MarketName;
