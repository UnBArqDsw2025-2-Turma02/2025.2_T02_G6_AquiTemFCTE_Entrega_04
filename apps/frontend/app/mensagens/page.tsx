"use client"

import { useState } from "react"
import { Search, Send, MoreVertical, ArrowLeft } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import Link from "next/link"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
// TODO: Replace with real API integration

// Placeholder conversations - TODO: Integrate with Django backend
const conversations = [
  {
    id: "1",
    user: {
      name: "Maria Silva",
      avatar: "/placeholder.svg",
      online: true,
    },
    lastMessage: "Produto ainda disponível?",
    time: "10:30",
    unread: 2,
    product: {
      title: "Calculadora Científica HP",
      image: "/placeholder.svg",
    },
  },
  {
    id: "2",
    user: {
      name: "João Santos", 
      avatar: "/placeholder.svg",
      online: false,
    },
    lastMessage: "Obrigado pela informação!",
    time: "09:15",
    unread: 0,
    product: {
      title: "Livro de Cálculo",
      image: "/placeholder.svg",
    },
  }
]

export default function MessagesPage() {
  const [selectedConversation, setSelectedConversation] = useState(conversations[0])
  const [newMessage, setNewMessage] = useState("")
  const [searchQuery, setSearchQuery] = useState("")
  
  // Placeholder messages - TODO: Get real messages from Django backend
  const messages = [
    {
      id: "1",
      sender: "other",
      text: "Olá! Vi seu anúncio da calculadora. Ela ainda está disponível?",
      time: "10:30",
      read: true,
    },
    {
      id: "2",
      sender: "me", 
      text: "Sim! Está em ótimo estado. Posso enviar mais fotos se quiser.",
      time: "10:35",
      read: true,
    },
    {
      id: "3",
      sender: "other",
      text: "Perfeito! Aceita R$ 40?",
      time: "10:40", 
      read: false,
    }
  ]

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault()
    if (newMessage.trim()) {
      // Aqui você adicionaria a lógica para enviar a mensagem
      console.log("Enviando mensagem:", newMessage)
      setNewMessage("")
    }
  }

  const filteredConversations = conversations.filter((conv) =>
    conv.user.name.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header Mobile */}
      <div className="lg:hidden bg-primary text-primary-foreground p-4">
        <div className="flex items-center gap-3">
          <Button asChild variant="ghost" size="icon" className="text-primary-foreground">
            <Link href="/dashboard">
              <ArrowLeft className="h-5 w-5" />
            </Link>
          </Button>
          <h1 className="text-xl font-bold">Mensagens</h1>
        </div>
      </div>

      <div className="flex-1 flex overflow-hidden">
        {/* Sidebar - Lista de Conversas */}
        <div className="w-full lg:w-96 border-r bg-background flex flex-col">
          {/* Header Desktop */}
          <div className="hidden lg:block p-4 border-b">
            <h1 className="text-2xl font-bold mb-4">Mensagens</h1>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar conversas..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>
          </div>

          {/* Lista de Conversas */}
          <div className="flex-1 overflow-y-auto">
            {filteredConversations.map((conv) => (
              <button
                key={conv.id}
                onClick={() => setSelectedConversation(conv)}
                className={`w-full p-4 flex items-start gap-3 hover:bg-muted transition-colors border-b ${
                  selectedConversation.id === conv.id ? "bg-muted" : ""
                }`}
              >
                <div className="relative">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={conv.user.avatar || "/placeholder.svg"} alt={conv.user.name} />
                    <AvatarFallback>{conv.user.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  {conv.user.online && (
                    <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-background rounded-full" />
                  )}
                </div>

                <div className="flex-1 text-left min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <p className="font-semibold text-sm truncate">{conv.user.name}</p>
                    <span className="text-xs text-muted-foreground whitespace-nowrap ml-2">{conv.time}</span>
                  </div>
                  <p className="text-sm text-muted-foreground truncate mb-1">{conv.lastMessage}</p>
                  <p className="text-xs text-muted-foreground truncate">Produto: {conv.product.title}</p>
                </div>

                {conv.unread > 0 && (
                  <Badge className="bg-secondary text-secondary-foreground min-w-[20px] h-5 flex items-center justify-center">
                    {conv.unread}
                  </Badge>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Área de Chat */}
        <div className="flex-1 flex flex-col bg-gray-50">
          {/* Header da Conversa */}
          <div className="bg-background border-b p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <Avatar className="h-10 w-10">
                    <AvatarImage
                      src={selectedConversation.user.avatar || "/placeholder.svg"}
                      alt={selectedConversation.user.name}
                    />
                    <AvatarFallback>{selectedConversation.user.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  {selectedConversation.user.online && (
                    <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-background rounded-full" />
                  )}
                </div>
                <div>
                  <p className="font-semibold">{selectedConversation.user.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {selectedConversation.user.online ? "Online" : "Offline"}
                  </p>
                </div>
              </div>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <MoreVertical className="h-5 w-5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>Ver perfil</DropdownMenuItem>
                  <DropdownMenuItem>Ver produto</DropdownMenuItem>
                  <DropdownMenuItem className="text-destructive">Bloquear usuário</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            {/* Info do Produto */}
            <div className="mt-3 p-3 bg-muted rounded-lg flex items-center gap-3">
              <div className="w-12 h-12 rounded bg-background overflow-hidden">
                <img
                  src={selectedConversation.product.image || "/placeholder.svg"}
                  alt={selectedConversation.product.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">{selectedConversation.product.title}</p>
                <p className="text-xs text-muted-foreground">Conversa sobre este produto</p>
              </div>
              <Button asChild variant="outline" size="sm">
                <Link href={`/marketplace/${selectedConversation.id}`}>Ver</Link>
              </Button>
            </div>
          </div>

          {/* Mensagens */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((msg) => (
              <div key={msg.id} className={`flex ${msg.sender === "me" ? "justify-end" : "justify-start"}`}>
                <div
                  className={`max-w-[70%] rounded-lg p-3 ${
                    msg.sender === "me"
                      ? "bg-primary text-primary-foreground rounded-br-none"
                      : "bg-background border rounded-bl-none"
                  }`}
                >
                  <p className="text-sm break-words">{msg.text}</p>
                  <span
                    className={`text-xs mt-1 block ${
                      msg.sender === "me" ? "text-primary-foreground/70" : "text-muted-foreground"
                    }`}
                  >
                    {msg.time}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Input de Mensagem */}
          <div className="bg-background border-t p-4">
            <form onSubmit={handleSendMessage} className="flex gap-2">
              <Input
                placeholder="Digite sua mensagem..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                className="flex-1"
              />
              <Button type="submit" size="icon" className="bg-secondary hover:bg-secondary/90 text-secondary-foreground">
                <Send className="h-5 w-5" />
              </Button>
            </form>
            <p className="text-xs text-muted-foreground mt-2 text-center">
              Mantenha todas as negociações dentro da plataforma para sua segurança
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
