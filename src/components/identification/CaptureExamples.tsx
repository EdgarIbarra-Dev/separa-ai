import { IonIcon } from '@ionic/react';
import { checkmark, close } from 'ionicons/icons';

import Illustration from '../common/Illustration';

/** Dos ejemplos visuales: captura ideal y captura a evitar */
const CaptureExamples: React.FC = () => (
  <div className="capture-examples">
    <figure className="capture-example">
      <div className="capture-example__image">
        <Illustration name="bottle" className="capture-example__illustration" />
        <span className="capture-example__tag capture-example__tag--ideal">
          <IonIcon icon={checkmark} aria-hidden="true" />
          Ideal
        </span>
      </div>
      <figcaption>Un solo objeto visible</figcaption>
    </figure>
    <figure className="capture-example">
      <div className="capture-example__image">
        <Illustration name="cluttered" className="capture-example__illustration" />
        <span className="capture-example__tag capture-example__tag--avoid">
          <IonIcon icon={close} aria-hidden="true" />
          Evitar
        </span>
      </div>
      <figcaption>Elementos superpuestos</figcaption>
    </figure>
  </div>
);

export default CaptureExamples;
