import { containerInfo } from '../../data/containers';
import type { WasteItem } from '../../types/waste';
import IconContainer from '../common/IconContainer';

import ContainerPill from './ContainerPill';

interface WasteResultCardProps {
  item: WasteItem;
}

/** Resultado de búsqueda de la guía: residuo y recipiente donde se deposita */
const WasteResultCard: React.FC<WasteResultCardProps> = ({ item }) => (
  <div className="waste-item">
    <IconContainer icon={item.icon} tone="lilac" size="md" />
    <div className="waste-item__body">
      <h4>{item.name}</h4>
      <p>{item.description}</p>
      <div className="waste-item__pill">
        <ContainerPill container={item.container} label={containerInfo[item.container].label} />
      </div>
    </div>
  </div>
);

export default WasteResultCard;
