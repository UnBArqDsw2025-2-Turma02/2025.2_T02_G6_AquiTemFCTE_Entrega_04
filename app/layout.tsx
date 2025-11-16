import type React from "react"
import type { Metadata } from "next"
// import { Analytics } from "@vercel/analytics/next"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { AuthProvider } from "@/hooks/use-auth"
import "./globals.css"

export const metadata: Metadata = {
  title: "AquiTemFCTE - Marketplace da Comunidade",
  description: "Plataforma de compra e venda para a comunidade FCTE",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR">
      <body className={`font-sans antialiased min-h-screen flex flex-col`}>
        <AuthProvider>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </AuthProvider>
        {/* <Analytics /> */}
      </body>
    </html>
  )
}
