// Project Types
export interface Project {
  _id?: string
  title: string
  category: 'web' | 'mobile' | 'design' | 'backend'
  description: string
  image?: string
  technologies: string[]
  features: string[]
  liveUrl?: string
  githubUrl?: string
  status: 'completed' | 'in-progress' | 'planned'
  year: string
  createdAt?: Date
  updatedAt?: Date
}

// User Types
export interface User {
  _id?: string
  name: string
  email: string
  role: 'admin' | 'manager' | 'developer' | 'designer'
  status: 'active' | 'inactive'
  avatar?: string
  joinDate: string
  lastLogin?: string
  projects?: number
  completedTasks?: number
  performance?: number
  department?: string
  location?: string
  phone?: string
  skills?: string[]
  bio?: string
  createdAt?: Date
  updatedAt?: Date
}

// Contact Form Types
export interface ContactSubmission {
  _id?: string
  name: string
  email: string
  subject: string
  message: string
  status?: 'new' | 'read' | 'replied'
  createdAt?: Date
  updatedAt?: Date
}

// Media Types
export interface MediaFile {
  _id?: string
  name: string
  originalName: string
  type: 'image' | 'video' | 'audio' | 'document'
  mimeType: string
  size: number // in bytes
  sizeFormatted?: string // formatted like "2.4 MB"
  url: string
  thumbnail?: string
  dimensions?: string
  duration?: string
  pages?: number
  slides?: number
  tags: string[]
  category?: string
  uploadedBy?: string
  uploadedDate?: string
  downloads?: number
  views?: number
  createdAt?: Date
  updatedAt?: Date
}

// API Response Types
export interface ApiResponse<T> {
  success: boolean
  data?: T
  error?: string
  message?: string
}
