import { PaletteMode, ThemeOptions } from '@mui/material';

export const PRIMARY_LIGHT_THEME = '#222222';
export const PRIMARY_DARK_THEME = '#ffffff';
export const FOOTER_BG_LIGHT = '#f7f7f7';
export const SECONDARY_MAIN = '#82A6EE';
export const SECONDARY_DARK = '#7397de';

export const FONT_SIZES = {
  xs: {
    fontSize: '0.75rem',
    lineHeight: '1rem',
  },
  sm: {
    fontSize: '0.875rem',
    lineHeight: '1.25rem',
  },
  md: {
    fontSize: '1.2rem',
    lineHeight: '1.4rem',
  },
  lg: {
    fontSize: '1.375rem',
    lineHeight: '1.75rem',
  },
  xl: {
    fontSize: '1.5rem',
    lineHeight: '2rem',
  },
  heading: {
    'fontSize': '1.5rem',
    'fontWeight': 600,
    '@media (min-width:768px)': {
      fontSize: '2rem',
    },
  },
};

const lightTheme: ThemeOptions = {
  spacing: 4,
  palette: {
    mode: 'light',
    primary: {
      main: PRIMARY_LIGHT_THEME,
    },
    secondary: {
      main: SECONDARY_MAIN,
      dark: SECONDARY_DARK,
    },
    secondary2: {
      light: '#DDDDDD',
      main: '#717171',
    },
    backgroundSecondary: {
      main: '#FFFFFF',
    },
    backgroundFooter: {
      main: FOOTER_BG_LIGHT,
    },
  },
  typography: {
    fontFamily: 'Nunito, sans-serif',
    xs: FONT_SIZES.xs,
    sm: FONT_SIZES.sm,
    lg: FONT_SIZES.lg,
    xl: FONT_SIZES.xl,
    heading: FONT_SIZES.heading,
  },
  breakpoints: {
    values: {
      'xs': 0,
      'sm': 480,
      'md': 768,
      'lg': 1024,
      'xl': 1280,
      '2xl': 1536,
    },
  },
  components: {
    MuiTypography: {
      styleOverrides: {
        root: {
          color: PRIMARY_LIGHT_THEME,
          fontFamily: 'Nunito, sans-serif',
        },
      },
      defaultProps: {
        variantMapping: {
          xs: 'p',
          sm: 'p',
          lg: 'p',
          xl: 'p',
          heading: 'h1',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          fontWeight: 600,
          textTransform: 'none',
        },
      },
    },
  },
} as const;

const darkTheme: ThemeOptions = {
  spacing: 4,
  palette: {
    mode: 'dark',
    primary: {
      main: PRIMARY_DARK_THEME,
    },
    secondary: {
      main: SECONDARY_MAIN,
      dark: SECONDARY_DARK,
    },
    secondary2: {
      light: '#DDDDDD',
      main: '#717171',
    },
    backgroundSecondary: {
      main: '#23272E',
    },
    backgroundFooter: {
      main: '#23272E',
    },
    background: {
      default: '#282D38',
      paper: '#23272E',
    },
  },
  typography: {
    fontFamily: 'Nunito, sans-serif',
    xs: FONT_SIZES.xs,
    sm: FONT_SIZES.sm,
    lg: FONT_SIZES.lg,
    xl: FONT_SIZES.xl,
    heading: FONT_SIZES.heading,
  },
  breakpoints: {
    values: {
      'xs': 0,
      'sm': 480,
      'md': 768,
      'lg': 1024,
      'xl': 1280,
      '2xl': 1536,
    },
  },
  components: {
    MuiTypography: {
      styleOverrides: {
        root: {
          color: PRIMARY_DARK_THEME,
          fontFamily: 'Nunito, sans-serif',
        },
      },
      defaultProps: {
        variantMapping: {
          xs: 'p',
          sm: 'p',
          lg: 'p',
          xl: 'p',
          heading: 'h1',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          fontWeight: 600,
          textTransform: 'none',
        },
      },
    },
  },
} as const;

export const themeOptions: Record<PaletteMode, ThemeOptions> = {
  light: lightTheme,
  dark: darkTheme,
};
