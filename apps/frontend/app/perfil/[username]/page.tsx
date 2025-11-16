"use client"

import { Star, Calendar, MessageCircle, Send } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"
import Link from "next/link"
import { useEffect, useState } from "react"

interface Product {
  id: number
  title: string
  price: number
  category: string
  condition: string
  location: string
  seller_username: string
  images?: string[]
}

export default function UserProfilePage({ params }: { params: { username: string } }) {
  const [userProducts, setUserProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)

  // Dados do usuário atual (Igor Justino)
  const userData = {
    id: "1",
    name: "Igor Justino",
    username: "igor",
    course: "Engenharia de Software - UnB",
    memberSince: "Outubro 2024",
    rating: 4.8,
    reviewCount: 12,
    bio: "Estudante de Engenharia de Software na UnB. Apaixonado por tecnologia e sempre disposto a ajudar colegas com materiais de estudo.",
    avatar: "/placeholder.svg"
  }
  
  useEffect(() => {
    const loadUserProducts = async () => {
      try {
        const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8000/api'
        const response = await fetch(`${API_BASE}/products/`)
        const data = await response.json()
        
        console.log('Produtos carregados:', data.results.length)
        
        // Pegar dados do usuário logado do localStorage
        const userData = localStorage.getItem('user')
        if (userData) {
          const user = JSON.parse(userData)
          console.log('Usuário logado:', user)
          
          // Filtrar produtos do usuário atual - verificar tanto username quanto email
          const myProducts = data.results.filter((product: Product) => 
            product.seller_username === user.username || 
            product.seller_username === user.email ||
            product.seller_username.includes(user.username)
          )
          
          console.log('Meus produtos encontrados:', myProducts.length)
          console.log('Produtos:', myProducts)
          
          setUserProducts(myProducts)
        }
      } catch (error) {
        console.error('Erro ao carregar produtos do usuário:', error)
      } finally {
        setLoading(false)
      }
    }

    loadUserProducts()
  }, [])
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Profile Header */}
      <div className="bg-white">
        <div className="container mx-auto px-4 py-8">
          {/* Gradient Banner */}
          <div className="relative h-48 bg-gradient-to-r from-[#003D7A] via-teal-600 to-[#00A651] rounded-t-xl" />

          {/* Profile Info Card */}
          <div className="relative bg-white rounded-b-xl shadow-lg -mt-20 p-8 max-w-3xl">
            {/* Profile Picture */}
            <div className="absolute -top-20 left-8">
              <div className="h-40 w-40 rounded-full border-8 border-white bg-yellow-400 overflow-hidden">
                <Image
                  src={userData.avatar || "/placeholder.svg"}
                  alt={userData.name}
                  width={160}
                  height={160}
                  className="object-cover w-full h-full"
                />
              </div>
            </div>

            {/* Info Section */}
            <div className="ml-48 space-y-4">
              <div>
                <h1 className="text-2xl font-bold text-[#003D7A]">{userData.name}</h1>
                <p className="text-sm text-gray-600">{userData.course}</p>
              </div>

              <div className="flex items-center gap-6 text-sm text-gray-600">
                <div className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  <span>Membro desde {userData.memberSince}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <span className="font-semibold">
                    {userData.rating} ({userData.reviewCount} avaliações)
                  </span>
                </div>
              </div>

              <p className="text-gray-700 text-sm leading-relaxed max-w-xl">{userData.bio}</p>

              {/* Action Buttons */}
              <div className="flex gap-3 pt-2">
                <Button asChild className="bg-[#00A651] hover:bg-[#008f47] text-white">
                  <Link href="/mensagens">
                    <MessageCircle className="h-4 w-4 mr-2" />
                    Enviar Mensagem
                  </Link>
                </Button>
                <Button
                  variant="outline"
                  className="border-[#00A651] text-[#00A651] hover:bg-[#00A651] hover:text-white bg-transparent"
                >
                  <Send className="h-4 w-4 mr-2" />
                  WhatsApp
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Products Section */}
      <div className="container mx-auto px-4 py-12">
        <h2 className="text-2xl font-bold text-[#003D7A] mb-6">Meus Produtos Anunciados</h2>

        {loading ? (
          <div className="flex justify-center items-center py-12">
            <div className="text-gray-500">Carregando produtos...</div>
          </div>
        ) : userProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {userProducts.map((product) => (
              <div
                key={product.id}
                className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow"
              >
                <div className="aspect-square relative bg-gray-100">
                  <Image
                    src={product.images?.[0] || "/placeholder.svg?height=300&width=300"}
                    alt={product.title}
                    width={300}
                    height={300}
                    className="object-cover w-full h-full"
                  />
                </div>

                <div className="p-3 space-y-2">
                  <Badge
                    variant="secondary"
                    className="bg-green-100 text-green-800"
                  >
                    {product.category}
                  </Badge>

                  <h3 className="text-sm font-medium line-clamp-2 min-h-[2.5rem]">{product.title}</h3>

                  <div className="flex items-center justify-between pt-2">
                    <p className="text-lg font-bold text-[#003D7A]">R$ {Number(product.price).toFixed(2)}</p>
                    <Link 
                      href={`/marketplace/${product.id}`}
                      className="h-8 w-8 rounded-full bg-[#00A651] hover:bg-[#008f47] text-white flex items-center justify-center transition-colors"
                      aria-label="Ver mais"
                    >
                      <span className="text-lg">→</span>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-12 bg-white rounded-lg">
            <div className="text-gray-400 text-center">
              <h3 className="text-lg font-medium mb-2">Nenhum produto anunciado ainda</h3>
              <p className="text-sm mb-4">Comece criando seu primeiro anúncio!</p>
              <Button asChild className="bg-[#00A651] hover:bg-[#008f47]">
                <Link href="/dashboard/novo-produto">
                  Criar Primeiro Anúncio
                </Link>
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
