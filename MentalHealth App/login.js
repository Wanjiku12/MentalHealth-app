// Initialize Lucide icons
document.addEventListener('DOMContentLoaded', function() {
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }
    
    // Load saved language preference
    loadLanguagePreference();
    
    // Initialize language system
    if (typeof LanguageManager !== 'undefined') {
        LanguageManager.init();
    }
});

// Toggle password visibility
function togglePassword() {
    const passwordInput = document.getElementById('password');
    const eyeIcon = document.getElementById('eyeIcon');
    
    if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
        eyeIcon.setAttribute('data-lucide', 'eye-off');
    } else {
        passwordInput.type = 'password';
        eyeIcon.setAttribute('data-lucide', 'eye');
    }
    
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }
}

// Load saved language preference
function loadLanguagePreference() {
    const savedLanguage = localStorage.getItem('userLanguage');
    if (savedLanguage) {
        document.getElementById('language').value = savedLanguage;
    }
}

// Sample user data (in a real app, this would come from a database)
const users = [
    {
        username: 'patient1',
        password: 'Patient123!',
        role: 'patient',
        firstName: 'John',
        lastName: 'Doe',
        language: 'en'
    },
    {
        username: 'therapist1',
        password: 'Therapist123!',
        role: 'therapist',
        firstName: 'Dr. Sarah',
        lastName: 'Smith',
        language: 'en'
    }
];

// Handle login form submission
document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const language = document.getElementById('language').value;
    const remember = document.getElementById('remember').checked;
    
    // Validate inputs
    if (!username || !password) {
        showMessage(LanguageManager.get('pleaseFillAllFields'), 'error');
        return;
    }
    
    // Check credentials
    const user = users.find(u => u.username === username && u.password === password);
    
    if (user) {
        // Store user info in localStorage
        localStorage.setItem('currentUser', JSON.stringify({
            username: user.username,
            role: user.role,
            firstName: user.firstName,
            lastName: user.lastName,
            language: language
        }));
        
        // Store language preference
        localStorage.setItem('userLanguage', language);
        
        if (remember) {
            localStorage.setItem('rememberedUser', username);
        }
        
        showMessage(LanguageManager.get('loginSuccess'), 'success');
        
        // Redirect to appropriate dashboard
        setTimeout(() => {
            if (user.role === 'patient') {
                window.location.href = 'patient_dashboard.html';
            } else if (user.role === 'therapist') {
                window.location.href = 'therapist_dashboard.html';
            }
        }, 1500);
        
    } else {
        showMessage(LanguageManager.get('invalidCredentials'), 'error');
    }
});

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
`;
document.head.appendChild(style);

// Check for remembered user
document.addEventListener('DOMContentLoaded', function() {
    const rememberedUser = localStorage.getItem('rememberedUser');
    if (rememberedUser) {
        document.getElementById('username').value = rememberedUser;
        document.getElementById('remember').checked = true;
    }
}); 