import React, { useState, useEffect } from 'react';
import { Menu, X, Sun, Moon } from 'lucide-react';
import { FloatingSidebar } from './components/FloatingSidebar';
import { IPhone15Pro } from './components/IPhone15Pro';
import { SamsungGalaxyS24 } from './components/SamsungGalaxyS24';
import { InspectorView } from './components/InspectorView';
import { SizeGrid } from './components/SizeGrid';
import { DetailsDrawer } from './components/DetailsDrawer';
import { ViewMode, DeviceLayout, AndroidMaskShape, StudioTheme, ExpoState } from './types';

const defaultFallbackState: ExpoState = {
  projectRoot: 'Default Workspace',
  configName: 'app.json',
  warnings: [],
  assets: {
    iconPath: 'assets/placeholder-icon.png',
    iosIconPath: 'assets/placeholder-icon.png',
    splashPath: 'assets/placeholder-icon.png',
    splashDarkPath: 'assets/placeholder-icon.png',
  },
  expo: {
    name: 'Your App',
    icon: './assets/icon.png',
    androidForegroundImage: './assets/adaptive-icon.png',
    adaptiveBackgroundColor: '#FFFFFF',
    splashImage: './assets/splash.png',
    splashImageWidth: 160,
    splashBackgroundColor: '#FFFFFF',
    splashDarkBackgroundColor: '#121212',
    splashDarkImage: './assets/splash-dark.png',
  },
};

