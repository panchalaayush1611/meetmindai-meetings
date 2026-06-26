import { createSlice, nanoid } from '@reduxjs/toolkit';
import { meetings as seedMeetings } from '../../data/meetings';

const initialState = {
  items: seedMeetings,
  filters: {
    status: 'all', // all | upcoming | processing | completed
    search: '',
    type: 'all',
  },
};

const meetingsSlice = createSlice({
  name: 'meetings',
  initialState,
  reducers: {
    setStatusFilter(state, action) {
      state.filters.status = action.payload;
    },
    setSearchFilter(state, action) {
      state.filters.search = action.payload;
    },
    setTypeFilter(state, action) {
      state.filters.type = action.payload;
    },
    addUploadedMeeting: {
      reducer(state, action) {
        state.items.unshift(action.payload);
      },
      prepare(fileName, id) {
        return {
          payload: {
            id: id || nanoid(8),
            title: fileName.replace(/\.[^/.]+$/, '') || 'Untitled meeting',
            type: 'Uploaded Recording',
            project: 'Unsorted',
            date: new Date().toISOString(),
            durationMinutes: null,
            status: 'processing',
            participants: [],
            tags: ['Uploaded'],
            riskLevel: null,
            healthScore: null,
          },
        };
      },
    },
    markMeetingCompleted(state, action) {
      const meeting = state.items.find((m) => m.id === action.payload);
      if (meeting) {
        meeting.status = 'completed';
        meeting.durationMinutes = meeting.durationMinutes ?? 32;
        meeting.healthScore = 76;
        meeting.riskLevel = 'low';
        meeting.summary =
          'AI summary generated from the uploaded recording. Key discussion points and action items have been extracted automatically — review and edit anything below.';
        meeting.actionItems = meeting.actionItems || [];
        meeting.transcript = meeting.transcript || [];
        meeting.comments = meeting.comments || [];
        meeting.healthBreakdown = meeting.healthBreakdown || [
          { label: 'Engagement', score: 74, note: 'Estimated from speaking-time distribution' },
          { label: 'Decision clarity', score: 78, note: 'Estimated from detected decisions' },
          { label: 'Follow-through risk', score: 75, note: 'Estimated from action item coverage' },
        ];
      }
    },
    addComment(state, action) {
      const { meetingId, text, author } = action.payload;
      const meeting = state.items.find((m) => m.id === meetingId);
      if (meeting) {
        if (!meeting.comments) meeting.comments = [];
        meeting.comments.push({
          id: nanoid(6),
          author,
          text,
          createdAt: new Date().toISOString(),
        });
      }
    },
  },
});

export const {
  setStatusFilter,
  setSearchFilter,
  setTypeFilter,
  addUploadedMeeting,
  markMeetingCompleted,
  addComment,
} = meetingsSlice.actions;

export default meetingsSlice.reducer;
