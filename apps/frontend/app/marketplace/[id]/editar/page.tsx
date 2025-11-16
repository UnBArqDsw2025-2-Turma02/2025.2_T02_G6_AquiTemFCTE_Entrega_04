"use client"

import { useEffect, useState } from "react"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"

interface Product {
  id: number
  title: string
  price: string
  campus: string
  status: string
  description: string
  seller: number
  seller_username: string
  image_url?: string
  created_at: string
}

export default function EditProductPage({ params }: { params: Promise<{ id: string }> }) {
  const [product, setProduct] = useState<Product | null>(null)
  const [loading, setLoading] = useState(true)
  const [productId, setProductId] = useState<string>("")
  const router = useRouter()

  useEffect(() => {
    const resolveParams = async () => {
      const resolvedParams = await params
      setProductId(resolvedParams.id)
    }
    resolveParams()
  }, [params])

  useEffect(() => {
    if (!productId) return

    const loadProduct = async () => {
      try {
        const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8000/api'
        const response = await fetch(`${API_BASE}/products/${productId}/`)
        
        if (!response.ok) {
          router.push('/dashboard')
          return
        }
        
        const product = await response.json()
        setProduct(product)
      } catch (error) {
        console.error('Erro ao carregar produto:', error)
        router.push('/dashboard')
      } finally {
        setLoading(false)
      }
    }

    loadProduct()
  }, [productId, router])

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-gray-500">Carregando produto...</div>
      </div>
    )
  }

  if (!product) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-gray-500">Produto não encontrado</div>
      </div>
    )
  }

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <div className="bg-muted border-b">
        <div className="container mx-auto px-4 py-4">
          <Button asChild variant="ghost" size="sm">
            <Link href="/dashboard">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Voltar para Dashboard
            </Link>
          </Button>
        </div>
      </div>

      {/* Content */}
      <section className="flex-1 py-8 px-4">
        <div className="container mx-auto max-w-3xl">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Editar Produto</h1>
            <p className="text-muted-foreground">Edite as informações do produto: {product.title}</p>
          </div>

          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 text-center">
            <h2 className="text-xl font-semibold text-yellow-800 mb-2">🚧 Em Desenvolvimento</h2>
            <p className="text-yellow-700 mb-4">
              A funcionalidade de edição de produtos está sendo implementada e estará disponível em breve.
            </p>
            <div className="space-y-2 text-left text-yellow-800">
              <p><strong>Produto:</strong> {product.title}</p>
              <p><strong>Preço:</strong> R$ {Number(product.price).toFixed(2)}</p>
              <p><strong>Campus:</strong> {product.campus}</p>
              <p><strong>Status:</strong> {product.status}</p>
            </div>
            <div className="mt-6 flex gap-3 justify-center">
              <Button asChild variant="outline">
                <Link href="/dashboard">
                  Voltar ao Dashboard
                </Link>
              </Button>
              <Button asChild>
                <Link href={`/marketplace/${product.id}`}>
                  Ver Produto
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}