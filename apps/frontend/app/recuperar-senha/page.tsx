"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ShoppingCart, ArrowLeft, CheckCircle2 } from "lucide-react"

export default function RecoverPasswordPage() {
  const [email, setEmail] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate password recovery
    setTimeout(() => {
      setSuccess(true)
      setIsLoading(false)
    }, 1000)
  }

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center space-y-2">
          <Link href="/" className="inline-flex items-center gap-2 text-primary">
            <ShoppingCart className="h-10 w-10" />
            <div className="flex flex-col items-start">
              <span className="font-bold text-2xl leading-none">AquiTem</span>
              <span className="text-sm leading-none">FCTE</span>
            </div>
          </Link>
          <h1 className="text-3xl font-bold mt-6">Recuperar Senha</h1>
          <p className="text-muted-foreground">Digite seu email para receber instruções</p>
        </div>

        <div className="bg-card border border-border rounded-lg p-8 shadow-sm">
          {success ? (
            <div className="space-y-6 text-center">
              <div className="flex justify-center">
                <div className="bg-secondary/10 p-4 rounded-full">
                  <CheckCircle2 className="h-12 w-12 text-secondary" />
                </div>
              </div>
              <div className="space-y-2">
                <h2 className="text-xl font-semibold">Email Enviado!</h2>
                <p className="text-muted-foreground text-sm">
                  Enviamos instruções para recuperação de senha para o email <strong>{email}</strong>. Verifique sua
                  caixa de entrada e spam.
                </p>
              </div>
              <Button asChild className="w-full bg-primary hover:bg-primary/90">
                <Link href="/entrar">Voltar para Login</Link>
              </Button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="email">Email Institucional</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="seu.email@aluno.ufrb.edu.br"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="bg-background"
                />
              </div>

              <Button type="submit" className="w-full bg-primary hover:bg-primary/90" disabled={isLoading}>
                {isLoading ? "Enviando..." : "Enviar Instruções"}
              </Button>

              <Button asChild variant="ghost" className="w-full">
                <Link href="/entrar">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Voltar para Login
                </Link>
              </Button>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}
