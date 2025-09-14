// Quiz App Main Script
class QuizApp {
    constructor() {
        this.questions = [];
        this.currentQuestion = 0;
        this.score = 0;
        this.timeLeft = 15;
        this.timerInterval = null;
        this.selectedAnswer = null;
        this.quizStartTime = null;
        this.highScores = JSON.parse(localStorage.getItem('quizHighScores')) || [];
        
        // DOM Elements
        this.elements = {
            questionEl: document.getElementById('question'),
            optionsEl: document.getElementById('options'),
            timerEl: document.getElementById('time'),
            progressBar: document.getElementById('progressBar'),
            currentQEl: document.getElementById('currentQ'),
            totalQEl: document.getElementById('totalQ'),
            nextBtn: document.getElementById('nextBtn'),
            questionSection: document.getElementById('questionSection'),
            resultSection: document.getElementById('resultSection'),
            highScoresSection: document.getElementById('highScoresSection'),
            finalScoreEl: document.getElementById('finalScore'),
            totalQuestionsEl: document.getElementById('totalQuestions'),
            scoreMessageEl: document.getElementById('scoreMessage'),
            scoresListEl: document.getElementById('scoresList')
        };
        
        this.init();
    }
    
    async init() {
        try {
            await this.loadQuestions();
            this.shuffleQuestions();
            this.setupEventListeners();
            this.loadQuestion();
            this.quizStartTime = Date.now();
        } catch (error) {
            console.error('Failed to initialize quiz:', error);
            this.showError('Failed to load quiz questions. Please refresh the page.');
        }
    }
    
    async loadQuestions() {
        // Default questions if external file fails to load
        const defaultQuestions = [
            {
                question: "Which of the following is used to define a function in Python?",
                options: ["func" , "function" , "define" , "def"],
                answer: "def"
            },
            {
                question: "Which of the following is a correct way to declare a constant in JavaScript?",
                options: ["var PI = 3.14" , "let PI = 3.14" , "const PI = 3.14" , "constant PI = 3.14"],
                answer: "const PI = 3.14"
            },
            {
                question: "Which keyword is used to inherit a class in Java?",
                options: ["extends" , "implements" , "inherits" , "super"],
                answer: "extends"
            },
            {
                question: "What does HTML stand for?",
                options: ["HyperText Markdown Language" , "HyperText Markup Language" , "HyperText Module Language" , "HighText Markup Language"],
                answer: "HyperText Markup Language"
            },
            {
                question: "What does CSS stand for?",
                options: ["Computer Style Sheets", "Creative Style Sheets", "Cascading Style Sheets", "Colorful Style Sheets"],
                answer: "Cascading Style Sheets"
            },
            {
                question: "Which property is used to change the text color of an element in CSS?",
                options: ["font-color" , "ext-color" , "color" , "text-style"],
                answer: "color"
            },
            {
                question: "Which data type is immutable in Python?",
                options: ["list" , "dict" , "set" , "tuple"],
                answer: "tuple"
            },
            {
                question: "Which SQL keyword is used to retrieve data from a database?",
                options: ["GET" , "SELECT" , "FETCH" , "EXTRACT"],
                answer: "SELECT"
            },
            {
                question: "What is the default value of a boolean variable in Java?",
                options: ["true" , "false" , "null" , "Not defined"],
                answer: "false"
            },
            {
                question: "Which company developed JavaScript?",
                options: ["Microsoft", "Netscape", "Google", "Mozilla"],
                answer: "Netscape"
            }
        ];
        
        try {
            // Try to load questions from external file
            const response = await fetch('questions.json');
            if (response.ok) {
                const data = await response.json();
                this.questions = data.questions || defaultQuestions;
            } else {
                throw new Error('Failed to fetch questions');
            }
        } catch (error) {
            console.log('Using default questions');
            this.questions = defaultQuestions;
        }
        
        this.elements.totalQEl.textContent = this.questions.length;
        this.elements.totalQuestionsEl.textContent = this.questions.length;
    }
    
    shuffleQuestions() {
        // Shuffle questions array
        for (let i = this.questions.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [this.questions[i], this.questions[j]] = [this.questions[j], this.questions[i]];
        }
        
        // Shuffle options for each question
        this.questions.forEach(question => {
            const correctAnswer = question.answer;
            const shuffledOptions = [...question.options].sort(() => Math.random() - 0.5);
            question.options = shuffledOptions;
            question.answer = correctAnswer; // Keep the correct answer reference
        });
    }
    
