// ACTIONS
const SET_TARGET_POSITION = 'SET_TARGET_POSITION';
const SET_GAME_STATE = 'SET_GAME_STATE';
const SET_TIMER = 'SET_TIMER';

export const setTargetPosition = targetPosition => ({
  type: SET_TARGET_POSITION,
  targetPosition
});

export const setGameState = isOver => ({
  type: SET_GAME_STATE,
  isOver
});

export const setTimer = timer => ({
  type: SET_TIMER,
  timer
});

const initialState = {
  targetPosition: {},
  isOver: false,
  timer: 60
};

export default function(state = { initialState }, action) {
  switch (action.type) {
    case SET_TARGET_POSITION:
      return { ...state, targetPosition: action.targetPosition };
    case SET_GAME_STATE:
      return {
        ...state,
        targetPosition: { ...state.targetPosition },
        isOver: action.isOver
      };
    case SET_TIMER:
      return {
        ...state,
        targetPosition: { ...state.targetPosition },
        timer: action.timer
      };
    default:
      return state;
  }
}
