// VozVibe Website JavaScript

// Download functionality
function downloadApp() {
    // APK hosted on Google Drive
    const apkUrl = 'https://drive.google.com/file/d/1cUr8rwnGpTE8U7MiBurwNpLPEd3Azbox/view?usp=sharing';
    
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

    // Initialize computer-based speaking test helpers if present
    initComputerBasedSpeakingTest();
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

// =============================
// Computer-based Speaking Test
// =============================

let cbMediaRecorder = null;
let cbRecordedChunks = [];
let cbCurrentPartIndex = 0;
let cbVisibleSections = [];

function initComputerBasedSpeakingTest() {
    const container = document.getElementById('cbSpeakingTest');
    if (!container) {
        return; // Not on the speaking test page
    }

    console.log('Computer-based speaking test page detected');

    // Setup version filtering and navigation
    const versionSelect = document.getElementById('cbTestVersion');
    if (versionSelect) {
        // Function to update which sections are visible based on test version
        function updateVisibleSections() {
            const selectedVersion = versionSelect.value;
            const preSections = document.querySelectorAll('.cb-test-section-pre');
            const postSections = document.querySelectorAll('.cb-test-section-post');

            // Determine which sections should be available
            if (selectedVersion === 'pre') {
                cbVisibleSections = Array.from(preSections);
            } else if (selectedVersion === 'post') {
                cbVisibleSections = Array.from(postSections);
            }

            // Hide all sections first
            preSections.forEach(section => section.style.display = 'none');
            postSections.forEach(section => section.style.display = 'none');

            // Reset to first part and show it
            cbCurrentPartIndex = 0;
            showCurrentPart();
        }

        // Listen for changes
        versionSelect.addEventListener('change', updateVisibleSections);

        // Set initial state (default to pre-test)
        updateVisibleSections();
    }
}

function showCurrentPart() {
    // Hide all sections
    cbVisibleSections.forEach(section => section.style.display = 'none');

    // Show current section
    if (cbVisibleSections[cbCurrentPartIndex]) {
        cbVisibleSections[cbCurrentPartIndex].style.display = 'block';
        
        // Scroll to top of page
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    // Update navigation buttons
    updateNavigationButtons();
}

function updateNavigationButtons() {
    const prevButtons = document.querySelectorAll('#cb-prev-btn');
    const nextButtons = document.querySelectorAll('#cb-next-btn');
    const progressElements = document.querySelectorAll('#cb-progress');

    const isFirst = cbCurrentPartIndex === 0;
    const isLast = cbCurrentPartIndex === cbVisibleSections.length - 1;

    // Update all Previous buttons
    prevButtons.forEach(btn => {
        btn.disabled = isFirst;
    });

    // Update all Next buttons
    nextButtons.forEach(btn => {
        if (isLast) {
            btn.textContent = 'Finish';
            btn.innerHTML = '<i class="fas fa-check"></i> Finish';
        } else {
            btn.textContent = 'Next';
            btn.innerHTML = 'Next <i class="fas fa-chevron-right"></i>';
        }
        btn.disabled = false;
    });

    // Update progress indicators
    progressElements.forEach(progress => {
        progress.textContent = `Part ${cbCurrentPartIndex + 1} of ${cbVisibleSections.length}`;
    });
}

function goToNextPart() {
    if (cbCurrentPartIndex < cbVisibleSections.length - 1) {
        cbCurrentPartIndex++;
        showCurrentPart();
    } else {
        // Finished all parts
        if (typeof showNotification === 'function') {
            showNotification('Test complete! Please submit your recorded files to your instructor.', 'success');
        }
        // Could also show a completion message on the page
    }
}

function goToPreviousPart() {
    if (cbCurrentPartIndex > 0) {
        cbCurrentPartIndex--;
        showCurrentPart();
    }
}

function getSpeakingTestMeta() {
    const idInput = document.getElementById('cbCandidateId');
    const nameInput = document.getElementById('cbCandidateName');
    const versionSelect = document.getElementById('cbTestVersion');

    const candidateId = idInput ? idInput.value.trim() : '';
    const candidateName = nameInput ? nameInput.value.trim() : '';
    const version = versionSelect ? versionSelect.value : '';

    if (!candidateId || !candidateName) {
        if (typeof showNotification === 'function') {
            showNotification('Please enter your Candidate ID and Name before recording.', 'error');
        }
        return null;
    }

    return {
        candidateId,
        candidateName,
        version
    };
}

function startSpeakingTestRecording(partKey) {
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        if (typeof showNotification === 'function') {
            showNotification('Recording is not supported in this browser. Please use a modern browser like Chrome or Edge.', 'error');
        }
        return;
    }

    if (cbMediaRecorder && cbMediaRecorder.state === 'recording') {
        if (typeof showNotification === 'function') {
            showNotification('Another recording is already in progress. Please stop it before starting a new one.', 'info');
        }
        return;
    }

    const meta = getSpeakingTestMeta();
    if (!meta) {
        return;
    }

    const statusEl = document.getElementById(`cb-status-${partKey}`);
    if (statusEl) {
        statusEl.textContent = 'Requesting microphone permission...';
    }

    navigator.mediaDevices.getUserMedia({ audio: true })
        .then(stream => {
            cbRecordedChunks = [];
            cbMediaRecorder = new MediaRecorder(stream);

            cbMediaRecorder.ondataavailable = event => {
                if (event.data && event.data.size > 0) {
                    cbRecordedChunks.push(event.data);
                }
            };

            cbMediaRecorder.onstop = () => {
                stream.getTracks().forEach(track => track.stop());

                const status = document.getElementById(`cb-status-${partKey}`);
                const container = document.getElementById(`cb-recordings-${partKey}`);

                if (!container) {
                    return;
                }

                if (!cbRecordedChunks.length) {
                    if (status) {
                        status.textContent = 'No audio captured.';
                    }
                    return;
                }

                const blob = new Blob(cbRecordedChunks, { type: 'audio/webm' });
                const url = URL.createObjectURL(blob);

                const safeId = meta.candidateId || 'candidate';
                const versionLabel = meta.version === 'post' ? 'post' : 'pre';
                const fileName = `${safeId}_${versionLabel}_${partKey}.webm`;

                container.innerHTML = '';
                const link = document.createElement('a');
                link.href = url;
                link.download = fileName;
                link.textContent = `Download recording: ${fileName}`;

                container.appendChild(link);

                if (status) {
                    status.textContent = 'Recording finished. Click the link below to download your file.';
                }

                if (typeof showNotification === 'function') {
                    showNotification(`Recording ready: ${fileName}`, 'success');
                }
            };

            cbMediaRecorder.start();

            if (statusEl) {
                statusEl.textContent = 'Recording... Speak clearly into your microphone.';
            }

            if (typeof showNotification === 'function') {
                showNotification('Recording started. Speak clearly into your microphone.', 'info');
            }
        })
        .catch(error => {
            console.error('Error accessing microphone:', error);
            if (statusEl) {
                statusEl.textContent = 'Could not start recording. Please check your microphone permissions.';
            }
            if (typeof showNotification === 'function') {
                showNotification('Could not access microphone. Please check your browser permissions and try again.', 'error');
            }
        });
}

function stopSpeakingTestRecording(partKey) {
    if (!cbMediaRecorder || cbMediaRecorder.state !== 'recording') {
        if (typeof showNotification === 'function') {
            showNotification('There is no active recording to stop.', 'info');
        }
        return;
    }

    const statusEl = document.getElementById(`cb-status-${partKey}`);
    if (statusEl) {
        statusEl.textContent = 'Stopping and saving your recording...';
    }

    cbMediaRecorder.stop();
}

// ========================================
// Interactive Speaking Test
// ========================================

// Supabase Configuration
// Your Supabase URL from .env:
const SUPABASE_URL = 'https://ghsrluoqcwfbiierjpqk.supabase.co';
// IMPORTANT: Replace with ANON KEY (not service_role_key!)
// Get it from: Supabase Dashboard > Settings > API > anon public key
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imdoc3JsdW9xY3dmYmlpZXJqcHFrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTU1NDUwNTYsImV4cCI6MjA3MTEyMTA1Nn0.fpVWk_yY7Qrpb8NxlH_bPYGJFE-efFEyeI2rXD1wMiY';

let supabase = null;

let interactiveTestData = {
    studentId: '',
    studentName: '',
    testVersion: '',
    currentQuestion: 0,
    questions: [],
    mediaRecorder: null,
    recordedChunks: [],
    recordings: {},
    startTime: null,
    isRecording: false,
    hasRecorded: [] // Track which questions have been recorded (one-attempt-only)
};

const testQuestions = {
    pre: [
        { part: "Part 1: Introduction", question: "Can you tell me about yourself?", details: "Please mention your name, age, what you study or do for work.", duration: "30-45 seconds", maxSeconds: 45 },
        { part: "Part 1: Introduction", question: "What do you usually do in your free time?", details: "Talk about your hobbies and activities you enjoy.", duration: "30-45 seconds", maxSeconds: 45 },
        { part: "Part 1: Introduction", question: "Please describe your hometown or the place where you live now.", details: "Describe the place, what it's like, and what you like about it.", duration: "30-45 seconds", maxSeconds: 45 },
        { part: "Part 1: Introduction", question: "What are your plans for the next few years?", details: "Talk about your goals for study, career, or personal life.", duration: "30-45 seconds", maxSeconds: 45 },
        
        { part: "Part 2: Picture Description", question: "Look at this picture and describe what you see.", image: "images/pre_market_scene.png", details: "Describe what's happening in the market scene. Talk about the people, the place, and what you think might be happening.", duration: "30-45 seconds", maxSeconds: 45 },
        
        { part: "Part 3: Role-play (Restaurant)", question: "Imagine you're in a restaurant. What would you like to order?", details: "Ask the waiter about menu items, ingredients, or recommendations. Then order a drink and a main course.", duration: "30-45 seconds", maxSeconds: 45 },
        { part: "Part 3: Role-play (Restaurant)", question: "Can you ask the waiter about waiting time or dessert options?", details: "Continue your conversation with the waiter about other aspects of your meal.", duration: "30-45 seconds", maxSeconds: 45 },
        
        { part: "Part 4: Discussion (Hobby)", question: "What is your favourite hobby, and when did you start it?", details: "Explain what the hobby is and how you got started with it.", duration: "30-45 seconds", maxSeconds: 45 },
        { part: "Part 4: Discussion (Hobby)", question: "Why do you enjoy this hobby?", details: "Describe what you like about it and how it makes you feel.", duration: "30-45 seconds", maxSeconds: 45 },
        { part: "Part 4: Discussion (Hobby)", question: "How often do you do it, and with whom?", details: "Talk about your routine and if you do it alone or with others.", duration: "30-45 seconds", maxSeconds: 45 },
        { part: "Part 4: Discussion (Hobby)", question: "How has this hobby changed your life or daily routine?", details: "Explain any impact it has had on you.", duration: "30-45 seconds", maxSeconds: 45 },
        { part: "Part 4: Discussion (Hobby)", question: "Do you think you will still have this hobby in the future? Why or why not?", details: "Share your thoughts about continuing this hobby.", duration: "30-45 seconds", maxSeconds: 45 }
    ],
    post: [
        { part: "Part 1: Daily Life", question: "Can you tell me about your daily routine on a weekday?", details: "Describe what you do from morning to evening.", duration: "30-45 seconds", maxSeconds: 45 },
        { part: "Part 1: Daily Life", question: "What do you usually do on weekends?", details: "Talk about your typical weekend activities.", duration: "30-45 seconds", maxSeconds: 45 },
        { part: "Part 1: Daily Life", question: "Please describe the place where you study or work.", details: "Describe the environment, what it's like, and how you feel about it.", duration: "30-45 seconds", maxSeconds: 45 },
        { part: "Part 1: Daily Life", question: "What goals do you have for your future study or career?", details: "Share your plans and ambitions.", duration: "30-45 seconds", maxSeconds: 45 },
        
        { part: "Part 2: Picture Description", question: "Look at this picture and describe what you see.", image: "images/post_airport_scene.png", details: "Describe what's happening at the airport. Talk about the people, the atmosphere, and what might be happening.", duration: "30-45 seconds", maxSeconds: 45 },
        
        { part: "Part 3: Role-play (Returning Purchase)", question: "Imagine you bought clothing that doesn't fit. How would you explain the problem to the shop assistant?", details: "Describe the problem clearly and mention that you have the receipt.", duration: "30-45 seconds", maxSeconds: 45 },
        { part: "Part 3: Role-play (Returning Purchase)", question: "What would you like to do - exchange it or get a refund?", details: "Continue your conversation with the shop assistant about solutions.", duration: "30-45 seconds", maxSeconds: 45 },
        
        { part: "Part 4: Discussion (Culture)", question: "Please describe an important festival or tradition in your culture.", details: "Explain what it is and when it happens.", duration: "30-45 seconds", maxSeconds: 45 },
        { part: "Part 4: Discussion (Culture)", question: "What do people usually do during this festival or tradition?", details: "Describe the activities and customs.", duration: "30-45 seconds", maxSeconds: 45 },
        { part: "Part 4: Discussion (Culture)", question: "Why is this festival or tradition important for you or for people in your country?", details: "Explain its significance and meaning.", duration: "30-45 seconds", maxSeconds: 45 },
        { part: "Part 4: Discussion (Culture)", question: "How has this festival or tradition changed over time, if at all?", details: "Talk about any changes you've noticed.", duration: "30-45 seconds", maxSeconds: 45 },
        { part: "Part 4: Discussion (Culture)", question: "Do you think young people will continue this tradition in the future? Why or why not?", details: "Share your opinion about the future of this tradition.", duration: "30-45 seconds", maxSeconds: 45 }
    ]
};

function startInteractiveTest() {
    const studentId = document.getElementById('studentId').value.trim();
    const studentName = document.getElementById('studentName').value.trim();
    const testVersion = document.getElementById('testVersion').value;

    if (!studentId || !studentName) {
        if (typeof showNotification === 'function') {
            showNotification('Please enter your Student ID and Name.', 'error');
        } else {
            alert('Please enter your Student ID and Name.');
        }
        return;
    }

    // Initialize Supabase client
    if (SUPABASE_URL === 'YOUR_SUPABASE_URL' || SUPABASE_ANON_KEY === 'YOUR_SUPABASE_ANON_KEY') {
        alert('⚠️ Supabase configuration is missing!\n\nPlease update SUPABASE_URL and SUPABASE_ANON_KEY in script.js with your Supabase project credentials.\n\nFor now, recordings will be downloaded locally.');
        // Continue anyway for testing, but recordings won't upload
    } else {
        try {
            supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
            console.log('Supabase initialized successfully');
        } catch (error) {
            console.error('Supabase initialization error:', error);
            alert('Could not connect to storage. Recordings will be downloaded locally.');
        }
    }

    interactiveTestData.studentId = studentId;
    interactiveTestData.studentName = studentName;
    interactiveTestData.testVersion = testVersion;
    interactiveTestData.questions = testQuestions[testVersion];
    interactiveTestData.currentQuestion = 0;
    interactiveTestData.hasRecorded = [];

    document.getElementById('setupScreen').style.display = 'none';
    document.getElementById('testScreen').style.display = 'flex';
    document.getElementById('testScreen').style.flexDirection = 'column';
    document.getElementById('testScreen').style.height = '100vh';
    
    document.getElementById('candidateInfo').textContent = `${studentName} (${studentId}) - ${testVersion === 'pre' ? 'Pre-test' : 'Post-test'}`;
    
    displayQuestion();
}

function displayQuestion() {
    const q = interactiveTestData.questions[interactiveTestData.currentQuestion];
    const container = document.getElementById('questionContainer');
    const currentQuestionIndex = interactiveTestData.currentQuestion;
    const hasRecorded = interactiveTestData.hasRecorded.includes(currentQuestionIndex);
    
    let html = `
        <div class="examiner-avatar">
            <i class="fas fa-user-tie"></i>
        </div>
        <div class="part-title">${q.part}</div>
        <div class="question-text">${q.question}</div>
    `;

    if (q.image) {
        html += `<img src="${q.image}" alt="Test picture" class="test-image" />`;
    }

    if (q.details) {
        html += `<div class="question-details">${q.details}</div>`;
    }

    html += `<div class="question-details">⏱️ Suggested time: ${q.duration}</div>`;

    // One-attempt-only: Show record button only if not yet recorded
    if (hasRecorded) {
        html += `
            <div class="recording-controls">
                <div class="recording-status" style="color: #10b981; font-size: 1.1rem;">
                    ✅ Recording completed and uploaded
                </div>
            </div>
        `;
    } else if (interactiveTestData.isRecording) {
        html += `
            <div class="recording-controls">
                <button class="record-btn recording" id="recordBtn" onclick="stopInteractiveRecording()">
                    <i class="fas fa-stop"></i> <span id="recordBtnText">Stop Recording</span>
                </button>
                <div class="recording-status" id="recordingStatus">🔴 Recording...</div>
                <div class="recording-timer" id="recordingTimer"></div>
            </div>
        `;
    } else {
        html += `
            <div class="recording-controls">
                <button class="record-btn" id="recordBtn" onclick="startInteractiveRecording()">
                    <i class="fas fa-circle"></i> <span id="recordBtnText">Start Recording</span>
                </button>
                <div class="recording-status" id="recordingStatus"></div>
                <div class="recording-timer" id="recordingTimer"></div>
            </div>
        `;
    }

    container.innerHTML = html;
    updateProgress();
    updateNavButtons();
}

function updateProgress() {
    const total = interactiveTestData.questions.length;
    const current = interactiveTestData.currentQuestion + 1;
    const percentage = (current / total) * 100;
    
    document.getElementById('progressFill').style.width = percentage + '%';
    document.getElementById('progressText').textContent = `Question ${current} of ${total}`;
}

function updateNavButtons() {
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    
    // One-attempt-only: Hide Previous button completely
    if (prevBtn) {
        prevBtn.style.display = 'none';
    }
    
    const currentQuestionIndex = interactiveTestData.currentQuestion;
    const hasRecorded = interactiveTestData.hasRecorded.includes(currentQuestionIndex);
    const isLast = interactiveTestData.currentQuestion === interactiveTestData.questions.length - 1;
    
    // Only enable Next if current question has been recorded
    if (nextBtn) {
        nextBtn.disabled = !hasRecorded;
        
        if (isLast) {
            nextBtn.innerHTML = '<i class="fas fa-check"></i> Finish Test';
        } else {
            nextBtn.innerHTML = 'Next <i class="fas fa-chevron-right"></i>';
        }
    }
}

function goToNextQuestion() {
    if (interactiveTestData.currentQuestion < interactiveTestData.questions.length - 1) {
        interactiveTestData.currentQuestion++;
        displayQuestion();
    } else {
        finishTest();
    }
}

function goToPrevQuestion() {
    // Disabled in one-attempt-only mode
    return;
}

function startInteractiveRecording() {
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        alert('Recording is not supported in this browser. Please use Chrome or Edge.');
        return;
    }

    // Prevent recording if already recorded (one-attempt-only)
    const currentQuestionIndex = interactiveTestData.currentQuestion;
    if (interactiveTestData.hasRecorded.includes(currentQuestionIndex)) {
        return;
    }

    navigator.mediaDevices.getUserMedia({ audio: true })
        .then(stream => {
            interactiveTestData.recordedChunks = [];
            interactiveTestData.mediaRecorder = new MediaRecorder(stream);
            interactiveTestData.startTime = Date.now();
            interactiveTestData.isRecording = true;

            interactiveTestData.mediaRecorder.ondataavailable = event => {
                if (event.data && event.data.size > 0) {
                    interactiveTestData.recordedChunks.push(event.data);
                }
            };

            interactiveTestData.mediaRecorder.onstop = () => {
                stream.getTracks().forEach(track => track.stop());
                interactiveTestData.isRecording = false;
                saveInteractiveRecording();
            };

            interactiveTestData.mediaRecorder.start();

            // Update UI to show Stop button
            displayQuestion();
            startTimer();
        })
        .catch(error => {
            console.error('Error accessing microphone:', error);
            alert('Could not access microphone. Please check permissions.');
            interactiveTestData.isRecording = false;
        });
}

