import { IonIcon } from '@ionic/react';

import type { IllustrationName } from '../../types/waste';

import Illustration from './Illustration';

interface ImageBannerProps {
  image: IllustrationName;
  tag: string;
  tagIcon: string;
}

/** Imagen ilustrativa con etiqueta superpuesta */
const ImageBanner: React.FC<ImageBannerProps> = ({ image, tag, tagIcon }) => (
  <div className="image-banner">
    <Illustration name={image} className="image-banner__image" />
    <span className="image-banner__tag">
      <IonIcon icon={tagIcon} aria-hidden="true" />
      {tag}
    </span>
  </div>
);

export default ImageBanner;
