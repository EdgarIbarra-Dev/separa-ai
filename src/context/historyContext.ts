import { createContext } from 'react';

import type { ClassificationSession } from '../types/classification';

export type SaveSessionResult = 'saved' | 'duplicate' | 'error';

export interface HistoryContextValue {
  /** Sesiones guardadas, de la más reciente a la más antigua */
  sessions: ClassificationSession[];
  isLoading: boolean;
  /** Guarda una sesión en el almacenamiento local. Una sesión con el mismo id nunca se guarda dos veces. */
  addSession: (session: ClassificationSession) => Promise<SaveSessionResult>;
}

export const HistoryContext = createContext<HistoryContextValue | null>(null);
