# VozVibe Article Progress Page

## Overview
Added a new article progress page to the VozVibe website for tracking and sharing the JALT-CALL article with team members for feedback and collaboration.

## Features

### 1. **Document Upload**
- Drag-and-drop or click-to-browse file upload
- Accepts `.docx` (Microsoft Word) files only
- Maximum file size: 10MB
- Visual feedback with drag-over states
- File validation and error handling

### 2. **Document Display**
- Converts Word documents to HTML using **mammoth.js** library
- Preserves document formatting (headings, paragraphs, lists, tables)
- Full document preview with scrollable viewer
- Print functionality for document content
- Close preview option

### 3. **File Management**
- View uploaded document details (name, size, upload time)
- Change/replace current file
- Download current file
- Persistent storage using `localStorage` (file restored on page reload)

### 4. **Team Feedback System**
- Comment section for team collaboration
- Real-time feedback submission
- Feedback stored in `localStorage`
- Timestamp display with relative time (e.g., "5 minutes ago")
- Persistent feedback that loads on page refresh

### 5. **Article Information Display**
- Conference: JALT-CALL
- Lead Author: Adam, S.Pd., M.Pd.
- Project: VozVibe App 2025
- Status badge: "In Progress"

## Files Created

1. **`article.html`** - Main article page HTML structure
2. **`article-styles.css`** - Dedicated styles for article page
3. **`article.js`** - JavaScript functionality for upload, display, and feedback
4. **Updated `index.html`** - Added navigation button to article page
5. **Updated `styles.css`** - Added navigation button styles

## Navigation

### From Homepage to Article Page:
- Click the **"JALT-CALL Article"** button in the header
- Or use the footer link: **Article**

### From Article Page to Homepage:
- Click **"Back to Home"** in the header

## How to Use

### For Team Leader (Adam):
1. Open `article.html` in a web browser
2. Click **"Choose File"** or drag-and-drop your `.docx` file
3. Click **"View Document"** to display the article
4. Share the page URL with team members

### For Team Members:
1. Navigate to the article page
2. Click **"View Document"** to read the current article
3. Scroll to the **"Team Feedback & Comments"** section
4. Type your feedback and click **"Submit Feedback"**

## Technical Details

### Dependencies:
- **mammoth.js v1.6.0** (loaded via CDN)
  - Converts `.docx` files to HTML
  - URL: `https://cdn.jsdelivr.net/npm/mammoth@1.6.0/mammoth.browser.min.js`

### Browser Storage:
- **localStorage** is used to persist:
  - Uploaded document (base64 encoded)
  - Team feedback/comments
  - Allows page refresh without losing data

### Supported Document Features:
- Headings (H1-H6)
- Paragraphs with text formatting
- Lists (ordered and unordered)
- Tables
- Basic text styles (bold, italic, etc.)

### File Size Limits:
- Maximum upload: **10MB**
- Recommended: Keep documents under 5MB for best performance

## Browser Compatibility
- Modern browsers (Chrome, Firefox, Edge, Safari)
- Requires JavaScript enabled
- Requires localStorage support

## Security Considerations
- All processing happens client-side (no server upload)
- XSS protection with HTML escaping in feedback
- File type validation (only `.docx` accepted)

## Future Enhancements (Optional)
- [ ] User authentication for team member names
- [ ] Real-time collaboration with backend database
- [ ] Version history tracking
- [ ] Export feedback as PDF
- [ ] Email notifications for new feedback
- [ ] Rich text editor for formatted feedback

## Styling
- Matches VozVibe brand colors (navy, cyan, indigo, fuchsia gradients)
- Fully responsive design
- Modern, clean UI with card-based layout
- Smooth animations and transitions

## Notes
- The document is stored locally in the browser
- Clearing browser data will remove the uploaded document and feedback
- For production use with multiple team members, consider adding a backend solution
- Current implementation is perfect for small team collaboration on a single machine or shared URL

## Testing Checklist
- [x] Upload `.docx` file
- [x] View document preview
- [x] Print document
- [x] Download document
- [x] Change file
- [x] Submit feedback
- [x] Page refresh persistence
- [x] Responsive design
- [x] Navigation between pages

---

**Created:** October 10, 2025  
**For:** VozVibe JALT-CALL Article Submission  
**Team Leader:** Adam, S.Pd., M.Pd.
