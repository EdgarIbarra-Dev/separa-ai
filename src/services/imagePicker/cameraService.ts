import { Camera, CameraErrorCode, MediaTypeSelection } from '@capacitor/camera';
import type { MediaResult } from '@capacitor/camera';
import { Capacitor } from '@capacitor/core';

import type { CameraPermissionStatus, ImageAcquisitionResult, ImageErrorCode, ImageSource } from '../../types/image';

import { createCapturedImage } from './imageUtils';

const IMAGE_QUALITY = 90;

const CANCELLED_CODES: string[] = [
  CameraErrorCode.TakePhotoCancelled,
  CameraErrorCode.ChooseMediaCancelled,
  CameraErrorCode.EditPhotoCancelled,
];

const PERMISSION_CODES: string[] = [CameraErrorCode.CameraPermissionDenied, CameraErrorCode.GalleryPermissionDenied];

const INVALID_IMAGE_CODES: string[] = [
  CameraErrorCode.InvalidImageData,
  CameraErrorCode.ImageNotFound,
  CameraErrorCode.ProcessImageFailed,
  CameraErrorCode.MediaPathError,
  CameraErrorCode.FetchImageFromUriFailed,
  CameraErrorCode.FileNotFound,
];

interface PluginErrorLike {
  code?: unknown;
  message?: unknown;
}

const readError = (error: unknown): { code: string; message: string } => {
  const { code, message } = (typeof error === 'object' && error !== null ? error : {}) as PluginErrorLike;
  return {
    code: typeof code === 'string' ? code : '',
    message: typeof message === 'string' ? message.toLowerCase() : '',
  };
};

/** Indica si el error del plugin corresponde a que el usuario canceló la acción (no es un fallo) */
export const isCancellation = (error: unknown): boolean => {
  const { code, message } = readError(error);
  return CANCELLED_CODES.includes(code) || /cancel/.test(message);
};

/** Traduce un error del plugin a un código propio, sin exponer detalles técnicos */
export const toImageErrorCode = (error: unknown, source: ImageSource): ImageErrorCode => {
  const { code, message } = readError(error);
  if (PERMISSION_CODES.includes(code) || /denied|permission/.test(message)) return 'permission-denied';
  if (code === CameraErrorCode.NoCameraAvailable || /no camera|not available|unavailable/.test(message)) {
    return source === 'camera' ? 'camera-unavailable' : 'gallery-failed';
  }
  if (INVALID_IMAGE_CODES.includes(code)) return 'invalid-image';
  return source === 'camera' ? 'capture-failed' : 'gallery-failed';
};

const toResult = (media: MediaResult | undefined, source: ImageSource): ImageAcquisitionResult => {
  if (!media) return { status: 'cancelled' };
  const image = createCapturedImage(media, source);
  return image ? { status: 'success', image } : { status: 'error', code: 'invalid-image', source };
};

/** Abre la cámara nativa y devuelve la fotografía como URI (sin Base64) */
export const takePhoto = async (): Promise<ImageAcquisitionResult> => {
  try {
    const media = await Camera.takePhoto({ quality: IMAGE_QUALITY, includeMetadata: true });
    return toResult(media, 'camera');
  } catch (error) {
    if (isCancellation(error)) return { status: 'cancelled' };
    return { status: 'error', code: toImageErrorCode(error, 'camera'), source: 'camera' };
  }
};

/** Abre el selector nativo de imágenes y devuelve la fotografía elegida como URI (sin Base64) */
export const pickFromGallery = async (): Promise<ImageAcquisitionResult> => {
  try {
    const { results } = await Camera.chooseFromGallery({
      mediaType: MediaTypeSelection.Photo,
      allowMultipleSelection: false,
      quality: IMAGE_QUALITY,
      includeMetadata: true,
    });
    return toResult(results[0], 'gallery');
  } catch (error) {
    if (isCancellation(error)) return { status: 'cancelled' };
    return { status: 'error', code: toImageErrorCode(error, 'gallery'), source: 'gallery' };
  }
};

// ---------- Permiso de cámara ----------

const toPermissionStatus = (state: string | undefined): CameraPermissionStatus => {
  switch (state) {
    case 'granted':
    case 'limited':
      return 'granted';
    case 'prompt-with-rationale':
      return 'rationale';
    case 'denied':
      return 'denied';
    default:
      return 'prompt';
  }
};

/** En web consulta la Permissions API; si el navegador no la soporta para la cámara, el estado queda por preguntar */
const getWebCameraPermission = async (): Promise<CameraPermissionStatus> => {
  try {
    const status = await navigator.permissions.query({ name: 'camera' as PermissionName });
    return toPermissionStatus(status.state);
  } catch {
    return 'prompt';
  }
};

/** En web el permiso se solicita abriendo la cámara un instante; la cámara se libera de inmediato */
const requestWebCameraPermission = async (): Promise<CameraPermissionStatus> => {
  if (typeof navigator.mediaDevices?.getUserMedia !== 'function') return 'granted';
  try {
    const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: false });
    stream.getTracks().forEach((track) => track.stop());
    return 'granted';
  } catch (error) {
    const denied = error instanceof DOMException && (error.name === 'NotAllowedError' || error.name === 'SecurityError');
    // Sin cámara u otro fallo no es un problema de permiso: la pantalla decidirá cómo continuar
    return denied ? 'denied' : 'granted';
  }
};

/**
 * Consulta el permiso de cámara. La galería no requiere permiso porque usa el selector nativo del sistema.
 */
export const getCameraPermission = async (): Promise<CameraPermissionStatus> => {
  if (!Capacitor.isNativePlatform()) return getWebCameraPermission();
  try {
    const { camera } = await Camera.checkPermissions();
    return toPermissionStatus(camera);
  } catch {
    return 'prompt';
  }
};

/** Solicita el permiso de cámara al sistema y devuelve el estado resultante */
export const requestCameraPermission = async (): Promise<CameraPermissionStatus> => {
  if (!Capacitor.isNativePlatform()) return requestWebCameraPermission();
  try {
    const { camera } = await Camera.requestPermissions({ permissions: ['camera'] });
    return toPermissionStatus(camera);
  } catch {
    return 'denied';
  }
};
