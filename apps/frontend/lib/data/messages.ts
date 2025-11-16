// DEPRECATED: Use API client instead
// All data now comes from Django backend via /lib/api.ts

export interface Message {
  id: string
  conversationId: string
  senderId: string
  text: string
  time: string
  read: boolean
}

export interface Conversation {
  id: string
  userId: string
  productId: string
  lastMessage: string
  lastMessageTime: string
  unread: number
}

// DEPRECATED: All conversations now come from Django API
export const conversations: Conversation[] = []

// DEPRECATED: All messages now come from Django API
export const messages: Message[] = []

// Helper functions - DEPRECATED
export function getMessagesByConversation(conversationId: string): Message[] {
  return []
}

export function getConversationsByUser(userId: string): Conversation[] {
  return []
}