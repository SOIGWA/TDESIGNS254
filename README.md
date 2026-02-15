# TDesigns 254 - Crochet Shop Website

An Instagram-based crochet shop with order tracking system built for IB Computer Science Internal Assessment.

## 📋 Project Overview

This is a fully functional e-commerce website for TDesigns 254, a handmade crochet business. The system allows customers to browse products, place orders, and track their orders online, while the admin can manage products, orders, and customer messages.

## 🎯 Success Criteria (IB IA)

1. ✅ The system allows customers to view available products
2. ✅ The system stores order details in a database (Firebase)
3. ✅ The admin can update product stock and manage inventory
4. ✅ The system validates user input
5. ✅ The system restricts admin access via login
6. ✅ Customers can place orders online with order confirmation
7. ✅ Orders can be tracked using order ID
8. ✅ Contact form for customer inquiries
9. ✅ Responsive design for mobile and desktop
10. ✅ Professional, user-friendly interface

## 🛠️ Technologies Used

- **Frontend**: HTML5, CSS3, JavaScript
- **Backend**: Firebase (Firestore Database)
- **Authentication**: Simple password-based (for admin)
- **Icons**: Font Awesome
- **Hosting**: Can be deployed on Firebase Hosting, Netlify, or GitHub Pages

## 📁 Project Structure

```
tdesigns-shop/
├── index.html              # Home page
├── shop.html              # Products catalog
├── contact.html           # Contact form
├── track-order.html       # Order tracking
├── checkout.html          # Checkout page
├── admin.html            # Admin dashboard
├── styles.css            # Global styles
├── script.js             # Main JavaScript
├── shop.js               # Shop page functionality
├── contact.js            # Contact form handler
├── track-order.js        # Order tracking logic
├── checkout.js           # Checkout functionality
├── admin.js              # Admin panel logic
├── firebase-config.js    # Firebase configuration
├── logo.png              # TDesigns 254 logo
├── hero-image.png        # Homepage hero image
└── README.md             # This file
```

## 🚀 Setup Instructions

### 1. Firebase Setup

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Create a new project called "TDesigns 254"
3. Enable Firestore Database:
   - Go to Firestore Database
   - Click "Create Database"
   - Start in **test mode** (for development)
   - Choose your region

4. Get your Firebase configuration:
   - Go to Project Settings
   - Scroll to "Your apps"
   - Click the web icon (</>)
   - Copy the configuration object

5. Update `firebase-config.js`:
   ```javascript
   const firebaseConfig = {
       apiKey: "YOUR_API_KEY",
       authDomain: "YOUR_AUTH_DOMAIN",
       projectId: "YOUR_PROJECT_ID",
       storageBucket: "YOUR_STORAGE_BUCKET",
       messagingSenderId: "YOUR_SENDER_ID",
       appId: "YOUR_APP_ID"
   };
   ```

### 2. Firestore Database Structure

Create these collections in Firestore:

**Collection: `products`**
```json
{
   "name": "Crochet Cardigan",
   "category": "clothing",
   "price": 4500,
   "description": "Stylish handmade crochet cardigan",
   "image": "URL_TO_IMAGE",
   "inStock": true
}
```

**Collection: `orders`**
```json
{
  "customerName": "John Doe",
  "customerEmail": "john@example.com",
  "customerPhone": "+254 712 345 678",
  "shippingAddress": "Nairobi, Kenya",
  "items": [...],
  "totalAmount": 5000,
  "status": "received",
  "createdAt": "2024-01-15T10:30:00Z"
}
```

**Collection: `messages`**
```json
{
  "name": "Customer Name",
  "email": "customer@email.com",
  "subject": "Inquiry",
  "message": "Message content",
  "timestamp": "2024-01-15T10:30:00Z"
}
```

### 3. Admin Access

- Default admin password: `tdesigns2024`
- Change this in `admin.js` line 6
- Access admin panel at: `admin.html`

### 4. Local Development

1. Open the project folder
2. Use a local server (required for Firebase):
   - Using Python: `python -m http.server 8000`
   - Using Node.js: `npx serve`
   - Using VS Code: Install "Live Server" extension

3. Open browser to `http://localhost:8000`

### 5. Deployment Options

#### Option A: Firebase Hosting
```bash
npm install -g firebase-tools
firebase login
firebase init hosting
firebase deploy
```

#### Option B: Netlify
- Drag and drop the entire folder to Netlify

#### Option C: GitHub Pages
- Push to GitHub repository
- Enable GitHub Pages in repository settings

## 📱 Features

### Customer Features
- Browse product catalog by category
- View product details
- Add items to shopping cart
- Place orders with delivery information
- Track order status using order ID
- Contact form for inquiries
- Responsive mobile design

### Admin Features
- Dashboard with statistics
- View all orders and update status
- Add, edit, and delete products
- View customer messages
- Real-time data updates

## 🎨 Customization

### Change Colors
Edit `styles.css` variables:
```css
:root {
    --primary-color: #E91E8C;
    --secondary-color: #2D1B4E;
    --accent-color: #FF6B9D;
}
```

### Add Products
1. Login to admin panel
2. Go to "Products" tab
3. Click "Add New Product"
4. Fill in details and save

### Update Order Status
1. Login to admin panel
2. Go to "Orders" tab
3. Click edit button on order
4. Enter new status: received, processing, ready, or delivered

## 📝 IB IA Documentation Tips

### Criterion A: Planning
- Document client (your cousin Trina)
- Show problem: manual order tracking, no online presence
- Include interview screenshots/transcripts

### Criterion C: Development
- Explain algorithms (e.g., cart total calculation, order status updates)
- Show database structure
- Annotate code snippets
- Include testing during development

### Criterion D: Testing
- Create test tables for each success criterion
- Test normal, boundary, and abnormal cases
- Include screenshots
- Get client feedback

### Criterion E: Evaluation
- Analyze strengths and weaknesses
- Link back to success criteria
- Suggest realistic improvements
- Include client satisfaction feedback

## 🐛 Common Issues & Solutions

### Firebase not working
- Check if firebase-config.js has correct credentials
- Ensure Firestore is in test mode
- Check browser console for errors

### Products not loading
- Add sample products in Firestore
- Or use the sample products in shop.js

### Admin can't login
- Check password in admin.js (default: tdesigns2024)
- Clear browser cache

## 📞 Support

For questions about this project:
- Instagram: @tdesigns254
- Email: tdesigns254@gmail.com

## 📄 License

This project is created for educational purposes (IB Computer Science IA).

---

**Built with ❤️ for TDesigns 254**
