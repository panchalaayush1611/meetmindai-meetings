import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import uiReducer from './slices/uiSlice';
import meetingsReducer from './slices/meetingsSlice';
import tasksReducer from './slices/tasksSlice';
import notificationsReducer from './slices/notificationsSlice';
import workspaceReducer from './slices/workspaceSlice';
import chatReducer from './slices/chatSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    ui: uiReducer,
    meetings: meetingsReducer,
    tasks: tasksReducer,
    notifications: notificationsReducer,
    workspace: workspaceReducer,
    chat: chatReducer,
  },
});
