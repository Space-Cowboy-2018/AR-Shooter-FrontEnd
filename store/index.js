import { createStore, combineReducers, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import player from './player';
import game form './game';

const reducer = combineReducers({ player, game });

const middleware = applyMiddleware(createLogger({ collapsed: true }));

const store = createStore(reducer, middleware);

export default store;
export * from './player';
export * from './game';
