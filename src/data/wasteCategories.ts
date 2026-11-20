import type { FilterOption, WasteCategory, WasteCategoryInfo } from '../types/waste';

/** Categorías en el orden en que se muestran en el catálogo */
export const wasteCategories: WasteCategoryInfo[] = [
  {
    id: 'plastics',
    label: 'Plásticos',
    filterLabel: 'Plásticos',
    singularLabel: 'Plástico',
    badge: 'Reciclable',
    badgeTone: 'blue',
    dotColor: '#4d8dff',
  },
  {
    id: 'paper',
    label: 'Papel y cartón',
    filterLabel: 'Papel y cartón',
    singularLabel: 'Papel y cartón',
    badge: 'Seco y limpio',
    badgeTone: 'orange',
    dotColor: '#f2a03d',
  },
  {
    id: 'glass',
    label: 'Vidrio',
    filterLabel: 'Vidrio',
    singularLabel: 'Vidrio',
    badge: '100% Reciclable',
    badgeTone: 'blue',
    dotColor: '#4d8dff',
  },
  {
    id: 'metals',
    label: 'Metales',
    filterLabel: 'Metales',
    singularLabel: 'Metal',
    badge: 'Aprovechable',
    badgeTone: 'green',
    dotColor: '#6d7680',
  },
  {
    id: 'organic',
    label: 'Orgánicos',
    filterLabel: 'Orgánicos',
    singularLabel: 'Orgánico',
    badge: 'Compostable',
    badgeTone: 'mint',
    dotColor: '#007653',
  },
  {
    id: 'non-recyclable',
    label: 'Residuos no aprovechables',
    filterLabel: 'No aprovechables',
    singularLabel: 'Residuo',
    badge: 'Basura común',
    badgeTone: 'neutral',
    dotColor: '#182235',
  },
];

export const ALL_CATEGORIES = 'all';

export type CategoryFilterId = WasteCategory | typeof ALL_CATEGORIES;

/** Chips de filtro del catálogo, derivados de las categorías */
export const wasteFilters: FilterOption[] = [
  { id: ALL_CATEGORIES, label: 'Todos' },
  ...wasteCategories.map((category) => ({ id: category.id, label: category.filterLabel })),
];
