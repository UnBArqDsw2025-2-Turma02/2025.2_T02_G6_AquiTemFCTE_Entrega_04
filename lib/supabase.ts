import { createClient } from '@supabase/supabase-js'

// Configurações do Supabase - URLs locais
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'http://127.0.0.1:54321'
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0'

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true
  }
})

// Tipos personalizados para o projeto
export interface UserProfile {
  id: string
  email: string
  name: string
  matricula?: string
  course?: string
  campus?: string
  avatar_url?: string
  bio?: string
  phone?: string
  rating?: number
  total_sales?: number
  created_at: string
  updated_at: string
}

export interface Product {
  id: string
  title: string
  description: string
  price: number
  category: string
  condition: string
  location: string
  views: number
  images?: string[]
  seller_id: string
  seller_name?: string
  created_at: string
  updated_at: string
}

// Funções utilitárias de autenticação
export const authHelpers = {
  // Cadastro com email e senha
  async signUp(email: string, password: string, userData?: Partial<UserProfile>) {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: userData // metadados do usuário
      }
    })
    return { data, error }
  },

  // Login com email e senha
  async signIn(email: string, password: string) {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    })
    return { data, error }
  },

  // Logout
  async signOut() {
    const { error } = await supabase.auth.signOut()
    return { error }
  },

  // Obter usuário atual
  async getCurrentUser() {
    const { data: { user } } = await supabase.auth.getUser()
    return user
  },

  // Obter sessão atual
  async getSession() {
    const { data: { session } } = await supabase.auth.getSession()
    return session
  },

  // Resetar senha
  async resetPassword(email: string) {
    const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/recuperar-senha`
    })
    return { data, error }
  },

  // Escutar mudanças de autenticação
  onAuthStateChange(callback: (event: any, session: any) => void) {
    return supabase.auth.onAuthStateChange(callback)
  }
}

// Funções para gerenciar perfis de usuário
export const userProfileHelpers = {
  // Criar perfil do usuário
  async createProfile(userId: string, profileData: Partial<UserProfile>) {
    const { data, error } = await supabase
      .from('user_profiles')
      .insert({
        id: userId,
        ...profileData,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      })
    return { data, error }
  },

  // Obter perfil do usuário
  async getProfile(userId: string) {
    const { data, error } = await supabase
      .from('user_profiles')
      .select('*')
      .eq('id', userId)
      .single()
    return { data, error }
  },

  // Atualizar perfil do usuário
  async updateProfile(userId: string, updates: Partial<UserProfile>) {
    const { data, error } = await supabase
      .from('user_profiles')
      .update({
        ...updates,
        updated_at: new Date().toISOString()
      })
      .eq('id', userId)
    return { data, error }
  },

  // Listar todos os usuários
  async listUsers() {
    const { data, error } = await supabase
      .from('user_profiles')
      .select('*')
      .order('created_at', { ascending: false })
    return { data, error }
  }
}

// Funções para gerenciar produtos
export const productHelpers = {
  // Criar produto
  async createProduct(productData: Partial<Product>) {
    const { data, error } = await supabase
      .from('products')
      .insert({
        ...productData,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      })
    return { data, error }
  },

  // Obter produto por ID
  async getProduct(productId: string) {
    const { data, error } = await supabase
      .from('products')
      .select(`
        *,
        user_profiles(name, email, campus)
      `)
      .eq('id', productId)
      .single()
    return { data, error }
  },

  // Listar produtos com filtros
  async listProducts(filters?: {
    category?: string
    search?: string
    seller_id?: string
    limit?: number
  }) {
    let query = supabase
      .from('products')
      .select(`
        *,
        user_profiles(name, email, campus)
      `)
      .order('created_at', { ascending: false })

    if (filters?.category) {
      query = query.eq('category', filters.category)
    }

    if (filters?.search) {
      query = query.or(`title.ilike.%${filters.search}%,description.ilike.%${filters.search}%`)
    }

    if (filters?.seller_id) {
      query = query.eq('seller_id', filters.seller_id)
    }

    if (filters?.limit) {
      query = query.limit(filters.limit)
    }

    const { data, error } = await query
    return { data, error }
  },

  // Atualizar produto
  async updateProduct(productId: string, updates: Partial<Product>) {
    const { data, error } = await supabase
      .from('products')
      .update({
        ...updates,
        updated_at: new Date().toISOString()
      })
      .eq('id', productId)
    return { data, error }
  },

  // Deletar produto
  async deleteProduct(productId: string) {
    const { data, error } = await supabase
      .from('products')
      .delete()
      .eq('id', productId)
    return { data, error }
  }
}

// Upload de arquivos
export const storageHelpers = {
  // Upload de avatar
  async uploadAvatar(file: File, userId: string) {
    const fileExt = file.name.split('.').pop()
    const fileName = `${userId}_${Math.random()}.${fileExt}`
    const filePath = `avatars/${fileName}`

    const { data, error } = await supabase.storage
      .from('avatars')
      .upload(filePath, file)

    if (error) return { data: null, error }

    const { data: { publicUrl } } = supabase.storage
      .from('avatars')
      .getPublicUrl(filePath)

    return { data: { path: filePath, publicUrl }, error: null }
  },

  // Upload de imagens de produto
  async uploadProductImage(file: File, productId: string) {
    const fileExt = file.name.split('.').pop()
    const fileName = `${productId}_${Math.random()}.${fileExt}`
    const filePath = `product-images/${fileName}`

    const { data, error } = await supabase.storage
      .from('product-images')
      .upload(filePath, file)

    if (error) return { data: null, error }

    const { data: { publicUrl } } = supabase.storage
      .from('product-images')
      .getPublicUrl(filePath)

    return { data: { path: filePath, publicUrl }, error: null }
  }
}