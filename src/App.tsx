import React from 'react'
import Header from 'components/Header'
import {UserProvider} from 'contexts/UserContext'
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

export default function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <UserProvider>
          <Header />
          <div>
            <h1>Hello World</h1>
          </div>
        </UserProvider>
      </QueryClientProvider>
    </>
  )
}
