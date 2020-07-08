import React, {useEffect} from 'react';
import WatchList from './components/Watchlists/WatchList';
import userWatchListMarketInfo from './services/marketData';
import './App.scss';
import {useDispatch} from "react-redux";
import * as actions from './store/actions/index'

const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const watchListData = userWatchListMarketInfo();
    const userMarketNamePreference = JSON.parse(localStorage.getItem('marketNamesPreference')) || null;
    if(!userMarketNamePreference) {
      localStorage.setItem('marketNamesPreference', JSON.stringify({}));
    }
    dispatch(actions.setInstruments(watchListData));
    dispatch(actions.setFilteredInstruments(watchListData));
  }, [dispatch]);

  return(
    <div className="Platform">
      <WatchList />
    </div>
  )
};

export default App;
