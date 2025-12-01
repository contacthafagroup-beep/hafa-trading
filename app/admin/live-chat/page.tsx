'use client';

import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/lib/contexts/auth-context';
import { db } from '@/lib/firebase/config';
import { 
  collection, 
  query, 
  orderBy, 
  onSnapshot, 
  addDoc, 
  serverTimestamp,
  where,
  getDocs,
  updateDoc,
  doc
} from 'firebase/firestore';
import { 
  Send, User, MessageCircle, Paperclip, Smile, Mic, 
  FileText, Download, Play, Pause, Trash2, X, Loader2 
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useDropzone } from 'react-dropzone';
import EmojiPicker from 'emoji-picker-react';
import { ChatMessage, FileUpload } from '@/types/chat';
import { validateFile, getFileType, formatFileSize } from '@/lib/chat-utils';
import { uploadToCloudinary } from '@/lib/cloudinary-upload';
import toast from 'react-hot-toast';

// Dynamic import for RecordRTC to avoid SSR issues
let RecordRTC: any = null;
if (typeof window !== 'undefined') {
  RecordRTC = require('recordrtc');
}

interface Message extends ChatMessage {
  read: boolean;
}

interface ChatUser {
  userId: string;
  userName: string;
  userEmail: string;
  lastMessage: string;
  unreadCount: number;
  lastTimestamp: any;
}

