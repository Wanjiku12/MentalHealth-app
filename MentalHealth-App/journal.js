class JournalApp {
    constructor() {
        this.entries = []; // Initialize as empty, will load from server
        this.isExpanded = false;
        this.initializeElements();
        this.bindEvents();
        this.loadEntries(); // Load entries from the server on startup

        // Initialize Lucide icons
        if (typeof lucide !== 'undefined') {
            lucide.createIcons();
        }
    }

    initializeElements() {
        this.titleInput = document.getElementById('entryTitle');
        this.contentTextarea = document.getElementById('entryContent');
        this.textareaGroup = document.getElementById('textareaGroup');
        this.saveButton = document.getElementById('saveButton');
        this.cancelButton = document.getElementById('cancelButton');
        this.form = document.getElementById('journalForm');
        this.emptyState = document.getElementById('emptyState');
        this.entriesList = document.getElementById('entriesList');
        this.entriesContainer = document.getElementById('entriesContainer');
        this.entriesCount = document.getElementById('entriesCount');
    }

    bindEvents() {
        this.titleInput.addEventListener('focus', () => this.expandForm());
        this.titleInput.addEventListener('input', () => this.validateForm());
        this.contentTextarea.addEventListener('input', () => this.validateForm());
        this.cancelButton.addEventListener('click', () => this.collapseForm());
        this.form.addEventListener('submit', (e) => this.handleSubmit(e));
        // Add event delegation for delete buttons
        this.entriesContainer.addEventListener('click', (e) => {
            if (e.target.closest('.delete-button')) {
                const entryId = e.target.closest('.delete-button').dataset.entryId;
                this.showConfirmDialog('Are you sure you want to delete this entry?', () => this.deleteEntry(entryId));
            }
        });
    }

    expandForm() {
        if (!this.isExpanded) {
            this.isExpanded = true;
            this.textareaGroup.style.display = 'flex';
            this.contentTextarea.focus();
        }
    }

    collapseForm() {
        this.isExpanded = false;
        this.textareaGroup.style.display = 'none';
        this.titleInput.value = '';
        this.contentTextarea.value = '';
        this.validateForm();
    }

    validateForm() {
        const hasTitle = this.titleInput.value.trim().length > 0;
        const hasContent = this.contentTextarea.value.trim().length > 0;
        this.saveButton.disabled = !(hasTitle && hasContent);
    }

    // --- New: Show custom confirmation dialog ---
    showConfirmDialog(message, onConfirm) {
        // Remove any existing dialogs
        const existingDialog = document.querySelector('.custom-dialog-overlay');
        if (existingDialog) {
            existingDialog.remove();
        }

        const overlay = document.createElement('div');
        overlay.className = 'custom-dialog-overlay';
        overlay.innerHTML = `
            <div class="custom-dialog-box">
                <p>${message}</p>
                <div class="dialog-buttons">
                    <button id="confirmYes" class="dialog-button confirm-yes">Yes</button>
                    <button id="confirmNo" class="dialog-button confirm-no">No</button>
                </div>
            </div>
        `;
        document.body.appendChild(overlay);

        document.getElementById('confirmYes').onclick = () => {
            onConfirm();
            overlay.remove();
        };
        document.getElementById('confirmNo').onclick = () => {
            overlay.remove();
        };

        // Basic styling for the dialog (add to your journal.css or dynamically as below)
        const dialogStyle = document.createElement('style');
        dialogStyle.textContent = `
            .custom-dialog-overlay {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0, 0, 0, 0.6);
                display: flex;
                justify-content: center;
                align-items: center;
                z-index: 1000;
            }
            .custom-dialog-box {
                background: #fff;
                padding: 25px 30px;
                border-radius: 10px;
                box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
                text-align: center;
                max-width: 400px;
                width: 90%;
            }
            .custom-dialog-box p {
                margin-bottom: 25px;
                font-size: 1.1em;
                color: #333;
            }
            .dialog-buttons {
                display: flex;
                justify-content: center;
                gap: 15px;
            }
            .dialog-button {
                padding: 10px 20px;
                border: none;
                border-radius: 5px;
                cursor: pointer;
                font-size: 1em;
                font-weight: bold;
                transition: background-color 0.2s ease;
            }
            .confirm-yes {
                background-color: #ef4444; /* Red for delete */
                color: white;
            }
            .confirm-yes:hover {
                background-color: #dc2626;
            }
            .confirm-no {
                background-color: #ccc;
                color: #333;
            }
            .confirm-no:hover {
                background-color: #bbb;
            }
        `;
        document.head.appendChild(dialogStyle);
    }

    // --- New: showMessage function for UI feedback ---
    showMessage(message, type) {
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

    // --- Updated: handleSubmit to send data to server ---
    async handleSubmit(e) {
        e.preventDefault();

        const title = this.titleInput.value.trim();
        const content = this.contentTextarea.value.trim();
        const username = localStorage.getItem('currentUsername');
        const language = localStorage.getItem('userLanguage');
        const token = localStorage.getItem('userToken');

        if (!title || !content) {
            this.showMessage('Please fill in both title and content.', 'error');
            return;
        }
        if (!username || !token) {
            this.showMessage('You must be logged in to post a journal entry.', 'error');
            return;
        }

        // Prepare data for the POST request
        const newEntryData = {
            journal_title: title,
            journal_entry: content,
            mood_rating: null // You can add mood rating if you have it in the UI
        };

        try {
            const response = await fetch('http://localhost:4000/postJournal', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(newEntryData)
            });

            if (response.ok) {
                const result = await response.json();
                this.showMessage('Journal entry saved successfully!', 'success');
                this.collapseForm();
                this.loadEntries(); // Reload entries from server
            } else {
                const errorData = await response.json();
                this.showMessage(`Failed to save entry: ${errorData.message || 'Server error'}`, 'error');
            }
        } catch (error) {
            this.showMessage('Network error. Could not save entry.', 'error');
        }
    }

    // --- Updated: deleteEntry to send DELETE request to server ---
    async deleteEntry(id) {
        try {
            const response = await fetch(`http://localhost:4000/journal/${id}`, {
                method: 'DELETE',
                headers: {
                    // Add authorization header if your backend requires it
                    // 'Authorization': `Bearer ${localStorage.getItem('userToken')}`
                }
            });

            if (response.ok) {
                console.log(`Journal entry ${id} deleted successfully.`);
                this.showMessage('Journal entry deleted successfully!', 'success');
                this.entries = this.entries.filter(entry => entry.id !== id);
                this.updateUI();
            } else {
                const errorData = await response.json();
                console.error(`Failed to delete journal entry ${id}:`, errorData);
                this.showMessage(`Failed to delete entry: ${errorData.message || 'Server error'}`, 'error');
            }
        } catch (error) {
            console.error('Network error while deleting journal entry:', error);
            this.showMessage('Network error. Could not delete entry.', 'error');
        }
    }

    formatDate(dateString) {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    }

    createEntryHTML(entry) {
        // Ensure entry.id is passed to the delete button's data-entry-id attribute
        return `
            <div class="journal-entry">
                <div class="entry-header">
                    <h3 class="entry-title">${this.escapeHtml(entry.journal_title)}</h3>
                    <button class="delete-button" data-entry-id="${entry.entry_id}" title="Delete entry">
                        <i data-lucide="trash-2"></i>
                    </button>
                </div>
                <div class="entry-date">
                    <i data-lucide="calendar"></i>
                    ${this.formatDate(entry.entry_date)}
                </div>
                <p class="entry-content">${this.escapeHtml(entry.journal_entry)}</p>
            </div>
        `;
    }

    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    updateUI() {
        if (this.entries.length === 0) {
            this.emptyState.style.display = 'block';
            this.entriesList.style.display = 'none';
        } else {
            this.emptyState.style.display = 'none';
            this.entriesList.style.display = 'block';

            // Update entries count
            const count = this.entries.length;
            this.entriesCount.textContent = `${count} ${count === 1 ? 'entry' : 'entries'}`;

            // Render entries
            this.entriesContainer.innerHTML = this.entries
                .map(entry => this.createEntryHTML(entry))
                .join('');

            // Re-initialize Lucide icons for new content
            if (typeof lucide !== 'undefined') {
                lucide.createIcons();
            }
        }
    }

    // --- Updated: loadEntries to fetch from server ---
    async loadEntries() {
        const username = localStorage.getItem('currentUsername');
        const token = localStorage.getItem('userToken');
        if (!username || !token) {
            this.entries = [];
            this.updateUI();
            this.showMessage('You must be logged in to view your journal entries.', 'error');
            return;
        }
        try {
            const response = await fetch(`http://localhost:4000/journals/${username}`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (response.ok) {
                const result = await response.json();
                // Only show entries WITHOUT a mood_rating
                this.entries = (result.entries || []).filter(entry => !entry.mood_rating && entry.mood_rating !== 0);
                this.entries.sort((a, b) => new Date(b.entry_date) - new Date(a.entry_date));
                this.updateUI();
            } else {
                const errorData = await response.json();
                this.showMessage(`Failed to load entries: ${errorData.message || 'Server error'}`, 'error');
            }
        } catch (error) {
            this.entries = [];
            this.updateUI();
            this.showMessage(error, 'error');
        }
    }

    // --- Removed saveEntries as data is now persisted on server ---
    // saveEntries() {
    //     try {
    //         localStorage.setItem('journalEntries', JSON.stringify(this.entries));
    //     } catch (error) {
    //         console.error('Error saving entries:', error);
    //     }
    // }
}

// Initialize the app when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.app = new JournalApp();
});

// Add logout function to clear user state
function logout() {
    localStorage.removeItem('currentUsername');
    localStorage.removeItem('userLanguage');
    localStorage.removeItem('userToken');
    window.location.href = 'login.html';
}
