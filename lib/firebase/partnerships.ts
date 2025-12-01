import { 
  collection, 
  doc, 
  getDocs, 
  getDoc, 
  addDoc, 
  updateDoc, 
  deleteDoc,
  serverTimestamp,
  query,
  orderBy,
  where
} from 'firebase/firestore';
import { db } from './config';

export interface Partnership {
  id: string;
  companyName: string;
  contactPerson: string;
  email: string;
  phone: string;
  country: string;
  businessType: string;
  productsInterested: string;
  annualVolume?: string;
  message?: string;
  status: 'new' | 'reviewing' | 'approved' | 'rejected' | 'contacted';
  notes?: string;
  createdAt: any;
  updatedAt: any;
}

const COLLECTION_NAME = 'partnerships';

export async function getAllPartnerships(): Promise<Partnership[]> {
  if (!db) {
    console.error('Firestore not initialized');
    return [];
  }
  try {
    const q = query(collection(db, COLLECTION_NAME), orderBy('createdAt', 'desc'));
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    } as Partnership));
  } catch (error) {
    console.error('Error getting partnerships:', error);
    throw error;
  }
}

export async function getPartnershipById(id: string): Promise<Partnership | null> {
  if (!db) {
    console.error('Firestore not initialized');
    return null;
  }
  try {
    const docRef = doc(db, COLLECTION_NAME, id);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      return {
        id: docSnap.id,
        ...docSnap.data()
      } as Partnership;
    }
    return null;
  } catch (error) {
    console.error('Error getting partnership:', error);
    throw error;
  }
}

export async function createPartnership(data: Omit<Partnership, 'id' | 'createdAt' | 'updatedAt'>): Promise<string> {
  if (!db) {
    throw new Error('Firestore not initialized');
  }
  try {
    const docRef = await addDoc(collection(db, COLLECTION_NAME), {
      ...data,
      status: 'new',
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    });
    return docRef.id;
  } catch (error) {
    console.error('Error creating partnership:', error);
    throw error;
  }
}

export async function updatePartnershipStatus(
  id: string, 
  status: Partnership['status'],
  notes?: string
): Promise<void> {
  if (!db) {
    throw new Error('Firestore not initialized');
  }
  try {
    const docRef = doc(db, COLLECTION_NAME, id);
    const updateData: any = {
      status,
      updatedAt: serverTimestamp()
    };
    
    if (notes) {
      updateData.notes = notes;
    }
    
    await updateDoc(docRef, updateData);
  } catch (error) {
    console.error('Error updating partnership status:', error);
    throw error;
  }
}

export async function deletePartnership(id: string): Promise<void> {
  if (!db) {
    throw new Error('Firestore not initialized');
  }
  try {
    const docRef = doc(db, COLLECTION_NAME, id);
    await deleteDoc(docRef);
  } catch (error) {
    console.error('Error deleting partnership:', error);
    throw error;
  }
}

export function formatPartnershipDate(timestamp: any): string {
  if (!timestamp) return 'N/A';
  
  try {
    const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  } catch (error) {
    return 'N/A';
  }
}

export async function sendPartnershipReplyEmail(
  to: string,
  subject: string,
  message: string,
  partnershipId: string,
  companyName: string
): Promise<void> {
  try {
    const { getFunctions, httpsCallable } = await import('firebase/functions');
    const functions = getFunctions();
    const sendEmail = httpsCallable(functions, 'sendPartnershipReply');
    
    const result = await sendEmail({
      to,
      subject,
      message,
      partnershipId,
      companyName
    });
    
    console.log('Email sent successfully:', result);
  } catch (error) {
    console.error('Error sending partnership reply email:', error);
    throw error;
  }
}
