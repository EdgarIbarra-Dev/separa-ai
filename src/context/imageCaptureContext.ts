import { createContext } from 'react';

import type { CapturedImage } from '../types/image';

export interface ImageCaptureContextValue {
  /** Imagen adquirida y pendiente de ser usada por el siguiente paso del flujo */
  image: CapturedImage | null;
  setImage: (image: CapturedImage | null) => void;
}

export const ImageCaptureContext = createContext<ImageCaptureContextValue | null>(null);
