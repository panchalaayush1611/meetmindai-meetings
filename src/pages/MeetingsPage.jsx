import { useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { LuUpload, LuVideo } from 'react-icons/lu';
import Button from '../components/common/Button';
import EmptyState from '../components/common/EmptyState';
import MeetingCard from '../components/meetings/MeetingCard';
import MeetingFilters from '../components/meetings/MeetingFilters';
import { setUploadDialogOpen } from '../redux/slices/uiSlice';

export default function MeetingsPage() {
  const dispatch = useDispatch();
  const { items, filters } = useSelector((s) => s.meetings);

  const types = useMemo(() => [...new Set(items.map((m) => m.type))].sort(), [items]);

  const filtered = useMemo(() => {
    return items
      .filter((m) => filters.status === 'all' || m.status === filters.status)
      .filter((m) => filters.type === 'all' || m.type === filters.type)
      .filter((m) => !filters.search || `${m.title} ${m.project} ${m.type}`.toLowerCase().includes(filters.search.toLowerCase()))
      .sort((a, b) => new Date(b.date) - new Date(a.date));
  }, [items, filters]);

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display font-bold text-2xl text-ink dark:text-ink-dark">Meetings</h1>
          <p className="text-sm text-ink-subtle dark:text-ink-subtle-dark mt-1">{items.length} meetings across your workspace</p>
        </div>
        <Button variant="primary" icon={LuUpload} onClick={() => dispatch(setUploadDialogOpen(true))}>
          Upload meeting
        </Button>
      </div>

      <MeetingFilters types={types} />

      {filtered.length === 0 ? (
        <EmptyState
          icon={LuVideo}
          title="No meetings match your filters"
          description="Try adjusting your search or filters."
        />
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((m) => (
            <MeetingCard key={m.id} meeting={m} />
          ))}
        </div>
      )}
    </div>
  );
}
