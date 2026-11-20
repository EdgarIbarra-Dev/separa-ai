/** Recipiente según el código de colores de la Resolución 2184 de 2019 */
export type WasteContainer = 'white' | 'green' | 'black';

export type WasteCategory = 'plastics' | 'paper' | 'glass' | 'metals' | 'organic' | 'non-recyclable';

export type BadgeTone = 'green' | 'mint' | 'blue' | 'orange' | 'neutral' | 'dark';

export type IllustrationName =
  'bottle' | 'bottle-label' | 'banana' | 'napkin' | 'home-recycling' | 'materials' | 'cluttered' | 'camera-scene';

/** Información de presentación de una categoría del catálogo */
export interface WasteCategoryInfo {
  id: WasteCategory;
  /** Título de la sección en el catálogo */
  label: string;
  /** Etiqueta del chip de filtro */
  filterLabel: string;
  /** Nombre en singular, usado en badges como "Plástico aprovechable" */
  singularLabel: string;
  badge: string;
  badgeTone: BadgeTone;
  /** Color del punto indicador junto al título de la categoría */
  dotColor: string;
}

export interface WasteItem {
  id: string;
  name: string;
  description: string;
  category: WasteCategory;
  container: WasteContainer;
  material?: string;
  recyclable: boolean;
  compostable: boolean;
  searchTerms: string[];
  /** Identificadores del catálogo de recomendaciones */
  recommendations: string[];
  icon: string;
  image?: IllustrationName;
}

export interface Recommendation {
  id: string;
  icon: string;
  text: string;
}

/** Información de un recipiente reutilizada en resultados, guía e historial */
export interface ContainerInfo {
  id: WasteContainer;
  label: string;
  /** Tipo de residuo que recibe, ej. "Aprovechable" */
  kind: string;
  /** Instrucción mostrada en el resultado, ej. "Depositar en recipiente blanco" */
  instruction: string;
  description: string;
  /** Estado complementario mostrado en el historial */
  statusLabel: string;
  statusIcon: string;
}

export interface FilterOption {
  id: string;
  label: string;
}

export interface GuideItem {
  id: string;
  label: string;
  icon: string;
}

export interface GuideSuggestion {
  id: string;
  label: string;
  /** Búsqueda que se aplica al presionar el chip */
  query: string;
}

export interface RecyclingContainer {
  id: WasteContainer;
  title: string;
  badge: string;
  /** Etiqueta secundaria en la esquina de la tarjeta (ej. "Secos") */
  tag?: string;
  cornerIcon?: string;
  icon: string;
  /** Chips o lista de elementos que se depositan */
  items: GuideItem[];
  itemsLayout: 'chips' | 'list';
  highlight: {
    icon: string;
    label: string;
    text: string;
  };
}

export interface CaptureTip {
  id: string;
  icon: string;
  title: string;
  description: string;
}
