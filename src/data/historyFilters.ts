import type { HistoryFilterId } from '../types/classification';
import type { FilterOption } from '../types/waste';

export const historyFilters: (FilterOption & { id: HistoryFilterId })[] = [
  { id: 'all', label: 'Todos' },
  { id: 'recyclable', label: 'Aprovechables' },
  { id: 'organic', label: 'Orgánicos' },
];
