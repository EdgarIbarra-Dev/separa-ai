import { IonChip, IonPage } from '@ionic/react';
import { ribbonOutline, searchOutline } from 'ionicons/icons';

import EmptyState from '../components/common/EmptyState';
import SectionTitle from '../components/common/SectionTitle';
import StatusBadge from '../components/common/StatusBadge';
import AppTabBar from '../components/layout/AppTabBar';
import PageContainer from '../components/layout/PageContainer';
import PageHeader from '../components/layout/PageHeader';
import ImpactBanner from '../components/recycling/ImpactBanner';
import TipBanner from '../components/recycling/TipBanner';
import WasteContainerCard from '../components/recycling/WasteContainerCard';
import WasteResultCard from '../components/recycling/WasteResultCard';
import WasteSearchBar from '../components/recycling/WasteSearchBar';
import { guideSuggestions, recyclingContainers } from '../data/recyclingGuide';
import { useWasteSearch } from '../hooks/useWasteSearch';
import { normalizeText } from '../utils/text';

const RecyclingGuidePage: React.FC = () => {
  const { query, setQuery, items, isSearching } = useWasteSearch();

  // Durante una búsqueda solo se muestran los recipientes que reciben alguno de los residuos encontrados
  const visibleContainers = isSearching
    ? recyclingContainers.filter((container) => items.some((item) => item.container === container.id))
    : recyclingContainers;

  const toggleSuggestion = (suggestionQuery: string, isActive: boolean) => setQuery(isActive ? '' : suggestionQuery);

  return (
    <IonPage>
      <PageHeader title="Guía" />
      <PageContainer>
        <section className="page-intro">
          <div className="page-intro__meta">
            <span className="u-eyebrow page-intro__eyebrow">Resolución 2184 de 2019</span>
            <StatusBadge tone="mint" icon={ribbonOutline}>
              Oficial Colombia
            </StatusBadge>
          </div>
          <h2 className="page-intro__headline">Guía de reciclaje</h2>
          <p>Aprende dónde depositar cada tipo de residuo</p>
        </section>

        <WasteSearchBar placeholder="Buscar residuo..." value={query} onChange={setQuery} />
        <div className="suggestions">
          <span className="suggestions__label">Sugeridos:</span>
          {guideSuggestions.map((suggestion) => {
            const isActive = normalizeText(query) === normalizeText(suggestion.query);
            return (
              <IonChip
                key={suggestion.id}
                className={`filter-chip ${isActive ? 'filter-chip--active' : ''}`.trim()}
                role="button"
                tabIndex={0}
                aria-pressed={isActive}
                onClick={() => toggleSuggestion(suggestion.query, isActive)}
                onKeyDown={(event) => {
                  if (event.key === 'Enter' || event.key === ' ') {
                    event.preventDefault();
                    toggleSuggestion(suggestion.query, isActive);
                  }
                }}
              >
                {suggestion.label}
              </IonChip>
            );
          })}
        </div>

        {isSearching && items.length === 0 ? (
          <EmptyState
            icon={searchOutline}
            title="No encontramos residuos relacionados con tu búsqueda."
            description="Revisa la ortografía o prueba con otro término, por ejemplo: botella, cartón o café."
            actionLabel="Limpiar búsqueda"
            onAction={() => setQuery('')}
          />
        ) : null}

        {isSearching && items.length > 0 ? (
          <>
            <SectionTitle title="Resultados" aside={<span className="section-title__tag">{items.length}</span>} />
            <div className="waste-category__items">
              {items.map((item) => (
                <WasteResultCard key={item.id} item={item} />
              ))}
            </div>
          </>
        ) : null}

        {visibleContainers.map((container) => (
          <WasteContainerCard key={container.id} container={container} />
        ))}

        {isSearching ? null : (
          <>
            <ImpactBanner />
            <TipBanner
              title="Consejo para reciclar"
              description="Separar desde la fuente facilita el trabajo de los recicladores de oficio y evita que materiales limpios terminen en rellenos sanitarios."
            />
          </>
        )}
      </PageContainer>
      <AppTabBar active="guide" />
    </IonPage>
  );
};

export default RecyclingGuidePage;
