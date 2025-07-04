// lib/theme.ts

export const darkTheme = {
  mode: 'dark' as const,
  colors: {
    background: '#2C1B10',
    surface: '#3C2A1D',
    text: '#F5E8C7',
    lightText: '#F5E8C7',
    mutedText: '#C2B6A2',
    accent: '#F5E8C7',
    error: '#FF5A5F',
    green: '#4CAF50',
    dark: '#000000',
    border: '#4D3A2A',
    primary: '#A87C4F',
    newsCard: '#3B2617',
    highlight: '#FFD700',
    linkButton: '#A87C4F',

  },
}

export const lightTheme = {
  mode: 'light' as const,
  colors: {
    background: '#FFFFFF',
    surface: '#F5F5F5',
    text: '#000000',
    lightText: '#333333',
    mutedText: '#777777',
    accent: '#A87C4F',
    error: '#FF5A5F',
    green: '#4CAF50',
    dark: '#1F130A',
    border: '#DDDDDD',
    primary: '#A87C4F',
    newsCard: '#3B2617',
    highlight: '#FFD700',
    linkButton: '#A87C4F',

  },
}

export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
}

export const radius = {
  sm: 6,
  md: 12,
  lg: 20,
  xl: 32,
  xxl: 48,
  full: 9999,
}

type FontWeight =
  | '100' | '200' | '300' | '400' | '500' | '600' | '700' | '800' | '900'
  | 'normal' | 'bold';

export const typography = {
  title: {
    fontSize: 24,
    fontWeight: '700' as FontWeight,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: '600' as FontWeight,
  },
  body: {
    fontSize: 16,
    fontWeight: '400' as FontWeight,
  },
  small: {
    fontSize: 14,
    fontWeight: '400' as FontWeight,
  },
}
