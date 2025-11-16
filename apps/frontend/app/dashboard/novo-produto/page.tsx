"use client"

import type React from "react"

import { useState } from "react"
import { ArrowLeft, Upload, X } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function NewProductPage() {
  const [images, setImages] = useState<File[]>([])
  const [imagesPreviews, setImagesPreviews] = useState<string[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    price: '',
    condition: '',
    description: '',
    location: ''
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      // Buscar usuário logado
      const userData = localStorage.getItem('django_user')
      if (!userData) {
        alert('Você precisa estar logado para publicar um produto!')
        window.location.href = '/entrar'
        return
      }

      const user = JSON.parse(userData)

      // Preparar FormData para envio com imagens
      const productFormData = new FormData()
      productFormData.append('title', formData.title)
      productFormData.append('description', formData.description)
      productFormData.append('price', formData.price)
      productFormData.append('campus', formData.location)
      productFormData.append('status', 'disponivel')
      productFormData.append('seller_id', user.id.toString()) // Adicionar seller_id

      // Adicionar imagens ao FormData
      images.forEach((image, index) => {
        if (index === 0) {
          productFormData.append('image', image)
        } else {
          productFormData.append(`image_${index + 1}`, image)
        }
      })

      console.log('=== DEBUG FRONTEND ===')
      console.log('User:', user)
      console.log('FormData entries:')
      for (let [key, value] of productFormData.entries()) {
        console.log(key, ':', value)
      }

      // Enviar dados para a API Django
      const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8000/api'
      const response = await fetch(`${API_BASE}/products/`, {
        method: 'POST',
        body: productFormData, // Não definir Content-Type para FormData
      })

      const result = await response.json()

      if (response.ok) {
        alert(`Produto "${result.title}" criado com sucesso!`)
        window.location.href = "/dashboard"
      } else {
        alert(result.error || "Erro ao criar produto.")
      }
    } catch (error) {
      console.error('Erro ao criar produto:', error)
      alert('Erro de conexão. Tente novamente.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files) {
      const newFiles = Array.from(files)
      const newPreviews = newFiles.map((file) => URL.createObjectURL(file))
      
      // Manter máximo de 5 imagens
      const totalFiles = [...images, ...newFiles].slice(0, 5)
      const totalPreviews = [...imagesPreviews, ...newPreviews].slice(0, 5)
      
      setImages(totalFiles)
      setImagesPreviews(totalPreviews)
    }
  }

  const removeImage = (index: number) => {
    // Limpar URL do preview para evitar memory leak
    URL.revokeObjectURL(imagesPreviews[index])
    
    setImages(images.filter((_, i) => i !== index))
    setImagesPreviews(imagesPreviews.filter((_, i) => i !== index))
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

      {/* Form */}
      <section className="flex-1 py-8 px-4">
        <div className="container mx-auto max-w-3xl">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Publicar Novo Produto</h1>
            <p className="text-muted-foreground">Preencha as informações do seu produto para publicar no marketplace</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Images */}
            <Card>
              <CardHeader>
                <CardTitle>Fotos do Produto</CardTitle>
                <CardDescription>Adicione até 5 fotos do seu produto</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                  {imagesPreviews.map((imagePreview, index) => (
                    <div key={index} className="relative aspect-square rounded-lg overflow-hidden bg-muted">
                      <img
                        src={imagePreview}
                        alt={`Produto ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                      <button
                        type="button"
                        onClick={() => removeImage(index)}
                        className="absolute top-2 right-2 bg-destructive text-destructive-foreground rounded-full p-1 hover:opacity-80"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  ))}
                  {images.length < 5 && (
                    <label className="aspect-square rounded-lg border-2 border-dashed border-border hover:border-primary cursor-pointer flex flex-col items-center justify-center gap-2 transition-colors">
                      <Upload className="h-8 w-8 text-muted-foreground" />
                      <span className="text-xs text-muted-foreground">Adicionar</span>
                      <input type="file" accept="image/*" multiple onChange={handleImageUpload} className="hidden" />
                    </label>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Basic Info */}
            <Card>
              <CardHeader>
                <CardTitle>Informações Básicas</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Título do Anúncio *</Label>
                  <Input 
                    id="title" 
                    placeholder="Ex: Livro de Cálculo I - 7ª Edição" 
                    value={formData.title}
                    onChange={(e) => handleInputChange('title', e.target.value)}
                    required 
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="category">Categoria *</Label>
                  <Select value={formData.category} onValueChange={(value) => handleInputChange('category', value)} required>
                    <SelectTrigger id="category">
                      <SelectValue placeholder="Selecione uma categoria" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="livros">Livros</SelectItem>
                      <SelectItem value="eletronicos">Eletrônicos</SelectItem>
                      <SelectItem value="material_escolar">Material Escolar</SelectItem>
                      <SelectItem value="moveis">Móveis</SelectItem>
                      <SelectItem value="esportes">Esportes</SelectItem>
                      <SelectItem value="moda">Moda</SelectItem>
                      <SelectItem value="servicos">Serviços</SelectItem>
                      <SelectItem value="outros">Outros</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="price">Preço (R$) *</Label>
                  <Input 
                    id="price" 
                    type="number" 
                    step="0.01" 
                    placeholder="0,00" 
                    value={formData.price}
                    onChange={(e) => handleInputChange('price', e.target.value)}
                    required 
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="condition">Condição *</Label>
                  <Select value={formData.condition} onValueChange={(value) => handleInputChange('condition', value)} required>
                    <SelectTrigger id="condition">
                      <SelectValue placeholder="Selecione a condição" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="novo">Novo</SelectItem>
                      <SelectItem value="usado_otimo">Usado - Ótimo Estado</SelectItem>
                      <SelectItem value="usado_bom">Usado - Bom Estado</SelectItem>
                      <SelectItem value="usado_regular">Usado - Estado Regular</SelectItem>
                      <SelectItem value="usado">Usado</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Descrição *</Label>
                  <Textarea
                    id="description"
                    placeholder="Descreva seu produto em detalhes..."
                    rows={6}
                    value={formData.description}
                    onChange={(e) => handleInputChange('description', e.target.value)}
                    required
                    className="resize-none"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Location */}
            <Card>
              <CardHeader>
                <CardTitle>Localização</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="location">Campus *</Label>
                  <Select value={formData.location} onValueChange={(value) => handleInputChange('location', value)} required>
                    <SelectTrigger id="location">
                      <SelectValue placeholder="Selecione o campus" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="darcy-ribeiro">Campus Darcy Ribeiro</SelectItem>
                      <SelectItem value="fcte">Campus FCTE</SelectItem>
                      <SelectItem value="gama">Campus Gama</SelectItem>
                      <SelectItem value="ceilandia">Campus Ceilândia</SelectItem>
                      <SelectItem value="planaltina">Campus Planaltina</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            {/* Submit */}
            <div className="flex gap-4">
              <Button type="submit" className="flex-1 bg-secondary hover:bg-secondary/90" disabled={isLoading}>
                {isLoading ? "Publicando..." : "Publicar Produto"}
              </Button>
              <Button type="button" variant="outline" asChild>
                <Link href="/dashboard">Cancelar</Link>
              </Button>
            </div>
          </form>
        </div>
      </section>
    </div>
  )
}
