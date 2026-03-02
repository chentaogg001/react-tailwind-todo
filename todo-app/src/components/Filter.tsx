import { FilterType } from '../types';
import { clsx } from 'clsx';

interface FilterProps {
  currentFilter: FilterType;
  onFilterChange: (filter: FilterType) => void;
  counts: {
    all: number;
    active: number;
    completed: number;
  };
}

export function Filter({ currentFilter, onFilterChange, counts }: FilterProps) {
  const filters: { key: FilterType; label: string }[] = [
    { key: 'all', label: 'All' },
    { key: 'active', label: 'Active' },
    { key: 'completed', label: 'Completed' },
  ];

  return (
    <div className="flex items-center justify-center gap-1 p-1 bg-slate-100 rounded-lg">
      {filters.map(({ key, label }) => (
        <button
          key={key}
          onClick={() => onFilterChange(key)}
          className={clsx(
            'px-4 py-2 text-sm font-medium rounded-md transition-all duration-200',
            currentFilter === key
              ? 'bg-white text-blue-600 shadow-sm'
              : 'text-slate-600 hover:text-slate-800 hover:bg-slate-200'
          )}
        >
          {label}
          <span className="ml-1.5 text-xs text-slate-400">({counts[key]})</span>
        </button>
      ))}
    </div>
  );
}
