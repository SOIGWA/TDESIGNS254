// ==================== SHOP PAGE FUNCTIONALITY ====================

// Sample products (will be replaced with Firebase data)
const sampleProducts = [
    {
        id: 'prod1',
        name: 'Sunset Stripe Ribbed Pullover',
        category: 'clothing',
        price: 3200,
        image: 'IMAGES/orange striped crochet sweate.jpeg',
        description: 'Cozy crewneck sweater in bold burnt orange and cream stripes. Features a high-texture bobble stitch and ribbed hem for a snug, varsity-chic fit',
        inStock: true
    },
    {
        id: 'prod2',
        name: 'Classic Cream Granny Duster',
        category: 'clothing',
        price: 3450,
        image: 'IMAGES/cream longline  open front cardigan.jpeg',
            description: 'An elegant, longline duster cardigan crafted with a timeless granny stitch cluster. Flowy and lightweight, it’s a versatile staple for any wardrobe',
        inStock: true
    },
    {
        id: 'prod3',    
        name: 'Pastel Pop Long-Tail Hair Bow',
        category: 'accessories',
        price: 350,
        image: 'IMAGES/Blue pink hair bow.jpeg',
        description: 'A playful, oversized coquette-style hair bow with long tails. Handcrafted in a striking pink and blue striped pattern with a beautiful ribbed texture',
        inStock: true
    },
    {
        id: 'prod4',
        name:  'Sky blue hair bow',
        category: 'accessories',
        price: 350,
        image: 'IMAGES/sky blue hair bow.jpeg',
        description: 'A soft and elegant sky blue hair bow with a ribbed texture',
        inStock: true
    },
    {
        id: 'prod5',
        name: 'Purple front tie cardigan',
        category: 'clothing',
        price: 2950,
        image: 'IMAGES/purple crotchet front tie cardigan.jpeg',
        description: 'A stylish front-tie cardigan in rich purple with a ribbed texture',
        inStock: true
    },
    {
        id: 'prod6',
        name: 'Blue shoulder shrug',
        category: 'clothing',
        price: 1000,
        image: 'IMAGES/blue crotchet shrug.jpeg',
        description: 'A soft and cozy blue crochet shrug with a ribbed texture',
        inStock: true
    },
    {
        id: 'prod7',
        name: 'Red crochet hair bow',
        category: 'accessories',
        price: 350,
        image: 'IMAGES/Red crotchet hair bow.jpeg',
        description: 'A beautiful red crochet hair bow with a ribbed texture',
        inStock: true
    },
    {
        id: 'prod8',
        name: 'black crotchet hair bow',
        category: 'accessories',
        price: 350,
        image: 'IMAGES/black crotchet hair bow.jpeg',
        description: 'A beautiful black crochet hair bow with a ribbed texture',
        inStock: true
    },
];

let allProducts = [];
let currentCategory = 'all';

// ==================== LOAD PRODUCTS ====================
async function loadProducts() {
    const productsGrid = document.getElementById('productsGrid');
    
    try {
        // Try to load from Firebase
        const productsSnapshot = await db.collection('products').get();
        
        if (!productsSnapshot.empty) {
            allProducts = [];
            productsSnapshot.forEach(doc => {
                allProducts.push({
                    id: doc.id,
                    ...doc.data()
                });
            });
        } else {
            // Use sample products if Firebase is empty
            allProducts = sampleProducts;
            console.log('Using sample products');
        }
    } catch (error) {
        console.log('Firebase not configured, using sample products');
        allProducts = sampleProducts;
    }
    
    displayProducts();
}

// ==================== DISPLAY PRODUCTS ====================
function displayProducts() {
    const productsGrid = document.getElementById('productsGrid');
    
    // Filter products by category
    const filteredProducts = currentCategory === 'all' 
        ? allProducts 
        : allProducts.filter(p => p.category === currentCategory);
    
    if (filteredProducts.length === 0) {
        productsGrid.innerHTML = '<p class="no-products">No products found in this category.</p>';
        return;
    }
    
    let html = '';
    filteredProducts.forEach(product => {
        html += `
            <div class="product-card" onclick="showProductDetail('${product.id}')">
                <img src="${product.image}" alt="${product.name}" class="product-image">
                <div class="product-info">
                    <p class="product-category">${product.category}</p>
                    <h3 class="product-name">${product.name}</h3>
                    <p class="product-price">KSh ${product.price.toLocaleString()}</p>
                    <button class="btn btn-primary" onclick="event.stopPropagation(); addToCartFromShop('${product.id}')">
                        <i class="fas fa-shopping-cart"></i> Add to Cart
                    </button>
                </div>
            </div>
        `;
    });
    
    productsGrid.innerHTML = html;
}

// ==================== CATEGORY FILTER ====================
document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        // Remove active class from all buttons
        document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
        
        // Add active class to clicked button
        this.classList.add('active');
        
        // Update current category
        currentCategory = this.dataset.category;
        
        // Display filtered products
        displayProducts();
    });
});

// ==================== ADD TO CART FROM SHOP ====================
function addToCartFromShop(productId) {
    const product = allProducts.find(p => p.id === productId);
    if (product) {
        addToCart(product);
    }
}

// ==================== SHOW PRODUCT DETAIL ====================
function showProductDetail(productId) {
    const product = allProducts.find(p => p.id === productId);
    if (!product) return;
    
    const modal = document.getElementById('productModal');
    const productDetail = document.getElementById('productDetail');
    
    productDetail.innerHTML = `
        <div class="product-detail-content">
            <img src="${product.image}" alt="${product.name}" style="width: 100%; border-radius: 15px; margin-bottom: 20px;">
            <p class="product-category">${product.category}</p>
            <h2>${product.name}</h2>
            <p class="product-price" style="font-size: 28px; margin: 20px 0;">KSh ${product.price.toLocaleString()}</p>
            <p style="color: var(--text-light); line-height: 1.8; margin-bottom: 20px;">${product.description}</p>
            <div style="display: flex; gap: 15px;">
                <button class="btn btn-primary" onclick="addToCartFromShop('${product.id}'); document.getElementById('productModal').style.display='none';">
                    <i class="fas fa-shopping-cart"></i> Add to Cart
                </button>
                <button class="btn btn-secondary" onclick="document.getElementById('productModal').style.display='none';">
                    Close
                </button>
            </div>
        </div>
    `;
    
    modal.style.display = 'block';
}

// ==================== INITIALIZE ====================
document.addEventListener('DOMContentLoaded', () => {
    loadProducts();
});
