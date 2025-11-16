"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertCircle, User, Mail, Award as IdCard, Lock, Upload } from "lucide-react"
import { useAuth } from "@/hooks/use-auth"

export function RegisterForm() {
  const { signUp, loading } = useAuth()
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    matricula: "",
    password: "",
    confirmPassword: "",
  })
  const [profilePhoto, setProfilePhoto] = useState<File | null>(null)
  const [enrollmentProof, setEnrollmentProof] = useState<File | null>(null)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setSuccess("")

    // Validações
    if (formData.password !== formData.confirmPassword) {
      setError("As senhas não coincidem.")
      return
    }

    if (formData.password.length < 6) {
      setError("A senha deve ter pelo menos 6 caracteres.")
      return
    }

    if (!formData.email.includes('@')) {
      setError("Por favor, insira um email válido.")
      return
    }

    try {
      const userData = {
        name: formData.name,
        matricula: formData.matricula,
        campus: 'fcte',
        course: 'Não informado'
      }

      // Criar FormData para incluir arquivos
      const registrationData = {
        ...userData,
        email: formData.email,
        password: formData.password,
        profile_photo: profilePhoto // Incluir foto de perfil se selecionada
      }

      const { data, error } = await signUp(formData.email, formData.password, registrationData)

      if (error) {
        // Normalizar erro - pode ser string ou objeto (erros do DRF)
        if (typeof error === 'object') {
          const keys = Object.keys(error as any)
          if (keys.length > 0) {
            const firstKey = keys[0]
            const value: any = (error as any)[firstKey]
            const msg = Array.isArray(value) ? value[0] : (value?.message || String(value))
            setError(msg || 'Dados inválidos')
            return
          }
        }

        const errorMessage = typeof error === 'string' ? error : (error as any)?.message || 'Erro desconhecido'
        if (errorMessage.includes('already registered') || errorMessage.includes('já está cadastrado')) {
          setError("Este email já está cadastrado. Tente fazer login.")
        } else if (errorMessage.includes('invalid email') || errorMessage.includes('email inválido')) {
          setError("Email inválido. Verifique se digitou corretamente.")
        } else if (errorMessage.includes('weak password') || errorMessage.includes('senha muito fraca')) {
          setError("Senha muito fraca. Use pelo menos 6 caracteres.")
        } else {
          setError(errorMessage || "Erro ao criar conta.")
        }
        return
      }

      // Sucesso
      if (data?.success || data?.user) {
        let successMsg = "Conta criada com sucesso!"
        
        // Verificar se avatar foi carregado
        if (data?.avatar_uploaded) {
          if (data.avatar_uploaded.success) {
            successMsg += " Foto de perfil carregada com sucesso!"
          } else {
            console.warn('Erro no upload do avatar:', data.avatar_uploaded.error)
            // Não falhar o cadastro por erro no avatar
          }
        }
        
        successMsg += " Redirecionando..."
        setSuccess(successMsg)
        
        // Limpar formulário
        setFormData({
          name: "",
          email: "",
          matricula: "",
          password: "",
          confirmPassword: "",
        })
        setProfilePhoto(null)
        setEnrollmentProof(null)

        // Redirecionar imediatamente para dashboard se logado
        setTimeout(() => {
          window.location.href = "/dashboard"
        }, 1500)
      } else {
        setError("Erro inesperado no cadastro. Tente novamente.")
      }

    } catch (error: any) {
      console.error('Erro no cadastro:', error)
      setError("Ocorreu um erro inesperado. Tente novamente.")
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, type: "profile" | "enrollment") => {
    const file = e.target.files?.[0]
    if (file) {
      if (type === "profile") {
        setProfilePhoto(file)
      } else {
        setEnrollmentProof(file)
      }
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {success && (
        <Alert className="border-green-200 bg-green-50 text-green-800">
          <AlertCircle className="h-4 w-4 text-green-600" />
          <AlertDescription>{success}</AlertDescription>
        </Alert>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Left column - Form fields */}
        <div className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="name" className="text-base">
              Nome e Sobrenome <span className="text-red-500">*</span>
            </Label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                id="name"
                type="text"
                placeholder="Nome e Sobrenome"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
                className="pl-10 bg-gray-100 border-gray-200"
                disabled={loading}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="register-email" className="text-base">
              Email Institucional da UnB <span className="text-red-500">*</span>
            </Label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                id="register-email"
                type="email"
                placeholder="seu.email@aluno.unb.br"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
                className="pl-10 bg-gray-100 border-gray-200"
                disabled={loading}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="matricula" className="text-base">
              Matrícula da UnB <span className="text-red-500">*</span>
            </Label>
            <div className="relative">
              <IdCard className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                id="matricula"
                type="text"
                placeholder="Matrícula"
                value={formData.matricula}
                onChange={(e) => setFormData({ ...formData, matricula: e.target.value })}
                required
                className="pl-10 bg-gray-100 border-gray-200"
                disabled={loading}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="register-password" className="text-base">
              Nova Senha <span className="text-red-500">*</span>
            </Label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                id="register-password"
                type="password"
                placeholder="Mínimo 6 caracteres"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                required
                className="pl-10 bg-gray-100 border-gray-200"
                disabled={loading}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="confirm-password" className="text-base">
              Repetir Senha <span className="text-red-500">*</span>
            </Label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                id="confirm-password"
                type="password"
                placeholder="Confirme a senha"
                value={formData.confirmPassword}
                onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                required
                className="pl-10 bg-gray-100 border-gray-200"
                disabled={loading}
              />
            </div>
          </div>
        </div>

        {/* Right column - File uploads */}
        <div className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="profile-photo" className="text-base">
              Foto de Perfil (Opcional)
            </Label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center bg-gray-50">
              <input
                id="profile-photo"
                type="file"
                accept="image/*"
                onChange={(e) => handleFileChange(e, "profile")}
                className="hidden"
                disabled={loading}
              />
              <label htmlFor="profile-photo" className="cursor-pointer flex flex-col items-center">
                <Upload className="h-10 w-10 text-gray-400 mb-2" />
                <p className="text-sm text-muted-foreground mb-2">
                  {profilePhoto ? profilePhoto.name : "Opcional - Adicione uma foto de perfil"}
                </p>
                <Button type="button" size="sm" variant="outline" className="text-[#003D7A] border-[#003D7A]" disabled={loading}>
                  {profilePhoto ? "Trocar Foto" : "Escolher Foto"}
                </Button>
              </label>
            </div>
            {profilePhoto && (
              <div className="mt-2 flex items-center justify-between bg-green-50 p-2 rounded">
                <span className="text-sm text-green-700">✓ Foto selecionada</span>
                <button 
                  type="button" 
                  onClick={() => setProfilePhoto(null)} 
                  className="text-red-600 hover:text-red-800 text-sm"
                  disabled={loading}
                >
                  Remover
                </button>
              </div>
            )}
          </div>

          <div className="space-y-4 p-6 bg-blue-50 rounded-lg border border-blue-200">
            <h3 className="text-lg font-semibold text-blue-900">📋 Informações Importantes</h3>
            <ul className="text-sm text-blue-800 space-y-2">
              <li>• Use seu email institucional da UnB (@aluno.unb.br)</li>
              <li>• Sua matrícula será verificada pelo sistema</li>
              <li>• A foto de perfil é totalmente opcional</li>
              <li>• Você pode adicionar/alterar a foto depois</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Submit button */}
      <div className="flex justify-start">
        <Button 
          type="submit" 
          className="bg-[#00A651] hover:bg-[#00A651]/90 text-white px-8" 
          disabled={loading}
        >
          {loading ? "Criando conta..." : "Finalizar Cadastro"}
        </Button>
      </div>
    </form>
  )
}