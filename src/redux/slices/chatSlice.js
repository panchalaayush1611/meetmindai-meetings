import { createSlice, nanoid } from '@reduxjs/toolkit';
import { chatHistory, suggestedPrompts } from '../../data/notifications';

const initialState = {
  conversations: chatHistory,
  activeConversationId: chatHistory[0]?.id ?? null,
  suggestedPrompts,
  isThinking: false,
};

const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    setActiveConversation(state, action) {
      state.activeConversationId = action.payload;
    },
    startNewConversation(state) {
      const id = nanoid(8);
      state.conversations.unshift({
        id,
        title: 'New conversation',
        updatedAt: new Date().toISOString(),
        messages: [],
      });
      state.activeConversationId = id;
    },
    sendUserMessage(state, action) {
      const convo = state.conversations.find((c) => c.id === state.activeConversationId);
      if (!convo) return;
      convo.messages.push({
        id: nanoid(8),
        role: 'user',
        text: action.payload,
        createdAt: new Date().toISOString(),
      });
      if (convo.messages.length === 1) {
        convo.title = action.payload.slice(0, 48);
      }
      convo.updatedAt = new Date().toISOString();
      state.isThinking = true;
    },
    receiveAssistantMessage(state, action) {
      const convo = state.conversations.find((c) => c.id === state.activeConversationId);
      if (!convo) return;
      convo.messages.push({
        id: nanoid(8),
        role: 'assistant',
        text: action.payload.text,
        sources: action.payload.sources || [],
        createdAt: new Date().toISOString(),
      });
      state.isThinking = false;
    },
  },
});

export const {
  setActiveConversation,
  startNewConversation,
  sendUserMessage,
  receiveAssistantMessage,
} = chatSlice.actions;

export default chatSlice.reducer;
