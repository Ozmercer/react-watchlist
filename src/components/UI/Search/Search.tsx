import React from 'react';
import './Search.scss';

interface Props {
  searchMarkets(userInput: string): void,
}

const Search = (props: Props) => {
  return(
    <input
      id='WatchListMarketFilter'
      placeholder ='Find...'
      onChange = {e => props.searchMarkets(e.target.value)}
    />
  );
};

export default Search;
