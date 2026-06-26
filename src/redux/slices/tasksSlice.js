import { createSlice } from '@reduxjs/toolkit';
import { tasks as seedTasks } from '../../data/tasks';

const initialState = {
  items: seedTasks,
};

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    setTaskStatus(state, action) {
      const { id, status } = action.payload;
      const task = state.items.find((t) => t.id === id);
      if (task) task.status = status;
    },
    toggleTaskDone(state, action) {
      const task = state.items.find((t) => t.id === action.payload);
      if (task) task.status = task.status === 'done' ? 'open' : 'done';
    },
  },
});

export const { setTaskStatus, toggleTaskDone } = tasksSlice.actions;
export default tasksSlice.reducer;
