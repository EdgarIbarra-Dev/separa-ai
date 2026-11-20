import { IonIcon } from '@ionic/react';
import { downloadOutline, trashOutline } from 'ionicons/icons';

import type { WasteContainer } from '../../types/waste';

interface ContainerPillProps {
  container: WasteContainer;
  label: string;
}

const pillIcon: Record<WasteContainer, string> = {
  white: trashOutline,
  green: downloadOutline,
  black: trashOutline,
};

/** Etiqueta con el color del recipiente (blanco, verde o negro) */
const ContainerPill: React.FC<ContainerPillProps> = ({ container, label }) => (
  <span className={`container-pill container-pill--${container}`}>
    <IonIcon icon={pillIcon[container]} aria-hidden="true" />
    {label}
  </span>
);

export default ContainerPill;
