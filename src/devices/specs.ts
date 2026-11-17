import React from 'react';
import { 
  IoCall, 
  IoCompass, 
  IoChatbubble, 
  IoMusicalNotes, 
  IoCamera, 
  IoMail, 
  IoSettings, 
  IoTime, 
  IoCalendar, 
  IoMap, 
  IoHeart, 
  IoWallet, 
  IoImages, 
  IoVideocam, 
  IoLogoApple, 
  IoGameController, 
  IoLogoGoogle, 
  IoMic, 
  IoLogoGooglePlaystore, 
  IoGlobe, 
  IoFolder, 
  IoCalculator, 
  IoPlayCircle,
  IoSearch
} from 'react-icons/io5';

export interface AppIconSpec {
  id: string;
  name: string;
  icon: React.ComponentType<{ className?: string }>;
  bg: string;
  color?: string;
}

export interface DeviceSpec {
  id: string;
  name: string;
  osName: string;
  osVersion: string;
  platform: 'ios' | 'android';
  mockupSrc: string;
  frameDimensions: { width: number; height: number };
  screenCutout: { top: number; bottom: number; left: number; right: number; borderRadius: number };
  statusBar: { time: string; height: number };
  systemApps: AppIconSpec[];
  dockApps: AppIconSpec[];
}

export const IPHONE_PRO_SPEC: DeviceSpec = {
  id: 'iphone-18-pro-max',
  name: 'iPhone 18 Pro Max',
  osName: 'iOS',
  osVersion: '18.2',
  platform: 'ios',
  mockupSrc: '/assets/mockups/mockup-apple-iphone-18-pro-max-2026-transparent.webp',
  frameDimensions: { width: 389, height: 800 },
  screenCutout: { top: 14, bottom: 14, left: 18, right: 18, borderRadius: 46 },
  statusBar: { time: '10:00', height: 48 },
  systemApps: [
    { id: 'facetime', name: 'FaceTime', icon: IoVideocam, bg: 'bg-[#34C759]', color: 'text-white' },
    { id: 'calendar', name: 'Calendar', icon: IoCalendar, bg: 'bg-white', color: 'text-red-600' },
    { id: 'photos', name: 'Photos', icon: IoImages, bg: 'bg-white', color: 'text-amber-500' },
    { id: 'camera', name: 'Camera', icon: IoCamera, bg: 'bg-[#1C1C1E]', color: 'text-slate-200' },
    { id: 'mail', name: 'Mail', icon: IoMail, bg: 'bg-gradient-to-b from-[#38A4FF] to-[#007AFF]', color: 'text-white' },
    { id: 'clock', name: 'Clock', icon: IoTime, bg: 'bg-white', color: 'text-slate-900' },
    { id: 'maps', name: 'Maps', icon: IoMap, bg: 'bg-gradient-to-tr from-[#34C759] to-[#30D158]', color: 'text-white' },
    { id: 'health', name: 'Health', icon: IoHeart, bg: 'bg-white', color: 'text-[#FF2D55]' },
    { id: 'wallet', name: 'Wallet', icon: IoWallet, bg: 'bg-black', color: 'text-amber-400' },
    { id: 'settings', name: 'Settings', icon: IoSettings, bg: 'bg-[#8E8E93]', color: 'text-slate-100' },
    { id: 'tv', name: 'TV', icon: IoLogoApple, bg: 'bg-black', color: 'text-white' },
  ],
  dockApps: [
    { id: 'phone', name: 'Phone', icon: IoCall, bg: 'bg-[#34C759]', color: 'text-white' },
    { id: 'safari', name: 'Safari', icon: IoCompass, bg: 'bg-[#007AFF]', color: 'text-white' },
    { id: 'messages', name: 'Messages', icon: IoChatbubble, bg: 'bg-[#34C759]', color: 'text-white' },
    { id: 'music', name: 'Music', icon: IoMusicalNotes, bg: 'bg-[#FA2D55]', color: 'text-white' },
  ]
};

export const GALAXY_S24_SPEC: DeviceSpec = {
  id: 'galaxy-s24',
  name: 'Galaxy S24 Ultra',
  osName: 'One UI',
  osVersion: '6.1',
  platform: 'android',
  mockupSrc: '/assets/mockups/mockup-samsung-galaxy-s24-2024-transparent.webp',
  frameDimensions: { width: 386, height: 800 },
  screenCutout: { top: 14, bottom: 14, left: 15, right: 15, borderRadius: 28 },
  statusBar: { time: '10:00', height: 40 },
  systemApps: [
    { id: 'play', name: 'Play Store', icon: IoLogoGooglePlaystore, bg: 'bg-white', color: 'text-blue-600' },
    { id: 'photos', name: 'Gallery', icon: IoImages, bg: 'bg-[#E53935]', color: 'text-white' },
    { id: 'camera', name: 'Camera', icon: IoCamera, bg: 'bg-[#D32F2F]', color: 'text-white' },
    { id: 'chrome', name: 'Chrome', icon: IoGlobe, bg: 'bg-white', color: 'text-blue-500' },
    { id: 'gmail', name: 'Gmail', icon: IoMail, bg: 'bg-white', color: 'text-red-500' },
    { id: 'youtube', name: 'YouTube', icon: IoPlayCircle, bg: 'bg-[#FF0000]', color: 'text-white' },
    { id: 'maps', name: 'Maps', icon: IoMap, bg: 'bg-[#00897B]', color: 'text-white' },
  ],
  dockApps: [
    { id: 'phone', name: 'Phone', icon: IoCall, bg: 'bg-[#34C759]', color: 'text-white' },
    { id: 'messages', name: 'Messages', icon: IoChatbubble, bg: 'bg-[#1976D2]', color: 'text-white' },
    { id: 'chrome', name: 'Chrome', icon: IoGlobe, bg: 'bg-white', color: 'text-blue-600' },
    { id: 'camera', name: 'Camera', icon: IoCamera, bg: 'bg-[#D32F2F]', color: 'text-white' },
  ]
};
