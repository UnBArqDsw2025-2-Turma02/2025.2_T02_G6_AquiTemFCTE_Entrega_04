// DEPRECATED: Use API client instead
// All data now comes from Django backend via /lib/api.ts

export interface ProductData {
  id: string
  title: string
  price: number
  category: string
  images: string[]
  condition: string
  description: string
  sellerId: string
  location: string
  postedDate: string
  views: number
}

// DEPRECATED: All products now come from Django API
export const products: ProductData[] = []

// DEPRECATED: Use apiClient.getProducts() instead
export const getActiveProducts = (): ProductData[] => {
  return []
}

export const getProductById = (id: string): ProductData | undefined => {
  return undefined
}

export const getProductsBySeller = (sellerId: string): ProductData[] => {
  return []
}