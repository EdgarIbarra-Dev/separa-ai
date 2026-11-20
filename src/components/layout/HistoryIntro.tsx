import { IonIcon } from '@ionic/react';
import { lockClosedOutline, phonePortraitOutline } from 'ionicons/icons';

import StatusBadge from '../common/StatusBadge';

/** Encabezado compartido por el historial con registros y el historial vacío */
const HistoryIntro: React.FC = () => (
  <section className="page-intro">
    <div className="page-intro__meta">
      <h2 className="page-intro__headline">Mi historial</h2>
      <StatusBadge tone="neutral" icon={lockClosedOutline}>
        Local
      </StatusBadge>
    </div>
    <p>Consulta los residuos que has identificado</p>
    <p className="page-intro__note">
      <IonIcon icon={phonePortraitOutline} aria-hidden="true" />
      Almacenado localmente en tu dispositivo
    </p>
  </section>
);

export default HistoryIntro;
