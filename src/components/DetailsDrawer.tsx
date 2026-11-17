import React, { useState } from 'react';
import { ChevronUp, ChevronDown, AlertTriangle, FileCode, CheckCircle2, Copy } from 'lucide-react';
import { ExpoState, StudioTheme } from '../types';

interface DetailsDrawerProps {
  state: ExpoState;
  studioTheme?: StudioTheme;
}

export const DetailsDrawer: React.FC<DetailsDrawerProps> = ({ state, studioTheme = 'dark' }) => {
  const isLight = studioTheme === 'light';
  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const hasWarnings = state.warnings && state.warnings.length > 0;

  const copyConfigSnippet = () => {
    const snippet = JSON.stringify({
      expo: state.expo
    }, null, 2);
    navigator.clipboard.writeText(snippet);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className={`w-full fixed bottom-0 left-0 backdrop-blur-md z-40 text-xs transition-all select-none ${
      isLight 
        ? 'bg-white/95 border-t border-slate-200 text-slate-700 shadow-lg' 
        : 'bg-[#0f1219]/95 border-t border-white/[0.08] text-slate-300'
    }`}>
      {/* Bar handle */}
      <div 
        className={`h-10 px-4 md:pl-[292px] flex items-center justify-between cursor-pointer ${
          isLight ? 'hover:bg-slate-100/80' : 'hover:bg-white/[0.02]'
        }`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex items-center gap-2 sm:gap-4 truncate mr-2">
          <div className={`flex items-center gap-1.5 font-medium shrink-0 ${isLight ? 'text-slate-900' : 'text-white'}`}>
            <FileCode className="w-4 h-4 text-blue-500" />
            <span className="truncate">Diagnostics</span>
          </div>

          {hasWarnings ? (
            <div className="flex items-center gap-1 text-amber-500 font-medium bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20 truncate text-[11px]">
              <AlertTriangle className="w-3.5 h-3.5 shrink-0" />
              <span className="truncate">{state.warnings.length} warning{state.warnings.length > 1 ? 's' : ''}</span>
            </div>
          ) : (
            <div className="flex items-center gap-1 text-emerald-500 font-medium truncate text-[11px]">
              <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
              <span className="truncate hidden sm:inline">All assets resolved cleanly</span>
              <span className="truncate sm:hidden">Clean</span>
            </div>
          )}
        </div>

        <div className={`flex items-center gap-1.5 shrink-0 text-[11px] sm:text-xs ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>
          <span className="hidden sm:inline">{isOpen ? 'Collapse Diagnostics' : 'Expand Diagnostics'}</span>
          <span className="sm:hidden">{isOpen ? 'Collapse' : 'Details'}</span>
          {isOpen ? <ChevronDown className="w-4 h-4" /> : <ChevronUp className="w-4 h-4" />}
        </div>
      </div>

      {/* Expanded Content */}
      {isOpen && (
        <div className={`p-6 md:pl-[292px] border-t grid grid-cols-1 md:grid-cols-3 gap-6 max-h-72 overflow-y-auto ${
          isLight ? 'bg-slate-50 border-slate-200 text-slate-700' : 'bg-[#0c0e14] border-white/[0.06] text-slate-300'
        }`}>
          {/* Col 1: Resolved Asset Paths */}
          <div className="flex flex-col gap-2">
            <span className={`font-semibold uppercase tracking-wider text-[10px] ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>Mapped Asset Paths</span>
            <div className="space-y-1.5 font-mono text-[11px]">
              <div className={`p-2 rounded border ${isLight ? 'bg-white border-slate-200 text-slate-800' : 'bg-white/[0.03] border-white/[0.05] text-slate-200'}`}>
                <span className={isLight ? 'text-slate-400' : 'text-slate-500'}>Android Foreground:</span>
                <div className="truncate font-medium">{state.assets.iconPath}</div>
              </div>
              <div className={`p-2 rounded border ${isLight ? 'bg-white border-slate-200 text-slate-800' : 'bg-white/[0.03] border-white/[0.05] text-slate-200'}`}>
                <span className={isLight ? 'text-slate-400' : 'text-slate-500'}>iOS App Icon:</span>
                <div className="truncate font-medium">{state.assets.iosIconPath}</div>
              </div>
              <div className={`p-2 rounded border ${isLight ? 'bg-white border-slate-200 text-slate-800' : 'bg-white/[0.03] border-white/[0.05] text-slate-200'}`}>
                <span className={isLight ? 'text-slate-400' : 'text-slate-500'}>Splash Screen:</span>
                <div className="truncate font-medium">{state.assets.splashPath}</div>
              </div>
            </div>
          </div>

          {/* Col 2: Active Warnings */}
          <div className="flex flex-col gap-2">
            <span className={`font-semibold uppercase tracking-wider text-[10px] ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>Configuration Warnings</span>
            {hasWarnings ? (
              <div className="space-y-1.5">
                {state.warnings.map((w, idx) => (
                  <div key={idx} className="p-2.5 rounded bg-amber-500/10 border border-amber-500/25 text-amber-700 dark:text-amber-200 text-xs flex items-start gap-2">
                    <AlertTriangle className="w-3.5 h-3.5 text-amber-500 shrink-0 mt-0.5" />
                    <span>{w}</span>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-4 rounded bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 text-xs flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                <span>Zero warnings. All config and asset paths exist on disk.</span>
              </div>
            )}
          </div>

          {/* Col 3: Quick Info & Snippet Copy */}
          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <span className={`font-semibold uppercase tracking-wider text-[10px] ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>Expo Config Payload</span>
              <button 
                onClick={copyConfigSnippet}
                className={`flex items-center gap-1 text-[11px] px-2 py-0.5 rounded transition-all ${
                  isLight ? 'bg-slate-200 hover:bg-slate-300 text-slate-800' : 'bg-white/10 hover:bg-white/15 text-white'
                }`}
              >
                <Copy className="w-3 h-3" />
                <span>{copied ? 'Copied!' : 'Copy JSON'}</span>
              </button>
            </div>
            <pre className="p-3 rounded bg-black/80 text-emerald-400 border border-black/20 font-mono text-[10px] overflow-x-auto max-h-36">
              {JSON.stringify(state.expo, null, 2)}
            </pre>
          </div>
        </div>
      )}
    </div>
  );
};
