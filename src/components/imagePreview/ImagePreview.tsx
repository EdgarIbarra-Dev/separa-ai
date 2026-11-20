import { IonIcon } from '@ionic/react';
import { cameraOutline, closeOutline, imagesOutline } from 'ionicons/icons';

import type { CapturedImage } from '../../types/image';

interface ImagePreviewProps {
  image: CapturedImage;
  /** Descarta la fotografía y vuelve al estado inicial */
  onDiscard: () => void;
  /** Se invoca si la vista no logra cargar la imagen */
  onError: () => void;
  disabled?: boolean;
}

/** Vista previa de la fotografía adquirida; ocupa el mismo marco que el visor de cámara */
const ImagePreview: React.FC<ImagePreviewProps> = ({ image, onDiscard, onError, disabled = false }) => (
  <div className="camera image-preview">
    <img className="image-preview__img" src={image.displayUri} alt="Fotografía del residuo" onError={onError} />

    <span className="image-preview__tag">
      <IonIcon icon={image.source === 'camera' ? cameraOutline : imagesOutline} aria-hidden="true" />
      {image.source === 'camera' ? 'Cámara' : 'Galería'}
    </span>

    <button type="button" className="image-preview__discard" onClick={onDiscard} disabled={disabled}>
      <IonIcon icon={closeOutline} aria-hidden="true" />
      Descartar
    </button>
  </div>
);

export default ImagePreview;
