import { IonCard, IonIcon } from '@ionic/react';
import { trashBinOutline } from 'ionicons/icons';

import { containerInfo } from '../../data/containers';
import { getWasteById } from '../../services/catalogService';
import type { HistoryEntry } from '../../types/classification';
import { formatSessionDate } from '../../utils/date';
import Illustration from '../common/Illustration';

import ContainerPill from './ContainerPill';

interface WasteHistoryCardProps {
  entry: HistoryEntry;
}

/** Tarjeta de un residuo guardado en el historial */
const WasteHistoryCard: React.FC<WasteHistoryCardProps> = ({ entry }) => {
  const { waste } = entry;
  const catalogItem = getWasteById(waste.wasteId);
  const container = containerInfo[waste.container];
  const code = catalogItem?.material ?? container.kind;

  return (
    <IonCard className="history-card">
      <div className="history-card__main">
        <div className="history-card__image">
          {catalogItem?.image ? (
            <Illustration name={catalogItem.image} label={waste.name} />
          ) : (
            <span className="history-card__tile" aria-hidden="true">
              <IonIcon icon={catalogItem?.icon ?? trashBinOutline} />
            </span>
          )}
        </div>
        <div className="history-card__info">
          <div className="history-card__top">
            <h3>{waste.name}</h3>
            <time dateTime={entry.createdAt}>{formatSessionDate(entry.createdAt)}</time>
          </div>
          <p className="history-card__category">{container.kind}</p>
          <p className={`history-card__status history-card__status--${waste.container}`}>
            <IonIcon icon={container.statusIcon} aria-hidden="true" />
            {container.statusLabel}
          </p>
        </div>
      </div>
      <div className="history-card__footer">
        <ContainerPill container={waste.container} label={container.label} />
        <span className="history-card__code">{code.toUpperCase()}</span>
      </div>
    </IonCard>
  );
};

export default WasteHistoryCard;
