document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');

    if (loginForm) {
        loginForm.addEventListener('submit', (event) => {
            event.preventDefault(); // Prevent default form submission

            const role = document.getElementById('role').value;
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;

            // In a real application, you would send these credentials to a server
            // for authentication. For this example, we'll use simple client-side redirection.

            // Basic validation (replace with actual authentication)
            if (email === '' || password === '') {
                alert('Please enter both email and password.');
                return;
            }

            switch (role) {
                case 'patient':
                    window.location.href = 'patient_dashboard.html';
                    break;
                case 'therapist':
                    window.location.href = 'therapist_portal.html';
                    break;
                case 'customer_care':
                    window.location.href = 'customer_care_dashboard.html';
                    break;
                case 'admin':
                    // For admin, we'll just show the customer care dashboard for simplicity
                    // In a real app, this would lead to a dedicated admin panel
                    alert('Admin login not fully implemented in this demo. Redirecting to Customer Care Dashboard.');
                    window.location.href = 'customer_care_dashboard.html';
                    break;
                default:
                    alert('Please select a login role.');
                    break;
            }
        });
    }
});