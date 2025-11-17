# Supabase Setup Guide for VozVibe Speaking Test

This guide will help you set up Supabase Storage to automatically save student speaking test recordings.

---

## Step 1: Create a Supabase Account

1. Go to **https://supabase.com**
2. Click **"Start your project"** or **"Sign up"**
3. Sign up with your email or GitHub account
4. Verify your email

---

## Step 2: Create a New Project

1. Once logged in, click **"New Project"**
2. Fill in the details:
   - **Name**: `vozvibe-speaking-test` (or any name you prefer)
   - **Database Password**: Create a strong password (save it somewhere safe)
   - **Region**: Choose the closest region to your students
   - **Pricing Plan**: Select **Free** (1GB storage, sufficient for research)
3. Click **"Create new project"**
4. Wait 1-2 minutes for project setup to complete

---

## Step 3: Create Storage Bucket

1. In your project dashboard, click **"Storage"** in the left sidebar
2. Click **"Create a new bucket"**
3. Configure the bucket:
   - **Name**: `vozvibe-recordings` (must match the name in script.js)
   - **Public bucket**: ❌ **Leave unchecked** (keep recordings private)
   - **File size limit**: `50 MB` (optional)
   - **Allowed MIME types**: `audio/webm` (optional)
4. Click **"Create bucket"**

---

## Step 4: Set Bucket Permissions

1. Click on your `vozvibe-recordings` bucket
2. Click **"Policies"** tab
3. Click **"New Policy"** → **"For full customization"**
4. Create an **INSERT** policy:
   - **Policy name**: `Allow uploads`
   - **Allowed operation**: ✅ **INSERT**
   - **Policy definition** (copy-paste this):
     ```sql
     true
     ```
   - Click **"Review"** → **"Save policy"**

5. Create a **SELECT** policy (so you can download recordings later):
   - Click **"New Policy"** → **"For full customization"**
   - **Policy name**: `Allow downloads`
   - **Allowed operation**: ✅ **SELECT**
   - **Policy definition**:
     ```sql
     true
     ```
   - Click **"Review"** → **"Save policy"**

---

## Step 5: Get Your API Credentials

1. Click **"Settings"** (gear icon) in the left sidebar
2. Click **"API"**
3. Copy these two values:

   - **Project URL**: `https://tteyzluxugggatteosms.supabase.co`
   - **anon public** key: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...` (long string)

---

## Step 6: Update Your Code

1. Open `vozvibeweb/script.js`
2. Find lines 547-549:
   ```javascript
   const SUPABASE_URL = 'YOUR_SUPABASE_URL';
   const SUPABASE_ANON_KEY = 'YOUR_SUPABASE_ANON_KEY';
   ```

3. Replace with your actual credentials:
   ```javascript
   const SUPABASE_URL = 'https://xxxxxxxxxxxxx.supabase.co';
   const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...';
   ```

4. Save the file

---

## Step 7: Test the Upload

1. Open `speaking_test_interactive.html` in Chrome
2. Enter student ID and name
3. Start the test
4. Record a short answer
5. Check if you see **"✅ Upload successful!"**
6. Go to Supabase dashboard → **Storage** → `vozvibe-recordings`
7. You should see the folder structure: `speaking-tests/pre/S001/...`

---

## How to Access Recordings

### Method 1: Download from Supabase Dashboard
1. Go to **Storage** → `vozvibe-recordings`
2. Navigate to `speaking-tests/pre/S001/` (or post/...)
3. Click on any file → Click **Download**

### Method 2: Bulk Download via CLI (Advanced)
```bash
# Install Supabase CLI
npm install -g supabase

# Login
supabase login

# Link to your project
supabase link --project-ref xxxxxxxxxxxxx

# Download all files
supabase storage download vozvibe-recordings/speaking-tests --recursive
```

---

## File Structure in Storage

```
vozvibe-recordings/
├── speaking-tests/
│   ├── pre/
│   │   ├── S001/
│   │   │   ├── S001_pre_q0.webm
│   │   │   ├── S001_pre_q1.webm
│   │   │   └── ...
│   │   ├── S002/
│   │   │   └── ...
│   └── post/
│       ├── S001/
│       └── ...
```

---

## Free Tier Limits

- **Storage**: 1 GB
- **Bandwidth**: 2 GB/month
- **File uploads**: 50 MB max per file

For a research study with:
- 30 students
- 12 questions each (pre + post = 24 recordings/student)
- ~2 MB per recording

**Total**: ~1.4 GB → You'll need to upgrade to **Pro plan ($25/month)** or delete old files periodically.

---

## Troubleshooting

### Upload fails with "401 Unauthorized"
- Check that your `SUPABASE_ANON_KEY` is correct
- Verify bucket policies are set to `true`

### Upload fails with "403 Forbidden"
- Make sure bucket is **not** public
- Check that INSERT policy exists

### File not appearing in dashboard
- Wait a few seconds and refresh
- Check browser console for errors (F12)

### "Storage bucket not found"
- Verify bucket name is exactly `vozvibe-recordings`
- Check spelling and capitalization

---

## Security Notes

✅ **Safe**:
- Anon key can be exposed in client-side code
- Row Level Security (RLS) policies protect data

❌ **Never expose**:
- Database password
- Service role key (different from anon key)

---

## Next Steps

Once configured:
1. ✅ Test with 2-3 sample recordings
2. ✅ Verify files appear in Supabase Storage
3. ✅ Download a test file to confirm quality
4. ✅ Run pilot test with 2-3 students
5. ✅ Begin actual data collection

---

## Support

- **Supabase Docs**: https://supabase.com/docs/guides/storage
- **Supabase Discord**: https://discord.supabase.com
- **GitHub Issues**: (create issue in your repo)

---

**Last updated**: November 2025
