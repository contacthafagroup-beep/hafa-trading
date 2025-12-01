export interface ChatMessage {
  id: string;
  text?: string;
  senderId: string;
  senderName: string;
  senderEmail: string;
  userId: string;
  timestamp: any;
  isAdmin: boolean;
  
  // Media fields
  messageType: 'text' | 'image' | 'video' | 'audio' | 'document' | 'voice' | 'gif' | 'sticker';
  fileUrl?: string;
  fileName?: string;
  fileSize?: number;
  fileType?: string;
  thumbnailUrl?: string;
  duration?: number;
  
  // Metadata
  isRead?: boolean;
  isEdited?: boolean;
  replyTo?: string;
}

export interface FileUpload {
  file: File;
  preview?: string;
  progress: number;
  status: 'pending' | 'uploading' | 'complete' | 'error';
  url?: string;
  error?: string;
}
