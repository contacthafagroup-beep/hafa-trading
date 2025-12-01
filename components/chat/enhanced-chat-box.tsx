'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { 
  X, Send, Paperclip, Smile, Mic, Image as ImageIcon, 
  Video, FileText, Loader2, Download, Play, Pause, Trash2
} from 'lucide-react';
import { useAuth } from '@/lib/contexts/auth-context';
import { useChat } from '@/contexts/chat-context';
import { db } from '@/lib/firebase/config';
import { collection, addDoc, query, orderBy, onSnapshot, serverTimestamp, where } from 'firebase/firestore';
import { useDropzone } from 'react-dropzone';
import EmojiPicker from 'emoji-picker-react';
import { ChatMessage, FileUpload } from '@/types/chat';
import { validateFile, getFileType, formatFileSize } from '@/lib/chat-utils';
import { uploadToCloudinary } from '@/lib/cloudinary-upload';
import toast from 'react-hot-toast';
import Link from 'next/link';
import RecordRTC from 'recordrtc';

export default function EnhancedChatBox() {
  const { isOpen, setIsOpen } = useChat();
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [loading, setLoading] = useState(false);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [fileUploads, setFileUploads] = useState<FileUpload[]>([]);
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const recorderRef = useRef<RecordRTC | null>(null);
  const recordingIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const { user, loading: authLoading } = useAuth();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Listen to messages in real-time
  useEffect(() => {
    if (!user || !isOpen || !db) return;

    const messagesRef = collection(db, 'chatMessages');
    const q = query(
      messagesRef,
      where('userId', '==', user.uid),
      orderBy('timestamp', 'asc')
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const msgs: ChatMessage[] = [];
      snapshot.forEach((doc) => {
        msgs.push({ id: doc.id, ...doc.data() } as ChatMessage);
      });
      setMessages(msgs);
    });

    return () => unsubscribe();
  }, [user, isOpen]);

  // File upload with dropzone
  const onDrop = async (acceptedFiles: File[]) => {
    for (const file of acceptedFiles) {
      const validation = validateFile(file);
      if (!validation.valid) {
        toast.error(validation.error || 'Invalid file');
        continue;
      }

      const fileUpload: FileUpload = {
        file,
        preview: file.type.startsWith('image/') ? URL.createObjectURL(file) : undefined,
        progress: 0,
        status: 'pending'
      };

      setFileUploads(prev => [...prev, fileUpload]);
      
      try {
        fileUpload.status = 'uploading';
        const result = await uploadToCloudinary(file, (progress) => {
          setFileUploads(prev => prev.map(f => 
            f.file === file ? { ...f, progress } : f
          ));
        });

        fileUpload.status = 'complete';
        fileUpload.url = result.url;
        
        // Send message with file
        await sendFileMessage(file, result.url, result.thumbnailUrl);
        
        // Remove from uploads
        setFileUploads(prev => prev.filter(f => f.file !== file));
        
      } catch (error) {
        console.error('Upload error:', error);
        fileUpload.status = 'error';
        fileUpload.error = 'Upload failed';
        toast.error('Failed to upload file');
      }
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    noClick: true,
    noKeyboard: true
  });

  // Send text message
  const sendMessage = async () => {
    console.log('sendMessage called', { message, user: !!user, db: !!db });
    
    if (!message.trim()) {
      console.log('Message is empty');
      return;
    }
    
    if (!user) {
      console.log('User not logged in');
      toast.error('Please login to send messages');
      return;
    }
    
    if (!db) {
      console.log('Database not initialized');
      toast.error('Database connection error');
      return;
    }

    setLoading(true);
    try {
      console.log('Sending message to Firestore...');
      await addDoc(collection(db, 'chatMessages'), {
        text: message.trim(),
        senderId: user.uid,
        senderName: user.displayName || user.email,
        senderEmail: user.email,
        userId: user.uid,
        timestamp: serverTimestamp(),
        isAdmin: false,
        messageType: 'text',
        isRead: false
      });

      console.log('Message sent successfully');
      setMessage('');
      toast.success('Message sent!');
    } catch (error) {
      console.error('Error sending message:', error);
      toast.error('Failed to send message');
    } finally {
      setLoading(false);
    }
  };

  // Send file message
  const sendFileMessage = async (file: File, fileUrl: string, thumbnailUrl?: string) => {
    if (!user || !db) return;

    const fileType = getFileType(file.type);
    
    try {
      await addDoc(collection(db, 'chatMessages'), {
        text: file.name,
        senderId: user.uid,
        senderName: user.displayName || user.email,
        senderEmail: user.email,
        userId: user.uid,
        timestamp: serverTimestamp(),
        isAdmin: false,
        messageType: fileType,
        fileUrl,
        fileName: file.name,
        fileSize: file.size,
        fileType: file.type,
        thumbnailUrl,
        isRead: false
      });

      toast.success('File sent!');
    } catch (error) {
      console.error('Error sending file:', error);
      toast.error('Failed to send file');
    }
  };

  // Voice recording
  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const recorder = new RecordRTC(stream, {
        type: 'audio',
        mimeType: 'audio/webm'
      });

      recorder.startRecording();
      recorderRef.current = recorder;
      setIsRecording(true);
      setRecordingTime(0);

      recordingIntervalRef.current = setInterval(() => {
        setRecordingTime(prev => prev + 1);
      }, 1000);

    } catch (error) {
      console.error('Recording error:', error);
      toast.error('Failed to start recording');
    }
  };

  const stopRecording = () => {
    if (!recorderRef.current) return;

    recorderRef.current.stopRecording(async () => {
      const blob = recorderRef.current!.getBlob();
      setAudioBlob(blob);
      setIsRecording(false);
      
      if (recordingIntervalRef.current) {
        clearInterval(recordingIntervalRef.current);
      }

      // Upload and send voice message
      const file = new File([blob], `voice-${Date.now()}.webm`, { type: 'audio/webm' });
      
      try {
        const result = await uploadToCloudinary(file);
        await sendVoiceMessage(result.url, recordingTime);
        setAudioBlob(null);
        setRecordingTime(0);
      } catch (error) {
        console.error('Voice upload error:', error);
        toast.error('Failed to send voice message');
      }
    });
  };

  const cancelRecording = () => {
    if (recorderRef.current) {
      recorderRef.current.stopRecording(() => {
        recorderRef.current?.destroy();
        recorderRef.current = null;
      });
    }
    
    if (recordingIntervalRef.current) {
      clearInterval(recordingIntervalRef.current);
    }
    
    setIsRecording(false);
    setRecordingTime(0);
    setAudioBlob(null);
  };

  const sendVoiceMessage = async (fileUrl: string, duration: number) => {
    if (!user || !db) return;

    try {
      await addDoc(collection(db, 'chatMessages'), {
        text: 'Voice message',
        senderId: user.uid,
        senderName: user.displayName || user.email,
        senderEmail: user.email,
        userId: user.uid,
        timestamp: serverTimestamp(),
        isAdmin: false,
        messageType: 'voice',
        fileUrl,
        duration,
        isRead: false
      });

      toast.success('Voice message sent!');
    } catch (error) {
      console.error('Error sending voice message:', error);
      toast.error('Failed to send voice message');
    }
  };

  // Emoji handling
  const onEmojiClick = (emojiData: any) => {
    const emoji = emojiData.emoji;
    const textarea = textareaRef.current;
    if (textarea) {
      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;
      const newText = message.substring(0, start) + emoji + message.substring(end);
      setMessage(newText);
      
      // Set cursor position after emoji
      setTimeout(() => {
        textarea.selectionStart = textarea.selectionEnd = start + emoji.length;
        textarea.focus();
      }, 0);
    }
  };

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  if (!isOpen) {
    return (
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(true)}
        className="fixed bottom-4 right-4 w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full shadow-lg flex items-center justify-center z-50 hover:shadow-xl transition-shadow"
      >
        <svg className="w-7 h-7 sm:w-8 sm:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
        </svg>
      </motion.button>
    );
  }

  if (!user && !authLoading) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="fixed bottom-4 right-4 w-[min(400px,calc(100vw-2rem))] z-50"
      >
        <Card className="w-full shadow-2xl overflow-hidden">
          <div className="p-6 text-center">
            <h3 className="font-bold text-lg mb-2">Welcome!</h3>
            <p className="text-sm text-gray-600 mb-4">Please login to start chatting</p>
            <div className="space-y-2">
              <Link href="/login">
                <Button className="w-full">Login</Button>
              </Link>
              <Link href="/register">
                <Button variant="outline" className="w-full">Create Account</Button>
              </Link>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsOpen(false)}
              className="mt-4"
            >
              Close
            </Button>
          </div>
        </Card>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="fixed bottom-4 right-4 w-[min(400px,calc(100vw-2rem))] h-[min(600px,calc(100vh-2rem))] z-50"
      {...getRootProps()}
    >
      <Card className="h-full w-full flex flex-col shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-4 rounded-t-lg flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
            <h3 className="font-semibold">Live Chat Support</h3>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsOpen(false)}
            className="text-white hover:bg-white/20"
          >
            <X className="h-5 w-5" />
          </Button>
        </div>

        {/* Drag & Drop Overlay */}
        {isDragActive && (
          <div className="absolute inset-0 bg-blue-500/20 backdrop-blur-sm flex items-center justify-center z-10 rounded-lg border-4 border-dashed border-blue-500">
            <div className="text-center">
              <Paperclip className="h-12 w-12 mx-auto mb-2 text-blue-600" />
              <p className="font-semibold text-blue-600">Drop files here</p>
            </div>
          </div>
        )}

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-50 dark:bg-gray-900">
          {messages.map((msg) => (
            <MessageBubble key={msg.id} message={msg} />
          ))}
          
          {/* File Upload Progress */}
          {fileUploads.map((upload, index) => (
            <div key={index} className="flex justify-end">
              <div className="bg-blue-100 dark:bg-blue-900/30 rounded-lg p-3 max-w-[80%]">
                <div className="flex items-center gap-2 mb-2">
                  <FileText className="h-4 w-4" />
                  <span className="text-sm font-medium">{upload.file.name}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-blue-600 h-2 rounded-full transition-all"
                    style={{ width: `${upload.progress}%` }}
                  ></div>
                </div>
                <p className="text-xs text-gray-600 mt-1">{upload.progress}%</p>
              </div>
            </div>
          ))}
          
          <div ref={messagesEndRef} />
        </div>

        {/* Recording Indicator */}
        {isRecording && (
          <div className="px-4 py-2 bg-red-50 dark:bg-red-900/20 border-t flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
              <span className="text-sm font-medium text-red-600">Recording... {formatDuration(recordingTime)}</span>
            </div>
            <div className="flex gap-2">
              <Button size="sm" variant="ghost" onClick={cancelRecording}>
                <Trash2 className="h-4 w-4" />
              </Button>
              <Button size="sm" onClick={stopRecording} className="bg-red-600">
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        )}

        {/* Emoji Picker */}
        {showEmojiPicker && (
          <>
            {/* Backdrop to close emoji picker */}
            <div 
              className="fixed inset-0 z-10" 
              onClick={() => setShowEmojiPicker(false)}
            />
            <div className="absolute bottom-20 right-0 z-20">
              <div className="relative">
                {/* Close button */}
                <button
                  onClick={() => setShowEmojiPicker(false)}
                  className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 hover:bg-red-600 text-white rounded-full flex items-center justify-center shadow-lg z-30 transition-colors"
                  title="Close emoji picker"
                >
                  <X className="h-4 w-4" />
                </button>
                <EmojiPicker onEmojiClick={onEmojiClick} />
              </div>
            </div>
          </>
        )}

        {/* Input Area */}
        <div className="p-4 border-t bg-white dark:bg-gray-800">
          <div className="flex items-end gap-2 mb-2">
            <input {...getInputProps()} id="file-input-hidden" style={{ display: 'none' }} />
            
            <Button
              variant="ghost"
              size="icon"
              onClick={() => {
                const input = document.getElementById('file-input-hidden') as HTMLInputElement;
                if (input) {
                  input.click();
                }
              }}
              title="Attach file"
            >
              <Paperclip className="h-5 w-5" />
            </Button>
            
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setShowEmojiPicker(!showEmojiPicker)}
              title="Add emoji"
            >
              <Smile className="h-5 w-5" />
            </Button>
            
            <Button
              variant="ghost"
              size="icon"
              onClick={isRecording ? stopRecording : startRecording}
              title="Voice message"
              className={isRecording ? 'text-red-600' : ''}
            >
              <Mic className="h-5 w-5" />
            </Button>
          </div>

          <div className="flex gap-2">
            <Textarea
              ref={textareaRef}
              value={message}
              onChange={(e) => {
                console.log('Textarea onChange:', e.target.value);
                setMessage(e.target.value);
              }}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  console.log('Enter key pressed');
                  sendMessage();
                }
              }}
              placeholder="Type a message..."
              className="flex-1 min-h-[40px] max-h-[120px] resize-none"
              rows={1}
            />
            <Button
              onClick={(e) => {
                e.preventDefault();
                console.log('Send button clicked');
                sendMessage();
              }}
              disabled={!message.trim() || loading}
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
            >
              {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : <Send className="h-5 w-5" />}
            </Button>
          </div>
        </div>
      </Card>
    </motion.div>
  );
}

