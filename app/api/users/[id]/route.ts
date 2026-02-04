import { NextRequest, NextResponse } from 'next/server'
import { getDatabase } from '@/lib/db'
import { User, ApiResponse } from '@/lib/types'
import { ObjectId } from 'mongodb'

// GET - Fetch a single user by ID
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const db = await getDatabase()
    const collection = db.collection<User>('users')
    
    if (!ObjectId.isValid(params.id)) {
      const response: ApiResponse<null> = {
        success: false,
        error: 'Invalid user ID'
      }
      return NextResponse.json(response, { status: 400 })
    }
    
    const user = await collection.findOne({ _id: new ObjectId(params.id) })
    
    if (!user) {
      const response: ApiResponse<null> = {
        success: false,
        error: 'User not found'
      }
      return NextResponse.json(response, { status: 404 })
    }
    
    const response: ApiResponse<User> = {
      success: true,
      data: user
    }
    
    return NextResponse.json(response)
  } catch (error) {
    console.error('Error fetching user:', error)
    const response: ApiResponse<null> = {
      success: false,
      error: 'Failed to fetch user'
    }
    return NextResponse.json(response, { status: 500 })
  }
}

// PUT - Update a user
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const db = await getDatabase()
    const collection = db.collection<User>('users')
    
    if (!ObjectId.isValid(params.id)) {
      const response: ApiResponse<null> = {
        success: false,
        error: 'Invalid user ID'
      }
      return NextResponse.json(response, { status: 400 })
    }
    
    const body = await request.json()
    const updateData: Partial<User> = {
      ...body,
      updatedAt: new Date()
    }
    
    const result = await collection.findOneAndUpdate(
      { _id: new ObjectId(params.id) },
      { $set: updateData },
      { returnDocument: 'after' }
    )
    
    if (!result) {
      const response: ApiResponse<null> = {
        success: false,
        error: 'User not found'
      }
      return NextResponse.json(response, { status: 404 })
    }
    
    const response: ApiResponse<User> = {
      success: true,
      data: result as User,
      message: 'User updated successfully'
    }
    
    return NextResponse.json(response)
  } catch (error) {
    console.error('Error updating user:', error)
    const response: ApiResponse<null> = {
      success: false,
      error: 'Failed to update user'
    }
    return NextResponse.json(response, { status: 500 })
  }
}

// DELETE - Delete a user
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const db = await getDatabase()
    const collection = db.collection<User>('users')
    
    if (!ObjectId.isValid(params.id)) {
      const response: ApiResponse<null> = {
        success: false,
        error: 'Invalid user ID'
      }
      return NextResponse.json(response, { status: 400 })
    }
    
    const result = await collection.deleteOne({ _id: new ObjectId(params.id) })
    
    if (result.deletedCount === 0) {
      const response: ApiResponse<null> = {
        success: false,
        error: 'User not found'
      }
      return NextResponse.json(response, { status: 404 })
    }
    
    const response: ApiResponse<null> = {
      success: true,
      message: 'User deleted successfully'
    }
    
    return NextResponse.json(response)
  } catch (error) {
    console.error('Error deleting user:', error)
    const response: ApiResponse<null> = {
      success: false,
      error: 'Failed to delete user'
    }
    return NextResponse.json(response, { status: 500 })
  }
}
