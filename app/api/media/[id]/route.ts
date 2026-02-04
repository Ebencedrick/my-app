import { NextRequest, NextResponse } from 'next/server'
import { getDatabase } from '@/lib/db'
import { MediaFile, ApiResponse } from '@/lib/types'
import { ObjectId } from 'mongodb'

// GET - Fetch a single media file by ID
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const db = await getDatabase()
    const collection = db.collection<MediaFile>('media_files')
    
    if (!ObjectId.isValid(params.id)) {
      const response: ApiResponse<null> = {
        success: false,
        error: 'Invalid media file ID'
      }
      return NextResponse.json(response, { status: 400 })
    }
    
    const mediaFile = await collection.findOne({ _id: new ObjectId(params.id) })
    
    if (!mediaFile) {
      const response: ApiResponse<null> = {
        success: false,
        error: 'Media file not found'
      }
      return NextResponse.json(response, { status: 404 })
    }
    
    const response: ApiResponse<MediaFile> = {
      success: true,
      data: mediaFile
    }
    
    return NextResponse.json(response)
  } catch (error) {
    console.error('Error fetching media file:', error)
    const response: ApiResponse<null> = {
      success: false,
      error: 'Failed to fetch media file'
    }
    return NextResponse.json(response, { status: 500 })
  }
}

// DELETE - Delete a media file
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const db = await getDatabase()
    const collection = db.collection<MediaFile>('media_files')
    
    if (!ObjectId.isValid(params.id)) {
      const response: ApiResponse<null> = {
        success: false,
        error: 'Invalid media file ID'
      }
      return NextResponse.json(response, { status: 400 })
    }
    
    // Get file info before deleting
    const mediaFile = await collection.findOne({ _id: new ObjectId(params.id) })
    
    if (!mediaFile) {
      const response: ApiResponse<null> = {
        success: false,
        error: 'Media file not found'
      }
      return NextResponse.json(response, { status: 404 })
    }
    
    // Delete from database
    const result = await collection.deleteOne({ _id: new ObjectId(params.id) })
    
    if (result.deletedCount === 0) {
      const response: ApiResponse<null> = {
        success: false,
        error: 'Failed to delete media file'
      }
      return NextResponse.json(response, { status: 500 })
    }
    
    // Optionally delete the physical file (uncomment if you want to delete files from disk)
    // const filepath = join(process.cwd(), 'public', mediaFile.url)
    // if (existsSync(filepath)) {
    //   await unlink(filepath)
    // }
    
    const response: ApiResponse<null> = {
      success: true,
      message: 'Media file deleted successfully'
    }
    
    return NextResponse.json(response)
  } catch (error) {
    console.error('Error deleting media file:', error)
    const response: ApiResponse<null> = {
      success: false,
      error: 'Failed to delete media file'
    }
    return NextResponse.json(response, { status: 500 })
  }
}
