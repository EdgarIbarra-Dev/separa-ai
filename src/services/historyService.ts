import type { ClassificationSession, HistoryEntry, HistoryFilterId } from '../types/classification';

/**
 * Aplana las sesiones guardadas en una lista de residuos independientes.
 * Conserva el orden (sesiones de más reciente a más antigua y, dentro de cada sesión, el orden de selección).
 */
export const flattenSessions = (sessions: ClassificationSession[]): HistoryEntry[] =>
  sessions.flatMap((session) =>
    session.items.map((waste) => ({
      key: `${session.id}:${waste.id}`,
      sessionId: session.id,
      createdAt: session.createdAt,
      source: session.source,
      waste,
    })),
  );

/** Aprovechables: recipiente blanco. Orgánicos: recipiente verde. */
export const entryMatchesFilter = (entry: HistoryEntry, filter: HistoryFilterId): boolean => {
  switch (filter) {
    case 'recyclable':
      return entry.waste.container === 'white';
    case 'organic':
      return entry.waste.container === 'green';
    default:
      return true;
  }
};

export const filterEntries = (entries: HistoryEntry[], filter: HistoryFilterId): HistoryEntry[] =>
  entries.filter((entry) => entryMatchesFilter(entry, filter));

/** Contadores calculados a partir de los residuos reales guardados */
export const countEntries = (entries: HistoryEntry[]): Record<HistoryFilterId, number> => ({
  all: entries.length,
  recyclable: filterEntries(entries, 'recyclable').length,
  organic: filterEntries(entries, 'organic').length,
});
