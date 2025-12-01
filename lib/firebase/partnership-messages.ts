import { 
  collection, 
  doc, 
  getDocs, 
  addDoc, 
  query,
  where,
  orderBy,
  serverTimestamp
} from 'firebase/firestore';
import { db } from './config';

export interface PartnershipMessage {
  id: string;
  partnershipId: string;
  senderId: string;
  senderName: string;
  senderRole: 'admin' | 'partner';
  message: string;
  createdAt: any;
}

const COLLECTION_NAME = 'partnershipMessages';

export async function getPartnershipMessages(partnershipId: string): Promise<PartnershipMessage[]> {
  if (!db) {
    console.error('Firestore not initialized');
    return [];
  }
  try {
    const q = query(
      collection(db, COLLECTION_NAME),
      where('partnershipId', '==', partnershipId),
      orderBy('createdAt', 'asc')
    );
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    } as PartnershipMessage));
  } catch (error) {
    console.error('Error getting partnership messages:', error);
    throw error;
  }
}

export async function sendPartnershipMessage(
  partnershipId: string,
  senderId: string,
  senderName: string,
  senderRole: 'admin' | 'partner',
  message: string
): Promise<string> {
  if (!db) {
    throw new Error('Firestore not initialized');
  }
  try {
    const docRef = await addDoc(collection(db, COLLECTION_NAME), {
      partnershipId,
      senderId,
      senderName,
      senderRole,
      message,
      createdAt: serverTimestamp()
    });
    return docRef.id;
  } catch (error) {
    console.error('Error sending partnership message:', error);
    throw error;
  }
}

export function formatMessageDate(timestamp: any): string {
  if (!timestamp) return 'Just now';
  
  try {
    const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);
    
    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins} min${diffMins > 1 ? 's' : ''} ago`;
    if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
    if (diffDays < 7) return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
    
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  } catch (error) {
    return 'Unknown';
  }
}
