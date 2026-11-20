import type { ImageErrorCode } from '../../types/image';

const messages: Record<ImageErrorCode, string> = {
  'permission-denied': 'No tenemos permiso para usar la cámara. Puedes habilitarlo desde los ajustes del dispositivo.',
  'camera-unavailable':
    'No encontramos una cámara disponible en este dispositivo. Puedes elegir una imagen de la galería.',
  'capture-failed': 'No pudimos tomar la fotografía. Inténtalo de nuevo.',
  'gallery-failed': 'No pudimos abrir la galería o seleccionar la imagen. Inténtalo de nuevo.',
  'invalid-image': 'La imagen seleccionada no es válida. Prueba con otra fotografía.',
  'image-unavailable': 'No pudimos mostrar la imagen. Selecciona o captura otra fotografía.',
  unknown: 'Ocurrió un error inesperado. Inténtalo de nuevo.',
};

/** Mensaje en español, apto para el usuario, para cada tipo de error de imagen */
export const getImageErrorMessage = (code: ImageErrorCode): string => messages[code];
