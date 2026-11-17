import React, { useState, useEffect } from 'react';
import { FloatingSidebar } from './components/FloatingSidebar';
import { IPhone15Pro } from './components/IPhone15Pro';
import { SamsungGalaxyS24 } from './components/SamsungGalaxyS24';
import { InspectorView } from './components/InspectorView';
import { SizeGrid } from './components/SizeGrid';
import { DetailsDrawer } from './components/DetailsDrawer';
import { ViewMode, DeviceLayout, WallpaperTheme, AndroidMaskShape, StudioTheme, ExpoState } from './types';

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
  const [zoom, setZoom] = useState<number>(0.85);
  const [isSplashDark, setIsSplashDark] = useState<boolean>(false);
  const [maskShape, setMaskShape] = useState<AndroidMaskShape>('squircle');

  // Persist theme choice
  useEffect(() => {
    try {
      localStorage.setItem('iconpeek_theme', studioTheme);
    } catch { }
  }, [studioTheme]);

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
    <div className={`w-screen h-screen flex overflow-hidden font-sans theme-${studioTheme} relative ${isLight ? 'bg-slate-100 text-slate-900' : 'bg-[#0b0d11] text-slate-100'
      }`}>
      {/* Premium Floating Glass Sidebar on Left */}
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
      />

      {/* Main Studio Workspace Canvas (Permanent Default Grid Backdrop) */}
      <main className={`flex-1 h-full overflow-y-auto overflow-x-hidden ${isLight ? 'wallpaper-light-grid' : 'wallpaper-studio-grid'} flex flex-col items-center justify-start p-6 md:p-10 md:pl-[292px] transition-colors duration-300 relative`}>
        {/* VIEW 1: Dual Device Emulators (Iphone (IOS) & Samsung Galaxy S24) */}
        {(viewMode === 'homescreen' || viewMode === 'splash') && (
          <div
            className="flex flex-wrap items-center justify-center gap-10 md:gap-16 my-auto transition-transform duration-200 origin-top"
            style={{ transform: `scale(${zoom})` }}
          >
            {/* Left: Iphone (IOS) */}
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
