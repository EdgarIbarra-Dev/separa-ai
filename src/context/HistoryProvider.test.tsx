import { act, renderHook, waitFor } from '@testing-library/react';
import type { ReactNode } from 'react';
import { beforeEach, describe, expect, it } from 'vitest';

import { useHistory } from '../hooks/useHistory';
import { getWasteById } from '../services/catalogService';
import { createClassificationSession } from '../services/classificationService';
import { clearHistory, loadHistory } from '../storage/historyStorage';

import { HistoryProvider } from './HistoryProvider';

const wrapper = ({ children }: { children: ReactNode }): React.ReactElement => (
  <HistoryProvider>{children}</HistoryProvider>
);

const createSession = (): NonNullable<ReturnType<typeof createClassificationSession>> => {
  const item = getWasteById('plastic-bottle');
  const session = item ? createClassificationSession([item], 'manual') : null;
  if (!session) throw new Error('Sesión de prueba inválida');
  return session;
};

describe('HistoryProvider', () => {
  beforeEach(async () => {
    window.localStorage.clear();
    await clearHistory();
  });

  it('guarda una sesión una sola vez aunque se pulse varias veces', async () => {
    const { result } = renderHook(() => useHistory(), { wrapper });
    await waitFor(() => expect(result.current.isLoading).toBe(false));

    const session = createSession();
    let results: string[] = [];
    await act(async () => {
      results = await Promise.all([result.current.addSession(session), result.current.addSession(session)]);
    });

    expect(results.sort()).toEqual(['duplicate', 'saved']);
    expect(result.current.sessions).toHaveLength(1);
    expect(await loadHistory()).toHaveLength(1);
  });

  it('recupera el historial guardado al reiniciar', async () => {
    const first = renderHook(() => useHistory(), { wrapper });
    await waitFor(() => expect(first.result.current.isLoading).toBe(false));
    await act(async () => {
      await first.result.current.addSession(createSession());
    });
    first.unmount();

    const second = renderHook(() => useHistory(), { wrapper });
    await waitFor(() => expect(second.result.current.sessions).toHaveLength(1));
  });
});
