import React from 'react';
import { Wifi } from 'lucide-react';

interface IOSStatusBarProps {
  time?: string;
  color?: string;
  showDynamicIsland?: boolean;
}

export const IOSStatusBar: React.FC<IOSStatusBarProps> = ({
  time = '10:00',
  color = '#FFFFFF',
  showDynamicIsland = true,
}) => {
  return (
    <>
      {/* iOS Dynamic Island */}
      {showDynamicIsland && (
        <div className="absolute top-2.5 left-1/2 -translate-x-1/2 w-[114px] h-[30px] bg-black rounded-full z-40 flex items-center justify-between px-3 shadow-sm pointer-events-none">
          <div className="w-2.5 h-2.5 rounded-full bg-[#0d1624] border border-[#1e2d42]/60 flex items-center justify-center">
            <div className="w-1 h-1 rounded-full bg-[#1c385c]" />
          </div>
          <div className="w-2 h-2 rounded-full bg-[#0a0c10]" />
        </div>
      )}

      {/* iOS Status Bar Text & Indicators */}
      <div 
        className="h-11 w-full flex items-center justify-between px-7 pt-1 font-sans text-xs font-semibold z-30 shrink-0 select-none" 
        style={{ color }}
      >
        <span className="font-bold text-[13.5px] tracking-tight">{time}</span>
        <div className="flex items-center gap-1.5">
          {/* Cellular Signal Bars */}
          <div className="flex items-end gap-[1.5px] h-3">
            <span className="w-[3px] h-1 rounded-xs bg-current" />
            <span className="w-[3px] h-1.5 rounded-xs bg-current" />
            <span className="w-[3px] h-2 rounded-xs bg-current" />
            <span className="w-[3px] h-2.5 rounded-xs bg-current" />
          </div>
          <span className="text-[10px] font-bold tracking-wider">5G</span>
          <Wifi className="w-3.5 h-3.5 stroke-[2.5]" />
          {/* Battery Indicator */}
          <div className="flex items-center gap-0.5">
            <div className="w-5 h-2.5 rounded-[4px] border border-current p-0.5 flex items-center">
              <div className="h-full w-4/5 rounded-[2px] bg-current" />
            </div>
            <div className="w-0.5 h-1 rounded-r-xs bg-current" />
          </div>
        </div>
      </div>
    </>
  );
};
