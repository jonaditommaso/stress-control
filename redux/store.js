import { configureStore } from '@reduxjs/toolkit';
import { tasksReducer } from './reducers/tasksReducer';
import { stressReducer } from './reducers/stressReducer';
import { stressSupportReducer } from './reducers/stressSupportReducer';
import { stressLevelsReducer } from './reducers/stressLevelsReducer';
import { containerColorsReducer } from './reducers/containerColorsReducer';

export const store = configureStore({
  reducer: {
    tasks: tasksReducer,
    stress: stressReducer,
    stressSupport: stressSupportReducer,
    stressLevels: stressLevelsReducer,
    containerColors: containerColorsReducer
  }
});
