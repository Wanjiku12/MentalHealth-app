// Mood Tracker JS for Tulia
let selectedMood = null;

// Set current date
function setCurrentDate() {
    const today = new Date().toLocaleDateString();
    const dateEl = document.getElementById("currentDate");
    if (dateEl) dateEl.textContent = today;
}

function selectMood(button) {
    document.querySelectorAll('.mood-button').forEach(btn => btn.classList.remove('selected'));
    button.classList.add('selected');
    selectedMood = button.getAttribute('data-mood');
}

function saveMood() {
    const username = localStorage.getItem('currentUsername');
    const token = localStorage.getItem('userToken');
    const moodRating = document.getElementById('moodRating').value;
    const moodNote = document.getElementById('moodNote').value.trim();
    if (!username || !token) {
        showMessage('You must be logged in to save your mood.', 'error');
        return;
    }
    if (!selectedMood) {
        showMessage('Please select a mood.', 'error');
        return;
    }
    // Save as a journal entry
    const data = {
        journal_title: selectedMood,
        journal_entry: moodNote || selectedMood,
        mood_rating: moodRating
    };
    fetch('http://localhost:4000/postJournal', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(data)
    })
    .then(async response => {
        if (response.ok) {
            showMessage('Mood saved!', 'success');
            document.getElementById('moodNote').value = '';
            document.getElementById('moodRating').value = 3;
            document.getElementById('ratingDisplay').textContent = 3;
            document.querySelectorAll('.mood-button').forEach(btn => btn.classList.remove('selected'));
            selectedMood = null;
            fetchRecentMoods();
        } else {
            const errorData = await response.json();
            showMessage(errorData.message || 'Failed to save mood.', 'error');
        }
    })
    .catch(() => {
        showMessage('Network error. Could not save mood.', 'error');
    });
}

function fetchRecentMoods() {
    const username = localStorage.getItem('currentUsername');
    const token = localStorage.getItem('userToken');
    const list = document.getElementById('moodHistoryList');
    if (!username || !token) {
        list.innerHTML = '<p>You must be logged in to see your moods.</p>';
        return;
    }
    fetch(`http://localhost:4000/journals/${username}`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
    .then(async response => {
        if (response.ok) {
            const result = await response.json();
            // Only show entries with a mood_rating
            const entries = (result.entries || []).filter(entry => entry.mood_rating !== null && entry.mood_rating !== undefined && entry.mood_rating !== '');
            if (entries.length === 0) {
                list.innerHTML = '<p>No mood entries yet.</p>';
                return;
            }
            list.innerHTML = entries.slice(0, 10).map(entry => renderMoodHistoryItem(entry)).join('');
        } else {
            list.innerHTML = '<p>Failed to load moods.</p>';
        }
    })
    .catch(() => {
        list.innerHTML = '<p>Network error. Could not load moods.</p>';
    });
}

function renderMoodHistoryItem(entry) {
    const mood = entry.journal_title;
    const rating = entry.mood_rating || '-';
    const date = new Date(entry.entry_date).toLocaleDateString();
    return `<div class="history-item">
        <span class="mood-tag ${mood.toLowerCase().replace(/\s+/g, '-')}">${mood}</span>
        <span>Intensity: ${rating}</span>
        <span>${date}</span>
    </div>`;
}

function showMessage(message, type) {
    // Remove existing message
    const existingMessage = document.querySelector('.message');
    if (existingMessage) existingMessage.remove();
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${type}`;
    messageDiv.textContent = message;
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
    setTimeout(() => {
        messageDiv.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => {
            if (messageDiv.parentNode) messageDiv.remove();
        }, 300);
    }, 3000);
}

document.addEventListener('DOMContentLoaded', function() {
    setCurrentDate();
    fetchRecentMoods();
    document.getElementById('moodRating').addEventListener('input', function() {
        document.getElementById('ratingDisplay').textContent = this.value;
    });
}); 