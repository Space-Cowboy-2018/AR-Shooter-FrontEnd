import { createStore, combineReducers, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import player from './player';
import game from './game';
import currentRoom from './currentRoom';

const reducer = combineReducers({ player, game, currentRoom});

const middleware = applyMiddleware(createLogger({ collapsed: true }));

const store = createStore(reducer, middleware);

export default store;

export * from './currentRoom'
export * from './player';
export * from './game';
