import { IonIcon, IonPage } from '@ionic/react';
import { bookOutline, cameraOutline, homeOutline, refreshOutline } from 'ionicons/icons';

import PrimaryButton from '../components/common/PrimaryButton';
import SecondaryButton from '../components/common/SecondaryButton';
import CaptureExamples from '../components/identification/CaptureExamples';
import IdentificationTips from '../components/identification/IdentificationTips';
import ManualClassificationButton from '../components/identification/ManualClassificationButton';
import PageContainer from '../components/layout/PageContainer';
import PageHeader from '../components/layout/PageHeader';
import { captureTips } from '../data/recyclingGuide';

const NotIdentifiedPage: React.FC = () => (
  <IonPage>
    <PageHeader title="Resultado del análisis" backHref="/identificar" />
    <PageContainer>
      <section className="not-identified">
        <div className="not-identified__icon" aria-hidden="true">
          <span>?</span>
          <IonIcon icon={refreshOutline} />
        </div>
        <h2>No pudimos identificar el residuo</h2>
        <p>
          Intenta tomar otra fotografía con mejor iluminación o consulta nuestra guía para clasificarlo manualmente.
        </p>
        <IdentificationTips title="Consejos para una mejor captura" tips={captureTips} />
      </section>

      <CaptureExamples />

      <div className="u-stack">
        <PrimaryButton icon={cameraOutline} to="/identificar">
          Intentar nuevamente
        </PrimaryButton>
        <SecondaryButton icon={bookOutline} to="/guia">
          Consultar guía de reciclaje
        </SecondaryButton>
        <ManualClassificationButton />
        <SecondaryButton variant="text" icon={homeOutline} to="/inicio">
          Volver al inicio
        </SecondaryButton>
      </div>
    </PageContainer>
  </IonPage>
);

export default NotIdentifiedPage;
