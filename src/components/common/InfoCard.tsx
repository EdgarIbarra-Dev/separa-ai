import { IonCard, IonIcon } from '@ionic/react';
import { arrowForward, chevronForward } from 'ionicons/icons';
import type { ReactNode } from 'react';

import IconContainer from './IconContainer';
import type { IconTone } from './IconContainer';

export type InfoCardVariant = 'default' | 'primary' | 'mint' | 'soft';

interface InfoCardProps {
  title: string;
  description?: string;
  icon?: string;
  iconTone?: IconTone;
  variant?: InfoCardVariant;
  /** Si se define, la tarjeta completa navega a esta ruta */
  to?: string;
  /** Acción adicional al presionar la tarjeta, antes de navegar */
  onClick?: () => void;
  trailing?: 'chevron' | 'arrow' | 'none';
  children?: ReactNode;
  className?: string;
}

/** Tarjeta informativa o de acción con icono, título, descripción y flecha opcional */
const InfoCard: React.FC<InfoCardProps> = ({
  title,
  description,
  icon,
  iconTone,
  variant = 'default',
  to,
  onClick,
  trailing,
  children,
  className = '',
}) => {
  const trailingIcon = trailing ?? (to ? 'chevron' : 'none');
  const defaultTone: IconTone = variant === 'primary' ? 'white' : variant === 'mint' ? 'mint' : 'lilac';

  return (
    <IonCard
      className={`info-card info-card--${variant} ${className}`.trim()}
      button={Boolean(to) || Boolean(onClick)}
      routerLink={to}
      onClick={onClick}
    >
      <div className="info-card__content">
        {icon ? <IconContainer icon={icon} tone={iconTone ?? defaultTone} size="lg" /> : null}
        <div className="info-card__body">
          <h3 className="info-card__title">{title}</h3>
          {description ? <p className="info-card__description">{description}</p> : null}
          {children}
        </div>
        {trailingIcon !== 'none' ? (
          <IonIcon
            className="info-card__trailing"
            icon={trailingIcon === 'arrow' ? arrowForward : chevronForward}
            aria-hidden="true"
          />
        ) : null}
      </div>
    </IonCard>
  );
};

export default InfoCard;
