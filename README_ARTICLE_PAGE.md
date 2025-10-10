# VozVibe Article Progress Page

## Overview
Added a new article progress page to the VozVibe website for tracking and sharing the JALT-CALL article with team members for feedback and collaboration. **Uses Google Drive for persistent, team-accessible document storage.**

## Features

### 1. **Google Drive Integration** ⭐
- Upload your `.docx` file to Google Drive
- Paste the Google Drive share link or File ID
- Automatically fetches and displays the document
- **Persistent across all team members** - everyone sees the same document
- No file size limits (handled by Google Drive)
- Easy updates - just replace the file in Google Drive

### 2. **Document Display**
- Converts Word documents to HTML using **mammoth.js** library
- Preserves document formatting (headings, paragraphs, lists, tables)
- Full document preview with scrollable viewer
- Print functionality for document content
- Close preview option

### 3. **File Management**
- View document details (loaded from Google Drive)
- Change Google Drive link to load different document
- Open directly in Google Drive for editing
- Persistent link storage using `localStorage`

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

#### Step 1: Upload to Google Drive
1. Go to [Google Drive](https://drive.google.com)
2. Upload your JALT-CALL article (`.docx` file)
3. Right-click the file → **Get link**
4. Set sharing to **"Anyone with the link can view"**
5. Copy the link

#### Step 2: Load on Website
1. Open `article.html` in a web browser
2. Paste the Google Drive link in the input field
3. Click **"Load Document"**
4. Click **"View Document"** to display the article
5. Share the article page URL with team members

#### Step 3: Update Article
- To update the article, just replace the file in Google Drive
- Team members refresh the page and click "View Document" to see updates
- Or change the Google Drive link to load a different version

### For Team Members:
1. Navigate to the article page (URL shared by Adam)
2. The Google Drive link will be automatically loaded
3. Click **"View Document"** to read the current article
4. Scroll to the **"Team Feedback & Comments"** section
5. Type your feedback and click **"Submit Feedback"**

## Technical Details

### Dependencies:
- **mammoth.js v1.6.0** (loaded via CDN)
  - Converts `.docx` files to HTML
  - URL: `https://cdn.jsdelivr.net/npm/mammoth@1.6.0/mammoth.browser.min.js`

### Browser Storage:
- **localStorage** is used to persist:
  - Google Drive file ID and URL
  - Team feedback/comments
  - Allows page refresh without re-entering the link

### Google Drive Integration:
- Uses Google Drive direct download API: `https://drive.google.com/uc?export=download&id={FILE_ID}`
- Requires file to be shared as "Anyone with the link can view"
- Fetches document on-demand when viewing
- No file size limits (Google Drive handles storage)

### Supported Document Features:
- Headings (H1-H6)
- Paragraphs with text formatting
- Lists (ordered and unordered)
- Tables
- Basic text styles (bold, italic, etc.)

## Browser Compatibility
- Modern browsers (Chrome, Firefox, Edge, Safari)
- Requires JavaScript enabled
- Requires localStorage support

## Security Considerations
- Document fetched directly from Google Drive (secure Google infrastructure)
- XSS protection with HTML escaping in feedback
- File type validation (only `.docx` accepted)
- Google Drive handles access control and permissions
- No sensitive data stored on the website itself

## Advantages of Google Drive Approach
✅ **Persistent** - Document stored permanently on Google Drive  
✅ **Team-Accessible** - Everyone with the link can view  
✅ **Easy Updates** - Replace file in Google Drive, team sees updates  
✅ **No Size Limits** - Google Drive handles storage  
✅ **Version Control** - Google Drive maintains file history  
✅ **Secure** - Google's infrastructure and permissions  

## Future Enhancements (Optional)
- [ ] User authentication for team member names
- [ ] Real-time collaboration with backend database for feedback
- [ ] Export feedback as PDF
- [ ] Email notifications for new feedback
- [ ] Google Drive API integration for automatic file updates
- [ ] Rich text editor for formatted feedback

## Styling
- Matches VozVibe brand colors (navy, cyan, indigo, fuchsia gradients)
- Fully responsive design
- Modern, clean UI with card-based layout
- Smooth animations and transitions

## Notes
- **Document is stored on Google Drive** - persistent and accessible to all team members
- Only the Google Drive link is stored in browser localStorage
- Clearing browser data will only remove the saved link (easily re-entered)
- **Feedback is stored locally** per browser (consider backend for shared feedback in future)
- Perfect for team collaboration - everyone sees the same document
- To update the article, simply replace the file in Google Drive

## Testing Checklist
- [x] Paste Google Drive link
- [x] Load document from Google Drive
- [x] View document preview
- [x] Print document
- [x] Open in Google Drive
- [x] Change Google Drive link
- [x] Submit feedback
- [x] Page refresh persistence
- [x] Responsive design
- [x] Navigation between pages
- [x] Team accessibility (multiple users)

---

**Created:** October 10, 2025  
**For:** VozVibe JALT-CALL Article Submission  
**Team Leader:** Adam, S.Pd., M.Pd.
