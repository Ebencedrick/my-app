import { NextRequest, NextResponse } from 'next/server'
import { getDatabase } from '@/lib/db'
import { MediaFile, ApiResponse } from '@/lib/types'
import { writeFile, mkdir } from 'fs/promises'
import { join } from 'path'
import { existsSync } from 'fs'

// GET - Fetch all media files or filter by type
export async function GET(request: NextRequest) {
  try {
    const db = await getDatabase()
    const collection = db.collection<MediaFile>('media_files')
    
    const { searchParams } = new URL(request.url)
    const type = searchParams.get('type')
    const category = searchParams.get('category')
    
    const query: any = {}
    if (type && type !== 'all') {
      query.type = type
    }
    if (category) {
      query.category = category
    }
    
    const mediaFiles = await collection.find(query).sort({ createdAt: -1 }).toArray()
    
    const response: ApiResponse<MediaFile[]> = {
      success: true,
      data: mediaFiles
    }
    
    return NextResponse.json(response)
  } catch (error) {
    console.error('Error fetching media files:', error)
    const response: ApiResponse<null> = {
      success: false,
      error: 'Failed to fetch media files'
    }
    return NextResponse.json(response, { status: 500 })
  }
}

// POST - Upload a media file
export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const file = formData.get('file') as File
    
    if (!file) {
      const response: ApiResponse<null> = {
        success: false,
        error: 'No file provided'
      }
      return NextResponse.json(response, { status: 400 })
    }

    // Validate file size (10MB limit)
    const maxSize = 10 * 1024 * 1024 // 10MB
    if (file.size > maxSize) {
      const response: ApiResponse<null> = {
        success: false,
        error: 'File size exceeds 10MB limit'
      }
      return NextResponse.json(response, { status: 400 })
    }

    // Determine file type based on MIME type
    const mimeType = file.type
    let fileType: 'image' | 'video' | 'audio' | 'document' = 'document'
    
    if (mimeType.startsWith('image/')) {
      fileType = 'image'
    } else if (mimeType.startsWith('video/')) {
      fileType = 'video'
    } else if (mimeType.startsWith('audio/')) {
      fileType = 'audio'
    }

    // Generate unique filename
    const timestamp = Date.now()
    const sanitizedName = file.name.replace(/[^a-zA-Z0-9.-]/g, '_')
    const filename = `${timestamp}_${sanitizedName}`
    
    // Create uploads directory if it doesn't exist
    const uploadsDir = join(process.cwd(), 'public', 'uploads')
    if (!existsSync(uploadsDir)) {
      await mkdir(uploadsDir, { recursive: true })
    }

    // Save file to public/uploads directory
    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)
    const filepath = join(uploadsDir, filename)
    await writeFile(filepath, buffer)

    // Generate URL for the file
    const url = `/uploads/${filename}`

    // Get additional metadata from form data
    const tags = formData.get('tags')?.toString().split(',').map(t => t.trim()).filter(t => t) || []
    const category = formData.get('category')?.toString() || 'Uncategorized'
    const uploadedBy = formData.get('uploadedBy')?.toString() || 'Admin'

    // Format file size
    const formatFileSize = (bytes: number): string => {
      if (bytes === 0) return '0 Bytes'
      const k = 1024
      const sizes = ['Bytes', 'KB', 'MB', 'GB']
      const i = Math.floor(Math.log(bytes) / Math.log(k))
      return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i]
    }

    // Get image dimensions if it's an image (simplified - would need image processing library for actual dimensions)
    let dimensions: string | undefined
    if (fileType === 'image') {
      // For now, we'll leave this empty. In production, you'd use a library like 'sharp' to get actual dimensions
      dimensions = undefined
    }

    // Create media file record
    const mediaFile: MediaFile = {
      name: filename,
      originalName: file.name,
      type: fileType,
      mimeType: mimeType,
      size: file.size,
      sizeFormatted: formatFileSize(file.size),
      url: url,
      thumbnail: fileType === 'image' ? url : undefined,
      dimensions: dimensions,
      tags: tags,
      category: category,
      uploadedBy: uploadedBy,
      uploadedDate: new Date().toISOString().split('T')[0],
      downloads: 0,
      views: 0,
      createdAt: new Date(),
      updatedAt: new Date()
    }

    // Save to database
    const db = await getDatabase()
    const collection = db.collection<MediaFile>('media_files')
    const result = await collection.insertOne(mediaFile)

    const response: ApiResponse<MediaFile> = {
      success: true,
      data: { ...mediaFile, _id: result.insertedId.toString() },
      message: 'File uploaded successfully'
    }

    return NextResponse.json(response, { status: 201 })
  } catch (error) {
    console.error('Error uploading file:', error)
    const response: ApiResponse<null> = {
      success: false,
      error: 'Failed to upload file'
    }
    return NextResponse.json(response, { status: 500 })
  }
}
