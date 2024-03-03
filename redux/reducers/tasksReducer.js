import { TYPES } from '../types';

const INITIAL_STATE = {
  tasks: []
};

export const tasksReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case TYPES.ADD_TASK:
      return { ...state, tasks: [...state.tasks, action.payload] };

    case TYPES.REMOVE_TASK:
      return { ...state, tasks: action.payload };

    case TYPES.EDIT_TASK:
      return { ...state, tasks: action.payload };

    default:
      return state;
  }
};
