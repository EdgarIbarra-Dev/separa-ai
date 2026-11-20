import type { WasteCategory, WasteContainer } from './waste';

export type ClassificationSource = 'manual' | 'camera' | 'gallery';

/** Residuo clasificado: instantánea guardada dentro de una sesión */
export interface ClassifiedWaste {
  id: string;
  wasteId: string;
  name: string;
  category: WasteCategory;
  container: WasteContainer;
  recommendations: string[];
}

/** Clasificación completa; los residuos clasificados juntos comparten la misma sesión */
export interface ClassificationSession {
  id: string;
  /** Fecha y hora en formato ISO 8601 */
  createdAt: string;
  source: ClassificationSource;
  items: ClassifiedWaste[];
}

/** Un residuo del historial, mostrado de forma independiente aunque se haya clasificado junto a otros */
export interface HistoryEntry {
  key: string;
  sessionId: string;
  createdAt: string;
  source: ClassificationSource;
  waste: ClassifiedWaste;
}

export type HistoryFilterId = 'all' | 'recyclable' | 'organic';
