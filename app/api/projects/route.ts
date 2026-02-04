import { NextRequest, NextResponse } from 'next/server'
import { getDatabase } from '@/lib/db'
import { Project, ApiResponse } from '@/lib/types'
import { ObjectId } from 'mongodb'

// GET - Fetch all projects or filter by category
export async function GET(request: NextRequest) {
  try {
    const db = await getDatabase()
    const collection = db.collection<Project>('projects')
    
    const { searchParams } = new URL(request.url)
    const category = searchParams.get('category')
    const status = searchParams.get('status')
    
    const query: any = {}
    if (category && category !== 'all') {
      query.category = category
    }
    if (status) {
      query.status = status
    }
    
    const projects = await collection.find(query).sort({ year: -1, createdAt: -1 }).toArray()
    
    const response: ApiResponse<Project[]> = {
      success: true,
      data: projects
    }
    
    return NextResponse.json(response)
  } catch (error) {
    console.error('Error fetching projects:', error)
    const response: ApiResponse<null> = {
      success: false,
      error: 'Failed to fetch projects'
    }
    return NextResponse.json(response, { status: 500 })
  }
}

// POST - Create a new project
export async function POST(request: NextRequest) {
  try {
    const db = await getDatabase()
    const collection = db.collection<Project>('projects')
    
    const body = await request.json()
    const project: Project = {
      title: body.title,
      category: body.category,
      description: body.description,
      image: body.image,
      technologies: body.technologies || [],
      features: body.features || [],
      liveUrl: body.liveUrl,
      githubUrl: body.githubUrl,
      status: body.status || 'planned',
      year: body.year || new Date().getFullYear().toString(),
      createdAt: new Date(),
      updatedAt: new Date()
    }
    
    // Validate required fields
    if (!project.title || !project.category || !project.description) {
      const response: ApiResponse<null> = {
        success: false,
        error: 'Missing required fields: title, category, description'
      }
      return NextResponse.json(response, { status: 400 })
    }
    
    const result = await collection.insertOne(project)
    
    const response: ApiResponse<Project> = {
      success: true,
      data: { ...project, _id: result.insertedId.toString() },
      message: 'Project created successfully'
    }
    
    return NextResponse.json(response, { status: 201 })
  } catch (error) {
    console.error('Error creating project:', error)
    const response: ApiResponse<null> = {
      success: false,
      error: 'Failed to create project'
    }
    return NextResponse.json(response, { status: 500 })
  }
}
