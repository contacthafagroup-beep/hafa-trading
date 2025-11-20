import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import * as nodemailer from 'nodemailer';

admin.initializeApp();

// Email transporter configuration
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT || '587'),
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
  },
});

// Send email notification when new order is created
export const onOrderCreated = functions.firestore
  .document('orders/{orderId}')
  .onCreate(async (snap, context) => {
    const order = snap.data();
    
    // Send email to customer
    await transporter.sendMail({
      from: process.env.SMTP_USER,
      to: order.customerEmail,
      subject: `Order Confirmation - ${order.orderNumber}`,
      html: `
        <h2>Thank you for your order!</h2>
        <p>Your order ${order.orderNumber} has been received and is being processed.</p>
        <h3>Order Details:</h3>
        <ul>
          ${order.items.map((item: any) => `<li>${item.productName} - Qty: ${item.quantity}</li>`).join('')}
        </ul>
        <p><strong>Total: ${order.currency} ${order.total}</strong></p>
        <p>We will notify you once your order is shipped.</p>
      `,
    });
    
    // Create notification for admin
    await admin.firestore().collection('notifications').add({
      userId: 'admin',
      title: 'New Order Received',
      message: `Order ${order.orderNumber} from ${order.customerName}`,
      type: 'order',
      isRead: false,
      link: `/admin/orders/${snap.id}`,
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
    });
  });

// Send email notification when RFQ is submitted
export const onRFQCreated = functions.firestore
  .document('rfqs/{rfqId}')
  .onCreate(async (snap, context) => {
    const rfq = snap.data();
    
    // Send confirmation email to customer
    await transporter.sendMail({
      from: process.env.SMTP_USER,
      to: rfq.customerEmail,
      subject: `RFQ Received - ${rfq.rfqNumber}`,
      html: `
        <h2>Your quotation request has been received</h2>
        <p>RFQ Number: ${rfq.rfqNumber}</p>
        <p>Product: ${rfq.productName}</p>
        <p>Quantity: ${rfq.quantity} ${rfq.unit}</p>
        <p>Our team will review your request and send you a detailed quotation within 24 hours.</p>
      `,
    });
    
    // Notify admin
    await admin.firestore().collection('notifications').add({
      userId: 'admin',
      title: 'New RFQ Received',
      message: `RFQ ${rfq.rfqNumber} for ${rfq.productName}`,
      type: 'rfq',
      isRead: false,
      link: `/admin/rfqs/${snap.id}`,
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
    });
  });

// Send email when RFQ is quoted
export const onRFQQuoted = functions.firestore
  .document('rfqs/{rfqId}')
  .onUpdate(async (change, context) => {
    const before = change.before.data();
    const after = change.after.data();
    
    // Check if status changed to 'quoted'
    if (before.status !== 'quoted' && after.status === 'quoted') {
      await transporter.sendMail({
        from: process.env.SMTP_USER,
        to: after.customerEmail,
        subject: `Quotation Ready - ${after.rfqNumber}`,
        html: `
          <h2>Your quotation is ready</h2>
          <p>RFQ Number: ${after.rfqNumber}</p>
          <p>Product: ${after.productName}</p>
          <p>Quantity: ${after.quantity} ${after.unit}</p>
          <p><strong>Quoted Price: ${after.currency} ${after.quotedPrice}</strong></p>
          <p>Please log in to your account to view the full quotation details.</p>
        `,
      });
      
      // Create notification for customer
      if (after.customerId) {
        await admin.firestore().collection('notifications').add({
          userId: after.customerId,
          title: 'Quotation Ready',
          message: `Your quotation for ${after.productName} is ready`,
          type: 'rfq',
          isRead: false,
          link: `/dashboard/rfqs/${context.params.rfqId}`,
          createdAt: admin.firestore.FieldValue.serverTimestamp(),
        });
      }
    }
  });

// Send email when shipment status is updated
export const onShipmentUpdated = functions.firestore
  .document('shipments/{shipmentId}')
  .onUpdate(async (change, context) => {
    const before = change.before.data();
    const after = change.after.data();
    
    // Check if status changed
    if (before.status !== after.status) {
      // Get order details
      const orderDoc = await admin.firestore().collection('orders').doc(after.orderId).get();
      const order = orderDoc.data();
      
      if (order) {
        await transporter.sendMail({
          from: process.env.SMTP_USER,
          to: order.customerEmail,
          subject: `Shipment Update - ${after.trackingNumber}`,
          html: `
            <h2>Shipment Status Update</h2>
            <p>Tracking Number: ${after.trackingNumber}</p>
            <p>Status: <strong>${after.status.replace('_', ' ').toUpperCase()}</strong></p>
            <p>Current Location: ${after.currentLocation || 'In transit'}</p>
            ${after.estimatedDelivery ? `<p>Estimated Delivery: ${after.estimatedDelivery}</p>` : ''}
            <p>Track your shipment: <a href="https://hafatrading.com/track?number=${after.trackingNumber}">Click here</a></p>
          `,
        });
        
        // Create notification for customer
        if (order.customerId) {
          await admin.firestore().collection('notifications').add({
            userId: order.customerId,
            title: 'Shipment Update',
            message: `Your shipment ${after.trackingNumber} is ${after.status}`,
            type: 'shipment',
            isRead: false,
            link: `/track?number=${after.trackingNumber}`,
            createdAt: admin.firestore.FieldValue.serverTimestamp(),
          });
        }
      }
    }
  });

// Update product view count
export const incrementProductViews = functions.https.onCall(async (data, context) => {
  const { productId } = data;
  
  if (!productId) {
    throw new functions.https.HttpsError('invalid-argument', 'Product ID is required');
  }
  
  await admin.firestore().collection('products').doc(productId).update({
    views: admin.firestore.FieldValue.increment(1),
  });
  
  return { success: true };
});

// Generate daily analytics
export const generateDailyAnalytics = functions.pubsub
  .schedule('0 0 * * *') // Run at midnight every day
  .timeZone('Africa/Addis_Ababa')
  .onRun(async (context) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    
    // Get orders for today
    const ordersSnapshot = await admin.firestore()
      .collection('orders')
      .where('createdAt', '>=', today)
      .where('createdAt', '<', tomorrow)
      .get();
    
    const orders = ordersSnapshot.docs.map(doc => doc.data());
    const revenue = orders.reduce((sum, order) => sum + order.total, 0);
    
    // Get product views
    const productsSnapshot = await admin.firestore().collection('products').get();
    const topProducts = productsSnapshot.docs
      .map(doc => ({ id: doc.id, ...doc.data() }))
      .sort((a: any, b: any) => b.views - a.views)
      .slice(0, 10)
      .map((p: any) => p.id);
    
    // Save analytics
    await admin.firestore().collection('analytics').add({
      date: today,
      pageViews: 0, // Would need to implement page view tracking
      uniqueVisitors: 0,
      orders: orders.length,
      revenue: revenue,
      topProducts: topProducts,
      topCategories: [],
    });
    
    return null;
  });

// WhatsApp notification (placeholder - requires WhatsApp Business API)
export const sendWhatsAppNotification = functions.https.onCall(async (data, context) => {
  const { phoneNumber, message } = data;
  
  // Implement WhatsApp API integration here
  // This is a placeholder function
  
  return { success: true, message: 'WhatsApp notification sent' };
});
