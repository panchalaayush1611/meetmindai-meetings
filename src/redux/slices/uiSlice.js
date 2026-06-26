import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  sidebarCollapsed: false,
  uploadDialogOpen: false,
  inviteModalOpen: false,
  globalSearchOpen: false,
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    toggleSidebar(state) {
      state.sidebarCollapsed = !state.sidebarCollapsed;
    },
    setUploadDialogOpen(state, action) {
      state.uploadDialogOpen = action.payload;
    },
    setInviteModalOpen(state, action) {
      state.inviteModalOpen = action.payload;
    },
    setGlobalSearchOpen(state, action) {
      state.globalSearchOpen = action.payload;
    },
  },
});

export const { toggleSidebar, setUploadDialogOpen, setInviteModalOpen, setGlobalSearchOpen } = uiSlice.actions;
export default uiSlice.reducer;
