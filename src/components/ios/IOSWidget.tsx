import React from 'react';
import { IoFolder } from 'react-icons/io5';

interface IOSWidgetProps {
  label: string;
  children: React.ReactNode;
}

export const IOSWidget: React.FC<IOSWidgetProps> = ({ label, children }) => {
  return (
    <div className="flex flex-col items-center">
      <div className="w-full h-[146px] rounded-[22px] bg-white overflow-hidden shadow-md border border-black/5 flex flex-col">
        {children}
      </div>
      <span className="text-[11px] font-medium text-white mt-1 drop-shadow-[0_1px_2px_rgba(0,0,0,0.7)]">
        {label}
      </span>
    </div>
  );
};

export const IOSNotesWidget: React.FC = () => {
  return (
    <IOSWidget label="Notes">
      {/* Yellow Notes Header */}
      <div className="bg-[#FFCC00] px-3.5 py-2 flex items-center gap-1.5 text-white shadow-xs">
        <IoFolder className="w-4 h-4 fill-white" />
        <span className="font-semibold text-xs tracking-tight">Notes</span>
      </div>
      {/* Notes Body */}
      <div className="p-3.5 flex-1 flex flex-col justify-between bg-white">
        <div className="text-[13px] text-[#8E8E93] font-normal">
          No Notes
        </div>
        <div className="w-full border-t border-slate-100" />
      </div>
    </IOSWidget>
  );
};

export const IOSCalendarWidget: React.FC<{ day?: string; date?: number | string; event?: string }> = ({
  day = 'Wednesday',
  date = 3,
  event = 'No events today'
}) => {
  return (
    <IOSWidget label="Calendar">
      <div className="p-3.5 h-full flex flex-col justify-between bg-white">
        <div>
          <div className="text-[#FF3B30] text-[11px] font-bold tracking-wider uppercase">
            {day}
          </div>
          <div className="text-[38px] font-semibold text-[#1C1C1E] leading-tight mt-0.5">
            {date}
          </div>
        </div>
        <div className="text-[12px] text-[#8E8E93] font-normal">
          {event}
        </div>
      </div>
    </IOSWidget>
  );
};
