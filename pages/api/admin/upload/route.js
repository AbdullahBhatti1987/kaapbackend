import { NextResponse } from 'next/server'
import cloudinary from '@/lib/cloudinary'
import { writeFile } from 'fs/promises'
import path from 'path'
import { v4 as uuidv4 } from 'uuid'

export async function POST(req) {
  const formData = await req.formData()
  const file = formData.get('image')

  if (!file) return NextResponse.json({ error: 'No image file provided' }, { status: 400 })

  const bytes = await file.arrayBuffer()
  const buffer = Buffer.from(bytes)

  const tempFilename = `${uuidv4()}.jpg`
  const tempFilePath = path.join('/tmp', tempFilename)

  await writeFile(tempFilePath, buffer)

  const uploadResult = await cloudinary.uploader.upload(tempFilePath, {
    folder: 'ecommerce-products',
  })

  return NextResponse.json({ url: uploadResult.secure_url })
}
