import { IonPage } from '@ionic/react';
import { archiveOutline, funnelOutline, scanOutline } from 'ionicons/icons';

import EmptyState from '../components/common/EmptyState';
import FilterChips from '../components/common/FilterChips';
import AppTabBar from '../components/layout/AppTabBar';
import HistoryIntro from '../components/layout/HistoryIntro';
import PageContainer from '../components/layout/PageContainer';
import PageHeader from '../components/layout/PageHeader';
import WasteHistoryCard from '../components/recycling/WasteHistoryCard';
import { historyFilters } from '../data/historyFilters';
import { useHistory } from '../hooks/useHistory';
import { useHistoryFilter } from '../hooks/useHistoryFilter';
import type { HistoryFilterId } from '../types/classification';

const HistoryPage: React.FC = () => {
  const { sessions, isLoading } = useHistory();
  const { filter, setFilter, entries, filtered, counts } = useHistoryFilter(sessions);

  const isEmpty = !isLoading && entries.length === 0;

  return (
    <IonPage>
      <PageHeader title="Historial" />
      <PageContainer>
        <HistoryIntro />
        <FilterChips
          options={historyFilters}
          activeId={filter}
          onSelect={(id) => setFilter(id as HistoryFilterId)}
          counts={counts}
          ariaLabel="Filtrar historial"
        />

        {isEmpty ? (
          <EmptyState
            icon={archiveOutline}
            title="Todavía no tienes identificaciones guardadas"
            description={
              'Las fotos que analices y confirmes con el botón "Guardar en mi historial" aparecerán aquí automáticamente.'
            }
            actionLabel="Identificar nuevo residuo"
            actionIcon={scanOutline}
            actionTo="/identificar"
          />
        ) : null}

        {!isEmpty && !isLoading && filtered.length === 0 ? (
          <EmptyState
            icon={funnelOutline}
            title="No hay registros en este filtro"
            description="Ninguno de tus residuos guardados corresponde a este filtro."
            actionLabel="Ver todos"
            onAction={() => setFilter('all')}
          />
        ) : null}

        {filtered.map((entry) => (
          <WasteHistoryCard key={entry.key} entry={entry} />
        ))}
      </PageContainer>
      <AppTabBar active="history" />
    </IonPage>
  );
};

export default HistoryPage;
