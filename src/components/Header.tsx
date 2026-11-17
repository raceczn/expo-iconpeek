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
  AlertTriangle
} from 'lucide-react';
import { ViewMode, DeviceLayout, WallpaperTheme, StudioTheme, ExpoState } from '../types';

interface HeaderProps {
  state: ExpoState;
  viewMode: ViewMode;
  setViewMode: (mode: ViewMode) => void;
  deviceLayout: DeviceLayout;
  setDeviceLayout: (layout: DeviceLayout) => void;
  zoom: number;
  setZoom: (zoom: number) => void;
  wallpaper: WallpaperTheme;
  setWallpaper: (wp: WallpaperTheme) => void;
  isSplashDark: boolean;
  setIsSplashDark: (dark: boolean) => void;
  studioTheme: StudioTheme;
  setStudioTheme: (theme: StudioTheme) => void;
}

export const Header: React.FC<HeaderProps> = ({
  state,
  viewMode,
  setViewMode,
  deviceLayout,
  setDeviceLayout,
  zoom,
  setZoom,
  wallpaper,
  setWallpaper,
  isSplashDark,
  setIsSplashDark,
  studioTheme,
  setStudioTheme,
}) => {
  const isLight = studioTheme === 'light';
  const hasWarnings = state.warnings && state.warnings.length > 0;

  const darkWallpapers: WallpaperTheme[] = ['deep-space', 'titanium', 'sunset', 'studio-grid'];
  const lightWallpapers: WallpaperTheme[] = ['light-studio', 'light-silver', 'light-sunset', 'light-grid'];
  const activeWallpapers = isLight ? lightWallpapers : darkWallpapers;

  const toggleStudioTheme = () => {
    if (isLight) {
      setStudioTheme('dark');
      if (lightWallpapers.includes(wallpaper)) {
        setWallpaper('deep-space');
      }
    } else {
      setStudioTheme('light');
      if (darkWallpapers.includes(wallpaper)) {
        setWallpaper('light-studio');
      }
    }
  };

  return (
    <header className={`w-full h-16 backdrop-blur-md px-5 flex items-center justify-between shrink-0 z-50 select-none transition-colors duration-200 ${isLight
        ? 'bg-white/95 border-b border-slate-200/90 shadow-sm text-slate-800'
        : 'bg-[#0f1219]/95 border-b border-white/[0.08] text-white'
      }`}>
      {/* Brand & Project Info */}
      <div className="flex items-center gap-4 min-w-[260px]">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-violet-500 flex items-center justify-center shadow-lg shadow-blue-500/25 border border-white/20">
            <Smartphone className="w-5 h-5 text-white" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className={`font-bold text-base tracking-tight ${isLight ? 'text-slate-900' : 'text-white'}`}>
                iconpeek
              </span>
              <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-medium bg-emerald-500/15 text-emerald-500 border border-emerald-500/30">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                Live
              </span>
            </div>
            <div className={`flex items-center gap-1.5 text-xs font-mono truncate max-w-[200px] ${isLight ? 'text-slate-500' : 'text-slate-400'}`} title={state.projectRoot}>
              <FolderGit2 className="w-3.5 h-3.5 opacity-60 shrink-0" />
              <span className="truncate">{state.expo.name || 'Expo App'}</span>
              <span className="opacity-40">•</span>
              <span className={`text-[11px] px-1.5 py-0.2 rounded font-mono ${isLight ? 'bg-slate-100 text-slate-600 border border-slate-200/60' : 'bg-white/[0.06] text-slate-300'}`}>
                {state.configName || 'No config'}
              </span>
            </div>
          </div>
        </div>

        {hasWarnings && (
          <div
            className="hidden xl:flex items-center gap-1 px-2.5 py-1 rounded-lg bg-amber-500/10 border border-amber-500/25 text-amber-500 text-xs font-medium"
            title={state.warnings.join('\n')}
          >
            <AlertTriangle className="w-3.5 h-3.5 text-amber-500" />
            <span>{state.warnings.length} warning{state.warnings.length > 1 ? 's' : ''}</span>
          </div>
        )}
      </div>

      {/* Main View Mode Switcher */}
      <div className={`flex items-center p-1 rounded-xl border transition-colors ${isLight ? 'bg-slate-100/90 border-slate-200/80 shadow-inner' : 'bg-[#171b24] border-white/[0.08] shadow-inner'
        }`}>
        <button
          onClick={() => setViewMode('homescreen')}
          className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all ${viewMode === 'homescreen'
              ? 'bg-blue-600 text-white shadow-md shadow-blue-500/25'
              : isLight
                ? 'text-slate-600 hover:text-slate-900 hover:bg-white/80'
                : 'text-slate-400 hover:text-white hover:bg-white/[0.04]'
            }`}
        >
          <Grid3X3 className="w-3.5 h-3.5" />
          <span>Homescreen</span>
        </button>

        <button
          onClick={() => setViewMode('splash')}
          className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all ${viewMode === 'splash'
              ? 'bg-blue-600 text-white shadow-md shadow-blue-500/25'
              : isLight
                ? 'text-slate-600 hover:text-slate-900 hover:bg-white/80'
                : 'text-slate-400 hover:text-white hover:bg-white/[0.04]'
            }`}
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>Splash Screen</span>
        </button>

        <button
          onClick={() => setViewMode('inspector')}
          className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all ${viewMode === 'inspector'
              ? 'bg-blue-600 text-white shadow-md shadow-blue-500/25'
              : isLight
                ? 'text-slate-600 hover:text-slate-900 hover:bg-white/80'
                : 'text-slate-400 hover:text-white hover:bg-white/[0.04]'
            }`}
        >
          <Layers className="w-3.5 h-3.5" />
          <span>Crop & Safe Zone</span>
        </button>

        <button
          onClick={() => setViewMode('sizes')}
          className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all ${viewMode === 'sizes'
              ? 'bg-blue-600 text-white shadow-md shadow-blue-500/25'
              : isLight
                ? 'text-slate-600 hover:text-slate-900 hover:bg-white/80'
                : 'text-slate-400 hover:text-white hover:bg-white/[0.04]'
            }`}
        >
          <Eye className="w-3.5 h-3.5" />
          <span>Size Grid</span>
        </button>
      </div>

      {/* Right Controls: Device Layout, Scale, Wallpaper, Theme Toggle */}
      <div className="flex items-center gap-3">
        {/* Splash Light/Dark toggle */}
        {viewMode === 'splash' && (
          <div className={`flex items-center p-1 rounded-xl border ${isLight ? 'bg-slate-100 border-slate-200' : 'bg-[#171b24] border-white/[0.08]'
            }`}>
            <button
              onClick={() => setIsSplashDark(false)}
              className={`p-1.5 rounded-lg text-xs transition-all ${!isSplashDark ? 'bg-amber-500 text-black shadow-sm font-medium' : isLight ? 'text-slate-500 hover:text-slate-900' : 'text-slate-400 hover:text-white'
                }`}
              title="Light Splash Mode"
            >
              <Sun className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setIsSplashDark(true)}
              className={`p-1.5 rounded-lg text-xs transition-all ${isSplashDark ? 'bg-indigo-600 text-white shadow-sm font-medium' : isLight ? 'text-slate-500 hover:text-slate-900' : 'text-slate-400 hover:text-white'
                }`}
              title="Dark Splash Mode"
            >
              <Moon className="w-3.5 h-3.5" />
            </button>
          </div>
        )}

        {/* Device Layout selector */}
        <div className={`hidden lg:flex items-center p-1 rounded-xl border ${isLight ? 'bg-slate-100 border-slate-200' : 'bg-[#171b24] border-white/[0.08]'
          }`}>
          <button
            onClick={() => setDeviceLayout('both')}
            className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-all ${deviceLayout === 'both' ? (isLight ? 'bg-white text-slate-900 shadow-sm font-semibold' : 'bg-white/10 text-white') : (isLight ? 'text-slate-500 hover:text-slate-900' : 'text-slate-400 hover:text-white')
              }`}
          >
            Split (Both)
          </button>
          <button
            onClick={() => setDeviceLayout('ios')}
            className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-all ${deviceLayout === 'ios' ? (isLight ? 'bg-white text-slate-900 shadow-sm font-semibold' : 'bg-white/10 text-white') : (isLight ? 'text-slate-500 hover:text-slate-900' : 'text-slate-400 hover:text-white')
              }`}
          >
            Iphone (IOS)
          </button>
          <button
            onClick={() => setDeviceLayout('android')}
            className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-all ${deviceLayout === 'android' ? (isLight ? 'bg-white text-slate-900 shadow-sm font-semibold' : 'bg-white/10 text-white') : (isLight ? 'text-slate-500 hover:text-slate-900' : 'text-slate-400 hover:text-white')
              }`}
          >
            Galaxy S24
          </button>
        </div>

        {/* Zoom Controls */}
        <div className={`flex items-center gap-1.5 px-2 py-1 rounded-xl border text-xs ${isLight ? 'bg-slate-100 border-slate-200 text-slate-700' : 'bg-[#171b24] border-white/[0.08] text-slate-300'
          }`}>
          <button
            onClick={() => setZoom(Math.max(0.6, Number((zoom - 0.1).toFixed(1))))}
            className={`p-1 rounded ${isLight ? 'hover:bg-slate-200 text-slate-600' : 'hover:bg-white/10 text-slate-400 hover:text-white'}`}
            title="Zoom Out"
          >
            <ZoomOut className="w-3.5 h-3.5" />
          </button>
          <span className="w-10 text-center font-mono font-medium">{Math.round(zoom * 100)}%</span>
          <button
            onClick={() => setZoom(Math.min(1.2, Number((zoom + 0.1).toFixed(1))))}
            className={`p-1 rounded ${isLight ? 'hover:bg-slate-200 text-slate-600' : 'hover:bg-white/10 text-slate-400 hover:text-white'}`}
            title="Zoom In"
          >
            <ZoomIn className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => setZoom(0.85)}
            className={`p-1 rounded ${isLight ? 'hover:bg-slate-200 text-slate-600' : 'hover:bg-white/10 text-slate-400 hover:text-white'}`}
            title="Reset Scale"
          >
            <Maximize2 className="w-3 h-3" />
          </button>
        </div>

        {/* Wallpaper Theme Palette */}
        <div className={`hidden xl:flex items-center gap-1 p-1 rounded-xl border ${isLight ? 'bg-slate-100 border-slate-200' : 'bg-[#171b24] border-white/[0.08]'
          }`}>
          {activeWallpapers.map((wp) => (
            <button
              key={wp}
              onClick={() => setWallpaper(wp)}
              className={`w-6 h-6 rounded-lg border transition-all ${wallpaper === wp ? 'border-blue-500 scale-110 shadow-sm shadow-blue-500/50' : 'border-slate-300/40 opacity-70 hover:opacity-100'
                } wallpaper-${wp}`}
              title={`Wallpaper: ${wp}`}
            />
          ))}
        </div>

        {/* Global Studio Light / Dark Mode Toggle */}
        <button
          onClick={toggleStudioTheme}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border font-medium text-xs transition-all shadow-sm ${isLight
              ? 'bg-slate-100 hover:bg-slate-200 text-slate-800 border-slate-300'
              : 'bg-[#171b24] hover:bg-[#202532] text-slate-200 border-white/10'
            }`}
          title={isLight ? 'Switch to Studio Dark Mode' : 'Switch to Studio Light Mode'}
        >
          {isLight ? (
            <>
              <Moon className="w-3.5 h-3.5 text-indigo-600 fill-indigo-600/20" />
              <span className="hidden sm:inline">Dark</span>
            </>
          ) : (
            <>
              <Sun className="w-3.5 h-3.5 text-amber-400 fill-amber-400/20" />
              <span className="hidden sm:inline">Light</span>
            </>
          )}
        </button>
      </div>
    </header>
  );
};
