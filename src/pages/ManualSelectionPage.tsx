import { IonIcon, IonPage, useIonRouter } from '@ionic/react';
import { cloudOfflineOutline, searchOutline } from 'ionicons/icons';
import { useMemo } from 'react';

import EmptyState from '../components/common/EmptyState';
import FilterChips from '../components/common/FilterChips';
import PageContainer from '../components/layout/PageContainer';
import PageHeader from '../components/layout/PageHeader';
import SelectionSummaryBar from '../components/recycling/SelectionSummaryBar';
import WasteCategoryCard from '../components/recycling/WasteCategoryCard';
import WasteSearchBar from '../components/recycling/WasteSearchBar';
import { wasteFilters } from '../data/wasteCategories';
import type { CategoryFilterId } from '../data/wasteCategories';
import { useClassification } from '../hooks/useClassification';
import { useWasteSearch } from '../hooks/useWasteSearch';
import { getWasteByIds } from '../services/catalogService';

const ManualSelectionPage: React.FC = () => {
  const router = useIonRouter();
  const { selectedIds, toggleWaste, removeWaste, clearSelection, classifySelection } = useClassification();
  const { query, setQuery, categoryId, setCategoryId, groups, items, reset } = useWasteSearch();

  const selectedItems = useMemo(() => getWasteByIds(selectedIds), [selectedIds]);

  const handleContinue = () => {
    if (classifySelection()) router.push('/resultado');
  };

  return (
    <IonPage>
      <PageHeader title="Seleccionar Residuo" backHref="/identificar" />
      <PageContainer hasFooter>
        <section className="page-intro">
          <h2>Selecciona el residuo</h2>
          <p>Elige el elemento que deseas clasificar correctamente hoy.</p>
          <p className="page-intro__note">
            <IonIcon icon={cloudOfflineOutline} aria-hidden="true" />
            Catálogo sin conexión · 100% en tu teléfono
          </p>
        </section>

        <WasteSearchBar placeholder="Buscar residuo (ej. botella, lata, cartón)..." value={query} onChange={setQuery} />
        <FilterChips
          options={wasteFilters}
          activeId={categoryId}
          onSelect={(id) => setCategoryId(id as CategoryFilterId)}
          ariaLabel="Filtrar por categoría"
        />

        {items.length === 0 ? (
          <EmptyState
            icon={searchOutline}
            title="No encontramos residuos"
            description="Prueba con otro nombre o cambia el filtro de categoría. Tu selección se conserva."
            actionLabel="Limpiar búsqueda"
            onAction={reset}
          />
        ) : (
          groups.map(({ category, items: categoryItems }) => (
            <WasteCategoryCard
              key={category.id}
              category={category}
              items={categoryItems}
              selectedIds={selectedIds}
              onToggle={toggleWaste}
            />
          ))
        )}
      </PageContainer>
      <SelectionSummaryBar
        items={selectedItems}
        actionLabel="Ver clasificación y recomendaciones"
        onRemove={removeWaste}
        onClear={clearSelection}
        onContinue={handleContinue}
      />
    </IonPage>
  );
};

export default ManualSelectionPage;
