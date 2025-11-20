// Firestore Database Schema for Hafa General Trading PLC

export interface User {
  id: string;
  email: string;
  displayName: string;
  phoneNumber?: string;
  role: 'customer' | 'supplier' | 'admin' | 'staff' | 'superadmin';
  createdAt: Date;
  updatedAt: Date;
  photoURL?: string;
  companyName?: string;
  address?: string;
  country?: string;
}

export interface Category {
  id: string;
  name: string;
  nameAm?: string; // Amharic translation
  slug: string;
  type: 'export' | 'import';
  description: string;
  descriptionAm?: string;
  image?: string;
  parentId?: string;
  order: number;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface Product {
  id: string;
  name: string;
  nameAm?: string;
  slug: string;
  categoryId: string;
  type: 'export' | 'import';
  description: string;
  descriptionAm?: string;
  images: string[];
  specifications: Record<string, string>;
  price?: number;
  currency: 'USD' | 'ETB' | 'EUR';
  unit: string;
  minOrderQuantity: number;
  stock?: number;
  certifications?: string[];
  packagingOptions?: string[];
  countryOfOrigin?: string;
  warranty?: string;
  hsCode?: string;
  isActive: boolean;
  isFeatured: boolean;
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
  views: number;
}

export interface Order {
  id: string;
  orderNumber: string;
  customerId: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  items: OrderItem[];
  subtotal: number;
  tax: number;
  shipping: number;
  total: number;
  currency: string;
  status: 'pending' | 'confirmed' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  paymentStatus: 'pending' | 'paid' | 'failed';
  paymentMethod?: string;
  shippingAddress: Address;
  billingAddress: Address;
  trackingNumber?: string;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface OrderItem {
  productId: string;
  productName: string;
  quantity: number;
  price: number;
  total: number;
  image?: string;
}

export interface Address {
  fullName: string;
  phone: string;
  email: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state?: string;
  country: string;
  postalCode?: string;
}

export interface RFQ {
  id: string;
  rfqNumber: string;
  customerId?: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  companyName?: string;
  productType: 'export' | 'import';
  productName: string;
  quantity: number;
  unit: string;
  targetPrice?: number;
  currency: string;
  deliveryLocation: string;
  deliveryDate?: Date;
  specifications?: string;
  attachments?: string[];
  status: 'new' | 'reviewing' | 'quoted' | 'accepted' | 'rejected' | 'expired';
  quotedPrice?: number;
  quotedBy?: string;
  quotedAt?: Date;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Shipment {
  id: string;
  orderId: string;
  trackingNumber: string;
  carrier: string;
  status: 'preparing' | 'in_transit' | 'customs' | 'out_for_delivery' | 'delivered';
  origin: string;
  destination: string;
  estimatedDelivery?: Date;
  actualDelivery?: Date;
  currentLocation?: string;
  timeline: ShipmentEvent[];
  createdAt: Date;
  updatedAt: Date;
}

export interface ShipmentEvent {
  status: string;
  location: string;
  description: string;
  timestamp: Date;
}

export interface BlogPost {
  id: string;
  title: string;
  titleAm?: string;
  slug: string;
  excerpt: string;
  excerptAm?: string;
  content: string;
  contentAm?: string;
  featuredImage: string;
  author: string;
  authorId: string;
  category: string;
  tags: string[];
  isPublished: boolean;
  views: number;
  createdAt: Date;
  updatedAt: Date;
  publishedAt?: Date;
}

export interface Supplier {
  id: string;
  companyName: string;
  contactPerson: string;
  email: string;
  phone: string;
  country: string;
  address: string;
  productsSupplied: string[];
  certifications?: string[];
  status: 'pending' | 'approved' | 'rejected' | 'suspended';
  rating?: number;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Review {
  id: string;
  productId: string;
  userId: string;
  userName: string;
  rating: number;
  comment: string;
  images?: string[];
  isVerified: boolean;
  isApproved: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface Notification {
  id: string;
  userId: string;
  title: string;
  message: string;
  type: 'order' | 'shipment' | 'rfq' | 'system' | 'promotion';
  isRead: boolean;
  link?: string;
  createdAt: Date;
}

export interface Analytics {
  id: string;
  date: Date;
  pageViews: number;
  uniqueVisitors: number;
  orders: number;
  revenue: number;
  topProducts: string[];
  topCategories: string[];
}
