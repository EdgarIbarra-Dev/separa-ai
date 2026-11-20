import { IonSearchbar } from '@ionic/react';

interface WasteSearchBarProps {
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
}

/** Campo de búsqueda controlado; la lógica de filtrado vive en el hook de la pantalla */
const WasteSearchBar: React.FC<WasteSearchBarProps> = ({ placeholder, value, onChange }) => (
  <IonSearchbar
    className="waste-search"
    placeholder={placeholder}
    mode="md"
    value={value}
    debounce={0}
    showClearButton="always"
    inputmode="search"
    enterkeyhint="search"
    aria-label={placeholder}
    onIonInput={(event) => onChange(event.detail.value ?? '')}
    onIonClear={() => onChange('')}
  />
);

export default WasteSearchBar;
