// ==================== CONTACT FORM FUNCTIONALITY WITH RATE LIMITING ====================

// Rate limiting configuration
const RATE_LIMIT_KEY         = 'tdesigns_contact_submits';
const RATE_LIMIT_MINUTES     = 5;  // sliding window size
const MAX_SUBMISSIONS        = 3;  // allowed submits per window

document.addEventListener('DOMContentLoaded', () => {
    console.log('✅ Contact page loaded');
    
    // Check if Firebase is loaded
    if (typeof firebase === 'undefined') {
        console.error('❌ Firebase is not loaded!');
        return;
    }
    console.log('✅ Firebase is available');
    
    // Check if Firestore is initialized
    if (typeof db === 'undefined') {
        console.error('❌ Firestore (db) is not initialized!');
        return;
    }
    console.log('✅ Firestore is initialized');
    
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        console.log('✅ Contact form found');
        contactForm.addEventListener('submit', handleContactFormSubmit);
    } else {
        console.error('❌ Contact form not found!');
    }
});

// helpers for the submission history stored in localStorage
function getSubmissionHistory() {
    const raw = localStorage.getItem(RATE_LIMIT_KEY);
    try {
        return raw ? JSON.parse(raw) : [];
    } catch (e) {
        return [];
    }
}

function saveSubmissionHistory(arr) {
    localStorage.setItem(RATE_LIMIT_KEY, JSON.stringify(arr));
}

// remove entries older than the window
function pruneHistory(history) {
    const now = Date.now();
    const cutoff = now - RATE_LIMIT_MINUTES * 60 * 1000;
    return history.filter(ts => new Date(ts).getTime() > cutoff);
}

function isRateLimited() {
    const history = pruneHistory(getSubmissionHistory());
    return history.length >= MAX_SUBMISSIONS;
}

function getRemainingWaitTime() {
    const history = pruneHistory(getSubmissionHistory());
    if (history.length < MAX_SUBMISSIONS) return 0;

    // oldest timestamp among the recent ones
    const oldest = new Date(history[0]).getTime();
    const now = Date.now();
    const minutesPassed = (now - oldest) / 1000 / 60;
    const remaining = RATE_LIMIT_MINUTES - minutesPassed;
    return Math.ceil(remaining);
}

async function handleContactFormSubmit(e) {
    e.preventDefault();
    
    const formMessage = document.getElementById('formMessage');
    const submitBtn = e.target.querySelector('button[type="submit"]');
    
    // ✅ CHECK RATE LIMIT
    if (isRateLimited()) {
        const waitTime = getRemainingWaitTime();
        formMessage.className = 'form-message error';
        formMessage.textContent =
            `Please wait ${waitTime} minute${waitTime > 1 ? 's' : ''} before submitting another message.`;
        formMessage.style.display = 'block';
        console.log('❌ Rate limited. Wait time:', waitTime, 'minutes');
        return;
    }
    
    // Get form data
    const formData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        subject: document.getElementById('subject').value,
        message: document.getElementById('message').value,
        timestamp: new Date().toISOString()
    };
    
    console.log('📋 Form data:', formData);
    
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
    
    try {
        console.log('🔄 Attempting to save to Firebase...');
        const docRef = await db.collection('messages').add(formData);
        console.log('✅ Message saved successfully! ID:', docRef.id);

        // ✅ UPDATE RATE LIMIT HISTORY
        let history = pruneHistory(getSubmissionHistory());
        history.push(new Date().toISOString());
        saveSubmissionHistory(history);
        console.log('✅ Rate limit history updated', history);
        
        formMessage.className = 'form-message success';
        formMessage.textContent =
            'Thank you! Your message has been sent successfully. We will get back to you soon.';
        formMessage.style.display = 'block';
        
        e.target.reset();
        setTimeout(() => {
            formMessage.style.display = 'none';
        }, 5000);
        
    } catch (error) {
        console.error('❌ Error sending message:', error);
        console.error('Error code:', error.code);
        console.error('Error message:', error.message);
        
        formMessage.className = 'form-message error';
        if (error.code === 'permission-denied') {
            formMessage.textContent = 'Permission denied. Please check Firestore security rules.';
        } else if (error.code === 'unavailable') {
            formMessage.textContent = 'Firebase is unavailable. Please check your internet connection.';
        } else {
            formMessage.textContent =
                'Sorry, there was an error sending your message. Please try again or contact us directly via Instagram.';
        }
        formMessage.style.display = 'block';
    } finally {
        submitBtn.disabled = false;
        submitBtn.innerHTML = '<i class="fas fa-paper-plane"></i> Send Message';
    }
}

// ==================== FORM VALIDATION ====================
const emailInput = document.getElementById('email');
if (emailInput) {
    emailInput.addEventListener('blur', function() {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (this.value && !emailRegex.test(this.value)) {
            this.style.borderColor = 'var(--error-color)';
        } else {
            this.style.borderColor = 'var(--border-color)';
        }
    });
}

// Test Firebase connection on page load
console.log('🧪 Testing Firebase connection...');
if (typeof db !== 'undefined') {
    db.collection('messages').limit(1).get()
        .then(() => {
            console.log('✅ Firebase connection test successful!');
        })
        .catch((error) => {
            console.error('❌ Firebase connection test failed:', error);
        });
}
