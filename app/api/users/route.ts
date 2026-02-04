import { NextRequest, NextResponse } from 'next/server'
import { getDatabase } from '@/lib/db'
import { User, ApiResponse } from '@/lib/types'

// GET - Fetch all users or filter by role/status
export async function GET(request: NextRequest) {
  try {
    const db = await getDatabase()
    const collection = db.collection<User>('users')
    
    const { searchParams } = new URL(request.url)
    const role = searchParams.get('role')
    const status = searchParams.get('status')
    const search = searchParams.get('search')
    
    const query: any = {}
    if (role && role !== 'all') {
      query.role = role
    }
    if (status && status !== 'all') {
      query.status = status
    }
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } }
      ]
    }
    
    const users = await collection.find(query).sort({ joinDate: -1 }).toArray()
    
    const response: ApiResponse<User[]> = {
      success: true,
      data: users
    }
    
    return NextResponse.json(response)
  } catch (error) {
    console.error('Error fetching users:', error)
    const response: ApiResponse<null> = {
      success: false,
      error: 'Failed to fetch users'
    }
    return NextResponse.json(response, { status: 500 })
  }
}

// POST - Create a new user
export async function POST(request: NextRequest) {
  try {
    const db = await getDatabase()
    const collection = db.collection<User>('users')
    
    const body = await request.json()
    const user: User = {
      name: body.name,
      email: body.email,
      role: body.role || 'developer',
      status: body.status || 'active',
      avatar: body.avatar,
      joinDate: body.joinDate || new Date().toISOString().split('T')[0],
      lastLogin: body.lastLogin,
      projects: body.projects || 0,
      completedTasks: body.completedTasks || 0,
      performance: body.performance,
      department: body.department,
      location: body.location,
      phone: body.phone,
      skills: body.skills || [],
      bio: body.bio,
      createdAt: new Date(),
      updatedAt: new Date()
    }
    
    // Validate required fields
    if (!user.name || !user.email) {
      const response: ApiResponse<null> = {
        success: false,
        error: 'Missing required fields: name, email'
      }
      return NextResponse.json(response, { status: 400 })
    }
    
    // Check if user with email already exists
    const existingUser = await collection.findOne({ email: user.email })
    if (existingUser) {
      const response: ApiResponse<null> = {
        success: false,
        error: 'User with this email already exists'
      }
      return NextResponse.json(response, { status: 409 })
    }
    
    const result = await collection.insertOne(user)
    
    const response: ApiResponse<User> = {
      success: true,
      data: { ...user, _id: result.insertedId.toString() },
      message: 'User created successfully'
    }
    
    return NextResponse.json(response, { status: 201 })
  } catch (error) {
    console.error('Error creating user:', error)
    const response: ApiResponse<null> = {
      success: false,
      error: 'Failed to create user'
    }
    return NextResponse.json(response, { status: 500 })
  }
}
