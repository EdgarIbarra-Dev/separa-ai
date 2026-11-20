import { IonHeader, IonToolbar } from '@ionic/react';

import RecycleLogo from '../common/RecycleLogo';

/** Cabecera de marca para la pantalla de inicio */
const AppHeader: React.FC = () => (
  <IonHeader className="ion-no-border app-header">
    <IonToolbar>
      <div className="app-header__brand">
        <RecycleLogo size={26} />
        <span>SEPARA</span>
      </div>
    </IonToolbar>
  </IonHeader>
);

export default AppHeader;
