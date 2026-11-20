import { IonIcon } from '@ionic/react';

export type IconTone = 'lilac' | 'mint' | 'green' | 'white' | 'dark' | 'amber' | 'blue';
export type IconSize = 'sm' | 'md' | 'lg' | 'xl';

interface IconContainerProps {
  icon: string;
  tone?: IconTone;
  size?: IconSize;
  className?: string;
}

/** Contenedor redondeado con un icono, usado como acento visual en tarjetas */
const IconContainer: React.FC<IconContainerProps> = ({ icon, tone = 'lilac', size = 'md', className = '' }) => (
  <span className={`icon-container icon-container--${tone} icon-container--${size} ${className}`.trim()}>
    <IonIcon icon={icon} aria-hidden="true" />
  </span>
);

export default IconContainer;