    setupEventListeners() {
        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (e.key >= '1' && e.key <= '4') {
                const optionIndex = parseInt(e.key) - 1;
                const options = document.querySelectorAll('.option');
                if (options[optionIndex]) {
                    this.selectAnswer(options[optionIndex], options[optionIndex].textContent);
                }
            } else if (e.key === 'Enter' && this.elements.nextBtn.classList.contains('active')) {
                this.nextQuestion();
            }
        });
    }
    
    loadQuestion() {
        if (this.currentQuestion >= this.questions.length) {
            this.endQuiz();
            return;
        }
        
        // Reset timer
        clearInterval(this.timerInterval);
        this.timeLeft = 15;
        this.selectedAnswer = null;
        this.elements.nextBtn.classList.remove('active');
        
        // Update UI
        const question = this.questions[this.currentQuestion];
        this.elements.questionEl.textContent = question.question;
        this.elements.currentQEl.textContent = this.currentQuestion + 1;
        
        // Update progress bar
        const progress = ((this.currentQuestion) / this.questions.length) * 100;
        this.elements.progressBar.style.width = `${progress}%`;
        
        // Clear previous options
        this.elements.optionsEl.innerHTML = '';
        
        // Create option buttons
        question.options.forEach((option, index) => {
            const button = document.createElement('button');
            button.classList.add('option');
            button.textContent = option;
            button.onclick = () => this.selectAnswer(button, option);
            
            // Add keyboard shortcut hint
            const shortcut = document.createElement('span');
            shortcut.style.cssText = 'position: absolute; top: 8px; right: 12px; font-size: 0.8rem; opacity: 0.6;';
            shortcut.textContent = `${index + 1}`;
            button.style.position = 'relative';
            button.appendChild(shortcut);
            
            this.elements.optionsEl.appendChild(button);
        });
        
        // Start timer
        this.startTimer();
        
        // Add animation
        this.elements.questionSection.classList.add('fade-in');
        setTimeout(() => this.elements.questionSection.classList.remove('fade-in'), 500);
    }
    
    selectAnswer(buttonEl, answer) {
        // Remove previous selection
        document.querySelectorAll('.option').forEach(btn => {
            btn.classList.remove('selected');
        });
        
        // Select current answer
        buttonEl.classList.add('selected');
        this.selectedAnswer = answer;
        this.elements.nextBtn.classList.add('active');
        
        // Auto-advance after 1 second (optional)
        // setTimeout(() => this.nextQuestion(), 1000);
    }
    
    nextQuestion() {
        if (!this.selectedAnswer) return;
        
        // Check answer
        const correct = this.selectedAnswer === this.questions[this.currentQuestion].answer;
        if (correct) {
            this.score++;
        }
        
        // Show correct/incorrect feedback
        this.showAnswerFeedback(correct);
        
        // Move to next question after feedback
        setTimeout(() => {
            this.currentQuestion++;
            this.loadQuestion();
        }, 1500);
    }
    
    showAnswerFeedback(isCorrect) {
        const options = document.querySelectorAll('.option');
        const correctAnswer = this.questions[this.currentQuestion].answer;
        
        options.forEach(option => {
            const optionText = option.textContent.replace(/[1-4]$/, '').trim();
            if (optionText === correctAnswer) {
                option.classList.add('correct');
            } else if (option.classList.contains('selected') && !isCorrect) {
                option.classList.add('incorrect');
            }
            option.style.pointerEvents = 'none';
        });
        
        this.elements.nextBtn.classList.remove('active');
        clearInterval(this.timerInterval);
    }
    
    startTimer() {
        this.elements.timerEl.textContent = this.timeLeft;
        
        this.timerInterval = setInterval(() => {
            this.timeLeft--;
            this.elements.timerEl.textContent = this.timeLeft;
            
            // Change timer color when running out of time
            if (this.timeLeft <= 5) {
                this.elements.timerEl.parentElement.style.background = 'rgba(239, 68, 68, 0.2)';
                this.elements.timerEl.parentElement.style.color = '#ef4444';
            }
            
            if (this.timeLeft <= 0) {
                clearInterval(this.timerInterval);
                if (!this.selectedAnswer) {
                    this.nextQuestion(); // Auto-advance if no answer selected
                }
            }
        }, 1000);
    }
    
    endQuiz() {
        clearInterval(this.timerInterval);
        
        // Calculate final score percentage
        const percentage = Math.round((this.score / this.questions.length) * 100);
        const timeTaken = Math.round((Date.now() - this.quizStartTime) / 1000);
        
        // Update progress bar to 100%
        this.elements.progressBar.style.width = '100%';
        
        // Save high score
        this.saveHighScore(percentage, timeTaken);
        
        // Show results
        this.showResults(percentage);
    }
    
    showResults(percentage) {
        this.elements.questionSection.style.display = 'none';
        this.elements.resultSection.style.display = 'block';
        this.elements.highScoresSection.style.display = 'none';
        
        this.elements.finalScoreEl.textContent = this.score;
        
        // Set score message based on performance
        let message = '';
        if (percentage >= 90) {
            message = '🎉 Excellent! You\'re a quiz master!';
        } else if (percentage >= 70) {
            message = '👏 Great job! Well done!';
        } else if (percentage >= 50) {
            message = '👍 Good effort! Keep learning!';
        } else {
            message = '📖 Keep studying and try again!';
        }
        
        this.elements.scoreMessageEl.textContent = message;
        
        // Add animation
        this.elements.resultSection.classList.add('slide-in');
        setTimeout(() => this.elements.resultSection.classList.remove('slide-in'), 500);
    }
    
    saveHighScore(percentage, timeTaken) {
        const score = {
            score: this.score,
            total: this.questions.length,
            percentage: percentage,
            time: timeTaken,
            date: new Date().toLocaleDateString()
        };
        
        this.highScores.push(score);
        this.highScores.sort((a, b) => {
            if (b.percentage !== a.percentage) {
                return b.percentage - a.percentage;
            }
            return a.time - b.time; // If same percentage, prefer faster time
        });
        
        // Keep only top 10 scores
        this.highScores = this.highScores.slice(0, 10);
        
        localStorage.setItem('quizHighScores', JSON.stringify(this.highScores));
    }
    
    showHighScores() {
        this.elements.resultSection.style.display = 'none';
        this.elements.highScoresSection.style.display = 'block';
        
        if (this.highScores.length === 0) {
            this.elements.scoresListEl.innerHTML = '<p style="text-align: center; color: var(--text-light);">No high scores yet!</p>';
            return;
        }
        
       let scoresHTML = '';
this.highScores.forEach((score, index) => {
    const medal = index === 0 ? '#1' : index === 1 ? '#2' : index === 2 ? '#3' : `#${index + 1}`;
    scoresHTML += `
        <div class="score-item">
            <div>
                <span class="score-rank">${medal}</span>
                <span style="margin-left: 12px;">${score.date}</span>
            </div>
            <div>
                <strong>${score.score}/${score.total}</strong>
                <span style="margin-left: 8px; color: var(--text-light);">(${score.percentage}%)</span>
                <span style="margin-left: 8px; font-size: 0.9rem;">${score.time}s</span>
            </div>
        </div>
    `;
});


        
        this.elements.scoresListEl.innerHTML = scoresHTML;
    }
    
    restartQuiz() {
        // Reset all variables
        this.currentQuestion = 0;
        this.score = 0;
        this.timeLeft = 15;
        this.selectedAnswer = null;
        this.quizStartTime = Date.now();
        
        // Reset timer style
        const timerParent = this.elements.timerEl.parentElement;
        timerParent.style.background = 'rgba(255, 255, 255, 0.2)';
        timerParent.style.color = 'inherit';
        
        // Shuffle questions again
        this.shuffleQuestions();
        
        // Show question section
        this.elements.questionSection.style.display = 'block';
        this.elements.resultSection.style.display = 'none';
        this.elements.highScoresSection.style.display = 'none';
        
        // Load first question
        this.loadQuestion();
    }
    
    showError(message) {
        this.elements.questionEl.textContent = message;
        this.elements.optionsEl.innerHTML = '<button class="option" onclick="location.reload()">ðŸ”„ Reload Page</button>';
    }
}

// Theme functionality
function toggleTheme() {
    const body = document.body;
    const themeToggle = document.getElementById('themeToggle');
    
    if (body.getAttribute('data-theme') === 'dark') {
        body.removeAttribute('data-theme');
        themeToggle.textContent = '☀️';
        localStorage.setItem('theme', 'light');
    } else {
        body.setAttribute('data-theme', 'dark');
        themeToggle.textContent = '🌙';
        localStorage.setItem('theme', 'dark');
    }
}

// Global functions for HTML onclick handlers
function nextQuestion() {
    if (window.quiz) {
        window.quiz.nextQuestion();
    }
}

function restartQuiz() {
    if (window.quiz) {
        window.quiz.restartQuiz();
    }
}

function showHighScores() {
    if (window.quiz) {
        window.quiz.showHighScores();
    }
}

function showResults() {
    if (window.quiz) {
        window.quiz.showResults(Math.round((window.quiz.score / window.quiz.questions.length) * 100));
    }
}

// Initialize app when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Load saved theme
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.body.setAttribute('data-theme', 'dark');
        document.getElementById('themeToggle').textContent = '☀️';
    }
    
    // Initialize quiz
    window.quiz = new QuizApp();
});