import { IonPage, useIonRouter, useIonViewWillEnter } from '@ionic/react';
import { arrowBack, cameraOutline, imagesOutline, refreshOutline } from 'ionicons/icons';
import { useState } from 'react';

import PrimaryButton from '../components/common/PrimaryButton';
import SecondaryButton from '../components/common/SecondaryButton';
import CameraPermissionCard from '../components/identification/CameraPermissionCard';
import PageContainer from '../components/layout/PageContainer';
import PageHeader from '../components/layout/PageHeader';
import { useImageCapture } from '../hooks/useImageCapture';
import { getCameraPermission, requestCameraPermission } from '../services/imagePicker/cameraService';
import type { CameraPermissionStatus } from '../types/image';

const primaryLabel: Record<CameraPermissionStatus, string> = {
  prompt: 'Conceder permiso',
  rationale: 'Intentar nuevamente',
  denied: 'Intentar nuevamente',
  granted: 'Abrir cámara',
};

const CameraPermissionPage: React.FC = () => {
  const router = useIonRouter();
  const { isLoading, openGallery } = useImageCapture();
  const [status, setStatus] = useState<CameraPermissionStatus>('prompt');
  const [isRequesting, setIsRequesting] = useState(false);

  // El usuario puede volver de los ajustes del sistema con el permiso ya habilitado
  useIonViewWillEnter(() => {
    void getCameraPermission().then(setStatus);
  });

  const goToIdentify = (): void => {
    router.push('/identificar', 'root', 'replace');
  };

  const handlePrimary = async (): Promise<void> => {
    if (isRequesting || isLoading) return;
    setIsRequesting(true);
    try {
      let current = await getCameraPermission();
      if (current !== 'granted') current = await requestCameraPermission();
      setStatus(current);
      if (current !== 'granted') return;

      // Con el permiso concedido se regresa a la pantalla de identificación, donde la cámara se activa sola
      goToIdentify();
    } finally {
      setIsRequesting(false);
    }
  };

  const handleGallery = async (): Promise<void> => {
    const outcome = await openGallery();
    if (outcome === 'captured') goToIdentify();
  };

  const canUseGalleryInstead = status === 'rationale' || status === 'denied';

  return (
    <IonPage>
      <PageHeader title="Identificar Residuo" backHref="/identificar" />
      <PageContainer>
        <CameraPermissionCard status={status} />
        <div className="u-stack">
          <PrimaryButton
            icon={status === 'rationale' || status === 'denied' ? refreshOutline : cameraOutline}
            disabled={isRequesting || isLoading}
            onClick={() => void handlePrimary()}
          >
            {primaryLabel[status]}
          </PrimaryButton>
          {canUseGalleryInstead ? (
            <SecondaryButton icon={imagesOutline} disabled={isLoading} onClick={() => void handleGallery()}>
              Elegir desde galería
            </SecondaryButton>
          ) : null}
          <SecondaryButton variant="text" icon={arrowBack} to="/inicio">
            Volver al inicio
          </SecondaryButton>
        </div>
      </PageContainer>
    </IonPage>
  );
};

export default CameraPermissionPage;
