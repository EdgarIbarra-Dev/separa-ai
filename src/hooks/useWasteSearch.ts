import { useMemo, useState } from 'react';

import { ALL_CATEGORIES } from '../data/wasteCategories';
import type { CategoryFilterId } from '../data/wasteCategories';
import { groupByCategory, searchWaste } from '../services/catalogService';
import type { WasteItem } from '../types/waste';
import { normalizeText } from '../utils/text';

/** Estado de búsqueda y filtro por categoría sobre el catálogo local */
interface WasteSearchState {
  query: string;
  setQuery: (query: string) => void;
  categoryId: CategoryFilterId;
  setCategoryId: (categoryId: CategoryFilterId) => void;
  items: WasteItem[];
  groups: ReturnType<typeof groupByCategory>;
  isSearching: boolean;
  isFiltering: boolean;
  reset: () => void;
}

export const useWasteSearch = (): WasteSearchState => {
  const [query, setQuery] = useState('');
  const [categoryId, setCategoryId] = useState<CategoryFilterId>(ALL_CATEGORIES);

  const items = useMemo(() => searchWaste(query, categoryId), [query, categoryId]);
  const groups = useMemo(() => groupByCategory(items), [items]);

  return {
    query,
    setQuery,
    categoryId,
    setCategoryId,
    items,
    groups,
    isSearching: normalizeText(query) !== '',
    isFiltering: categoryId !== ALL_CATEGORIES,
    reset: () => {
      setQuery('');
      setCategoryId(ALL_CATEGORIES);
    },
  };
};
