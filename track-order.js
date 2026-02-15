// ==================== ORDER TRACKING FUNCTIONALITY ====================

document.addEventListener('DOMContentLoaded', () => {
    const trackOrderForm = document.getElementById('trackOrderForm');
    
    if (trackOrderForm) {
        trackOrderForm.addEventListener('submit', handleTrackOrder);
    }
});

async function handleTrackOrder(e) {
    e.preventDefault();
    
    const orderId = document.getElementById('orderId').value.trim();
    const orderStatusSection = document.getElementById('orderStatusSection');
    const errorMessage = document.getElementById('errorMessage');
    
    // Hide previous results
    orderStatusSection.style.display = 'none';
    errorMessage.style.display = 'none';
    
    if (!orderId) {
        showError('Please enter an order ID');
        return;
    }
    
    try {
        // Query Firebase for the order
        const orderDoc = await db.collection('orders').doc(orderId).get();
        
        if (!orderDoc.exists) {
            showError('Order not found. Please check your order ID and try again.');
            return;
        }
        
        const orderData = orderDoc.data();
        displayOrderStatus(orderId, orderData);
        
    } catch (error) {
        console.error('Error tracking order:', error);
        showError('There was an error tracking your order. Please try again later.');
    }
}

function displayOrderStatus(orderId, orderData) {
    const orderStatusSection = document.getElementById('orderStatusSection');
    const orderDetails = document.getElementById('orderDetails');
    
    // Format date
    const orderDate = orderData.createdAt ? 
        new Date(orderData.createdAt).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        }) : 'N/A';
    
    // Display order details
    orderDetails.innerHTML = `
        <h3>Order #${orderId}</h3>
        <p><strong>Customer:</strong> ${orderData.customerName || 'N/A'}</p>
        <p><strong>Email:</strong> ${orderData.customerEmail || 'N/A'}</p>
        <p><strong>Order Date:</strong> ${orderDate}</p>
        <p><strong>Total Amount:</strong> KSh ${(orderData.totalAmount || 0).toLocaleString()}</p>
        <p><strong>Current Status:</strong> <span style="color: var(--primary-color); font-weight: bold;">${formatStatus(orderData.status)}</span></p>
    `;
    
    // Update timeline
    updateTimeline(orderData.status);
    
    // Show the section
    orderStatusSection.style.display = 'block';
    
    // Scroll to the result
    orderStatusSection.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

function updateTimeline(status) {
    // Reset all timeline items
    document.querySelectorAll('.timeline-item').forEach(item => {
        item.classList.remove('active', 'completed');
    });
    
    // Status mapping
    const statusSteps = {
        'received': ['status-received'],
        'processing': ['status-received', 'status-processing'],
        'ready': ['status-received', 'status-processing', 'status-ready'],
        'delivered': ['status-received', 'status-processing', 'status-ready', 'status-delivered']
    };
    
    const currentSteps = statusSteps[status.toLowerCase()] || [];
    
    currentSteps.forEach((stepId, index) => {
        const element = document.getElementById(stepId);
        if (element) {
            if (index === currentSteps.length - 1) {
                element.classList.add('active');
            } else {
                element.classList.add('completed');
            }
        }
    });
}

function formatStatus(status) {
    const statusMap = {
        'received': 'Order Received',
        'processing': 'Processing',
        'ready': 'Ready for Delivery',
        'delivered': 'Delivered'
    };
    return statusMap[status.toLowerCase()] || status;
}

function showError(message) {
    const errorMessage = document.getElementById('errorMessage');
    errorMessage.textContent = message;
    errorMessage.style.display = 'block';
}

// ==================== DEMO: Create Sample Order (for testing) ====================
// This function is for demonstration purposes only
async function createSampleOrder() {
    try {
        const sampleOrder = {
            customerName: 'Jane Doe',
            customerEmail: 'jane@example.com',
            customerPhone: '+254 712 345 678',
            items: [
                {
                    name: 'Crochet Cardigan',
                    quantity: 1,
                    price: 4500
                }
            ],
            totalAmount: 4500,
            status: 'processing',
            createdAt: new Date().toISOString(),
            shippingAddress: 'Nairobi, Kenya'
        };
        
        const docRef = await db.collection('orders').add(sampleOrder);
        console.log('Sample order created with ID:', docRef.id);
        alert(`Sample order created! Order ID: ${docRef.id}\nUse this ID to test order tracking.`);
    } catch (error) {
        console.error('Error creating sample order:', error);
    }
}

// Uncomment the line below to create a sample order when the page loads (for testing only)
// document.addEventListener('DOMContentLoaded', createSampleOrder);
