import { bulbOutline } from 'ionicons/icons';

import IconContainer from '../common/IconContainer';

interface TipBannerProps {
  title: string;
  description: string;
}

/** Banner verde con un consejo destacado */
const TipBanner: React.FC<TipBannerProps> = ({ title, description }) => (
  <section className="tip-banner">
    <IconContainer icon={bulbOutline} tone="white" size="md" />
    <h3>{title}</h3>
    <p>{description}</p>
  </section>
);

export default TipBanner;
