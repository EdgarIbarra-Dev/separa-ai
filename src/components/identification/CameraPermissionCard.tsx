import { IonIcon } from '@ionic/react';
import { cameraOutline, flashOutline, leaf, lockClosed, shieldCheckmarkOutline } from 'ionicons/icons';

import type { CameraPermissionStatus } from '../../types/image';
import type { BadgeTone } from '../../types/waste';
import IconContainer from '../common/IconContainer';
import RecycleLogo from '../common/RecycleLogo';
import StatusBadge from '../common/StatusBadge';

interface PermissionCopy {
  badge: string;
  tone: BadgeTone;
  title: string;
  description: string;
}

const copyByStatus: Record<CameraPermissionStatus, PermissionCopy> = {
  prompt: {
    badge: 'Permiso requerido',
    tone: 'orange',
    title: 'Necesitamos acceso a tu cámara',
    description:
      'Para identificar tus residuos mediante fotografías, debes permitir el acceso a la cámara de tu dispositivo.',
  },
  rationale: {
    badge: 'Permiso denegado',
    tone: 'orange',
    title: 'La cámara sigue desactivada',
    description:
      'Denegaste el permiso anteriormente. Concédelo para tomar fotografías, o elige una imagen desde tu galería.',
  },
  denied: {
    badge: 'Permiso bloqueado',
    tone: 'orange',
    title: 'Activa la cámara desde Ajustes',
    description:
      'El permiso está bloqueado. Ve a Ajustes › Aplicaciones › SEPARA › Permisos, activa la cámara y vuelve aquí. Mientras tanto puedes elegir una imagen desde tu galería.',
  },
  granted: {
    badge: 'Permiso concedido',
    tone: 'green',
    title: 'Todo listo para usar la cámara',
    description: 'SEPARA ya tiene acceso a la cámara de tu dispositivo. Puedes tomar la fotografía del residuo.',
  },
};

interface CameraPermissionCardProps {
  status?: CameraPermissionStatus;
}

/** Contenido visual de la solicitud de permiso de cámara */
const CameraPermissionCard: React.FC<CameraPermissionCardProps> = ({ status = 'prompt' }) => {
  const copy = copyByStatus[status];

  return (
    <section className="permission">
      <div className="permission__hero" aria-hidden="true">
        <div className="permission__halo">
          <div className="permission__camera">
            <IonIcon icon={cameraOutline} />
          </div>
          <span className="permission__orb permission__orb--leaf">
            <IonIcon icon={leaf} />
          </span>
          <span className="permission__orb permission__orb--lock">
            <IonIcon icon={lockClosed} />
          </span>
          <span className="permission__orb permission__orb--shield">
            <IonIcon icon={shieldCheckmarkOutline} />
          </span>
        </div>
      </div>

      <StatusBadge tone={copy.tone} className="permission__badge">
        <span className="permission__badge-dot" aria-hidden="true" />
        {copy.badge}
      </StatusBadge>

      <h2 className="permission__title">{copy.title}</h2>
      <p className="permission__description">{copy.description}</p>

      <div className="permission__privacy">
        <IconContainer icon={shieldCheckmarkOutline} tone="white" size="md" />
        <div>
          <h3>Tu privacidad es primero</h3>
          <p>
            SEPARA solo utiliza la cámara mientras identificas residuos. No guardamos ni compartimos tus fotos en la
            nube sin tu permiso.
          </p>
        </div>
      </div>

      <div className="permission__features">
        <div className="permission__feature">
          <IconContainer icon={flashOutline} tone="lilac" size="md" />
          <div>
            <h4>Clasificación IA</h4>
            <p>En milisegundos</p>
          </div>
        </div>
        <div className="permission__feature">
          <span className="icon-container icon-container--lilac icon-container--md">
            <RecycleLogo size={20} />
          </span>
          <div>
            <h4>Guía de reciclaje</h4>
            <p>Contenedor exacto</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CameraPermissionCard;
