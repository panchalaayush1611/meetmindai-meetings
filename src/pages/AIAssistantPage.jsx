import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { LuSend, LuSparkles } from 'react-icons/lu';
import Card from '../components/common/Card';
import ConversationHistory from '../components/assistant/ConversationHistory';
import MessageBubble from '../components/assistant/MessageBubble';
import SuggestedPrompts from '../components/assistant/SuggestedPrompts';
import { sendUserMessage, receiveAssistantMessage, startNewConversation } from '../redux/slices/chatSlice';
import { generateAssistantReply } from '../services/mockApi';

export default function AIAssistantPage() {
  const dispatch = useDispatch();
  const { conversations, activeConversationId, suggestedPrompts, isThinking } = useSelector((s) => s.chat);
  const user = useSelector((s) => s.auth.user);
  const [input, setInput] = useState('');
  const bottomRef = useRef(null);

  const activeConvo = conversations.find((c) => c.id === activeConversationId);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [activeConvo?.messages?.length, isThinking]);

  const submit = async (text) => {
    const question = (text ?? input).trim();
    if (!question) return;
    if (!activeConversationId) dispatch(startNewConversation());
    dispatch(sendUserMessage(question));
    setInput('');
    const reply = await generateAssistantReply(question);
    dispatch(receiveAssistantMessage(reply));
  };

  return (
    <div className="h-[calc(100vh-7.5rem)] flex flex-col">
      <div className="mb-4">
        <h1 className="font-display font-bold text-2xl text-ink dark:text-ink-dark">AI Assistant</h1>
        <p className="text-sm text-ink-subtle dark:text-ink-subtle-dark mt-1">Ask anything about your meeting history.</p>
      </div>

      <Card padding={false} className="flex-1 flex overflow-hidden">
        <div className="w-60 border-r border-surface-border dark:border-surface-border-dark hidden md:block shrink-0">
          <ConversationHistory />
        </div>

        <div className="flex-1 flex flex-col min-w-0">
          <div className="flex-1 overflow-y-auto scrollbar-thin p-5 space-y-5">
            {!activeConvo || activeConvo.messages.length === 0 ? (
              <div className="max-w-lg mx-auto pt-8">
                <div className="h-12 w-12 rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white mx-auto mb-4">
                  <LuSparkles size={22} />
                </div>
                <p className="text-center text-sm text-ink-subtle dark:text-ink-subtle-dark mb-5">
                  Ask about decisions, action items, or risks across every meeting you've had.
                </p>
                <SuggestedPrompts prompts={suggestedPrompts} onSelect={submit} />
              </div>
            ) : (
              <>
                {activeConvo.messages.map((m) => (
                  <MessageBubble key={m.id} message={m} userName={user.name} />
                ))}
                {isThinking && (
                  <div className="flex items-center gap-2 text-sm text-ink-subtle dark:text-ink-subtle-dark pl-11">
                    <span className="flex gap-1">
                      <span className="h-1.5 w-1.5 rounded-full bg-ink-subtle dark:bg-ink-subtle-dark animate-bounce [animation-delay:-0.2s]" />
                      <span className="h-1.5 w-1.5 rounded-full bg-ink-subtle dark:bg-ink-subtle-dark animate-bounce" />
                      <span className="h-1.5 w-1.5 rounded-full bg-ink-subtle dark:bg-ink-subtle-dark animate-bounce [animation-delay:0.2s]" />
                    </span>
                  </div>
                )}
              </>
            )}
            <div ref={bottomRef} />
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              submit();
            }}
            className="flex items-center gap-2 p-4 border-t border-surface-border dark:border-surface-border-dark"
          >
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask MeetMind about any meeting..."
              className="flex-1 h-10 rounded-lg border border-surface-border dark:border-surface-border-dark bg-surface dark:bg-surface-dark text-sm px-3.5 outline-none focus:border-primary focus:ring-2 focus:ring-primary/15"
            />
            <button
              type="submit"
              disabled={!input.trim()}
              className="h-10 w-10 flex items-center justify-center rounded-lg bg-primary text-white disabled:opacity-40 hover:bg-primary-hover transition-colors shrink-0"
            >
              <LuSend size={16} />
            </button>
          </form>
        </div>
      </Card>
    </div>
  );
}
