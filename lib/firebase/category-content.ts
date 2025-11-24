import { db } from './config';
import { 
  collection, 
  doc, 
  setDoc, 
  getDoc, 
  getDocs,
  query,
  where,
  Timestamp 
} from 'firebase/firestore';

export interface Video {
  title: string;
  desc: string;
  thumbnail: string;
  videoUrl: string;
}

export interface OriginRegion {
  name: string;
  product: string;
  coordinates: string;
  lat?: number;
  lng?: number;
  color?: string;
  mapUrl: string;
}

export interface Certification {
  icon: string;
  name: string;
  desc: string;
}

export interface CarouselImage {
  title: string;
  emoji: string;
}

export interface Downloadable {
  icon: string;
  name: string;
  size: string;
  url?: string;
}

export interface CategoryContent {
  id?: string;
  category: string;
  videos: Video[];
  originRegions: OriginRegion[];
  certifications: Certification[];
  carouselImages: CarouselImage[];
  downloadables: Downloadable[];
  updatedAt?: Timestamp;
  updatedBy?: string;
}

const COLLECTION_NAME = 'categoryContent';

export async function saveCategoryContent(content: CategoryContent): Promise<void> {
  if (!db) {
    throw new Error('Firestore not initialized');
  }
  try {
    const docRef = doc(db, COLLECTION_NAME, content.category);
    await setDoc(docRef, {
      ...content,
      updatedAt: Timestamp.now()
    }, { merge: true });
  } catch (error) {
    console.error('Error saving category content:', error);
    throw error;
  }
}

export async function getCategoryContent(categoryId: string): Promise<CategoryContent | null> {
  if (!db) {
    console.error('Firestore not initialized');
    return null;
  }
  try {
    const docRef = doc(db, COLLECTION_NAME, categoryId);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() } as CategoryContent;
    }
    return null;
  } catch (error) {
    console.error('Error getting category content:', error);
    throw error;
  }
}

export async function getAllCategoryContent(): Promise<CategoryContent[]> {
  if (!db) {
    console.error('Firestore not initialized');
    return [];
  }
  try {
    const querySnapshot = await getDocs(collection(db, COLLECTION_NAME));
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as CategoryContent[];
  } catch (error) {
    console.error('Error getting all category content:', error);
    throw error;
  }
}
