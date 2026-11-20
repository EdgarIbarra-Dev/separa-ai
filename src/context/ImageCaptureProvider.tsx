import { useCallback, useMemo, useRef, useState } from 'react';
import type { ReactNode } from 'react';

import { releaseImage } from '../services/imagePicker/imageUtils';
import type { CapturedImage } from '../types/image';

import { ImageCaptureContext } from './imageCaptureContext';
import type { ImageCaptureContextValue } from './imageCaptureContext';

/** Conserva la imagen adquirida para poder transferirla entre pantallas (y, más adelante, a un servicio de análisis) */
export const ImageCaptureProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [image, setImageState] = useState<CapturedImage | null>(null);
  const imageRef = useRef<CapturedImage | null>(null);

  const setImage = useCallback((next: CapturedImage | null) => {
    const previous = imageRef.current;
    imageRef.current = next;
    setImageState(next);
    // La imagen reemplazada o descartada ya no se necesita: se libera su memoria
    if (previous && previous.displayUri !== next?.displayUri) releaseImage(previous);
  }, []);

  const value = useMemo<ImageCaptureContextValue>(() => ({ image, setImage }), [image, setImage]);

  return <ImageCaptureContext.Provider value={value}>{children}</ImageCaptureContext.Provider>;
};