// Message Bubble Component
function MessageBubble({ message }: { message: ChatMessage }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  const toggleAudio = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const isAdmin = message.isAdmin;
  const alignment = isAdmin ? 'justify-start' : 'justify-end';
  const bgColor = isAdmin ? 'bg-white dark:bg-gray-800 border' : 'bg-gradient-to-r from-blue-600 to-purple-600 text-white';

  return (
    <div className={`flex ${alignment}`}>
      <div className={`${bgColor} rounded-lg p-3 max-w-[80%] shadow-sm`}>
        <p className="text-xs opacity-70 mb-1">{message.senderName}</p>
        
        {/* Text Message */}
        {message.messageType === 'text' && (
          <p className="text-sm whitespace-pre-wrap break-words">{message.text}</p>
        )}

        {/* Image */}
        {message.messageType === 'image' && (
          <div>
            <img 
              src={message.fileUrl} 
              alt={message.fileName}
              className="rounded-lg max-w-full h-auto mb-2"
            />
            {message.text && <p className="text-sm">{message.text}</p>}
          </div>
        )}

        {/* Video */}
        {message.messageType === 'video' && (
          <div>
            <video 
              src={message.fileUrl} 
              controls
              className="rounded-lg max-w-full h-auto mb-2"
            />
            {message.text && <p className="text-sm">{message.text}</p>}
          </div>
        )}

        {/* Audio */}
        {message.messageType === 'audio' && (
          <div>
            <audio src={message.fileUrl} controls className="w-full mb-2" />
            {message.text && <p className="text-sm">{message.text}</p>}
          </div>
        )}

        {/* Voice Message */}
        {message.messageType === 'voice' && (
          <div className="flex items-center gap-2">
            <Button size="sm" variant="ghost" onClick={toggleAudio}>
              {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
            </Button>
            <audio ref={audioRef} src={message.fileUrl} onEnded={() => setIsPlaying(false)} />
            <span className="text-sm">{message.duration ? formatDuration(message.duration) : '0:00'}</span>
          </div>
        )}

        {/* Document */}
        {message.messageType === 'document' && (
          <a 
            href={message.fileUrl} 
            download={message.fileName}
            className="flex items-center gap-2 hover:underline"
          >
            <FileText className="h-5 w-5" />
            <div>
              <p className="text-sm font-medium">{message.fileName}</p>
              {message.fileSize && (
                <p className="text-xs opacity-70">{formatFileSize(message.fileSize)}</p>
              )}
            </div>
            <Download className="h-4 w-4 ml-auto" />
          </a>
        )}

        <p className="text-xs opacity-50 mt-1">
          {message.timestamp?.toDate?.()?.toLocaleTimeString() || 'Just now'}
        </p>
      </div>
    </div>
  );
}

function formatDuration(seconds: number) {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}:${secs.toString().padStart(2, '0')}`;
}
