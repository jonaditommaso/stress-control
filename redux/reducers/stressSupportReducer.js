import { TYPES } from '../types';

const INITIAL_STATE = {
  stressSupport: 50
};

export const stressSupportReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case TYPES.STRESS_SUPPORT:
      return { ...state, stressSupport: action.payload };

    default:
      return state;
  }
};
