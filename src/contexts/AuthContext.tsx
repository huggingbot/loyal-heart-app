import { createContext, useContext, useState, useEffect } from 'react'
import { Session } from '@supabase/supabase-js'
import { supabase } from '../utils/supabase'
import { useNavigate } from '@tanstack/react-router'
import { setTokenHeader } from '../services/data-provider/utils'

const AuthContext = createContext<{
  session: Session | null
  loading: boolean
  signIn: (data: { email: string; password: string }) => Promise<void>
  signOut: () => Promise<void>
}>({
  session: null,
  loading: true,
  signIn: async () => {},
  signOut: async () => {},
})

export const AuthProvider = ({ children }: React.PropsWithChildren) => {
  const [session, setSession] = useState<Session | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const getSession = async () => {
      const sessionResult = await supabase.auth.getSession()
      setSession(sessionResult.data.session)

      if (sessionResult.data.session) {
        setTokenHeader(sessionResult.data.session.access_token)
      }
      setLoading(false)
    }
    getSession()

    const { data: authListener } = supabase.auth.onAuthStateChange((_, session) => {
      setSession(session)
      setLoading(false)
    })

    return () => {
      authListener.subscription.unsubscribe()
    }
  }, [])

  const signIn = async ({ email, password }: { email: string; password: string }) => {
    const { error, data } = await supabase.auth.signInWithPassword({ email, password })
    if (error) throw error
    setSession(data.session)
  }

  const signOut = async () => {
    await supabase.auth.signOut()
    setSession(null)
  }

  return <AuthContext.Provider value={{ session, loading, signIn, signOut }}>{children}</AuthContext.Provider>
}

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
  const { session, ...rest } = useContext(AuthContext)
  const navigate = useNavigate()

  useEffect(() => {
    if (!session) {
      navigate({ to: '/admin' })
    }
  }, [session, navigate])

  return { ...rest, session, isAuthenticated: !!session }
}
