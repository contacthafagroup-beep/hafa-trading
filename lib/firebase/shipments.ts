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

export interface ShipmentLocation {
  city: string;
  country: string;
  address?: string;
  postalCode?: string;
}

export interface ShipmentUpdate {
  status: string;
  location: string;
  timestamp: any;
  notes?: string;
}

export interface Shipment {
  id: string;
  orderId: string;
  trackingNumber: string;
  customerName: string;
  customerEmail: string;
  origin: ShipmentLocation;
  destination: ShipmentLocation;
  carrier: string;
  carrierService?: string;
  status: 'preparing' | 'picked_up' | 'in_transit' | 'customs' | 'out_for_delivery' | 'delivered' | 'failed';
  estimatedDelivery?: string;
  actualDelivery?: string;
  weight?: number;
  dimensions?: {
    length: number;
    width: number;
    height: number;
    unit: string;
  };
  packageCount?: number;
  updates: ShipmentUpdate[];
  notes?: string;
  createdAt: any;
  updatedAt: any;
}

const COLLECTION_NAME = 'shipments';

export async function getAllShipments(): Promise<Shipment[]> {
  try {
    const q = query(collection(db, COLLECTION_NAME), orderBy('createdAt', 'desc'));
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    } as Shipment));
  } catch (error) {
    console.error('Error getting shipments:', error);
    throw error;
  }
}

export async function getShipmentById(id: string): Promise<Shipment | null> {
  try {
    const docRef = doc(db, COLLECTION_NAME, id);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      return {
        id: docSnap.id,
        ...docSnap.data()
      } as Shipment;
    }
    return null;
  } catch (error) {
    console.error('Error getting shipment:', error);
    throw error;
  }
}

export async function getShipmentByTracking(trackingNumber: string): Promise<Shipment | null> {
  try {
    const q = query(
      collection(db, COLLECTION_NAME),
      where('trackingNumber', '==', trackingNumber)
    );
    const snapshot = await getDocs(q);
    
    if (!snapshot.empty) {
      const doc = snapshot.docs[0];
      return {
        id: doc.id,
        ...doc.data()
      } as Shipment;
    }
    return null;
  } catch (error) {
    console.error('Error getting shipment by tracking:', error);
    throw error;
  }
}

export async function getShipmentsByOrderId(orderId: string): Promise<Shipment[]> {
  try {
    const q = query(
      collection(db, COLLECTION_NAME),
      where('orderId', '==', orderId),
      orderBy('createdAt', 'desc')
    );
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    } as Shipment));
  } catch (error) {
    console.error('Error getting shipments by order:', error);
    throw error;
  }
}

export async function createShipment(data: Omit<Shipment, 'id' | 'createdAt' | 'updatedAt'>): Promise<string> {
  try {
    const docRef = await addDoc(collection(db, COLLECTION_NAME), {
      ...data,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    });
    return docRef.id;
  } catch (error) {
    console.error('Error creating shipment:', error);
    throw error;
  }
}

export async function updateShipment(id: string, data: Partial<Shipment>): Promise<void> {
  try {
    const docRef = doc(db, COLLECTION_NAME, id);
    await updateDoc(docRef, {
      ...data,
      updatedAt: serverTimestamp()
    });
  } catch (error) {
    console.error('Error updating shipment:', error);
    throw error;
  }
}

export async function addShipmentUpdate(
  id: string,
  status: Shipment['status'],
  location: string,
  notes?: string
): Promise<void> {
  try {
    const shipment = await getShipmentById(id);
    if (!shipment) throw new Error('Shipment not found');

    const newUpdate: ShipmentUpdate = {
      status,
      location,
      timestamp: serverTimestamp(),
      notes
    };

    const updates = [...(shipment.updates || []), newUpdate];

    await updateShipment(id, {
      status,
      updates,
      ...(status === 'delivered' && { actualDelivery: new Date().toISOString() })
    });
  } catch (error) {
    console.error('Error adding shipment update:', error);
    throw error;
  }
}

export async function deleteShipment(id: string): Promise<void> {
  try {
    const docRef = doc(db, COLLECTION_NAME, id);
    await deleteDoc(docRef);
  } catch (error) {
    console.error('Error deleting shipment:', error);
    throw error;
  }
}

export function formatShipmentDate(timestamp: any): string {
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

export function getStatusLabel(status: Shipment['status']): string {
  const labels: Record<Shipment['status'], string> = {
    preparing: 'Preparing',
    picked_up: 'Picked Up',
    in_transit: 'In Transit',
    customs: 'At Customs',
    out_for_delivery: 'Out for Delivery',
    delivered: 'Delivered',
    failed: 'Failed'
  };
  return labels[status] || status;
}
