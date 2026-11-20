import { IonPage } from '@ionic/react';
import {
  arrowForward,
  cameraOutline,
  checkmarkCircleOutline,
  helpCircleOutline,
  imagesOutline,
  leaf,
  listOutline,
  timeOutline,
} from 'ionicons/icons';

import ImageBanner from '../components/common/ImageBanner';
import InfoCard from '../components/common/InfoCard';
import SecondaryButton from '../components/common/SecondaryButton';
import StatusBadge from '../components/common/StatusBadge';
import AppHeader from '../components/layout/AppHeader';
import AppTabBar from '../components/layout/AppTabBar';
import PageContainer from '../components/layout/PageContainer';
import { useClassification } from '../hooks/useClassification';

const HomePage: React.FC = () => {
  const { startNewClassification } = useClassification();

  return (
    <IonPage>
      <AppHeader />
      <PageContainer>
        <section className="home-intro">
          <StatusBadge tone="mint" icon={leaf} uppercase>
            Reciclaje inteligente
          </StatusBadge>
          <h1>¡Hola! ¿Qué residuo quieres identificar?</h1>
          <p>Toma una foto o selecciona una imagen para saber cómo separarlo correctamente en segundos.</p>
        </section>

        <InfoCard
          variant="primary"
          icon={cameraOutline}
          title="Tomar fotografía"
          description="Identificación por cámara en vivo"
          to="/identificar"
          trailing="arrow"
        />
        <InfoCard
          icon={imagesOutline}
          title="Elegir de galería"
          description="Sube una foto guardada"
          to="/identificar"
        />
        <InfoCard
          icon={listOutline}
          title="Clasificar manualmente"
          description="Buscar o seleccionar del catálogo sin foto"
          to="/seleccion-manual"
          onClick={startNewClassification}
        />

        <ImageBanner image="home-recycling" tag="Clasificación asistida por IA" tagIcon={checkmarkCircleOutline} />

        <InfoCard
          icon={helpCircleOutline}
          title="¿No sabes cómo separar tus residuos?"
          description="Revisa las pautas oficiales por contenedor de color para papel, plásticos, orgánicos y vidrio."
          className="info-card--stacked"
        >
          <div className="info-card__action">
            <SecondaryButton variant="compact" to="/guia" endIcon={arrowForward}>
              Consultar guía
            </SecondaryButton>
          </div>
        </InfoCard>

        <InfoCard
          icon={timeOutline}
          title="Mi historial"
          description="Revisa escaneos y clasificaciones anteriores"
          to="/historial"
        />
      </PageContainer>
      <AppTabBar active="home" />
    </IonPage>
  );
};

export default HomePage;
