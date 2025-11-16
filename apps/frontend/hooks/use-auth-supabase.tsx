'use client'

import { useState, useEffect, useContext, createContext, ReactNode } from 'react'

interface DjangoUser {
  id: number
  username: string
  email: string
  name: string
  first_name?: string
  last_name?: string
}

interface AuthContextType {
  user: DjangoUser | null
  loading: boolean
  signUp: (email: string, password: string, userData?: any) => Promise<any>
  signIn: (email: string, password: string) => Promise<any>
  signOut: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

interface AuthProviderProps {
  children: ReactNode
}

const DJANGO_API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8000/api'

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<DjangoUser | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Verificar se há usuário salvo no localStorage
    const savedUser = localStorage.getItem('django_user')
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser))
      } catch (error) {
        localStorage.removeItem('django_user')
      }
    }
    setLoading(false)
  }, [])

  const signUp = async (email: string, password: string, userData?: any) => {
    try {
      setLoading(true)
      
      // Gerar username baseado no email
      const username = userData?.name?.replace(/\s+/g, '').toLowerCase() || email.split('@')[0]
      
      const response = await fetch(`${DJANGO_API_BASE}/auth/register/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username,
          email,
          password,
          first_name: userData?.name?.split(' ')[0] || '',
          last_name: userData?.name?.split(' ').slice(1).join(' ') || '',
          campus: userData?.campus || 'gama',
        }),
      })
      
      const data = await response.json()
      
      if (!response.ok) {
        throw new Error(data.message || 'Erro ao cadastrar usuário')
      }
      
      if (data.success) {
        // Login automático após cadastro
        return await signIn(email, password)
      }
      
      return { data, error: null }
    } catch (error: any) {
      return { data: null, error: error.message || 'Erro ao cadastrar usuário' }
    } finally {
      setLoading(false)
    }
  }

  const signIn = async (email: string, password: string) => {
    try {
      setLoading(true)
      
      const response = await fetch(`${DJANGO_API_BASE}/auth/login/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
        }),
      })
      
      const data = await response.json()
      
      if (!response.ok) {
        throw new Error(data.message || 'Erro ao fazer login')
      }
      
      if (data.success && data.user) {
        setUser(data.user)
        localStorage.setItem('django_user', JSON.stringify(data.user))
        return { data, error: null }
      }
      
      throw new Error(data.message || 'Credenciais inválidas')
    } catch (error: any) {
      return { data: null, error: error.message || 'Erro ao fazer login' }
    } finally {
      setLoading(false)
    }
  }

  const signOut = async () => {
    try {
      setLoading(true)
      setUser(null)
      localStorage.removeItem('django_user')
    } catch (error) {
      console.error('Erro ao fazer logout:', error)
    } finally {
      setLoading(false)
    }
  }

  const value: AuthContextType = {
    user,
    loading,
    signUp,
    signIn,
    signOut,
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider')
  }
  return context
}

