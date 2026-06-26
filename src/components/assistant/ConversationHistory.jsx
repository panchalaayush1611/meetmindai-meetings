import { useDispatch, useSelector } from 'react-redux';
import { LuPlus, LuMessageSquare } from 'react-icons/lu';
import { setActiveConversation, startNewConversation } from '../../redux/slices/chatSlice';
import { timeAgo } from '../../utils/dateUtils';
import { cn } from '../../utils/formatUtils';

export default function ConversationHistory() {
  const dispatch = useDispatch();
  const { conversations, activeConversationId } = useSelector((s) => s.chat);
  const sorted = [...conversations].sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));

  return (
    <div className="flex flex-col h-full">
      <div className="p-3">
        <button
          onClick={() => dispatch(startNewConversation())}
          className="w-full flex items-center justify-center gap-2 h-9 rounded-lg border border-dashed border-surface-border dark:border-surface-border-dark text-sm font-medium text-ink-subtle dark:text-ink-subtle-dark hover:border-primary/50 hover:text-primary transition-colors"
        >
          <LuPlus size={15} />
          New conversation
        </button>
      </div>
      <div className="flex-1 overflow-y-auto scrollbar-thin px-2 space-y-0.5">
        {sorted.map((c) => (
          <button
            key={c.id}
            onClick={() => dispatch(setActiveConversation(c.id))}
            className={cn(
              'w-full flex items-start gap-2.5 rounded-lg px-2.5 py-2.5 text-left transition-colors',
              c.id === activeConversationId
                ? 'bg-primary-light dark:bg-blue-500/10 text-primary'
                : 'text-ink-subtle dark:text-ink-subtle-dark hover:bg-surface-muted dark:hover:bg-surface-muted-dark hover:text-ink dark:hover:text-ink-dark'
            )}
          >
            <LuMessageSquare size={15} className="mt-0.5 shrink-0" />
            <div className="min-w-0">
              <p className="text-[13px] font-medium truncate">{c.title}</p>
              <p className="text-[11px] opacity-70">{timeAgo(c.updatedAt)}</p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
