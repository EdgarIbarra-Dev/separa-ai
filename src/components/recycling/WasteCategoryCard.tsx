import type { WasteCategoryInfo, WasteItem } from '../../types/waste';
import StatusBadge from '../common/StatusBadge';

import WasteItemCard from './WasteItemCard';

interface WasteCategoryCardProps {
  category: WasteCategoryInfo;
  items: WasteItem[];
  selectedIds: string[];
  onToggle: (id: string) => void;
}

/** Sección del catálogo: título de la categoría, badge y lista de residuos */
const WasteCategoryCard: React.FC<WasteCategoryCardProps> = ({ category, items, selectedIds, onToggle }) => (
  <section className="waste-category" aria-label={category.label}>
    <header className="waste-category__header">
      <h3>
        <span className="waste-category__dot" style={{ backgroundColor: category.dotColor }} aria-hidden="true" />
        {category.label}
      </h3>
      <StatusBadge tone={category.badgeTone}>{category.badge}</StatusBadge>
    </header>
    <div className="waste-category__items" role="group" aria-label={category.label}>
      {items.map((item) => (
        <WasteItemCard key={item.id} item={item} selected={selectedIds.includes(item.id)} onToggle={onToggle} />
      ))}
    </div>
  </section>
);

export default WasteCategoryCard;
