import { IonCard } from '@ionic/react';
import { refreshCircleOutline } from 'ionicons/icons';

import Illustration from '../common/Illustration';
import StatusBadge from '../common/StatusBadge';

/** Banner con imagen y mensaje de impacto colectivo de la guía */
const ImpactBanner: React.FC = () => (
  <IonCard className="impact-banner">
    <Illustration name="materials" label="Materiales reciclables clasificados" className="impact-banner__image" />
    <div className="impact-banner__footer">
      <div>
        <p className="u-eyebrow impact-banner__eyebrow">Impacto colectivo</p>
        <h3>Cada separación cuenta</h3>
      </div>
      <StatusBadge tone="mint" icon={refreshCircleOutline}>
        100% Circular
      </StatusBadge>
    </div>
  </IonCard>
);

export default ImpactBanner;