function stopInteractiveRecording() {
    if (interactiveTestData.mediaRecorder && interactiveTestData.mediaRecorder.state === 'recording') {
        interactiveTestData.mediaRecorder.stop();
        stopTimer();
    }
}

let timerInterval = null;

function startTimer() {
    // Clear any existing timer before starting a new one
    stopTimer();

    const q = interactiveTestData.questions[interactiveTestData.currentQuestion];
    const maxSeconds = q && typeof q.maxSeconds === 'number' ? q.maxSeconds : 45;
    const timerEl = document.getElementById('recordingTimer');

    if (!timerEl) {
        return;
    }

    // Set initial display (full remaining time)
    const initialMinutes = Math.floor(maxSeconds / 60);
    const initialSeconds = maxSeconds % 60;
    timerEl.textContent = `${initialMinutes}:${initialSeconds.toString().padStart(2, '0')}`;

    timerInterval = setInterval(() => {
        const elapsed = Math.floor((Date.now() - interactiveTestData.startTime) / 1000);
        const remaining = maxSeconds - elapsed;

        const clamped = Math.max(remaining, 0);
        const minutes = Math.floor(clamped / 60);
        const seconds = clamped % 60;
        timerEl.textContent = `${minutes}:${seconds.toString().padStart(2, '0')}`;

        // Auto-stop recording when time is up
        if (remaining <= 0) {
            stopInteractiveRecording();
        }
    }, 1000);
}

