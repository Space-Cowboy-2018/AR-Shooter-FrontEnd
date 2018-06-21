import { createStore, combineReducers, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import player from './player';

const reducer = combineReducers({ player });

const middleware = applyMiddleware(createLogger({ collapsed: true }));

const store = createStore(reducer, middleware);

export default store;
