import { IonContent } from '@ionic/react';
import type { ReactNode } from 'react';

interface PageContainerProps {
  children: ReactNode;
  /** Reduce el espacio inferior cuando la página tiene un footer fijo */
  hasFooter?: boolean;
}

/** Área de contenido con scroll y espaciado uniforme para todas las pantallas */
const PageContainer: React.FC<PageContainerProps> = ({ children, hasFooter = false }) => (
  <IonContent fullscreen>
    <div className={`page-container ${hasFooter ? 'page-container--with-footer' : ''}`.trim()}>{children}</div>
  </IonContent>
);

export default PageContainer;