function stopTimer() {
    if (timerInterval) {
        clearInterval(timerInterval);
        timerInterval = null;
    }
}

async function saveInteractiveRecording() {
    if (!interactiveTestData.recordedChunks.length) {
        alert('No audio was captured. Please try again.');
        interactiveTestData.isRecording = false;
        displayQuestion();
        return;
    }

    const currentQuestionIndex = interactiveTestData.currentQuestion;
    const blob = new Blob(interactiveTestData.recordedChunks, { type: 'audio/webm' });
    const displayQuestionNumber = currentQuestionIndex + 1;
    const questionKey = `q${displayQuestionNumber}`;
    const filename = `${interactiveTestData.studentId}_${interactiveTestData.testVersion}_${questionKey}.webm`;
    
    // Mark as recorded (one-attempt-only)
    interactiveTestData.hasRecorded.push(currentQuestionIndex);
    interactiveTestData.recordings[questionKey] = { blob, filename };

    // Update UI to show uploading status
    displayQuestion();
    const statusEl = document.getElementById('recordingStatus');
    if (statusEl) {
        statusEl.innerHTML = '☁️ Uploading to storage...';
    }

    // Upload to Supabase
    if (supabase) {
        try {
            const filePath = `speaking-tests/${interactiveTestData.testVersion}/${interactiveTestData.studentId}/${filename}`;
            
            const { data, error } = await supabase.storage
                .from('vozvibe-recordings') // Bucket name
                .upload(filePath, blob, {
                    contentType: 'audio/webm',
                    upsert: false
                });

            if (error) {
                console.error('Supabase upload error:', error);
                throw error;
            }

            console.log('Upload successful:', data);
            
            if (statusEl) {
                statusEl.innerHTML = '✅ Upload successful!';
            }
            
            if (typeof showNotification === 'function') {
                showNotification(`Recording uploaded: ${filename}`, 'success');
            }
        } catch (error) {
            console.error('Upload failed:', error);
            
            // Fallback: download locally if upload fails
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = filename;
            a.click();
            
            if (statusEl) {
                statusEl.innerHTML = '⚠️ Upload failed. File downloaded locally.';
            }
            
            if (typeof showNotification === 'function') {
                showNotification('Upload failed. File downloaded locally.', 'error');
            }
        }
    } else {
        // No Supabase configured - download locally
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        a.click();
        
        if (statusEl) {
            statusEl.innerHTML = '💾 Downloaded locally (no storage configured)';
        }
    }

    // Update navigation buttons
    updateNavButtons();

    // Auto-advance or finish after 2 seconds
    setTimeout(() => {
        if (interactiveTestData.currentQuestion < interactiveTestData.questions.length - 1) {
            goToNextQuestion();
        } else {
            finishTest();
        }
    }, 2000);
}

