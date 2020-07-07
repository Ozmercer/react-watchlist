import React, {useState} from 'react';
import './WatchList.scss';
import InstrumentsTable from "./InstrumentsTable/InstrumentsTable";
import Search from "../UI/Search/Search";
import Instrument from "../../models/Instrument";
import {useSelector, useDispatch} from "react-redux";
import {RootState} from '../../store';
import * as actions from '../../store/actions/index';
import Toggle from "../UI/Toggle/Toggle";
import TableSettings from "./TableSettings/TableSettings";

const WatchList = () => {
    const dispatch = useDispatch();
    const instruments = useSelector((state: RootState) => state.watchlist.instruments);
    const is1Click = useSelector((state: RootState) => state.watchlist.is1Click);
    const [showSettings, setShowSettings] = useState(false);

    const searchMarkets = (userInput: string) => {
        const filteredMarkets = instruments.filter((market: Instrument) => {
            return market.instrumentName.toUpperCase().includes(userInput.toUpperCase());
        });
        dispatch(actions.setFilteredInstruments(filteredMarkets));
    };

    return (
        <React.Fragment>
            <div className='WatchList'>
                <div className='WatchList_windowTop'>
                    <div className='WatchList_name'>
                        <span>WatchList 2020</span>
                    </div>
                </div>
                <div className='SearchBar'>
                    <div className="left">
                        <Search searchMarkets={searchMarkets}/>
                        <div className="toggle">
                            1-Click
                            <Toggle value={is1Click} onChange={value => dispatch(actions.set1Click(value))}/>
                        </div>
                    </div>
                    <div className="right">
                        <div className="settings" onClick={()=> setShowSettings(prevState => !prevState)}>
                            <img src="assets/settings.svg" alt="settings" height={20}/>
                            <div className="settings-popup" hidden={!showSettings}>
                                <TableSettings close={()=> setShowSettings(prevState => !prevState)}/>
                            </div>
                        </div>
                    </div>
                </div>
                <InstrumentsTable/>
            </div>
        </React.Fragment>
    )
};

export default WatchList;
