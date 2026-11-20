import { useContext } from 'react';

import { HistoryContext } from '../context/historyContext';
import type { HistoryContextValue } from '../context/historyContext';

export const useHistory = (): HistoryContextValue => {
  const context = useContext(HistoryContext);
  if (!context) throw new Error('useHistory debe usarse dentro de HistoryProvider');
  return context;
};
