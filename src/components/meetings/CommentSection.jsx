import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { LuSend } from 'react-icons/lu';
import { addComment } from '../../redux/slices/meetingsSlice';
import Avatar from '../common/Avatar';
import { timeAgo } from '../../utils/dateUtils';

export default function CommentSection({ meetingId, comments = [] }) {
  const [text, setText] = useState('');
  const dispatch = useDispatch();
  const user = useSelector((s) => s.auth.user);

  const submit = () => {
    if (!text.trim()) return;
    dispatch(addComment({ meetingId, text: text.trim(), author: user.name }));
    setText('');
  };

  return (
    <div className="space-y-4">
      {comments.length > 0 && (
        <ul className="space-y-4">
          {comments.map((c) => (
            <li key={c.id} className="flex gap-3">
              <Avatar name={c.author} size="sm" />
              <div className="flex-1 min-w-0">
                <div className="flex items-baseline gap-2">
                  <span className="text-sm font-medium text-ink dark:text-ink-dark">{c.author}</span>
                  <span className="text-xs text-ink-subtle dark:text-ink-subtle-dark">{timeAgo(c.createdAt)}</span>
                </div>
                <p className="text-sm text-ink-subtle dark:text-ink-subtle-dark mt-0.5">{c.text}</p>
              </div>
            </li>
          ))}
        </ul>
      )}

      <div className="flex items-start gap-3 pt-2">
        <Avatar name={user.name} size="sm" />
        <div className="flex-1 flex items-center gap-2">
          <input
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && submit()}
            placeholder="Leave a comment for your team..."
            className="flex-1 h-9 rounded-lg border border-surface-border dark:border-surface-border-dark bg-surface dark:bg-surface-dark text-sm px-3 outline-none focus:border-primary focus:ring-2 focus:ring-primary/15"
          />
          <button
            onClick={submit}
            disabled={!text.trim()}
            className="h-9 w-9 flex items-center justify-center rounded-lg bg-primary text-white disabled:opacity-40 hover:bg-primary-hover transition-colors"
          >
            <LuSend size={15} />
          </button>
        </div>
      </div>
    </div>
  );
}
