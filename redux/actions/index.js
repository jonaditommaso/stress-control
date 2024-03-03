import { TYPES } from '../types';

export const addTask = (task) => {
  return {
    type: TYPES.ADD_TASK,
    payload: task
  };
};

export const removeTask = (tasks) => {
  return {
    type: TYPES.REMOVE_TASK,
    payload: tasks
  };
};

export const editTask = (tasks) => {
  return {
    type: TYPES.EDIT_TASK,
    payload: tasks
  };
};

export const updateStressLevelSupport = (stressSupport) => {
  return {
    type: TYPES.STRESS_SUPPORT,
    payload: stressSupport
  };
};

export const addRemoveStressLevel = (stressLevel) => {
  return {
    type: TYPES.STRESS_LEVELS,
    payload: stressLevel
  };
};

export const changeContainerColors = (colors) => {
  return {
    type: TYPES.CONTAINER_COLORS,
    payload: colors
  };
};

export const updateCurrentStress = (percent) => {
  return {
    type: TYPES.STRESS,
    payload: percent
  };
};
