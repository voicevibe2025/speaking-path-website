# Practice Test Guide

## Purpose

The **Practice Speaking Test** allows students to familiarize themselves with the test interface before taking the actual speaking test. This is a standard best practice in computer-based testing research.

---

## Why Practice Sessions Are Important in Research

### ✅ Methodological Benefits:

1. **Reduces Confounding Variables**
   - All students equally familiar with technology
   - Eliminates "tech-savvy" advantage
   - Minimizes technical issues during actual test

2. **Improves Data Quality**
   - Reduces test anxiety
   - More authentic performance
   - Students focus on speaking, not on figuring out buttons

3. **Ethical Consideration**
   - Fair to all participants
   - Students know what to expect
   - Informed consent (they understand the procedure)

4. **Research Standard**
   - TOEFL iBT has tutorial section
   - IELTS computer has practice module
   - Standard in educational measurement

---

## Practice Test Features

### Same Interface as Actual Test:
- ✅ One-attempt-only (no re-recording)
- ✅ No Previous button
- ✅ Auto-advance after recording
- ✅ Start/Stop recording buttons
- ✅ Timer display

### Differences from Actual Test:
- 📝 **4 simple questions** instead of 12
- 📝 **Shorter duration** (30-45 seconds per question)
- 📝 **Easy topics** (favorite color, breakfast, weekend, weather)
- 📝 **NO RECORDINGS SAVED** (purely for interface practice)
- 📝 **Green theme** vs blue theme (visual distinction)

---

## Practice Questions

1. **Question 1**: What is your favorite color and why? *(30 seconds)*
2. **Question 2**: What did you eat for breakfast today? *(30 seconds)*
3. **Question 3**: What do you like to do on weekends? *(45 seconds)*
4. **Question 4**: Describe the weather today. *(30 seconds)*

These questions are intentionally simple and non-threatening to help students relax and focus on learning the interface.

---

## Student Workflow

### Before Practice:
1. Student opens `speaking_test_practice.html`
2. Reads the practice notice
3. Enters Student ID and Name
4. Clicks "Start Practice"

### During Practice:
1. Question 1 appears
2. Student clicks "Start Recording"
3. Speaks (microphone icon turns red, timer runs)
4. Student clicks "Stop Recording"
5. System uploads → "✅ Upload successful!"
6. Auto-advances to next question after 2 seconds
7. Repeat for all 4 questions

### After Practice:
- Shows completion message
- Returns to main page
- Student is ready for actual test!

---

## File Storage

**Practice recordings are NOT saved anywhere.**

The practice test only familiarizes students with:
- ✅ How to click "Start Recording"
- ✅ How the timer works
- ✅ How to click "Stop Recording"
- ✅ How auto-advance works

No audio files are saved to Supabase or downloaded to the student's computer. This reduces storage costs and makes the practice session faster.

---

## Recommended Procedure for Your Research

### Session 1: Practice (15-20 minutes)
1. Welcome students
2. Explain study purpose & consent
3. Give each student their ID (e.g., S001, S002...)
4. Have students complete practice test
5. Answer any technical questions
6. Ensure all students are comfortable

### Session 2: Pre-test (30-45 minutes)
- Students take Pre-test (Version A)
- 12 questions, recorded and uploaded

### During Intervention:
- Students use VozVibe app

### Session 3: Post-test (30-45 minutes)
- Students take Post-test (Version B)
- 12 questions, recorded and uploaded

---

## Reporting in Methodology

Example text for your thesis:

> **Test Administration**: Prior to data collection, all participants completed a brief practice session (4 questions, approximately 10 minutes) to familiarize themselves with the computer-based recording interface and reduce potential anxiety related to technology use. This practice session ensured that all participants were equally comfortable with the test delivery system before completing the actual speaking tests. The practice session used simple, non-test content and recordings were not saved, as the purpose was solely interface familiarization.

---

## Technical Details

### Files:
- `speaking_test_practice.html` - Practice test interface
- `script_practice.js` - Practice test JavaScript logic

### Configuration:
- No Supabase connection needed
- No files saved anywhere
- 4 questions total
- No scoring (just for interface familiarization)

---

## Troubleshooting

### Students Can't Hear/Record:
- Check microphone permissions in browser
- Ensure Chrome/Edge (not Safari)
- Test with Practice Question 1 first
- Recording not working? That's okay - just click through to see the interface

### Students Anxious About Practice:
- Emphasize it's PRACTICE only
- **Recordings are NOT saved** - no one will hear them
- No scoring, no judgment
- They can speak in any language, or just count "1, 2, 3..."
- The goal is just to learn the buttons and interface

---

## Summary

✅ **Purpose**: Familiarize students with interface  
✅ **Duration**: ~5-10 minutes  
✅ **Questions**: 4 simple, easy topics  
✅ **Storage**: No recordings saved  
✅ **Research Value**: Reduces confounding variables, improves data quality  
✅ **Student Benefit**: Less anxiety, better actual test performance  
✅ **Efficiency**: Fast, no storage costs, purely educational

---

**Recommendation**: Have all students complete the practice test at least 1 day before the actual pre-test. This gives them time to forget the practice content while retaining familiarity with the interface.

---

**Created**: November 2025  
**Version**: 1.0
