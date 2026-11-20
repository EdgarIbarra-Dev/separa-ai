interface RecycleLogoProps {
  size?: number;
}

/** Isotipo de reciclaje de SEPARA: tres flechas en ciclo */
const RecycleLogo: React.FC<RecycleLogoProps> = ({ size = 24 }) => (
  <svg className="recycle-logo" width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
    {[0, 120, 240].map((angle) => (
      <g key={angle} transform={`rotate(${angle} 12 12)`}>
        <path d="M7.4 5.5 A8 8 0 0 1 16 5.1" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
        <path d="M19.7 7.2 L17.6 2.2 L14.2 8 Z" fill="currentColor" stroke="currentColor" strokeLinejoin="round" />
      </g>
    ))}
  </svg>
);

export default RecycleLogo;
