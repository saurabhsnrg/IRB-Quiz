const fs = require('fs');

// Read the JSON data
const questionsData = fs.readFileSync('/home/ubuntu/Uploads/combined_exam_data.json', 'utf8');

// Create the HTML content
const htmlContent = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Immigration Quiz Practice</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            min-height: 100vh;
            padding: 20px;
        }

        .container {
            max-width: 1400px;
            margin: 0 auto;
            background: white;
            border-radius: 20px;
            box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
            overflow: hidden;
            animation: fadeIn 0.5s ease;
        }

        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
        }

        @keyframes slideIn {
            from { opacity: 0; transform: translateX(-20px); }
            to { opacity: 1; transform: translateX(0); }
        }

        @keyframes pulse {
            0%, 100% { transform: scale(1); }
            50% { transform: scale(1.05); }
        }

        .header {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            padding: 30px 40px;
            text-align: center;
        }

        .header h1 {
            font-size: 2.5em;
            margin-bottom: 10px;
        }

        .header p {
            font-size: 1.1em;
            opacity: 0.9;
        }

        .content {
            padding: 40px;
        }

        .screen {
            display: none;
        }

        .screen.active {
            display: block;
            animation: fadeIn 0.5s ease;
        }

        /* Home Screen */
        .quiz-modes {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: 20px;
            margin-top: 30px;
        }

        .mode-card {
            background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
            border-radius: 15px;
            padding: 30px;
            cursor: pointer;
            transition: all 0.3s ease;
            text-align: center;
            border: 3px solid transparent;
        }

        .mode-card:hover {
            transform: translateY(-5px);
            box-shadow: 0 10px 30px rgba(102, 126, 234, 0.4);
            border-color: #667eea;
        }

        .mode-card h3 {
            font-size: 2em;
            color: #667eea;
            margin-bottom: 10px;
        }

        .mode-card .questions-count {
            font-size: 1.2em;
            font-weight: bold;
            color: #764ba2;
            margin: 10px 0;
        }

        .mode-card .time-limit {
            color: #666;
            font-size: 0.95em;
        }

        .btn {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            border: none;
            padding: 15px 30px;
            border-radius: 10px;
            font-size: 1.1em;
            cursor: pointer;
            transition: all 0.3s ease;
            margin: 10px 5px;
        }

        .btn:hover {
            transform: translateY(-2px);
            box-shadow: 0 5px 15px rgba(102, 126, 234, 0.4);
        }

        .btn-secondary {
            background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
        }

        .btn-success {
            background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
        }

        /* Quiz Interface */
        .quiz-container {
            display: flex;
            gap: 30px;
            align-items: flex-start;
        }

        .question-map-container {
            flex: 0 0 250px;
            background: #f8f9fa;
            border-radius: 15px;
            padding: 20px;
            max-height: 600px;
            overflow-y: auto;
            position: sticky;
            top: 20px;
        }

        .question-map-container h3 {
            margin-bottom: 15px;
            color: #667eea;
        }

        .question-map {
            display: grid;
            grid-template-columns: repeat(5, 1fr);
            gap: 8px;
        }

        .question-number {
            aspect-ratio: 1;
            display: flex;
            align-items: center;
            justify-content: center;
            background: white;
            border: 2px solid #ddd;
            border-radius: 8px;
            cursor: pointer;
            transition: all 0.3s ease;
            font-weight: bold;
            font-size: 0.9em;
        }

        .question-number:hover {
            transform: scale(1.1);
            border-color: #667eea;
        }

        .question-number.current {
            background: #667eea;
            color: white;
            border-color: #667eea;
        }

        .question-number.attempted {
            background: #c3cfe2;
            border-color: #764ba2;
        }

        .question-number.marked {
            background: #fff3cd;
            border-color: #ffc107;
        }

        .question-number.correct {
            background: #d4edda;
            border-color: #28a745;
        }

        .question-number.incorrect {
            background: #f8d7da;
            border-color: #dc3545;
        }

        .quiz-main {
            flex: 1;
        }

        .timer-bar {
            background: #f8f9fa;
            border-radius: 10px;
            padding: 20px;
            margin-bottom: 20px;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }

        .timer {
            font-size: 1.5em;
            font-weight: bold;
            color: #667eea;
        }

        .timer.warning {
            color: #ffc107;
            animation: pulse 1s infinite;
        }

        .timer.danger {
            color: #dc3545;
            animation: pulse 0.5s infinite;
        }

        .question-card {
            background: white;
            border: 2px solid #e9ecef;
            border-radius: 15px;
            padding: 30px;
            margin-bottom: 20px;
        }

        .question-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 20px;
            padding-bottom: 15px;
            border-bottom: 2px solid #e9ecef;
        }

        .question-number-display {
            font-size: 1.2em;
            font-weight: bold;
            color: #667eea;
        }

        .mark-review-btn {
            background: #fff3cd;
            color: #856404;
            border: 2px solid #ffc107;
            padding: 8px 16px;
            border-radius: 8px;
            cursor: pointer;
            transition: all 0.3s ease;
        }

        .mark-review-btn.marked {
            background: #ffc107;
            color: white;
        }

        .question-text {
            font-size: 1.2em;
            line-height: 1.6;
            margin-bottom: 25px;
            color: #333;
        }

        .options {
            display: flex;
            flex-direction: column;
            gap: 15px;
        }

        .option {
            background: #f8f9fa;
            border: 2px solid #e9ecef;
            border-radius: 10px;
            padding: 15px 20px;
            cursor: pointer;
            transition: all 0.3s ease;
            display: flex;
            align-items: center;
            gap: 15px;
        }

        .option:hover {
            background: #e9ecef;
            border-color: #667eea;
        }

        .option.selected {
            background: #667eea;
            color: white;
            border-color: #667eea;
        }

        .option.correct {
            background: #d4edda;
            border-color: #28a745;
            color: #155724;
        }

        .option.incorrect {
            background: #f8d7da;
            border-color: #dc3545;
            color: #721c24;
        }

        .option input[type="checkbox"] {
            width: 20px;
            height: 20px;
            cursor: pointer;
        }

        .option-label {
            flex: 1;
            cursor: pointer;
        }

        .feedback {
            margin-top: 20px;
            padding: 20px;
            border-radius: 10px;
            animation: slideIn 0.5s ease;
        }

        .feedback.correct {
            background: #d4edda;
            border: 2px solid #28a745;
            color: #155724;
        }

        .feedback.incorrect {
            background: #f8d7da;
            border: 2px solid #dc3545;
            color: #721c24;
        }

        .feedback h4 {
            margin-bottom: 10px;
            font-size: 1.2em;
        }

        .explanation {
            line-height: 1.6;
            margin-top: 10px;
        }

        .navigation-buttons {
            display: flex;
            justify-content: space-between;
            margin-top: 30px;
        }

        .nav-group {
            display: flex;
            gap: 10px;
        }

        /* Results Screen */
        .results-summary {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            border-radius: 15px;
            padding: 40px;
            text-align: center;
            margin-bottom: 30px;
        }

        .results-summary h2 {
            font-size: 2.5em;
            margin-bottom: 20px;
        }

        .score-display {
            font-size: 4em;
            font-weight: bold;
            margin: 20px 0;
        }

        .results-stats {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 20px;
            margin-bottom: 30px;
        }

        .stat-card {
            background: #f8f9fa;
            border-radius: 10px;
            padding: 20px;
            text-align: center;
        }

        .stat-card h4 {
            color: #667eea;
            margin-bottom: 10px;
        }

        .stat-card .value {
            font-size: 2em;
            font-weight: bold;
            color: #333;
        }

        .question-review {
            background: white;
            border: 2px solid #e9ecef;
            border-radius: 10px;
            padding: 20px;
            margin-bottom: 15px;
        }

        .question-review.correct {
            border-left: 5px solid #28a745;
        }

        .question-review.incorrect {
            border-left: 5px solid #dc3545;
        }

        /* History Screen */
        .history-list {
            display: flex;
            flex-direction: column;
            gap: 15px;
        }

        .history-item {
            background: #f8f9fa;
            border-radius: 10px;
            padding: 20px;
            border: 2px solid #e9ecef;
            transition: all 0.3s ease;
            cursor: pointer;
        }

        .history-item:hover {
            border-color: #667eea;
            box-shadow: 0 5px 15px rgba(102, 126, 234, 0.2);
        }

        .history-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 10px;
        }

        .history-score {
            font-size: 1.5em;
            font-weight: bold;
            color: #667eea;
        }

        .history-details {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
            gap: 10px;
            font-size: 0.9em;
            color: #666;
        }

        .empty-state {
            text-align: center;
            padding: 60px 20px;
            color: #999;
        }

        .empty-state svg {
            width: 100px;
            height: 100px;
            margin-bottom: 20px;
            opacity: 0.3;
        }

        /* Settings */
        .settings-section {
            background: #f8f9fa;
            border-radius: 10px;
            padding: 20px;
            margin-bottom: 20px;
        }

        .settings-section h3 {
            color: #667eea;
            margin-bottom: 15px;
        }

        .checkbox-option {
            display: flex;
            align-items: center;
            gap: 10px;
            margin: 15px 0;
        }

        .checkbox-option input[type="checkbox"] {
            width: 20px;
            height: 20px;
        }

        .checkbox-option label {
            cursor: pointer;
            user-select: none;
        }

        /* Modal */
        .modal {
            display: none;
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.7);
            z-index: 1000;
            align-items: center;
            justify-content: center;
        }

        .modal.active {
            display: flex;
        }

        .modal-content {
            background: white;
            border-radius: 15px;
            padding: 30px;
            max-width: 500px;
            width: 90%;
            animation: fadeIn 0.3s ease;
        }

        .modal-content h3 {
            margin-bottom: 20px;
            color: #667eea;
        }

        .modal-buttons {
            display: flex;
            gap: 10px;
            justify-content: flex-end;
            margin-top: 20px;
        }

        /* Responsive */
        @media (max-width: 768px) {
            .quiz-container {
                flex-direction: column;
            }

            .question-map-container {
                position: static;
                max-height: 300px;
                flex: 1;
            }

            .header h1 {
                font-size: 1.8em;
            }

            .quiz-modes {
                grid-template-columns: 1fr;
            }

            .results-stats {
                grid-template-columns: 1fr;
            }

            .question-map {
                grid-template-columns: repeat(auto-fill, minmax(40px, 1fr));
            }
        }

        /* Scrollbar Styling */
        ::-webkit-scrollbar {
            width: 10px;
        }

        ::-webkit-scrollbar-track {
            background: #f1f1f1;
            border-radius: 10px;
        }

        ::-webkit-scrollbar-thumb {
            background: #667eea;
            border-radius: 10px;
        }

        ::-webkit-scrollbar-thumb:hover {
            background: #764ba2;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>🎓 Immigration Quiz Practice</h1>
            <p>Master your knowledge with comprehensive practice tests</p>
        </div>

        <div class="content">
            <!-- Home Screen -->
            <div id="homeScreen" class="screen active">
                <h2 style="text-align: center; color: #667eea; margin-bottom: 30px;">Select Quiz Mode</h2>
                <div class="quiz-modes">
                    <div class="mode-card" onclick="startQuiz(10)">
                        <h3>🎯</h3>
                        <div class="questions-count">10 Questions</div>
                        <div class="time-limit">⏱️ 2 Hours</div>
                        <p style="margin-top: 10px; color: #666;">Quick Practice</p>
                    </div>
                    <div class="mode-card" onclick="startQuiz(50)">
                        <h3>📝</h3>
                        <div class="questions-count">50 Questions</div>
                        <div class="time-limit">⏱️ 2 Hours</div>
                        <p style="margin-top: 10px; color: #666;">Standard Test</p>
                    </div>
                    <div class="mode-card" onclick="startQuiz(100)">
                        <h3>📚</h3>
                        <div class="questions-count">100 Questions</div>
                        <div class="time-limit">⏱️ 2 Hours</div>
                        <p style="margin-top: 10px; color: #666;">Extended Practice</p>
                    </div>
                    <div class="mode-card" onclick="startQuiz(150)">
                        <h3>💪</h3>
                        <div class="questions-count">150 Questions</div>
                        <div class="time-limit">⏱️ 2 Hours</div>
                        <p style="margin-top: 10px; color: #666;">Challenge Mode</p>
                    </div>
                    <div class="mode-card" onclick="startQuiz(190)">
                        <h3>🏆</h3>
                        <div class="questions-count">190 Questions</div>
                        <div class="time-limit">⏱️ 4 Hours</div>
                        <p style="margin-top: 10px; color: #666;">Full Exam</p>
                    </div>
                </div>

                <div style="text-align: center; margin-top: 40px;">
                    <button class="btn btn-secondary" onclick="showHistory()">📊 Practice History</button>
                    <button class="btn" onclick="showSettings()">⚙️ Settings</button>
                </div>
            </div>

            <!-- Quiz Screen -->
            <div id="quizScreen" class="screen">
                <div class="quiz-container">
                    <div class="question-map-container">
                        <h3>Question Map</h3>
                        <div id="questionMap" class="question-map"></div>
                        <div style="margin-top: 20px; font-size: 0.85em; color: #666;">
                            <div style="display: flex; align-items: center; gap: 8px; margin: 5px 0;">
                                <div style="width: 20px; height: 20px; background: #667eea; border-radius: 4px;"></div>
                                <span>Current</span>
                            </div>
                            <div style="display: flex; align-items: center; gap: 8px; margin: 5px 0;">
                                <div style="width: 20px; height: 20px; background: #c3cfe2; border-radius: 4px;"></div>
                                <span>Attempted</span>
                            </div>
                            <div style="display: flex; align-items: center; gap: 8px; margin: 5px 0;">
                                <div style="width: 20px; height: 20px; background: #fff3cd; border: 2px solid #ffc107; border-radius: 4px;"></div>
                                <span>Marked</span>
                            </div>
                        </div>
                    </div>

                    <div class="quiz-main">
                        <div class="timer-bar">
                            <div>
                                <strong>Time Remaining:</strong>
                                <span id="timer" class="timer">00:00:00</span>
                            </div>
                            <div>
                                <span id="progressText" style="color: #666;"></span>
                            </div>
                        </div>

                        <div id="questionCard" class="question-card"></div>

                        <div class="navigation-buttons">
                            <div class="nav-group">
                                <button class="btn btn-secondary" onclick="previousQuestion()">⬅️ Previous</button>
                            </div>
                            <div class="nav-group">
                                <button class="btn" onclick="nextQuestion()">Next ➡️</button>
                                <button class="btn btn-success" onclick="submitQuiz()">✅ Submit Quiz</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Results Screen -->
            <div id="resultsScreen" class="screen"></div>

            <!-- History Screen -->
            <div id="historyScreen" class="screen">
                <h2 style="color: #667eea; margin-bottom: 30px;">Practice History</h2>
                <div id="historyList" class="history-list"></div>
                <div style="text-align: center; margin-top: 30px;">
                    <button class="btn" onclick="showHome()">🏠 Back to Home</button>
                </div>
            </div>

            <!-- Settings Screen -->
            <div id="settingsScreen" class="screen">
                <h2 style="color: #667eea; margin-bottom: 30px;">Settings</h2>
                
                <div class="settings-section">
                    <h3>Quiz Preferences</h3>
                    <div class="checkbox-option">
                        <input type="checkbox" id="immediateFeedback" checked>
                        <label for="immediateFeedback">Enable immediate feedback after each question</label>
                    </div>
                </div>

                <div class="settings-section">
                    <h3>Data Management</h3>
                    <p style="margin-bottom: 15px; color: #666;">Clear all saved quiz history and settings.</p>
                    <button class="btn btn-secondary" onclick="confirmClearHistory()">🗑️ Clear All History</button>
                </div>

                <div style="text-align: center; margin-top: 30px;">
                    <button class="btn" onclick="showHome()">🏠 Back to Home</button>
                </div>
            </div>
        </div>
    </div>

    <!-- Confirmation Modal -->
    <div id="confirmModal" class="modal">
        <div class="modal-content">
            <h3>⚠️ Confirm Action</h3>
            <p id="confirmMessage"></p>
            <div class="modal-buttons">
                <button class="btn btn-secondary" onclick="closeModal()">Cancel</button>
                <button class="btn" id="confirmButton">Confirm</button>
            </div>
        </div>
    </div>

    <script>
        // Embedded Questions Data
        const QUESTIONS_DATA = ${questionsData};

        // Quiz State
        let currentQuiz = {
            mode: 0,
            questions: [],
            currentQuestionIndex: 0,
            answers: {},
            markedForReview: new Set(),
            startTime: null,
            endTime: null,
            timerInterval: null,
            timeLimit: 0,
            immediateFeedback: true
        };

        // Initialize
        function init() {
            loadSettings();
            showHome();
        }

        // Screen Navigation
        function showScreen(screenId) {
            document.querySelectorAll('.screen').forEach(screen => {
                screen.classList.remove('active');
            });
            document.getElementById(screenId).classList.add('active');
        }

        function showHome() {
            showScreen('homeScreen');
            if (currentQuiz.timerInterval) {
                clearInterval(currentQuiz.timerInterval);
            }
        }

        function showHistory() {
            renderHistory();
            showScreen('historyScreen');
        }

        function showSettings() {
            document.getElementById('immediateFeedback').checked = currentQuiz.immediateFeedback;
            showScreen('settingsScreen');
        }

        // Settings
        function loadSettings() {
            const settings = JSON.parse(localStorage.getItem('quizSettings') || '{}');
            currentQuiz.immediateFeedback = settings.immediateFeedback !== false;
        }

        function saveSettings() {
            const settings = {
                immediateFeedback: document.getElementById('immediateFeedback').checked
            };
            localStorage.setItem('quizSettings', JSON.stringify(settings));
            currentQuiz.immediateFeedback = settings.immediateFeedback;
        }

        document.getElementById('immediateFeedback')?.addEventListener('change', saveSettings);

        // Start Quiz
        function startQuiz(questionCount) {
            currentQuiz = {
                mode: questionCount,
                questions: selectRandomQuestions(questionCount),
                currentQuestionIndex: 0,
                answers: {},
                markedForReview: new Set(),
                startTime: Date.now(),
                endTime: null,
                timerInterval: null,
                timeLimit: questionCount === 190 ? 240 * 60 * 1000 : 120 * 60 * 1000,
                immediateFeedback: document.getElementById('immediateFeedback')?.checked !== false
            };

            renderQuestionMap();
            renderQuestion();
            startTimer();
            showScreen('quizScreen');
        }

        function selectRandomQuestions(count) {
            const shuffled = [...QUESTIONS_DATA].sort(() => Math.random() - 0.5);
            return shuffled.slice(0, Math.min(count, QUESTIONS_DATA.length));
        }

        // Question Map
        function renderQuestionMap() {
            const map = document.getElementById('questionMap');
            map.innerHTML = '';
            
            currentQuiz.questions.forEach((q, index) => {
                const btn = document.createElement('div');
                btn.className = 'question-number';
                btn.textContent = index + 1;
                btn.onclick = () => goToQuestion(index);
                
                if (index === currentQuiz.currentQuestionIndex) {
                    btn.classList.add('current');
                } else if (currentQuiz.markedForReview.has(index)) {
                    btn.classList.add('marked');
                } else if (currentQuiz.answers[index] !== undefined) {
                    btn.classList.add('attempted');
                }
                
                map.appendChild(btn);
            });
        }

        function goToQuestion(index) {
            currentQuiz.currentQuestionIndex = index;
            renderQuestion();
            renderQuestionMap();
        }

        // Timer
        function startTimer() {
            updateTimer();
            currentQuiz.timerInterval = setInterval(updateTimer, 1000);
        }

        function updateTimer() {
            const elapsed = Date.now() - currentQuiz.startTime;
            const remaining = Math.max(0, currentQuiz.timeLimit - elapsed);
            
            if (remaining === 0) {
                autoSubmitQuiz();
                return;
            }
            
            const hours = Math.floor(remaining / (60 * 60 * 1000));
            const minutes = Math.floor((remaining % (60 * 60 * 1000)) / (60 * 1000));
            const seconds = Math.floor((remaining % (60 * 1000)) / 1000);
            
            const timerElement = document.getElementById('timer');
            timerElement.textContent = \`\${String(hours).padStart(2, '0')}:\${String(minutes).padStart(2, '0')}:\${String(seconds).padStart(2, '0')}\`;
            
            // Update timer styling based on remaining time
            timerElement.classList.remove('warning', 'danger');
            if (remaining < 5 * 60 * 1000) {
                timerElement.classList.add('danger');
            } else if (remaining < 15 * 60 * 1000) {
                timerElement.classList.add('warning');
            }
            
            // Update progress
            const answered = Object.keys(currentQuiz.answers).length;
            document.getElementById('progressText').textContent = \`\${answered} / \${currentQuiz.questions.length} answered\`;
        }

        function autoSubmitQuiz() {
            clearInterval(currentQuiz.timerInterval);
            alert('⏰ Time\'s up! Your quiz will be submitted automatically.');
            submitQuiz();
        }

        // Render Question
        function renderQuestion() {
            const question = currentQuiz.questions[currentQuiz.currentQuestionIndex];
            const card = document.getElementById('questionCard');
            
            const isMultipleChoice = question.correct.includes(',');
            const userAnswer = currentQuiz.answers[currentQuiz.currentQuestionIndex];
            const isMarked = currentQuiz.markedForReview.has(currentQuiz.currentQuestionIndex);
            
            let html = \`
                <div class="question-header">
                    <div class="question-number-display">
                        Question \${currentQuiz.currentQuestionIndex + 1} of \${currentQuiz.questions.length}
                    </div>
                    <button class="mark-review-btn \${isMarked ? 'marked' : ''}" onclick="toggleMarkForReview()">
                        \${isMarked ? '⭐ Marked for Review' : '☆ Mark for Review'}
                    </button>
                </div>
                
                <div class="question-text">
                    \${question.text}
                    \${isMultipleChoice ? '<div style="font-size: 0.9em; color: #666; margin-top: 10px;"><em>(Select all that apply)</em></div>' : ''}
                </div>
                
                <div class="options">
            \`;
            
            for (const [key, value] of Object.entries(question.options)) {
                const isSelected = isMultipleChoice 
                    ? (userAnswer || []).includes(key)
                    : userAnswer === key;
                
                if (isMultipleChoice) {
                    html += \`
                        <div class="option \${isSelected ? 'selected' : ''}" onclick="toggleMultipleChoice('\${key}')">
                            <input type="checkbox" \${isSelected ? 'checked' : ''} onchange="toggleMultipleChoice('\${key}')">
                            <div class="option-label">
                                <strong>\${key.toUpperCase()}.</strong> \${value}
                            </div>
                        </div>
                    \`;
                } else {
                    html += \`
                        <div class="option \${isSelected ? 'selected' : ''}" onclick="selectSingleChoice('\${key}')">
                            <div class="option-label">
                                <strong>\${key.toUpperCase()}.</strong> \${value}
                            </div>
                        </div>
                    \`;
                }
            }
            
            html += '</div>';
            
            // Show feedback if immediate feedback is enabled and question is answered
            if (currentQuiz.immediateFeedback && userAnswer !== undefined) {
                const correctAnswers = question.correct.split(',').map(a => a.trim());
                const isCorrect = isMultipleChoice
                    ? arraysEqual(userAnswer?.sort() || [], correctAnswers.sort())
                    : correctAnswers.includes(userAnswer);
                
                html += \`
                    <div class="feedback \${isCorrect ? 'correct' : 'incorrect'}">
                        <h4>\${isCorrect ? '✅ Correct!' : '❌ Incorrect'}</h4>
                        <div><strong>Correct Answer(s):</strong> \${correctAnswers.map(a => a.toUpperCase()).join(', ')}</div>
                        \${question.explanation ? \`<div class="explanation"><strong>Explanation:</strong> \${question.explanation}</div>\` : ''}
                    </div>
                \`;
            }
            
            card.innerHTML = html;
        }

        function selectSingleChoice(option) {
            currentQuiz.answers[currentQuiz.currentQuestionIndex] = option;
            renderQuestion();
            renderQuestionMap();
        }

        function toggleMultipleChoice(option) {
            const current = currentQuiz.answers[currentQuiz.currentQuestionIndex] || [];
            const index = current.indexOf(option);
            
            if (index > -1) {
                current.splice(index, 1);
            } else {
                current.push(option);
            }
            
            currentQuiz.answers[currentQuiz.currentQuestionIndex] = current.length > 0 ? current : undefined;
            renderQuestion();
            renderQuestionMap();
        }

        function toggleMarkForReview() {
            const index = currentQuiz.currentQuestionIndex;
            if (currentQuiz.markedForReview.has(index)) {
                currentQuiz.markedForReview.delete(index);
            } else {
                currentQuiz.markedForReview.add(index);
            }
            renderQuestion();
            renderQuestionMap();
        }

        // Navigation
        function previousQuestion() {
            if (currentQuiz.currentQuestionIndex > 0) {
                currentQuiz.currentQuestionIndex--;
                renderQuestion();
                renderQuestionMap();
            }
        }

        function nextQuestion() {
            if (currentQuiz.currentQuestionIndex < currentQuiz.questions.length - 1) {
                currentQuiz.currentQuestionIndex++;
                renderQuestion();
                renderQuestionMap();
            }
        }

        // Submit Quiz
        function submitQuiz() {
            const unanswered = currentQuiz.questions.length - Object.keys(currentQuiz.answers).length;
            
            if (unanswered > 0) {
                showConfirmModal(
                    \`You have \${unanswered} unanswered question(s). Are you sure you want to submit?\`,
                    () => {
                        closeModal();
                        finishQuiz();
                    }
                );
            } else {
                finishQuiz();
            }
        }

        function finishQuiz() {
            clearInterval(currentQuiz.timerInterval);
            currentQuiz.endTime = Date.now();
            
            const results = calculateResults();
            saveToHistory(results);
            renderResults(results);
            showScreen('resultsScreen');
        }

        function calculateResults() {
            let correct = 0;
            const questionResults = [];
            
            currentQuiz.questions.forEach((question, index) => {
                const userAnswer = currentQuiz.answers[index];
                const correctAnswers = question.correct.split(',').map(a => a.trim());
                const isMultipleChoice = correctAnswers.length > 1;
                
                const isCorrect = isMultipleChoice
                    ? arraysEqual((userAnswer || []).sort(), correctAnswers.sort())
                    : correctAnswers.includes(userAnswer);
                
                if (isCorrect) correct++;
                
                questionResults.push({
                    question: question,
                    userAnswer: userAnswer,
                    correctAnswers: correctAnswers,
                    isCorrect: isCorrect
                });
            });
            
            const timeSpent = currentQuiz.endTime - currentQuiz.startTime;
            const percentage = Math.round((correct / currentQuiz.questions.length) * 100);
            
            return {
                mode: currentQuiz.mode,
                totalQuestions: currentQuiz.questions.length,
                correctAnswers: correct,
                incorrectAnswers: currentQuiz.questions.length - correct,
                percentage: percentage,
                timeSpent: timeSpent,
                date: new Date().toISOString(),
                questionResults: questionResults
            };
        }

        function renderResults(results) {
            const container = document.getElementById('resultsScreen');
            
            const hours = Math.floor(results.timeSpent / (60 * 60 * 1000));
            const minutes = Math.floor((results.timeSpent % (60 * 60 * 1000)) / (60 * 1000));
            const seconds = Math.floor((results.timeSpent % (60 * 1000)) / 1000);
            const timeText = \`\${hours}h \${minutes}m \${seconds}s\`;
            
            let html = \`
                <div class="results-summary">
                    <h2>Quiz Complete! 🎉</h2>
                    <div class="score-display">\${results.percentage}%</div>
                    <p style="font-size: 1.2em;">\${results.correctAnswers} out of \${results.totalQuestions} correct</p>
                </div>
                
                <div class="results-stats">
                    <div class="stat-card">
                        <h4>Questions</h4>
                        <div class="value">\${results.totalQuestions}</div>
                    </div>
                    <div class="stat-card">
                        <h4>Correct</h4>
                        <div class="value" style="color: #28a745;">\${results.correctAnswers}</div>
                    </div>
                    <div class="stat-card">
                        <h4>Incorrect</h4>
                        <div class="value" style="color: #dc3545;">\${results.incorrectAnswers}</div>
                    </div>
                    <div class="stat-card">
                        <h4>Time Spent</h4>
                        <div class="value" style="font-size: 1.2em;">\${timeText}</div>
                    </div>
                </div>
                
                <h3 style="margin: 30px 0 20px; color: #667eea;">Question Review</h3>
            \`;
            
            results.questionResults.forEach((result, index) => {
                const question = result.question;
                const userAnswerText = result.userAnswer 
                    ? (Array.isArray(result.userAnswer) 
                        ? result.userAnswer.map(a => \`\${a.toUpperCase()}: \${question.options[a]}\`).join(', ')
                        : \`\${result.userAnswer.toUpperCase()}: \${question.options[result.userAnswer]}\`)
                    : 'Not answered';
                
                const correctAnswerText = result.correctAnswers
                    .map(a => \`\${a.toUpperCase()}: \${question.options[a]}\`)
                    .join(', ');
                
                html += \`
                    <div class="question-review \${result.isCorrect ? 'correct' : 'incorrect'}">
                        <div style="display: flex; justify-content: space-between; margin-bottom: 15px;">
                            <strong>Question \${index + 1}</strong>
                            <span style="color: \${result.isCorrect ? '#28a745' : '#dc3545'}; font-weight: bold;">
                                \${result.isCorrect ? '✅ Correct' : '❌ Incorrect'}
                            </span>
                        </div>
                        <div style="margin-bottom: 15px;">\${question.text}</div>
                        <div style="background: #f8f9fa; padding: 15px; border-radius: 8px; margin-bottom: 10px;">
                            <strong>Your Answer:</strong> \${userAnswerText}
                        </div>
                        <div style="background: #d4edda; padding: 15px; border-radius: 8px; margin-bottom: 10px;">
                            <strong>Correct Answer:</strong> \${correctAnswerText}
                        </div>
                        \${question.explanation ? \`
                            <div style="background: #e7f3ff; padding: 15px; border-radius: 8px;">
                                <strong>Explanation:</strong> \${question.explanation}
                            </div>
                        \` : ''}
                    </div>
                \`;
            });
            
            html += \`
                <div style="text-align: center; margin-top: 30px;">
                    <button class="btn" onclick="showHome()">🏠 Back to Home</button>
                    <button class="btn btn-secondary" onclick="startQuiz(\${results.mode})">🔄 Retry Same Mode</button>
                </div>
            \`;
            
            container.innerHTML = html;
        }

        // History
        function saveToHistory(results) {
            const history = JSON.parse(localStorage.getItem('quizHistory') || '[]');
            history.unshift({
                ...results,
                id: Date.now()
            });
            localStorage.setItem('quizHistory', JSON.stringify(history));
        }

        function renderHistory() {
            const history = JSON.parse(localStorage.getItem('quizHistory') || '[]');
            const container = document.getElementById('historyList');
            
            if (history.length === 0) {
                container.innerHTML = \`
                    <div class="empty-state">
                        <svg fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z"></path>
                            <path fill-rule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3z" clip-rule="evenodd"></path>
                        </svg>
                        <h3>No Practice History</h3>
                        <p>Start a quiz to build your practice history</p>
                    </div>
                \`;
                return;
            }
            
            let html = '';
            history.forEach(item => {
                const date = new Date(item.date);
                const hours = Math.floor(item.timeSpent / (60 * 60 * 1000));
                const minutes = Math.floor((item.timeSpent % (60 * 60 * 1000)) / (60 * 1000));
                const timeText = \`\${hours}h \${minutes}m\`;
                
                html += \`
                    <div class="history-item" onclick="viewHistoryDetails(\${item.id})">
                        <div class="history-header">
                            <div>
                                <strong>\${item.mode} Questions Quiz</strong>
                                <div style="font-size: 0.9em; color: #666;">\${date.toLocaleDateString()} at \${date.toLocaleTimeString()}</div>
                            </div>
                            <div class="history-score">\${item.percentage}%</div>
                        </div>
                        <div class="history-details">
                            <div>✅ Correct: \${item.correctAnswers}</div>
                            <div>❌ Incorrect: \${item.incorrectAnswers}</div>
                            <div>⏱️ Time: \${timeText}</div>
                            <div>📊 Score: \${item.correctAnswers}/\${item.totalQuestions}</div>
                        </div>
                    </div>
                \`;
            });
            
            container.innerHTML = html;
        }

        function viewHistoryDetails(id) {
            const history = JSON.parse(localStorage.getItem('quizHistory') || '[]');
            const item = history.find(h => h.id === id);
            if (item) {
                renderResults(item);
                showScreen('resultsScreen');
            }
        }

        function confirmClearHistory() {
            showConfirmModal(
                'Are you sure you want to clear all practice history? This action cannot be undone.',
                () => {
                    localStorage.removeItem('quizHistory');
                    closeModal();
                    renderHistory();
                    alert('✅ History cleared successfully!');
                }
            );
        }

        // Modal
        function showConfirmModal(message, onConfirm) {
            document.getElementById('confirmMessage').textContent = message;
            document.getElementById('confirmButton').onclick = onConfirm;
            document.getElementById('confirmModal').classList.add('active');
        }

        function closeModal() {
            document.getElementById('confirmModal').classList.remove('active');
        }

        // Utility
        function arraysEqual(a, b) {
            if (a.length !== b.length) return false;
            for (let i = 0; i < a.length; i++) {
                if (a[i] !== b[i]) return false;
            }
            return true;
        }

        // Initialize on load
        init();
    </script>
</body>
</html>`;

// Write the HTML file
fs.writeFileSync('/home/ubuntu/quiz_app/quiz.html', htmlContent, 'utf8');
console.log('Quiz HTML file created successfully!');
