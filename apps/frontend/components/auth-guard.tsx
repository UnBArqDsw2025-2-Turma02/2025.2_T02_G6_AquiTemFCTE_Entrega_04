"use client"

import { useEffect, ReactNode } from 'react'
import { useAuth } from '@/hooks/use-auth'
import { useRouter } from 'next/navigation'

interface AuthGuardProps {
  children: ReactNode
  fallback?: ReactNode
}

export function AuthGuard({ children, fallback }: AuthGuardProps) {
  const { user, loading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!loading && !user) {
      router.replace('/entrar')
    }
  }, [user, loading, router])

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <p>Carregando...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    return fallback || (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Acesso Restrito</h1>
          <p className="text-muted-foreground mb-4">Redirecionando para login...</p>
        </div>
      </div>
    )
  }

  return <>{children}</>
}