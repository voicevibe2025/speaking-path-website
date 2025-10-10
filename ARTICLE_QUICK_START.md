# Quick Start Guide - JALT-CALL Article Page

## For Adam (Team Leader)

### 1️⃣ Upload to Google Drive
1. Go to https://drive.google.com
2. Click **New** → **File upload**
3. Select your JALT-CALL article (`.docx` file)
4. Wait for upload to complete

### 2️⃣ Share the Document
1. Right-click the uploaded file
2. Click **Get link** or **Share**
3. Change to **"Anyone with the link can view"**
4. Click **Copy link**

### 3️⃣ Configure the Link in Code
1. Open `vozvibeweb/article.js` in your code editor
2. Find line 5: `const ARTICLE_GDRIVE_LINK = 'https://drive.google.com/file/d/YOUR_FILE_ID_HERE/view';`
3. Replace `YOUR_FILE_ID_HERE` with your Google Drive link or File ID
4. Save the file
5. Commit and push to GitHub (or just save locally)

**Example:**
```javascript
// Before:
const ARTICLE_GDRIVE_LINK = 'https://drive.google.com/file/d/YOUR_FILE_ID_HERE/view';

// After:
const ARTICLE_GDRIVE_LINK = 'https://drive.google.com/file/d/1ABcDeFgHiJkLmNoPqRsTuVwXyZ/view';
// Or just the File ID:
const ARTICLE_GDRIVE_LINK = '1ABcDeFgHiJkLmNoPqRsTuVwXyZ';
```

### 4️⃣ Share with Team
- Share the article page URL with your team members
- They will automatically see the document (no setup needed)
- Example: `https://voicevibe.com/article.html`
- Or: `file:///C:/path/to/vozvibeweb/article.html`

---

## For Team Members

### How to View the Article
1. Open the article page URL (shared by Adam)
2. Document is automatically loaded
3. Click **"View Document"**
4. Read the article

### How to Give Feedback
1. Scroll to **"Team Feedback & Comments"** section
2. Type your feedback in the text box
3. Click **"Submit Feedback"**
4. Your comment will appear immediately

---

## Updating the Article

### Option 1: Replace in Google Drive (Same Link)
1. Go to Google Drive
2. Delete the old file
3. Upload new version with **same filename**
4. Share with same settings
5. Team members refresh page and click "View Document" to see updates
6. **No code changes needed!**

### Option 2: New File (Different Link)
1. Upload new version to Google Drive
2. Get the new sharing link
3. Open `article.js` and update `ARTICLE_GDRIVE_LINK`
4. Save and commit
5. Team members will see the new document

---

## Troubleshooting

### ❌ "Failed to download file" error
- Make sure the file is shared as **"Anyone with the link can view"**
- Check that the Google Drive link is correct

### ❌ Document not displaying
- Make sure it's a `.docx` file (Microsoft Word)
- Try opening the Google Drive link directly in browser first
- Clear browser cache and try again

### ❌ "Invalid Google Drive link"
- Paste the full link from Google Drive
- Should look like: `https://drive.google.com/file/d/1ABC...xyz/view`
- Or just paste the File ID: `1ABC...xyz`

---

## Example Links

### Valid Google Drive Link Formats:
```
https://drive.google.com/file/d/1ABcDeFgHiJkLmNoPqRsTuVwXyZ/view
https://drive.google.com/file/d/1ABcDeFgHiJkLmNoPqRsTuVwXyZ/view?usp=sharing
https://drive.google.com/open?id=1ABcDeFgHiJkLmNoPqRsTuVwXyZ
1ABcDeFgHiJkLmNoPqRsTuVwXyZ (File ID only)
```

---

## Benefits

✅ **Everyone sees the same document** - no version confusion  
✅ **Easy updates** - just replace in Google Drive  
✅ **No file size limits** - Google Drive handles it  
✅ **Automatic backup** - Google Drive keeps your file safe  
✅ **Version history** - Google Drive tracks changes  
✅ **Team feedback** - Comment directly on the page  

---

**Need Help?** Contact Adam, S.Pd., M.Pd. (Team Leader)
