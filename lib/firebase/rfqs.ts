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

export interface RFQ {
  id: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  companyName?: string;
  productName: string;
  productId?: string;
  quantity: number;
  unit: string;
  targetPrice?: number;
  deliveryLocation: string;
  deliveryDate?: string;
  additionalRequirements?: string;
  status: 'new' | 'reviewing' | 'quoted' | 'accepted' | 'rejected' | 'expired';
  quotedPrice?: number;
  quotedNotes?: string;
  createdAt: any;
  updatedAt: any;
}

const COLLECTION_NAME = 'rfqs';

export async function getAllRFQs(): Promise<RFQ[]> {
  try {
    const q = query(collection(db, COLLECTION_NAME), orderBy('createdAt', 'desc'));
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    } as RFQ));
  } catch (error) {
    console.error('Error getting RFQs:', error);
    throw error;
  }
}

export async function getRFQById(id: string): Promise<RFQ | null> {
  try {
    const docRef = doc(db, COLLECTION_NAME, id);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      return {
        id: docSnap.id,
        ...docSnap.data()
      } as RFQ;
    }
    return null;
  } catch (error) {
    console.error('Error getting RFQ:', error);
    throw error;
  }
}

export async function createRFQ(data: Omit<RFQ, 'id' | 'createdAt' | 'updatedAt'>): Promise<string> {
  try {
    const docRef = await addDoc(collection(db, COLLECTION_NAME), {
      ...data,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    });
    return docRef.id;
  } catch (error) {
    console.error('Error creating RFQ:', error);
    throw error;
  }
}

export async function updateRFQ(id: string, data: Partial<RFQ>): Promise<void> {
  try {
    const docRef = doc(db, COLLECTION_NAME, id);
    await updateDoc(docRef, {
      ...data,
      updatedAt: serverTimestamp()
    });
  } catch (error) {
    console.error('Error updating RFQ:', error);
    throw error;
  }
}

export async function updateRFQStatus(
  id: string, 
  status: RFQ['status'],
  quotedPrice?: number,
  quotedNotes?: string
): Promise<void> {
  try {
    const docRef = doc(db, COLLECTION_NAME, id);
    const updateData: any = {
      status,
      updatedAt: serverTimestamp()
    };
    
    if (quotedPrice !== undefined) {
      updateData.quotedPrice = quotedPrice;
    }
    
    if (quotedNotes) {
      updateData.quotedNotes = quotedNotes;
    }
    
    await updateDoc(docRef, updateData);
  } catch (error) {
    console.error('Error updating RFQ status:', error);
    throw error;
  }
}

export async function deleteRFQ(id: string): Promise<void> {
  try {
    const docRef = doc(db, COLLECTION_NAME, id);
    await deleteDoc(docRef);
  } catch (error) {
    console.error('Error deleting RFQ:', error);
    throw error;
  }
}

export function formatRFQDate(timestamp: any): string {
  if (!timestamp) return 'N/A';
  
  try {
    const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  } catch (error) {
    return 'N/A';
  }
}
