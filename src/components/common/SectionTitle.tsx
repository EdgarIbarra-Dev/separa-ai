import type { ReactNode } from 'react';

interface SectionTitleProps {
  title: string;
  aside?: ReactNode;
}

const SectionTitle: React.FC<SectionTitleProps> = ({ title, aside }) => (
  <div className="section-title">
    <h2>{title}</h2>
    {aside}
  </div>
);

export default SectionTitle;
