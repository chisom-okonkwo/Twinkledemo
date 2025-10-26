interface TwinkleLogoProps {
  size?: 'sm' | 'md' | 'lg';
  showText?: boolean;
}

export function TwinkleLogo({ size = 'md', showText = true }: TwinkleLogoProps) {
  const sizes = {
    sm: { icon: 20, text: 'text-base' },
    md: { icon: 24, text: 'text-lg' },
    lg: { icon: 28, text: 'text-xl' },
  };

  const currentSize = sizes[size];

  return (
    <div className="flex items-center gap-2">
      {/* Star Icon */}
      <div className="relative" style={{ width: currentSize.icon, height: currentSize.icon }}>
        <svg
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full"
        >
          <path
            d="M12 2L14.09 8.26L20 10L14.09 11.74L12 18L9.91 11.74L4 10L9.91 8.26L12 2Z"
            fill="#FFA500"
            className="opacity-90"
          />
          <path
            d="M19 11L19.75 13.25L22 14L19.75 14.75L19 17L18.25 14.75L16 14L18.25 13.25L19 11Z"
            fill="#FFD700"
            className="opacity-80"
          />
        </svg>
      </div>

      {/* App Name */}
      {showText && (
        <span className={`${currentSize.text} tracking-tight text-gray-800`}>
          Twinkle
        </span>
      )}
    </div>
  );
}
