import { createSlice } from '@reduxjs/toolkit';
import { notifications as seedNotifications } from '../../data/notifications';

const initialState = {
  items: seedNotifications,
};

const notificationsSlice = createSlice({
  name: 'notifications',
  initialState,
  reducers: {
    markAsRead(state, action) {
      const n = state.items.find((item) => item.id === action.payload);
      if (n) n.read = true;
    },
    markAllAsRead(state) {
      state.items.forEach((n) => {
        n.read = true;
      });
    },
  },
});

export const { markAsRead, markAllAsRead } = notificationsSlice.actions;
export default notificationsSlice.reducer;
