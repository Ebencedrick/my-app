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

// API Response Types
export interface ApiResponse<T> {
  success: boolean
  data?: T
  error?: string
  message?: string
}
