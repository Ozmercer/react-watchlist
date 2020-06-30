import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { applyMiddleware, combineReducers, createStore, compose } from 'redux';
import thunk from 'redux-thunk';
import reducer from './store/reducer/reducer';
import { Provider } from 'react-redux';

// @ts-ignore
const composeEnhancers = (process.env.NODE_ENV === 'development' ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : null) || compose; 

const rootReducer = combineReducers({
  watchlist: reducer,
});

const store = createStore(rootReducer, composeEnhancers(
  applyMiddleware(thunk),
));

ReactDOM.render(
  <Provider store={store}>
    <React.StrictMode>
      <App/>
    </React.StrictMode>
  </Provider>,
  document.getElementById('root'),
);
