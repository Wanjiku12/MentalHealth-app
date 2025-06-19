class JournalApp {
    constructor() {
        this.entries = this.loadEntries();
        this.isExpanded = false;
        this.initializeElements();
        this.bindEvents();
        this.updateUI();
        
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

    handleSubmit(e) {
        e.preventDefault();
        
        const title = this.titleInput.value.trim();
        const content = this.contentTextarea.value.trim();
        
        if (title && content) {
            const newEntry = {
                id: Date.now().toString(),
                title: title,
                content: content,
                date: new Date().toISOString()
            };
            
            this.entries.unshift(newEntry);
            this.saveEntries();
            this.collapseForm();
            this.updateUI();
        }
    }

    deleteEntry(id) {
        if (confirm('Are you sure you want to delete this entry?')) {
            this.entries = this.entries.filter(entry => entry.id !== id);
            this.saveEntries();
            this.updateUI();
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
        return `
            <div class="journal-entry">
                <div class="entry-header">
                    <h3 class="entry-title">${this.escapeHtml(entry.title)}</h3>
                    <button class="delete-button" onclick="app.deleteEntry('${entry.id}')" title="Delete entry">
                        <i data-lucide="trash-2"></i>
                    </button>
                </div>
                <div class="entry-date">
                    <i data-lucide="calendar"></i>
                    ${this.formatDate(entry.date)}
                </div>
                <p class="entry-content">${this.escapeHtml(entry.content)}</p>
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

    loadEntries() {
        try {
            const stored = localStorage.getItem('journalEntries');
            return stored ? JSON.parse(stored) : [];
        } catch (error) {
            console.error('Error loading entries:', error);
            return [];
        }
    }

    saveEntries() {
        try {
            localStorage.setItem('journalEntries', JSON.stringify(this.entries));
        } catch (error) {
            console.error('Error saving entries:', error);
        }
    }
}

// Initialize the app when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.app = new JournalApp();
});