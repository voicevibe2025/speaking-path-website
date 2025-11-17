// ========================================
// Practice Speaking Test
// ========================================

// Use same Supabase configuration from script.js
const PRACTICE_SUPABASE_URL = typeof SUPABASE_URL !== 'undefined' ? SUPABASE_URL : 'https://tteyzluxugggatteosms.supabase.co';
const PRACTICE_SUPABASE_ANON_KEY = typeof SUPABASE_ANON_KEY !== 'undefined' ? SUPABASE_ANON_KEY : 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InR0ZXl6bHV4dWdnZ2F0dGVvc21zIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjMzNTY2OTksImV4cCI6MjA3ODkzMjY5OX0.ky64JXHN-u3f6G2OEJGf0WkxdtJ7W5Z1UsdrGrFu-4c';

let practiceSupabase = null;

let practiceTestData = {
    studentId: '',
    studentName: '',
    currentQuestion: 0,
    questions: [],
    mediaRecorder: null,
    recordedChunks: [],
    recordings: {},
    startTime: null,
    isRecording: false,
    hasRecorded: []
};

// Simple practice questions to familiarize students with interface
const practiceQuestions = [
    {
        part: "Practice Question 1",
        question: "What is your favorite color and why?",
        details: "This is just a practice question. Speak for about 30 seconds.",
        duration: "30 seconds"
    },
    {
        part: "Practice Question 2",
        question: "What did you eat for breakfast today?",
        details: "Describe your breakfast in simple sentences. Practice using the recording button.",
        duration: "30 seconds"
    },
    {
        part: "Practice Question 3",
        question: "What do you like to do on weekends?",
        details: "Talk about your favorite weekend activities. This is still practice!",
        duration: "45 seconds"
    },
    {
        part: "Practice Question 4",
        question: "Describe the weather today.",
        details: "Tell me about today's weather. This is the last practice question!",
        duration: "30 seconds"
    }
];

function startPracticeTest() {
    const studentId = document.getElementById('studentId').value.trim();
    const studentName = document.getElementById('studentName').value.trim();

    if (!studentId || !studentName) {
        alert('Please enter your Student ID and Name.');
        return;
    }

    // Initialize Supabase client
    if (PRACTICE_SUPABASE_URL && PRACTICE_SUPABASE_ANON_KEY) {
        try {
            practiceSupabase = window.supabase.createClient(PRACTICE_SUPABASE_URL, PRACTICE_SUPABASE_ANON_KEY);
            console.log('Practice test: Supabase initialized');
        } catch (error) {
            console.error('Supabase initialization error:', error);
            practiceSupabase = null;
        }
    }

    practiceTestData.studentId = studentId;
    practiceTestData.studentName = studentName;
    practiceTestData.questions = practiceQuestions;
    practiceTestData.currentQuestion = 0;
    practiceTestData.hasRecorded = [];

    document.getElementById('setupScreen').style.display = 'none';
    document.getElementById('testScreen').style.display = 'flex';
    document.getElementById('testScreen').style.flexDirection = 'column';
    document.getElementById('testScreen').style.height = '100vh';
    
    document.getElementById('candidateInfo').textContent = `${studentName} (${studentId})`;
    
    displayPracticeQuestion();
}

function displayPracticeQuestion() {
    const q = practiceTestData.questions[practiceTestData.currentQuestion];
    const container = document.getElementById('questionContainer');
    const currentQuestionIndex = practiceTestData.currentQuestion;
    const hasRecorded = practiceTestData.hasRecorded.includes(currentQuestionIndex);
    
    let html = `
        <div class="examiner-avatar">
            <i class="fas fa-graduation-cap"></i>
        </div>
        <div class="part-title">${q.part}</div>
        <div class="question-text">${q.question}</div>
    `;

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
    } else if (practiceTestData.isRecording) {
        html += `
            <div class="recording-controls">
                <button class="record-btn recording" id="recordBtn" onclick="stopPracticeRecording()">
                    <i class="fas fa-stop"></i> <span id="recordBtnText">Stop Recording</span>
                </button>
                <div class="recording-status" id="recordingStatus">🔴 Recording...</div>
                <div class="recording-timer" id="recordingTimer"></div>
            </div>
        `;
    } else {
        html += `
            <div class="recording-controls">
                <button class="record-btn" id="recordBtn" onclick="startPracticeRecording()">
                    <i class="fas fa-circle"></i> <span id="recordBtnText">Start Recording</span>
                </button>
                <div class="recording-status" id="recordingStatus"></div>
                <div class="recording-timer" id="recordingTimer"></div>
            </div>
        `;
    }

    container.innerHTML = html;
    updatePracticeProgress();
    updatePracticeNavButtons();
}

function updatePracticeProgress() {
    const total = practiceTestData.questions.length;
    const current = practiceTestData.currentQuestion + 1;
    const percentage = (current / total) * 100;
    
    document.getElementById('progressFill').style.width = percentage + '%';
    document.getElementById('progressText').textContent = `Practice Question ${current} of ${total}`;
}

function updatePracticeNavButtons() {
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    
    // Hide Previous button (one-attempt-only)
    if (prevBtn) {
        prevBtn.style.display = 'none';
    }
    
    const currentQuestionIndex = practiceTestData.currentQuestion;
    const hasRecorded = practiceTestData.hasRecorded.includes(currentQuestionIndex);
    const isLast = practiceTestData.currentQuestion === practiceTestData.questions.length - 1;
    
    // Only enable Next if current question has been recorded
    if (nextBtn) {
        nextBtn.disabled = !hasRecorded;
        
        if (isLast) {
            nextBtn.innerHTML = '<i class="fas fa-check"></i> Finish Practice';
        } else {
            nextBtn.innerHTML = 'Next <i class="fas fa-chevron-right"></i>';
        }
    }
}

