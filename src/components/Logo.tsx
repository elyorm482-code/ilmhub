import React from 'react';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showText?: boolean;
  className?: string;
}

export const Logo: React.FC<LogoProps> = ({ size = 'md', showText = true, className = '' }) => {
  const iconSizes = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-12 h-12',
    xl: 'w-16 h-16',
  };

  const textSizes = {
    sm: 'text-lg',
    md: 'text-xl',
    lg: 'text-2xl',
    xl: 'text-3xl',
  };

  return (
    <div className={`flex items-center gap-3 select-none ${className}`}>
      {/* Brand Icon: Deep Blue Background, White Open Book, Golden Star */}
      <div
        className={`relative ${iconSizes[size]} rounded-2xl bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-900 p-2 shadow-lg shadow-blue-500/25 flex items-center justify-center transition-transform hover:scale-105`}
      >
        <svg
          viewBox="0 0 48 48"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full"
        >
          {/* Subtle glow / inner badge */}
          <rect width="48" height="48" rx="12" fill="none" />
          
          {/* Open Book shape in crisp white */}
          <path
            d="M8 34.5C12.5 33 19 33 24 36C29 33 35.5 33 40 34.5V13.5C35.5 12 29 12 24 15C19 12 12.5 12 8 13.5V34.5Z"
            fill="#FFFFFF"
            fillOpacity="0.96"
          />
          <path
            d="M24 15V36"
            stroke="#1D4ED8"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
          {/* Book page ridges */}
          <path
            d="M13 18.5C16.5 17.5 20.5 17.5 24 18.5"
            stroke="#93C5FD"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
          <path
            d="M13 23C16.5 22 20.5 22 24 23"
            stroke="#93C5FD"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
          <path
            d="M24 18.5C27.5 17.5 31.5 17.5 35 18.5"
            stroke="#93C5FD"
            strokeWidth="1.5"
            strokeLinecap="round"
          />

          {/* Golden Yellow Spark / Star on Top Right */}
          <g filter="url(#glow)">
            <path
              d="M37 7L38.5 11L42.5 12.5L38.5 14L37 18L35.5 14L31.5 12.5L35.5 11L37 7Z"
              fill="#FBBF24"
            />
            <circle cx="37" cy="12.5" r="1.5" fill="#FFFBEB" />
          </g>

          <defs>
            <filter id="glow" x="28" y="4" width="18" height="18" filterUnits="userSpaceOnUse">
              <feGaussianBlur stdDeviation="1" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>
        </svg>
      </div>

      {showText && (
        <div className="flex flex-col">
          <div className="flex items-center gap-1.5">
            <span
              className={`font-extrabold tracking-tight bg-gradient-to-r from-blue-700 via-indigo-700 to-blue-900 dark:from-blue-400 dark:via-blue-300 dark:to-indigo-200 bg-clip-text text-transparent font-['Plus_Jakarta_Sans'] ${textSizes[size]}`}
            >
              Lobeble
            </span>
            <span className="inline-block w-2 h-2 rounded-full bg-amber-400 animate-pulse"></span>
          </div>
          <span className="text-[10px] tracking-wider uppercase font-semibold text-slate-500 dark:text-slate-400 -mt-1">
            Ta'lim Markazi
          </span>
        </div>
      )}
    </div>
  );
};
