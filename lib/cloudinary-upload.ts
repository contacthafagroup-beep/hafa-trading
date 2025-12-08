export async function uploadToCloudinary(
  file: File,
  onProgress?: (progress: number) => void
): Promise<{ url: string; thumbnailUrl?: string; publicId: string }> {
  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
  const uploadPreset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;

  console.log('Cloudinary Config Check:', {
    cloudName,
    uploadPreset,
    hasCloudName: !!cloudName,
    hasUploadPreset: !!uploadPreset,
    allEnvVars: Object.keys(process.env).filter(key => key.includes('CLOUDINARY'))
  });

  if (!cloudName || !uploadPreset) {
    console.error('Missing Cloudinary configuration:', { cloudName, uploadPreset });
    throw new Error(`Cloudinary configuration missing. CloudName: ${cloudName ? 'OK' : 'MISSING'}, UploadPreset: ${uploadPreset ? 'OK' : 'MISSING'}`);
  }

  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', uploadPreset);
  formData.append('folder', 'chat-media');

  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    
    xhr.upload.addEventListener('progress', (e) => {
      if (e.lengthComputable && onProgress) {
        const progress = Math.round((e.loaded / e.total) * 100);
        onProgress(progress);
      }
    });

    xhr.addEventListener('load', () => {
      console.log('Cloudinary upload response:', {
        status: xhr.status,
        statusText: xhr.statusText,
        response: xhr.responseText
      });
      
      if (xhr.status === 200) {
        try {
          const response = JSON.parse(xhr.responseText);
          console.log('Upload successful:', response);
          resolve({
            url: response.secure_url,
            thumbnailUrl: response.eager?.[0]?.secure_url || response.secure_url,
            publicId: response.public_id
          });
        } catch (error) {
          console.error('Failed to parse response:', error);
          reject(new Error('Failed to parse upload response'));
        }
      } else {
        try {
          const errorResponse = JSON.parse(xhr.responseText);
          console.error('Upload failed:', errorResponse);
          reject(new Error(`Upload failed: ${errorResponse.error?.message || xhr.statusText}`));
        } catch {
          console.error('Upload failed with status:', xhr.status);
          reject(new Error(`Upload failed with status ${xhr.status}`));
        }
      }
    });

    xhr.addEventListener('error', () => {
      reject(new Error('Network error during upload'));
    });

    xhr.open('POST', `https://api.cloudinary.com/v1_1/${cloudName}/auto/upload`);
    xhr.send(formData);
  });
}

export async function deleteFromCloudinary(publicId: string): Promise<void> {
  // This would require a backend endpoint for security
  // Cloudinary delete requires API secret which shouldn't be exposed
  console.log('Delete from Cloudinary:', publicId);
}
