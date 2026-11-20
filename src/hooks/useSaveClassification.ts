import { useIonToast } from '@ionic/react';
import { useCallback, useRef, useState } from 'react';

import type { ClassificationSession } from '../types/classification';

import { useHistory } from './useHistory';

interface SaveClassificationState {
  isSaved: boolean;
  isSaving: boolean;
  /** Guarda la clasificación. Devuelve true solo si quedó almacenada en el dispositivo. */
  save: () => Promise<boolean>;
}

/** Guardado de una clasificación en el historial, a prueba de dobles toques */
export const useSaveClassification = (classification: ClassificationSession | null): SaveClassificationState => {
  const { sessions, addSession } = useHistory();
  const [presentToast] = useIonToast();
  const [isSaving, setIsSaving] = useState(false);
  const savingRef = useRef(false);

  const isSaved = classification !== null && sessions.some((session) => session.id === classification.id);

  const save = useCallback(async (): Promise<boolean> => {
    if (!classification || isSaved || savingRef.current) return false;
    savingRef.current = true;
    setIsSaving(true);
    try {
      const result = await addSession(classification);
      void presentToast({
        message:
          result === 'error' ? 'No se pudo guardar. Inténtalo de nuevo.' : 'Clasificación guardada en tu historial',
        duration: 2200,
        position: 'top',
        cssClass: 'separa-toast',
      });
      return result === 'saved';
    } finally {
      savingRef.current = false;
      setIsSaving(false);
    }
  }, [classification, isSaved, addSession, presentToast]);

  return { isSaved, isSaving, save };
};
