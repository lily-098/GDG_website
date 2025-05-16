// Google's color palette
const googleColors = {
  blue: {
    primary: '#4285F4',
    light: '#8AB4F8',
    dark: '#1A73E8',
    darker: '#0B57D0',
    five:"'#3b82f6'"
  },
  red: {
    primary: '#EA4335',
    light: '#F28B82',
    dark: '#D93025',
    darker: '#B31412',
  },
  yellow: {
    primary: '#FBBC05',
    light: '#FDE293',
    dark: '#F9AB00',
    darker: '#F29900',
  },
  green: {
    primary: '#34A853',
    light: '#81C995',
    dark: '#188038',
    darker: '#0F652F',
  },
  grey: {
    50: '#F8F9FA',
    100: '#F1F3F4',
    200: '#E8EAED',
    300: '#DADCE0',
    400: '#BDC1C6',
    500: '#9AA0A6',
    600: '#80868B',
    700: '#5F6368',
    800: '#3C4043',
    900: '#202124',
  }
};

export const lightTheme = {
  name: 'light',
  colors: {
    primary: googleColors.blue.primary,
    secondary: googleColors.green.primary,
    accent: googleColors.yellow.primary,
    error: googleColors.red.primary,
    
    background: {
      primary: '#FFFFFF',
      secondary: googleColors.grey[50],
      tertiary: googleColors.grey[100],
    },
    text: {
      primary: googleColors.grey[900],
      secondary: googleColors.grey[700],
      tertiary: googleColors.grey[600],
      inverse: '#FFFFFF',
    },
    border: googleColors.grey[300],
    shadow: 'rgba(60, 64, 67, 0.3)',
    overlay: 'rgba(32, 33, 36, 0.1)',
  },
  googleColors,
};

export const darkTheme = {
  name: 'dark',
  colors: {
    primary: googleColors.blue.light,
    secondary: googleColors.green.light,
    accent: googleColors.yellow.light,
    error: googleColors.red.light,
    
    background: {
      primary: googleColors.grey[900],
      secondary: googleColors.grey[800],
      tertiary: googleColors.grey[700],
    },
    text: {
      primary: googleColors.grey[50],
      secondary: googleColors.grey[200],
      tertiary: googleColors.grey[400],
      inverse: googleColors.grey[900],
    },
    border: googleColors.grey[700],
    shadow: 'rgba(0, 0, 0, 0.5)',
    overlay: 'rgba(0, 0, 0, 0.4)',
  },
  googleColors,
};