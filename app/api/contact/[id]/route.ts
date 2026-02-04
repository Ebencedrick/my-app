import { NextRequest, NextResponse } from 'next/server'
import { getDatabase } from '@/lib/db'
import { ContactSubmission, ApiResponse } from '@/lib/types'
import { ObjectId } from 'mongodb'

// GET - Fetch a single contact submission by ID
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const db = await getDatabase()
    const collection = db.collection<ContactSubmission>('contact_submissions')
    
    if (!ObjectId.isValid(params.id)) {
      const response: ApiResponse<null> = {
        success: false,
        error: 'Invalid submission ID'
      }
      return NextResponse.json(response, { status: 400 })
    }
    
    const submission = await collection.findOne({ _id: new ObjectId(params.id) })
    
    if (!submission) {
      const response: ApiResponse<null> = {
        success: false,
        error: 'Submission not found'
      }
      return NextResponse.json(response, { status: 404 })
    }
    
    const response: ApiResponse<ContactSubmission> = {
      success: true,
      data: submission
    }
    
    return NextResponse.json(response)
  } catch (error) {
    console.error('Error fetching contact submission:', error)
    const response: ApiResponse<null> = {
      success: false,
      error: 'Failed to fetch contact submission'
    }
    return NextResponse.json(response, { status: 500 })
  }
}

// PUT - Update contact submission status (e.g., mark as read/replied)
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const db = await getDatabase()
    const collection = db.collection<ContactSubmission>('contact_submissions')
    
    if (!ObjectId.isValid(params.id)) {
      const response: ApiResponse<null> = {
        success: false,
        error: 'Invalid submission ID'
      }
      return NextResponse.json(response, { status: 400 })
    }
    
    const body = await request.json()
    const updateData: Partial<ContactSubmission> = {
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
        error: 'Submission not found'
      }
      return NextResponse.json(response, { status: 404 })
    }
    
    const response: ApiResponse<ContactSubmission> = {
      success: true,
      data: result as ContactSubmission,
      message: 'Submission updated successfully'
    }
    
    return NextResponse.json(response)
  } catch (error) {
    console.error('Error updating contact submission:', error)
    const response: ApiResponse<null> = {
      success: false,
      error: 'Failed to update submission'
    }
    return NextResponse.json(response, { status: 500 })
  }
}

// DELETE - Delete a contact submission
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const db = await getDatabase()
    const collection = db.collection<ContactSubmission>('contact_submissions')
    
    if (!ObjectId.isValid(params.id)) {
      const response: ApiResponse<null> = {
        success: false,
        error: 'Invalid submission ID'
      }
      return NextResponse.json(response, { status: 400 })
    }
    
    const result = await collection.deleteOne({ _id: new ObjectId(params.id) })
    
    if (result.deletedCount === 0) {
      const response: ApiResponse<null> = {
        success: false,
        error: 'Submission not found'
      }
      return NextResponse.json(response, { status: 404 })
    }
    
    const response: ApiResponse<null> = {
      success: true,
      message: 'Submission deleted successfully'
    }
    
    return NextResponse.json(response)
  } catch (error) {
    console.error('Error deleting contact submission:', error)
    const response: ApiResponse<null> = {
      success: false,
      error: 'Failed to delete submission'
    }
    return NextResponse.json(response, { status: 500 })
  }
}
