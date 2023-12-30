import { TYPES } from '../types';

export const addTask = (task) => {
  return {
    type: TYPES.TASKS,
    payload: task
  };
};
