import type { CaptureTip } from '../../types/waste';
import IconContainer from '../common/IconContainer';

interface IdentificationTipsProps {
  title: string;
  tips: CaptureTip[];
}

/** Lista de consejos para mejorar la captura de una fotografía */
const IdentificationTips: React.FC<IdentificationTipsProps> = ({ title, tips }) => (
  <section className="tips">
    <h3 className="u-eyebrow tips__title">{title}</h3>
    <ul className="tips__list">
      {tips.map((tip) => (
        <li key={tip.id} className="tips__item">
          <IconContainer icon={tip.icon} tone="lilac" size="md" />
          <div>
            <h4>{tip.title}</h4>
            <p>{tip.description}</p>
          </div>
        </li>
      ))}
    </ul>
  </section>
);

export default IdentificationTips;
