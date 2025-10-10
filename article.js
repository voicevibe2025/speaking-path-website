// VozVibe Article Page JavaScript

let currentFile = null;
let currentFileBlob = null;
let currentGDriveFileId = null;
let currentGDriveUrl = null;

// Initialize page
document.addEventListener('DOMContentLoaded', function() {
    console.log('Article page loaded');
    loadSavedFeedback();
    loadSavedGDriveLink();
});

// Extract Google Drive File ID from URL or ID
function extractGDriveFileId(input) {
    input = input.trim();
    
    // If it's already just a file ID (no slashes or protocols)
    if (!input.includes('/') && !input.includes(':')) {
        return input;
    }
    
    // Extract from various Google Drive URL formats
    const patterns = [
        /\/file\/d\/([a-zA-Z0-9_-]+)/,  // /file/d/FILE_ID
        /id=([a-zA-Z0-9_-]+)/,           // id=FILE_ID
        /\/open\?id=([a-zA-Z0-9_-]+)/,  // /open?id=FILE_ID
        /\/d\/([a-zA-Z0-9_-]+)/          // /d/FILE_ID
    ];
    
    for (const pattern of patterns) {
        const match = input.match(pattern);
        if (match && match[1]) {
            return match[1];
        }
    }
    
    return null;
}

// Load document from Google Drive
async function loadFromGoogleDrive() {
    const gdriveInput = document.getElementById('gdriveInput');
    const input = gdriveInput.value.trim();
    
    if (!input) {
        showNotification('Please enter a Google Drive link or File ID', 'error');
        return;
    }
    
    const fileId = extractGDriveFileId(input);
    
    if (!fileId) {
        showNotification('Invalid Google Drive link or File ID', 'error');
        return;
    }
    
    // Show loading
    showNotification('Loading document from Google Drive...', 'info');
    
    try {
        // Use Google Drive direct download URL (requires public sharing)
        const downloadUrl = `https://drive.google.com/uc?export=download&id=${fileId}`;
        
        const response = await fetch(downloadUrl);
        
        if (!response.ok) {
            throw new Error('Failed to download file. Make sure the file is shared as "Anyone with the link can view"');
        }
        
        const blob = await response.blob();
        
        // Check if it's a .docx file
        if (!blob.type.includes('wordprocessingml') && !blob.type.includes('application/octet-stream')) {
            throw new Error('File does not appear to be a Word document (.docx)');
        }
        
        // Store the file
        currentFileBlob = blob;
        currentGDriveFileId = fileId;
        currentGDriveUrl = `https://drive.google.com/file/d/${fileId}/view`;
        
        // Save to localStorage
        localStorage.setItem('gdriveFileId', fileId);
        localStorage.setItem('gdriveUrl', currentGDriveUrl);
        localStorage.setItem('gdriveLoadTime', new Date().toISOString());
        
        // Display file info
        displayGDriveFileInfo();
        
        showNotification('Document loaded successfully from Google Drive!', 'success');
        
    } catch (error) {
        console.error('Error loading from Google Drive:', error);
        showNotification(error.message || 'Failed to load document from Google Drive', 'error');
    }
}

// Display Google Drive file information
function displayGDriveFileInfo() {
    const gdriveSetup = document.getElementById('gdriveSetup');
    const fileInfo = document.getElementById('fileInfo');
    const fileName = document.getElementById('fileName');
    const uploadTime = document.getElementById('uploadTime');
    
    gdriveSetup.style.display = 'none';
    fileInfo.style.display = 'block';
    
    fileName.textContent = 'JALT-CALL Article (Google Drive)';
    uploadTime.textContent = `Loaded: ${new Date().toLocaleString()}`;
}

// Load saved Google Drive link
function loadSavedGDriveLink() {
    const savedFileId = localStorage.getItem('gdriveFileId');
    const savedUrl = localStorage.getItem('gdriveUrl');
    const savedTime = localStorage.getItem('gdriveLoadTime');
    
    if (savedFileId && savedUrl) {
        currentGDriveFileId = savedFileId;
        currentGDriveUrl = savedUrl;
        
        // Update input field
        document.getElementById('gdriveInput').value = savedUrl;
        
        // Show file info
        const gdriveSetup = document.getElementById('gdriveSetup');
        const fileInfo = document.getElementById('fileInfo');
        const fileName = document.getElementById('fileName');
        const uploadTime = document.getElementById('uploadTime');
        
        gdriveSetup.style.display = 'none';
        fileInfo.style.display = 'block';
        
        fileName.textContent = 'JALT-CALL Article (Google Drive)';
        uploadTime.textContent = `Loaded: ${new Date(savedTime).toLocaleString()}`;
        
        console.log('Restored Google Drive link from previous session');
    }
}

