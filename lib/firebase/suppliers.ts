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

export interface Supplier {
  id: string;
  companyName: string;
  contactPerson: string;
  email: string;
  phone: string;
  address?: string;
  city?: string;
  country: string;
  products: string[];
  categories: string[];
  certifications?: string[];
  status: 'pending' | 'approved' | 'rejected' | 'suspended';
  rating?: number;
  reviewCount?: number;
  taxId?: string;
  bankDetails?: {
    bankName: string;
    accountNumber: string;
    accountName: string;
  };
  notes?: string;
  createdAt: any;
  updatedAt: any;
}

const COLLECTION_NAME = 'suppliers';

export async function getAllSuppliers(): Promise<Supplier[]> {
  try {
    const q = query(collection(db, COLLECTION_NAME), orderBy('createdAt', 'desc'));
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    } as Supplier));
  } catch (error) {
    console.error('Error getting suppliers:', error);
    throw error;
  }
}

export async function getSupplierById(id: string): Promise<Supplier | null> {
  try {
    const docRef = doc(db, COLLECTION_NAME, id);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      return {
        id: docSnap.id,
        ...docSnap.data()
      } as Supplier;
    }
    return null;
  } catch (error) {
    console.error('Error getting supplier:', error);
    throw error;
  }
}

export async function getSuppliersByStatus(status: Supplier['status']): Promise<Supplier[]> {
  try {
    const q = query(
      collection(db, COLLECTION_NAME),
      where('status', '==', status),
      orderBy('createdAt', 'desc')
    );
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    } as Supplier));
  } catch (error) {
    console.error('Error getting suppliers by status:', error);
    throw error;
  }
}

export async function createSupplier(data: Omit<Supplier, 'id' | 'createdAt' | 'updatedAt'>): Promise<string> {
  try {
    const docRef = await addDoc(collection(db, COLLECTION_NAME), {
      ...data,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    });
    return docRef.id;
  } catch (error) {
    console.error('Error creating supplier:', error);
    throw error;
  }
}

export async function updateSupplier(id: string, data: Partial<Supplier>): Promise<void> {
  try {
    const docRef = doc(db, COLLECTION_NAME, id);
    await updateDoc(docRef, {
      ...data,
      updatedAt: serverTimestamp()
    });
  } catch (error) {
    console.error('Error updating supplier:', error);
    throw error;
  }
}

export async function updateSupplierStatus(
  id: string,
  status: Supplier['status'],
  notes?: string
): Promise<void> {
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
    console.error('Error updating supplier status:', error);
    throw error;
  }
}

export async function updateSupplierRating(
  id: string,
  rating: number
): Promise<void> {
  try {
    const supplier = await getSupplierById(id);
    if (!supplier) throw new Error('Supplier not found');

    const currentRating = supplier.rating || 0;
    const currentCount = supplier.reviewCount || 0;
    
    const newCount = currentCount + 1;
    const newRating = ((currentRating * currentCount) + rating) / newCount;

    await updateSupplier(id, {
      rating: Math.round(newRating * 10) / 10,
      reviewCount: newCount
    });
  } catch (error) {
    console.error('Error updating supplier rating:', error);
    throw error;
  }
}

export async function deleteSupplier(id: string): Promise<void> {
  try {
    const docRef = doc(db, COLLECTION_NAME, id);
    await deleteDoc(docRef);
  } catch (error) {
    console.error('Error deleting supplier:', error);
    throw error;
  }
}

export function formatSupplierDate(timestamp: any): string {
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
