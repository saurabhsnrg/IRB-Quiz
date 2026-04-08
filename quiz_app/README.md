# Immigration Quiz Practice Application

A comprehensive single-file HTML quiz application for practicing immigration exam questions.

## Features

### Quiz Formats
- **10 Questions** - Quick Practice (2 hours)
- **50 Questions** - Standard Test (2 hours)
- **100 Questions** - Extended Practice (2 hours)
- **150 Questions** - Challenge Mode (2 hours)
- **190 Questions** - Full Exam (4 hours)

### Question Navigation
- **Side Panel Question Map**: Visual grid showing all question numbers
- **Click to Navigate**: Jump to any question by clicking its number
- **Visual Indicators**:
  - Blue: Current question
  - Gray: Attempted questions
  - Yellow border: Marked for review
  - Green: Correct (in results)
  - Red: Incorrect (in results)
- **Mark for Review**: Flag questions you want to revisit

### Answer Feedback Options
- **Immediate Feedback**: See correct answers and explanations after each question (can be toggled in settings)
- **Review at End**: Comprehensive review of all questions with correct answers and explanations

### Timer
- **Countdown Timer**: Prominently displayed at top of quiz
- **Visual Warnings**: 
  - Yellow when < 15 minutes remaining
  - Red (pulsing) when < 5 minutes remaining
- **Auto-Submit**: Quiz automatically submits when time expires
- **Time Tracking**: Records exact time taken for each quiz attempt

### Practice History
- **Persistent Storage**: All quiz attempts saved in browser localStorage
- **Detailed Records**: For each attempt, tracks:
  - Quiz format (number of questions)
  - Score (percentage and raw numbers)
  - Date and time
  - Time spent
  - Individual question performance (correct/incorrect)
- **Review Past Attempts**: Click any history item to see full question-by-question review
- **Never Expires**: History persists until manually cleared

### Settings
- **Immediate Feedback Toggle**: Enable/disable showing answers after each question
- **Clear History**: Remove all saved quiz attempts

### UI/UX Features
- **Modern Design**: Beautiful gradient backgrounds and smooth animations
- **Responsive**: Works on desktop, tablet, and mobile devices
- **Smooth Transitions**: Animated screen changes and element interactions
- **Professional Color Scheme**: Purple gradient theme with clear visual hierarchy
- **Intuitive Interface**: Easy to navigate with clear labels and icons

### Multiple Choice Support
- Handles both single-answer and multiple-answer questions
- Automatically detects question type from data
- Clear indication for "select all that apply" questions

## Technical Details

- **Single File**: Complete application in one HTML file
- **No Server Required**: Runs entirely in browser
- **No Dependencies**: Pure HTML, CSS, and JavaScript
- **Data Storage**: Uses browser localStorage for persistence
- **Question Pool**: 399 immigration exam questions embedded
- **Random Selection**: Questions randomly selected for each quiz session

## How to Use

1. Open `quiz.html` in any modern web browser
2. Select a quiz mode from the home screen
3. Answer questions using the navigation or question map
4. Mark questions for review if needed
5. Submit when complete or let timer auto-submit
6. Review your results with detailed explanations
7. View practice history to track progress

## File Location

- Main Application: `/home/ubuntu/quiz_app/quiz.html`
- Questions Data: Embedded in HTML file (originally from `/home/ubuntu/Uploads/combined_exam_data.json`)

## Browser Compatibility

- Chrome/Edge: ✅ Full support
- Firefox: ✅ Full support
- Safari: ✅ Full support
- Opera: ✅ Full support

## Privacy

- All data stored locally in your browser
- No data sent to any server
- Clear history anytime from Settings

## Tips for Best Results

1. **Use Mark for Review**: Flag questions you're unsure about to revisit later
2. **Watch the Timer**: Keep track of time, especially in longer quizzes
3. **Review Explanations**: Read explanations even for correct answers to deepen understanding
4. **Track Progress**: Use Practice History to identify weak areas
5. **Immediate Feedback**: Toggle based on preference - some prefer seeing answers right away, others prefer end review
