import React from 'react'
import ReactDOM from 'react-dom/client'
import CssBaseline from '@mui/material/CssBaseline'
import {ThemeProvider} from '@mui/material/styles'
import App from './App'
import reportWebVitals from './reportWebVitals'
import theme from './theme'
import {QueryClient, QueryClientProvider} from 'react-query'

const twentyFourHoursInMs = 1000 * 60 * 60 * 24

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // Undo React Query's aggressive default settings.
      // Docs: https://react-query.tanstack.com/guides/important-defaults
      refetchOnMount: false,
      refetchOnReconnect: false,
      refetchOnWindowFocus: false,
      // Query instances via useQuery or useInfiniteQuery by default consider cached data as stale.
      staleTime: twentyFourHoursInMs,
    },
  },
})

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
  <React.StrictMode>
    {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    </ThemeProvider>
  </React.StrictMode>,
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
