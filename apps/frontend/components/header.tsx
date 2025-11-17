"use client"

import Link from "next/link"
import Image from "next/image"
import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { MessageCircle, User, Search, Star, Moon, Menu } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { useAuth } from "@/hooks/use-auth"

export function Header() {
  const { user, isLoggedIn, logout } = useAuth()
  const unreadMessages = 3

  // Debug
  console.log('Header: user =', user)
  console.log('Header: isLoggedIn =', isLoggedIn)

  const handleLogout = () => {
    logout()
    window.location.href = "/"
  }

  return (
    <header className="w-full fixed top-0 z-50">
      {/* Top banner (mensagens rotativas) */}
      <div className="hidden md:flex bg-white text-primary border-b px-6 py-1">
        <RotatingMessage />
      </div>

      <nav className="flex items-center justify-between bg-[#003D7A] text-white px-6 py-2 border-b-2 border-[#00822E]">
        <Link href="/" className="flex items-center">
          <Image 
            src="/images/AquiTemFCTELogo.svg" 
            alt="AquiTemFCTE Logo" 
            width={120} 
            height={40} 
            className="h-10 w-auto"
          />
        </Link>

        {/* Navigation Links */}
        <div className="hidden lg:flex items-center gap-6">
          <Link href="/marketplace?categoria=eletronicos" className="text-sm font-normal hover:underline transition-colors">
            Eletrônicos
          </Link>
          <Link href="/marketplace?categoria=livros" className="text-sm font-normal hover:underline transition-colors">
            Livros
          </Link>
          <Link href="/marketplace?categoria=roupas" className="text-sm font-normal hover:underline transition-colors">
            Roupas
          </Link>
          <Link href="/marketplace?categoria=outros" className="text-sm font-normal hover:underline transition-colors">
            Outros
          </Link>
        </div>

        {/* Auth/User Actions */}
        <div className="flex items-center gap-4">
          {isLoggedIn ? (
            <>
              <div className="hidden lg:flex items-center gap-4">
                <Search className="h-5 w-5 cursor-pointer hover:opacity-80" />
                <Link href="/mensagens" className="relative">
                  <MessageCircle className="h-5 w-5 cursor-pointer hover:opacity-80" />
                  {unreadMessages > 0 && (
                    <Badge className="absolute -top-1 -right-1 h-4 w-4 rounded-full p-0 flex items-center justify-center bg-[#00822E] text-[#003D7A] text-xs">
                      {unreadMessages}
                    </Badge>
                  )}
                </Link>
                <Star className="h-5 w-5 cursor-pointer hover:opacity-80" />
                <Link href="/dashboard">
                  <User className="h-5 w-5 cursor-pointer hover:opacity-80" />
                </Link>
                <Link href="/dashboard/novo-produto">
                  <Button className="bg-[#00822E] hover:bg-[#00822E]/90 text-[#003D7A] font-semibold rounded-md px-4 py-2">
                    Quero Anunciar!
                  </Button>
                </Link>
              </div>
              <div className="lg:hidden">
                <Menu className="h-6 w-6 cursor-pointer" />
              </div>
            </>
          ) : (
            <>
              <div className="hidden lg:flex items-center gap-2">
                <Search className="h-5 w-5 cursor-pointer hover:opacity-80" />
                <MessageCircle className="h-5 w-5 cursor-pointer hover:opacity-80" />
                <Star className="h-5 w-5 cursor-pointer hover:opacity-80" />
                <User className="h-5 w-5 cursor-pointer hover:opacity-80" />
                <Button asChild className="bg-[#00822E] hover:bg-[#00822E]/90 text-[#003D7A] font-semibold rounded-md px-4 py-2">
                  <Link href="/entrar">Entrar</Link>
                </Button>
                <Button asChild className="bg-[#00822E] hover:bg-[#00822E]/90 text-[#003D7A] font-semibold rounded-md px-4 py-2">
                  <Link href="/cadastrar">Criar Conta</Link>
                </Button>
              </div>
              <div className="lg:hidden">
                <Menu className="h-6 w-6 cursor-pointer" />
              </div>
            </>
          )}
        </div>
      </nav>
    </header>
  )
}

function RotatingMessage() {
  const messages = [
    'O primeiro site de venda e troca da FCTE para a FCTE!',
    'Procurando algo no precinho? AquiTem!',
    'Venda o que você não usa mais na AquiTemFCTE!',
    'Compre e troque com segurança na comunidade FCTE!',
    'Encontre ofertas imperdíveis!',
  ]
  const [idx, setIdx] = useState(0)
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const it = setInterval(() => {
      setVisible(false)
      setTimeout(() => {
        setIdx((i) => (i + 1) % messages.length)
        setVisible(true)
      }, 300)
    }, 10000)
    return () => clearInterval(it)
  }, [])

  return (
    <div className="flex items-center justify-between w-full text-sm">
      <div />
      <span className="transition-opacity duration-300" style={{ opacity: visible ? 1 : 0 }}>
        {messages[idx]}
      </span>
      <div className="flex items-center gap-4">
        <User className="h-4 w-4 cursor-pointer text-[#003D7A]" />
        <Moon className="h-4 w-4 cursor-pointer text-[#003D7A]" />
      </div>
    </div>
  )
}
