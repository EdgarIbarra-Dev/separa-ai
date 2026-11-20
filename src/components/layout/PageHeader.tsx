import { IonBackButton, IonButtons, IonHeader, IonToolbar } from '@ionic/react';
import { arrowBack } from 'ionicons/icons';

import RecycleLogo from '../common/RecycleLogo';

interface PageHeaderProps {
  title: string;
  /** Ruta a la que vuelve el botón si no hay historial de navegación */
  backHref?: string;
}

/** Cabecera de pantallas secundarias: botón de regreso, isotipo y título */
const PageHeader: React.FC<PageHeaderProps> = ({ title, backHref = '/inicio' }) => (
  <IonHeader className="ion-no-border page-header">
    <IonToolbar>
      <IonButtons slot="start">
        <IonBackButton className="page-header__back" defaultHref={backHref} icon={arrowBack} text="" />
      </IonButtons>
      <div className="page-header__title">
        <RecycleLogo size={24} />
        <h1>{title}</h1>
      </div>
    </IonToolbar>
  </IonHeader>
);

export default PageHeader;
