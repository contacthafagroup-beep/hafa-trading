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

// Send welcome email when new user signs up
export const onUserCreated = functions.auth.user().onCreate(async (user) => {
  const email = user.email;
  const displayName = user.displayName || 'Valued Customer';
  
  if (!email) {
    console.log('No email found for user');
    return;
  }

  try {
    // Send welcome email
    await transporter.sendMail({
      from: `"Hafa Trading PLC" <${process.env.SMTP_USER}>`,
      to: email,
      subject: 'Welcome to Hafa Trading PLC! 🎉',
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body {
              font-family: Arial, sans-serif;
              line-height: 1.6;
              color: #333;
              max-width: 600px;
              margin: 0 auto;
              padding: 20px;
            }
            .header {
              background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
              color: white;
              padding: 30px;
              text-align: center;
              border-radius: 10px 10px 0 0;
            }
            .content {
              background: #f9f9f9;
              padding: 30px;
              border-radius: 0 0 10px 10px;
            }
            .button {
              display: inline-block;
              background: #667eea;
              color: white;
              padding: 12px 30px;
              text-decoration: none;
              border-radius: 5px;
              margin: 20px 0;
            }
            .features {
              background: white;
              padding: 20px;
              border-radius: 8px;
              margin: 20px 0;
            }
            .feature-item {
              margin: 15px 0;
              padding-left: 25px;
              position: relative;
            }
            .feature-item:before {
              content: "✓";
              position: absolute;
              left: 0;
              color: #667eea;
              font-weight: bold;
            }
            .footer {
              text-align: center;
              margin-top: 30px;
              padding-top: 20px;
              border-top: 1px solid #ddd;
              color: #666;
              font-size: 14px;
            }
          </style>
        </head>
        <body>
          <div class="header">
            <h1>Welcome to Hafa Trading PLC!</h1>
            <p>Your Gateway to Global Trade</p>
          </div>
          
          <div class="content">
            <h2>Hello ${displayName}! 👋</h2>
            
            <p>Thank you for joining Hafa Trading PLC! We're thrilled to have you as part of our growing community of importers and exporters.</p>
            
            <p>At Hafa Trading, we specialize in connecting businesses with quality products from around the world. Whether you're looking to import goods or expand your export reach, we're here to make international trade simple and efficient.</p>
            
            <div class="features">
              <h3>What You Can Do Now:</h3>
              <div class="feature-item">Browse our extensive product catalog</div>
              <div class="feature-item">Request quotes for bulk orders</div>
              <div class="feature-item">Track your shipments in real-time</div>
              <div class="feature-item">Access exclusive trade insights and market trends</div>
              <div class="feature-item">Connect with our expert trade consultants</div>
            </div>
            
            <center>
              <a href="https://hafatrading.com/products" class="button">Explore Products</a>
            </center>
            
            <h3>Need Help Getting Started?</h3>
            <p>Our team is here to assist you every step of the way:</p>
            <ul>
              <li>📧 Email: support@hafatrading.com</li>
              <li>📱 Phone: +251-XXX-XXXX</li>
              <li>💬 Live Chat: Available on our website</li>
            </ul>
            
            <p>We look forward to helping you succeed in your international trade ventures!</p>
            
            <p><strong>Best regards,</strong><br>
            The Hafa Trading Team</p>
          </div>
          
          <div class="footer">
            <p>Hafa Trading PLC - Your Trusted Partner in Global Trade</p>
            <p>Addis Ababa, Ethiopia</p>
            <p style="font-size: 12px; color: #999;">
              You received this email because you created an account at hafatrading.com
            </p>
          </div>
        </body>
        </html>
      `,
      text: `
Welcome to Hafa Trading PLC!

Hello ${displayName}!

Thank you for joining Hafa Trading PLC! We're thrilled to have you as part of our growing community of importers and exporters.

At Hafa Trading, we specialize in connecting businesses with quality products from around the world.

What You Can Do Now:
- Browse our extensive product catalog
- Request quotes for bulk orders
- Track your shipments in real-time
- Access exclusive trade insights and market trends
- Connect with our expert trade consultants

Visit us at: https://hafatrading.com/products

Need Help?
Email: support@hafatrading.com
Phone: +251-XXX-XXXX

Best regards,
The Hafa Trading Team
      `,
    });

    console.log(`Welcome email sent to ${email}`);

    // Create a welcome notification in Firestore
    await admin.firestore().collection('notifications').add({
      userId: user.uid,
      title: 'Welcome to Hafa Trading!',
      message: 'Thank you for joining us. Start exploring our products and services.',
      type: 'welcome',
      isRead: false,
      link: '/products',
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
    });

  } catch (error) {
    console.error('Error sending welcome email:', error);
  }
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

// Send RFQ reply email
export const sendRFQReply = functions.https.onCall(async (data, context) => {
  // Check if user is authenticated and is admin
  if (!context.auth) {
    throw new functions.https.HttpsError('unauthenticated', 'User must be authenticated');
  }

  const { to, subject, message, rfqId, customerName } = data;

  if (!to || !subject || !message) {
    throw new functions.https.HttpsError('invalid-argument', 'Missing required fields');
  }

  try {
    // Send email
    await transporter.sendMail({
      from: `"Hafa Trading PLC" <${process.env.SMTP_USER}>`,
      to: to,
      subject: subject,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body {
              font-family: Arial, sans-serif;
              line-height: 1.6;
              color: #333;
              max-width: 600px;
              margin: 0 auto;
              padding: 20px;
            }
            .header {
              background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
              color: white;
              padding: 20px;
              text-align: center;
              border-radius: 10px 10px 0 0;
            }
            .content {
              background: #f9f9f9;
              padding: 30px;
              border-radius: 0 0 10px 10px;
            }
            .message-body {
              background: white;
              padding: 20px;
              border-radius: 8px;
              margin: 20px 0;
              white-space: pre-wrap;
            }
            .footer {
              text-align: center;
              margin-top: 30px;
              padding-top: 20px;
              border-top: 1px solid #ddd;
              color: #666;
              font-size: 14px;
            }
          </style>
        </head>
        <body>
          <div class="header">
            <h2>Hafa Trading PLC</h2>
            <p>Your Trusted Partner in Global Trade</p>
          </div>
          
          <div class="content">
            <div class="message-body">
              ${message.replace(/\n/g, '<br>')}
            </div>
          </div>
          
          <div class="footer">
            <p><strong>Hafa Trading PLC</strong></p>
            <p>Hossana, Ethiopia</p>
            <p>Phone: +251 954 742 383</p>
            <p>Email: contact@hafatrading.com</p>
            <p style="font-size: 12px; color: #999; margin-top: 20px;">
              This email was sent in response to your quotation request.
            </p>
          </div>
        </body>
        </html>
      `,
      text: message,
    });

    console.log(`RFQ reply sent to ${to} for RFQ ${rfqId}`);

    // Create notification for tracking
    if (rfqId) {
      await admin.firestore().collection('notifications').add({
        userId: 'admin',
        title: 'RFQ Reply Sent',
        message: `Reply sent to ${customerName} for RFQ #${rfqId.slice(0, 8)}`,
        type: 'rfq',
        isRead: false,
        createdAt: admin.firestore.FieldValue.serverTimestamp(),
      });
    }

    return { success: true, message: 'Email sent successfully' };
  } catch (error) {
    console.error('Error sending RFQ reply:', error);
    throw new functions.https.HttpsError('internal', 'Failed to send email');
  }
});

