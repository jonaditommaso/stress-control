import { TYPES } from '../types';

const INITIAL_STATE = {
  stress: 70
};

export const stressReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case TYPES.STRESS:
      return { ...state, stress: action.payload };

    default:
      return state;
  }
};
