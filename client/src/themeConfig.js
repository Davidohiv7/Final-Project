import { createMuiTheme } from '@material-ui/core/styles'

const theme = createMuiTheme({
  palette: {
    // LightRed - DarkRed
    primary: {
      main: '#CE1212',
      dark: '#810000'
    },
    // LightGray - DarkGray
    secondary: {
      main: '#EEEBDD',
      dark: '#1B1717'
    }
  }
})

export default theme;