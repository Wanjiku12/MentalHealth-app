// Initialize Lucide icons
document.addEventListener('DOMContentLoaded', function() {
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }

    // Initialize language system (assuming LanguageManager is defined in translations.js)
    if (typeof LanguageManager !== 'undefined') {
        LanguageManager.init();
    }

    // Get the signup form element
    const signupForm = document.getElementById('signupForm');

    // Add an event listener for the form submission
    signupForm.addEventListener('submit', async function(event) {
        // Prevent the default form submission behavior (which would reload the page)
        event.preventDefault();

        // Collect all form data
        const firstName = document.getElementById('firstName').value.trim();
        const lastName = document.getElementById('lastName').value.trim();
        const email = document.getElementById('email').value.trim();
        const username = document.getElementById('username').value.trim();
        const password = document.getElementById('password').value; // Keep raw for sending
        const confirmPassword = document.getElementById('confirmPassword').value;
        const user_type = document.getElementById('user_type').value;
        const preferred_language = document.getElementById('preferred_language').value;
        const specialization = document.getElementById('specialization') ? document.getElementById('specialization').value : undefined;
        const admin_role = document.getElementById('admin_role') ? document.getElementById('admin_role').value : undefined;
        const license_expdate = document.getElementById('license_expdate') ? document.getElementById('license_expdate').value : undefined;
        const termsAgreed = document.getElementById('terms').checked;

        // Basic client-side validation
        if (!firstName || !lastName || !email || !username || !password || !confirmPassword) {
            showMessage(LanguageManager.get('pleaseFillAllFields'), 'error');
            return;
        }

        if (password !== confirmPassword) {
            showMessage(LanguageManager.get('passwordsMismatch'), 'error');
            return;
        }

        if (!validatePassword(password).isValid) { // Use your existing password validation
            showMessage(LanguageManager.get('passwordRequirementsNotMet'), 'error');
            return;
        }

        if (!termsAgreed) {
            showMessage(LanguageManager.get('mustAgreeTerms'), 'error');
            return;
        }

        // Prepare data for the POST request
        const registrationData = {
            username: username,
            email: email,
            password: password, // Send raw password to backend for hashing
            user_type: user_type,
            preferred_language: preferred_language,
            specialization: user_type === 'therapist' ? specialization : undefined,
            admin_role: user_type === 'system_admin' ? admin_role : undefined,
            license_expdate: user_type === 'therapist' ? license_expdate : undefined
        };

        console.log('Attempting registration with:', registrationData);

        try {
            // Make the POST request to your backend server
            const response = await fetch('http://localhost:4000/register', {
                method: 'POST', // Specify the HTTP method as POST
                headers: {
                    'Content-Type': 'application/json' // Tell the server we're sending JSON
                },
                body: JSON.stringify(registrationData) // Convert the JavaScript object to a JSON string
            });

            // Check if the response was successful (status code 2xx)
            if (response.ok) {
                const result = await response.json(); // Parse the JSON response from the server
                console.log('Registration successful:', result);
                showMessage(LanguageManager.get('registrationSuccess'), 'success');

                // Optionally, redirect to login page after successful registration
                setTimeout(() => {
                    window.location.href = 'login.html';
                }, 2000); // Redirect after 2 seconds
            } else {
                // If the response was not OK, handle the error
                const errorData = await response.json(); // Assuming server sends error details as JSON
                console.error('Registration failed:', response.status, errorData);
                showMessage(errorData.message || LanguageManager.get('registrationFailed'), 'error');
            }
        } catch (error) {
            // Handle network errors or issues with the fetch request itself
            console.error('Network error or unexpected issue during registration:', error);
            showMessage(LanguageManager.get('networkError') || 'An error occurred during registration. Please try again.', 'error');
        }
    });
});

// Toggle password visibility (existing function)
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

// Show password requirements dropdown (existing function)
function showPasswordRequirements() {
    const requirements = document.getElementById('passwordRequirements');
    requirements.style.display = 'block';
}

