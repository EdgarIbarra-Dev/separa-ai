import { IonIcon, IonPage, useIonAlert, useIonRouter, useIonViewDidLeave, useIonViewWillEnter } from '@ionic/react';
import {
  arrowForward,
  bulbOutline,
  cameraOutline,
  checkmarkCircleOutline,
  imagesOutline,
  lockClosedOutline,
  scanOutline,
} from 'ionicons/icons';
import { useState } from 'react';

import IconContainer from '../components/common/IconContainer';
import InlineNote from '../components/common/InlineNote';
import PrimaryButton from '../components/common/PrimaryButton';
import SecondaryButton from '../components/common/SecondaryButton';
import CameraPlaceholder from '../components/identification/CameraPlaceholder';
import ManualClassificationButton from '../components/identification/ManualClassificationButton';
import ImagePreview from '../components/imagePreview/ImagePreview';
import PageContainer from '../components/layout/PageContainer';
import PageHeader from '../components/layout/PageHeader';
import { useClassification } from '../hooks/useClassification';
import { useImageCapture } from '../hooks/useImageCapture';
import { useLiveCamera } from '../hooks/useLiveCamera';
import { validateImage } from '../services/imagePicker/imageUtils';

const IdentifyWastePage: React.FC = () => {
  const router = useIonRouter();
  const [presentAlert] = useIonAlert();
  const { startNewClassification } = useClassification();
  const { image, hasImage, isLoading, openCamera, openGallery, acceptImage, clearImage, reportImageUnavailable } =
    useImageCapture();

  // La cámara en vivo solo está encendida mientras la pantalla es visible, sin foto tomada y sin otro selector abierto
  const [isViewActive, setIsViewActive] = useState(false);
  useIonViewWillEnter(() => setIsViewActive(true));
  useIonViewDidLeave(() => setIsViewActive(false));
  const live = useLiveCamera(isViewActive && !hasImage && !isLoading);
  const [isCapturingFrame, setIsCapturingFrame] = useState(false);

  const handleCamera = async (): Promise<void> => {
    if (live.isActive) {
      // Con la cámara en vivo, la fotografía es el fotograma que se ve en el visor
      if (isCapturingFrame) return;
      setIsCapturingFrame(true);
      try {
        acceptImage(await live.capture());
      } finally {
        setIsCapturingFrame(false);
      }
      return;
    }

    // Sin permiso de cámara se muestra la pantalla de "Permiso de cámara requerido"
    if (live.status === 'denied') {
      router.push('/permiso-camara');
      return;
    }
    // La cámara todavía se está abriendo
    if (live.status === 'starting') return;

    // Sin cámara en vivo disponible se usa la cámara nativa; si falta el permiso se muestra la pantalla de permiso
    const outcome = await openCamera();
    if (outcome === 'permission-required') router.push('/permiso-camara');
  };

  const handleGallery = async (): Promise<void> => {
    await openGallery();
  };

  const handleContinue = (): void => {
    if (!validateImage(image).valid) {
      reportImageUnavailable();
      return;
    }

    // Punto de conexión del futuro modelo local: aquí se entregará `image` al servicio de clasificación.
    // Mientras no exista, la imagen queda preparada y se ofrece la clasificación manual.
    void presentAlert({
      header: 'Fotografía lista',
      message:
        'Tu fotografía quedó preparada. El análisis automático todavía no está disponible en esta versión, por ahora puedes clasificar el residuo manualmente.',
      buttons: [
        { text: 'Ahora no', role: 'cancel' },
        {
          text: 'Clasificar manualmente',
          handler: () => {
            startNewClassification();
            router.push('/seleccion-manual');
          },
        },
      ],
    });
  };

  return (
    <IonPage>
      <PageHeader title="Identificar Residuo" />
      <PageContainer>
        <div className="identify-hint">
          <IconContainer icon={hasImage ? checkmarkCircleOutline : scanOutline} tone="mint" size="md" />
          <div>
            <h2>{hasImage ? 'Revisa la fotografía' : 'Ubica el residuo dentro del área'}</h2>
            <p>
              {hasImage
                ? 'Comprueba que el residuo se vea completo y nítido'
                : 'Alinea el envase o material con las guías'}
            </p>
          </div>
        </div>

        {image ? (
          <ImagePreview image={image} onDiscard={clearImage} onError={reportImageUnavailable} disabled={isLoading} />
        ) : (
          <CameraPlaceholder
            stream={live.isActive ? live.stream : null}
            videoRef={live.videoRef}
            onShutter={() => void handleCamera()}
            onFlip={live.flip}
            disabled={isLoading || isCapturingFrame}
          />
        )}

        <InlineNote icon={bulbOutline} tone="lilac">
          Procura que el residuo esté limpio, visible y bien iluminado para una detección precisa.
        </InlineNote>

        <div className="u-stack">
          {hasImage ? (
            <>
              <PrimaryButton
                icon={checkmarkCircleOutline}
                endIcon={arrowForward}
                disabled={isLoading}
                onClick={handleContinue}
              >
                Continuar con esta fotografía
              </PrimaryButton>
              <SecondaryButton icon={cameraOutline} disabled={isLoading} onClick={clearImage}>
                Tomar otra fotografía
              </SecondaryButton>
              <SecondaryButton icon={imagesOutline} disabled={isLoading} onClick={() => void handleGallery()}>
                Elegir otra desde galería
              </SecondaryButton>
            </>
          ) : (
            <>
              <PrimaryButton
                icon={cameraOutline}
                disabled={isLoading || isCapturingFrame}
                onClick={() => void handleCamera()}
              >
                Capturar fotografía
              </PrimaryButton>
              <SecondaryButton icon={imagesOutline} disabled={isLoading} onClick={() => void handleGallery()}>
                Seleccionar desde galería
              </SecondaryButton>
            </>
          )}
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
