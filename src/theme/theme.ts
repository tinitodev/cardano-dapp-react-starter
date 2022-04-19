import { PaletteMode, Breakpoints } from '@mui/material'
import { amber, grey, deepOrange } from '@mui/material/colors'

// define custom breakpoints
declare module '@mui/material/styles' {
  interface BreakpointOverrides {
    xs: false
    sm: false
    md: false
    lg: false
    xl: false
    mobile: true
    tablet: true
    desktop: true
    largeDesktop: true
  }
}

const breakpoints: Breakpoints['values'] = {
  mobile: 375,
  tablet: 940,
  desktop: 1440,
  largeDesktop: 1900,
}

export const getDesign = (mode: PaletteMode) => ({
  palette: {
    mode,
    ...(mode === 'light'
      ? {
          // light mode
          primary: amber,
          divider: amber[200],
          background: {
            default: 'hsl(0, 0%, 98%)',
            paper: 'hsl(63, 7%, 95%)',
          },
          text: {
            primary: 'hsl(200, 15%, 8%)',
            secondary: grey[800],
          },
        }
      : {
          // dark mode
          primary: deepOrange,
          divider: deepOrange[700],
          background: {
            default: 'hsl(207, 26%, 17%)',
            paper: 'hsl(209, 23%, 22%)',
          },
          text: {
            primary: 'hsl(0, 0%, 100%)',
            secondary: grey[500],
          },
        }),
  },
  breakpoints: {
    values: breakpoints,
  },
})
