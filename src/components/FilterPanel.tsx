import React from 'react';
import { FilterOptions, User } from '../types';

interface FilterPanelProps {
  filters: FilterOptions;
  onFiltersChange: (filters: FilterOptions) => void;
  users: User[];
}

const FilterPanel: React.FC<FilterPanelProps> = ({ filters, onFiltersChange, users }) => {
  const departments = Array.from(new Set(users.map(user => user.department)));
  const positions = Array.from(new Set(users.map(user => user.position)));

  const statusOptions = [
    { value: 'critical', label: 'Критично', color: 'text-red-600' },
    { value: 'needs_improvement', label: 'Требует улучшения', color: 'text-yellow-600' },
    { value: 'good_progress', label: 'Хороший прогресс', color: 'text-green-600' },
    { value: 'completed', label: 'Завершено', color: 'text-blue-600' },
  ];

  const handleFilterChange = (key: keyof FilterOptions, value: string) => {
    onFiltersChange({
      ...filters,
      [key]: value === '' ? undefined : value,
    });
  };

  const clearFilters = () => {
    onFiltersChange({});
  };

  const hasActiveFilters = Object.values(filters).some(value => value !== undefined);

  return (
    <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
      <select
        value={filters.department || ''}
        onChange={(e) => handleFilterChange('department', e.target.value)}
        className="select-field"
      >
        <option value="">Все отделения</option>
        {departments.map(dept => (
          <option key={dept} value={dept}>{dept}</option>
        ))}
      </select>

      <select
        value={filters.position || ''}
        onChange={(e) => handleFilterChange('position', e.target.value)}
        className="select-field"
      >
        <option value="">Все должности</option>
        {positions.map(pos => (
          <option key={pos} value={pos}>{pos}</option>
        ))}
      </select>

      <select
        value={filters.status || ''}
        onChange={(e) => handleFilterChange('status', e.target.value)}
        className="select-field"
      >
        <option value="">Все статусы</option>
        {statusOptions.map(status => (
          <option key={status.value} value={status.value}>{status.label}</option>
        ))}
      </select>

      {hasActiveFilters && (
        <button
          onClick={clearFilters}
          className="btn-secondary text-sm"
        >
          Очистить
        </button>
      )}
    </div>
  );
};

export default FilterPanel;

