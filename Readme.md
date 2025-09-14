#Interactive Quiz App

*Google Developer Club Tech Department Assignment*  
Submitted by: Khushi Gupta  
Newton School of Technology - Computer Science

## Project Overview

A modern, interactive quiz application built with vanilla HTML, CSS, and JavaScript. This project demonstrates proficiency in frontend development, responsive design, and modern web technologies while delivering an engaging user experience.

*Live Demo:* [Your Deployed URL Here]  
*GitHub Repository:* [Your GitHub Repo URL Here]

## Features Implemented

### Core Requirements âœ…
•⁠  ⁠*10 Multiple-Choice Questions* loaded from JSON file
•⁠  ⁠*15-Second Timer* per question with visual countdown
•⁠  ⁠*Score Tracking* with comprehensive final results
•⁠  ⁠*Responsive Design* optimized for all devices
•⁠  ⁠*Clean User Interface* with modern design principles

### ­ Bonus Features Implemented
•⁠  ⁠* High Scores System* with localStorage persistence
•⁠  ⁠* Question Shuffling* for unique quiz experience each time  
•⁠  ⁠* Progress Bar* showing real-time completion status
•⁠  ⁠* Dark/Light Theme Toggle* for user preference
•⁠  ⁠* Keyboard Navigation* (1-4 keys for options, Enter for next)
•⁠  ⁠* Smooth Animations* and transitions throughout
•⁠  ⁠* Mobile-First Design* with touch-friendly interface
•⁠  ⁠* Performance Tracking* including completion time
•⁠  ⁠* Dynamic Feedback* with motivational messages

##  Technologies Used

•⁠  ⁠*HTML5* - Semantic markup and accessibility
•⁠  ⁠*CSS3* - Modern styling with CSS Variables, Grid, and Flexbox
•⁠  ⁠*JavaScript ES6+* - Object-oriented programming with classes
•⁠  ⁠*localStorage API* - Client-side data persistence
•⁠  ⁠*JSON* - Dynamic question loading
•⁠  ⁠*Responsive Design* - Mobile-first approach

## Getting Started

### Prerequisites
•⁠  ⁠Modern web browser (Chrome, Firefox, Safari, Edge)
•⁠  ⁠No additional dependencies required!

### Installation & Setup
1.⁠ ⁠*Clone the repository*
   ⁠ bash
   git clone [your-repo-url]
   cd quiz-app
    ⁠

2.⁠ ⁠*Open locally*
   ⁠ bash
   # Simple method - open in browser
   open index.html
   
   # Or serve with local server (recommended)
   python -m http.server 8000
   # Visit: http://localhost:8000
    ⁠

3.⁠ ⁠*Start quizzing!* 

##  Project Structure


quiz-app/
 index.html          # Main HTML structure
 style.css           # Styling and responsive design  
 script.js           # Quiz logic and functionality
 questions.json      # Question database (optional)
 README.md          # Project documentation
 screenshots/       # Demo images (optional)


##  How to Use

1.⁠ ⁠*Start Quiz* - Click any option to begin
2.⁠ ⁠*Navigate* - Use mouse clicks or keyboard (1-4 keys)
3.⁠ ⁠*Timer* - Answer within 15 seconds or auto-advance
4.⁠ ⁠*Progress* - Watch the progress bar fill up
5.⁠ ⁠*Results* - View comprehensive score breakdown
6.⁠ ⁠*High Scores* - Check leaderboard and beat your best
7.⁠ ⁠*Themes* - Toggle between light and dark modes

## Code Highlights

### Object-Oriented Architecture
⁠ javascript
class QuizApp {
    constructor() {
        this.questions = [];
        this.currentQuestion = 0;
        this.score = 0;
        // Clean, maintainable code structure
    }
}
 ⁠

### Responsive Design with CSS Variables
⁠ css
:root {
    --primary-color: #6366f1;
    --secondary-color: #8b5cf6;
    /* Theme-aware design system */
}
 ⁠

