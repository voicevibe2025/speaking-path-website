// VozVibe Website JavaScript

// Download functionality
function downloadApp() {
    // APK hosted on Google Drive
    const apkUrl = 'https://drive.google.com/file/d/1Q1ZJkYCZMspttLi4iLpTgaQUE6kDKwR-/view?usp=sharing';
    
    // Create a temporary link element to trigger download
    const link = document.createElement('a');
    link.href = apkUrl;
    link.download = 'VozVibe.apk';
    document.body.appendChild(link);
    
    // Trigger the download
    link.click();
    
    // Clean up
    document.body.removeChild(link);
    
    // Show download started message
    showNotification('Download started! Please check your Downloads folder.', 'success');
    
    // Track download (you can add analytics here if needed)
    console.log('APK download initiated');
}

// Show/hide installation guide
function showInstallGuide() {
    const guide = document.getElementById('installGuide');
    guide.style.display = 'block';
    guide.scrollIntoView({ behavior: 'smooth' });
}

function hideInstallGuide() {
    const guide = document.getElementById('installGuide');
    guide.style.display = 'none';
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
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-${type === 'success' ? 'check-circle' : 'info-circle'}"></i>
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
        background: ${type === 'success' ? '#10b981' : '#3b82f6'};
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

// Add CSS animations for notifications
function addNotificationStyles() {
    if (!document.querySelector('#notification-styles')) {
        const style = document.createElement('style');
        style.id = 'notification-styles';
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
    }
}

// Device detection
function detectDevice() {
    const userAgent = navigator.userAgent.toLowerCase();
    const isAndroid = userAgent.includes('android');
    const isIOS = userAgent.includes('iphone') || userAgent.includes('ipad');
    
    return {
        isAndroid,
        isIOS,
        isMobile: isAndroid || isIOS
    };
}

// Show device-specific messages
function showDeviceSpecificInfo() {
    const device = detectDevice();
    
    if (device.isIOS) {
        showNotification('VozVibe is currently available for Android devices only. iOS version coming soon!', 'info');
    } else if (!device.isAndroid && device.isMobile) {
        showNotification('For best experience, please download VozVibe on an Android device.', 'info');
    }
}

// Smooth scrolling for anchor links
function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Initialize page
document.addEventListener('DOMContentLoaded', function() {
    console.log('VozVibe website loaded');
    
    // Add notification styles
    addNotificationStyles();
    
    // Initialize smooth scrolling
    initSmoothScrolling();
    
    // Show device-specific info after a short delay
    setTimeout(showDeviceSpecificInfo, 2000);
    
    // File size is now hardcoded in HTML
    
    // Add hover effects to feature cards
    const featureCards = document.querySelectorAll('.feature-card');
    featureCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    // Add click tracking for analytics (optional)
    document.addEventListener('click', function(e) {
        if (e.target.matches('.download-btn.primary')) {
            console.log('Download button clicked');
            // Add your analytics tracking here
        }
        
        if (e.target.matches('.download-btn.secondary')) {
            console.log('Installation guide button clicked');
            // Add your analytics tracking here
        }
    });
});

// Handle back button for install guide
window.addEventListener('popstate', function() {
    const guide = document.getElementById('installGuide');
    if (guide && guide.style.display === 'block') {
        hideInstallGuide();
    }
});

// Error handling for APK download
function handleDownloadError() {
    showNotification('Download failed. Please try again or contact support.', 'error');
}

// Get actual file size of APK
function getAPKFileSize() {
    const apkUrl = './vozvibe.apk';
    
    // First try HEAD request
    fetch(apkUrl, { method: 'HEAD' })
        .then(response => {
            if (response.ok) {
                const contentLength = response.headers.get('content-length');
                if (contentLength) {
                    const sizeInBytes = parseInt(contentLength);
                    const sizeInMB = (sizeInBytes / (1024 * 1024)).toFixed(1);
                    document.getElementById('fileSize').textContent = `${sizeInMB} MB`;
                    return;
                }
            }
            // Fallback: try partial GET request
            return fetch(apkUrl, { 
                method: 'GET',
                headers: { 'Range': 'bytes=0-0' }
            });
        })
        .then(response => {
            if (response && response.ok) {
                const contentRange = response.headers.get('content-range');
                if (contentRange) {
                    // Extract total size from "bytes 0-0/12345678" format
                    const totalSize = contentRange.split('/')[1];
                    if (totalSize && totalSize !== '*') {
                        const sizeInBytes = parseInt(totalSize);
                        const sizeInMB = (sizeInBytes / (1024 * 1024)).toFixed(1);
                        document.getElementById('fileSize').textContent = `${sizeInMB} MB`;
                        return;
                    }
                }
            }
            // Final fallback: show approximate size
            document.getElementById('fileSize').textContent = '~50 MB';
        })
        .catch(() => {
            // If all fails, show approximate size
            document.getElementById('fileSize').textContent = '~50 MB';
        });
}
