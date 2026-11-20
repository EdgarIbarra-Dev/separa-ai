import type { MediaResult } from '@capacitor/camera';
import { Capacitor } from '@capacitor/core';

import type { CapturedImage, ImageSource, ImageValidationResult } from '../../types/image';
import { createId } from '../../utils/id';

const ALLOWED_PROTOCOLS = ['http:', 'https:', 'capacitor:', 'file:', 'blob:', 'content:'];
const ALLOWED_FORMATS = ['jpeg', 'jpg', 'png', 'webp', 'heic', 'heif'];

/** Indica si el texto es una URI con un protocolo que la aplicación sabe mostrar */
export const isSupportedUri = (uri: unknown): uri is string => {
  if (typeof uri !== 'string' || uri.trim() === '') return false;
  if (uri.startsWith('data:image/')) return true;
  try {
    return ALLOWED_PROTOCOLS.includes(new URL(uri).protocol);
  } catch {
    return false;
  }
};

/**
 * Obtiene la URI que el WebView puede mostrar.
 * Usa `webPath` cuando existe; si solo hay una ruta nativa, la convierte con Capacitor (sin leer el archivo).
 */
export const resolveDisplayUri = (media: Pick<MediaResult, 'webPath' | 'uri'>): string | undefined => {
  if (isSupportedUri(media.webPath)) return media.webPath;
  if (typeof media.uri === 'string' && media.uri !== '') {
    const converted = Capacitor.convertFileSrc(media.uri);
    return isSupportedUri(converted) ? converted : undefined;
  }
  return undefined;
};

const normalizeFormat = (format: string | undefined): string => (format ?? '').trim().toLowerCase();

/** Construye la imagen de la aplicación a partir del resultado del plugin. Devuelve undefined si no hay una URI usable. */
export const createCapturedImage = (media: MediaResult, source: ImageSource): CapturedImage | undefined => {
  const displayUri = resolveDisplayUri(media);
  if (!displayUri) return undefined;

  return {
    id: createId(),
    displayUri,
    nativeUri: media.uri,
    format: normalizeFormat(media.metadata?.format),
    sizeBytes: media.metadata?.size,
    source,
    acquiredAt: new Date().toISOString(),
  };
};

/** Validación básica previa a cualquier análisis futuro: existencia, URI usable, formato y tamaño */
export const validateImage = (image: CapturedImage | null | undefined): ImageValidationResult => {
  if (!image || !isSupportedUri(image.displayUri)) return { valid: false, code: 'invalid-image' };
  if (image.format !== '' && !ALLOWED_FORMATS.includes(image.format)) return { valid: false, code: 'invalid-image' };
  if (image.sizeBytes !== undefined && image.sizeBytes <= 0) return { valid: false, code: 'invalid-image' };
  return { valid: true };
};

/** Libera la memoria de una imagen descartada cuando su URI es un objeto temporal (blob:) */
export const releaseImage = (image: CapturedImage): void => {
  if (!image.displayUri.startsWith('blob:')) return;
  // Se difiere para no invalidar la URI mientras la vista aún la está mostrando
  window.setTimeout(() => URL.revokeObjectURL(image.displayUri), 1000);
};
