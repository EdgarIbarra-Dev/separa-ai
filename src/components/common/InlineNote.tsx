import { IonIcon } from '@ionic/react';
import type { ReactNode } from 'react';

interface InlineNoteProps {
  icon: string;
  children: ReactNode;
  tone?: 'lilac' | 'green';
}

/** Nota breve con icono: consejos, avisos informativos */
const InlineNote: React.FC<InlineNoteProps> = ({ icon, children, tone = 'lilac' }) => (
  <div className={`inline-note inline-note--${tone}`}>
    <IonIcon icon={icon} aria-hidden="true" />
    <p>{children}</p>
  </div>
);

export default InlineNote;
