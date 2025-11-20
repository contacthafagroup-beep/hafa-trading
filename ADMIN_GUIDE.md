# 📊 Admin Panel Guide - Hafa General Trading PLC

## 🔐 Accessing the Admin Panel

### Step 1: Create an Admin Account
1. Go to http://localhost:3000/auth/register
2. Create an account with your email
3. Sign in

### Step 2: Set Admin Role in Firestore
1. Go to [Firebase Console](https://console.firebase.google.com/project/hafa-general-trading-plc/firestore)
2. Click on **Firestore Database**
3. Find the `users` collection
4. Find your user document (by your email)
5. Click **Edit** (pencil icon)
6. Change the `role` field from `"customer"` to `"superadmin"`
7. Click **Update**

### Step 3: Access Admin Panel
- Go to http://localhost:3000/admin
- You now have full admin access!

---

## 📦 Product Management

### View All Products
**URL**: http://localhost:3000/admin/products

**Features:**
- View all 76 products in a table
- Search products by name
- Filter by type (Export/Import)
- See product stats
- Quick actions (View, Edit, Delete)

### Add New Product
**URL**: http://localhost:3000/admin/products/new

**Steps:**
1. Click "Add Product" button
2. Fill in the form:
   - **Basic Info**: Name, Type, Category, Description
   - **Pricing**: Price, Unit, Min Order Quantity
   - **Details**: HS Code, Certifications, Origin, Warranty
3. Click "Create Product"

**Required Fields:**
- Product Name
- Type (Export/Import)
- Category
- Description
- Price
- Unit
- Min Order Quantity

### Edit Product
1. Go to Admin Products page
2. Click the **Edit** icon (pencil) on any product
3. Modify the details
4. Click "Save Changes"

### Delete Product
1. Go to Admin Products page
2. Click the **Delete** icon (trash) on any product
3. Confirm deletion

### View Product Details
1. Go to Admin Products page
2. Click the **Eye** icon on any product
3. Opens product details page in new tab

---

## 🛍️ Product Details Page

**URL Pattern**: http://localhost:3000/products/[product-id]

**Example**: http://localhost:3000/products/exp-001

**Features:**
- Full product information
- Product image placeholder
- Price and minimum order
- Certifications and badges
- HS Code, Origin, Warranty
- "Request Quote" button
- "Contact Us" button
- Product description
- Specifications table
- Why Choose Us section
- Shipping information

**How Customers Access:**
1. Browse Export or Import Products
2. Click on any product card
3. See full product details

---

## 📊 Admin Dashboard

**URL**: http://localhost:3000/admin

**Features:**
- Overview statistics
- Total revenue
- Total orders
- Product count
- Customer count
- Recent orders
- Pending RFQs
- Active shipments
- Alerts & notifications

---

## 🎯 Other Admin Features

### Orders Management
**URL**: http://localhost:3000/admin/orders
- View all orders
- Update order status
- Process payments
- Generate invoices

### RFQ Management
**URL**: http://localhost:3000/admin/rfqs
- View quotation requests
- Send quotes to customers
- Track RFQ status

### Customer Management
**URL**: http://localhost:3000/admin/customers
- View all customers
- Manage customer accounts
- View order history

### Supplier Management
**URL**: http://localhost:3000/admin/suppliers
- View supplier list
- Approve/reject suppliers
- Manage supplier details

### Blog Management
**URL**: http://localhost:3000/admin/blog
- Create blog posts
- Edit existing posts
- Publish/unpublish posts

### Analytics
**URL**: http://localhost:3000/admin/analytics
- View sales analytics
- Product performance
- Customer insights
- Revenue reports

---

## 🔧 Product Data Structure

### Export Product Example
```javascript
{
  id: 'exp-001',
  name: 'Fresh Rosemary',
  type: 'export',
  category: 'agricultural',
  subcategory: 'Fresh Vegetables',
  price: 12,
  unit: 'kg',
  minOrder: 100,
  hsCode: '1211.90',
  certifications: ['Organic', 'HACCP'],
  description: 'High-quality fresh rosemary...',
  image: '/products/rosemary.jpg'
}
```

### Import Product Example
```javascript
{
  id: 'imp-001',
  name: 'Smartphones',
  type: 'import',
  category: 'electronics',
  subcategory: 'Consumer Electronics',
  price: 200,
  unit: 'piece',
  minOrder: 50,
  warranty: '1 year',
  origin: 'China',
  description: 'Latest smartphones...',
  image: '/products/smartphone.jpg'
}
```

---

## 📝 Tips for Managing Products

### Best Practices
1. **Use clear product names** - Be specific and descriptive
2. **Add all certifications** - Builds trust with customers
3. **Set realistic minimum orders** - Based on your supply chain
4. **Include HS codes** - Required for customs
5. **Write detailed descriptions** - Helps customers make decisions
6. **Keep prices updated** - Reflect current market rates

### Product Categories

**Export Categories:**
- Agricultural (vegetables, fruits, grains)
- Livestock (cattle, sheep, goats)
- Herbs & Medicinal Plants
- Coffee & Spices

**Import Categories:**
- Electronics & Appliances
- Electric Vehicles & Mobility
- Machinery & Industrial
- Household & Consumer Goods
- Automotive Parts

---

## 🚀 Quick Actions

### Add Multiple Products
1. Prepare product data in spreadsheet
2. Use Admin Panel to add one by one
3. Or create a bulk import script (advanced)

### Update Prices
1. Go to Admin Products
2. Search for product
3. Click Edit
4. Update price
5. Save

### Feature Products
1. Edit product
2. Set `isFeatured: true`
3. Featured products appear on homepage

### Deactivate Products
1. Edit product
2. Set `isActive: false`
3. Product won't show on public pages

---

## 🆘 Troubleshooting

### Can't Access Admin Panel
- Check if you set role to "superadmin" in Firestore
- Clear browser cache
- Try logging out and back in

### Products Not Showing
- Check if `isActive` is set to `true`
- Verify product type matches the page (export/import)
- Check browser console for errors

### Can't Add Products
- Ensure all required fields are filled
- Check Firebase connection
- Verify you have admin permissions

---

## 📚 Related Documentation

- **README.md** - Project overview
- **DEPLOYMENT.md** - Deployment guide
- **API_DOCUMENTATION.md** - API reference
- **SETUP_COMPLETE.md** - Setup status

---

**Need Help?** Check the Firebase Console or browser console for error messages.
