import { useDispatch, useSelector } from 'react-redux';
import { setSearchFilter, setStatusFilter, setTypeFilter } from '../../redux/slices/meetingsSlice';
import SearchBar from '../common/SearchBar';
import { PillTabs } from '../common/Tabs';

const STATUS_TABS = [
  { label: 'All', value: 'all' },
  { label: 'Upcoming', value: 'upcoming' },
  { label: 'Processing', value: 'processing' },
  { label: 'Completed', value: 'completed' },
];

export default function MeetingFilters({ types = [] }) {
  const dispatch = useDispatch();
  const filters = useSelector((s) => s.meetings.filters);

  return (
    <div className="flex flex-col sm:flex-row sm:items-center gap-3 justify-between">
      <PillTabs tabs={STATUS_TABS} active={filters.status} onChange={(v) => dispatch(setStatusFilter(v))} />
      <div className="flex items-center gap-2">
        <select
          value={filters.type}
          onChange={(e) => dispatch(setTypeFilter(e.target.value))}
          className="h-9 rounded-lg border border-surface-border dark:border-surface-border-dark bg-surface-card dark:bg-surface-card-dark text-sm text-ink dark:text-ink-dark px-3 outline-none focus:border-primary"
        >
          <option value="all">All types</option>
          {types.map((t) => (
            <option key={t} value={t}>{t}</option>
          ))}
        </select>
        <SearchBar
          value={filters.search}
          onChange={(v) => dispatch(setSearchFilter(v))}
          placeholder="Search meetings..."
          className="w-56"
        />
      </div>
    </div>
  );
}
