# 🚀 QUICK SETUP GUIDE - TDesigns 254

## Step 1: Firebase Setup (5 minutes)

1. Go to https://console.firebase.google.com/
2. Click "Add project" → Name it "TDesigns 254"
3. Disable Google Analytics (optional)
4. Click "Create Project"

## Step 2: Enable Firestore

1. In your Firebase project, click "Firestore Database" in the left menu
2. Click "Create database"
3. Choose "Start in test mode" (IMPORTANT for development)
4. Select your region (choose closest to Kenya)
5. Click "Enable"

## Step 3: Get Firebase Config

1. Click the gear icon ⚙️ → "Project settings"
2. Scroll to "Your apps" section
3. Click the web icon `</>`
4. Give it a nickname: "TDesigns 254 Web"
5. Don't check "Firebase Hosting" yet
6. Click "Register app"
7. **COPY** the firebaseConfig object shown

## Step 4: Update firebase-config.js

Open `firebase-config.js` and replace with your config:

```javascript
const firebaseConfig = {
    apiKey: "AIza...",              // YOUR API KEY
    authDomain: "your-app.firebaseapp.com",
    projectId: "your-project-id",
    storageBucket: "your-app.appspot.com",
    messagingSenderId: "123456789",
    appId: "1:123456789:web:abc..."
};
```

## Step 5: Add Sample Products

1. In Firebase Console, go to Firestore Database
2. Click "Start collection"
3. Collection ID: `products`
5. Add first document:
   - Document ID: (Auto-ID)
   - Fields:
     ```
     name (string): "Crochet Cardigan"
     category (string): "clothing"
     price (number): 4500
     description (string): "Stylish handmade crochet cardigan"
     image (string): "https://via.placeholder.com/400x400/E91E8C/FFFFFF?text=Cardigan"
     inStock (boolean): true
     ```
5. Click "Save"
6. Add more products following the same pattern

## Step 6: Run Locally

### Option A: Using Python
```bash
python -m http.server 8000
```
Then open: http://localhost:8000

### Option B: Using VS Code Live Server
1. Install "Live Server" extension in VS Code
2. Right-click `index.html`
3. Select "Open with Live Server"

### Option C: Using Node.js
```bash
npx serve
```

## Step 7: Test the Website

### Test Customer Features:
1. Browse products on Shop page
2. Add items to cart
3. Go to checkout and place an order
4. Note the Order ID
5. Track the order using the Order ID

### Test Admin Features:
1. Go to `admin.html`
2. Login with password: `tdesigns2024`
3. View dashboard statistics
4. Add a new product
5. Update an order status
6. View customer messages

## 📱 Important URLs

- **Home**: index.html
- **Shop**: shop.html
- **Track Order**: track-order.html
- **Contact**: contact.html
- **Checkout**: checkout.html
- **Admin Panel**: admin.html

## 🔐 Admin Credentials

- **Password**: `tdesigns2024`
- **Change this** in `admin.js` line 6 before deployment!

## 🎨 Customization

### Change Store Phone Number
In `contact.html` line 63, update:
```html
<p>+254 XXX XXX XXX</p>
```

### Change Colors
In `styles.css` lines 15-20, update:
```css
--primary-color: #E91E8C;
--secondary-color: #2D1B4E;
```

### Change Instagram Handle
Update all instances of `@tdesigns254` to your actual Instagram handle

## 🚀 Deploy to Firebase Hosting (Optional)

```bash
npm install -g firebase-tools
firebase login
firebase init hosting
# Choose your Firebase project
# Set public directory to: .
# Configure as single-page app: No
# Don't overwrite existing files
firebase deploy
```

Your site will be live at: `https://your-project-id.web.app`

## ✅ Success Checklist

Before submitting your IA:

- [ ] Firebase is configured correctly
- [ ] Sample products are in database
- [ ] Can place and track orders
- [ ] Admin panel works
- [ ] Contact form saves to database
- [ ] Changed default admin password
- [ ] Updated phone number and Instagram
- [ ] Tested on mobile and desktop
- [ ] Took screenshots for documentation
- [ ] Got client (Trina) feedback

## 🆘 Troubleshooting

**"Firebase is not defined"**
- Check firebase-config.js has correct credentials
- Make sure you're using a local server, not opening HTML directly

**"Permission denied" in Firestore**
- Ensure Firestore is in "test mode"
- Rules should be:
  ```
  allow read, write: if true;
  ```

**Products not showing**
- Add products manually in Firestore
- Or the sample products in shop.js will show

**Admin can't login**
- Default password is `tdesigns2024`
- Check admin.js line 6

## 📞 Need Help?

Check the full README.md for detailed documentation!

---

**Good luck with your IB IA! 🎓**
