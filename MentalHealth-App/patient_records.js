// Initialize Lucide icons
document.addEventListener('DOMContentLoaded', function() {
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }
    
    // Check if user is logged in and is a therapist
    checkAuth();
    
    // Load user data
    loadUserData();
    
    // Initialize patient records
    initializePatientRecords();
    
    // Set up event listeners
    setupEventListeners();
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
        window.location.href = 'login.html';
    }
}

// Load user data
function loadUserData() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
    
    if (currentUser.firstName) {
        document.getElementById('userName').textContent = `Welcome, ${currentUser.firstName}`;
    }
}

// Sample patient data
const samplePatients = [
    {
        id: 1,
        firstName: 'Sarah',
        lastName: 'Johnson',
        email: 'sarah.johnson@email.com',
        phone: '+1 (555) 123-4567',
        age: 28,
        status: 'active',
        notes: 'Anxiety and stress management. Responding well to CBT techniques.',
        lastSession: '2024-01-15'
    },
    {
        id: 2,
        firstName: 'Michael',
        lastName: 'Chen',
        email: 'michael.chen@email.com',
        phone: '+1 (555) 234-5678',
        age: 35,
        status: 'active',
        notes: 'Depression treatment. Currently on medication and weekly therapy sessions.',
        lastSession: '2024-01-12'
    },
    {
        id: 3,
        firstName: 'Emily',
        lastName: 'Davis',
        email: 'emily.davis@email.com',
        phone: '+1 (555) 345-6789',
        age: 24,
        status: 'completed',
        notes: 'Successfully completed treatment for social anxiety. No longer requires regular sessions.',
        lastSession: '2023-12-20'
    },
    {
        id: 4,
        firstName: 'David',
        lastName: 'Wilson',
        email: 'david.wilson@email.com',
        phone: '+1 (555) 456-7890',
        age: 42,
        status: 'inactive',
        notes: 'PTSD treatment. Patient requested temporary break from sessions.',
        lastSession: '2023-11-30'
    }
];

// Initialize patient records
function initializePatientRecords() {
    // Load existing patients from localStorage or use sample data
    let patients = JSON.parse(localStorage.getItem('therapistPatients') || '[]');
    
    if (patients.length === 0) {
        patients = samplePatients;
        localStorage.setItem('therapistPatients', JSON.stringify(patients));
    }
    
    displayPatients(patients);
}

// Display patients
function displayPatients(patients) {
    const grid = document.getElementById('patientsGrid');
    grid.innerHTML = '';
    
    if (patients.length === 0) {
        grid.innerHTML = `
            <div class="no-patients">
                <i data-lucide="users" style="width: 48px; height: 48px; color: #9ca3af; margin-bottom: 16px;"></i>
                <h3>No patients found</h3>
                <p>Add your first patient to get started.</p>
            </div>
        `;
        if (typeof lucide !== 'undefined') {
            lucide.createIcons();
        }
        return;
    }
    
    patients.forEach(patient => {
        const card = createPatientCard(patient);
        grid.appendChild(card);
    });
}

// Create patient card
function createPatientCard(patient) {
    const card = document.createElement('div');
    card.className = 'patient-card';
    card.onclick = () => viewPatientDetails(patient);
    
    const initials = `${patient.firstName.charAt(0)}${patient.lastName.charAt(0)}`;
    
    card.innerHTML = `
        <div class="patient-header">
            <div class="patient-avatar">${initials}</div>
            <div class="patient-info">
                <h3>${patient.firstName} ${patient.lastName}</h3>
                <p>${patient.email}</p>
            </div>
        </div>
        <div class="patient-details">
            <div class="detail-row">
                <span class="detail-label">Age:</span>
                <span class="detail-value">${patient.age}</span>
            </div>
            <div class="detail-row">
                <span class="detail-label">Phone:</span>
                <span class="detail-value">${patient.phone}</span>
            </div>
            <div class="detail-row">
                <span class="detail-label">Last Session:</span>
                <span class="detail-value">${formatDate(patient.lastSession)}</span>
            </div>
        </div>
        <div class="patient-status status-${patient.status}">${patient.status}</div>
        <div class="patient-actions">
            <button class="action-btn" onclick="event.stopPropagation(); editPatient(${patient.id})">Edit</button>
            <button class="action-btn" onclick="event.stopPropagation(); scheduleSession(${patient.id})">Schedule</button>
        </div>
    `;
    
    return card;
}

