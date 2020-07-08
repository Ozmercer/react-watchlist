import React, {useEffect, useRef, useState} from 'react';
import './MarketName.scss';
import ReactTooltip from "react-tooltip";

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
  const inputRef = useRef(null);
  const ellipsisRef = useRef(null);

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

  const onEdit = () => {
    setTimeout(() => {
      inputRef.current.select();
    }, 0)
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
          ref={inputRef}
        /> :
          <>
            <p ref={ellipsisRef} data-tip="" data-for={props.marketName}>{marketNamesPreference || marketName}</p>
            {ellipsisRef.current && ellipsisRef.current.scrollWidth > ellipsisRef.current.offsetWidth ? (
                <ReactTooltip id={props.marketName} effect="solid">
                  <small>{marketNamesPreference || marketName}</small>
                </ReactTooltip>
            ) : null}
          </>
      }
      <div className='edit' onClick={()=> setIsEditing(!isEditing)}>
        <img src="/assets/edit.svg" alt="Edit" onClick={onEdit}/>
      </div>
    </div>
  );
};

export default MarketName;
