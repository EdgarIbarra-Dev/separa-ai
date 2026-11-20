import { IonIcon } from '@ionic/react';
import { cameraReverseOutline } from 'ionicons/icons';
import type { RefCallback } from 'react';

import Illustration from '../common/Illustration';

interface CameraPlaceholderProps {
  /** Cámara en vivo: si se entrega, el visor muestra la imagen real en lugar de la ilustración */
  stream?: MediaStream | null;
  videoRef?: RefCallback<HTMLVideoElement>;
  onShutter?: () => void;
  onFlip?: () => void;
  disabled?: boolean;
}

/**
 * Visor de cámara móvil.
 * Sin stream es una representación decorativa; con stream muestra la cámara real y habilita el obturador.
 * Solo incluye controles con acción real (obturador y cambio de cámara).
 */
const CameraPlaceholder: React.FC<CameraPlaceholderProps> = ({
  stream = null,
  videoRef,
  onShutter,
  onFlip,
  disabled = false,
}) => {
  const isLive = stream !== null;

  return (
    <div
      className="camera"
      role={isLive ? undefined : 'img'}
      aria-label={isLive ? undefined : 'Vista previa simulada de la cámara con una botella plástica'}
    >
      {isLive ? (
        <video ref={videoRef} className="camera__scene camera__video" autoPlay playsInline muted />
      ) : (
        <Illustration name="camera-scene" className="camera__scene" />
      )}
      <div className="camera__grid" aria-hidden="true" />

      <span className="camera__sensor">
        <span className="camera__sensor-dot" aria-hidden="true" />
        Sensor activo
      </span>

      <span className="camera__corner camera__corner--tl" aria-hidden="true" />
      <span className="camera__corner camera__corner--tr" aria-hidden="true" />
      <span className="camera__corner camera__corner--bl" aria-hidden="true" />
      <span className="camera__corner camera__corner--br" aria-hidden="true" />

      <span className="camera__focus" aria-hidden="true">
        <span className="camera__focus-dot" />
      </span>

      <div className="camera__bottom">
        <div className="camera__controls">
          <button
            type="button"
            className="camera__shutter"
            aria-label="Tomar fotografía"
            disabled={disabled}
            onClick={onShutter}
          >
            <span />
          </button>
          {isLive ? (
            <button
              type="button"
              className="camera__flip"
              aria-label="Cambiar de cámara"
              disabled={disabled}
              onClick={onFlip}
            >
              <IonIcon icon={cameraReverseOutline} aria-hidden="true" />
            </button>
          ) : (
            <span className="camera__flip" aria-hidden="true">
              <IonIcon icon={cameraReverseOutline} />
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default CameraPlaceholder;