function goToNextQuestion() {
    if (practiceTestData.currentQuestion < practiceTestData.questions.length - 1) {
        practiceTestData.currentQuestion++;
        displayPracticeQuestion();
    } else {
        finishPracticeTest();
    }
}

function goToPrevQuestion() {
    // Disabled in one-attempt-only mode
    return;
}

function startPracticeRecording() {
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        alert('Recording is not supported in this browser. Please use Chrome or Edge.');
        return;
    }

    // Prevent recording if already recorded
    const currentQuestionIndex = practiceTestData.currentQuestion;
    if (practiceTestData.hasRecorded.includes(currentQuestionIndex)) {
        return;
    }

    navigator.mediaDevices.getUserMedia({ audio: true })
        .then(stream => {
            practiceTestData.recordedChunks = [];
            practiceTestData.mediaRecorder = new MediaRecorder(stream);
            practiceTestData.startTime = Date.now();
            practiceTestData.isRecording = true;

            practiceTestData.mediaRecorder.ondataavailable = event => {
                if (event.data && event.data.size > 0) {
                    practiceTestData.recordedChunks.push(event.data);
                }
            };

            practiceTestData.mediaRecorder.onstop = () => {
                stream.getTracks().forEach(track => track.stop());
                practiceTestData.isRecording = false;
                savePracticeRecording();
            };

            practiceTestData.mediaRecorder.start();
            displayPracticeQuestion();
            startPracticeTimer();
        })
        .catch(error => {
            console.error('Error accessing microphone:', error);
            alert('Could not access microphone. Please check permissions.');
            practiceTestData.isRecording = false;
        });
}

function stopPracticeRecording() {
    if (practiceTestData.mediaRecorder && practiceTestData.mediaRecorder.state === 'recording') {
        practiceTestData.mediaRecorder.stop();
        stopPracticeTimer();
    }
}

let practiceTimerInterval = null;

function startPracticeTimer() {
    practiceTimerInterval = setInterval(() => {
        const elapsed = Math.floor((Date.now() - practiceTestData.startTime) / 1000);
        const minutes = Math.floor(elapsed / 60);
        const seconds = elapsed % 60;
        const timerEl = document.getElementById('recordingTimer');
        if (timerEl) {
            timerEl.textContent = `${minutes}:${seconds.toString().padStart(2, '0')}`;
        }
    }, 1000);
}

function stopPracticeTimer() {
    if (practiceTimerInterval) {
        clearInterval(practiceTimerInterval);
        practiceTimerInterval = null;
    }
}

async function savePracticeRecording() {
    if (!practiceTestData.recordedChunks.length) {
        alert('No audio was captured. Please try again.');
        practiceTestData.isRecording = false;
        displayPracticeQuestion();
        return;
    }

    const currentQuestionIndex = practiceTestData.currentQuestion;
    const blob = new Blob(practiceTestData.recordedChunks, { type: 'audio/webm' });
    const questionKey = `practice_q${practiceTestData.currentQuestion}`;
    const filename = `${practiceTestData.studentId}_${questionKey}.webm`;
    
    // Mark as recorded
    practiceTestData.hasRecorded.push(currentQuestionIndex);
    practiceTestData.recordings[questionKey] = { blob, filename };

    // Update UI
    displayPracticeQuestion();
    const statusEl = document.getElementById('recordingStatus');
    if (statusEl) {
        statusEl.innerHTML = '☁️ Uploading practice recording...';
    }

    // Upload to Supabase (practice folder)
    if (practiceSupabase) {
        try {
            const filePath = `practice-tests/${practiceTestData.studentId}/${filename}`;
            
            const { data, error } = await practiceSupabase.storage
                .from('vozvibe-recordings')
                .upload(filePath, blob, {
                    contentType: 'audio/webm',
                    upsert: false
                });

            if (error) {
                console.error('Supabase upload error:', error);
                throw error;
            }

            console.log('Practice upload successful:', data);
            
            if (statusEl) {
                statusEl.innerHTML = '✅ Upload successful!';
            }
        } catch (error) {
            console.error('Upload failed:', error);
            
            if (statusEl) {
                statusEl.innerHTML = '✅ Practice recording saved (upload skipped)';
            }
        }
    } else {
        if (statusEl) {
            statusEl.innerHTML = '✅ Practice recording completed';
        }
    }

    // Update navigation
    updatePracticeNavButtons();

    // Auto-advance after 2 seconds
    setTimeout(() => {
        if (practiceTestData.currentQuestion < practiceTestData.questions.length - 1) {
            goToNextQuestion();
        }
    }, 2000);
}

function finishPracticeTest() {
    const recordedCount = practiceTestData.hasRecorded.length;
    const totalQuestions = practiceTestData.questions.length;
    
    alert(`✅ Practice Complete!\n\nYou successfully completed ${recordedCount} out of ${totalQuestions} practice questions.\n\nYou are now ready for the actual speaking test. Good luck!`);
    
    window.location.href = 'index.html';
}

function confirmExit() {
    const proceed = confirm('Exit practice session and return to main page?');
    if (proceed) {
        window.location.href = 'index.html';
    }
}
