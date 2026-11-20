import { IonIcon } from '@ionic/react';
import { checkmarkCircleOutline } from 'ionicons/icons';

import type { Recommendation } from '../../types/waste';
import IconContainer from '../common/IconContainer';

interface RecommendationItemProps {
  recommendation: Recommendation;
}

const RecommendationItem: React.FC<RecommendationItemProps> = ({ recommendation }) => (
  <li className="recommendation-item">
    <IconContainer icon={recommendation.icon} tone="mint" size="md" />
    <span className="recommendation-item__text">{recommendation.text}</span>
    <IonIcon className="recommendation-item__check" icon={checkmarkCircleOutline} aria-hidden="true" />
  </li>
);

export default RecommendationItem;
