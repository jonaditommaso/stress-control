import { TYPES } from '../types';

const INITIAL_STATE = {
  tasks: []
};

export const tasksReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case TYPES.TASKS:
      return { ...state, tasks: [...state.tasks, action.payload] };

    default:
      return state;
  }
};
