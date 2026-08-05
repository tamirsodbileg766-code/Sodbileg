import React from 'react';

interface BatLogoProps {
  className?: string;
  size?: number;
}

export const BatLogo: React.FC<BatLogoProps> = ({ className = '', size = 32 }) => {
  return (
    <div className={`inline-flex items-center justify-center ${className}`}>
      <svg
        width={size}
        height={size}
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="transition-transform duration-300 hover:scale-105"
      >
        {/* Sleek minimalist geometric bat logo inspired by high-contrast style guide */}
        <path
          d="M50 25 C45 20, 35 15, 10 25 C25 35, 30 50, 20 65 C35 60, 45 70, 50 85 C55 70, 65 60, 80 65 C70 50, 75 35, 90 25 C65 15, 55 20, 50 25 Z"
          fill="currentColor"
        />
        {/* Inner geometric bat ears & wing cutouts */}
        <path
          d="M45 22 L42 12 L48 18 Z M55 22 L58 12 L52 18 Z"
          fill="currentColor"
        />
        <circle cx="50" cy="42" r="3" fill="#e11d48" className="animate-pulse" />
      </svg>
    </div>
  );
};
