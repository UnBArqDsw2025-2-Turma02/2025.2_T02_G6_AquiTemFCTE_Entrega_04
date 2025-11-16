import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ShoppingCart } from "lucide-react"

interface ProductCardProps {
  id: string
  title: string
  price: number
  image?: string
  images?: string[]
  category: string
  condition: string // Aceita qualquer string agora
}

export function ProductCard({ id, title, price, image, images, category, condition }: ProductCardProps) {
  const productImage = image || images?.[0] || "/placeholder.svg"
  return (
    <Card className="overflow-hidden hover:shadow-md transition-shadow group">
      <Link href={`/marketplace/${id}`}>
        <div className="aspect-square relative overflow-hidden rounded-lg">
          <img
            src={productImage}
            alt={title}
            className="object-cover w-full h-full group-hover:scale-105 transition-transform"
          />
        </div>
      </Link>
      <CardContent className="p-3 space-y-2">
        <Link href={`/marketplace/${id}`}>
          <h3 className="font-medium text-sm line-clamp-2 hover:text-primary transition-colors min-h-[2.5rem]">
            {title}
          </h3>
        </Link>

        <Badge
          variant={condition === "Novo" ? "default" : "secondary"}
          className={`text-xs ${condition === "Novo" ? "bg-secondary hover:bg-secondary" : ""}`}
        >
          {condition}
        </Badge>

        <div className="flex items-center justify-between">
          <p className="text-xl font-bold text-foreground">R$ {price.toFixed(0)}</p>
          <button
            className="h-8 w-8 rounded-full bg-secondary hover:bg-secondary/90 text-secondary-foreground flex items-center justify-center transition-colors"
            aria-label="Adicionar ao carrinho"
          >
            <ShoppingCart className="h-4 w-4" />
          </button>
        </div>
      </CardContent>
    </Card>
  )
}
