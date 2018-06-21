// ACTIONS
const SET_NAME = 'SET_NAME';

const SET_POSITION = 'SET_POSITION';

const SET_DIRECTION = 'SET_DIRECTION';

const SET_HEALTH = 'SET_HEALTH';

// Action Creators
export const setName = name => ({ type: SET_NAME, name });

export const setPosition = position => ({ type: SET_POSITION, position });

export const setDirection = direction => ({ type: SET_DIRECTION, direction });

export const setHealth = health => ({ type: SET_HEALTH, health });

const initialState = {
  name: '',
  position: {},
  direction: {},
  health: 0
};

export default function(state = initialState, action) {
  switch (action.type) {
    default:
      return state;
  }
}
