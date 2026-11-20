import { IonButton, IonIcon } from '@ionic/react';
import type { ReactNode } from 'react';

interface SecondaryButtonProps {
  children: ReactNode;
  icon?: string;
  endIcon?: string;
  to?: string;
  onClick?: () => void;
  /** soft: fondo lila · text: acción terciaria sin fondo · compact: pequeño con fondo lila */
  variant?: 'soft' | 'text' | 'compact';
}

const SecondaryButton: React.FC<SecondaryButtonProps> = ({
  children,
  icon,
  endIcon,
  to,
  onClick,
  variant = 'soft',
}) => (
  <IonButton
    className={`btn btn--${variant}`}
    expand={variant === 'soft' || variant === 'text' ? 'block' : undefined}
    routerLink={to}
    onClick={onClick}
  >
    {icon ? <IonIcon slot="start" icon={icon} aria-hidden="true" /> : null}
    {children}
    {endIcon ? <IonIcon slot="end" icon={endIcon} aria-hidden="true" /> : null}
  </IonButton>
);

export default SecondaryButton;
