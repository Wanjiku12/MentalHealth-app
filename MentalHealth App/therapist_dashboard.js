// Initialize Lucide icons
document.addEventListener('DOMContentLoaded', function() {
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }
    
    // Check if user is logged in
    checkAuth();
    
    // Load user data
    loadUserData();
});

// Check authentication
function checkAuth() {
    const currentUser = localStorage.getItem('currentUser');
    if (!currentUser) {
        window.location.href = 'login.html';
        return;
    }
    
    const user = JSON.parse(currentUser);
    if (user.role !== 'therapist') {
        // Redirect to appropriate dashboard based on role
        if (user.role === 'patient') {
            window.location.href = 'patient_dashboard.html';
        } else {
            window.location.href = 'login.html';
        }
    }
}

// Load user data
function loadUserData() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
    
    if (currentUser.firstName) {
        document.getElementById('userFirstName').textContent = currentUser.firstName;
        document.getElementById('userName').textContent = `Welcome, ${currentUser.firstName}`;
    } else {
        // If no user data, try to get from signup data
        const users = JSON.parse(localStorage.getItem('users') || '[]');
        const lastUser = users[users.length - 1];
        if (lastUser) {
            document.getElementById('userFirstName').textContent = lastUser.firstName;
            document.getElementById('userName').textContent = `Welcome, ${lastUser.firstName}`;
        }
    }
}

// Navigation function
function navigateTo(url) {
    // Add loading state
    const button = event.currentTarget;
    const originalContent = button.innerHTML;
    
    // Show loading animation
    button.innerHTML = '<i data-lucide="loader-2" class="animate-spin"></i> Loading...';
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }
    
    // Navigate after short delay
    setTimeout(() => {
        window.location.href = url;
    }, 500);
}

// Logout function
function logout() {
    // Show confirmation
    if (confirm('Are you sure you want to logout?')) {
        // Clear user data
        localStorage.removeItem('currentUser');
        localStorage.removeItem('rememberedUser');
        
        // Show logout message
        showMessage('Logged out successfully', 'success');
        
        // Redirect to login page
        setTimeout(() => {
            window.location.href = 'login.html';
        }, 1000);
    }
}

// Show message function
function showMessage(message, type) {
    // Remove existing message
    const existingMessage = document.querySelector('.message');
    if (existingMessage) {
        existingMessage.remove();
    }
    
    // Create message element
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${type}`;
    messageDiv.textContent = message;
    
    // Style the message
    messageDiv.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 12px 20px;
        border-radius: 8px;
        color: white;
        font-weight: 500;
        z-index: 1000;
        animation: slideIn 0.3s ease;
        ${type === 'error' ? 'background: #ef4444;' : 'background: #10b981;'}
    `;
    
    document.body.appendChild(messageDiv);
    
    // Remove message after 3 seconds
    setTimeout(() => {
        messageDiv.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => {
            if (messageDiv.parentNode) {
                messageDiv.remove();
            }
        }, 300);
    }, 3000);
}

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
    
    .animate-spin {
        animation: spin 1s linear infinite;
    }
    
    @keyframes spin {
        from {
            transform: rotate(0deg);
        }
        to {
            transform: rotate(360deg);
        }
    }
`;
document.head.appendChild(style); 