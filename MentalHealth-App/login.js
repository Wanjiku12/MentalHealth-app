// Function to toggle password visibility
function togglePassword() {
    const passwordInput = document.getElementById('password');
    const eyeIcon = document.getElementById('eyeIcon');

    if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
        eyeIcon.setAttribute('data-lucide', 'eye-off'); // Change icon to eye-off
    } else {
        passwordInput.type = 'password';
        eyeIcon.setAttribute('data-lucide', 'eye'); // Change icon back to eye
    }
    // Re-render lucide icons after changing data-lucide attribute
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

// Show message function (retained for UI feedback)
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

// Add CSS animations for messages (retained)
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


document.addEventListener('DOMContentLoaded', function() {
    // Initialize Lucide icons on page load
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }

    // Load saved language preference
    loadLanguagePreference();

    // Initialize language system (assuming LanguageManager is defined in translations.js)
    if (typeof LanguageManager !== 'undefined') {
        LanguageManager.init();
    }

    // Check for remembered user
    const rememberedUser = localStorage.getItem('rememberedUser');
    if (rememberedUser) {
        document.getElementById('username').value = rememberedUser;
        document.getElementById('remember').checked = true;
    }

    // Get the login form element
    const loginForm = document.getElementById('loginForm');

    // Add an event listener for the form submission
    loginForm.addEventListener('submit', async function(event) {
        // Prevent the default form submission behavior (which would reload the page)
        event.preventDefault();

        // Get the values from the username and password input fields
        const usernameInput = document.getElementById('username');
        const passwordInput = document.getElementById('password');
        const languageSelect = document.getElementById('language');
        const rememberCheckbox = document.getElementById('remember');

        const username = usernameInput.value;
        const password = passwordInput.value;
        const language = languageSelect.value;
        const remember = rememberCheckbox.checked;

        // Validate inputs
        if (!username || !password) {
            showMessage(LanguageManager.get('pleaseFillAllFields'), 'error');
            return;
        }

        // Create an object with the data to send
        const loginData = {
            username: username,
            password: password,
            language: language // Include language in the data
        };

        console.log('Attempting login with:', loginData);

        try {
            // Make the POST request to your backend server
            const response = await fetch('http://localhost:4000/login', {
                method: 'POST', // Specify the HTTP method as POST
                headers: {
                    'Content-Type': 'application/json' // Tell the server we're sending JSON
                },
                body: JSON.stringify(loginData) // Convert the JavaScript object to a JSON string
            });

            // Check if the response was successful (status code 2xx)
            if (response.ok) {
                const result = await response.json(); // Parse the JSON response from the server
                console.log('Login successful:', result);

                // Store user info in localStorage (from server response)
                if (result.user) {
                    localStorage.setItem('currentUsername', result.user.username);
                    localStorage.setItem('userLanguage', language);
                    if (result.token) {
                        localStorage.setItem('userToken', result.token);
                    }
                }

                if (remember) {
                    localStorage.setItem('rememberedUser', username);
                } else {
                    localStorage.removeItem('rememberedUser'); // Clear if remember me is unchecked
                }

                showMessage(LanguageManager.get('loginSuccess'), 'success');

                // Redirect to appropriate dashboard based on role from server
                setTimeout(() => {
                    const userRole = result.user ? result.user.role : null; // Get role from server response
                    if (userRole === 'patient') {
                        window.location.href = 'patient_dashboard.html';
                    } else if (userRole === 'therapist') {
                        window.location.href = 'therapist_dashboard.html';
                    } else {
                        // Fallback or handle unknown roles
                        window.location.href = 'index.html';
                    }
                }, 1500);

            } else {
                // If the response was not OK, handle the error
                const errorData = await response.json(); // Assuming server sends error details as JSON
                console.error('Login failed:', response.status, errorData);
                showMessage(LanguageManager.get('invalidCredentials'), 'error'); // Use translated message
            }
        } catch (error) {
            // Handle network errors or issues with the fetch request itself
            console.error('Network error or unexpected issue during login:', error);
            showMessage(LanguageManager.get('networkError') || 'An error occurred during login. Please try again.', 'error');
        }
    });
});

// Add logout function to clear user state
function logout() {
    localStorage.removeItem('currentUsername');
    localStorage.removeItem('userLanguage');
    localStorage.removeItem('userToken');
    window.location.href = 'login.html';
}
