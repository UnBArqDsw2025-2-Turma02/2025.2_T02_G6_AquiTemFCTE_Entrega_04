import { RegisterForm } from "@/components/register-form"

export default function RegisterPage() {
  return (
    <div className="min-h-[calc(100vh-4rem)] bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-5xl mx-auto">
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-2">Cadastre-se</h1>
            <p className="text-muted-foreground">
              Campos obrigatórios são marcados com um asterisco <span className="text-red-500">*</span>
            </p>
          </div>

          <RegisterForm />
        </div>
      </div>
    </div>
  )
}
