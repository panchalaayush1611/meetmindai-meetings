import { createSlice, nanoid } from '@reduxjs/toolkit';
import { members as seedMembers, roleDefinitions } from '../../data/members';

const initialState = {
  members: seedMembers,
  roleDefinitions,
};

const workspaceSlice = createSlice({
  name: 'workspace',
  initialState,
  reducers: {
    inviteMember: {
      reducer(state, action) {
        state.members.push(action.payload);
      },
      prepare(email, role) {
        const name = email.split('@')[0].replace(/[._]/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());
        return {
          payload: {
            id: nanoid(8),
            name,
            email,
            role,
            title: 'Pending',
            status: 'invited',
            joinedAt: null,
            meetingsAttended: 0,
          },
        };
      },
    },
    updateMemberRole(state, action) {
      const { id, role } = action.payload;
      const member = state.members.find((m) => m.id === id);
      if (member) member.role = role;
    },
    removeMember(state, action) {
      state.members = state.members.filter((m) => m.id !== action.payload);
    },
  },
});

export const { inviteMember, updateMemberRole, removeMember } = workspaceSlice.actions;
export default workspaceSlice.reducer;
