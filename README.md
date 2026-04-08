# Immigration Exam Practice Quiz

## Overview
A fully self-contained, single-file HTML quiz application for practicing immigration exam questions. No installation, no server, no dependencies required!

## Features

### ✨ Quiz Formats
- **Full Practice Exam**: 190 questions (4 hours)
- **Extended Practice**: 150 questions (2 hours)
- **Standard Practice**: 100 questions (2 hours)
- **Quick Practice**: 50 questions (2 hours)
- **Mini Quiz**: 10 questions (2 hours)

### 🎯 Key Capabilities
- ✅ Multiple correct answer support ("select all that apply" questions)
- ✅ Countdown timer with visual warnings
- ✅ Auto-submit when time expires
- ✅ Answer review with explanations
- ✅ Practice history tracking (saved in browser localStorage)
- ✅ Settings page to clear history
- ✅ Modern, responsive design with smooth animations
- ✅ Mobile-friendly interface

### 📊 Progress Tracking
- Saves up to 50 most recent quiz attempts
- Tracks scores, completion time, and quiz format
- View detailed history with timestamps
- Review answers after quiz completion

## How to Use

### Quick Start
1. Open `quiz.html` in any modern web browser (Chrome, Firefox, Safari, Edge)
2. Select your desired quiz format
3. Answer questions by clicking on options
4. Use "Next" and "Previous" buttons to navigate
5. Click "Submit Quiz" when finished or wait for timer to expire
6. Review your results and answers

### Multiple Answer Questions
- Questions with multiple correct answers will show a yellow notice
- You can select/deselect multiple options
- All correct answers must be selected to get the question right

### Timer
- Timer counts down from the allocated time
- Turns **orange** with 10 minutes remaining
- Turns **red** with 5 minutes remaining
- Quiz auto-submits when timer reaches 00:00:00

### Review Mode
- After submitting, click "📝 Review Answers" to see:
  - ✅ Correct answers highlighted in green
  - ❌ Your incorrect selections highlighted in red
  - 📖 Explanations for each question (when available)

### Practice History
- Click "📊 View Practice History" on the home screen
- See all your previous attempts with scores and timestamps
- Access "Settings" (⚙️ icon) to clear history if needed

## Technical Details

### File Structure
- **quiz.html**: Single self-contained file (341 KB)
- **combined_exam_data.json**: Source data (included in quiz.html)
- All 399 questions embedded directly in the HTML
- No external dependencies or internet connection required

### Browser Compatibility
- ✅ Google Chrome (recommended)
- ✅ Mozilla Firefox
- ✅ Safari
- ✅ Microsoft Edge
- ✅ Any modern browser with JavaScript and localStorage support

### Data Storage
- All practice history is stored locally in your browser's localStorage
- No data is sent to any server
- Clearing browser data will erase practice history
- Maximum 50 quiz attempts are stored (older ones are automatically removed)

## Tips for Best Results

1. **Practice Regularly**: Use different quiz formats to build endurance
2. **Review Mistakes**: Always review your answers to understand errors
3. **Time Management**: Practice with the timer to improve speed
4. **Track Progress**: Monitor your history to see improvement over time
5. **Mobile Practice**: The quiz works great on tablets and phones too!

## Troubleshooting

### Quiz won't load
- Ensure JavaScript is enabled in your browser
- Try refreshing the page (Ctrl+R or Cmd+R)
- Clear browser cache and reload

### History not saving
- Check if localStorage is enabled in browser settings
- Some private/incognito modes may block localStorage
- Ensure you're using a supported browser

### Timer not working
- Refresh the page and try starting the quiz again
- Check browser console for errors (F12)

## Version Information
- **Version**: 1.0
- **Date**: April 8, 2026
- **Total Questions**: 399
- **Question Types**: Single and multiple correct answer formats

## License
For educational use only.

---

**Enjoy your practice! Good luck with your exam! 🎓**
