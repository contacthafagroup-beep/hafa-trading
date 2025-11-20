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
  where,
  Timestamp
} from 'firebase/firestore';
import { db } from './config';

export interface OrderItem {
  productId: string;
  productName: string;
  quantity: number;
  price: number;
  unit: string;
}

export interface ShippingAddress {
  fullName: string;
  address: string;
  city: string;
  state: string;
  country: string;
  postalCode: string;
  phone: string;
}

export interface Order {
  id: string;
  userId: string;
  userEmail: string;
  userName: string;
  items: OrderItem[];
  subtotal: number;
  shipping: number;
  tax: number;
  total: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  paymentMethod: string;
  paymentStatus: 'pending' | 'paid' | 'failed';
  shippingAddress: ShippingAddress;
  trackingNumber?: string;
  notes?: string;
  createdAt: any;
  updatedAt: any;
}

const COLLECTION_NAME = 'orders';

export async function getAllOrders(): Promise<Order[]> {
  try {
    const q = query(collection(db, COLLECTION_NAME), orderBy('createdAt', 'desc'));
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    } as Order));
  } catch (error) {
    console.error('Error getting orders:', error);
    throw error;
  }
}

export async function getOrderById(id: string): Promise<Order | null> {
  try {
    const docRef = doc(db, COLLECTION_NAME, id);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      return {
        id: docSnap.id,
        ...docSnap.data()
      } as Order;
    }
    return null;
  } catch (error) {
    console.error('Error getting order:', error);
    throw error;
  }
}

export async function getOrdersByUserId(userId: string): Promise<Order[]> {
  try {
    const q = query(
      collection(db, COLLECTION_NAME), 
      where('userId', '==', userId),
      orderBy('createdAt', 'desc')
    );
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    } as Order));
  } catch (error) {
    console.error('Error getting user orders:', error);
    throw error;
  }
}

export async function createOrder(data: Omit<Order, 'id' | 'createdAt' | 'updatedAt'>): Promise<string> {
  try {
    const docRef = await addDoc(collection(db, COLLECTION_NAME), {
      ...data,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    });
    return docRef.id;
  } catch (error) {
    console.error('Error creating order:', error);
    throw error;
  }
}

export async function updateOrder(id: string, data: Partial<Order>): Promise<void> {
  try {
    const docRef = doc(db, COLLECTION_NAME, id);
    await updateDoc(docRef, {
      ...data,
      updatedAt: serverTimestamp()
    });
  } catch (error) {
    console.error('Error updating order:', error);
    throw error;
  }
}

export async function updateOrderStatus(
  id: string, 
  status: Order['status'],
  trackingNumber?: string
): Promise<void> {
  try {
    const docRef = doc(db, COLLECTION_NAME, id);
    const updateData: any = {
      status,
      updatedAt: serverTimestamp()
    };
    
    if (trackingNumber) {
      updateData.trackingNumber = trackingNumber;
    }
    
    await updateDoc(docRef, updateData);
  } catch (error) {
    console.error('Error updating order status:', error);
    throw error;
  }
}

export async function deleteOrder(id: string): Promise<void> {
  try {
    const docRef = doc(db, COLLECTION_NAME, id);
    await deleteDoc(docRef);
  } catch (error) {
    console.error('Error deleting order:', error);
    throw error;
  }
}

export function formatOrderDate(timestamp: any): string {
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
