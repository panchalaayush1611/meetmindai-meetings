import clsx from 'clsx';

// Tiny className combinator so components don't import clsx everywhere.
export const cn = (...args) => clsx(...args);

export const getInitials = (name = '') =>
  name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join('')
    .toUpperCase();

export const formatNumber = (num) => {
  if (num >= 1000) return `${(num / 1000).toFixed(1).replace(/\.0$/, '')}k`;
  return `${num}`;
};

export const formatPercent = (value, opts = {}) => {
  const sign = opts.showSign && value > 0 ? '+' : '';
  return `${sign}${value}%`;
};

// Deterministic-ish color assignment for avatars based on name, so the same
// person always gets the same color without storing it explicitly.
const AVATAR_PALETTE = [
  'bg-blue-100 text-blue-700',
  'bg-indigo-100 text-indigo-700',
  'bg-cyan-100 text-cyan-700',
  'bg-emerald-100 text-emerald-700',
  'bg-amber-100 text-amber-700',
  'bg-rose-100 text-rose-700',
  'bg-violet-100 text-violet-700',
  'bg-teal-100 text-teal-700',
];

export const getAvatarColor = (name = '') => {
  const code = name.split('').reduce((acc, ch) => acc + ch.charCodeAt(0), 0);
  return AVATAR_PALETTE[code % AVATAR_PALETTE.length];
};
