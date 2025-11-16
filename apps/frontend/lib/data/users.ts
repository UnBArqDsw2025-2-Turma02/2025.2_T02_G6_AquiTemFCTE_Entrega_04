// DEPRECATED: Use API client instead
// All data now comes from Django backend via /lib/api.ts

export interface User {
  id: string
  name: string
  email: string
  avatar: string
  course?: string
  bio?: string
  memberSince: string
  rating: number
  reviewCount: number
  totalSales: number
  phone?: string
  campus: string
}

// DEPRECATED: All users now come from Django API
export const users: User[] = []

// Helper functions - DEPRECATED
export function getUserById(id: string): User | undefined {
  return undefined
}

export function getUserByEmail(email: string): User | undefined {
  return undefined
}

// DEPRECATED: Use useAuth hook instead
export const currentUser: User = {
  id: "temp",
  name: "Usuário Temporário",
  email: "temp@temp.com",
  avatar: "/student-avatar.png",
  memberSince: "2025",
  rating: 0,
  reviewCount: 0,
  totalSales: 0,
  campus: "N/A"
}