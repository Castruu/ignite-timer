import { ThemeProvider } from 'styled-components'
import { defaultTheme } from './styles/themes/default.ts'
import { GlobalStyle } from './styles/global.ts'
import { BrowserRouter } from 'react-router-dom'
import { Router } from './Router.tsx'
import { CyclesContextProvider } from './contexts/CyclesContext.tsx'

export function App() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <CyclesContextProvider>
        <BrowserRouter>
          <Router />
        </BrowserRouter>
      </CyclesContextProvider>
      <GlobalStyle />
    </ThemeProvider>
  )
}
