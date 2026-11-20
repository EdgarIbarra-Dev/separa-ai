import { IonButton, IonIcon } from '@ionic/react';
import type { ReactNode } from 'react';

interface PrimaryButtonProps {
  children: ReactNode;
  icon?: string;
  endIcon?: string;
  /** Ruta de destino */
  to?: string;
  onClick?: () => void;
  block?: boolean;
  disabled?: boolean;
  /** Estado de acción completada (por ejemplo, "Guardado"): conserva el botón pero lo muestra como confirmación */
  done?: boolean;
}

/** Botón principal verde, la acción más importante de cada pantalla */
const PrimaryButton: React.FC<PrimaryButtonProps> = ({
  children,
  icon,
  endIcon,
  to,
  onClick,
  block = true,
  disabled = false,
  done = false,
}) => (
  <IonButton
    className={`btn btn--primary ${done ? 'btn--done' : ''}`.trim()}
    expand={block ? 'block' : undefined}
    routerLink={to}
    onClick={onClick}
    disabled={disabled || done}
  >
    {icon ? <IonIcon slot="start" icon={icon} aria-hidden="true" /> : null}
    {children}
    {endIcon ? <IonIcon slot="end" icon={endIcon} aria-hidden="true" /> : null}
  </IonButton>
);

export default PrimaryButton;
