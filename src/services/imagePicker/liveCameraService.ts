import type { CapturedImage } from '../../types/image';
import { createId } from '../../utils/id';

export type CameraFacing = 'environment' | 'user';

/** Indica si el WebView permite abrir la cámara en vivo (Android WebView y WKWebView lo soportan en contexto seguro) */
export const isLiveCameraSupported = (): boolean =>
  typeof navigator !== 'undefined' &&
  typeof navigator.mediaDevices !== 'undefined' &&
  typeof navigator.mediaDevices.getUserMedia === 'function';

/** Abre la cámara indicada sin audio. Rechaza si no hay cámara o el usuario/sistema niega el acceso. */
export const openCameraStream = (facing: CameraFacing): Promise<MediaStream> =>
  navigator.mediaDevices.getUserMedia({
    audio: false,
    video: { facingMode: { ideal: facing }, width: { ideal: 1920 }, height: { ideal: 1920 } },
  });

/** Libera la cámara; es necesario para apagar el indicador de uso del dispositivo */
export const stopCameraStream = (stream: MediaStream | null): void => {
  stream?.getTracks().forEach((track) => track.stop());
};

/** Indica si el error de `getUserMedia` corresponde a un permiso negado */
export const isCameraAccessDenied = (error: unknown): boolean =>
  error instanceof DOMException && (error.name === 'NotAllowedError' || error.name === 'SecurityError');

/**
 * Toma un fotograma del video en vivo y lo devuelve como imagen (URI de objeto, no Base64).
 * Devuelve undefined si el video todavía no tiene imagen disponible.
 */
export const captureFrame = async (video: HTMLVideoElement): Promise<CapturedImage | undefined> => {
  const { videoWidth: width, videoHeight: height } = video;
  if (width === 0 || height === 0) return undefined;

  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const context = canvas.getContext('2d');
  if (!context) return undefined;
  context.drawImage(video, 0, 0, width, height);

  const blob = await new Promise<Blob | null>((resolve) => canvas.toBlob(resolve, 'image/jpeg', 0.9));
  if (!blob || blob.size === 0) return undefined;

  return {
    id: createId(),
    displayUri: URL.createObjectURL(blob),
    format: 'jpeg',
    sizeBytes: blob.size,
    source: 'camera',
    acquiredAt: new Date().toISOString(),
  };
};
