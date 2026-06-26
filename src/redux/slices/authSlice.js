import { createSlice } from '@reduxjs/toolkit';
import { currentUser } from '../../data/members';

const initialState = {
  user: currentUser,
  isAuthenticated: false,
  workspaceName: 'Team Codeverse',
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login(state) {
      state.isAuthenticated = true;
    },
    logout(state) {
      state.isAuthenticated = false;
    },
    setWorkspaceName(state, action) {
      state.workspaceName = action.payload;
    },
  },
});

export const { login, logout, setWorkspaceName } = authSlice.actions;
export default authSlice.reducer;
