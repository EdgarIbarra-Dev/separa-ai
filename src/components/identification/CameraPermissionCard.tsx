import { IonIcon } from '@ionic/react';
import { cameraOutline, flashOutline, leaf, lockClosed, shieldCheckmarkOutline } from 'ionicons/icons';

import IconContainer from '../common/IconContainer';
import RecycleLogo from '../common/RecycleLogo';
import StatusBadge from '../common/StatusBadge';

/** Contenido visual de la solicitud de permiso de cámara */
const CameraPermissionCard: React.FC = () => (
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

    <StatusBadge tone="orange" className="permission__badge">
      <span className="permission__badge-dot" aria-hidden="true" />
      Permiso requerido
    </StatusBadge>

    <h2 className="permission__title">Necesitamos acceso a tu cámara</h2>
    <p className="permission__description">
      Para identificar tus residuos mediante fotografías, debes permitir el acceso a la cámara de tu dispositivo.
    </p>

    <div className="permission__privacy">
      <IconContainer icon={shieldCheckmarkOutline} tone="white" size="md" />
      <div>
        <h3>Tu privacidad es primero</h3>
        <p>
          SEPARA solo utiliza la cámara mientras identificas residuos. No guardamos ni compartimos tus fotos en la nube
          sin tu permiso.
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

export default CameraPermissionCard;