### localStorage Integration
⁠ javascript
saveHighScore(percentage, timeTaken) {
    // Persistent data without backend
    localStorage.setItem('quizHighScores', JSON.stringify(this.highScores));
}
 ⁠

## Key Technical Achievements

•⁠  ⁠*Zero Dependencies* - Pure vanilla JavaScript
•⁠  ⁠*100% Responsive* - Works perfectly on all screen sizes
•⁠  ⁠*Accessibility Focused* - Keyboard navigation and semantic HTML
•⁠  ⁠*Modern ES6+* - Classes, arrow functions, destructuring
•⁠  ⁠*Performance Optimized* - Lightweight and fast loading
•⁠  ⁠*Error Handling* - Graceful fallbacks for missing resources
•⁠  ⁠*Cross-Browser Compatible* - Tested on all major browsers

## Browser Support

| Browser | Version | Status |
|---------|---------|---------|
| Chrome | 80+  Fully Supported |
| Firefox | 75+ | Fully Supported |
| Safari | 13+ | Fully Supported |
| Edge | 80+ | Fully Supported |

## Deployment

This app is deployed on *[Vercel/Netlify]* with automatic deployments from GitHub.

### Deploy Your Own
⁠ bash
# Vercel
npm i -g vercel
vercel

# Netlify
npm i -g netlify-cli
netlify deploy
 ⁠

## Testing

### Manual Testing Checklist
•⁠ Quiz loads without errors
•⁠ Timer counts down correctly
•⁠ Questions shuffle on restart
•⁠ Scoring calculates accurately
•⁠ High scores save and display
•⁠ Theme toggle works
•⁠ Mobile responsive
•⁠ Keyboard navigation functional

### Console Testing
⁠ javascript
// Test in browser console
window.quiz.score; // Check current score
localStorage.getItem('quizHighScores'); // Check saved scores
 ⁠

## Future Enhancements

•⁠   Multiple quiz categories
•⁠  ⁠ Sound effects and music
•⁠  ⁠ Achievement system
•⁠  ⁠ Multiplayer mode
•⁠  ⁠ Analytics dashboard
•⁠  ⁠ Multi-language support

## Learning Outcomes

This project demonstrates:
•⁠  ⁠*Frontend Development* skills with modern JavaScript
•⁠  ⁠*Responsive Design* principles and mobile-first approach
•⁠  ⁠*User Experience* design with animations and feedback
•⁠  ⁠*Data Persistence* using browser storage APIs
•⁠  ⁠*Code Organization* with object-oriented programming
•⁠  ⁠*Project Management* from concept to deployment

## Why I Chose This Project

As a first-year Computer Science student with a strong interest in both frontend and backend development, this quiz app allowed me to:

1.⁠ ⁠*Showcase JavaScript Skills* - Building on my Python background
2.⁠ ⁠*Demonstrate UI/UX Thinking* - Creating engaging user experiences  
3.⁠ ⁠*Practice Modern Web Development* - Using current best practices
4.⁠ ⁠*Complete Within Timeline* - Delivering a polished product on schedule
5.⁠ ⁠*Add Portfolio Value* - Professional-quality project for future opportunities

## About the Developer

* Khushi Gupta 
First-Year Computer Science Student | Newton School of Technology

-  *Interests:* Software Development, AI, Backend Systems
-  *Recent:* Smart India Hackathon Backend Developer  
-  *Skills:* Python, JavaScript, Flask, HTML/CSS
-  *Learning:* Full-stack development and competitive programming

## Contact & Links

•⁠  ⁠*GitHub:* 
•⁠  ⁠*LinkedIn:* https://www.linkedin.com/in/khushi-gupta-61a735373 
•⁠  ⁠*Email:* khushigupta0987654321@gmail.com

## License

This project is open source and available under the [MIT License](LICENSE).

---

* If you found this project helpful, please give it a star!*

Built with ¸ for Google Developer Club Tech Department Assignment
