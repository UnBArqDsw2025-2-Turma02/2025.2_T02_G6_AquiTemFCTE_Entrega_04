import { LoginForm } from "@/components/login-form"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function LoginPage() {
  return (
    <div className="min-h-[calc(100vh-80px)] flex items-center justify-center bg-gray-50 px-4 py-12">
      <div className="w-full max-w-5xl flex rounded-2xl overflow-hidden shadow-xl bg-white">
        {/* Left side - Login Form */}
        <div className="flex-1 p-12 flex flex-col justify-center">
          <div className="max-w-md mx-auto w-full space-y-8">
            <div className="text-center space-y-4">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-orange-100 rounded-full">
                <span className="text-3xl font-bold text-orange-500">@</span>
              </div>
              <h1 className="text-3xl font-bold text-gray-900">Acesse sua Conta</h1>
              <p className="text-sm text-gray-600">Use seu email institucional para fazer login.</p>
            </div>

            <LoginForm />
          </div>
        </div>

        {/* Right side - Signup Prompt */}
        <div className="flex-1 bg-[#00A651] p-12 flex flex-col justify-center items-center text-white">
          <div className="max-w-md text-center space-y-6">
            <h2 className="text-3xl font-bold">Não possui conta?</h2>
            <p className="text-lg">Inicie sua jornada! Clique para começar a utilizar a plataforma</p>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-[#00A651] transition-colors"
            >
              <Link href="/cadastrar">Fazer Cadastro</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