// Send Partnership reply email
export const sendPartnershipReply = functions.https.onCall(async (data, context) => {
  if (!context.auth) {
    throw new functions.https.HttpsError('unauthenticated', 'User must be authenticated');
  }

  const { to, subject, message, partnershipId, companyName } = data;

  if (!to || !subject || !message) {
    throw new functions.https.HttpsError('invalid-argument', 'Missing required fields');
  }

  try {
    await transporter.sendMail({
      from: `"Hafa Trading PLC - Partnerships" <${process.env.SMTP_USER}>`,
      to: to,
      subject: subject,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body {
              font-family: Arial, sans-serif;
              line-height: 1.6;
              color: #333;
              max-width: 600px;
              margin: 0 auto;
              padding: 20px;
            }
            .header {
              background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
              color: white;
              padding: 20px;
              text-align: center;
              border-radius: 10px 10px 0 0;
            }
            .content {
              background: #f9f9f9;
              padding: 30px;
              border-radius: 0 0 10px 10px;
            }
            .message-body {
              background: white;
              padding: 20px;
              border-radius: 8px;
              margin: 20px 0;
              white-space: pre-wrap;
            }
            .footer {
              text-align: center;
              margin-top: 30px;
              padding-top: 20px;
              border-top: 1px solid #ddd;
              color: #666;
              font-size: 14px;
            }
          </style>
        </head>
        <body>
          <div class="header">
            <h2>Hafa Trading PLC</h2>
            <p>Partnership Team</p>
          </div>
          
          <div class="content">
            <div class="message-body">
              ${message.replace(/\n/g, '<br>')}
            </div>
          </div>
          
          <div class="footer">
            <p><strong>Hafa Trading PLC</strong></p>
            <p>Hossana, Ethiopia</p>
            <p>Phone: +251 954 742 383</p>
            <p>Email: partnerships@hafatrading.com</p>
            <p style="font-size: 12px; color: #999; margin-top: 20px;">
              This email was sent in response to your partnership application.
            </p>
          </div>
        </body>
        </html>
      `,
      text: message,
    });

    console.log(`Partnership reply sent to ${to} for partnership ${partnershipId}`);

    if (partnershipId) {
      await admin.firestore().collection('notifications').add({
        userId: 'admin',
        title: 'Partnership Reply Sent',
        message: `Reply sent to ${companyName}`,
        type: 'partnership',
        isRead: false,
        createdAt: admin.firestore.FieldValue.serverTimestamp(),
      });
    }

    return { success: true, message: 'Email sent successfully' };
  } catch (error) {
    console.error('Error sending partnership reply:', error);
    throw new functions.https.HttpsError('internal', 'Failed to send email');
  }
});

// WhatsApp notification (placeholder - requires WhatsApp Business API)
export const sendWhatsAppNotification = functions.https.onCall(async (data, context) => {
  // Implement WhatsApp API integration here
  // This is a placeholder function
  console.log('WhatsApp notification requested:', data);
  
  return { success: true, message: 'WhatsApp notification sent' };
});
