import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { FAQAccordion } from "@/components/faq-accordion"
import { Button } from "@/components/ui/button"
import Link from "next/link"

const securityFAQs = [
  {
    question: "Qualquer usuário pode acessar o AquiTemFCTE?",
    answer:
      "Não, apenas usuários cadastrados e verificados da comunidade FCTE podem acessar a plataforma. É necessário fazer login com credenciais válidas.",
  },
  {
    question: "Como funciona o processo de autenticação para estudantes?",
    answer:
      "Os estudantes devem se cadastrar usando seu email institucional da FCTE. Após o cadastro, será enviado um email de verificação para confirmar a identidade.",
  },
  {
    question: "Como recuperar minha conta?",
    answer:
      "Você pode recuperar sua conta clicando em 'Esqueci minha senha' na página de login. Um link de recuperação será enviado para seu email cadastrado.",
  },
  {
    question: "Posso fazer parte mesmo do Campus Unik Dacy Ribeiro?",
    answer:
      "Sim! Todos os campus da FCTE podem participar do AquiTemFCTE. A plataforma foi criada para unir toda a comunidade acadêmica.",
  },
]

const platformFAQs = [
  {
    question: "Como acessar a plataforma de produtos e serviços?",
    answer:
      "Após fazer login, você terá acesso ao marketplace onde pode visualizar todos os produtos e serviços disponíveis. Use a barra de pesquisa para encontrar itens específicos.",
  },
  {
    question: "Como publico um novo produto na plataforma?",
    answer:
      "Acesse seu dashboard de usuário e clique em 'Publicar Produto'. Preencha as informações necessárias, adicione fotos e defina o preço. Seu anúncio será publicado após revisão.",
  },
  {
    question: "Como faço para cadastrar uma conversa?",
    answer:
      "Ao visualizar um produto de interesse, clique no botão 'Entrar em Contato'. Isso iniciará uma conversa direta com o vendedor através do sistema de mensagens da plataforma.",
  },
  {
    question: "Por onde devo me comunicar com o negociador?",
    answer:
      "Toda comunicação deve ser feita através do sistema de mensagens interno da plataforma. Isso garante segurança e rastreabilidade das negociações.",
  },
  {
    question: "Posso vender serviços no AquiTemFCTE?",
    answer:
      "Sim! Além de produtos físicos, você pode oferecer serviços como aulas particulares, trabalhos freelance, e outros serviços permitidos pela comunidade.",
  },
]

export default function FAQPage() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="bg-primary text-primary-foreground py-16 px-4">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h1 className="text-4xl md:text-5xl font-bold">FAQ</h1>
              <p className="text-xl text-primary-foreground/90">Dúvidas mais frequentes da nossa Comunidade.</p>
            </div>
            <div className="flex justify-center">
              <img src="/person-thinking-with-question-marks-illustration.jpg" alt="Pessoa pensando" className="w-full max-w-sm" />
            </div>
          </div>
        </div>
      </section>

      {/* Search Section */}
      <section className="bg-background py-8 px-4 border-b">
        <div className="container mx-auto max-w-2xl">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input type="search" placeholder="Pesquisar..." className="pl-10 bg-muted border-border" />
          </div>
        </div>
      </section>

      {/* FAQ Content */}
      <section className="py-12 px-4">
        <div className="container mx-auto max-w-4xl space-y-12">
          {/* Segurança Section */}
          <div>
            <h2 className="text-2xl font-bold mb-6">Perguntas Frequentes</h2>
            <h3 className="text-xl font-semibold mb-4">Segurança</h3>
            <FAQAccordion items={securityFAQs} />
          </div>

          {/* Plataforma Section */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Plataforma</h3>
            <FAQAccordion items={platformFAQs} />
          </div>

          {/* Additional Help */}
          <div className="bg-muted rounded-lg p-8 text-center space-y-4">
            <h3 className="text-xl font-semibold">Ainda tem dúvidas?</h3>
            <p className="text-muted-foreground">Entre em contato conosco e teremos prazer em ajudá-lo.</p>
            <Button asChild className="bg-primary hover:bg-primary/90">
              <Link href="/contato">Entrar em Contato</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