// Format date
function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'short', 
        day: 'numeric' 
    });
}

// Setup event listeners
function setupEventListeners() {
    // Search functionality
    document.getElementById('searchInput').addEventListener('input', function() {
        filterPatients();
    });
    
    // Status filter
    document.getElementById('statusFilter').addEventListener('change', function() {
        filterPatients();
    });
    
    // Add patient form
    document.getElementById('addPatientForm').addEventListener('submit', function(e) {
        e.preventDefault();
        addNewPatient();
    });
}

// Filter patients
function filterPatients() {
    const searchTerm = document.getElementById('searchInput').value.toLowerCase();
    const statusFilter = document.getElementById('statusFilter').value;
    
    let patients = JSON.parse(localStorage.getItem('therapistPatients') || '[]');
    
    patients = patients.filter(patient => {
        const matchesSearch = 
            patient.firstName.toLowerCase().includes(searchTerm) ||
            patient.lastName.toLowerCase().includes(searchTerm) ||
            patient.email.toLowerCase().includes(searchTerm) ||
            patient.phone.includes(searchTerm);
        
        const matchesStatus = !statusFilter || patient.status === statusFilter;
        
        return matchesSearch && matchesStatus;
    });
    
    displayPatients(patients);
}

// Show add patient modal
function showAddPatientModal() {
    document.getElementById('addPatientModal').style.display = 'block';
}

// Close add patient modal
function closeAddPatientModal() {
    document.getElementById('addPatientModal').style.display = 'none';
    document.getElementById('addPatientForm').reset();
}

// Add new patient
function addNewPatient() {
    const formData = {
        firstName: document.getElementById('patientFirstName').value.trim(),
        lastName: document.getElementById('patientLastName').value.trim(),
        email: document.getElementById('patientEmail').value.trim(),
        phone: document.getElementById('patientPhone').value.trim(),
        age: parseInt(document.getElementById('patientAge').value),
        status: document.getElementById('patientStatus').value,
        notes: document.getElementById('patientNotes').value.trim(),
        lastSession: new Date().toISOString().split('T')[0]
    };
    
    // Validate required fields
    if (!formData.firstName || !formData.lastName || !formData.email || !formData.phone || !formData.age) {
        showMessage('Please fill in all required fields', 'error');
        return;
    }
    
    // Get existing patients
    let patients = JSON.parse(localStorage.getItem('therapistPatients') || '[]');
    
    // Create new patient
    const newPatient = {
        id: Date.now(), // Simple ID generation
        ...formData
    };
    
    // Add to patients array
    patients.push(newPatient);
    
    // Save to localStorage
    localStorage.setItem('therapistPatients', JSON.stringify(patients));
    
    // Close modal and refresh display
    closeAddPatientModal();
    displayPatients(patients);
    showMessage('Patient added successfully', 'success');
}

// View patient details
function viewPatientDetails(patient) {
    alert(`Patient Details:\n\nName: ${patient.firstName} ${patient.lastName}\nEmail: ${patient.email}\nPhone: ${patient.phone}\nAge: ${patient.age}\nStatus: ${patient.status}\nNotes: ${patient.notes}\nLast Session: ${formatDate(patient.lastSession)}`);
}

// Edit patient
function editPatient(patientId) {
    // For now, just show an alert. In a real app, this would open an edit modal
    showMessage('Edit functionality coming soon!', 'info');
}

// Schedule session
function scheduleSession(patientId) {
    // For now, just show an alert. In a real app, this would open a scheduling modal
    showMessage('Session scheduling coming soon!', 'info');
}

// Logout function
function logout() {
    if (confirm('Are you sure you want to logout?')) {
        localStorage.removeItem('currentUser');
        localStorage.removeItem('rememberedUser');
        showMessage('Logged out successfully', 'success');
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
    const bgColor = type === 'error' ? '#ef4444' : 
                   type === 'success' ? '#10b981' : 
                   type === 'info' ? '#3b82f6' : '#10b981';
    
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
        background: ${bgColor};
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
    
    .no-patients {
        grid-column: 1 / -1;
        text-align: center;
        padding: 60px 20px;
        color: #6b7280;
    }
    
    .no-patients h3 {
        margin-bottom: 8px;
        color: #374151;
    }
`;
document.head.appendChild(style); 