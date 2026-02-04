import { NextRequest, NextResponse } from 'next/server'
import { getDatabase } from '@/lib/db'
import { ContactSubmission, ApiResponse } from '@/lib/types'

// POST - Submit contact form
export async function POST(request: NextRequest) {
  try {
    const db = await getDatabase()
    const collection = db.collection<ContactSubmission>('contact_submissions')
    
    const body = await request.json()
    const submission: ContactSubmission = {
      name: body.name,
      email: body.email,
      subject: body.subject,
      message: body.message,
      status: 'new',
      createdAt: new Date(),
      updatedAt: new Date()
    }
    
    // Validate required fields
    if (!submission.name || !submission.email || !submission.message) {
      const response: ApiResponse<null> = {
        success: false,
        error: 'Missing required fields: name, email, message'
      }
      return NextResponse.json(response, { status: 400 })
    }
    
    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(submission.email)) {
      const response: ApiResponse<null> = {
        success: false,
        error: 'Invalid email format'
      }
      return NextResponse.json(response, { status: 400 })
    }
    
    const result = await collection.insertOne(submission)
    
    const response: ApiResponse<ContactSubmission> = {
      success: true,
      data: { ...submission, _id: result.insertedId.toString() },
      message: 'Contact form submitted successfully'
    }
    
    return NextResponse.json(response, { status: 201 })
  } catch (error) {
    console.error('Error submitting contact form:', error)
    const response: ApiResponse<null> = {
      success: false,
      error: 'Failed to submit contact form'
    }
    return NextResponse.json(response, { status: 500 })
  }
}

// GET - Fetch all contact submissions (admin only - should add auth later)
export async function GET(request: NextRequest) {
  try {
    const db = await getDatabase()
    const collection = db.collection<ContactSubmission>('contact_submissions')
    
    const { searchParams } = new URL(request.url)
    const status = searchParams.get('status')
    
    const query: any = {}
    if (status) {
      query.status = status
    }
    
    const submissions = await collection.find(query).sort({ createdAt: -1 }).toArray()
    
    const response: ApiResponse<ContactSubmission[]> = {
      success: true,
      data: submissions
    }
    
    return NextResponse.json(response)
  } catch (error) {
    console.error('Error fetching contact submissions:', error)
    const response: ApiResponse<null> = {
      success: false,
      error: 'Failed to fetch contact submissions'
    }
    return NextResponse.json(response, { status: 500 })
  }
}
