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
  orderBy
} from 'firebase/firestore';
import { db } from './config';

export interface Customer {
  id: string;
  companyName: string;
  contactPerson: string;
  email: string;
  phone: string;
  country: string;
  address?: string;
  city?: string;
  postalCode?: string;
  taxId?: string;
  website?: string;
  totalOrders?: number;
  totalSpent?: number;
  status: 'active' | 'inactive' | 'blocked';
  notes?: string;
  createdAt: any;
  updatedAt: any;
}

const COLLECTION_NAME = 'customers';

export async function getAllCustomers(): Promise<Customer[]> {
  try {
    const q = query(collection(db, COLLECTION_NAME), orderBy('createdAt', 'desc'));
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    } as Customer));
  } catch (error) {
    console.error('Error getting customers:', error);
    throw error;
  }
}

export async function getCustomerById(id: string): Promise<Customer | null> {
  try {
    const docRef = doc(db, COLLECTION_NAME, id);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      return {
        id: docSnap.id,
        ...docSnap.data()
      } as Customer;
    }
    return null;
  } catch (error) {
    console.error('Error getting customer:', error);
    throw error;
  }
}

export async function createCustomer(data: Omit<Customer, 'id' | 'createdAt' | 'updatedAt'>): Promise<string> {
  try {
    const docRef = await addDoc(collection(db, COLLECTION_NAME), {
      ...data,
      totalOrders: 0,
      totalSpent: 0,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    });
    return docRef.id;
  } catch (error) {
    console.error('Error creating customer:', error);
    throw error;
  }
}

export async function updateCustomer(id: string, data: Partial<Customer>): Promise<void> {
  try {
    const docRef = doc(db, COLLECTION_NAME, id);
    await 