"use client"

import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { MessageCircle, User } from "lucide-react"
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
    <header className="bg-primary text-primary-foreground sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2">
            <Image src="/logo-aquitemfcte.png" alt="AquiTemFCTE Logo" width={48} height={48} className="h-10 w-auto" />
            <div className="flex flex-col">
              <span className="font-bold text-lg leading-none">AquiTem</span>
              <span className="text-xs leading-none">FCTE</span>
            </div>
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <Link href="/" className="text-sm font-medium hover:text-primary-foreground/80 transition-colors">
              Início
            </Link>
            <Link href="/marketplace" className="text-sm font-medium hover:text-primary-foreground/80 transition-colors">
              Marketplace
            </Link>
            <Link href="/sobre" className="text-sm font-medium hover:text-primary-foreground/80 transition-colors">
              Sobre
            </Link>
            <Link href="/faq" className="text-sm font-medium hover:text-primary-foreground/80 transition-colors">
              FAQ
            </Link>
          </nav>

          {/* Auth/User Actions */}
          <div className="flex items-center gap-4">
            {isLoggedIn ? (
              <>
                <Link href="/mensagens" className="relative hidden md:block">
                  <Button variant="ghost" size="sm" className="text-primary-foreground hover:text-primary-foreground/80">
                    <MessageCircle className="h-5 w-5" />
                    {unreadMessages > 0 && (
                      <Badge className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 flex items-center justify-center bg-secondary text-secondary-foreground text-xs">
                        {unreadMessages}
                      </Badge>
                    )}
                  </Button>
                </Link>
                <div className="flex items-center gap-2">
                  <span className="text-sm hidden md:block">
                    Olá, {user?.name || 'Usuário'}!
                  </span>
                  <Link href="/dashboard">
                    <Button variant="ghost" size="sm" className="text-primary-foreground hover:text-primary-foreground/80">
                      <User className="h-5 w-5" />
                    </Button>
                  </Link>
                  <Button 
                    onClick={handleLogout}
                    variant="outline" 
                    size="sm" 
                    className="text-primary-foreground border-primary-foreground hover:bg-primary-foreground hover:text-primary"
                  >
                    Sair
                  </Button>
                </div>
              </>
            ) : (
              <Button asChild className="bg-secondary hover:bg-secondary/90 text-secondary-foreground font-semibold">
                <Link href="/entrar">Entrar / Cadastrar</Link>
              </Button>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}
