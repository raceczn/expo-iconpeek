import React from 'react';
import { IoSparkles } from 'react-icons/io5';

interface IOSAppIconProps {
  name: string;
  children: React.ReactNode;
  onClick?: () => void;
  isHero?: boolean;
  title?: string;
}

export const IOSAppIcon: React.FC<IOSAppIconProps> = ({
  name,
  children,
  onClick,
  isHero = false,
  title
}) => {
  return (
    <div 
      className={`flex flex-col items-center gap-1 select-none ${isHero ? 'group cursor-pointer interactive-icon' : ''}`}
      onClick={onClick}
      title={title}
    >
      <div className={`relative w-[52px] h-[52px] ios-squircle shadow-md ${isHero ? 'app-highlight-ring group-hover:scale-105 transition-all' : ''}`}>
        {children}
        {isHero && (
          <div className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-blue-500 text-white flex items-center justify-center shadow-md">
            <IoSparkles className="w-2.5 h-2.5 fill-current" />
          </div>
        )}
      </div>
      <span className="text-[11px] font-medium text-white truncate max-w-[62px] text-center drop-shadow-[0_1px_2px_rgba(0,0,0,0.7)]">
        {name}
      </span>
    </div>
  );
};
