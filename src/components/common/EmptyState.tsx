import IconContainer from './IconContainer';
import PrimaryButton from './PrimaryButton';

interface EmptyStateProps {
  icon: string;
  title: string;
  description: string;
  actionLabel?: string;
  actionIcon?: string;
  /** Ruta de destino de la acción */
  actionTo?: string;
  /** Acción local (por ejemplo, limpiar una búsqueda) */
  onAction?: () => void;
}

const EmptyState: React.FC<EmptyStateProps> = ({
  icon,
  title,
  description,
  actionLabel,
  actionIcon,
  actionTo,
  onAction,
}) => (
  <section className="empty-state">
    <IconContainer icon={icon} tone="white" size="xl" />
    <h2 className="empty-state__title">{title}</h2>
    <p className="empty-state__description">{description}</p>
    {actionLabel ? (
      <PrimaryButton block={false} icon={actionIcon} to={actionTo} onClick={onAction}>
        {actionLabel}
      </PrimaryButton>
    ) : null}
  </section>
);

export default EmptyState;
