import Link from "next/link"
import { Button } from "@/components/ui/button"
import { UserPlus, ShoppingCart, Repeat } from "lucide-react"

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="bg-gray-100 py-16 px-4">
        <div className="container mx-auto text-center space-y-6">
          <h1 className="text-4xl md:text-5xl font-bold">
            Compre e Venda entre <span className="text-[#00A650]">Estudantes da FCTE</span>
          </h1>
          <p className="text-lg text-gray-700 max-w-3xl mx-auto">
            A plataforma exclusiva para estudantes da Faculdade de Ceilândia (FCTE/UnB) comprarem, venderem e trocarem
            produtos usados de forma segura e prática.
          </p>
          <div className="flex flex-wrap gap-4 justify-center pt-4">
            <Button asChild size="lg" className="bg-[#00A650] hover:bg-[#00A650]/90 text-white font-semibold px-8">
              <Link href="/marketplace">Explorar Produtos</Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-2 border-[#003D7A] text-[#003D7A] hover:bg-[#003D7A] hover:text-white font-semibold px-8 bg-transparent"
            >
              <Link href="/dashboard/novo-produto">Anunciar Produto</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Como Funciona Section */}
      <section className="bg-white py-16 px-4">
        <div className="container mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-[#003D7A] mb-12">Como Funciona</h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {/* Step 1 */}
            <div className="bg-white border-2 border-gray-200 rounded-lg p-6 text-center space-y-4">
              <div className="w-12 h-12 bg-[#00A650] rounded-full flex items-center justify-center mx-auto">
                <UserPlus className="h-6 w-6 text-white" />
              </div>
              <h3 className="font-bold text-lg">1. Cadastre-se</h3>
              <p className="text-sm text-gray-600">
                Crie sua conta usando seu email institucional da UnB e faça parte da comunidade da FCTE.
              </p>
            </div>

            {/* Step 2 */}
            <div className="bg-white border-2 border-gray-200 rounded-lg p-6 text-center space-y-4">
              <div className="w-12 h-12 bg-[#00A650] rounded-full flex items-center justify-center mx-auto">
                <ShoppingCart className="h-6 w-6 text-white" />
              </div>
              <h3 className="font-bold text-lg">2. Anuncie ou Compre</h3>
              <p className="text-sm text-gray-600">
                Publique seus produtos para vender ou navegue pelos anúncios para encontrar o que você precisa.
              </p>
            </div>

            {/* Step 3 */}
            <div className="bg-white border-2 border-gray-200 rounded-lg p-6 text-center space-y-4">
              <div className="w-12 h-12 bg-[#00A650] rounded-full flex items-center justify-center mx-auto">
                <Repeat className="h-6 w-6 text-white" />
              </div>
              <h3 className="font-bold text-lg">3. Negocie ou Troque</h3>
              <p className="text-sm text-gray-600">
                Entre em contato direto com outros estudantes e finalize suas transações de forma rápida.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Por que usar Section */}
      <section className="bg-gray-50 py-16 px-4">
        <div className="container mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-[#003D7A] mb-12">
            Por que usar o AquiTemFCTE?
          </h2>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Benefit 1 */}
            <div className="space-y-3">
              <h3 className="font-bold text-xl text-[#003D7A]">Exclusivo para Estudantes</h3>
              <p className="text-gray-600">
                Apenas estudantes da FCTE/UnB podem participar da plataforma, garantindo segurança e confiança.
              </p>
            </div>

            {/* Benefit 2 */}
            <div className="space-y-3">
              <h3 className="font-bold text-xl text-[#003D7A]">Economia Sustentável</h3>
              <p className="text-gray-600">
                Reutilize produtos e economize dinheiro enquanto contribui para um consumo mais consciente.
              </p>
            </div>

            {/* Benefit 3 */}
            <div className="space-y-3">
              <h3 className="font-bold text-xl text-[#003D7A]">Fácil de Usar</h3>
              <p className="text-gray-600">
                Interface simples e intuitiva, desenvolvida pensando na praticidade do dia a dia do estudante.
              </p>
            </div>

            {/* Benefit 4 */}
            <div className="space-y-3">
              <h3 className="font-bold text-xl text-[#003D7A]">Comunidade Local</h3>
              <p className="text-gray-600">
                Conecte-se com colegas do seu próprio campus e facilite encontros presenciais.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
