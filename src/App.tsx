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
