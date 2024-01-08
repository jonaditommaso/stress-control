import { TYPES } from '../types';

const INITIAL_STATE = {
  containerColors: {
    low: 0,
    medium: 0,
    // moderatelyHigh: false,
    high: 0
  }
};

export const containerColorsReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case TYPES.CONTAINER_COLORS:
      return { ...state, containerColors: action.payload };

    default:
      return state;
  }
};
