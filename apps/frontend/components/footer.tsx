import Link from "next/link"
import Image from "next/image"
import { Facebook, Instagram } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-[#003D7A] text-white border-t mt-auto">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and Brand */}
          <div className="flex flex-col gap-4">
            <Link href="/" className="flex flex-col items-start gap-2">
              <Image
                src="/logo-full-aquitemfcte.png"
                alt="AquiTemFCTE Logo"
                width={200}
                height={120}
                className="h-auto w-48"
              />
            </Link>
            <p className="text-xs text-gray-300">Compre, Venda, Troque - Exclusivo UnB/FCTE</p>
          </div>

          {/* Links Rápidos */}
          <div>
            <h3 className="font-semibold mb-4">Links Rápidos</h3>
            <ul className="space-y-2 text-sm text-gray-300">
              <li>
                <Link href="/" className="hover:text-white transition-colors">
                  Início
                </Link>
              </li>
              <li>
                <Link href="/entrar" className="hover:text-white transition-colors">
                  Login / Cadastro
                </Link>
              </li>
              <li>
                <Link href="/sobre" className="hover:text-white transition-colors">
                  Sobre
                </Link>
              </li>
              <li>
                <Link href="/faq" className="hover:text-white transition-colors">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          {/* Sobre Nós */}
          <div>
            <h3 className="font-semibold mb-4">Sobre Nós</h3>
            <ul className="space-y-2 text-sm text-gray-300">
              <li>
                <Link href="/sobre" className="hover:text-white transition-colors">
                  Entrar em contato conosco
                </Link>
              </li>
              <li>
                <Link href="/sobre" className="hover:text-white transition-colors">
                  Universidade de Brasília
                </Link>
              </li>
              <li>
                <Link href="/sobre" className="hover:text-white transition-colors">
                  Campus UnB/FCTE
                </Link>
              </li>
            </ul>
          </div>

          {/* Privacidade e Contatos */}
          <div>
            <h3 className="font-semibold mb-4">Privacidade</h3>
            <ul className="space-y-2 text-sm text-gray-300 mb-4">
              <li>
                <Link href="/privacidade" className="hover:text-white transition-colors">
                  Política de Privacidade
                </Link>
              </li>
            </ul>

            <h3 className="font-semibold mb-4">Contatos</h3>
            <div className="flex gap-3">
              <Link
                href="https://instagram.com"
                target="_blank"
                className="bg-white text-[#003D7A] p-2 rounded-full hover:opacity-80 transition-opacity"
                aria-label="Instagram"
              >
                <Instagram className="h-5 w-5" />
              </Link>
              <Link
                href="https://facebook.com"
                target="_blank"
                className="bg-white text-[#003D7A] p-2 rounded-full hover:opacity-80 transition-opacity"
                aria-label="Facebook"
              >
                <Facebook className="h-5 w-5" />
              </Link>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-600 mt-8 pt-8 text-center text-sm text-gray-300">
          <p>Criado por estudantes da UnB | Todos os direitos reservados. 2025.</p>
        </div>
      </div>
    </footer>
  )
}
