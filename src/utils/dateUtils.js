// Lightweight date helpers — no external date library needed for this scope.

export const daysFromNow = (offsetDays, hour = 10, minute = 0) => {
  const d = new Date();
  d.setDate(d.getDate() + offsetDays);
  d.setHours(hour, minute, 0, 0);
  return d.toISOString();
};

export const formatDate = (iso, opts = {}) => {
  const d = new Date(iso);
  return d.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: opts.withYear ? 'numeric' : undefined,
  });
};

export const formatTime = (iso) => {
  const d = new Date(iso);
  return d.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });
};

export const formatDuration = (minutes) => {
  if (minutes < 60) return `${minutes}m`;
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return m === 0 ? `${h}h` : `${h}h ${m}m`;
};

export const formatRelativeDay = (iso) => {
  const target = new Date(iso);
  const now = new Date();
  const startOfDay = (d) => new Date(d.getFullYear(), d.getMonth(), d.getDate());
  const diffDays = Math.round((startOfDay(target) - startOfDay(now)) / 86400000);

  if (diffDays === 0) return `Today, ${formatTime(iso)}`;
  if (diffDays === 1) return `Tomorrow, ${formatTime(iso)}`;
  if (diffDays === -1) return `Yesterday, ${formatTime(iso)}`;
  if (diffDays > 1 && diffDays < 7) {
    return `${target.toLocaleDateString('en-US', { weekday: 'long' })}, ${formatTime(iso)}`;
  }
  return `${formatDate(iso)}, ${formatTime(iso)}`;
};

export const timeAgo = (iso) => {
  const diffMs = Date.now() - new Date(iso).getTime();
  const mins = Math.round(diffMs / 60000);
  if (mins < 1) return 'just now';
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.round(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  const days = Math.round(hrs / 24);
  if (days < 7) return `${days}d ago`;
  return formatDate(iso);
};
