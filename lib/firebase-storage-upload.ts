import { storage } from './firebase/config';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';

export async function uploadToFirebaseStorage(
  file: File,
  onProgress?: (progress: number) => void
): Promise<{ url: string; thumbnailUrl?: string; path: string }> {
  if (!storage) {
    throw new Error('Firebase Storage not initialized');
  }

  // Create a unique file path
  const timestamp = Date.now();
  const fileName = `${timestamp}-${file.name}`;
  const filePath = `chat-media/${fileName}`;
  
  // Create storage reference
  const storageRef = ref(storage, filePath);
  
  // Upload file with progress tracking
  const uploadTask = uploadBytesResumable(storageRef, file);

  return new Promise((resolve, reject) => {
    uploadTask.on(
      'state_changed',
      (snapshot) => {
        // Track upload progress
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        if (onProgress) {
          onProgress(Math.round(progress));
        }
      },
      (error) => {
        // Handle upload errors
        console.error('Upload error:', error);
        reject(new Error(`Upload failed: ${error.message}`));
      },
      async () => {
        // Upload completed successfully
        try {
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
          resolve({
            url: downloadURL,
            thumbnailUrl: downloadURL, // For images, you could generate thumbnails
            path: filePath
          });
        } catch (error) {
          reject(new Error('Failed to get download URL'));
        }
      }
    );
  });
}

export async function deleteFromFirebaseStorage(path: string): Promise<void> {
  if (!storage) {
    throw new Error('Firebase Storage not initialized');
  }

  try {
    const { ref: storageRef, deleteObject } = await import('firebase/storage');
    const fileRef = storageRef(storage, path);
    await deleteObject(fileRef);
  } catch (error) {
    console.error('Delete error:', error);
    throw new Error('Failed to delete file');
  }
}
