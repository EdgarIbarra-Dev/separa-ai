import { getCategoryInfo, getWasteById, resolveRecommendations } from '../../services/catalogService';
import type { ClassifiedWaste } from '../../types/classification';
import IconContainer from '../common/IconContainer';
import StatusBadge from '../common/StatusBadge';

import RecommendationItem from './RecommendationItem';

interface ClassifiedWasteCardProps {
  waste: ClassifiedWaste;
}

/** Residuo clasificado con sus recomendaciones propias */
const ClassifiedWasteCard: React.FC<ClassifiedWasteCardProps> = ({ waste }) => {
  const item = getWasteById(waste.wasteId);
  const recommendations = resolveRecommendations(waste);

  return (
    <section className="classified-waste" aria-label={waste.name}>
      <header className="classified-waste__header">
        {item ? <IconContainer icon={item.icon} tone="lilac" size="md" /> : null}
        <div className="classified-waste__title">
          <h3>{waste.name}</h3>
          <p>{getCategoryInfo(waste.category).singularLabel}</p>
        </div>
        <StatusBadge tone="mint" uppercase>
          {recommendations.length} pasos
        </StatusBadge>
      </header>
      <ul className="classified-waste__steps">
        {recommendations.map((recommendation) => (
          <RecommendationItem key={recommendation.id} recommendation={recommendation} />
        ))}
      </ul>
    </section>
  );
};

export default ClassifiedWasteCard;
