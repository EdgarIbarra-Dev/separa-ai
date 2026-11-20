import { useIonToast } from '@ionic/react';
import { useCallback, useContext, useRef, useState } from 'react';

import { ImageCaptureContext } from '../context/imageCaptureContext';
import { getCameraPermission, pickFromGallery, takePhoto } from '../services/imagePicker/cameraService';
import { getImageErrorMessage } from '../services/imagePicker/imageMessages';
import { validateImage } from '../services/imagePicker/imageUtils';
import type {
  CapturedImage,
  ImageAcquisitionResult,
  ImageCaptureOutcome,
  ImageErrorCode,
  ImageSource,
} from '../types/image';

export interface ImageCaptureState {
  /** Imagen actual (compartida entre pantallas) */
  image: CapturedImage | null;
  hasImage: boolean;
  /** Origen que se está abriendo en este momento; null si no hay ninguna acción en curso */
  activeSource: ImageSource | null;
  isLoading: boolean;
  /** Último error ocurrido; se limpia al iniciar una nueva acción */
  error: ImageErrorCode | null;
  openCamera: () => Promise<ImageCaptureOutcome>;
  openGallery: () => Promise<ImageCaptureOutcome>;
  /** Reemplaza la imagen actual por una nueva. Si el usuario cancela, se conserva la imagen anterior. */
  replaceImage: (source: ImageSource) => Promise<ImageCaptureOutcome>;
  /** Acepta una imagen ya obtenida por otro medio (por ejemplo, un fotograma de la cámara en vivo) */
  acceptImage: (image: CapturedImage | undefined) => ImageCaptureOutcome;
  clearImage: () => void;
  /** Para cuando la vista no pudo cargar la imagen (por ejemplo, el archivo ya no existe) */
  reportImageUnavailable: () => void;
}

/** Adquisición de imágenes por cámara o galería: estado, errores y acciones reutilizables desde cualquier pantalla */
export const useImageCapture = (): ImageCaptureState => {
  const context = useContext(ImageCaptureContext);
  if (!context) throw new Error('useImageCapture debe usarse dentro de ImageCaptureProvider');
  const { image, setImage } = context;

  const [presentToast] = useIonToast();
  const [activeSource, setActiveSource] = useState<ImageSource | null>(null);
  const [error, setError] = useState<ImageErrorCode | null>(null);
  // La referencia evita solicitudes simultáneas incluso antes de que React vuelva a renderizar
  const busyRef = useRef(false);

  const showError = useCallback(
    (code: ImageErrorCode) => {
      setError(code);
      void presentToast({
        message: getImageErrorMessage(code),
        duration: 3200,
        position: 'top',
        cssClass: 'separa-toast',
      });
    },
    [presentToast],
  );

  const acquire = useCallback(
    async (source: ImageSource): Promise<ImageCaptureOutcome> => {
      if (busyRef.current) return 'busy';
      busyRef.current = true;
      setActiveSource(source);
      setError(null);

      try {
        if (source === 'camera') {
          // Con el permiso negado se muestra la pantalla de permiso; si solo está por preguntar, la propia cámara lo pide
          const permission = await getCameraPermission();
          if (permission === 'denied' || permission === 'rationale') return 'permission-required';
        }

        const result: ImageAcquisitionResult = source === 'camera' ? await takePhoto() : await pickFromGallery();

        if (result.status === 'cancelled') return 'cancelled';

        if (result.status === 'error') {
          if (result.code === 'permission-denied' && source === 'camera') return 'permission-required';
          showError(result.code);
          return 'error';
        }

        const validation = validateImage(result.image);
        if (!validation.valid) {
          showError(validation.code);
          return 'error';
        }

        setImage(result.image);
        return 'captured';
      } catch {
        showError('unknown');
        return 'error';
      } finally {
        busyRef.current = false;
        setActiveSource(null);
      }
    },
    [setImage, showError],
  );

  const openCamera = useCallback(() => acquire('camera'), [acquire]);
  const openGallery = useCallback(() => acquire('gallery'), [acquire]);
  const replaceImage = useCallback((source: ImageSource) => acquire(source), [acquire]);

  const acceptImage = useCallback(
    (next: CapturedImage | undefined): ImageCaptureOutcome => {
      const validation = validateImage(next);
      if (!next || !validation.valid) {
        showError('capture-failed');
        return 'error';
      }
      setError(null);
      setImage(next);
      return 'captured';
    },
    [setImage, showError],
  );

  const clearImage = useCallback(() => {
    setImage(null);
    setError(null);
  }, [setImage]);

  const reportImageUnavailable = useCallback(() => {
    setImage(null);
    showError('image-unavailable');
  }, [setImage, showError]);

  return {
    image,
    hasImage: image !== null,
    activeSource,
    isLoading: activeSource !== null,
    error,
    openCamera,
    openGallery,
    replaceImage,
    acceptImage,
    clearImage,
    reportImageUnavailable,
  };
};
