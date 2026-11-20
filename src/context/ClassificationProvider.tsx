import { useCallback, useMemo, useState } from 'react';
import type { ReactNode } from 'react';

import { getWasteByIds } from '../services/catalogService';
import { createClassificationSession, sessionMatchesWasteIds } from '../services/classificationService';
import type { ClassificationSession } from '../types/classification';

import { ClassificationContext } from './classificationContext';
import type { ClassificationContextValue } from './classificationContext';

export const ClassificationProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [classification, setClassification] = useState<ClassificationSession | null>(null);

  const toggleWaste = useCallback((id: string) => {
    setSelectedIds((current) => (current.includes(id) ? current.filter((value) => value !== id) : [...current, id]));
  }, []);

  const removeWaste = useCallback((id: string) => {
    setSelectedIds((current) => current.filter((value) => value !== id));
  }, []);

  const clearSelection = useCallback(() => setSelectedIds([]), []);

  const classifySelection = useCallback((): boolean => {
    const items = getWasteByIds(selectedIds);
    if (items.length === 0) return false;

    // Si la selección no cambió, se conserva la misma sesión para no duplicar guardados al volver atrás
    const unchanged =
      classification !== null &&
      classification.source === 'manual' &&
      sessionMatchesWasteIds(
        classification,
        items.map((item) => item.id),
      );
    if (!unchanged) setClassification(createClassificationSession(items, 'manual'));
    return true;
  }, [selectedIds, classification]);

  const startNewClassification = useCallback(() => {
    setSelectedIds([]);
    setClassification(null);
  }, []);

  const value = useMemo<ClassificationContextValue>(
    () => ({
      selectedIds,
      toggleWaste,
      removeWaste,
      clearSelection,
      classification,
      classifySelection,
      startNewClassification,
    }),
    [selectedIds, toggleWaste, removeWaste, clearSelection, classification, classifySelection, startNewClassification],
  );

  return <ClassificationContext.Provider value={value}>{children}</ClassificationContext.Provider>;
};
