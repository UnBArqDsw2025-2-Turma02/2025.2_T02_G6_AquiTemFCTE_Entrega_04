import { Heart, Users, Award } from "lucide-react"

export default function AboutPage() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="bg-primary text-primary-foreground py-16 px-4">
        <div className="container mx-auto text-center space-y-6">
          <h1 className="text-4xl md:text-5xl font-bold">Sobre o AquiTemFCTE</h1>
          <p className="text-xl text-primary-foreground/90 max-w-3xl mx-auto">
            Uma plataforma criada por estudantes, para estudantes da comunidade FCTE.
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section id="missao" className="py-16 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <img
                src="/team-collaboration-illustration.jpg"
                alt="Colaboração em equipe"
                className="w-full rounded-lg shadow-lg"
              />
            </div>
            <div className="space-y-6">
              <h2 className="text-3xl font-bold">Nossa Missão</h2>
              <p className="text-muted-foreground leading-relaxed">
                O AquiTemFCTE nasceu da necessidade de criar um espaço seguro e confiável para que estudantes e membros
                da comunidade FCTE possam comprar e vender produtos e serviços de forma prática e transparente.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Acreditamos no poder da comunidade e na importância de facilitar as conexões entre pessoas que
                compartilham o mesmo ambiente acadêmico.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="bg-muted py-16 px-4">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Nossos Valores</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-card p-6 rounded-lg text-center space-y-4">
              <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto">
                <Shield className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold">Segurança</h3>
              <p className="text-muted-foreground text-sm">
                Priorizamos a segurança de todos os usuários com verificação de identidade e transações protegidas.
              </p>
            </div>

            <div className="bg-card p-6 rounded-lg text-center space-y-4">
              <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto">
                <Users className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold">Comunidade</h3>
              <p className="text-muted-foreground text-sm">
                Fortalecemos os laços entre estudantes e membros da FCTE através de uma plataforma colaborativa.
              </p>
            </div>

            <div className="bg-card p-6 rounded-lg text-center space-y-4">
              <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto">
                <Heart className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold">Transparência</h3>
              <p className="text-muted-foreground text-sm">
                Mantemos processos claros e comunicação aberta para garantir confiança em todas as transações.
              </p>
            </div>

            <div className="bg-card p-6 rounded-lg text-center space-y-4">
              <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto">
                <Award className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold">Qualidade</h3>
              <p className="text-muted-foreground text-sm">
                Buscamos constantemente melhorar a experiência dos usuários com uma plataforma moderna e eficiente.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-4xl text-center space-y-8">
          <h2 className="text-3xl font-bold">Quem Somos</h2>
          <p className="text-muted-foreground leading-relaxed max-w-2xl mx-auto">
            Somos um grupo de estudantes da UFRB (Universidade Federal do Recôncavo da Bahia) comprometidos em criar
            soluções tecnológicas que beneficiem nossa comunidade acadêmica. O AquiTemFCTE é resultado do nosso trabalho
            colaborativo e dedicação em facilitar a vida dos estudantes.
          </p>
          <div className="bg-primary/5 border border-primary/20 rounded-lg p-8">
            <p className="text-lg font-semibold text-primary mb-2">Desenvolvido por estudantes da UFRB</p>
            <p className="text-muted-foreground">Faculdade de Ciências e Tecnologias (FCTE) - Campus Cruz das Almas</p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="bg-primary text-primary-foreground py-16 px-4">
        <div className="container mx-auto text-center space-y-6">
          <h2 className="text-3xl font-bold">Entre em Contato</h2>
          <p className="text-primary-foreground/90 max-w-2xl mx-auto">
            Tem alguma dúvida ou sugestão? Estamos sempre abertos a ouvir a comunidade.
          </p>
          <div className="space-y-2">
            <p className="font-semibold">DIATINF - Diretório Acadêmico de Tecnologia da Informação</p>
            <p className="text-primary-foreground/80">Email: contato@aquitemfcte.com.br</p>
          </div>
        </div>
      </section>
    </div>
  )
}

function Shield({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z" />
    </svg>
  )
}
