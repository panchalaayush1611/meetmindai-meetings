import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { LuSearch } from 'react-icons/lu';
import Card from '../common/Card';
import { setSearchFilter } from '../../redux/slices/meetingsSlice';
import { ROUTES } from '../../constants/routes';

export default function QuickSearchWidget() {
  const [value, setValue] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const submit = (e) => {
    e.preventDefault();
    if (!value.trim()) return;
    dispatch(setSearchFilter(value.trim()));
    navigate(ROUTES.MEETINGS);
  };

  return (
    <Card padding={false} className="p-1.5">
      <form onSubmit={submit} className="flex items-center gap-2">
        <LuSearch size={16} className="text-ink-subtle dark:text-ink-subtle-dark ml-2.5" />
        <input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Search meetings, decisions, people..."
          className="flex-1 h-10 bg-transparent text-sm outline-none text-ink dark:text-ink-dark placeholder:text-ink-subtle dark:placeholder:text-ink-subtle-dark"
        />
        <button type="submit" className="h-9 px-4 rounded-lg bg-primary text-white text-sm font-medium hover:bg-primary-hover transition-colors mr-0.5">
          Search
        </button>
      </form>
    </Card>
  );
}
