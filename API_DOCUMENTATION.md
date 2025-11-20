# API Documentation - Hafa General Trading PLC

Complete API reference for Firebase Cloud Functions and Firestore operations.

## 🔥 Firebase Cloud Functions

Base URL: `https://us-central1-[PROJECT-ID].cloudfunctions.net`

### Authentication

All authenticated endpoints require Firebase ID token in the Authorization header:

```
Authorization: Bearer [FIREBASE_ID_TOKEN]
```

---

## 📧 Email Notifications

### Automatic Triggers

#### 1. Order Created
**Trigger**: New document in `orders` collection  
**Function**: `onOrderCreated`  
**Actions**:
- Sends confirmation email to customer
- Creates admin notification

**Email Template**:
```
Subject: Order Confirmation - [ORDER_NUMBER]
To: [CUSTOMER_EMAIL]
Content: Order details, items, total amount
```

#### 2. RFQ Created
**Trigger**: New document in `rfqs` collection  
**Function**: `onRFQCreated`  
**Actions**:
- Sends confirmation email to customer
- Creates admin notification

**Email Template**:
```
Subject: RFQ Received - [RFQ_NUMBER]
To: [CUSTOMER_EMAIL]
Content: RFQ details, product, quantity
```

#### 3. RFQ Quoted
**Trigger**: RFQ status updated to 'quoted'  
**Function**: `onRFQQuoted`  
**Actions**:
- Sends quotation email to customer
- Creates customer notification

**Email Template**:
```
Subject: Quotation Ready - [RFQ_NUMBER]
To: [CUSTOMER_EMAIL]
Content: Quoted price, product details
```

#### 4. Shipment Updated
**Trigger**: Shipment status changed  
**Function**: `onShipmentUpdated`  
**Actions**:
- Sends status update email to customer
- Creates customer notification

**Email Template**:
```
Subject: Shipment Update - [TRACKING_NUMBER]
To: [CUSTOMER_EMAIL]
Content: Current status, location, estimated delivery
```

---

## 📞 Callable Functions

### 1. Increment Product Views

**Endpoint**: `incrementProductViews`  
**Method**: Callable Function  
**Authentication**: Not required

**Request**:
```javascript
const incrementViews = firebase.functions().httpsCallable('incrementProductViews');
const result = await incrementViews({ productId: 'exp-001' });
```

**Parameters**:
```typescript
{
  productId: string  // Required
}
```

**Response**:
```typescript
{
  success: boolean
}
```

**Example**:
```javascript
// Client-side usage
import { getFunctions, httpsCallable } from 'firebase/functions';

const functions = getFunctions();
const incrementViews = httpsCallable(functions, 'incrementProductViews');

try {
  const result = await incrementViews({ productId: 'exp-001' });
  console.log('Views incremented:', result.data);
} catch (error) {
  console.error('Error:', error);
}
```

### 2. Send WhatsApp Notification

**Endpoint**: `sendWhatsAppNotification`  
**Method**: Callable Function  
**Authentication**: Required (Staff/Admin)

**Request**:
```javascript
const sendWhatsApp = firebase.functions().httpsCallable('sendWhatsAppNotification');
const result = await sendWhatsApp({
  phoneNumber: '+251911234567',
  message: 'Your order has been shipped!'
});
```

**Parameters**:
```typescript
{
  phoneNumber: string  // Required, E.164 format
  message: string      // Required
}
```

**Response**:
```typescript
{
  success: boolean
  message: string
}
```

---

## 🗄️ Firestore Collections

### Users Collection

**Path**: `/users/{userId}`

**Schema**:
```typescript
{
  id: string
  email: string
  displayName: string
  phoneNumber?: string
  role: 'customer' | 'supplier' | 'admin' | 'staff' | 'superadmin'
  createdAt: Timestamp
  updatedAt: Timestamp
  photoURL?: string
  companyName?: string
  address?: string
  country?: string
}
```

**Security Rules**:
- Read: Authenticated users
- Create: Authenticated users
- Update: Owner or Admin
- Delete: Admin only

**Example Queries**:
```javascript
// Get current user
const userDoc = await getDoc(doc(db, 'users', currentUser.uid));

// Get all customers (Admin only)
const customersQuery = query(
  collection(db, 'users'),
  where('role', '==', 'customer')
);
const customers = await getDocs(customersQuery);
```

### Products Collection

**Path**: `/products/{productId}`

