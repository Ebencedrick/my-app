import { NextRequest, NextResponse } from 'next/server'
import { getDatabase } from '@/lib/db'
import { Project, ApiResponse } from '@/lib/types'
import { ObjectId } from 'mongodb'

// GET - Fetch a single project by ID
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const db = await getDatabase()
    const collection = db.collection<Project>('projects')
    
    if (!ObjectId.isValid(params.id)) {
      const response: ApiResponse<null> = {
        success: false,
        error: 'Invalid project ID'
      }
      return NextResponse.json(response, { status: 400 })
    }
    
    const project = await collection.findOne({ _id: new ObjectId(params.id) })
    
    if (!project) {
      const response: ApiResponse<null> = {
        success: false,
        error: 'Project not found'
      }
      return NextResponse.json(response, { status: 404 })
    }
    
    const response: ApiResponse<Project> = {
      success: true,
      data: project
    }
    
    return NextResponse.json(response)
  } catch (error) {
    console.error('Error fetching project:', error)
    const response: ApiResponse<null> = {
      success: false,
      error: 'Failed to fetch project'
    }
    return NextResponse.json(response, { status: 500 })
  }
}

// PUT - Update a project
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const db = await getDatabase()
    const collection = db.collection<Project>('projects')
    
    if (!ObjectId.isValid(params.id)) {
      const response: ApiResponse<null> = {
        success: false,
        error: 'Invalid project ID'
      }
      return NextResponse.json(response, { status: 400 })
    }
    
    const body = await request.json()
    const updateData: Partial<Project> = {
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
        error: 'Project not found'
      }
      return NextResponse.json(response, { status: 404 })
    }
    
    const response: ApiResponse<Project> = {
      success: true,
      data: result as Project,
      message: 'Project updated successfully'
    }
    
    return NextResponse.json(response)
  } catch (error) {
    console.error('Error updating project:', error)
    const response: ApiResponse<null> = {
      success: false,
      error: 'Failed to update project'
    }
    return NextResponse.json(response, { status: 500 })
  }
}

// DELETE - Delete a project
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const db = await getDatabase()
    const collection = db.collection<Project>('projects')
    
    if (!ObjectId.isValid(params.id)) {
      const response: ApiResponse<null> = {
        success: false,
        error: 'Invalid project ID'
      }
      return NextResponse.json(response, { status: 400 })
    }
    
    const result = await collection.deleteOne({ _id: new ObjectId(params.id) })
    
    if (result.deletedCount === 0) {
      const response: ApiResponse<null> = {
        success: false,
        error: 'Project not found'
      }
      return NextResponse.json(response, { status: 404 })
    }
    
    const response: ApiResponse<null> = {
      success: true,
      message: 'Project deleted successfully'
    }
    
    return NextResponse.json(response)
  } catch (error) {
    console.error('Error deleting project:', error)
    const response: ApiResponse<null> = {
      success: false,
      error: 'Failed to delete project'
    }
    return NextResponse.json(response, { status: 500 })
  }
}
