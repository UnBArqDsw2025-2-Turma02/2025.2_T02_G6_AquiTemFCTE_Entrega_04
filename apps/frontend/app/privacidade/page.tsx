export default function PrivacidadePage() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <h1 className="text-4xl font-bold text-primary mb-8">Política de Privacidade</h1>
      
      <div className="space-y-6 text-gray-700">
        <section>
          <h2 className="text-2xl font-semibold text-primary mb-4">1. Informações que Coletamos</h2>
          <p>
            A AquiTemFCTE coleta informações fornecidas por você ao criar uma conta, incluindo nome, 
            e-mail, matrícula UnB e informações de contato. Também coletamos dados sobre os produtos 
            que você anuncia e suas interações na plataforma.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-primary mb-4">2. Como Usamos suas Informações</h2>
          <p>
            Utilizamos suas informações para:
          </p>
          <ul className="list-disc list-inside ml-4 space-y-2 mt-2">
            <li>Facilitar transações entre membros da comunidade FCTE</li>
            <li>Melhorar a experiência do usuário na plataforma</li>
            <li>Enviar notificações sobre suas transações e mensagens</li>
            <li>Garantir a segurança e prevenir fraudes</li>
            <li>Cumprir obrigações legais</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-primary mb-4">3. Compartilhamento de Informações</h2>
          <p>
            Não vendemos suas informações pessoais. Compartilhamos dados apenas quando necessário para:
          </p>
          <ul className="list-disc list-inside ml-4 space-y-2 mt-2">
            <li>Conectar compradores e vendedores na plataforma</li>
            <li>Cumprir requisitos legais</li>
            <li>Proteger os direitos e segurança da plataforma e seus usuários</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-primary mb-4">4. Segurança dos Dados</h2>
          <p>
            Implementamos medidas de segurança para proteger suas informações contra acesso não autorizado, 
            alteração, divulgação ou destruição. Seus dados são armazenados de forma segura e criptografada.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-primary mb-4">5. Seus Direitos</h2>
          <p>
            Você tem o direito de:
          </p>
          <ul className="list-disc list-inside ml-4 space-y-2 mt-2">
            <li>Acessar suas informações pessoais</li>
            <li>Corrigir dados incorretos</li>
            <li>Solicitar a exclusão de sua conta e dados</li>
            <li>Optar por não receber comunicações de marketing</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-primary mb-4">6. Cookies</h2>
          <p>
            Utilizamos cookies para melhorar sua experiência de navegação, manter você conectado e 
            personalizar o conteúdo. Você pode desativar cookies nas configurações do seu navegador.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-primary mb-4">7. Alterações nesta Política</h2>
          <p>
            Podemos atualizar esta política periodicamente. Notificaremos sobre mudanças significativas 
            através da plataforma ou por e-mail.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-primary mb-4">8. Contato</h2>
          <p>
            Para questões sobre esta política de privacidade, entre em contato conosco através da 
            plataforma ou envie um e-mail para: privacidade@aquitemfcte.unb.br
          </p>
        </section>

        <div className="mt-12 pt-8 border-t border-gray-300">
          <p className="text-sm text-gray-600">
            Última atualização: 17 de novembro de 2025
          </p>
        </div>
      </div>
    </div>
  )
}
