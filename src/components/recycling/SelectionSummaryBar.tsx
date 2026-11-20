import { IonFooter, IonIcon } from '@ionic/react';
import { arrowForward, close } from 'ionicons/icons';

import { getItemBadge } from '../../services/catalogService';
import type { WasteItem } from '../../types/waste';
import PrimaryButton from '../common/PrimaryButton';
import StatusBadge from '../common/StatusBadge';

interface SelectionSummaryBarProps {
  items: WasteItem[];
  actionLabel: string;
  onRemove: (id: string) => void;
  onClear: () => void;
  onContinue: () => void;
}

/** Panel fijo inferior con los residuos seleccionados y la acción para continuar */
const SelectionSummaryBar: React.FC<SelectionSummaryBarProps> = ({
  items,
  actionLabel,
  onRemove,
  onClear,
  onContinue,
}) => {
  const count = items.length;

  return (
    <IonFooter className="ion-no-border selection-bar">
      <div className="selection-bar__inner">
        <div className="selection-bar__summary" aria-live="polite">
          <span
            className={`selection-bar__dot ${count === 0 ? 'selection-bar__dot--empty' : ''}`.trim()}
            aria-hidden="true"
          />
          <span className="selection-bar__text">
            {count === 0 && 'Selecciona al menos un residuo'}
            {count === 1 && (
              <>
                1 seleccionado: <strong>{items[0].name}</strong>
              </>
            )}
            {count > 1 && (
              <>
                <strong>{count} residuos</strong> seleccionados
              </>
            )}
          </span>
          {count === 1 ? <StatusBadge tone="mint">{getItemBadge(items[0])}</StatusBadge> : null}
          {count > 1 ? (
            <button type="button" className="selection-bar__clear" onClick={onClear}>
              Limpiar
            </button>
          ) : null}
        </div>

        {count > 1 ? (
          <ul className="selection-bar__chips" aria-label="Residuos seleccionados">
            {items.map((item) => (
              <li key={item.id}>
                <button
                  type="button"
                  className="selection-chip"
                  aria-label={`Quitar ${item.name}`}
                  onClick={() => onRemove(item.id)}
                >
                  <span className={`selection-chip__dot selection-chip__dot--${item.container}`} aria-hidden="true" />
                  {item.name}
                  <IonIcon icon={close} aria-hidden="true" />
                </button>
              </li>
            ))}
          </ul>
        ) : null}

        <PrimaryButton endIcon={arrowForward} disabled={count === 0} onClick={onContinue}>
          {actionLabel}
        </PrimaryButton>
      </div>
    </IonFooter>
  );
};

export default SelectionSummaryBar;
