import { useMemo, useState } from 'react';

import { countEntries, filterEntries, flattenSessions } from '../services/historyService';
import type { ClassificationSession, HistoryEntry, HistoryFilterId } from '../types/classification';

interface HistoryFilterState {
  filter: HistoryFilterId;
  setFilter: (filter: HistoryFilterId) => void;
  /** Todos los residuos guardados, sin filtrar */
  entries: HistoryEntry[];
  filtered: HistoryEntry[];
  counts: Record<HistoryFilterId, number>;
}

/** Residuos del historial (uno por tarjeta), filtro activo y contadores calculados con los datos reales */
export const useHistoryFilter = (sessions: ClassificationSession[]): HistoryFilterState => {
  const [filter, setFilter] = useState<HistoryFilterId>('all');

  const entries = useMemo(() => flattenSessions(sessions), [sessions]);
  const filtered = useMemo(() => filterEntries(entries, filter), [entries, filter]);
  const counts = useMemo(() => countEntries(entries), [entries]);

  return { filter, setFilter, entries, filtered, counts };
};
