import { IonCard, IonIcon } from '@ionic/react';
import { informationCircleOutline, leaf, trash } from 'ionicons/icons';

import { containerInfo } from '../../data/containers';
import type { WasteContainer } from '../../types/waste';
import IconContainer from '../common/IconContainer';
import type { IconTone } from '../common/IconContainer';
import InlineNote from '../common/InlineNote';

interface ContainerInstructionCardProps {
  container: WasteContainer;
}

const binTone: Record<WasteContainer, IconTone> = {
  white: 'lilac',
  green: 'green',
  black: 'dark',
};

/** Tarjeta con el código de color oficial: indica en qué recipiente depositar */
const ContainerInstructionCard: React.FC<ContainerInstructionCardProps> = ({ container }) => {
  const info = containerInfo[container];

  return (
    <IonCard className={`classification-card classification-card--${container}`}>
      <div className="classification-card__main">
        <span className="classification-card__bin">
          <IconContainer icon={trash} tone={binTone[container]} size="xl" />
          {container !== 'black' ? (
            <IonIcon className="classification-card__leaf" icon={leaf} aria-hidden="true" />
          ) : null}
        </span>
        <div>
          <p className="u-eyebrow">Código de color oficial</p>
          <h2>{info.instruction}</h2>
        </div>
      </div>
      <InlineNote icon={informationCircleOutline}>{info.description}</InlineNote>
    </IonCard>
  );
};

export default ContainerInstructionCard;