// Format file size
function formatFileSize(bytes) {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
}

// Display document content
async function displayDocument() {
    if (!currentFileBlob && !currentGDriveFileId) {
        showNotification('No document loaded', 'error');
        return;
    }
    
    const documentViewer = document.getElementById('documentViewer');
    const documentContent = document.getElementById('documentContent');
    const feedbackSection = document.getElementById('feedbackSection');
    
    // Show loading indicator
    documentContent.innerHTML = `
        <div class="loading-indicator">
            <i class="fas fa-spinner"></i>
            <p>Loading document...</p>
        </div>
    `;
    documentViewer.style.display = 'block';
    documentViewer.scrollIntoView({ behavior: 'smooth' });
    
    try {
        // If we don't have the blob, fetch it from Google Drive
        if (!currentFileBlob && currentGDriveFileId) {
            const downloadUrl = `https://drive.google.com/uc?export=download&id=${currentGDriveFileId}`;
            const response = await fetch(downloadUrl);
            
            if (!response.ok) {
                throw new Error('Failed to download file from Google Drive');
            }
            
            currentFileBlob = await response.blob();
        }
        
        // Read file as array buffer
        const arrayBuffer = await currentFileBlob.arrayBuffer();
        
        // Convert with mammoth.js
        const result = await mammoth.convertToHtml({ arrayBuffer: arrayBuffer }, {
            styleMap: [
                "p[style-name='Heading 1'] => h1:fresh",
                "p[style-name='Heading 2'] => h2:fresh",
                "p[style-name='Heading 3'] => h3:fresh",
                "p[style-name='Title'] => h1.title:fresh",
                "p[style-name='Subtitle'] => p.subtitle:fresh"
            ]
        });
        
        // Display converted HTML
        documentContent.innerHTML = result.value;
        
        // Show feedback section
        feedbackSection.style.display = 'block';
        
        // Log any warnings
        if (result.messages.length > 0) {
            console.log('Conversion messages:', result.messages);
        }
        
        showNotification('Document loaded successfully!', 'success');
        
    } catch (error) {
        console.error('Error converting document:', error);
        documentContent.innerHTML = `
            <div class="loading-indicator">
                <i class="fas fa-exclamation-triangle" style="color: #ef4444;"></i>
                <p>Failed to load document. Please make sure the file is shared and accessible.</p>
                <p style="color: #64748b; font-size: 0.9rem;">${error.message}</p>
            </div>
        `;
        showNotification('Failed to load document', 'error');
    }
}

// Hide document viewer
function hideDocument() {
    const documentViewer = document.getElementById('documentViewer');
    documentViewer.style.display = 'none';
}

// Print document
function printDocument() {
    const documentContent = document.getElementById('documentContent');
    const printWindow = window.open('', '', 'height=800,width=800');
    
    printWindow.document.write('<html><head><title>VozVibe Article</title>');
    printWindow.document.write('<style>');
    printWindow.document.write(`
        body {
            font-family: 'Times New Roman', serif;
            line-height: 1.8;
            padding: 40px;
            color: #000;
        }
        h1, h2, h3, h4, h5, h6 {
            margin-top: 1.5em;
            margin-bottom: 0.5em;
        }
        h1 { font-size: 2rem; }
        h2 { font-size: 1.7rem; }
        h3 { font-size: 1.4rem; }
        p { margin-bottom: 1em; text-align: justify; }
        table { width: 100%; border-collapse: collapse; margin: 1.5em 0; }
        table th, table td { border: 1px solid #000; padding: 8px; }
    `);
    printWindow.document.write('</style></head><body>');
    printWindow.document.write(documentContent.innerHTML);
    printWindow.document.write('</body></html>');
    
    printWindow.document.close();
    printWindow.focus();
    
    setTimeout(() => {
        printWindow.print();
        printWindow.close();
    }, 250);
}

// Change file
function changeFile() {
    const gdriveSetup = document.getElementById('gdriveSetup');
    const fileInfo = document.getElementById('fileInfo');
    const documentViewer = document.getElementById('documentViewer');
    const feedbackSection = document.getElementById('feedbackSection');
    
    gdriveSetup.style.display = 'block';
    fileInfo.style.display = 'none';
    documentViewer.style.display = 'none';
    feedbackSection.style.display = 'none';
    
    currentFile = null;
    currentFileBlob = null;
    currentGDriveFileId = null;
    currentGDriveUrl = null;
    
    // Clear input
    document.getElementById('gdriveInput').value = '';
    
    // Clear localStorage
    localStorage.removeItem('gdriveFileId');
    localStorage.removeItem('gdriveUrl');
    localStorage.removeItem('gdriveLoadTime');
}

