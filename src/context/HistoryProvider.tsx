import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import type { ReactNode } from 'react';

import { loadHistory, saveHistory } from '../storage/historyStorage';
import type { ClassificationSession } from '../types/classification';

import { HistoryContext } from './historyContext';
import type { HistoryContextValue, SaveSessionResult } from './historyContext';

export const HistoryProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [sessions, setSessions] = useState<ClassificationSession[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  // La referencia refleja el estado de inmediato y permite detectar guardados repetidos antes del siguiente render
  const sessionsRef = useRef<ClassificationSession[]>([]);
  const loadedRef = useRef<Promise<void>>(Promise.resolve());

  useEffect(() => {
    let active = true;
    loadedRef.current = loadHistory()
      .then((loaded) => {
        if (!active) return;
        sessionsRef.current = loaded;
        setSessions(loaded);
      })
      .catch(() => undefined)
      .finally(() => {
        if (active) setIsLoading(false);
      });
    return () => {
      active = false;
    };
  }, []);

  const addSession = useCallback(async (session: ClassificationSession): Promise<SaveSessionResult> => {
    await loadedRef.current;
    if (sessionsRef.current.some((stored) => stored.id === session.id)) return 'duplicate';

    const next = [session, ...sessionsRef.current];
    sessionsRef.current = next;
    setSessions(next);

    try {
      await saveHistory(next);
      return 'saved';
    } catch {
      sessionsRef.current = sessionsRef.current.filter((stored) => stored.id !== session.id);
      setSessions(sessionsRef.current);
      return 'error';
    }
  }, []);

  const value = useMemo<HistoryContextValue>(
    () => ({ sessions, isLoading, addSession }),
    [sessions, isLoading, addSession],
  );

  return <HistoryContext.Provider value={value}>{children}</HistoryContext.Provider>;
};
