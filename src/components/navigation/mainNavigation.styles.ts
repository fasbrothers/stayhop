import { MuiStylesObject } from '@src/types/utility.types';

export const mainNavigationStyles = {
  navigation: {
    display: {
      xs: 'none',
      md: 'block',
    },
    position: 'sticky',
    top: 0,
    left: 0,
    borderBottom: '1px solid',
    borderColor: 'secondary2.light',
    color: 'primary.main',
    bgcolor: 'backgroundSecondary.main',
    zIndex: 100,
  },

  bottomNav: {
    'display': {
      xs: 'flex',
      md: 'none',
    },
    'bgcolor': 'backgroundSecondary.main',
    '.MuiBottomNavigationAction-root': { color: 'secondary2.main', gap: '0.25rem' },
    '& .Mui-selected, .Mui-selected svg': { color: 'secondary.main', fontWeight: 600 },
  },

  button: {
    'display': 'flex',
    'alignItems': 'center',
    'padding': 1,
    'textTransform': 'none',
    'borderRadius': '2rem',
    'border': '1px solid',
    'borderColor': 'secondary2.light',
    '&:hover': {
      bgcolor: 'background.default',
      boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.12)',
    },
  },

  menu: {
    'mt': 2,
    '& a': {
      color: 'primary.main',
      textDecoration: 'none',
      width: '100%',
    },
    '.MuiMenuItem-root': {
      py: 3,
    },
    '.MuiList-root': {
      padding: 0,
      bgcolor: 'background.default',
    },
  },

  profileImage: {
    bgcolor: 'secondary2.light',
    objectFit: 'cover',
    width: '2rem',
    height: '2rem',
    borderRadius: '50%',
  },
} satisfies MuiStylesObject;
