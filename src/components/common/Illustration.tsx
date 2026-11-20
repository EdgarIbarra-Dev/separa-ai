import type { ReactElement } from 'react';

import type { IllustrationName } from '../../types/waste';

interface IllustrationProps {
  name: IllustrationName;
  /** Texto alternativo; si se omite la ilustración se oculta a lectores de pantalla */
  label?: string;
  className?: string;
}

interface BottleProps {
  label?: string;
  prefix: string;
}

/** Botella PET transparente centrada en el origen (alto aproximado: 150) */
const Bottle: React.FC<BottleProps> = ({ label, prefix }) => (
  <g>
    <defs>
      <linearGradient id={`${prefix}-glass`} x1="0" x2="1" y1="0" y2="0">
        <stop offset="0" stopColor="#dbeaf6" stopOpacity="0.85" />
        <stop offset="0.45" stopColor="#ffffff" stopOpacity="0.9" />
        <stop offset="1" stopColor="#c6dcee" stopOpacity="0.85" />
      </linearGradient>
    </defs>
    <ellipse cx="0" cy="74" rx="34" ry="5" fill="#000" opacity="0.12" />
    <rect x="-9" y="-78" width="18" height="11" rx="3" fill="#6fa3d6" />
    <path
      d="M-11 -66 C-11 -52 -31 -46 -31 -26 L-31 62 Q-31 72 -21 72 L21 72 Q31 72 31 62 L31 -26 C31 -46 11 -52 11 -66 Z"
      fill={`url(#${prefix}-glass)`}
      stroke="#9fbcd4"
      strokeWidth="1.2"
    />
    <rect x="-25" y="-22" width="5" height="76" rx="2.5" fill="#fff" opacity="0.7" />
    <path d="M-31 -2 Q0 4 31 -2" fill="none" stroke="#9fbcd4" strokeWidth="1" opacity="0.7" />
    <path d="M-31 52 Q0 58 31 52" fill="none" stroke="#9fbcd4" strokeWidth="1" opacity="0.7" />
    {label ? (
      <g>
        <rect x="-31" y="4" width="62" height="30" fill="#fff" opacity="0.92" />
        <rect x="-31" y="4" width="62" height="5" fill="#2f7dbd" />
        <text x="0" y="22" textAnchor="middle" fontSize="7" fontWeight="700" fill="#1f4f78" fontFamily="sans-serif">
          {label}
        </text>
        <text x="0" y="30" textAnchor="middle" fontSize="4.5" fill="#4a6f8f" fontFamily="sans-serif">
          NATURAL WATER
        </text>
      </g>
    ) : null}
  </g>
);

