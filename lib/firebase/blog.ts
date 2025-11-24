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
  increment
} from 'firebase/firestore';
import { db } from './config';

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  featuredImage?: string;
  category: string;
  tags: string[];
  author: string;
  authorId: string;
  status: 'draft' | 'published' | 'archived';
  views: number;
  likes: number;
  comments: number;
  seoTitle?: string;
  seoDescription?: string;
  publishedAt?: any;
  createdAt: any;
  updatedAt: any;
}

const COLLECTION_NAME = 'blog_posts';

export async function getAllBlogPosts(): Promise<BlogPost[]> {
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
    } as BlogPost));
  } catch (error) {
    console.error('Error getting blog posts:', error);
    throw error;
  }
}

export async function getPublishedBlogPosts(): Promise<BlogPost[]> {
  if (!db) {
    console.error('Firestore not initialized');
    return [];
  }
  try {
    const q = query(
      collection(db, COLLECTION_NAME),
      where('status', '==', 'published'),
      orderBy('publishedAt', 'desc')
    );
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    } as BlogPost));
  } catch (error) {
    console.error('Error getting published blog posts:', error);
    throw error;
  }
}

export async function getBlogPostById(id: string): Promise<BlogPost | null> {
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
      } as BlogPost;
    }
    return null;
  } catch (error) {
    console.error('Error getting blog post:', error);
    throw error;
  }
}

export async function getBlogPostBySlug(slug: string): Promise<BlogPost | null> {
  if (!db) {
    console.error('Firestore not initialized');
    return null;
  }
  try {
    const q = query(
      collection(db, COLLECTION_NAME),
      where('slug', '==', slug)
    );
    const snapshot = await getDocs(q);
    
    if (!snapshot.empty) {
      const doc = snapshot.docs[0];
      return {
        id: doc.id,
        ...doc.data()
      } as BlogPost;
    }
    return null;
  } catch (error) {
    console.error('Error getting blog post by slug:', error);
    throw error;
  }
}

export async function createBlogPost(data: Omit<BlogPost, 'id' | 'views' | 'likes' | 'comments' | 'createdAt' | 'updatedAt'>): Promise<string> {
  if (!db) {
    throw new Error('Firestore not initialized');
  }
  try {
    const docRef = await addDoc(collection(db, COLLECTION_NAME), {
      ...data,
      views: 0,
      likes: 0,
      comments: 0,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
      ...(data.status === 'published' && { publishedAt: serverTimestamp() })
    });
    return docRef.id;
  } catch (error) {
    console.error('Error creating blog post:', error);
    throw error;
  }
}

export async function updateBlogPost(id: string, data: Partial<BlogPost>): Promise<void> {
  if (!db) {
    throw new Error('Firestore not initialized');
  }
  try {
    const docRef = doc(db, COLLECTION_NAME, id);
    const updateData: any = {
      ...data,
      updatedAt: serverTimestamp()
    };

    // If publishing for the first time, set publishedAt
    if (data.status === 'published') {
      const post = await getBlogPostById(id);
      if (post && !post.publishedAt) {
        updateData.publishedAt = serverTimestamp();
      }
    }

    await updateDoc(docRef, updateData);
  } catch (error) {
    console.error('Error updating blog post:', error);
    throw error;
  }
}

export async function incrementBlogPostViews(id: string): Promise<void> {
  if (!db) {
    throw new Error('Firestore not initialized');
  }
  try {
    const docRef = doc(db, COLLECTION_NAME, id);
    await updateDoc(docRef, {
      views: increment(1)
    });
  } catch (error) {
    console.error('Error incrementing blog post views:', error);
    throw error;
  }
}

export async function incrementBlogPostLikes(id: string): Promise<void> {
  if (!db) {
    throw new Error('Firestore not initialized');
  }
  try {
    const docRef = doc(db, COLLECTION_NAME, id);
    await updateDoc(docRef, {
      likes: increment(1)
    });
  } catch (error) {
    console.error('Error incrementing blog post likes:', error);
    throw error;
  }
}

export async function deleteBlogPost(id: string): Promise<void> {
  if (!db) {
    throw new Error('Firestore not initialized');
  }
  try {
    const docRef = doc(db, COLLECTION_NAME, id);
    await deleteDoc(docRef);
  } catch (error) {
    console.error('Error deleting blog post:', error);
    throw error;
  }
}

export function formatBlogDate(timestamp: any): string {
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

export function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}
