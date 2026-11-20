import { IonBadge, IonIcon } from '@ionic/react';
import type { ReactNode } from 'react';

import type { BadgeTone } from '../../types/waste';

interface StatusBadgeProps {
  children: ReactNode;
  tone?: BadgeTone;
  icon?: string;
  uppercase?: boolean;
  className?: string;
}

const StatusBadge: React.FC<StatusBadgeProps> = ({
  children,
  tone = 'green',
  icon,
  uppercase = false,
  className = '',
}) => (
  <IonBadge
    className={`status-badge status-badge--${tone} ${uppercase ? 'status-badge--upper' : ''} ${className}`.trim()}
  >
    {icon ? <IonIcon icon={icon} aria-hidden="true" /> : null}
    {children}
  </IonBadge>
);

export default StatusBadge;
