import { IonIcon } from '@ionic/react';
import {
  cameraReverseOutline,
  flashOffOutline,
  sunnyOutline,
  timerOutline,
  radioButtonOnOutline,
  ellipsisHorizontal,
} from 'ionicons/icons';

import Illustration from '../common/Illustration';

/**
 * Representación visual de una cámara móvil.
 * No accede a la cámara real: todo el contenido es decorativo.
 */
const CameraPlaceholder: React.FC = () => (
  <div className="camera" role="img" aria-label="Vista previa simulada de la cámara con una botella plástica">
    <Illustration name="camera-scene" className="camera__scene" />
    <div className="camera__grid" aria-hidden="true" />

    <div className="camera__top" aria-hidden="true">
      <IonIcon icon={flashOffOutline} />
      <IonIcon icon={radioButtonOnOutline} />
      <IonIcon icon={timerOutline} />
      <IonIcon icon={ellipsisHorizontal} />
    </div>

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

    <span className="camera__zoom" aria-hidden="true">
      1×
    </span>

    <div className="camera__bottom" aria-hidden="true">
      <div className="camera__modes">
        <span className="camera__mode camera__mode--active">Photo</span>
        <span className="camera__mode">Video</span>
        <span className="camera__mode">Macro</span>
      </div>
      <div className="camera__controls">
        <span className="camera__flash">
          <IonIcon icon={sunnyOutline} />
        </span>
        <span className="camera__shutter">
          <span />
        </span>
        <span className="camera__flip">
          <IonIcon icon={cameraReverseOutline} />
        </span>
      </div>
    </div>
  </div>
);

export default CameraPlaceholder;
