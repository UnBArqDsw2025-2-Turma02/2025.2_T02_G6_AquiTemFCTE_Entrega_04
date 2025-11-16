"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertCircle, Mail, Lock } from "lucide-react"
import { useAuth } from "@/hooks/use-auth"

export function LoginForm() {
  const { signIn, loading } = useAuth()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (!email || !password) {
      setError("Por favor, preencha todos os campos.")
      return
    }

    try {
      const { data, error } = await signIn(email, password)

      if (error) {
        // Normalizar erro - pode ser string ou objeto
        const errorMessage = typeof error === 'string' ? error : (error?.message || error?.toString() || 'Erro desconhecido')
        
        if (errorMessage.includes('Invalid login credentials') || errorMessage.includes('incorretos') || errorMessage.includes('inválidas')) {
          setError("Email ou senha incorretos.")
        } else if (errorMessage.includes('Email not confirmed') || errorMessage.includes('confirme seu email')) {
          setError("Por favor, confirme seu email antes de fazer login.")
        } else {
          setError(errorMessage || "Erro ao fazer login.")
        }
        return
      }

      // Sucesso - redirecionar
      if (data?.user || data?.success) {
        // Aguardar um pouco para o estado ser atualizado
        setTimeout(() => {
          window.location.href = "/dashboard"
        }, 100)
      }

    } catch (error: any) {
      console.error('Erro no login:', error)
      setError("Ocorreu um erro inesperado. Tente novamente.")
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <div className="space-y-2">
        <Label htmlFor="email" className="text-sm font-medium text-gray-700">
          Email Institucional
        </Label>
        <div className="relative">
          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
          <Input
            id="email"
            type="email"
            placeholder="seu.email@aluno.unb.br"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="pl-10 bg-gray-100 border-gray-200 focus:bg-white"
            disabled={loading}
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="password" className="text-sm font-medium text-gray-700">
          Senha
        </Label>
        <div className="relative">
          <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
          <Input
            id="password"
            type="password"
            placeholder="Digite sua senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="pl-10 bg-gray-100 border-gray-200 focus:bg-white"
            disabled={loading}
          />
        </div>
      </div>

      <Button
        type="submit"
        className="w-full bg-[#00A651] hover:bg-[#008f47] text-white font-semibold py-6 rounded-lg"
        disabled={loading}
      >
        {loading ? "Entrando..." : "Entrar"}
      </Button>
      
      <div className="text-center">
        <a 
          href="/recuperar-senha" 
          className="text-sm text-[#003D7A] hover:underline"
        >
          Esqueceu sua senha?
        </a>
      </div>
    </form>
  )
}