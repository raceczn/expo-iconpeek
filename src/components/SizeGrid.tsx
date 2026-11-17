import React from 'react';
import { Layers } from 'lucide-react';
import { ExpoState, StudioTheme } from '../types';

interface SizeGridProps {
  state: ExpoState;
  studioTheme?: StudioTheme;
}

export const SizeGrid: React.FC<SizeGridProps> = ({ state, studioTheme = 'dark' }) => {
  const isLight = studioTheme === 'light';

  const androidDensities = [
    { label: 'mdpi', size: 48, context: 'Legacy / low-res screens' },
    { label: 'hdpi', size: 72, context: 'Baseline Android' },
    { label: 'xhdpi', size: 96, context: '720p displays' },
    { label: 'xxhdpi', size: 144, context: '1080p flagships' },
    { label: 'xxxhdpi', size: 192, context: '1440p / 4K flagships' },
  ];

  const iosSizes = [
    { label: 'Notification', size: 40, scale: '2x / 3x', pt: '20pt' },
    { label: 'Settings', size: 58, scale: '2x / 3x', pt: '29pt' },
    { label: 'Spotlight', size: 80, scale: '2x / 3x', pt: '40pt' },
    { label: 'iPhone Home', size: 120, scale: '2x / 60pt', pt: '60pt' },
    { label: 'iPhone Max', size: 180, scale: '3x / 60pt', pt: '60pt' },
  ];

  return (
    <div className="w-full max-w-5xl mx-auto flex flex-col gap-8 pb-16">
      {/* Android Densities */}
      <div className={`rounded-2xl border p-6 shadow-xl transition-colors ${
        isLight ? 'bg-white border-slate-200 shadow-slate-200/50' : 'bg-[#141720] border-white/[0.08]'
      }`}>
        <div className="flex items-center gap-2 mb-6">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
          <h3 className={`font-semibold text-base ${isLight ? 'text-slate-900' : 'text-white'}`}>Android System Densities</h3>
          <span className={`text-xs font-mono ml-auto ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>Adaptive & Legacy</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6">
          {androidDensities.map((item) => (
            <div 
              key={item.label} 
              className={`flex flex-col items-center p-4 rounded-xl border transition-all ${
                isLight 
                  ? 'bg-slate-50 border-slate-200 hover:border-slate-300' 
                  : 'bg-white/[0.02] border-white/[0.06] hover:border-white/15'
              }`}
            >
              <div 
                className="rounded-full shadow-lg overflow-hidden flex items-center justify-center bg-slate-900 border border-black/10"
                style={{ width: `${item.size}px`, height: `${item.size}px` }}
              >
                <img 
                  src="/assets/icon" 
                  alt={item.label}
                  className="w-full h-full object-cover select-none"
                />
              </div>
              <span className={`mt-3 font-mono font-semibold text-sm ${isLight ? 'text-slate-800' : 'text-white'}`}>{item.label}</span>
              <span className={`text-xs font-mono ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>{item.size} × {item.size} px</span>
              <span className="text-[10px] text-slate-500 text-center mt-1">{item.context}</span>
            </div>
          ))}
        </div>
      </div>

      {/* iOS Sizes */}
      <div className={`rounded-2xl border p-6 shadow-xl transition-colors ${
        isLight ? 'bg-white border-slate-200 shadow-slate-200/50' : 'bg-[#141720] border-white/[0.08]'
      }`}>
        <div className="flex items-center gap-2 mb-6">
          <span className="w-2.5 h-2.5 rounded-full bg-blue-500" />
          <h3 className={`font-semibold text-base ${isLight ? 'text-slate-900' : 'text-white'}`}>iOS System Scales & Contexts</h3>
          <span className={`text-xs font-mono ml-auto ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>AppIcon.appiconset</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6">
          {iosSizes.map((item) => (
            <div 
              key={item.label} 
              className={`flex flex-col items-center p-4 rounded-xl border transition-all ${
                isLight 
                  ? 'bg-slate-50 border-slate-200 hover:border-slate-300' 
                  : 'bg-white/[0.02] border-white/[0.06] hover:border-white/15'
              }`}
            >
              <div 
                className="ios-squircle shadow-lg overflow-hidden flex items-center justify-center bg-black border border-black/10"
                style={{ width: `${item.size}px`, height: `${item.size}px` }}
              >
                <img 
                  src="/assets/ios-icon" 
                  alt={item.label}
                  className="w-full h-full object-cover select-none"
                />
              </div>
              <span className={`mt-3 font-semibold text-sm ${isLight ? 'text-slate-800' : 'text-white'}`}>{item.label}</span>
              <span className={`text-xs font-mono ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>{item.size}px ({item.scale})</span>
              <span className="text-[10px] text-slate-500 text-center mt-1">{item.pt}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
