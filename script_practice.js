// ========================================
// Practice Speaking Test
// ========================================
// NOTE: Practice mode does NOT save any recordings.
// It's purely for interface familiarization.

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
        details: "This is just practice. Your recording will NOT be saved. Speak for about 30 seconds.",
        duration: "30 seconds"
    },
    {
        part: "Practice Question 2",
        question: "What did you eat for breakfast today?",
        details: "Practice using the recording button. Your recording will NOT be saved.",
        duration: "30 seconds"
    },
    {
        part: "Practice Question 3",
        question: "What do you like to do on weekends?",
        details: "Keep practicing! Your recording will NOT be saved.",
        duration: "45 seconds"
    },
    {
        part: "Practice Question 4",
        question: "Describe the weather today.",
        details: "Last practice question! Your recording will NOT be saved.",
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
                    ✅ Practice completed!
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

function savePracticeRecording() {
    if (!practiceTestData.recordedChunks.length) {
        alert('No audio was captured. Please try again.');
        practiceTestData.isRecording = false;
        displayPracticeQuestion();
        return;
    }

    const currentQuestionIndex = practiceTestData.currentQuestion;
    
    // Mark as recorded (but don't save the recording)
    practiceTestData.hasRecorded.push(currentQuestionIndex);

    // Update UI to show completion
    displayPracticeQuestion();
    const statusEl = document.getElementById('recordingStatus');
    if (statusEl) {
        statusEl.innerHTML = '✅ Practice recording completed!';
    }

    // Update navigation
    updatePracticeNavButtons();

    // Auto-advance after 1.5 seconds
    setTimeout(() => {
        if (practiceTestData.currentQuestion < practiceTestData.questions.length - 1) {
            goToNextQuestion();
        }
    }, 1500);
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
