"use client"

import { Package, ShoppingBag, Heart, MessageCircle, Plus, TrendingUp, LogOut } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { useAuth } from "@/hooks/use-auth"
import { useEffect, useState } from "react"
import { AuthGuard } from "@/components/auth-guard"

interface Product {
  id: number
  title: string
  price: string
  image_url?: string
  campus: string
  status: string
  seller: number
  views?: number
}

export default function DashboardPage() {
  const { user, profile, loading: authLoading } = useAuth()
  const [myProducts, setMyProducts] = useState<Product[]>([])
  const [recentMessages, setRecentMessages] = useState<any[]>([])
  const [stats, setStats] = useState({
    activeListings: 0,
    totalSales: 0,
    favorites: 0,
    messages: 0,
  })
  const [loading, setLoading] = useState(true)

  // Debug - vamos ver o que está acontecendo
  useEffect(() => {
    console.log('Dashboard: user =', user)
    console.log('Dashboard: profile =', profile)
    console.log('Dashboard: authLoading =', authLoading)
    console.log('Dashboard: localStorage =', localStorage.getItem('django_user'))
  }, [user, profile, authLoading])

  useEffect(() => {
    if (user) {
      loadDashboardData()
    }
  }, [user])

  const loadDashboardData = async () => {
    if (!user) return
    
    try {
      // Load user's products from Django API
  const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8000/api'
  const response = await fetch(`${API_BASE}/products/?seller_id=${user.id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })
      
      if (response.ok) {
        const data = await response.json()
        const userProducts = data.results || [] // Django pagination
        
        console.log('=== PRODUTOS DO DASHBOARD ===')
        console.log('Products:', userProducts)
        userProducts.forEach((produto: any) => {
          console.log(`Produto ${produto.id}: ${produto.title}`)
          console.log(`Image URL: ${produto.image_url}`)
        })
        
        setMyProducts(userProducts)
        setStats(prev => ({
          ...prev,
          activeListings: userProducts.length,
          totalSales: 0, // TODO: implement total sales tracking
          favorites: 0, // TODO: implement favorites
          messages: 0, // TODO: implement messaging
        }))
      } else {
        console.error('Erro ao carregar produtos:', response.statusText)
      }
      
      // TODO: Load real messages when messaging system is complete
      setRecentMessages([])
      
    } catch (error) {
      console.error('Erro ao carregar dados do dashboard:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <AuthGuard>
      <DashboardContent 
        user={user!} 
        profile={profile} 
        myProducts={myProducts}
        recentMessages={recentMessages}
        stats={stats}
        loading={loading}
      />
    </AuthGuard>
  )
}

function DashboardContent({ 
  user, 
  profile, 
  myProducts, 
  recentMessages, 
  stats, 
  loading 
}: {
  user: any
  profile: any
  myProducts: any[]
  recentMessages: any[]
  stats: any
  loading: boolean
}) {
  const { logout } = useAuth()

  const handleLogout = () => {
    logout()
    window.location.href = "/"
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <p>Carregando dashboard...</p>
        </div>
      </div>
    )
  }
  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <section className="bg-primary text-primary-foreground py-8 px-4">
        <div className="container mx-auto">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Avatar className="h-16 w-16 border-2 border-primary-foreground">
                <AvatarImage src={profile?.avatar_url || "/student-avatar.png"} alt={user?.name || "Usuário"} />
                <AvatarFallback>{user?.name?.charAt(0) || user.email?.charAt(0) || "U"}</AvatarFallback>
              </Avatar>
              <div>
                <h1 className="text-2xl font-bold">Olá, {user?.name || "Usuário"}</h1>
                <p className="text-primary-foreground/80">Bem-vindo ao seu dashboard</p>
              </div>
            </div>
            <div className="flex gap-2">
              <Button asChild className="bg-secondary hover:bg-secondary/90 text-secondary-foreground">
                <Link href="/dashboard/novo-produto">
                  <Plus className="h-5 w-5 mr-2" />
                  Novo Produto
                </Link>
              </Button>
              <Button 
                onClick={handleLogout}
                variant="outline" 
                className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary"
              >
                <LogOut className="h-5 w-5 mr-2" />
                Sair
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-8 px-4 bg-muted">
        <div className="container mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Anúncios Ativos</CardTitle>
                <Package className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.activeListings}</div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Vendas Totais</CardTitle>
                <ShoppingBag className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.totalSales}</div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Favoritos</CardTitle>
                <Heart className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.favorites}</div>
              </CardContent>
            </Card>

            <Link href="/mensagens" className="block">
              <Card className="cursor-pointer hover:bg-muted/50 transition-colors">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Mensagens</CardTitle>
                  <MessageCircle className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats.messages}</div>
                  {stats.messages > 0 && <Badge className="mt-1 bg-secondary">Novas</Badge>}
                </CardContent>
              </Card>
            </Link>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="flex-1 py-8 px-4">
        <div className="container mx-auto">
          <Tabs defaultValue="products" className="space-y-6">
            <TabsList>
              <TabsTrigger value="products">Meus Produtos</TabsTrigger>
              <TabsTrigger value="messages">Mensagens</TabsTrigger>
              <TabsTrigger value="favorites">Favoritos</TabsTrigger>
              <TabsTrigger value="profile">Perfil</TabsTrigger>
            </TabsList>

            <TabsContent value="products" className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold">Meus Anúncios</h2>
                <Button asChild variant="outline">
                  <Link href="/dashboard/novo-produto">
                    <Plus className="h-4 w-4 mr-2" />
                    Adicionar Produto
                  </Link>
                </Button>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {myProducts.map((product) => (
                  <Card key={product.id}>
                    <CardContent className="p-4 space-y-4">
                      <div className="aspect-square rounded-lg overflow-hidden bg-muted">
                        <img
                          src={product.image_url || "/placeholder.svg"}
                          alt={product.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-start justify-between gap-2">
                          <h3 className="font-semibold line-clamp-1">{product.title}</h3>
                          <Badge variant="default">
                            {product.status === 'disponivel' ? 'Ativo' : 'Inativo'}
                          </Badge>
                        </div>
                        <p className="text-xl font-bold text-primary">R$ {Number(product.price).toFixed(2)}</p>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <TrendingUp className="h-4 w-4" />
                          <span>{product.views || 0} visualizações</span>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button asChild variant="outline" className="flex-1 bg-transparent" size="sm">
                          <Link href={`/marketplace/${product.id}`}>Ver</Link>
                        </Button>
                        <Button asChild variant="outline" className="flex-1 bg-transparent" size="sm">
                          <Link href={`/marketplace/${product.id}/editar`}>Editar</Link>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="messages" className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold">Mensagens</h2>
                <Button asChild className="bg-secondary hover:bg-secondary/90 text-secondary-foreground">
                  <Link href="/mensagens">
                    <MessageCircle className="h-4 w-4 mr-2" />
                    Ver Todas
                  </Link>
                </Button>
              </div>
              <div className="space-y-4">
                {recentMessages.map((msg) => (
                  <Card key={msg.id} className={msg.unread ? "border-primary" : ""}>
                    <CardContent className="p-4">
                      <div className="flex items-start gap-4">
                        <Avatar>
                          <AvatarFallback>{msg.sender.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1 space-y-1">
                          <div className="flex items-center justify-between">
                            <p className="font-semibold">{msg.sender}</p>
                            <span className="text-sm text-muted-foreground">{msg.time}</span>
                          </div>
                          <p className="text-muted-foreground">{msg.message}</p>
                          {msg.unread && <Badge className="bg-secondary">Nova</Badge>}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
              <Button asChild variant="outline" className="w-full">
                <Link href="/mensagens">Ver Todas as Mensagens</Link>
              </Button>
            </TabsContent>

            <TabsContent value="favorites" className="space-y-6">
              <h2 className="text-2xl font-bold">Meus Favoritos</h2>
              <p className="text-muted-foreground">Produtos que você salvou aparecerão aqui.</p>
            </TabsContent>

            <TabsContent value="profile" className="space-y-6">
              <h2 className="text-2xl font-bold">Meu Perfil</h2>
              <Card>
                <CardHeader>
                  <CardTitle>Informações Pessoais</CardTitle>
                  <CardDescription>Gerencie suas informações de perfil</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Nome Completo</label>
                    <p className="text-muted-foreground">{user?.name || 'Não informado'}</p>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Email</label>
                    <p className="text-muted-foreground">{user?.email}</p>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Campus</label>
                    <p className="text-muted-foreground">{profile?.campus || 'Não informado'}</p>
                  </div>
                  <Button asChild variant="outline">
                    <Link href="/dashboard/editar-perfil">Editar Perfil</Link>
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </section>
    </div>
  )
}