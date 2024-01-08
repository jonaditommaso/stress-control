import { TYPES } from '../types';

const INITIAL_STATE = {
  stressLevels: {
    low: true,
    medium: true,
    moderatelyHigh: false,
    high: true
  }
};

export const stressLevelsReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case TYPES.STRESS_LEVELS:
      return {
        ...state,
        stressLevels: {
          ...state.stressLevels,
          moderatelyHigh: action.payload
        }
      };

    default:
      return state;
  }
};
