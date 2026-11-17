export type ViewMode = 'homescreen' | 'splash' | 'inspector' | 'sizes';

export type DeviceLayout = 'both' | 'ios' | 'android';

export type StudioTheme = 'dark' | 'light';

export type AndroidMaskShape = 'squircle' | 'circle' | 'rounded-rect' | 'square' | 'teardrop';

export type WallpaperTheme = 
  | 'deep-space' 
  | 'titanium' 
  | 'sunset' 
  | 'minimal-dark' 
  | 'studio-grid'
  | 'light-studio'
  | 'light-silver'
  | 'light-sunset'
  | 'light-grid';

export interface ExpoState {
  projectRoot: string;
  configName: string | null;
  warnings: string[];
  assets: {
    iconPath: string;
    iosIconPath: string;
    splashPath: string;
    splashDarkPath: string;
  };
  expo: {
    name: string;
    icon: string | null;
    androidForegroundImage: string | null;
    adaptiveBackgroundColor: string;
    splashImage: string | null;
    splashImageWidth: number | null;
    splashBackgroundColor: string;
    splashDarkBackgroundColor: string;
    splashDarkImage: string | null;
  };
}

declare global {
  interface Window {
    STATE?: ExpoState;
  }
}
