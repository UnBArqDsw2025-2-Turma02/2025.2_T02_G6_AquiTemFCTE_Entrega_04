'use client'

import { useState, useEffect, useContext, createContext, ReactNode } from 'react'

interface DjangoUser {
  id: number
  username: string
  email: string
  name: string
  first_name?: string
  last_name?: string
  profile?: {
    campus?: string
    bio?: string
    avatar_url?: string
  }
}

interface AuthContextType {
  user: DjangoUser | null
  profile: DjangoUser['profile'] | null
  loading: boolean
  isLoggedIn: boolean
  signUp: (email: string, password: string, userData?: any) => Promise<any>
  signIn: (email: string, password: string) => Promise<any>
  signOut: () => Promise<void>
  logout: () => void
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
      
      // Verificar se há arquivo para upload
      const hasProfilePhoto = userData?.profile_photo instanceof File
      
      let requestBody: FormData | string
      let headers: HeadersInit
      
      if (hasProfilePhoto) {
        // Usar FormData se há arquivo
        const formData = new FormData()
        formData.append('username', username)
        formData.append('email', email)
        formData.append('password', password)
        formData.append('first_name', userData?.name?.split(' ')[0] || '')
        formData.append('last_name', userData?.name?.split(' ').slice(1).join(' ') || '')
        formData.append('campus', userData?.campus || 'gama')
        formData.append('profile_photo', userData.profile_photo)
        
        requestBody = formData
        headers = {} // Não definir Content-Type para FormData (o browser define automaticamente)
      } else {
        // Usar JSON se não há arquivo
        requestBody = JSON.stringify({
          username,
          email,
          password,
          first_name: userData?.name?.split(' ')[0] || '',
          last_name: userData?.name?.split(' ').slice(1).join(' ') || '',
          campus: userData?.campus || 'gama',
        })
        headers = {
          'Content-Type': 'application/json',
        }
      }
      
      const response = await fetch(`${DJANGO_API_BASE}/auth/register/`, {
        method: 'POST',
        headers,
        body: requestBody,
      })
      
      const data = await response.json()
      
      if (!response.ok) {
        return { 
          data: null, 
          error: data.message || data.errors || 'Erro ao cadastrar usuário'
        }
      }
      
      if (data.success) {
        // Login automático após cadastro
        const loginResult = await signIn(email, password)
        
        // Incluir informação sobre upload do avatar no resultado
        if (data.avatar_uploaded) {
          return {
            ...loginResult,
            data: {
              ...loginResult.data,
              avatar_uploaded: data.avatar_uploaded
            }
          }
        }
        
        return loginResult
      }
      
      return { data, error: null }
    } catch (error: any) {
      return { 
        data: null, 
        error: error.message || 'Erro de conexão ao cadastrar usuário'
      }
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
        return {
          data: null,
          error: data.message || data.errors || 'Erro ao fazer login'
        }
      }
      
      if (data.success && data.user) {
        setUser(data.user)
        localStorage.setItem('django_user', JSON.stringify(data.user))
        return { data, error: null }
      }
      
      return {
        data: null,
        error: data.message || 'Credenciais inválidas'
      }
    } catch (error: any) {
      return { 
        data: null, 
        error: error.message || 'Erro de conexão ao fazer login'
      }
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

  const logout = () => {
    setUser(null)
    localStorage.removeItem('django_user')
  }

  const value: AuthContextType = {
    user,
    profile: user?.profile || null,
    loading,
    isLoggedIn: !!user,
    signUp,
    signIn,
    signOut,
    logout,
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