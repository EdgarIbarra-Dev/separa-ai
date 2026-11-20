import { IonIcon, IonPage } from '@ionic/react';
import { bulbOutline, cameraOutline, imagesOutline, lockClosedOutline, scanOutline } from 'ionicons/icons';

import IconContainer from '../components/common/IconContainer';
import InlineNote from '../components/common/InlineNote';
import PrimaryButton from '../components/common/PrimaryButton';
import SecondaryButton from '../components/common/SecondaryButton';
import CameraPlaceholder from '../components/identification/CameraPlaceholder';
import ManualClassificationButton from '../components/identification/ManualClassificationButton';
import PageContainer from '../components/layout/PageContainer';
import PageHeader from '../components/layout/PageHeader';
import { useFeatureNotice } from '../hooks/useFeatureNotice';

const IdentifyWastePage: React.FC = () => {
  const notifyUnavailable = useFeatureNotice();

  return (
    <IonPage>
      <PageHeader title="Identificar Residuo" />
      <PageContainer>
        <div className="identify-hint">
          <IconContainer icon={scanOutline} tone="mint" size="md" />
          <div>
            <h2>Ubica el residuo dentro del área</h2>
            <p>Alinea el envase o material con las guías</p>
          </div>
        </div>

        <CameraPlaceholder />

        <InlineNote icon={bulbOutline} tone="lilac">
          Procura que el residuo esté limpio, visible y bien iluminado para una detección precisa.
        </InlineNote>

        <div className="u-stack">
          <PrimaryButton icon={cameraOutline} to="/permiso-camara">
            Capturar fotografía
          </PrimaryButton>
          <SecondaryButton icon={imagesOutline} onClick={() => notifyUnavailable('La selección desde galería')}>
            Seleccionar desde galería
          </SecondaryButton>
          <ManualClassificationButton />
        </div>

        <p className="privacy-footnote">
          <IonIcon icon={lockClosedOutline} aria-hidden="true" />
          La imagen se analizará directamente en tu dispositivo
        </p>
      </PageContainer>
    </IonPage>
  );
};

export default IdentifyWastePage;