export default function AdminLiveChatPage() {
  const [selectedUser, setSelectedUser] = useState<string | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [chatUsers, setChatUsers] = useState<ChatUser[]>([]);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [fileUploads, setFileUploads] = useState<FileUpload[]>([]);
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const recorderRef = useRef<RecordRTC | null>(null);
  const recordingIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const { user, loading: authLoading } = useAuth();

  // Scroll to bottom
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Get all chat users
  useEffect(() => {
    if (!db) {
      console.error('Firebase not initialized');
      return;
    }

    console.log('Setting up chat users listener...');
    const messagesRef = collection(db, 'chatMessages');
    // Query without orderBy to avoid index requirement - we'll sort client-side
    const q = query(messagesRef);

    const unsubscribe = onSnapshot(q, 
      (snapshot) => {
        console.log('✅ Snapshot received, total documents:', snapshot.size);
        const usersMap = new Map<string, ChatUser>();
        const allMessages: any[] = [];

        snapshot.forEach((doc) => {
          const data = doc.data();
          console.log('📨 Message document:', doc.id, data);
          allMessages.push(data);
        });

        console.log('📊 Total messages loaded:', allMessages.length);

      // Sort messages by timestamp (newest first)
      allMessages.sort((a, b) => {
        const aTime = a.timestamp?.toMillis?.() || 0;
        const bTime = b.timestamp?.toMillis?.() || 0;
        return bTime - aTime;
      });

      // Build users map from sorted messages
      allMessages.forEach((data) => {
        const userId = data.userId;

        if (!userId) {
          console.warn('Message without userId:', data);
          return;
        }

        if (!usersMap.has(userId)) {
          usersMap.set(userId, {
            userId,
            userName: data.senderName || 'Unknown User',
            userEmail: data.senderEmail || 'No email',
            lastMessage: data.text || '',
            unreadCount: !data.read && !data.isAdmin ? 1 : 0,
            lastTimestamp: data.timestamp
          });
        } else {
          const existing = usersMap.get(userId)!;
          if (!data.read && !data.isAdmin) {
            existing.unreadCount++;
          }
        }
      });

      const users = Array.from(usersMap.values());
      console.log('👥 Chat users extracted:', users.length, users);
      setChatUsers(users);
    }, 
    (error) => {
      console.error('❌ Error loading chat users:', error);
      console.error('Error code:', error.code);
      console.error('Error message:', error.message);
      
      // Check if it's a permission error
      if (error.code === 'permission-denied') {
        console.error('🚫 PERMISSION DENIED: You need to deploy the updated Firestore rules!');
        console.error('Run: firebase deploy --only firestore:rules');
      }
    });

    return () => unsubscribe();
  }, []);

  // Listen to messages for selected user
  useEffect(() => {
    if (!selectedUser || !db) return;

    const messagesRef = collection(db, 'chatMessages');
    const q = query(
      messagesRef,
      where('userId', '==', selectedUser),
      orderBy('timestamp', 'asc')
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const msgs: Message[] = [];
      snapshot.forEach((doc) => {
        msgs.push({ id: doc.id, ...doc.data() } as Message);
      });
      setMessages(msgs);

      // Mark messages as read
      snapshot.forEach(async (docSnapshot) => {
        const data = docSnapshot.data();
        if (!data.read && !data.isAdmin && db) {
          await updateDoc(doc(db, 'chatMessages', docSnapshot.id), { read: true });
        }
      });
    });

    return () => unsubscribe();
  }, [selectedUser]);

  // File upload with dropzone
  const onDrop = async (acceptedFiles: File[]) => {
    if (!selectedUser) {
      toast.error('Please select a user first');
      return;
    }

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
    if (!message.trim() || !selectedUser || !user || !db) return;

    setLoading(true);
    try {
      await addDoc(collection(db, 'chatMessages'), {
        text: message.trim(),
        senderId: user.uid,
        senderName: 'Admin',
        senderEmail: user.email,
        userId: selectedUser,
        timestamp: serverTimestamp(),
        isAdmin: true,
        messageType: 'text',
        isRead: false,
        read: true
      });

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
    if (!user || !db || !selectedUser) return;

    const fileType = getFileType(file.type);
    
    try {
      await addDoc(collection(db, 'chatMessages'), {
        text: file.name,
        senderId: user.uid,
        senderName: 'Admin',
        senderEmail: user.email,
        userId: selectedUser,
        timestamp: serverTimestamp(),
        isAdmin: true,
        messageType: fileType,
        fileUrl,
        fileName: file.name,
        fileSize: file.size,
        fileType: file.type,
        thumbnailUrl,
        isRead: false,
        read: true
      });

      toast.success('File sent!');
    } catch (error) {
      console.error('Error sending file:', error);
      toast.error('Failed to send file');
    }
  };

  // Voice recording
  const startRecording = async () => {
    if (!RecordRTC) {
      toast.error('Voice recording not available');
      return;
    }
    
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
      setIsRecording(false);
      
      if (recordingIntervalRef.current) {
        clearInterval(recordingIntervalRef.current);
      }

      // Upload and send voice message
      const file = new File([blob], `voice-${Date.now()}.webm`, { type: 'audio/webm' });
      
      try {
        const result = await uploadToCloudinary(file);
        await sendVoiceMessage(result.url, recordingTime);
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
  };

  const sendVoiceMessage = async (fileUrl: string, duration: number) => {
    if (!user || !db || !selectedUser) return;

    try {
      await addDoc(collection(db, 'chatMessages'), {
        text: 'Voice message',
        senderId: user.uid,
        senderName: 'Admin',
        senderEmail: user.email,
        userId: selectedUser,
        timestamp: serverTimestamp(),
        isAdmin: true,
        messageType: 'voice',
        fileUrl,
        duration,
        isRead: false,
        read: true
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



  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            className="text-6xl mb-4"
          >
            ⏳
          </motion.div>
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6"
        >
          <h1 className="text-3xl font-bold mb-2">Live Chat Management</h1>
          <p className="text-muted-foreground">Respond to customer inquiries in real-time</p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {/* Users List */}
          <Card className="md:col-span-1">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageCircle className="w-5 h-5" />
                Active Chats ({chatUsers.length})
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="max-h-[600px] overflow-y-auto">
                {chatUsers.length === 0 ? (
                  <div className="p-6 text-center text-muted-foreground">
                    <User className="w-12 h-12 mx-auto mb-2 opacity-50" />
                    <p>No active chats</p>
                  </div>
                ) : (
                  chatUsers.map((chatUser) => (
                    <motion.button
                      key={chatUser.userId}
                      whileHover={{ scale: 1.02 }}
                      onClick={() => setSelectedUser(chatUser.userId)}
                      className={`w-full p-4 border-b text-left transition-colors ${
                        selectedUser === chatUser.userId
                          ? 'bg-blue-50 dark:bg-blue-900/20 border-l-4 border-l-blue-600'
                          : 'hover:bg-gray-50 dark:hover:bg-gray-800'
                      }`}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold">
                              {chatUser.userName.charAt(0).toUpperCase()}
                            </div>
                            <div className="flex-1">
                              <p className="font-semibold">{chatUser.userName}</p>
                              <p className="text-xs text-muted-foreground">{chatUser.userEmail}</p>
                            </div>
                          </div>
                          <p className="text-sm text-muted-foreground mt-2 truncate">
                            {chatUser.lastMessage}
                          </p>
                        </div>
                        {chatUser.unreadCount > 0 && (
                          <div className="w-6 h-6 rounded-full bg-red-500 text-white text-xs flex items-center justify-center font-bold">
                            {chatUser.unreadCount}
                          </div>
                        )}
                      </div>
                    </motion.button>
                  ))
                )}
              </div>
            </CardContent>
          </Card>

          {/* Chat Area */}
          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle>
                {selectedUser ? (
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold">
                      {chatUsers.find(u => u.userId === selectedUser)?.userName.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <p>{chatUsers.find(u => u.userId === selectedUser)?.userName}</p>
                      <p className="text-sm font-normal text-muted-foreground">
                        {chatUsers.find(u => u.userId === selectedUser)?.userEmail}
                      </p>
                    </div>
                  </div>
                ) : (
                  'Select a chat to start'
                )}
              </CardTitle>
            </CardHeader>
            <CardContent>
              {!selectedUser ? (
                <div className="h-[500px] flex items-center justify-center text-muted-foreground">
                  <div className="text-center">
                    <MessageCircle className="w-16 h-16 mx-auto mb-4 opacity-50" />
                    <p>Select a customer to view conversation</p>
                  </div>
                </div>
              ) : (
                <>
                  {/* Messages */}
                  <div className="h-[450px] overflow-y-auto mb-4 space-y-3" {...getRootProps()}>
                    {/* Drag & Drop Overlay */}
                    {isDragActive && (
                      <div className="absolute inset-0 bg-blue-500/20 backdrop-blur-sm flex items-center justify-center z-10 rounded-lg border-4 border-dashed border-blue-500">
                        <div className="text-center">
                          <Paperclip className="h-12 w-12 mx-auto mb-2 text-blue-600" />
                          <p className="font-semibold text-blue-600">Drop files here</p>
                        </div>
                      </div>
                    )}

                    {messages.map((msg, index) => (
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
                    <div className="mb-2 px-4 py-2 bg-red-50 dark:bg-red-900/20 border rounded-lg flex items-center justify-between">
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
                    <div className="relative mb-2">
                      {/* Backdrop to close emoji picker */}
                      <div 
                        className="fixed inset-0 z-10" 
                        onClick={() => setShowEmojiPicker(false)}
                      />
                      <div className="absolute bottom-0 right-0 z-20">
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
                    </div>
                  )}

                  {/* Input Area */}
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <input {...getInputProps()} id="admin-file-input" style={{ display: 'none' }} />
                      
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => {
                          const input = document.getElementById('admin-file-input') as HTMLInputElement;
                          if (input) input.click();
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
                        onChange={(e) => setMessage(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' && !e.shiftKey) {
                            e.preventDefault();
                            sendMessage();
                          }
                        }}
                        placeholder="Type your response..."
                        disabled={loading}
                        className="flex-1 min-h-[60px] max-h-[120px] resize-none"
                        rows={2}
                      />
                      <Button
                        onClick={sendMessage}
                        disabled={!message.trim() || loading}
                        className="bg-gradient-to-r from-green-500 to-blue-600 hover:from-green-600 hover:to-blue-700"
                      >
                        {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
                      </Button>
                    </div>
                  </div>
                </>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}


// Message Bubble Component
function MessageBubble({ message }: { message: Message }) {
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
  const alignment = isAdmin ? 'justify-end' : 'justify-start';
  const bgColor = isAdmin 
    ? 'bg-gradient-to-r from-green-500 to-blue-600 text-white' 
    : 'bg-gray-100 dark:bg-gray-800';

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`flex ${alignment}`}
    >
      <div className={`${bgColor} rounded-2xl p-3 max-w-[80%] shadow-sm`}>
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
            <Button size="sm" variant="ghost" onClick={toggleAudio} className={isAdmin ? 'text-white hover:bg-white/20' : ''}>
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
          {message.timestamp?.toDate?.()?.toLocaleString() || 'Just now'}
        </p>
      </div>
    </motion.div>
  );
}

function formatDuration(seconds: number) {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}:${secs.toString().padStart(2, '0')}`;
}