// Hide password requirements dropdown (existing function)
function hidePasswordRequirements() {
    const requirements = document.getElementById('passwordRequirements');
    requirements.style.display = 'none';
}

// Password validation (existing function)
function validatePassword(password) {
    const requirements = {
        length: password.length >= 8,
        uppercase: /[A-Z]/.test(password),
        lowercase: /[a-z]/.test(password),
        number: /\d/.test(password),
        specialChar: /[!@#$%^&*(),.?":{}|<>_\-+=~`\[\]\\/|;:'<>]/.test(password) // Improved special char check
    };

    // Update requirement indicators (ensure these elements exist in your HTML)
    const lengthEl = document.getElementById('length');
    const uppercaseEl = document.getElementById('uppercase');
    const lowercaseEl = document.getElementById('lowercase');
    const numberEl = document.getElementById('number');
    let specialCharEl = document.getElementById('specialChar');
    if (!specialCharEl) {
        // If not present, create and insert it
        specialCharEl = document.createElement('li');
        specialCharEl.id = 'specialChar';
        specialCharEl.textContent = '❌ At least one special character (e.g !, _)';
        const ul = document.querySelector('#passwordRequirements ul');
        ul.appendChild(specialCharEl);
    }

    // Helper to update text and class
    const updateRequirement = (el, isValid, textKey, fallbackText) => {
        if (el) {
            el.textContent = isValid ? '✅ ' + (LanguageManager.get ? LanguageManager.get(textKey) : fallbackText) : '❌ ' + (LanguageManager.get ? LanguageManager.get(textKey) : fallbackText);
            el.className = isValid ? 'valid' : '';
        }
    };

    updateRequirement(lengthEl, requirements.length, 'atLeast8Chars', 'At least 8 characters long');
    updateRequirement(uppercaseEl, requirements.uppercase, 'oneCapital', 'At least one capital letter');
    updateRequirement(lowercaseEl, requirements.lowercase, 'oneLowercase', 'At least one lowercase letter');
    updateRequirement(numberEl, requirements.number, 'oneNumber', 'At least one digit');
    updateRequirement(specialCharEl, requirements.specialChar, 'oneSpecialChar', 'At least one special character (e.g !, _)');

    // Password strength bar logic
    const strengthFill = document.getElementById('strengthFill');
    const strengthText = document.getElementById('strengthText');
    let passed = 0;
    for (const key in requirements) {
        if (requirements[key]) passed++;
    }
    let strength = 0;
    let color = '#ef4444';
    let text = 'Weak';
    if (passed >= 5) {
        strength = 100;
        color = '#10b981';
        text = 'Strong';
    } else if (passed >= 3) {
        strength = 60;
        color = '#f59e42';
        text = 'Medium';
    } else if (passed >= 1) {
        strength = 30;
        color = '#ef4444';
        text = 'Weak';
    }
    if (strengthFill) {
        strengthFill.style.width = strength + '%';
        strengthFill.style.background = color;
    }
    if (strengthText) {
        strengthText.textContent = 'Password strength: ' + text;
        strengthText.style.color = color;
    }

    const isValid = requirements.length && requirements.uppercase && requirements.lowercase && requirements.number && requirements.specialChar;

    // Enable/disable signup button based on password validity and terms agreement
    const signupButton = document.querySelector('.signup-btn');
    const termsAgreed = document.getElementById('terms').checked;
    if (signupButton) {
        signupButton.disabled = !(isValid && termsAgreed);
    }

    return { isValid, requirements }; // Return isValid and individual requirements
}

// Event listeners for password input to show/hide requirements and validate
document.addEventListener('DOMContentLoaded', function() {
    const passwordInput = document.getElementById('password');
    const confirmPasswordInput = document.getElementById('confirmPassword');
    const termsCheckbox = document.getElementById('terms');
    const signupButton = document.querySelector('.signup-btn');

    if (passwordInput) {
        passwordInput.addEventListener('focus', showPasswordRequirements);
        passwordInput.addEventListener('input', () => {
            validatePassword(passwordInput.value);
            // Also re-validate confirm password to catch mismatches immediately
            if (confirmPasswordInput.value) {
                if (passwordInput.value !== confirmPasswordInput.value) {
                    showMessage(LanguageManager.get('passwordsMismatch'), 'error');
                } else {
                    // Clear message if they now match
                    const existingMessage = document.querySelector('.message');
                    if (existingMessage && existingMessage.textContent === LanguageManager.get('passwordsMismatch')) {
                        existingMessage.remove();
                    }
                }
            }
        });
        passwordInput.addEventListener('blur', hidePasswordRequirements);
    }

    if (confirmPasswordInput) {
        confirmPasswordInput.addEventListener('input', () => {
            if (passwordInput.value !== confirmPasswordInput.value) {
                showMessage(LanguageManager.get('passwordsMismatch'), 'error');
            } else {
                const existingMessage = document.querySelector('.message');
                if (existingMessage && existingMessage.textContent === LanguageManager.get('passwordsMismatch')) {
                    existingMessage.remove();
                }
            }
        });
    }

    if (termsCheckbox && signupButton) {
        termsCheckbox.addEventListener('change', () => {
            const passwordValid = validatePassword(passwordInput.value).isValid;
            signupButton.disabled = !(passwordValid && termsCheckbox.checked);
        });
    }
});


// Show message function (copied from login.js for consistency)
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

// Add CSS animations (copied from login.js for consistency)
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

// Add the global function for form submission
function submitSignup(event) {
    console.log('submitSignup function called');
    
    event.preventDefault();
    // Collect all form data
    const firstName = document.getElementById('firstName').value.trim();
    const lastName = document.getElementById('lastName').value.trim();
    const email = document.getElementById('email').value.trim();
    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    const user_type = document.getElementById('user_type').value;
    const preferred_language = document.getElementById('preferred_language').value;
    const specialization = document.getElementById('specialization') ? document.getElementById('specialization').value : undefined;
    const admin_role = document.getElementById('admin_role') ? document.getElementById('admin_role').value : undefined;
    const license_expdate = document.getElementById('license_expdate') ? document.getElementById('license_expdate').value : undefined;
    const termsAgreed = document.getElementById('terms').checked;

    // Basic client-side validation
    if (!firstName || !lastName || !email || !username || !password || !confirmPassword) {
        showMessage(LanguageManager.get('pleaseFillAllFields'), 'error');
        return false;
    }
    if (password !== confirmPassword) {
        showMessage(LanguageManager.get('passwordsMismatch'), 'error');
        return false;
    }
    if (!validatePassword(password).isValid) {
        showMessage(LanguageManager.get('passwordRequirementsNotMet'), 'error');
        return false;
    }
    if (!termsAgreed) {
        showMessage(LanguageManager.get('mustAgreeTerms'), 'error');
        return false;
    }
    // Prepare data for the POST request
    const registrationData = {
        username: username,
        email: email,
        password: password,
        user_type: user_type,
        preferred_language: preferred_language,
        specialization: user_type === 'therapist' ? specialization : undefined,
        admin_role: user_type === 'system_admin' ? admin_role : undefined,
        license_expdate: user_type === 'therapist' ? license_expdate : undefined
    };
    console.log('Attempting registration with:', registrationData);
    fetch('http://localhost:4000/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(registrationData)
    })
    .then(async response => {
        if (response.ok) {
            const result = await response.json();
            console.log('Registration successful:', result);
            showMessage(LanguageManager.get('registrationSuccess'), 'success');
            setTimeout(() => {
                window.location.href = 'login.html';
            }, 2000);
        } else {
            const errorData = await response.json();
            console.error('Registration failed:', response.status, errorData);
            showMessage(errorData.message || LanguageManager.get('registrationFailed'), 'error');
        }
    })
    .catch(error => {
        console.error('Network error or unexpected issue during registration:', error);
        showMessage(LanguageManager.get('networkError') || 'An error occurred during registration. Please try again.', 'error');
    });
    return false;
}