const scenes: Record<IllustrationName, () => ReactElement> = {
  bottle: () => (
    <svg viewBox="0 0 200 200" preserveAspectRatio="xMidYMid slice">
      <defs>
        <linearGradient id="il-bottle-bg" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0" stopColor="#f3f2ee" />
          <stop offset="1" stopColor="#dedbd2" />
        </linearGradient>
      </defs>
      <rect width="200" height="200" fill="url(#il-bottle-bg)" />
      <rect y="132" width="200" height="68" fill="#e9e5db" />
      <g transform="translate(100 98) scale(0.9)">
        <Bottle prefix="il-bottle" />
      </g>
    </svg>
  ),

  'bottle-label': () => (
    <svg viewBox="0 0 320 200" preserveAspectRatio="xMidYMid slice">
      <defs>
        <linearGradient id="il-bl-bg" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0" stopColor="#e6ebf0" />
          <stop offset="1" stopColor="#cfd8df" />
        </linearGradient>
        <filter id="il-bl-blur">
          <feGaussianBlur stdDeviation="3" />
        </filter>
      </defs>
      <rect width="320" height="200" fill="url(#il-bl-bg)" />
      <g filter="url(#il-bl-blur)" opacity="0.9">
        <rect x="24" y="52" width="104" height="58" rx="4" fill="#f4f1ea" />
        <rect x="34" y="62" width="84" height="12" fill="#dfe4ea" />
        <g fill="#cfe3f3">
          <rect x="30" y="20" width="14" height="36" rx="5" />
          <rect x="50" y="24" width="14" height="32" rx="5" />
          <rect x="70" y="18" width="14" height="38" rx="5" />
          <rect x="90" y="22" width="14" height="34" rx="5" />
        </g>
        <rect x="222" y="40" width="86" height="82" rx="6" fill="#9cc4e6" />
        <g fill="#7fb0dc">
          <circle cx="240" cy="64" r="12" />
          <circle cx="268" cy="62" r="12" />
          <circle cx="292" cy="68" r="10" />
          <circle cx="250" cy="94" r="12" />
          <circle cx="278" cy="96" r="12" />
        </g>
      </g>
      <rect y="150" width="320" height="50" fill="#f0eee8" />
      <g transform="translate(160 100) scale(0.95)">
        <Bottle prefix="il-bl" label="CLEAR SPRING" />
      </g>
    </svg>
  ),

  banana: () => (
    <svg viewBox="0 0 200 200" preserveAspectRatio="xMidYMid slice">
      <defs>
        <linearGradient id="il-ban-bg" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0" stopColor="#f7f4ee" />
          <stop offset="1" stopColor="#e4ddcf" />
        </linearGradient>
        <linearGradient id="il-ban-peel" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0" stopColor="#f8d44c" />
          <stop offset="1" stopColor="#e3a920" />
        </linearGradient>
      </defs>
      <rect width="200" height="200" fill="url(#il-ban-bg)" />
      <ellipse cx="100" cy="132" rx="62" ry="10" fill="#000" opacity="0.1" />
      <g transform="translate(100 112)">
        <ellipse cx="0" cy="6" rx="30" ry="14" fill="#f8f1d6" />
        <g fill="url(#il-ban-peel)" stroke="#c9961a" strokeWidth="1.5">
          <ellipse cx="-36" cy="-14" rx="14" ry="42" transform="rotate(-62 -36 -14)" />
          <ellipse cx="36" cy="-14" rx="14" ry="42" transform="rotate(62 36 -14)" />
          <ellipse cx="0" cy="-34" rx="15" ry="38" />
        </g>
        <path d="M0 -70 L0 -76" stroke="#6b4b14" strokeWidth="5" strokeLinecap="round" />
        <circle cx="-72" cy="-40" r="4" fill="#6b4b14" />
        <circle cx="72" cy="-40" r="4" fill="#6b4b14" />
      </g>
    </svg>
  ),

  napkin: () => (
    <svg viewBox="0 0 200 200" preserveAspectRatio="xMidYMid slice">
      <defs>
        <linearGradient id="il-nap-bg" x1="0" x2="1" y1="0" y2="1">
          <stop offset="0" stopColor="#6c6a68" />
          <stop offset="1" stopColor="#2f2e30" />
        </linearGradient>
      </defs>
      <rect width="200" height="200" fill="url(#il-nap-bg)" />
      <g transform="translate(100 104)">
        <path d="M-64 6 L-44 -38 L-6 -58 L38 -48 L68 -14 L58 36 L18 58 L-34 52 Z" fill="#eeeeee" />
        <path d="M-44 -38 L-6 -58 L-10 -10 Z" fill="#fafafa" />
        <path d="M-6 -58 L38 -48 L22 -6 L-10 -10 Z" fill="#dcdcdc" />
        <path d="M38 -48 L68 -14 L40 8 L22 -6 Z" fill="#f6f6f6" />
        <path d="M-64 6 L-44 -38 L-10 -10 L-30 24 Z" fill="#d4d4d6" />
        <path d="M-30 24 L-10 -10 L22 -6 L18 58 L-34 52 Z" fill="#e8e8ea" />
        <path d="M22 -6 L40 8 L58 36 L18 58 Z" fill="#cfcfd2" />
      </g>
    </svg>
  ),

  'home-recycling': () => (
    <svg viewBox="0 0 320 180" preserveAspectRatio="xMidYMid slice">
      <defs>
        <linearGradient id="il-home-wall" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0" stopColor="#d9c4a6" />
          <stop offset="1" stopColor="#bfa27f" />
        </linearGradient>
      </defs>
      <rect width="320" height="180" fill="url(#il-home-wall)" />
      <rect x="150" y="14" width="150" height="62" rx="4" fill="#f3e6cf" opacity="0.55" />
      <rect x="0" y="128" width="320" height="52" fill="#8d7059" />
      <rect x="0" y="124" width="320" height="6" fill="#a98b72" />
      <g transform="translate(34 78)">
        <rect x="-14" y="42" width="28" height="30" rx="4" fill="#d7d2c8" />
        <path d="M0 42 C-30 30 -26 4 -8 -4 C-6 14 0 28 0 42Z" fill="#4f8a58" />
        <path d="M0 42 C28 28 30 0 10 -10 C6 10 2 28 0 42Z" fill="#3f7a4c" />
        <path d="M0 42 C-8 20 6 2 4 -20 C16 -4 14 26 0 42Z" fill="#5c9a65" />
      </g>
      <g transform="translate(212 40)">
        <path d="M-52 140 C-52 90 -36 66 0 66 C36 66 52 90 52 140 Z" fill="#e7d9c6" />
        <path d="M-10 66 C-6 76 6 76 10 66 L8 56 L-8 56 Z" fill="#e0b896" />
        <ellipse cx="0" cy="36" rx="19" ry="23" fill="#e8c3a0" />
        <path d="M-22 40 C-28 6 -6 0 8 4 C26 8 28 30 22 44 C20 28 12 18 -2 18 C-12 18 -18 28 -22 40Z" fill="#5a3b26" />
        <path
          d="M-40 92 C-70 100 -86 112 -92 126"
          stroke="#e7d9c6"
          strokeWidth="20"
          strokeLinecap="round"
          fill="none"
        />
        <circle cx="-84" cy="74" r="9" fill="#e8c3a0" />
        <g transform="translate(-94 56) rotate(-30)">
          <rect x="-6" y="-14" width="12" height="6" rx="2" fill="#6fa3d6" />
          <rect x="-9" y="-9" width="18" height="34" rx="6" fill="#e8f1f8" opacity="0.85" stroke="#b6cde0" />
        </g>
      </g>
      <rect x="88" y="120" width="70" height="40" rx="5" fill="#4d6a8a" opacity="0.95" />
      <rect x="84" y="116" width="78" height="8" rx="3" fill="#5b7a9c" />
    </svg>
  ),

  materials: () => (
    <svg viewBox="0 0 320 180" preserveAspectRatio="xMidYMid slice">
      <defs>
        <linearGradient id="il-mat-bg" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0" stopColor="#e9e4d6" />
          <stop offset="1" stopColor="#cdd4bf" />
        </linearGradient>
      </defs>
      <rect width="320" height="180" fill="url(#il-mat-bg)" />
      <rect x="200" y="10" width="110" height="80" rx="4" fill="#f6efd8" opacity="0.7" />
      <rect y="132" width="320" height="48" fill="#b49a7b" />
      <rect y="128" width="320" height="6" fill="#c8ae8d" />
      <g>
        <rect x="46" y="64" width="20" height="66" rx="9" fill="#3f7d4e" />
        <rect x="52" y="44" width="8" height="26" rx="3" fill="#3f7d4e" />
        <rect x="76" y="76" width="22" height="54" rx="9" fill="#7a4b24" />
        <rect x="83" y="58" width="8" height="24" rx="3" fill="#7a4b24" />
        <rect x="108" y="86" width="30" height="44" rx="6" fill="#dcebf4" opacity="0.9" stroke="#a9c2d3" />
        <rect x="112" y="80" width="22" height="8" rx="2" fill="#a9c2d3" />
      </g>
      <g transform="translate(190 76)">
        <rect x="0" y="0" width="70" height="56" rx="6" fill="#7b8a83" />
        <rect x="-4" y="-6" width="78" height="10" rx="4" fill="#98a69f" />
        <rect x="10" y="18" width="50" height="20" rx="3" fill="#e8efe9" />
        <text x="35" y="32" textAnchor="middle" fontSize="9" fontWeight="700" fill="#4d5e55" fontFamily="sans-serif">
          COMPOST
        </text>
      </g>
      <g transform="translate(284 130)">
        <path d="M0 0 C-22 -10 -24 -36 -8 -46 C-4 -26 0 -12 0 0Z" fill="#4f8a58" />
        <path d="M0 0 C20 -8 24 -30 8 -44 C4 -24 2 -10 0 0Z" fill="#3f7a4c" />
      </g>
    </svg>
  ),

  cluttered: () => (
    <svg viewBox="0 0 200 200" preserveAspectRatio="xMidYMid slice">
      <rect width="200" height="200" fill="#e4d9c4" />
      <rect y="120" width="200" height="80" fill="#c9bba0" />
      <g stroke="#3d3a36" strokeWidth="2">
        <rect x="14" y="52" width="34" height="86" rx="8" fill="#7da2b8" />
        <rect x="46" y="76" width="42" height="60" rx="5" fill="#d86f4f" />
        <rect x="84" y="40" width="30" height="98" rx="10" fill="#e6c26a" />
        <rect x="112" y="84" width="38" height="52" rx="6" fill="#8aa56c" />
        <rect x="146" y="58" width="34" height="80" rx="8" fill="#5f6f93" />
        <circle cx="64" cy="58" r="14" fill="#c24b43" />
        <circle cx="136" cy="62" r="12" fill="#f0e2c2" />
        <path d="M20 148 L60 168 L100 150 L150 170 L186 152" fill="none" strokeWidth="6" strokeLinecap="round" />
      </g>
      <g opacity="0.55" stroke="#3d3a36" strokeWidth="2">
        <rect x="36" y="100" width="64" height="30" rx="4" fill="#f4efe3" />
        <rect x="96" y="108" width="62" height="26" rx="4" fill="#b78d56" />
      </g>
    </svg>
  ),

  'camera-scene': () => (
    <svg viewBox="0 0 240 320" preserveAspectRatio="xMidYMid slice">
      <defs>
        <linearGradient id="il-cam-bg" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0" stopColor="#9aa7ab" />
          <stop offset="0.55" stopColor="#c6c2b6" />
          <stop offset="1" stopColor="#e8e6e2" />
        </linearGradient>
        <filter id="il-cam-blur">
          <feGaussianBlur stdDeviation="6" />
        </filter>
        <linearGradient id="il-cam-glass" x1="0" x2="1" y1="0" y2="0">
          <stop offset="0" stopColor="#b9d8ea" stopOpacity="0.9" />
          <stop offset="0.5" stopColor="#eaf6fd" stopOpacity="0.95" />
          <stop offset="1" stopColor="#a9cde2" stopOpacity="0.9" />
        </linearGradient>
      </defs>
      <rect width="240" height="320" fill="url(#il-cam-bg)" />
      <g filter="url(#il-cam-blur)">
        <rect x="-10" y="20" width="110" height="170" fill="#dfe7ea" opacity="0.8" />
        <rect x="170" y="90" width="80" height="80" fill="#b68a4b" opacity="0.8" />
        <rect x="40" y="130" width="40" height="60" fill="#6f7a7f" opacity="0.5" />
        <circle cx="200" cy="60" r="26" fill="#d9e6d2" opacity="0.7" />
      </g>
      <rect y="214" width="240" height="106" fill="#ebe9e5" />
      <rect y="212" width="240" height="4" fill="#fff" opacity="0.7" />
      <ellipse cx="120" cy="246" rx="34" ry="5" fill="#000" opacity="0.14" />
      <rect x="110" y="62" width="20" height="12" rx="3" fill="#2f7dbd" />
      <path
        d="M112 74 C112 90 86 98 86 124 L86 238 Q86 246 96 246 L144 246 Q154 246 154 238 L154 124 C154 98 128 90 128 74 Z"
        fill="url(#il-cam-glass)"
        stroke="#9fbcd4"
        strokeWidth="1.2"
      />
      <rect x="86" y="132" width="68" height="62" fill="#1d6f9c" />
      <text x="120" y="156" textAnchor="middle" fontSize="12" fontWeight="800" fill="#fff" fontFamily="sans-serif">
        REFILL
      </text>
      <text x="120" y="172" textAnchor="middle" fontSize="12" fontWeight="800" fill="#7ee7c4" fontFamily="sans-serif">
        BOTTLE
      </text>
      <rect x="94" y="100" width="6" height="130" rx="3" fill="#fff" opacity="0.6" />
    </svg>
  ),
};

/** Ilustración vectorial local usada como placeholder de fotografías */
const Illustration: React.FC<IllustrationProps> = ({ name, label, className = '' }) => (
  <div
    className={`illustration ${className}`.trim()}
    role={label ? 'img' : undefined}
    aria-label={label}
    aria-hidden={label ? undefined : true}
  >
    {scenes[name]()}
  </div>
);

export default Illustration;
