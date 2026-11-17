import React from 'react';
import {
  Smartphone,
  Layers,
  Grid3X3,
  Sparkles,
  Sun,
  Moon,
  Eye,
  ZoomIn,
  ZoomOut,
  Maximize2,
  FolderGit2,
  AlertTriangle,
  MonitorCheck,
  Columns2,
  Palette
} from 'lucide-react';
import { ViewMode, DeviceLayout, WallpaperTheme, StudioTheme, ExpoState } from '../types';

interface FloatingSidebarProps {
  state: ExpoState;
  viewMode: ViewMode;
  setViewMode: (mode: ViewMode) => void;
  deviceLayout: DeviceLayout;
  setDeviceLayout: (layout: DeviceLayout) => void;
  zoom: number;
  setZoom: (zoom: number) => void;
  isSplashDark: boolean;
  setIsSplashDark: (dark: boolean) => void;
  studioTheme: StudioTheme;
  setStudioTheme: (theme: StudioTheme) => void;
}

export const FloatingSidebar: React.FC<FloatingSidebarProps> = ({
  state,
  viewMode,
  setViewMode,
  deviceLayout,
  setDeviceLayout,
  zoom,
  setZoom,
  isSplashDark,
  setIsSplashDark,
  studioTheme,
  setStudioTheme,
}) => {
  const isLight = studioTheme === 'light';
  const hasWarnings = state.warnings && state.warnings.length > 0;

  const toggleStudioTheme = () => {
    setStudioTheme(isLight ? 'dark' : 'light');
  };

  const navItems: { mode: ViewMode; label: string; icon: React.FC<{ className?: string }> }[] = [
    { mode: 'homescreen', label: 'Homescreen', icon: Grid3X3 },
    { mode: 'splash', label: 'Splash Screen', icon: Sparkles },
    { mode: 'inspector', label: 'Crop & Safe Zone', icon: Layers },
    { mode: 'sizes', label: 'Size Matrix', icon: Eye },
  ];

  return (
    <aside
      className={`fixed left-5 top-5 bottom-5 w-[252px] rounded-3xl z-50 flex flex-col justify-between p-4 select-none transition-all duration-300 ${isLight
          ? 'bg-white/80 backdrop-blur-2xl border border-black/[0.08] shadow-[0_20px_50px_rgba(15,23,42,0.12),inset_0_1px_0_rgba(255,255,255,0.9)] text-slate-800'
          : 'bg-[#0f1219]/80 backdrop-blur-2xl border border-white/[0.09] shadow-[0_24px_64px_rgba(0,0,0,0.7),inset_0_1px_0_rgba(255,255,255,0.12)] text-white'
        }`}
    >
      {/* Top Half: Brand & Navigation */}
      <div className="flex flex-col gap-5">
        {/* App Branding Pill */}
        <div className={`p-3 rounded-2xl flex items-center gap-3 transition-colors ${isLight ? 'bg-slate-100/70 border border-slate-200/60' : 'bg-white/[0.03] border border-white/[0.06]'
          }`}>
          <img 
            src="/assets/iconpeek.png" 
            alt="iconpeek" 
            className="w-10 h-10 object-contain select-none shrink-0 drop-shadow-sm" 
          />
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-1.5">
              <span className={`font-bold text-sm tracking-tight truncate ${isLight ? 'text-slate-900' : 'text-white'}`}>
                iconpeek
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse shrink-0" />
            </div>
            <div className={`text-[11px] truncate flex items-center gap-1 font-mono ${isLight ? 'text-slate-500' : 'text-slate-400'}`} title={state.projectRoot}>
              <span className="truncate">{state.expo.name || 'Expo App'}</span>
            </div>
          </div>
        </div>

        {/* SECTION 1: View Modes */}
        <div className="flex flex-col gap-1.5">
          <span className={`text-[10px] font-semibold uppercase tracking-wider px-2 ${isLight ? 'text-slate-400' : 'text-slate-500'}`}>
            Views
          </span>
          <div className="flex flex-col gap-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = viewMode === item.mode;
              return (
                <button
                  key={item.mode}
                  onClick={() => setViewMode(item.mode)}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-medium transition-all ${isActive
                      ? 'bg-blue-600 text-white shadow-md shadow-blue-500/25 font-semibold'
                      : isLight
                        ? 'text-slate-600 hover:text-slate-900 hover:bg-black/[0.04]'
                        : 'text-slate-400 hover:text-white hover:bg-white/[0.04]'
                    }`}
                >
                  <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-white' : isLight ? 'text-slate-500' : 'text-slate-400'}`} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* SECTION 2: Device Layout Switcher */}
        <div className="flex flex-col gap-1.5">
          <span className={`text-[10px] font-semibold uppercase tracking-wider px-2 ${isLight ? 'text-slate-400' : 'text-slate-500'}`}>
            Emulators
          </span>
          <div className={`p-1 rounded-xl flex flex-col gap-1 border ${isLight ? 'bg-slate-100/70 border-slate-200/60' : 'bg-white/[0.03] border-white/[0.06]'
            }`}>
            <button
              onClick={() => setDeviceLayout('both')}
              className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg text-xs transition-all ${deviceLayout === 'both'
                  ? isLight ? 'bg-white text-slate-900 font-semibold shadow-sm' : 'bg-white/10 text-white font-medium'
                  : isLight ? 'text-slate-600 hover:text-slate-900' : 'text-slate-400 hover:text-white'
                }`}
            >
              <span>Split (Both)</span>
              <Columns2 className="w-3.5 h-3.5 opacity-60" />
            </button>
            <button
              onClick={() => setDeviceLayout('ios')}
              className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg text-xs transition-all ${deviceLayout === 'ios'
                  ? isLight ? 'bg-white text-slate-900 font-semibold shadow-sm' : 'bg-white/10 text-white font-medium'
                  : isLight ? 'text-slate-600 hover:text-slate-900' : 'text-slate-400 hover:text-white'
                }`}
            >
              <span>Iphone (IOS)</span>
              <span className="text-[10px] opacity-60">iOS</span>
            </button>
            <button
              onClick={() => setDeviceLayout('android')}
              className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg text-xs transition-all ${deviceLayout === 'android'
                  ? isLight ? 'bg-white text-slate-900 font-semibold shadow-sm' : 'bg-white/10 text-white font-medium'
                  : isLight ? 'text-slate-600 hover:text-slate-900' : 'text-slate-400 hover:text-white'
                }`}
            >
              <span>Galaxy S24</span>
              <span className="text-[10px] opacity-60">One UI</span>
            </button>
          </div>
        </div>

        {/* SECTION 3: Splash Screen Theme Toggle (Only in splash mode) */}
        {viewMode === 'splash' && (
          <div className="flex flex-col gap-1.5">
            <span className={`text-[10px] font-semibold uppercase tracking-wider px-2 ${isLight ? 'text-slate-400' : 'text-slate-500'}`}>
              Splash Preview Mode
            </span>
            <div className={`p-1 rounded-xl flex items-center gap-1 border ${isLight ? 'bg-slate-100/70 border-slate-200/60' : 'bg-white/[0.03] border-white/[0.06]'
              }`}>
              <button
                onClick={() => setIsSplashDark(false)}
                className={`flex-1 flex items-center justify-center gap-1.5 py-1 rounded-lg text-xs transition-all ${!isSplashDark ? 'bg-amber-500 text-black font-semibold shadow-sm' : isLight ? 'text-slate-600' : 'text-slate-400 hover:text-white'
                  }`}
              >
                <Sun className="w-3.5 h-3.5" />
                <span>Light</span>
              </button>
              <button
                onClick={() => setIsSplashDark(true)}
                className={`flex-1 flex items-center justify-center gap-1.5 py-1 rounded-lg text-xs transition-all ${isSplashDark ? 'bg-indigo-600 text-white font-semibold shadow-sm' : isLight ? 'text-slate-600' : 'text-slate-400 hover:text-white'
                  }`}
              >
                <Moon className="w-3.5 h-3.5" />
                <span>Dark</span>
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Bottom Half: Zoom, Wallpaper, Theme Toggle & Warnings */}
      <div className="flex flex-col gap-3 pt-4 border-t border-black/[0.06] dark:border-white/[0.06]">
        {/* Zoom Controls */}
        <div className="flex flex-col gap-1">
          <div className="flex items-center justify-between px-2 text-[10px] font-semibold uppercase tracking-wider opacity-60">
            <span>Canvas Zoom</span>
            <span className="font-mono">{Math.round(zoom * 100)}%</span>
          </div>
          <div className={`p-1 rounded-xl flex items-center justify-between border ${isLight ? 'bg-slate-100/70 border-slate-200/60 text-slate-700' : 'bg-white/[0.03] border-white/[0.06] text-slate-300'
            }`}>
            <button
              onClick={() => setZoom(Math.max(0.5, Number((zoom - 0.1).toFixed(1))))}
              className={`p-1.5 rounded-lg ${isLight ? 'hover:bg-slate-200 text-slate-700' : 'hover:bg-white/10 text-slate-300'}`}
              title="Zoom Out"
            >
              <ZoomOut className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setZoom(0.85)}
              className={`text-xs font-mono font-medium px-2 py-0.5 rounded ${isLight ? 'hover:bg-slate-200' : 'hover:bg-white/10'}`}
              title="Reset scale"
            >
              Reset
            </button>
            <button
              onClick={() => setZoom(Math.min(1.3, Number((zoom + 0.1).toFixed(1))))}
              className={`p-1.5 rounded-lg ${isLight ? 'hover:bg-slate-200 text-slate-700' : 'hover:bg-white/10 text-slate-300'}`}
              title="Zoom In"
            >
              <ZoomIn className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Studio Theme Switcher */}
        <button
          onClick={toggleStudioTheme}
          className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium border transition-all ${isLight
              ? 'bg-slate-100 hover:bg-slate-200 text-slate-900 border-slate-300/80 shadow-sm'
              : 'bg-white/[0.06] hover:bg-white/[0.1] text-slate-200 border-white/10'
            }`}
        >
          <div className="flex items-center gap-2">
            {isLight ? (
              <Sun className="w-4 h-4 text-amber-500 fill-amber-500/20" />
            ) : (
              <Moon className="w-4 h-4 text-indigo-400 fill-indigo-400/20" />
            )}
            <span>{isLight ? 'Studio Light Mode' : 'Studio Dark Mode'}</span>
          </div>
          <span className="text-[10px] font-mono opacity-60">
            {isLight ? 'LIGHT' : 'DARK'}
          </span>
        </button>

        {/* Warning Indicator (if any) */}
        {hasWarnings && (
          <div
            className="flex items-center gap-2 p-2 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-500 text-[11px]"
            title={state.warnings.join('\n')}
          >
            <AlertTriangle className="w-3.5 h-3.5 shrink-0" />
            <span className="truncate">{state.warnings.length} warning{state.warnings.length > 1 ? 's' : ''}</span>
          </div>
        )}
      </div>
    </aside>
  );
};
