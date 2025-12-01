// Chat utility functions for file uploads and media handling

export const ALLOWED_FILE_TYPES = {
  images: ['image/jpeg', 'image/png', 'image/gif', 'image/webp'],
  videos: ['video/mp4', 'video/webm', 'video/ogg'],
  audio: ['audio/mp3', 'audio/wav', 'audio/ogg', 'audio/mpeg'],
  documents: ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'],
};

export const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB

export function validateFile(file: File): { valid: boolean; error?: string } {
  if (file.size > MAX_FILE_SIZE) {
    return { valid: false, error: 'File size must be less than 10MB' };
  }

  const allAllowedTypes = [
    ...ALLOWED_FILE_TYPES.images,
    ...ALLOWED_FILE_TYPES.videos,
    ...ALLOWED_FILE_TYPES.audio,
    ...ALLOWED_FILE_TYPES.documents,
  ];

  if (!allAllowedTypes.includes(file.type)) {
    return { valid: false, error: 'File type not supported' };
  }

  return { valid: true };
}

export function getFileType(mimeType: string): 'image' | 'video' | 'audio' | 'document' | 'unknown' {
  if (ALLOWED_FILE_TYPES.images.includes(mimeType)) return 'image';
  if (ALLOWED_FILE_TYPES.videos.includes(mimeType)) return 'video';
  if (ALLOWED_FILE_TYPES.audio.includes(mimeType)) return 'audio';
  if (ALLOWED_FILE_TYPES.documents.includes(mimeType)) return 'document';
  return 'unknown';
}

export function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
}

// Popular emojis for quick access
export const POPULAR_EMOJIS = [
  '😀', '😃', '😄', '😁', '😅', '😂', '🤣', '😊', '😇', '🙂',
  '😉', '😌', '😍', '🥰', '😘', '😗', '😙', '😚', '😋', '😛',
  '😝', '😜', '🤪', '🤨', '🧐', '🤓', '😎', '🥳', '😏', '😒',
  '😞', '😔', '😟', '😕', '🙁', '☹️', '😣', '😖', '😫', '😩',
  '🥺', '😢', '😭', '😤', '😠', '😡', '🤬', '🤯', '😳', '🥵',
  '👍', '👎', '👌', '✌️', '🤞', '🤝', '👏', '🙌', '👐', '🤲',
  '🙏', '✍️', '💪', '🦾', '🦿', '🦵', '🦶', '👂', '🦻', '👃',
  '❤️', '🧡', '💛', '💚', '💙', '💜', '🖤', '🤍', '🤎', '💔',
  '❣️', '💕', '💞', '💓', '💗', '💖', '💘', '💝', '💟', '☮️',
  '✨', '⭐', '🌟', '💫', '✅', '❌', '⚠️', '🔥', '💯', '🎉'
];

// GIF search categories
export const GIF_CATEGORIES = [
  'happy', 'sad', 'excited', 'love', 'funny', 'dance', 'celebrate',
  'thumbs up', 'ok', 'yes', 'no', 'thinking', 'confused', 'shocked'
];
