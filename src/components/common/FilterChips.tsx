import { IonChip } from '@ionic/react';

import type { FilterOption } from '../../types/waste';

interface FilterChipsProps {
  options: FilterOption[];
  activeId: string;
  onSelect: (id: string) => void;
  /** Contadores opcionales mostrados junto a la etiqueta, p. ej. "Todos (3)" */
  counts?: Record<string, number>;
  ariaLabel: string;
}

/** Fila horizontal de chips de filtro; solo uno puede estar activo */
const FilterChips: React.FC<FilterChipsProps> = ({ options, activeId, onSelect, counts, ariaLabel }) => (
  <div className="filter-chips" role="group" aria-label={ariaLabel}>
    {options.map((option) => (
      <IonChip
        key={option.id}
        className={`filter-chip ${option.id === activeId ? 'filter-chip--active' : ''}`.trim()}
        role="button"
        tabIndex={0}
        aria-pressed={option.id === activeId}
        onClick={() => onSelect(option.id)}
        onKeyDown={(event) => {
          if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            onSelect(option.id);
          }
        }}
      >
        {option.label}
        {counts ? ` (${counts[option.id] ?? 0})` : ''}
      </IonChip>
    ))}
  </div>
);

export default FilterChips;
