import { LuSun, LuMoon } from 'react-icons/lu';
import Card, { CardHeader } from '../common/Card';
import { useTheme } from '../../context/ThemeContext';
import { cn } from '../../utils/formatUtils';

const OPTIONS = [
  { value: 'light', label: 'Light', icon: LuSun },
  { value: 'dark', label: 'Dark', icon: LuMoon },
];

export default function ThemeSettings() {
  const { theme, setTheme } = useTheme();

  return (
    <Card>
      <CardHeader title="Theme" description="Customize how MeetMind looks on your device" />
      <div className="grid grid-cols-2 gap-3 max-w-md">
        {OPTIONS.map((opt) => (
          <button
            key={opt.value}
            onClick={() => setTheme(opt.value)}
            className={cn(
              'flex flex-col items-center gap-2 rounded-xl border-2 p-5 transition-colors',
              theme === opt.value
                ? 'border-primary bg-primary-light/40 dark:bg-blue-500/10'
                : 'border-surface-border dark:border-surface-border-dark hover:border-primary/30'
            )}
          >
            <opt.icon size={22} className={theme === opt.value ? 'text-primary' : 'text-ink-subtle dark:text-ink-subtle-dark'} />
            <span className="text-sm font-medium text-ink dark:text-ink-dark">{opt.label}</span>
          </button>
        ))}
      </div>
    </Card>
  );
}
