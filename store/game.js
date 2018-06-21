// ACTIONS
const SET_TARGET_POSITION = 'SET_TARGET_POSITION';
const SET_GAME_STATE = 'SET_GAME_STATE';
const SET_TIMER = 'SET_TIMER';

const initialState = {
  targetPosition: {},
  isOver: false,
  timer: 60
};

export default function(state = { initialState }, action) {
  switch (action.type) {
    default:
      return state;
  }
}
