// ==================== CHECKOUT FUNCTIONALITY ====================

let checkoutCart = [];

document.addEventListener('DOMContentLoaded', () => {
    loadCheckoutCart();
    displayOrderSummary();
    
    const checkoutForm = document.getElementById('checkoutForm');
    if (checkoutForm) {
        checkoutForm.addEventListener('submit', handleCheckout);
    }
});

function loadCheckoutCart() {
    const savedCart = localStorage.getItem('checkout_cart');
    if (savedCart) {
        checkoutCart = JSON.parse(savedCart);
    } else {
        // Redirect back to shop if no items
        window.location.href = 'shop.html';
    }
}

function displayOrderSummary() {
    const orderSummary = document.getElementById('orderSummary');
    
    if (checkoutCart.length === 0) {
        orderSummary.innerHTML = '<p>No items in cart</p>';
        return;
    }
    
    let total = 0;
    let html = '';
    
    checkoutCart.forEach(item => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;
        
        html += `
            <div class="order-summary-item">
                <div>
                    <strong>${item.name}</strong>
                    <p style="color: var(--text-light); font-size: 14px;">Qty: ${item.quantity}</p>
                </div>
                <div style="text-align: right;">
                    <strong style="color: var(--primary-color);">KSh ${itemTotal.toLocaleString()}</strong>
                </div>
            </div>
        `;
    });
    
    html += `
        <div class="order-total">
            <span>Total</span>
            <span style="color: var(--primary-color);">KSh ${total.toLocaleString()}</span>
        </div>
    `;
    
    orderSummary.innerHTML = html;
}

async function handleCheckout(e) {
    e.preventDefault();
    
    const submitBtn = e.target.querySelector('button[type="submit"]');
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing...';
    
    // Generate order ID
    const orderId = 'ORD-' + Date.now();
    
    // Calculate total
    const total = checkoutCart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    
    // Prepare order data
    const orderData = {
        customerName: document.getElementById('fullName').value,
        customerEmail: document.getElementById('email').value,
        customerPhone: document.getElementById('phone').value,
        shippingAddress: document.getElementById('address').value,
        specialInstructions: document.getElementById('notes').value,
        items: checkoutCart,
        totalAmount: total,
        status: 'received',
        createdAt: new Date().toISOString()
    };
    
    try {
        // Save order to Firebase with custom ID
        await db.collection('orders').doc(orderId).set(orderData);
        
        // Clear cart
        localStorage.removeItem('checkout_cart');
        localStorage.removeItem('tdesigns_cart');
        
        // Show success modal
        showSuccessModal(orderId);
        
    } catch (error) {
        console.error('Error placing order:', error);
        alert('There was an error placing your order. Please try again or contact us directly.');
        submitBtn.disabled = false;
        submitBtn.innerHTML = '<i class="fas fa-check-circle"></i> Place Order';
    }
}

function showSuccessModal(orderId) {
    const modal = document.getElementById('successModal');
    const orderIdDisplay = document.getElementById('orderIdDisplay');
    
    orderIdDisplay.textContent = orderId;
    modal.style.display = 'block';
    
    // Prevent closing modal by clicking outside
    modal.onclick = function(e) {
        if (e.target === modal) {
            e.stopPropagation();
        }
    };
}