function finishTest() {
    const recordedCount = interactiveTestData.hasRecorded.length;
    const totalQuestions = interactiveTestData.questions.length;
    
    if (recordedCount < totalQuestions) {
        const proceed = confirm(`You have only completed ${recordedCount} out of ${totalQuestions} questions. Do you want to finish anyway?`);
        if (!proceed) return;
    }
    
    if (supabase) {
        alert(`Test complete! ✅\n\nYou recorded ${recordedCount} out of ${totalQuestions} questions.\n\nAll recordings have been automatically uploaded to storage.`);
    } else {
        alert(`Test complete! ✅\n\nYou recorded ${recordedCount} out of ${totalQuestions} questions.\n\nRecordings were downloaded to your computer.`);
    }
    
    window.location.href = 'index.html';
}

function confirmExit() {
    const recordedCount = interactiveTestData.hasRecorded.length;
    const totalQuestions = interactiveTestData.questions.length;
    
    if (recordedCount < totalQuestions) {
        const proceed = confirm(`⚠️ WARNING: You have only completed ${recordedCount} out of ${totalQuestions} questions.\n\nIf you exit now, incomplete recordings will be lost.\n\nAre you sure you want to exit?`);
        if (!proceed) return;
    } else {
        const proceed = confirm('Are you sure you want to exit the test?');
        if (!proceed) return;
    }
    
    window.location.href = 'index.html';
}
