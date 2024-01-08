import { TYPES } from '../types';

export const addTask = (task) => {
  return {
    type: TYPES.TASKS,
    payload: task
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
