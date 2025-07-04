// lib/theme.ts

export const darkTheme = {
  mode: 'dark' as const,
  colors: {
    background: '#000000',       // fond noir
    surface: '#121212',          // surfaces gris foncé
    text: '#F2F2F2',             // texte blanc doux
    lightText: '#CCCCCC',        // secondaire
    mutedText: '#888888',        // infos
    accent: '#FFFFFF',           // accent blanc
    error: '#FF6B6B',            // erreur rouge douce
    green: '#22C55E',            // vert succès
    dark: '#000000',             // noir pur
    border: '#2A2A2A',           // bordures discrètes
    primary: '#FFFFFF',          // couleur principale blanche
    newsCard: '#1A1A1A',         // blocs gris foncé
    highlight: '#FFFFFF',        // mise en valeur blanche
    linkButton: '#FFFFFF',       // texte des boutons
  },
}


export const lightTheme = {
  mode: 'light' as const,
  colors: {
    background: '#FFFFFF',       // fond blanc pur
    surface: '#FFFFFF',          // mêmes surfaces
    text: '#1A1A1A',             // texte noir doux
    lightText: '#3C3C3C',        // secondaire, plus doux
    mutedText: '#777777',        // infos, aides
    accent: '#111111',           // noir profond pour accent
    error: '#FF5A5F',            // rouge alerte
    green: '#22C55E',            // vert success
    dark: '#000000',             // pur noir
    border: '#E5E5E5',           // gris clair bordures
    primary: '#000000',          // couleur principale = noir
    newsCard: '#F9F9F9',         // cartes gris clair
    highlight: '#000000',        // mise en valeur = noir
    linkButton: '#000000',       // boutons = noir texte
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
