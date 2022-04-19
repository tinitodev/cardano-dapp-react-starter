import { createRoot } from 'react-dom/client'
import App from './app/App'
import { createTheme } from '@mui/material/styles'
import { ThemeProvider, CssBaseline } from '@mui/material'
import { WalletAPIProvider } from './context/WalletAPI/WalletAPIProvider'
import { getDesign } from './theme/theme'
import { BrowserRouter } from 'react-router-dom'

const rootElement = document.getElementById('root')

if (rootElement) {
  const root = createRoot(rootElement)
  root.render(
    <BrowserRouter>
      <WalletAPIProvider>
        <ThemeProvider theme={createTheme(getDesign('dark'))}>
          <CssBaseline />
          <App />
        </ThemeProvider>
      </WalletAPIProvider>
    </BrowserRouter>
  )
}
