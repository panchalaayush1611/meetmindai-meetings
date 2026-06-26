export default function Timeline({ items = [] }) {
  if (items.length === 0) return null;
  return (
    <ol className="relative border-l border-surface-border dark:border-surface-border-dark ml-2 space-y-5">
      {items.map((item, i) => (
        <li key={i} className="ml-4 relative">
          <span className="absolute -left-[22px] top-1 h-2.5 w-2.5 rounded-full bg-primary ring-4 ring-surface-card dark:ring-surface-card-dark" />
          <span className="text-xs font-mono text-ink-subtle dark:text-ink-subtle-dark">{item.time}</span>
          <p className="text-sm text-ink dark:text-ink-dark mt-0.5">{item.label}</p>
        </li>
      ))}
    </ol>
  );
}
