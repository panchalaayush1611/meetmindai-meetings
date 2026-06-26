import { useSelector } from 'react-redux';
import Card, { CardHeader } from '../common/Card';
import { cn } from '../../utils/formatUtils';

const WEEKDAYS = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

export default function CalendarPreviewWidget() {
  const meetings = useSelector((s) => s.meetings.items);
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth();

  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const meetingDays = new Set(
    meetings
      .map((m) => new Date(m.date))
      .filter((d) => d.getFullYear() === year && d.getMonth() === month)
      .map((d) => d.getDate())
  );

  const cells = [...Array(firstDay).fill(null), ...Array.from({ length: daysInMonth }, (_, i) => i + 1)];
  const monthLabel = today.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });

  return (
    <Card>
      <CardHeader title="Calendar" description={monthLabel} />
      <div className="grid grid-cols-7 gap-1 text-center">
        {WEEKDAYS.map((d, i) => (
          <span key={i} className="text-[11px] text-ink-subtle dark:text-ink-subtle-dark font-medium py-1">{d}</span>
        ))}
        {cells.map((day, i) => {
          const isToday = day === today.getDate();
          const hasMeeting = day && meetingDays.has(day);
          return (
            <div key={i} className="flex flex-col items-center py-1">
              {day && (
                <>
                  <span
                    className={cn(
                      'h-6 w-6 flex items-center justify-center rounded-full text-[12px]',
                      isToday ? 'bg-primary text-white font-semibold' : 'text-ink dark:text-ink-dark'
                    )}
                  >
                    {day}
                  </span>
                  <span className={cn('h-1 w-1 rounded-full mt-0.5', hasMeeting ? 'bg-accent' : 'bg-transparent')} />
                </>
              )}
            </div>
          );
        })}
      </div>
    </Card>
  );
}
