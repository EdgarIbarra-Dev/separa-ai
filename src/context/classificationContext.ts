import { createContext } from 'react';

import type { ClassificationSession } from '../types/classification';

export interface ClassificationContextValue {
  /** Ids de los residuos seleccionados en la clasificación manual, sin duplicados y en orden de selección */
  selectedIds: string[];
  toggleWaste: (id: string) => void;
  removeWaste: (id: string) => void;
  clearSelection: () => void;
  /** Clasificación en curso que muestra la pantalla de resultado */
  classification: ClassificationSession | null;
  /** Construye la clasificación a partir de la selección. Devuelve false si no hay residuos seleccionados. */
  classifySelection: () => boolean;
  /** Descarta la selección y la clasificación anteriores para empezar un flujo nuevo */
  startNewClassification: () => void;
}

export const ClassificationContext = createContext<ClassificationContextValue | null>(null);
