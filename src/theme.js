import {createTheme} from '@mui/material/styles'

import robotoRegularUrl from 'assets/fonts/Roboto/Roboto-Regular.ttf'
import robotoBoldUrl from 'assets/fonts/Roboto/Roboto-Bold.ttf'

const theme = createTheme({
  palette: {
    primary: {
      main: '#005B96',
      contrastText: '#fff',
    },
    secondary: {
      main: '#1BC5BD',
      contrastText: '#fff',
    },
    border: {
      base: '#F3F6F9',
    },
    background: {
      yellow: '#F6CA65',
    },
    text: {
      grey: '#7E8299',
      white: '#FFFFFF',
      link: '#005B96',
    },
  },
  typography: {
    fontFamily: 'Roboto',
    fontWeightBold: 700,
    h1: {
      fontSize: '1.5rem',
      lineHeight: '1.758rem',
      margin: 0,
      padding: 0,
    },
    h2: {
      fontSize: '1rem',
      lineHeight: '1.172rem',
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: `
        @font-face {
          font-family: 'Roboto';
          font-size: normal;
          font-weight: 400;
          src: url(${robotoRegularUrl});
        }

        @font-face {
          font-family: 'Roboto';
          font-size: normal;
          font-weight: 700;
          src: url(${robotoBoldUrl});
        }
      `,
    },
  },
})

export default theme
