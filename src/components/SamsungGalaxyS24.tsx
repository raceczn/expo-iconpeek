import React, { useState } from 'react';
import { 
  IoCall, 
  IoChatbubble, 
  IoCamera, 
  IoMail, 
  IoSettings, 
  IoTime, 
  IoCalendar, 
  IoMap, 
  IoImages, 
  IoMic, 
  IoLogoGooglePlaystore, 
  IoGlobe, 
  IoCalculator, 
  IoPlayCircle,
  IoSparkles
} from 'react-icons/io5';
import { Wifi, CloudSun } from 'lucide-react';
import { ExpoState, ViewMode, AndroidMaskShape, StudioTheme } from '../types';
import { GALAXY_S24_SPEC } from '../devices/specs';

interface SamsungGalaxyS24Props {
  state: ExpoState;
  viewMode: ViewMode;
  onLaunchApp: () => void;
  onHomePress: () => void;
  isSplashDark: boolean;
  maskShape: AndroidMaskShape;
  setMaskShape: (shape: AndroidMaskShape) => void;
  studioTheme?: StudioTheme;
}

export const SamsungGalaxyS24: React.FC<SamsungGalaxyS24Props> = ({
  state,
  viewMode,
  onLaunchApp,
  onHomePress,
  isSplashDark,
  maskShape,
  setMaskShape,
  studioTheme = 'dark',
}) => {
  const isLight = studioTheme === 'light';
  const isSplashView = viewMode === 'splash';
  const expoName = state.expo.name || 'Your App';
  const spec = GALAXY_S24_SPEC;

  // Parallax tilt coordinates for adaptive icon testing
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 16;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 16;
    setTilt({ x, y });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
  };

  // Splash styling
  const splashBg = isSplashDark 
    ? (state.expo.splashDarkBackgroundColor || '#121212') 
    : (state.expo.splashBackgroundColor || '#FFFFFF');
    
  const splashImgUrl = isSplashDark && state.assets.splashDarkPath
    ? '/assets/splash-dark'
    : '/assets/splash';

  const isBgLight = (hex: string) => {
    const clean = hex.replace('#', '');
    if (clean.length < 6) return true;
    const r = parseInt(clean.substring(0, 2), 16);
    const g = parseInt(clean.substring(2, 4), 16);
    const b = parseInt(clean.substring(4, 6), 16);
    const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
    return luminance > 0.55;
  };

  const statusColor = isSplashView
    ? (isBgLight(splashBg) ? '#111827' : '#FFFFFF')
    : '#FFFFFF';

  const maskClassMap: Record<AndroidMaskShape, string> = {
    'squircle': 'mask-squircle',
    'circle': 'mask-circle',
    'rounded-rect': 'mask-rounded-rect',
    'square': 'mask-square',
    'teardrop': 'mask-teardrop',
  };

  // Full bleed continuous Samsung One UI Titanium wallpaper
  const wallpaperGradient = `
    radial-gradient(ellipse at 80% 20%, rgba(70, 85, 130, 0.5) 0%, transparent 55%),
    radial-gradient(ellipse at 20% 80%, rgba(40, 55, 80, 0.6) 0%, transparent 55%),
    linear-gradient(165deg, #171A22 0%, #101319 45%, #080A0F 100%)
  `;

  return (
    <div className="flex flex-col items-center">
      {/* Device Badge */}
      <div className={`flex items-center gap-2 mb-3 px-3.5 py-1 rounded-full text-xs shadow-sm transition-colors ${
        isLight 
          ? 'bg-white/95 backdrop-blur-md border border-slate-200/90 text-slate-700 shadow-[0_2px_8px_rgba(0,0,0,0.06)]' 
          : 'bg-white/[0.08] backdrop-blur-md border border-white/10 text-slate-300'
      }`}>
        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
        <span className={`font-semibold ${isLight ? 'text-slate-900' : 'text-white'}`}>{spec.name}</span>
        <span className={`text-[11px] ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>{spec.osName} {spec.osVersion}</span>
      </div>

      {/* Mockup Frame Wrapper */}
      <div 
        className="relative flex-shrink-0 select-none"
        style={{ width: `${spec.frameDimensions.width}px`, height: `${spec.frameDimensions.height}px` }}
      >
        {/* Real Transparent Mockup Frame Overlay */}
        <img 
          src={spec.mockupSrc} 
          alt={`${spec.name} Frame`}
          className="absolute inset-0 w-full h-full object-contain pointer-events-none z-30 drop-shadow-[0_25px_60px_rgba(0,0,0,0.6)]"
        />

        {/* Inner Screen Cutout: Full Bleed Wallpaper (Zero Black Cuts, Seamless Edge-to-Edge) */}
        <div 
          className="absolute overflow-hidden flex flex-col z-10 transition-colors duration-300"
          style={{
            top: `${spec.screenCutout.top}px`,
            bottom: `${spec.screenCutout.bottom}px`,
            left: `${spec.screenCutout.left}px`,
            right: `${spec.screenCutout.right}px`,
            borderRadius: `${spec.screenCutout.borderRadius}px`,
            background: isSplashView ? splashBg : wallpaperGradient,
          }}
        >
          {/* Samsung Infinity-O Punch Hole Camera (Seamlessly surrounded by wallpaper) */}
          <div className="absolute top-2.5 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-black border border-[#2a2a2e] z-40 pointer-events-none flex items-center justify-center">
            <div className="w-1.5 h-1.5 rounded-full bg-[#111827] border border-[#2563eb]/40" />
          </div>

          {/* One UI Status Bar (Floats directly over wallpaper seamlessly) */}
          <div 
            className="h-10 w-full flex items-center justify-between px-6 pt-1 font-sans text-xs z-30 shrink-0 select-none" 
            style={{ color: statusColor }}
          >
            <div className="flex items-center gap-1.5">
              <span className="font-semibold text-xs tracking-tight">{spec.statusBar.time}</span>
              <div className="w-1 h-1 rounded-full bg-current opacity-70" />
            </div>
            <div className="flex items-center gap-2">
              <Wifi className="w-3.5 h-3.5 stroke-[2.2]" />
              <div className="flex items-end gap-[1px] h-3">
                <span className="w-[2.5px] h-1 rounded-xs bg-current" />
                <span className="w-[2.5px] h-1.5 rounded-xs bg-current" />
                <span className="w-[2.5px] h-2 rounded-xs bg-current" />
                <span className="w-[2.5px] h-2.5 rounded-xs bg-current" />
              </div>
              <div className="flex items-center gap-1">
                <span className="text-[10px] font-mono font-medium">98%</span>
                <div className="w-4 h-2.5 rounded-xs border border-current p-0.5 flex items-center">
                  <div className="h-full w-full bg-current rounded-[1px]" />
                </div>
              </div>
            </div>
          </div>

          {/* SCREEN CONTENT */}
          {isSplashView ? (
            /* Android Splash Screen */
            <div 
              className="flex-1 w-full flex flex-col items-center justify-center p-6 relative cursor-pointer"
              onClick={onHomePress}
              title="Click anywhere to return to homescreen"
            >
              <img 
                src={splashImgUrl} 
                alt="Splash" 
                style={{ 
                  maxWidth: state.expo.splashImageWidth ? `${state.expo.splashImageWidth}px` : '180px',
                  maxHeight: '260px',
                  objectFit: 'contain'
                }}
                className="drop-shadow-md select-none transition-transform active:scale-95"
              />
              <div className="absolute bottom-16 text-center text-xs opacity-60 font-medium tracking-wide" style={{ color: statusColor }}>
                {expoName}
              </div>
            </div>
          ) : (
            /* Android Homescreen with One UI 6 Layout */
            <div className="flex-1 w-full px-4 pt-0 pb-4 flex flex-col justify-between relative overflow-hidden">
              {/* TOP SECTION: Clock/Weather Widget + Google Search Widget */}
              <div className="flex flex-col gap-2 pt-0.5">
                {/* One UI Clock & Weather Widget */}
                <div className="flex items-center justify-between text-white/95 px-2">
                  <div>
                    <div className="text-[28px] font-light tracking-tight leading-none">10:00</div>
                    <div className="text-xs text-slate-300 font-normal mt-1">Tuesday, Nov 17</div>
                  </div>
                  <div className="flex flex-col items-end">
                    <div className="flex items-center gap-1.5">
                      <CloudSun className="w-5 h-5 text-amber-400" />
                      <span className="text-lg font-light">24°</span>
                    </div>
                    <span className="text-[11px] text-slate-400">Sunny • Tokyo</span>
                  </div>
                </div>

                {/* Google Search Bar Pill */}
                <div className="h-11 rounded-full bg-white/[0.12] backdrop-blur-md border border-white/15 flex items-center justify-between px-3.5 shadow-md">
                  <div className="flex items-center gap-2.5">
                    {/* Google G logo with 4 brand colors */}
                    <svg className="w-4 h-4" viewBox="0 0 24 24">
                      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
                    </svg>
                    <span className="text-xs text-slate-300 font-normal">Search apps & web...</span>
                  </div>
                  <div className="flex items-center gap-2.5 text-slate-300">
                    <IoMic className="w-4 h-4 hover:text-white cursor-pointer" />
                    <IoCamera className="w-4 h-4 hover:text-white cursor-pointer" />
                  </div>
                </div>
              </div>

              {/* ANDROID APP GRID: Exactly 3 full rows of 4 apps = 12 apps */}
              <div className="grid grid-cols-4 gap-y-4 gap-x-2.5 pt-2">
                {/* ROW 1 */}
                {/* 1. User Expo App with Adaptive Icon & Layer Parallax */}
                <div 
                  className="flex flex-col items-center gap-1 group cursor-pointer interactive-icon"
                  onClick={onLaunchApp}
                  onMouseMove={handleMouseMove}
                  onMouseLeave={handleMouseLeave}
                  title="Hover to test adaptive icon layer parallax. Click to launch splash screen."
                >
                  <div 
                    className={`relative w-[50px] h-[50px] overflow-hidden ${maskClassMap[maskShape]} app-highlight-ring shadow-xl transition-all duration-150`}
                    style={{ backgroundColor: state.expo.adaptiveBackgroundColor || '#FFFFFF' }}
                  >
                    {/* Background Layer */}
                    <div 
                      className="absolute inset-0 w-full h-full"
                      style={{
                        backgroundColor: state.expo.adaptiveBackgroundColor || '#FFFFFF',
                        transform: `scale(1.15) translate(${tilt.x * -0.4}px, ${tilt.y * -0.4}px)`,
                        transition: 'transform 0.1s ease-out',
                      }}
                    />

                    {/* Foreground Layer */}
                    <img 
                      src="/assets/icon" 
                      alt={expoName}
                      className="absolute inset-0 w-full h-full object-cover select-none"
                      style={{
                        transform: `scale(1.05) translate(${tilt.x * 0.8}px, ${tilt.y * 0.8}px)`,
                        transition: 'transform 0.1s ease-out',
                      }}
                    />

                    <div className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-emerald-500 text-white flex items-center justify-center shadow-md">
                      <IoSparkles className="w-2.5 h-2.5 fill-current" />
                    </div>
                  </div>
                  <span className="text-[11px] font-medium text-white truncate max-w-[62px] text-center drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]">
                    {expoName}
                  </span>
                </div>

                {/* 2. Google Play Store */}
                <div className="flex flex-col items-center gap-1">
                  <div className={`w-[50px] h-[50px] ${maskClassMap[maskShape]} bg-white flex items-center justify-center shadow-md`}>
                    <IoLogoGooglePlaystore className="w-6 h-6 text-[#01875F]" />
                  </div>
                  <span className="text-[11px] text-white/90 truncate max-w-[62px] text-center drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]">
                    Play Store
                  </span>
                </div>

                {/* 3. Samsung Gallery */}
                <div className="flex flex-col items-center gap-1">
                  <div className={`w-[50px] h-[50px] ${maskClassMap[maskShape]} bg-[#E53935] flex items-center justify-center text-white shadow-md`}>
                    <IoImages className="w-6 h-6 fill-current" />
                  </div>
                  <span className="text-[11px] text-white/90 truncate max-w-[62px] text-center drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]">
                    Gallery
                  </span>
                </div>

                {/* 4. Samsung Camera */}
                <div className="flex flex-col items-center gap-1">
                  <div className={`w-[50px] h-[50px] ${maskClassMap[maskShape]} bg-[#D32F2F] flex items-center justify-center text-white shadow-md`}>
                    <IoCamera className="w-6 h-6 fill-current" />
                  </div>
                  <span className="text-[11px] text-white/90 truncate max-w-[62px] text-center drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]">
                    Camera
                  </span>
                </div>

                {/* ROW 2 */}
                {/* 5. Google Chrome */}
                <div className="flex flex-col items-center gap-1">
                  <div className={`w-[50px] h-[50px] ${maskClassMap[maskShape]} bg-white flex items-center justify-center shadow-md`}>
                    <IoGlobe className="w-6 h-6 text-[#1A73E8]" />
                  </div>
                  <span className="text-[11px] text-white/90 truncate max-w-[62px] text-center drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]">
                    Chrome
                  </span>
                </div>

                {/* 6. Gmail */}
                <div className="flex flex-col items-center gap-1">
                  <div className={`w-[50px] h-[50px] ${maskClassMap[maskShape]} bg-white flex items-center justify-center shadow-md`}>
                    <IoMail className="w-6 h-6 text-[#EA4335]" />
                  </div>
                  <span className="text-[11px] text-white/90 truncate max-w-[62px] text-center drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]">
                    Gmail
                  </span>
                </div>

                {/* 7. YouTube */}
                <div className="flex flex-col items-center gap-1">
                  <div className={`w-[50px] h-[50px] ${maskClassMap[maskShape]} bg-[#FF0000] flex items-center justify-center text-white shadow-md`}>
                    <IoPlayCircle className="w-6 h-6 fill-current" />
                  </div>
                  <span className="text-[11px] text-white/90 truncate max-w-[62px] text-center drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]">
                    YouTube
                  </span>
                </div>

                {/* 8. Google Maps */}
                <div className="flex flex-col items-center gap-1">
                  <div className={`w-[50px] h-[50px] ${maskClassMap[maskShape]} bg-[#34A853] flex items-center justify-center text-white shadow-md`}>
                    <IoMap className="w-6 h-6 fill-current" />
                  </div>
                  <span className="text-[11px] text-white/90 truncate max-w-[62px] text-center drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]">
                    Maps
                  </span>
                </div>

                {/* ROW 3 */}
                {/* 9. Settings */}
                <div className="flex flex-col items-center gap-1">
                  <div className={`w-[50px] h-[50px] ${maskClassMap[maskShape]} bg-[#5F6368] flex items-center justify-center text-white shadow-md`}>
                    <IoSettings className="w-6 h-6 fill-current" />
                  </div>
                  <span className="text-[11px] text-white/90 truncate max-w-[62px] text-center drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]">
                    Settings
                  </span>
                </div>

                {/* 10. Clock */}
                <div className="flex flex-col items-center gap-1">
                  <div className={`w-[50px] h-[50px] ${maskClassMap[maskShape]} bg-[#4285F4] flex items-center justify-center text-white shadow-md`}>
                    <IoTime className="w-6 h-6 fill-current" />
                  </div>
                  <span className="text-[11px] text-white/90 truncate max-w-[62px] text-center drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]">
                    Clock
                  </span>
                </div>

                {/* 11. Calendar */}
                <div className="flex flex-col items-center gap-1">
                  <div className={`w-[50px] h-[50px] ${maskClassMap[maskShape]} bg-white flex items-center justify-center shadow-md`}>
                    <IoCalendar className="w-6 h-6 text-[#1A73E8]" />
                  </div>
                  <span className="text-[11px] text-white/90 truncate max-w-[62px] text-center drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]">
                    Calendar
                  </span>
                </div>

                {/* 12. Calculator */}
                <div className="flex flex-col items-center gap-1">
                  <div className={`w-[50px] h-[50px] ${maskClassMap[maskShape]} bg-[#00897B] flex items-center justify-center text-white shadow-md`}>
                    <IoCalculator className="w-6 h-6 fill-current" />
                  </div>
                  <span className="text-[11px] text-white/90 truncate max-w-[62px] text-center drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]">
                    Calculator
                  </span>
                </div>
              </div>

              {/* PAGE INDICATOR DOTS */}
              <div className="flex justify-center gap-1.5 my-1">
                <span className="w-1.5 h-1.5 rounded-full bg-white shadow-sm" />
                <span className="w-1.5 h-1.5 rounded-full bg-white/40" />
                <span className="w-1.5 h-1.5 rounded-full bg-white/40" />
              </div>

              {/* BOTTOM DOCK */}
              <div className="h-[72px] rounded-2xl bg-white/[0.08] backdrop-blur-md flex items-center justify-around px-2 border border-white/10">
                {/* 1. Phone */}
                <div className={`w-[46px] h-[46px] ${maskClassMap[maskShape]} bg-[#2E7D32] flex items-center justify-center text-white shadow-md`}>
                  <IoCall className="w-5 h-5 fill-current" />
                </div>
                {/* 2. Messages */}
                <div className={`w-[46px] h-[46px] ${maskClassMap[maskShape]} bg-[#1976D2] flex items-center justify-center text-white shadow-md`}>
                  <IoChatbubble className="w-5 h-5 fill-current" />
                </div>
                {/* 3. Samsung Internet */}
                <div className={`w-[46px] h-[46px] ${maskClassMap[maskShape]} bg-[#3F51B5] flex items-center justify-center text-white shadow-md`}>
                  <IoGlobe className="w-5 h-5 fill-current" />
                </div>
                {/* 4. Camera */}
                <div className={`w-[46px] h-[46px] ${maskClassMap[maskShape]} bg-[#D32F2F] flex items-center justify-center text-white shadow-md`}>
                  <IoCamera className="w-5 h-5 fill-current" />
                </div>
              </div>
            </div>
          )}

          {/* Android Gesture Navigation Bar */}
          <div 
            className="absolute bottom-2 left-1/2 -translate-x-1/2 w-28 h-1 bg-white/70 rounded-full cursor-pointer hover:bg-white transition-all z-40"
            onClick={onHomePress}
            title="Return to Homescreen"
          />
        </div>
      </div>

      {/* Adaptive Mask Switcher Bar */}
      {!isSplashView && (
        <div className={`mt-3 flex items-center gap-1 px-2.5 py-1.5 rounded-xl shadow-md transition-colors ${
          isLight ? 'bg-white border border-slate-200 shadow-[0_2px_8px_rgba(0,0,0,0.06)]' : 'bg-[#14171f] border border-white/[0.08]'
        }`}>
          <span className={`text-[11px] ${isLight ? 'text-slate-600' : 'text-slate-400'} mr-1.5 font-medium`}>Mask:</span>
          {(['squircle', 'circle', 'rounded-rect', 'square', 'teardrop'] as AndroidMaskShape[]).map((shape) => (
            <button
              key={shape}
              onClick={() => setMaskShape(shape)}
              className={`px-2 py-0.5 rounded text-[11px] capitalize transition-all ${
                maskShape === shape 
                  ? 'bg-emerald-500 text-black font-semibold shadow-sm' 
                  : isLight 
                    ? 'text-slate-600 hover:text-slate-900 hover:bg-slate-100' 
                    : 'text-slate-400 hover:text-white hover:bg-white/[0.06]'
              }`}
            >
              {shape.replace('-', ' ')}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
