import { IonPage } from '@ionic/react';
import { arrowBack, cameraOutline } from 'ionicons/icons';

import PrimaryButton from '../components/common/PrimaryButton';
import SecondaryButton from '../components/common/SecondaryButton';
import CameraPermissionCard from '../components/identification/CameraPermissionCard';
import PageContainer from '../components/layout/PageContainer';
import PageHeader from '../components/layout/PageHeader';
import { useFeatureNotice } from '../hooks/useFeatureNotice';

const CameraPermissionPage: React.FC = () => {
  const notifyUnavailable = useFeatureNotice();

  return (
    <IonPage>
      <PageHeader title="Identificar Residuo" backHref="/identificar" />
      <PageContainer>
        <CameraPermissionCard />
        <div className="u-stack">
          <PrimaryButton icon={cameraOutline} onClick={() => notifyUnavailable('El acceso a la cámara')}>
            Conceder permiso
          </PrimaryButton>
          <SecondaryButton variant="text" icon={arrowBack} to="/inicio">
            Volver al inicio
          </SecondaryButton>
        </div>
      </PageContainer>
    </IonPage>
  );
};

export default CameraPermissionPage;
