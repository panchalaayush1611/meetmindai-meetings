import { Link } from 'react-router-dom';
import { LuSparkles, LuFileText } from 'react-icons/lu';
import Avatar from '../common/Avatar';
import { ROUTES } from '../../constants/routes';
import { cn } from '../../utils/formatUtils';

export default function MessageBubble({ message, userName }) {
  const isUser = message.role === 'user';

  return (
    <div className={cn('flex items-start gap-3', isUser && 'flex-row-reverse')}>
      {isUser ? (
        <Avatar name={userName} size="sm" />
      ) : (
        <div className="h-8 w-8 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white shrink-0">
          <LuSparkles size={14} />
        </div>
      )}
      <div className={cn('max-w-[75%] flex flex-col gap-1.5', isUser && 'items-end')}>
        <div
          className={cn(
            'rounded-2xl px-4 py-2.5 text-sm leading-relaxed',
            isUser
              ? 'bg-primary text-white rounded-tr-sm'
              : 'bg-surface-muted dark:bg-surface-muted-dark text-ink dark:text-ink-dark rounded-tl-sm'
          )}
        >
          {message.text}
        </div>
        {message.sources?.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {message.sources.map((s) => (
              <Link
                key={s.meetingId}
                to={ROUTES.meetingDetails(s.meetingId)}
                className="flex items-center gap-1.5 text-xs text-ink-subtle dark:text-ink-subtle-dark border border-surface-border dark:border-surface-border-dark rounded-full px-2.5 py-1 hover:border-primary/40 hover:text-primary transition-colors"
              >
                <LuFileText size={11} />
                {s.meetingTitle}
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
