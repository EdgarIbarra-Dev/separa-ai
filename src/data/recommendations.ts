import {
  alertCircleOutline,
  banOutline,
  contractOutline,
  cutOutline,
  flameOutline,
  flaskOutline,
  handLeftOutline,
  layersOutline,
  leafOutline,
  refreshOutline,
  removeCircleOutline,
  repeatOutline,
  sunnyOutline,
  trashBinOutline,
  waterOutline,
} from 'ionicons/icons';

import type { Recommendation } from '../types/waste';

/** Catálogo local de recomendaciones; los residuos las referencian por id */
const recommendationList: Recommendation[] = [
  { id: 'deliver-clean', icon: waterOutline, text: 'Entrega el envase limpio' },
  { id: 'remove-liquid', icon: flaskOutline, text: 'Retira los restos de líquido' },
  { id: 'keep-dry', icon: sunnyOutline, text: 'Procura que esté seco' },
  { id: 'empty-content', icon: flaskOutline, text: 'Vacía el contenido por completo' },
  { id: 'clean-item', icon: waterOutline, text: 'Entrégalo limpio y sin restos' },
  { id: 'rinse', icon: waterOutline, text: 'Enjuágalo si es necesario' },
  { id: 'no-food-residue', icon: banOutline, text: 'Evita dejar restos de alimentos' },
  { id: 'crush', icon: contractOutline, text: 'Aplástalo para reducir su volumen' },
  { id: 'separate-lid', icon: cutOutline, text: 'Separa la tapa o el cierre si es de otro material' },
  { id: 'flatten', icon: contractOutline, text: 'Desármalo y aplánalo para ahorrar espacio' },
  { id: 'no-grease', icon: banOutline, text: 'Verifica que no tenga grasa ni restos de comida' },
  { id: 'remove-attachments', icon: cutOutline, text: 'Retira cintas, grapas o plásticos adheridos' },
  { id: 'handle-sharp', icon: handLeftOutline, text: 'Manéjalo con cuidado para evitar cortes' },
  { id: 'reuse', icon: repeatOutline, text: 'Considera reutilizarlo antes de desecharlo' },
  { id: 'separate-contaminants', icon: layersOutline, text: 'Sepáralo de residuos contaminantes' },
  { id: 'no-mix-non-compostable', icon: removeCircleOutline, text: 'Evita mezclarlo con elementos no compostables' },
  { id: 'drain-liquid', icon: waterOutline, text: 'Escurre el exceso de líquido' },
  { id: 'no-plastic-bags', icon: banOutline, text: 'No lo deposites dentro de bolsas plásticas' },
  { id: 'chop-small', icon: cutOutline, text: 'Córtalo en trozos pequeños para que se degrade más rápido' },
  { id: 'wrap-closed', icon: trashBinOutline, text: 'Envuélvelo para que no ensucie otros residuos' },
  { id: 'extinguished', icon: flameOutline, text: 'Asegúrate de que esté completamente apagado' },
  { id: 'no-mix-recyclables', icon: alertCircleOutline, text: 'No lo mezcles con residuos aprovechables' },
  { id: 'not-recyclable-note', icon: refreshOutline, text: 'No es reciclable: evita contaminar los demás recipientes' },
  { id: 'natural-material', icon: leafOutline, text: 'Deposítalo sin bolsas ni plásticos' },
];

export const recommendationsById: ReadonlyMap<string, Recommendation> = new Map(
  recommendationList.map((recommendation) => [recommendation.id, recommendation]),
);