**Schema**:
```typescript
{
  id: string
  name: string
  nameAm?: string
  slug: string
  categoryId: string
  type: 'export' | 'import'
  description: string
  descriptionAm?: string
  images: string[]
  specifications: Record<string, string>
  price?: number
  currency: 'USD' | 'ETB' | 'EUR'
  unit: string
  minOrderQuantity: number
  stock?: number
  certifications?: string[]
  packagingOptions?: string[]
  countryOfOrigin?: string
  warranty?: string
  hsCode?: string
  isActive: boolean
  isFeatured: boolean
  tags: string[]
  createdAt: Timestamp
  updatedAt: Timestamp
  views: number
}
```

**Security Rules**:
- Read: Public
- Write: Staff/Admin only

**Example Queries**:
```javascript
// Get all export products
const exportQuery = query(
  collection(db, 'products'),
  where('type', '==', 'export'),
  where('isActive', '==', true),
  orderBy('createdAt', 'desc')
);

// Get featured products
const featuredQuery = query(
  collection(db, 'products'),
  where('isFeatured', '==', true),
  limit(10)
);

// Search products by category
const categoryQuery = query(
  collection(db, 'products'),
  where('categoryId', '==', 'agricultural'),
  where('isActive', '==', true)
);
```

### Orders Collection

**Path**: `/orders/{orderId}`

**Schema**:
```typescript
{
  id: string
  orderNumber: string
  customerId: string
  customerName: string
  customerEmail: string
  customerPhone: string
  items: OrderItem[]
  subtotal: number
  tax: number
  shipping: number
  total: number
  currency: string
  status: 'pending' | 'confirmed' | 'processing' | 'shipped' | 'delivered' | 'cancelled'
  paymentStatus: 'pending' | 'paid' | 'failed'
  paymentMethod?: string
  shippingAddress: Address
  billingAddress: Address
  trackingNumber?: string
  notes?: string
  createdAt: Timestamp
  updatedAt: Timestamp
}
```

**Security Rules**:
- Read: Owner or Staff
- Create: Authenticated users
- Update: Staff only
- Delete: Admin only

**Example Queries**:
```javascript
// Get customer orders
const ordersQuery = query(
  collection(db, 'orders'),
  where('customerId', '==', currentUser.uid),
  orderBy('createdAt', 'desc')
);

// Get pending orders (Admin)
const pendingQuery = query(
  collection(db, 'orders'),
  where('status', '==', 'pending'),
  orderBy('createdAt', 'desc')
);

// Create new order
const orderData = {
  orderNumber: generateOrderNumber(),
  customerId: currentUser.uid,
  customerName: 'John Doe',
  customerEmail: 'john@example.com',
  items: [...],
  total: 1500,
  status: 'pending',
  createdAt: serverTimestamp(),
  updatedAt: serverTimestamp()
};
await addDoc(collection(db, 'orders'), orderData);
```

### RFQs Collection

**Path**: `/rfqs/{rfqId}`

**Schema**:
```typescript
{
  id: string
  rfqNumber: string
  customerId?: string
  customerName: string
  customerEmail: string
  customerPhone: string
  companyName?: string
  productType: 'export' | 'import'
  productName: string
  quantity: number
  unit: string
  targetPrice?: number
  currency: string
  deliveryLocation: string
  deliveryDate?: Timestamp
  specifications?: string
  attachments?: string[]
  status: 'new' | 'reviewing' | 'quoted' | 'accepted' | 'rejected' | 'expired'
  quotedPrice?: number
  quotedBy?: string
  quotedAt?: Timestamp
  notes?: string
  createdAt: Timestamp
  updatedAt: Timestamp
}
```

**Security Rules**:
- Read: Owner or Staff
- Create: Anyone
- Update: Staff only
- Delete: Admin only

**Example Queries**:
```javascript
// Submit RFQ
const rfqData = {
  rfqNumber: generateRFQNumber(),
  customerName: 'John Doe',
  customerEmail: 'john@example.com',
  productType: 'export',
  productName: 'Fresh Rosemary',
  quantity: 1000,
  unit: 'kg',
  status: 'new',
  createdAt: serverTimestamp(),
  updatedAt: serverTimestamp()
};
await addDoc(collection(db, 'rfqs'), rfqData);

// Get pending RFQs (Admin)
const pendingRFQs = query(
  collection(db, 'rfqs'),
  where('status', 'in', ['new', 'reviewing']),
  orderBy('createdAt', 'desc')
);
```

