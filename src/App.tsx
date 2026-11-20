import { IonApp, IonRouterOutlet, setupIonicReact } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { Navigate, Route } from 'react-router-dom';

import { ClassificationProvider } from './context/ClassificationProvider';
import { HistoryProvider } from './context/HistoryProvider';
import { ImageCaptureProvider } from './context/ImageCaptureProvider';
import AnalysisResultPage from './pages/AnalysisResultPage';
import CameraPermissionPage from './pages/CameraPermissionPage';
import HistoryPage from './pages/HistoryPage';
import HomePage from './pages/HomePage';
import IdentifyWastePage from './pages/IdentifyWastePage';
import ManualSelectionPage from './pages/ManualSelectionPage';
import NotIdentifiedPage from './pages/NotIdentifiedPage';
import RecyclingGuidePage from './pages/RecyclingGuidePage';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Identidad visual de SEPARA (diseño claro; no se carga la paleta oscura de Ionic) */
import './theme/design-tokens.css';
import './theme/variables.css';
import './styles/global.css';
import './styles/utilities.css';
import './styles/components.css';

setupIonicReact({ mode: 'md' });

const App: React.FC = () => (
  <IonApp>
    <ClassificationProvider>
      <HistoryProvider>
        <ImageCaptureProvider>
          <IonReactRouter>
            <IonRouterOutlet>
              <Route path="/inicio" element={<HomePage />} />
              <Route path="/identificar" element={<IdentifyWastePage />} />
              <Route path="/permiso-camara" element={<CameraPermissionPage />} />
              <Route path="/resultado" element={<AnalysisResultPage />} />
              <Route path="/no-identificado" element={<NotIdentifiedPage />} />
              <Route path="/seleccion-manual" element={<ManualSelectionPage />} />
              <Route path="/guia" element={<RecyclingGuidePage />} />
              <Route path="/historial" element={<HistoryPage />} />
              <Route path="/historial-vacio" element={<Navigate to="/historial" replace />} />
              <Route path="/" element={<Navigate to="/inicio" replace />} />
              <Route path="*" element={<Navigate to="/inicio" replace />} />
            </IonRouterOutlet>
          </IonReactRouter>
        </ImageCaptureProvider>
      </HistoryProvider>
    </ClassificationProvider>
  </IonApp>
);

export default App;
