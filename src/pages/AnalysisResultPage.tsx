import { IonCard, IonIcon, IonPage, useIonRouter, useIonViewDidLeave } from '@ionic/react';
import {
  bookOutline,
  bookmarkOutline,
  cameraOutline,
  checkmarkCircle,
  listOutline,
  refreshOutline,
} from 'ionicons/icons';
import { useRef } from 'react';

import EmptyState from '../components/common/EmptyState';
import IconContainer from '../components/common/IconContainer';
import Illustration from '../components/common/Illustration';
import PrimaryButton from '../components/common/PrimaryButton';
import SecondaryButton from '../components/common/SecondaryButton';
import SectionTitle from '../components/common/SectionTitle';
import StatusBadge from '../components/common/StatusBadge';
import PageContainer from '../components/layout/PageContainer';
import PageHeader from '../components/layout/PageHeader';
import ClassifiedWasteCard from '../components/recycling/ClassifiedWasteCard';
import ContainerInstructionCard from '../components/recycling/ContainerInstructionCard';
import RecommendationItem from '../components/recycling/RecommendationItem';
import { containerInfo } from '../data/containers';
import { useClassification } from '../hooks/useClassification';
import { useSaveClassification } from '../hooks/useSaveClassification';
import { getCategoryInfo, getWasteById, resolveRecommendations } from '../services/catalogService';
import type { ClassificationSession } from '../types/classification';
import { groupByContainer } from '../utils/grouping';

/** Tarjeta superior para un único residuo: imagen o icono, nombre, categoría y material */
const SingleWasteSummary: React.FC<{ session: ClassificationSession }> = ({ session }) => {
  const waste = session.items[0];
  const item = getWasteById(waste.wasteId);
  const category = getCategoryInfo(waste.category);
  const kind = containerInfo[waste.container].kind;

  return (
    <IonCard className="result-card">
      <div className="result-card__media">
        {item?.image ? (
          <Illustration name={item.image} label={waste.name} className="result-card__image" />
        ) : (
          <div className="result-card__placeholder">
            <IconContainer icon={item?.icon ?? listOutline} tone="white" size="xl" />
          </div>
        )}
        <span className="result-card__found">
          <IonIcon icon={checkmarkCircle} aria-hidden="true" />
          Clasificado manualmente
        </span>
        <span className="result-card__recycle">
          <IonIcon icon={refreshOutline} aria-hidden="true" />
        </span>
      </div>
      <div className="result-card__info">
        <div className="result-card__heading">
          <h2>{waste.name}</h2>
          <StatusBadge tone={waste.container === 'black' ? 'neutral' : 'mint'} uppercase>
            {kind}
          </StatusBadge>
        </div>
        <p>{item?.description}</p>
        <p className="result-card__meta">
          {category.label}
          {item?.material ? ` · ${item.material}` : ''}
        </p>
      </div>
    </IonCard>
  );
};

/** Tarjeta superior para varios residuos: cantidad y recipientes involucrados */
const MultipleWasteSummary: React.FC<{ session: ClassificationSession; containerCount: number }> = ({
  session,
  containerCount,
}) => (
  <IonCard className="result-card">
    <div className="result-card__info result-card__info--summary">
      <div className="result-card__heading">
        <h2>{session.items.length} residuos</h2>
        <StatusBadge tone="mint" uppercase>
          Clasificados
        </StatusBadge>
      </div>
      <p>
        {containerCount === 1
          ? 'Todos van en el mismo recipiente.'
          : `Se separan en ${containerCount} recipientes distintos.`}
      </p>
    </div>
  </IonCard>
);

const AnalysisResultPage: React.FC = () => {
  const router = useIonRouter();
  const { classification, startNewClassification } = useClassification();
  const { isSaved, isSaving, save } = useSaveClassification(classification);
  const resetOnLeave = useRef(false);

  // La clasificación se descarta cuando la pantalla ya salió de vista, para evitar parpadeos durante la transición
  useIonViewDidLeave(() => {
    if (resetOnLeave.current) {
      resetOnLeave.current = false;
      startNewClassification();
    }
  });

  if (!classification) {
    return (
      <IonPage>
        <PageHeader title="Resultado del análisis" backHref="/seleccion-manual" />
        <PageContainer>
          <EmptyState
            icon={listOutline}
            title="Aún no hay una clasificación"
            description="Selecciona uno o varios residuos del catálogo para ver en qué recipiente depositarlos."
            actionLabel="Clasificar manualmente"
            actionIcon={listOutline}
            actionTo="/seleccion-manual"
          />
        </PageContainer>
      </IonPage>
    );
  }

  const groups = groupByContainer(classification.items);
  const isSingle = classification.items.length === 1;

  const handleSave = async () => {
    const saved = await save();
    if (!saved) return;
    // La clasificación ya está en el historial: se descarta al salir y se muestra el historial
    resetOnLeave.current = true;
    router.push('/historial', 'root', 'replace');
  };

  const handleIdentifyAnother = () => {
    resetOnLeave.current = true;
    router.push('/identificar');
  };

  return (
    <IonPage>
      <PageHeader title="Resultado del análisis" backHref="/seleccion-manual" />
      <PageContainer>
        {isSingle ? (
          <SingleWasteSummary session={classification} />
        ) : (
          <MultipleWasteSummary session={classification} containerCount={groups.length} />
        )}

        {groups.map((group) => (
          <section key={group.container} className="container-group">
            <ContainerInstructionCard container={group.container} />
            {isSingle ? (
              <>
                <SectionTitle
                  title="Recomendaciones"
                  aside={<span className="section-title__tag">{group.items[0].recommendations.length} pasos</span>}
                />
                <ul className="recommendation-list">
                  {resolveRecommendations(group.items[0]).map((recommendation) => (
                    <RecommendationItem key={recommendation.id} recommendation={recommendation} />
                  ))}
                </ul>
              </>
            ) : (
              group.items.map((waste) => <ClassifiedWasteCard key={waste.id} waste={waste} />)
            )}
          </section>
        ))}

        <div className="u-stack">
          <PrimaryButton
            icon={isSaved ? checkmarkCircle : bookmarkOutline}
            done={isSaved}
            disabled={isSaving}
            onClick={handleSave}
          >
            {isSaved ? 'Guardado en mi historial' : 'Guardar en mi historial'}
          </PrimaryButton>
          <SecondaryButton icon={bookOutline} to="/guia">
            Consultar guía de reciclaje
          </SecondaryButton>
          <SecondaryButton variant="text" icon={cameraOutline} onClick={handleIdentifyAnother}>
            Identificar otro residuo
          </SecondaryButton>
        </div>
      </PageContainer>
    </IonPage>
  );
};

export default AnalysisResultPage;