### Shipments Collection

**Path**: `/shipments/{shipmentId}`

**Schema**:
```typescript
{
  id: string
  orderId: string
  trackingNumber: string
  carrier: string
  status: 'preparing' | 'in_transit' | 'customs' | 'out_for_delivery' | 'delivered'
  origin: string
  destination: string
  estimatedDelivery?: Timestamp
  actualDelivery?: Timestamp
  currentLocation?: string
  timeline: ShipmentEvent[]
  createdAt: Timestamp
  updatedAt: Timestamp
}
```

**Security Rules**:
- Read: Authenticated users
- Write: Staff only

**Example Queries**:
```javascript
// Track shipment
const shipmentQuery = query(
  collection(db, 'shipments'),
  where('trackingNumber', '==', 'TRK-XXX-XXXXX')
);

// Get shipments by order
const orderShipments = query(
  collection(db, 'shipments'),
  where('orderId', '==', orderId)
);
```

---

## 🔍 Real-time Listeners

### Listen to Order Updates

```javascript
import { onSnapshot, doc } from 'firebase/firestore';

const unsubscribe = onSnapshot(
  doc(db, 'orders', orderId),
  (doc) => {
    const order = doc.data();
    console.log('Order updated:', order);
  }
);

// Cleanup
unsubscribe();
```

### Listen to New Notifications

```javascript
const notificationsQuery = query(
  collection(db, 'notifications'),
  where('userId', '==', currentUser.uid),
  where('isRead', '==', false),
  orderBy('createdAt', 'desc')
);

const unsubscribe = onSnapshot(notificationsQuery, (snapshot) => {
  snapshot.docChanges().forEach((change) => {
    if (change.type === 'added') {
      const notification = change.doc.data();
      showNotification(notification);
    }
  });
});
```

---

## 📊 Analytics

### Daily Analytics Generation

**Schedule**: Runs daily at midnight (Africa/Addis_Ababa timezone)  
**Function**: `generateDailyAnalytics`

**Generated Data**:
```typescript
{
  date: Timestamp
  pageViews: number
  uniqueVisitors: number
  orders: number
  revenue: number
  topProducts: string[]
  topCategories: string[]
}
```

---

## 🔒 Authentication

### Sign Up with Email

```javascript
import { createUserWithEmailAndPassword } from 'firebase/auth';

const { user } = await createUserWithEmailAndPassword(
  auth,
  email,
  password
);

// Create user document
await setDoc(doc(db, 'users', user.uid), {
  id: user.uid,
  email: user.email,
  displayName: name,
  role: 'customer',
  createdAt: serverTimestamp(),
  updatedAt: serverTimestamp()
});
```

### Sign In

```javascript
import { signInWithEmailAndPassword } from 'firebase/auth';

const { user } = await signInWithEmailAndPassword(
  auth,
  email,
  password
);
```

### Sign Out

```javascript
import { signOut } from 'firebase/auth';

await signOut(auth);
```

---

## 🚨 Error Handling

### Common Error Codes

```typescript
// Firestore errors
'permission-denied'     // User lacks permission
'not-found'            // Document doesn't exist
'already-exists'       // Document already exists
'resource-exhausted'   // Quota exceeded

// Auth errors
'auth/user-not-found'
'auth/wrong-password'
'auth/email-already-in-use'
'auth/weak-password'
```

### Error Handling Example

```javascript
try {
  await addDoc(collection(db, 'orders'), orderData);
} catch (error) {
  if (error.code === 'permission-denied') {
    console.error('You do not have permission to create orders');
  } else if (error.code === 'resource-exhausted') {
    console.error('Quota exceeded, please try again later');
  } else {
    console.error('Error creating order:', error);
  }
}
```

---

## 📝 Best Practices

1. **Always use transactions** for operations that modify multiple documents
2. **Implement pagination** for large collections
3. **Use indexes** for complex queries
4. **Cache frequently accessed data** on the client
5. **Validate data** before writing to Firestore
6. **Handle offline scenarios** gracefully
7. **Use security rules** to protect data
8. **Monitor usage** to avoid quota limits

---

## 🔗 Useful Links

- [Firebase Documentation](https://firebase.google.com/docs)
- [Firestore Data Model](https://firebase.google.com/docs/firestore/data-model)
- [Cloud Functions](https://firebase.google.com/docs/functions)
- [Security Rules](https://firebase.google.com/docs/firestore/security/get-started)
