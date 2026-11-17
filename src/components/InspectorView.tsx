import React, { useState } from 'react';
import { ShieldCheck, Info, CheckCircle2, Sparkles, Sliders } from 'lucide-react';
import { ExpoState, AndroidMaskShape, StudioTheme } from '../types';

interface InspectorViewProps {
  state: ExpoState;
  maskShape: AndroidMaskShape;
  setMaskShape: (shape: AndroidMaskShape) => void;
  studioTheme?: StudioTheme;
}

export const InspectorView: React.FC<InspectorViewProps> = ({
  state,
  maskShape,
  setMaskShape,
  studioTheme = 'dark',
}) => {
  const isLight = studioTheme === 'light';
  const [showSafeZone, setShowSafeZone] = useState(true);
  const [showViewport, setShowViewport] = useState(true);
  const [showCropMargin, setShowCropMargin] = useState(true);
  const [customBgColor, setCustomBgColor] = useState(state.expo.adaptiveBackgroundColor || '#FFFFFF');

  const maskClassMap: Record<AndroidMaskShape, string> = {
    'squircle': 'mask-squircle',
    'circle': 'mask-circle',
    'rounded-rect': 'mask-rounded-rect',
    'square': 'mask-square',
    'teardrop': 'mask-teardrop',
  };

  return (
    <div className="w-full max-w-5xl mx-auto flex flex-col gap-8 pb-16">
      {/* Overview Banner */}
      <div className={`rounded-2xl border p-6 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4 transition-colors ${
        isLight 
          ? 'bg-white/95 border-slate-200 text-slate-900 shadow-slate-200/50' 
          : 'bg-[#141720]/80 backdrop-blur-md border-white/[0.08] text-white'
      }`}>
        <div>
          <h2 className={`text-xl font-bold flex items-center gap-2 ${isLight ? 'text-slate-900' : 'text-white'}`}>
            <Sliders className="w-5 h-5 text-blue-500" />
            Adaptive Icon & Safe Zone Inspector
          </h2>
          <p className={`text-sm mt-1 max-w-2xl ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
            Android adaptive icons use a 108dp square canvas. The outer 18dp on each side is reserved for OEM dynamic mask clipping and parallax movement. Essential branding must remain inside the 66dp safe zone.
          </p>
        </div>

        {/* Mask shape quick selector */}
        <div className="flex flex-col gap-1.5 shrink-0">
          <span className={`text-xs font-medium ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>Android Shape Preview:</span>
          <div className={`flex items-center gap-1 p-1 rounded-xl border ${
            isLight ? 'bg-slate-100 border-slate-200' : 'bg-[#1c202c] border-white/10'
          }`}>
            {(['squircle', 'circle', 'rounded-rect', 'square', 'teardrop'] as AndroidMaskShape[]).map((shape) => (
              <button
                key={shape}
                onClick={() => setMaskShape(shape)}
                className={`px-2.5 py-1 rounded-lg text-xs capitalize transition-all ${
                  maskShape === shape 
                    ? 'bg-blue-600 text-white font-medium shadow-md' 
                    : isLight ? 'text-slate-600 hover:text-slate-900' : 'text-slate-400 hover:text-white'
                }`}
              >
                {shape.replace('-', ' ')}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Side-by-side Inspection Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left: Android Adaptive Icon Math Breakdown */}
        <div className={`rounded-2xl border p-6 flex flex-col items-center shadow-xl transition-colors ${
          isLight ? 'bg-white border-slate-200 shadow-slate-200/50' : 'bg-[#141720] border-white/[0.08]'
        }`}>
          <div className="w-full flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
              <h3 className={`font-semibold ${isLight ? 'text-slate-900' : 'text-white'}`}>Android Adaptive Canvas</h3>
            </div>
            <span className="text-xs font-mono px-2 py-0.5 rounded bg-emerald-500/15 text-emerald-500 font-semibold border border-emerald-500/30">
              108dp Canvas
            </span>
          </div>

          {/* Interactive Math Canvas */}
          <div className={`relative w-[324px] h-[324px] rounded-2xl border-2 border-dashed flex items-center justify-center overflow-hidden shadow-2xl ${
            isLight ? 'border-slate-300 bg-slate-100' : 'border-white/20 bg-slate-950'
          }`}>
            {/* Background Layer */}
            <div 
              className="absolute inset-0 w-full h-full"
              style={{ backgroundColor: customBgColor }}
            />

            {/* Foreground Asset */}
            <img 
              src="/assets/icon" 
              alt="Android Foreground"
              className="absolute inset-0 w-full h-full object-cover select-none pointer-events-none"
            />

            {/* Viewport Mask Guide (72dp = 216px) */}
            {showViewport && (
              <div 
                className={`absolute w-[216px] h-[216px] border-2 border-emerald-500 shadow-[0_0_20px_rgba(52,211,153,0.3)] pointer-events-none ${maskClassMap[maskShape]}`}
              >
                <div className="absolute top-1 left-2 text-[10px] font-mono font-bold text-white bg-black/75 px-1 rounded">
                  72dp Viewport
                </div>
              </div>
            )}

            {/* Safe Zone Inner Circle (66dp = 198px diameter) */}
            {showSafeZone && (
              <div className="absolute w-[198px] h-[198px] rounded-full border-2 border-dashed border-amber-500 shadow-[0_0_15px_rgba(251,191,36,0.3)] pointer-events-none flex items-center justify-center">
                <span className="text-[10px] font-mono font-bold text-white bg-black/75 px-1.5 py-0.5 rounded">
                  66dp Safe Zone
                </span>
              </div>
            )}

            {/* 18dp Crop Margin Guide Ring */}
            {showCropMargin && (
              <div className="absolute inset-0 border-[54px] border-red-500/15 pointer-events-none" />
            )}
          </div>

          {/* Guide Legend Toggles */}
          <div className="flex flex-wrap items-center justify-center gap-3 mt-6">
            <button
              onClick={() => setShowSafeZone(!showSafeZone)}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-medium border transition-all ${
                showSafeZone ? 'bg-amber-500/15 text-amber-600 border-amber-500/40' : (isLight ? 'bg-slate-100 text-slate-500 border-slate-200' : 'bg-white/5 text-slate-500 border-white/5')
              }`}
            >
              <span className="w-2 h-2 rounded-full bg-amber-500" />
              66dp Safe Zone
            </button>

            <button
              onClick={() => setShowViewport(!showViewport)}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-medium border transition-all ${
                showViewport ? 'bg-emerald-500/15 text-emerald-600 border-emerald-500/40' : (isLight ? 'bg-slate-100 text-slate-500 border-slate-200' : 'bg-white/5 text-slate-500 border-white/5')
              }`}
            >
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              72dp Viewport Mask
            </button>

            <button
              onClick={() => setShowCropMargin(!showCropMargin)}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-medium border transition-all ${
                showCropMargin ? 'bg-red-500/15 text-red-600 border-red-500/40' : (isLight ? 'bg-slate-100 text-slate-500 border-slate-200' : 'bg-white/5 text-slate-500 border-white/5')
              }`}
            >
              <span className="w-2 h-2 rounded-full bg-red-500" />
              18dp Crop Margin
            </button>
          </div>

          {/* Color Switcher */}
          <div className={`flex items-center gap-3 mt-5 pt-4 border-t w-full justify-between text-xs ${
            isLight ? 'border-slate-200 text-slate-600' : 'border-white/[0.08] text-slate-400'
          }`}>
            <span>Adaptive Background Color:</span>
            <div className={`flex items-center gap-2 font-mono font-medium ${isLight ? 'text-slate-900' : 'text-white'}`}>
              <input 
                type="color" 
                value={customBgColor} 
                onChange={(e) => setCustomBgColor(e.target.value)}
                className="w-6 h-6 rounded cursor-pointer border-0 bg-transparent"
              />
              <span>{customBgColor.toUpperCase()}</span>
            </div>
          </div>
        </div>

        {/* Right: iOS Icon Anatomy Breakdown */}
        <div className={`rounded-2xl border p-6 flex flex-col items-center shadow-xl transition-colors ${
          isLight ? 'bg-white border-slate-200 shadow-slate-200/50' : 'bg-[#141720] border-white/[0.08]'
        }`}>
          <div className="w-full flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-blue-500" />
              <h3 className={`font-semibold ${isLight ? 'text-slate-900' : 'text-white'}`}>iOS App Icon Anatomy</h3>
            </div>
            <span className="text-xs font-mono px-2 py-0.5 rounded bg-blue-500/15 text-blue-500 font-semibold border border-blue-500/30">
              1024×1024 Flat Source
            </span>
          </div>

          {/* iOS Preview Box */}
          <div className={`relative w-[324px] h-[324px] rounded-2xl border-2 flex items-center justify-center p-8 shadow-2xl ${
            isLight ? 'border-slate-200 bg-slate-50' : 'border-white/10 bg-slate-950'
          }`}>
            <div className="w-[240px] h-[240px] ios-squircle shadow-2xl bg-black relative">
              <img 
                src="/assets/ios-icon" 
                alt="iOS Icon"
                className="w-full h-full object-cover select-none"
              />
              <div className="absolute inset-0 rounded-[22.5%] border border-white/20 pointer-events-none" />
            </div>
          </div>

          {/* iOS Specs Table */}
          <div className="w-full mt-6 space-y-3">
            <div className={`flex items-center justify-between text-xs p-3 rounded-xl border ${
              isLight ? 'bg-slate-50 border-slate-200 text-slate-700' : 'bg-white/[0.03] border-white/[0.06] text-slate-300'
            }`}>
              <span className={isLight ? 'text-slate-500' : 'text-slate-400'}>Source Dimensions:</span>
              <span className="font-mono font-medium">1024 × 1024 px</span>
            </div>

            <div className={`flex items-center justify-between text-xs p-3 rounded-xl border ${
              isLight ? 'bg-slate-50 border-slate-200 text-slate-700' : 'bg-white/[0.03] border-white/[0.06] text-slate-300'
            }`}>
              <span className={isLight ? 'text-slate-500' : 'text-slate-400'}>Corner Radius:</span>
              <span className="font-mono font-medium">Continuous Curvature (22.5%)</span>
            </div>

            <div className={`flex items-center justify-between text-xs p-3 rounded-xl border ${
              isLight ? 'bg-slate-50 border-slate-200 text-slate-700' : 'bg-white/[0.03] border-white/[0.06] text-slate-300'
            }`}>
              <span className={isLight ? 'text-slate-500' : 'text-slate-400'}>Alpha Transparency:</span>
              <span className="inline-flex items-center gap-1 text-emerald-500 font-medium font-mono">
                <CheckCircle2 className="w-3.5 h-3.5" /> Opaque (Apple Compliant)
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
