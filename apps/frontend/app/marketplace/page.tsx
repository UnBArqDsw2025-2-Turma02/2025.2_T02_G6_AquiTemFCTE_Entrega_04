"use client"

import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { ProductCard } from "@/components/product-card"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { useState, useEffect } from "react"

interface Product {
  id: string
  title: string
  price: number
  image_1?: string
  images?: string[]
  category: string
  condition: string
}

export default function MarketplacePage() {
  const [products, setProducts] = useState<Product[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    loadProducts()
  }, [])

  const loadProducts = async () => {
    try {
      setIsLoading(true)
      const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8000/api'
      const response = await fetch(`${API_BASE}/products/`)
      const data = await response.json()
      
      if (response.ok) {
        // Transformar os dados do Django para o formato esperado
        const formattedProducts = data.results.map((product: any) => ({
          id: product.id.toString(),
          title: product.title,
          price: parseFloat(product.price),
          image: product.main_image, // Usar main_image que tem fallback
          images: product.all_images || [],
          category: product.campus || 'FCTE', // Usar campus como categoria
          condition: product.status || 'Disponível'
        }))
        setProducts(formattedProducts)
        console.log('Produtos carregados:', formattedProducts)
      } else {
        console.error('Erro na resposta da API:', data)
        setProducts([])
      }
    } catch (error) {
      console.error('Erro ao carregar produtos:', error)
      setProducts([])
    } finally {
      setIsLoading(false)
    }
  }
  return (
    <div className="flex flex-col min-h-screen">
      {/* Search Header */}
      <section className="bg-background border-b py-4 px-4">
        <div className="container mx-auto">
          <div className="relative max-w-2xl mx-auto">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input type="search" placeholder="Buscar produtos..." className="pl-10" />
          </div>
        </div>
      </section>

      {/* Main Content with Sidebar */}
      <section className="flex-1 py-6 px-4">
        <div className="container mx-auto">
          <div className="flex gap-6">
            {/* Sidebar Filters */}
            <aside className="w-64 flex-shrink-0 space-y-6">
              <div className="bg-card border rounded-lg p-4 space-y-4">
                <h2 className="font-semibold text-lg">Filtrar por</h2>

                {/* Category Filter */}
                <div className="space-y-3">
                  <h3 className="font-medium text-sm">Categoria</h3>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox id="eletronicos" />
                      <Label htmlFor="eletronicos" className="text-sm font-normal cursor-pointer">
                        Eletrônicos
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="livros" />
                      <Label htmlFor="livros" className="text-sm font-normal cursor-pointer">
                        Livros
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="servicos" />
                      <Label htmlFor="servicos" className="text-sm font-normal cursor-pointer">
                        Serviços
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="esportes" />
                      <Label htmlFor="esportes" className="text-sm font-normal cursor-pointer">
                        Esportes
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="outros" />
                      <Label htmlFor="outros" className="text-sm font-normal cursor-pointer">
                        Outros
                      </Label>
                    </div>
                  </div>
                </div>

                {/* Price Filter */}
                <div className="space-y-3">
                  <h3 className="font-medium text-sm">Preço (R$)</h3>
                  <div className="flex gap-2">
                    <Input type="number" placeholder="Mín" className="h-9" />
                    <Input type="number" placeholder="Máx" className="h-9" />
                  </div>
                </div>

                {/* Condition Filter */}
                <div className="space-y-3">
                  <h3 className="font-medium text-sm">Condição</h3>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox id="novo" />
                      <Label htmlFor="novo" className="text-sm font-normal cursor-pointer">
                        Novo
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="usado" />
                      <Label htmlFor="usado" className="text-sm font-normal cursor-pointer">
                        Usado
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="nao-especificado" />
                      <Label htmlFor="nao-especificado" className="text-sm font-normal cursor-pointer">
                        Não especificado
                      </Label>
                    </div>
                  </div>
                </div>

                <Button variant="outline" className="w-full bg-transparent">
                  Limpar
                </Button>
              </div>
            </aside>

            {/* Products Grid */}
            <div className="flex-1">
              {isLoading ? (
                <div className="flex items-center justify-center py-12">
                  <div className="text-center">
                    <div className="animate-spin h-8 w-8 border-2 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
                    <p className="text-muted-foreground">Carregando produtos...</p>
                  </div>
                </div>
              ) : products.length > 0 ? (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4">
                  {products.map((product: Product) => (
                    <ProductCard key={product.id} {...product} />
                  ))}
                </div>
              ) : (
                <div className="flex items-center justify-center py-12">
                  <div className="text-center">
                    <p className="text-muted-foreground mb-4">Nenhum produto encontrado.</p>
                    <Button onClick={loadProducts}>Tentar novamente</Button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
