// ACTIONS
const GET_NAME = 'GET_NAME';
const SET_NAME = 'SET_NAME';

const GET_POSITION = 'GET_POSITION';
const SET_POSITION = 'SET_POSITION';

const GET_DIRECTION = 'GET_DIRECTION';
const SET_DIRECTION = 'SET_DIRECTION';

const GET_HEALTH = 'GET_HEALTH';
const SET_HEALTH = 'SET_HEALTH';

// Action Creators
const getName = () => ({ type: GET_NAME });
const setName = name => ({ type: SET_NAME, name });

const getPosition = () => ({ type: GET_POSITION });
const setPosition = position => ({ type: SET_POSITION, position });

const getDirection = () => ({ type: GET_DIRECTION });
const setDirection = direction => ({ type: SET_DIRECTION, direction });

const getHealth = () => ({type: GET_HEALTH});
const setHealth = health => ({type: SET_HEALTH, health});

const initialState = {
  name: '',
  position: {},
  direction: {},
  health: 0
}

export default function(state = initialState, action) {
  switch(action.type) {
    default:
      return state;
  }
}
