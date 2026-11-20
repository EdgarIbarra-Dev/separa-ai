import { IonIcon } from '@ionic/react';
import { checkmarkCircle } from 'ionicons/icons';

import type { WasteItem } from '../../types/waste';
import IconContainer from '../common/IconContainer';

interface WasteItemCardProps {
  item: WasteItem;
  selected?: boolean;
  onToggle: (id: string) => void;
}

/** Fila del catálogo: icono, nombre, descripción e indicador de selección (permite selección múltiple) */
const WasteItemCard: React.FC<WasteItemCardProps> = ({ item, selected = false, onToggle }) => (
  <div
    className={`waste-item waste-item--selectable ${selected ? 'waste-item--selected' : ''}`.trim()}
    role="checkbox"
    aria-checked={selected}
    tabIndex={0}
    onClick={() => onToggle(item.id)}
    onKeyDown={(event) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        onToggle(item.id);
      }
    }}
  >
    <IconContainer icon={item.icon} tone={selected ? 'white' : 'lilac'} size="md" />
    <div className="waste-item__body">
      <h4>{item.name}</h4>
      <p>{item.description}</p>
    </div>
    {selected ? (
      <IonIcon className="waste-item__check" icon={checkmarkCircle} aria-hidden="true" />
    ) : (
      <span className="waste-item__radio" aria-hidden="true" />
    )}
  </div>
);

export default WasteItemCard;
