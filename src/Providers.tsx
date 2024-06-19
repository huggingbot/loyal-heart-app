import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ModalProvider } from './contexts/ModalContext'
import { AuthProvider } from './contexts/AuthContext'

const queryClient = new QueryClient()

const Providers = ({ children }: React.PropsWithChildren): JSX.Element => {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <ModalProvider>{children}</ModalProvider>
      </AuthProvider>
    </QueryClientProvider>
  )
}

export default Providers
