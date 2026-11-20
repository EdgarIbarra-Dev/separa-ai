/** Origen de una imagen adquirida desde el dispositivo */
export type ImageSource = 'camera' | 'gallery';

/**
 * Imagen adquirida (cámara o galería), lista para mostrarse y para ser consumida por un servicio futuro.
 * No contiene datos Base64: solo referencias (URI) para no consumir memoria innecesariamente.
 */
export interface CapturedImage {
  id: string;
  /** URI apta para el atributo `src` de una imagen (WebView) */
  displayUri: string;
  /** URI nativa del archivo, si la plataforma la entrega; útil para leer el archivo más adelante */
  nativeUri?: string;
  /** Formato en minúsculas (jpeg, png, ...) o cadena vacía si la plataforma no lo informa */
  format: string;
  /** Tamaño en bytes, si la plataforma lo informa */
  sizeBytes?: number;
  source: ImageSource;
  /** Fecha y hora de adquisición en formato ISO 8601 */
  acquiredAt: string;
}

export type ImageErrorCode =
  | 'permission-denied'
  | 'camera-unavailable'
  | 'capture-failed'
  | 'gallery-failed'
  | 'invalid-image'
  | 'image-unavailable'
  | 'unknown';

export type ImageAcquisitionResult =
  | { status: 'success'; image: CapturedImage }
  | { status: 'cancelled' }
  | { status: 'error'; code: ImageErrorCode; source: ImageSource };

/**
 * Estado del permiso de cámara:
 * - granted: se puede usar
 * - prompt: aún no se ha solicitado
 * - rationale: el usuario lo denegó antes, pero el sistema aún permite volver a pedirlo
 * - denied: bloqueado; solo se puede habilitar desde los ajustes del sistema
 */
export type CameraPermissionStatus = 'granted' | 'prompt' | 'rationale' | 'denied';

export type ImageValidationResult = { valid: true } | { valid: false; code: ImageErrorCode };

/** Resultado de intentar abrir la cámara o la galería desde la interfaz */
export type ImageCaptureOutcome = 'captured' | 'cancelled' | 'permission-required' | 'error' | 'busy';
