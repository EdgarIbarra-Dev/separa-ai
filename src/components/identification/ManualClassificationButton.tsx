import { listOutline } from 'ionicons/icons';

import { useClassification } from '../../hooks/useClassification';
import InfoCard from '../common/InfoCard';

/** Acceso a la clasificación manual desde el catálogo, sin cámara ni foto */
const ManualClassificationButton: React.FC = () => {
  const { startNewClassification } = useClassification();

  return (
    <InfoCard
      variant="mint"
      icon={listOutline}
      title="Clasificar manualmente"
      description="Selecciona el material sin usar cámara ni foto"
      to="/seleccion-manual"
      trailing="none"
      onClick={startNewClassification}
    />
  );
};

export default ManualClassificationButton;
