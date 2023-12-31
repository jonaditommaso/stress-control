import { configureStore } from '@reduxjs/toolkit';
import { tasksReducer } from './reducers/tasksReducer';
import { stressReducer } from './reducers/stressReducer';

export const store = configureStore({
  reducer: {
    tasks: tasksReducer,
    stress: stressReducer
  }
});
