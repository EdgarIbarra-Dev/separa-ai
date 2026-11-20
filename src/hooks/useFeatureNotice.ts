import { useIonToast } from '@ionic/react';
import { useCallback } from 'react';

/** Aviso honesto para funciones que todavía no están disponibles (cámara y galería) */
export const useFeatureNotice = (): ((feature: string) => void) => {
  const [presentToast] = useIonToast();

  return useCallback(
    (feature: string) => {
      void presentToast({
        message: `${feature} estará disponible próximamente. Mientras tanto, usa la clasificación manual.`,
        duration: 2800,
        position: 'top',
        cssClass: 'separa-toast',
      });
    },
    [presentToast],
  );
};