export const App: React.FC = () => {
  const [state, setState] = useState<ExpoState>(() => {
    return window.STATE || defaultFallbackState;
  });

  const [studioTheme, setStudioTheme] = useState<StudioTheme>(() => {
    try {
      const saved = localStorage.getItem('iconpeek_theme') as StudioTheme;
      return saved === 'light' || saved === 'dark' ? saved : 'dark';
    } catch {
      return 'dark';
    }
  });

  const [viewMode, setViewMode] = useState<ViewMode>('homescreen');
  const [deviceLayout, setDeviceLayout] = useState<DeviceLayout>('both');
  const [zoom, setZoom] = useState<number>(() => {
    if (typeof window !== 'undefined' && window.innerWidth < 640) {
      const available = window.innerWidth - 32;
      return Math.min(0.85, Math.max(0.48, Number((available / 400).toFixed(2))));
    }
    return 0.85;
  });
  const [isSplashDark, setIsSplashDark] = useState<boolean>(false);
  const [maskShape, setMaskShape] = useState<AndroidMaskShape>('squircle');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);

  // Persist theme choice
  useEffect(() => {
    try {
      localStorage.setItem('iconpeek_theme', studioTheme);
    } catch { }
  }, [studioTheme]);

  // Responsive mobile auto-zoom
  useEffect(() => {
    const checkMobile = () => {
      if (window.innerWidth < 640) {
        const available = window.innerWidth - 32;
        const fitZoom = Math.min(0.85, Math.max(0.48, Number((available / 400).toFixed(2))));
        setZoom(fitZoom);
      }
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Listen to Server-Sent Events (SSE) for hot reload when app.json or assets change
  useEffect(() => {
    const eventSource = new EventSource('/events');

    eventSource.onmessage = (event) => {
      if (event.data === 'reload') {
        window.location.reload();
      }
    };

    return () => {
      eventSource.close();
    };
  }, []);

  const isLight = studioTheme === 'light';

  return (
    <div className={`w-screen h-screen flex flex-col md:flex-row overflow-hidden font-sans theme-${studioTheme} relative ${
      isLight ? 'bg-slate-100 text-slate-900' : 'bg-[#0b0d11] text-slate-100'
    }`}>
      {/* Mobile Top Navigation Bar (Visible on screens < 768px) */}
      <header className={`md:hidden fixed top-0 left-0 right-0 h-14 z-30 px-4 flex items-center justify-between backdrop-blur-xl border-b transition-colors select-none ${
        isLight 
          ? 'bg-white/90 border-slate-200/80 text-slate-900 shadow-xs' 
          : 'bg-[#0f1219]/90 border-white/[0.08] text-white shadow-md'
      }`}>
        <div className="flex items-center gap-2.5">
          <img src="/assets/iconpeek.png" alt="iconpeek" className="w-8 h-8 object-contain shrink-0" />
          <div className="flex items-center gap-1.5">
            <span className="font-bold text-sm tracking-tight">iconpeek</span>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
          </div>
        </div>

        <div className="flex items-center gap-1.5">
          {/* Quick Theme Toggle */}
          <button 
            onClick={() => setStudioTheme(isLight ? 'dark' : 'light')}
            className={`p-2 rounded-xl transition-colors ${
              isLight ? 'text-slate-600 hover:bg-slate-100' : 'text-slate-300 hover:bg-white/10'
            }`}
            title="Toggle Theme"
            aria-label="Toggle Theme"
          >
            {isLight ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
          </button>

          {/* Mobile Drawer Hamburger Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className={`p-2 rounded-xl border transition-colors ${
              isLight 
                ? 'bg-slate-100 border-slate-200 text-slate-800 hover:bg-slate-200' 
                : 'bg-white/10 border-white/10 text-white hover:bg-white/15'
            }`}
            aria-label="Toggle navigation menu"
          >
            {isMobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </header>

      {/* Floating Glass Sidebar (Desktop Floating, Mobile Slide-out Drawer) */}
      <FloatingSidebar
        state={state}
        viewMode={viewMode}
        setViewMode={setViewMode}
        deviceLayout={deviceLayout}
        setDeviceLayout={setDeviceLayout}
        zoom={zoom}
        setZoom={setZoom}
        isSplashDark={isSplashDark}
        setIsSplashDark={setIsSplashDark}
        studioTheme={studioTheme}
        setStudioTheme={setStudioTheme}
        isMobileOpen={isMobileMenuOpen}
        onCloseMobile={() => setIsMobileMenuOpen(false)}
      />

      {/* Main Studio Workspace Canvas */}
      <main className={`flex-1 h-full overflow-y-auto overflow-x-hidden ${
        isLight ? 'wallpaper-light-grid' : 'wallpaper-studio-grid'
      } flex flex-col items-center justify-start pt-18 sm:pt-20 md:pt-10 pb-20 px-3 sm:px-6 md:p-10 md:pl-[292px] transition-colors duration-300 relative`}>
        
        {/* VIEW 1: Dual Device Emulators (iPhone & Samsung Galaxy S24) */}
        {(viewMode === 'homescreen' || viewMode === 'splash') && (
          <div className="w-full flex flex-col items-center my-auto">
            {/* Mobile Quick Device Switcher Pill */}
            <div className="flex md:hidden items-center justify-center mb-6">
              <div className={`p-1 rounded-2xl border flex items-center gap-1 shadow-sm ${
                isLight ? 'bg-white/95 border-slate-200' : 'bg-[#14171f]/90 border-white/10'
              }`}>
                {(['both', 'ios', 'android'] as DeviceLayout[]).map((layout) => (
                  <button
                    key={layout}
                    onClick={() => setDeviceLayout(layout)}
                    className={`px-3 py-1 rounded-xl text-xs font-medium capitalize transition-all ${
                      deviceLayout === layout 
                        ? 'bg-blue-600 text-white shadow-sm' 
                        : isLight 
                          ? 'text-slate-600 hover:text-slate-900' 
                          : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    {layout === 'both' ? 'Both' : layout === 'ios' ? 'iPhone' : 'Galaxy'}
                  </button>
                ))}
              </div>
            </div>

            {/* Devices Container */}
            <div
              className="flex flex-col lg:flex-row items-center justify-center gap-10 md:gap-16 transition-transform duration-200 origin-top"
              style={{ transform: `scale(${zoom})` }}
            >
              {/* Left: iPhone 18 Pro Max */}
              {(deviceLayout === 'both' || deviceLayout === 'ios') && (
                <IPhone15Pro
                  state={state}
                  viewMode={viewMode}
                  onLaunchApp={() => setViewMode('splash')}
                  onHomePress={() => setViewMode('homescreen')}
                  isSplashDark={isSplashDark}
                  studioTheme={studioTheme}
                />
              )}

              {/* Right: Samsung Galaxy S24 Ultra */}
              {(deviceLayout === 'both' || deviceLayout === 'android') && (
                <SamsungGalaxyS24
                  state={state}
                  viewMode={viewMode}
                  onLaunchApp={() => setViewMode('splash')}
                  onHomePress={() => setViewMode('homescreen')}
                  isSplashDark={isSplashDark}
                  maskShape={maskShape}
                  setMaskShape={setMaskShape}
                  studioTheme={studioTheme}
                />
              )}
            </div>
          </div>
        )}

        {/* VIEW 2: Safe Zone & Crop Inspector */}
        {viewMode === 'inspector' && (
          <div className="w-full my-auto transition-transform duration-200 origin-top" style={{ transform: `scale(${Math.min(zoom, 1)})` }}>
            <InspectorView
              state={state}
              maskShape={maskShape}
              setMaskShape={setMaskShape}
              studioTheme={studioTheme}
            />
          </div>
        )}

        {/* VIEW 3: Density & Size Comparison Grid */}
        {viewMode === 'sizes' && (
          <div className="w-full my-auto transition-transform duration-200 origin-top" style={{ transform: `scale(${Math.min(zoom, 1)})` }}>
            <SizeGrid state={state} studioTheme={studioTheme} />
          </div>
        )}

        {/* Spacer for bottom drawer */}
        <div className="h-16 shrink-0" />
      </main>

      {/* Bottom Diagnostics Drawer */}
      <DetailsDrawer state={state} studioTheme={studioTheme} />
    </div>
  );
};
