import { IonCard, IonChip, IonIcon } from '@ionic/react';

import type { RecyclingContainer } from '../../types/waste';
import IconContainer from '../common/IconContainer';
import type { IconTone } from '../common/IconContainer';

interface WasteContainerCardProps {
  container: RecyclingContainer;
}

const iconTone: Record<RecyclingContainer['id'], IconTone> = {
  white: 'lilac',
  green: 'green',
  black: 'dark',
};

/** Tarjeta de la guía para un recipiente (blanco, verde o negro) */
const WasteContainerCard: React.FC<WasteContainerCardProps> = ({ container }) => (
  <IonCard className={`container-card container-card--${container.id}`}>
    <header className="container-card__header">
      <IconContainer icon={container.icon} tone={iconTone[container.id]} size="lg" />
      <div className="container-card__heading">
        <h3>{container.title}</h3>
        <span className="container-card__badge">{container.badge}</span>
      </div>
      {container.tag ? <span className="container-card__tag">{container.tag}</span> : null}
      {container.cornerIcon ? (
        <IonIcon className="container-card__corner" icon={container.cornerIcon} aria-hidden="true" />
      ) : null}
    </header>

    <p className="u-eyebrow container-card__eyebrow">¿Qué depositar aquí?</p>

    {container.itemsLayout === 'chips' ? (
      <ul className="container-card__chips">
        {container.items.map((item) => (
          <li key={item.id}>
            <IonChip className="container-chip">
              <IonIcon icon={item.icon} aria-hidden="true" />
              {item.label}
            </IonChip>
          </li>
        ))}
      </ul>
    ) : (
      <ul className="container-card__list">
        {container.items.map((item) => (
          <li key={item.id}>
            <IonIcon icon={item.icon} aria-hidden="true" />
            <span>{item.label}</span>
          </li>
        ))}
      </ul>
    )}

    <div className="container-card__highlight">
      <IonIcon icon={container.highlight.icon} aria-hidden="true" />
      <p>
        <strong>{container.highlight.label}</strong> {container.highlight.text}
      </p>
    </div>
  </IonCard>
);

export default WasteContainerCard;
