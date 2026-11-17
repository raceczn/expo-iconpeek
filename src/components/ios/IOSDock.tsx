import React from 'react';
import { IoSearch } from 'react-icons/io5';

interface IOSDockProps {
  children: React.ReactNode;
}

export const IOSDock: React.FC<IOSDockProps> = ({ children }) => {
  return (
    <div className="h-[74px] rounded-[30px] bg-white/30 backdrop-blur-2xl flex items-center justify-around px-3 shadow-xl border border-white/25">
      {children}
    </div>
  );
};

export const IOSSearchPill: React.FC = () => {
  return (
    <div className="flex justify-center my-0.5 select-none">
      <div className="px-3.5 py-1 rounded-full bg-black/25 backdrop-blur-md border border-white/15 flex items-center gap-1.5 text-white/95 shadow-sm">
        <IoSearch className="w-3 h-3 text-white/80" />
        <span className="text-[11px] font-medium tracking-tight">Search</span>
      </div>
    </div>
  );
};

export const IOSHomeIndicator: React.FC<{ onHomePress?: () => void }> = ({ onHomePress }) => {
  return (
    <div 
      className="absolute bottom-2 left-1/2 -translate-x-1/2 w-32 h-1 bg-white/80 rounded-full cursor-pointer hover:bg-white transition-all z-40"
      onClick={onHomePress}
      title="Return to Homescreen"
    />
  );
};
