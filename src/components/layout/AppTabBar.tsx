import { IonFooter, IonIcon, useIonRouter } from '@ionic/react';
import { bookOutline, book, homeOutline, home, time, timeOutline } from 'ionicons/icons';

export type TabId = 'home' | 'guide' | 'history';

interface TabItem {
  id: TabId;
  label: string;
  path: string;
  icon: string;
  activeIcon: string;
}

const tabs: TabItem[] = [
  { id: 'home', label: 'Inicio', path: '/inicio', icon: homeOutline, activeIcon: home },
  { id: 'guide', label: 'Guía', path: '/guia', icon: bookOutline, activeIcon: book },
  { id: 'history', label: 'Historial', path: '/historial', icon: timeOutline, activeIcon: time },
];

interface AppTabBarProps {
  active: TabId;
}

/** Barra inferior de navegación de las pantallas principales */
const AppTabBar: React.FC<AppTabBarProps> = ({ active }) => {
  const router = useIonRouter();

  return (
    <IonFooter className="ion-no-border app-tab-bar">
      <nav className="app-tab-bar__nav" aria-label="Navegación principal">
        {tabs.map((tab) => {
          const isActive = tab.id === active;
          return (
            <button
              key={tab.id}
              type="button"
              className={`app-tab-bar__item ${isActive ? 'app-tab-bar__item--active' : ''}`.trim()}
              aria-current={isActive ? 'page' : undefined}
              onClick={() => {
                if (!isActive) router.push(tab.path, 'root', 'replace');
              }}
            >
              <IonIcon icon={isActive ? tab.activeIcon : tab.icon} aria-hidden="true" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </nav>
    </IonFooter>
  );
};

export default AppTabBar;
