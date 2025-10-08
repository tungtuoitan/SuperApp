/**
 * Material-UI Theme Configuration
 */
import { createTheme } from '@mui/material/styles';

declare module '@mui/material/styles' {
  interface Palette {
    sidebar: {
      main: string;
      light: string;
      dark: string;
      contrastText: string;
    };
  }
  interface PaletteOptions {
    sidebar?: {
      main?: string;
      light?: string;
      dark?: string;
      contrastText?: string;
    };
  }
}

export const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
    sidebar: {
      main: '#36454f',
      light: '#4a5a6a',
      dark: '#2a3840',
      contrastText: '#fff',
    },
    divider: '#e0e0e0',
    background: {
      default: '#f6f6f6',
      paper: '#ffffff',
    },
    grey: {
      100: '#fafafa',
      200: '#f5f5f5',
      300: '#e0e0e0',
      400: '#bdbdbd',
      500: '#9e9e9e',
    },
  },
  typography: {
    fontSize: 14,
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
    ].join(','),
    h5: {
      fontSize: '1.25rem',
      fontWeight: 500,
    },
    body1: {
      fontSize: '0.95rem',
    },
    button: {
      textTransform: 'none',
      fontWeight: 500,
      fontSize: '14px',
    },
  },
  spacing: 8,
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
        },
      },
    },
    MuiTextField: {
      defaultProps: {
        size: 'small',
      },
    },
    MuiDialog: {
      styleOverrides: {
        root: {
          backdropFilter: 'blur(8px)',
        },
      },
    },
  },
});

// DataGrid styling constants - apply via sx prop
export const dataGridStyles = {
  root: {
    border: 'none',
    '& .MuiDataGrid-columnHeader': {
      height: '52px',
      backgroundColor: '#fafafa',
    },
    '& .MuiDataGrid-row': {
      height: '50px',
      '&:hover': {
        backgroundColor: '#f5f5f5',
      },
      '&.Mui-selected': {
        backgroundColor: '#fdecea',
        '&:hover': {
          backgroundColor: '#f9e6e6',
        },
      },
    },
    '& .MuiDataGrid-cell': {
      borderWidth: '1px',
    },
  },
} as const;