// Open in Google Drive
function openInGoogleDrive() {
    if (!currentGDriveUrl) {
        showNotification('No Google Drive URL available', 'error');
        return;
    }
    
    window.open(currentGDriveUrl, '_blank');
    showNotification('Opening in Google Drive...', 'success');
}

// Submit feedback
function submitFeedback() {
    const feedbackInput = document.getElementById('feedbackInput');
    const feedbackText = feedbackInput.value.trim();
    
    if (!feedbackText) {
        showNotification('Please enter your feedback', 'error');
        return;
    }
    
    const feedback = {
        id: Date.now(),
        author: 'Team Member', // Could be made dynamic with login
        text: feedbackText,
        timestamp: new Date().toISOString()
    };
    
    // Save to localStorage
    const feedbacks = JSON.parse(localStorage.getItem('articleFeedback') || '[]');
    feedbacks.unshift(feedback);
    localStorage.setItem('articleFeedback', JSON.stringify(feedbacks));
    
    // Display feedback
    addFeedbackToList(feedback);
    
    // Clear input
    feedbackInput.value = '';
    
    showNotification('Feedback submitted successfully!', 'success');
}

// Add feedback to list
function addFeedbackToList(feedback) {
    const feedbackList = document.getElementById('feedbackList');
    
    const feedbackItem = document.createElement('div');
    feedbackItem.className = 'feedback-item';
    feedbackItem.innerHTML = `
        <div class="feedback-header">
            <span class="feedback-author">${feedback.author}</span>
            <span class="feedback-time">${formatTimestamp(feedback.timestamp)}</span>
        </div>
        <div class="feedback-text">${escapeHtml(feedback.text)}</div>
    `;
    
    feedbackList.insertBefore(feedbackItem, feedbackList.firstChild);
}

// Load saved feedback
function loadSavedFeedback() {
    const feedbacks = JSON.parse(localStorage.getItem('articleFeedback') || '[]');
    const feedbackList = document.getElementById('feedbackList');
    
    if (feedbacks.length > 0) {
        feedbacks.forEach(feedback => {
            addFeedbackToList(feedback);
        });
    } else {
        feedbackList.innerHTML = `
            <div style="text-align: center; padding: 30px; color: #64748b;">
                <i class="fas fa-comments" style="font-size: 3rem; margin-bottom: 15px; opacity: 0.3;"></i>
                <p>No feedback yet. Be the first to comment!</p>
            </div>
        `;
    }
}

// Format timestamp
function formatTimestamp(isoString) {
    const date = new Date(isoString);
    const now = new Date();
    const diffMs = now - date;
    const diffMins = Math.floor(diffMs / 60000);
    
    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins} minute${diffMins > 1 ? 's' : ''} ago`;
    
    const diffHours = Math.floor(diffMins / 60);
    if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
    
    const diffDays = Math.floor(diffHours / 24);
    if (diffDays < 7) return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
    
    return date.toLocaleDateString();
}

// Escape HTML to prevent XSS
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// Notification system
function showNotification(message, type = 'info') {
    // Remove existing notification if any
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    
    let icon = 'info-circle';
    let color = '#3b82f6';
    if (type === 'success') {
        icon = 'check-circle';
        color = '#10b981';
    } else if (type === 'error') {
        icon = 'exclamation-circle';
        color = '#ef4444';
    } else if (type === 'warning') {
        icon = 'exclamation-triangle';
        color = '#f59e0b';
    }
    
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-${icon}"></i>
            <span>${message}</span>
            <button class="notification-close" onclick="this.parentElement.parentElement.remove()">
                <i class="fas fa-times"></i>
            </button>
        </div>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${color};
        color: white;
        padding: 16px 20px;
        border-radius: 12px;
        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
        z-index: 1000;
        min-width: 300px;
        max-width: 400px;
        animation: slideIn 0.3s ease;
    `;
    
    // Add notification to page
    document.body.appendChild(notification);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentElement) {
            notification.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => {
                if (notification.parentElement) {
                    notification.remove();
                }
            }, 300);
        }
    }, 5000);
}

// Add notification styles
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
    
    .notification-content {
        display: flex;
        align-items: center;
        gap: 12px;
    }
    
    .notification-close {
        background: none;
        border: none;
        color: white;
        cursor: pointer;
        font-size: 1rem;
        margin-left: auto;
        padding: 4px;
        border-radius: 4px;
        transition: background 0.2s ease;
    }
    
    .notification-close:hover {
        background: rgba(255, 255, 255, 0.2);
    }
`;
document.head.appendChild(style);
