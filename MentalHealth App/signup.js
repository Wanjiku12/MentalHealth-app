// Initialize Lucide icons
document.addEventListener('DOMContentLoaded', function() {
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
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

// Show password requirements dropdown
function showPasswordRequirements() {
    const requirements = document.getElementById('passwordRequirements');
    requirements.style.display = 'block';
}

// Hide password requirements dropdown
function hidePasswordRequirements() {
    const requirements = document.getElementById('passwordRequirements');
    requirements.style.display = 'none';
}

// Password validation
function validatePassword(password) {
    const requirements = {
        length: password.length >= 8,
        uppercase: /[A-Z]/.test(password),
        lowercase: /[a-z]/.test(password),
        number: /\d/.test(password)
    };
    
    // Update requirement indicators
    document.getElementById('length').textContent = requirements.length ? '✅ At least 8 characters long' : '❌ At least 8 characters long';
    document.getElementById('length').className = requirements.length ? 'valid' : '';
    
    document.getElementById('uppercase').textContent = requirements.uppercase ? '✅ At least one capital letter' : '❌ At least one capital letter';
    document.getElementById('uppercase').className = requirements.uppercase ? 'valid' : '';
    
    document.getElementById('lowercase').textContent = requirements.lowercase ? '✅ At least one lowercase letter' : '❌ At least one lowercase letter';
    document.getElementById('lowercase').className = requirements.lowercase ? 'valid' : '';
    
    document.getElementById('number').textContent = requirements.number ? '✅ At least one digit' : '❌ At least one digit';
    document.getElementById('number').className = requirements.number ? 'valid' : '';
    
    // Calculate strength
    const validCount = Object.values(requirements).filter(Boolean).length;
    const strengthFill = document.getElementById('strengthFill');
    const strengthText = document.getElementById('strengthText');
    
    strengthFill.className = 'strength-fill';
    
    if (validCount === 0) {
        strengthFill.className = 'strength-fill';
        strengthText.textContent = 'Password strength';
    } else if (validCount === 1) {
        strengthFill.className = 'strength-fill weak';
        strengthText.textContent = 'Weak';
    } else if (validCount === 2) {
        strengthFill.className = 'strength-fill fair';
        strengthText.textContent = 'Fair';
    } else if (validCount === 3) {
        strengthFill.className = 'strength-fill good';
        strengthText.textContent = 'Good';
    } else if (validCount === 4) {
        strengthFill.className = 'strength-fill strong';
        strengthText.textContent = 'Strong';
    }
    
    return validCount === 4;
}

// Real-time password validation
document.getElementById('password').addEventListener('input', function() {
    const password = this.value;
    validatePassword(password);
});

// Handle signup form submission
document.getElementById('signupForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form data
    const formData = {
        firstName: document.getElementById('firstName').value.trim(),
        lastName: document.getElementById('lastName').value.trim(),
        username: document.getElementById('username').value.trim(),
        email: document.getElementById('email').value.trim(),
        phone: document.getElementById('phone').value.trim(),
        password: document.getElementById('password').value,
        confirmPassword: document.getElementById('confirmPassword').value,
        terms: document.getElementById('terms').checked
    };
    
    // Validate all fields
    if (!formData.firstName || !formData.lastName || !formData.username || 
        !formData.email || !formData.phone || !formData.password || 
        !formData.confirmPassword) {
        showMessage('Please fill in all fields', 'error');
        return;
    }
    
    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
        showMessage('Please enter a valid email address', 'error');
        return;
    }
    
    // Validate phone format
    const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
    if (!phoneRegex.test(formData.phone.replace(/\s/g, ''))) {
        showMessage('Please enter a valid phone number', 'error');
        return;
    }
    
    // Validate password strength
    if (!validatePassword(formData.password)) {
        showMessage('Please ensure your password meets all requirements', 'error');
        return;
    }
    
    // Check password confirmation
    if (formData.password !== formData.confirmPassword) {
        showMessage('Passwords do not match', 'error');
        return;
    }
    
    // Check terms agreement
    if (!formData.terms) {
        showMessage('Please agree to the Terms of Service and Privacy Policy', 'error');
        return;
    }
    
    // Store user data (in a real app, this would be sent to a server)
    const userData = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        username: formData.username,
        email: formData.email,
        phone: formData.phone,
        password: formData.password,
        createdAt: new Date().toISOString()
    };
    
    // Store in localStorage for demo purposes
    const existingUsers = JSON.parse(localStorage.getItem('users') || '[]');
    existingUsers.push(userData);
    localStorage.setItem('users', JSON.stringify(existingUsers));
    
    showMessage('Account created successfully! Redirecting...', 'success');
    
    // Redirect to role selection page
    setTimeout(() => {
        window.location.href = 'role_selection.html';
    }, 1500);
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