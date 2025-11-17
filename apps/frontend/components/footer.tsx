import Link from "next/link"
import Image from "next/image"
import { Facebook, Instagram } from "lucide-react"

export function Footer() {
  return (
    <>
      {/* Linha verde */}
      <div className="w-full h-5 bg-[#00822E]" />
      
      <footer className="bg-[#003D7A] text-white">
        <div className="flex flex-col md:flex-row">
          {/* Logo Section */}
          <div className="hidden md:flex bg-white items-center justify-center p-10">
            <Image
              src="/images/AquiTemFCTELogoExtends.svg"
              alt="AquiTemFCTE Logo"
              width={250}
              height={150}
              className="h-auto w-[250px]"
            />
          </div>

          {/* Content Section */}
          <div className="flex-1 flex flex-col justify-between p-5 mx-6">
            {/* Links Container */}
            <div className="flex flex-wrap justify-between gap-8 mb-8">
              {/* Links Rápidos */}
              <div className="flex flex-col items-start">
                <h3 className="font-bold mb-3 text-left">Links Rápidos</h3>
                <Link href="/" className="text-sm mt-2 text-left hover:underline">
                  Início
                </Link>
                <Link href="/entrar" className="text-sm mt-2 text-left hover:underline">
                  Login/Cadastro
                </Link>
                <Link href="/faq" className="text-sm mt-2 text-left hover:underline">
                  FAQ
                </Link>
              </div>

              {/* Sobre Nós */}
              <div className="flex flex-col items-start">
                <h3 className="font-bold mb-3 text-left">Sobre Nós</h3>
                <Link href="/sobre" className="text-sm mt-2 text-left hover:underline">
                  Projeto AquiTemFCTE
                </Link>
                <Link href="/sobre" className="text-sm mt-2 text-left hover:underline">
                  Universidade de Brasília
                </Link>
                <Link href="/sobre" className="text-sm mt-2 text-left hover:underline">
                  Campus UnB/FCTE
                </Link>
              </div>

              {/* Privacidade */}
              <div className="flex flex-col items-start">
                <h3 className="font-bold mb-3 text-left">Privacidade</h3>
                <Link href="/privacidade" className="text-sm mt-2 text-left hover:underline">
                  Política de Privacidade
                </Link>
              </div>

              {/* Contatos */}
              <div className="flex flex-col items-start">
                <h3 className="font-bold mb-3 text-left">Contatos</h3>
                <div className="flex gap-4 mt-2">
                  <Link
                    href="https://instagram.com"
                    target="_blank"
                    className="text-white hover:opacity-80 transition-opacity"
                    aria-label="Instagram"
                  >
                    <Instagram className="h-5 w-5" />
                  </Link>
                  <Link
                    href="https://facebook.com"
                    target="_blank"
                    className="text-white hover:opacity-80 transition-opacity"
                    aria-label="Facebook"
                  >
                    <Facebook className="h-5 w-5" />
                  </Link>
                </div>
              </div>
            </div>

            {/* Copyright */}
            <div className="font-semibold text-sm text-center md:text-left">
              Criado por estudantes da UnB | © Todos os direitos reservados, 2025.
            </div>
          </div>

          {/* Logo mobile */}
          <div className="md:hidden flex bg-white items-center justify-center p-10">
            <Image
              src="/images/AquiTemFCTELogoExtends.svg"
              alt="AquiTemFCTE Logo"
              width={200}
              height={120}
              className="h-auto w-[200px]"
            />
          </div>
        </div>
      </footer>
    </>
  )
}
