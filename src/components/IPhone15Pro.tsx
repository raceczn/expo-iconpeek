import React from 'react';
import { 
  IoCall, 
  IoCompass, 
  IoChatbubble, 
  IoMusicalNotes, 
  IoCamera, 
  IoMail, 
  IoSettings, 
  IoMap, 
  IoHeart, 
  IoVideocam, 
  IoLogoApple, 
} from 'react-icons/io5';
import { ExpoState, ViewMode, StudioTheme } from '../types';
import { IPHONE_PRO_SPEC } from '../devices/specs';
import { 
  IOSStatusBar, 
  IOSNotesWidget, 
  IOSCalendarWidget, 
  IOSAppIcon, 
  IOSDock, 
  IOSSearchPill, 
  IOSHomeIndicator 
} from './ios';

interface IPhone15ProProps {
  state: ExpoState;
  viewMode: ViewMode;
  onLaunchApp: () => void;
  onHomePress: () => void;
  isSplashDark: boolean;
  studioTheme?: StudioTheme;
}

export const IPhone15Pro: React.FC<IPhone15ProProps> = ({
  state,
  viewMode,
  onLaunchApp,
  onHomePress,
  isSplashDark,
  studioTheme = 'dark',
}) => {
  const isLight = studioTheme === 'light';
  const isSplashView = viewMode === 'splash';
  const expoName = state.expo.name || 'Your App';
  const spec = IPHONE_PRO_SPEC;
  
  // Choose splash colors
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

  // Full bleed continuous iOS 18 wallpaper gradient
  const wallpaperGradient = `
    radial-gradient(circle at 82% 16%, rgba(70, 110, 185, 0.85) 0%, rgba(95, 140, 225, 0.4) 35%, transparent 65%),
    radial-gradient(circle at 18% 75%, rgba(65, 195, 180, 0.8) 0%, rgba(135, 235, 220, 0.45) 45%, transparent 70%),
    radial-gradient(circle at 50% 50%, rgba(175, 245, 235, 0.65) 0%, transparent 60%),
    linear-gradient(155deg, #658BB8 0%, #87B4E2 30%, #9FE5DC 65%, #52C2B5 100%)
  `;

  return (
    <div className="flex flex-col items-center">
      {/* Device Badge */}
      <div className={`flex items-center gap-2 mb-3 px-3.5 py-1 rounded-full text-xs shadow-sm transition-colors ${
        isLight 
          ? 'bg-white/95 backdrop-blur-md border border-slate-200/90 text-slate-700 shadow-[0_2px_8px_rgba(0,0,0,0.06)]' 
          : 'bg-white/[0.08] backdrop-blur-md border border-white/10 text-slate-300'
      }`}>
        <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
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
          {/* iOS Dynamic Island & Status Bar (Floats directly over wallpaper seamlessly) */}
          <IOSStatusBar time={spec.statusBar.time} color={statusColor} />

          {/* SCREEN CONTENT */}
          {isSplashView ? (
            /* Splash Screen Mode */
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
            /* Realistic iOS Homescreen matching User Reference */
            <div className="flex-1 w-full px-4 pt-0 pb-4 flex flex-col justify-between relative overflow-hidden">
              {/* TOP SECTION: 2x2 Widgets (Notes + Calendar) */}
              <div className="grid grid-cols-2 gap-3 pt-0.5">
                <IOSNotesWidget />
                <IOSCalendarWidget day="Wednesday" date={3} event="No events today" />
              </div>

              {/* APP ICON GRID: Exactly 4 Columns x 4 Rows = 16 Apps */}
              <div className="grid grid-cols-4 gap-y-3.5 gap-x-2.5 pt-1">
                {/* ROW 1 */}
                <IOSAppIcon name="FaceTime">
                  <div className="w-full h-full bg-[#34C759] flex items-center justify-center text-white">
                    <IoVideocam className="w-6 h-6 fill-current" />
                  </div>
                </IOSAppIcon>

                <IOSAppIcon name="Calendar">
                  <div className="w-full h-full bg-white flex flex-col items-center justify-center border border-black/5">
                    <span className="text-[9px] font-bold text-[#FF3B30] uppercase leading-none mt-0.5">Wed</span>
                    <span className="text-[20px] font-semibold text-[#1C1C1E] leading-none">3</span>
                  </div>
                </IOSAppIcon>

                <IOSAppIcon name="Photos">
                  <div className="w-full h-full bg-white flex items-center justify-center border border-black/5 relative overflow-hidden">
                    <svg className="w-7 h-7" viewBox="0 0 100 100" fill="none">
                      <ellipse cx="50" cy="30" rx="12" ry="20" fill="#FFCC00" />
                      <ellipse cx="64" cy="36" rx="12" ry="20" transform="rotate(45 64 36)" fill="#FF9500" />
                      <ellipse cx="70" cy="50" rx="12" ry="20" transform="rotate(90 70 50)" fill="#FF2D55" />
                      <ellipse cx="64" cy="64" rx="12" ry="20" transform="rotate(135 64 64)" fill="#AF52DE" />
                      <ellipse cx="50" cy="70" rx="12" ry="20" fill="#5856D6" />
                      <ellipse cx="36" cy="64" rx="12" ry="20" transform="rotate(225 36 64)" fill="#007AFF" />
                      <ellipse cx="30" cy="50" rx="12" ry="20" transform="rotate(270 30 50)" fill="#34C759" />
                      <ellipse cx="36" cy="36" rx="12" ry="20" transform="rotate(315 36 36)" fill="#30B0C7" />
                    </svg>
                  </div>
                </IOSAppIcon>

                <IOSAppIcon name="Camera">
                  <div className="w-full h-full bg-[#1C1C1E] flex items-center justify-center border border-white/10">
                    <div className="w-8 h-8 rounded-full bg-[#2C2C2E] border-2 border-[#3A3A3C] flex items-center justify-center">
                      <div className="w-4 h-4 rounded-full bg-gradient-to-tr from-[#0F172A] to-[#3B82F6] flex items-center justify-center">
                        <div className="w-1.5 h-1.5 rounded-full bg-white/70" />
                      </div>
                    </div>
                  </div>
                </IOSAppIcon>

                {/* ROW 2 */}
                <IOSAppIcon name="Mail">
                  <div className="w-full h-full bg-gradient-to-b from-[#38A4FF] to-[#007AFF] flex items-center justify-center text-white">
                    <IoMail className="w-6 h-6 fill-current" />
                  </div>
                </IOSAppIcon>

                <IOSAppIcon name="Notes">
                  <div className="w-full h-full bg-white flex flex-col border border-black/5 overflow-hidden">
                    <div className="h-3.5 bg-[#FFCC00] w-full" />
                    <div className="p-1.5 flex flex-col gap-1">
                      <div className="h-[1.5px] w-full bg-[#E5E5EA]" />
                      <div className="h-[1.5px] w-full bg-[#E5E5EA]" />
                      <div className="h-[1.5px] w-3/4 bg-[#E5E5EA]" />
                    </div>
                  </div>
                </IOSAppIcon>

                <IOSAppIcon name="Reminders">
                  <div className="w-full h-full bg-white flex flex-col justify-center px-2.5 gap-1.5 border border-black/5">
                    <div className="flex items-center gap-1.5">
                      <div className="w-2 h-2 rounded-full bg-[#007AFF]" />
                      <div className="h-1 flex-1 rounded-full bg-[#E5E5EA]" />
                    </div>
                    <div className="flex items-center gap-1.5">
                      <div className="w-2 h-2 rounded-full bg-[#FF3B30]" />
                      <div className="h-1 flex-1 rounded-full bg-[#E5E5EA]" />
                    </div>
                    <div className="flex items-center gap-1.5">
                      <div className="w-2 h-2 rounded-full bg-[#FF9500]" />
                      <div className="h-1 flex-1 rounded-full bg-[#E5E5EA]" />
                    </div>
                  </div>
                </IOSAppIcon>

                <IOSAppIcon name="Clock">
                  <div className="w-full h-full bg-white flex items-center justify-center border border-black/5 relative">
                    <div className="w-9 h-9 rounded-full border border-slate-200 relative flex items-center justify-center">
                      <span className="absolute top-0.5 w-0.5 h-1 bg-black/70" />
                      <span className="absolute bottom-0.5 w-0.5 h-1 bg-black/70" />
                      <span className="absolute left-0.5 h-0.5 w-1 bg-black/70" />
                      <span className="absolute right-0.5 h-0.5 w-1 bg-black/70" />
                      <div className="absolute w-[2px] h-2.5 bg-black rounded-full origin-bottom -translate-y-1.5 rotate-[-60deg]" />
                      <div className="absolute w-[1.5px] h-3.5 bg-black rounded-full origin-bottom -translate-y-2 rotate-[10deg]" />
                      <div className="absolute w-[1px] h-4 bg-[#FF9500] rounded-full origin-bottom -translate-y-2 rotate-[120deg]" />
                      <div className="w-1.5 h-1.5 rounded-full bg-[#FF9500] z-10" />
                    </div>
                  </div>
                </IOSAppIcon>

                {/* ROW 3 */}
                <IOSAppIcon name="News">
                  <div className="w-full h-full bg-white flex items-center justify-center border border-black/5">
                    <div className="w-7 h-7 rounded-sm bg-gradient-to-tr from-[#FF2D55] to-[#FF3B30] flex items-center justify-center text-white font-black text-sm italic">
                      N
                    </div>
                  </div>
                </IOSAppIcon>

                <IOSAppIcon name="TV">
                  <div className="w-full h-full bg-black flex items-center justify-center text-white border border-white/10">
                    <div className="flex items-center gap-0.5">
                      <IoLogoApple className="w-4 h-4 fill-white" />
                      <span className="text-[11px] font-bold">tv</span>
                    </div>
                  </div>
                </IOSAppIcon>

                {/* 11. USER EXPO APP (IconPeek Hero!) */}
                <IOSAppIcon 
                  name={expoName}
                  isHero={true}
                  onClick={onLaunchApp}
                  title="Click to launch app & preview splash screen"
                >
                  <img 
                    src="/assets/ios-icon" 
                    alt={expoName}
                    className="w-full h-full object-cover select-none"
                  />
                </IOSAppIcon>

                <IOSAppIcon name="App Store">
                  <div className="w-full h-full bg-gradient-to-b from-[#1E88E5] to-[#0D47A1] flex items-center justify-center text-white">
                    <svg className="w-6 h-6 stroke-white stroke-[2.5]" viewBox="0 0 24 24" fill="none">
                      <path d="M12 4L6 19M12 4L18 19M5 15H19" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                </IOSAppIcon>

                {/* ROW 4 */}
                <IOSAppIcon name="Maps">
                  <div className="w-full h-full bg-gradient-to-tr from-[#A8DADC] via-[#F1FAEE] to-[#457B9D] flex items-center justify-center border border-black/5 relative overflow-hidden">
                    <IoMap className="w-6 h-6 text-[#1D3557]" />
                  </div>
                </IOSAppIcon>

                <IOSAppIcon name="Health">
                  <div className="w-full h-full bg-white flex items-center justify-center border border-black/5">
                    <IoHeart className="w-6 h-6 fill-[#FF2D55]" />
                  </div>
                </IOSAppIcon>

                <IOSAppIcon name="Wallet">
                  <div className="w-full h-full bg-black flex flex-col items-center justify-center border border-white/10 px-1.5">
                    <div className="w-full h-1.5 rounded-t-xs bg-[#30D158]" />
                    <div className="w-full h-1.5 bg-[#FFD60A]" />
                    <div className="w-full h-1.5 bg-[#0A84FF]" />
                    <div className="w-full h-2 rounded-b-xs bg-[#FF375F]" />
                  </div>
                </IOSAppIcon>

                <IOSAppIcon name="Settings">
                  <div className="w-full h-full bg-gradient-to-b from-[#8E8E93] to-[#636366] flex items-center justify-center text-slate-100">
                    <IoSettings className="w-6 h-6 fill-current animate-[spin_20s_linear_infinite]" />
                  </div>
                </IOSAppIcon>
              </div>

              {/* SEARCH PILL */}
              <IOSSearchPill />

              {/* BOTTOM DOCK */}
              <IOSDock>
                <div className="w-[48px] h-[48px] ios-squircle bg-[#34C759] flex items-center justify-center text-white shadow-md">
                  <IoCall className="w-5 h-5 fill-current" />
                </div>
                <div className="w-[48px] h-[48px] ios-squircle bg-white flex items-center justify-center shadow-md border border-black/5">
                  <IoCompass className="w-6 h-6 text-[#007AFF]" />
                </div>
                <div className="w-[48px] h-[48px] ios-squircle bg-[#34C759] flex items-center justify-center text-white shadow-md">
                  <IoChatbubble className="w-5 h-5 fill-current" />
                </div>
                <div className="w-[48px] h-[48px] ios-squircle bg-gradient-to-b from-[#FF2D55] to-[#FB103D] flex items-center justify-center text-white shadow-md">
                  <IoMusicalNotes className="w-5 h-5 fill-current" />
                </div>
              </IOSDock>
            </div>
          )}

          {/* iOS Home Indicator Bar */}
          <IOSHomeIndicator onHomePress={onHomePress} />
        </div>
      </div>
    </div>
  );
};
