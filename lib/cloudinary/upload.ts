'use client';

export interface UploadResult {
  url: string;
  publicId: string;
  format: string;
  resourceType: 'image' | 'video' | 'raw' | 'auto';
}

/**
 * Upload file to Cloudinary using unsigned upload
 * @param file - File to upload
 * @param folder - Folder path in Cloudinary (e.g., 'products', 'blog')
 * @returns Upload result with URL and public ID
 */
export async function uploadToCloudinary(
  file: File,
  folder: string = 'hafa-trading'
): Promise<UploadResult> {
  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
  const uploadPreset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;

  if (!cloudName || !uploadPreset) {
    throw new Error('Cloudinary configuration missing');
  }

  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', uploadPreset);
  formData.append('folder', folder);

  // Determine resource type based on file type
  const resourceType = file.type.startsWith('video/') 
    ? 'video' 
    : file.type.startsWith('audio/')
    ? 'video' // Cloudinary uses 'video' for audio files
    : 'image';

  const response = await fetch(
    `https://api.cloudinary.com/v1_1/${cloudName}/${resourceType}/upload`,
    {
      method: 'POST',
      body: formData,
    }
  );

  if (!response.ok) {
    throw new Error('Upload failed');
  }

  const data = await response.json();

  return {
    url: data.secure_url,
    publicId: data.public_id,
    format: data.format,
    resourceType: data.resource_type,
  };
}

/**
 * Delete file from Cloudinary
 * @param publicId - Public ID of the file to delete
 */
export async function deleteFromCloudinary(publicId: string): Promise<void> {
  // This requires server-side API call with API secret
  // We'll create an API route for this
  const response = await fetch('/api/cloudinary/delete', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ publicId }),
  });

  if (!response.ok) {
    throw new Error('Delete failed');
  }
}

/**
 * Get optimized image URL with transformations
 * @param publicId - Public ID of the image
 * @param options - Transformation options
 */
export function getOptimizedImageUrl(
  publicId: string,
  options: {
    width?: number;
    height?: number;
    crop?: 'fill' | 'fit' | 'scale' | 'thumb';
    quality?: 'auto' | number;
    format?: 'auto' | 'webp' | 'jpg' | 'png';
  } = {}
): string {
  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
  const {
    width,
    height,
    crop = 'fill',
    quality = 'auto',
    format = 'auto',
  } = options;

  let transformations = `q_${quality},f_${format}`;
  
  if (width || height) {
    transformations += `,c_${crop}`;
    if (width) transformations += `,w_${width}`;
    if (height) transformations += `,h_${height}`;
  }

  return `https://res.cloudinary.com/${cloudName}/image/upload/${transformations}/${publicId}`;
}
