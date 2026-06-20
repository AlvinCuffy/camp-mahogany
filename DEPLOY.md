# Camp Mahogany — Deploy Guide
## Browser Only · No Computer Required

---

## WHAT CLAUDE ALREADY DID FOR YOU
- ✅ Built the registration form (with Code of Conduct)
- ✅ Built the dashboard for Valerie
- ✅ Built the QR code generator
- ✅ Wrote the Google Apps Script backend
- ✅ Set up Vercel config so routing works automatically
- ✅ Organized everything into a clean GitHub-ready project

---

## WHAT YOU DO (in browser, ~20 minutes)

---

### STEP 1 — Create GitHub Repo (5 min)
**github.com → sign in**

1. Click the **+** icon top right → **New repository**
2. Name it: `camp-mahogany`
3. Set to **Public**
4. Click **Create repository**
5. Click **uploading an existing file**
6. Drag ALL the files from this zip into the upload box
   - Make sure to include: `src/`, `backend/`, `public/`,
     `index.html`, `package.json`, `vite.config.js`,
     `vercel.json`, `.gitignore`, `README.md`
7. Click **Commit changes**

---

### STEP 2 — Deploy to Vercel (3 min)
**vercel.com → sign in with GitHub**

1. Click **Add New Project**
2. Find and select your `camp-mahogany` repo
3. Vercel auto-detects it as a Vite project
4. Leave all settings as default
5. Click **Deploy**
6. Wait ~60 seconds
7. ✅ Copy your live URL — looks like:
   ```
   https://camp-mahogany.vercel.app
   ```
   **This is the link that goes on the QR code**

---

### STEP 3 — Google Apps Script Backend (8 min)
**script.google.com → sign in with Google**

#### First — create the Google Sheet:
1. Go to **sheets.google.com** → **Blank spreadsheet**
2. Name it: `Camp Mahogany Registrations`
3. Copy the Sheet ID from the URL:
   ```
   https://docs.google.com/spreadsheets/d/COPY_THIS/edit
   ```

#### Then — set up the script:
1. Go to **script.google.com** → **New Project**
2. Delete all default code
3. Open `backend/Code.gs` from this zip in any text editor
4. Copy everything → paste into the Apps Script editor
5. Replace these two lines at the top:
   ```js
   const SHEET_ID           = 'PASTE_SHEET_ID_HERE';
   const NOTIFICATION_EMAIL = 'vc_mahoganyplace@bellnet.ca';
   ```
6. Click **Save** → name it `Camp Mahogany Backend`
7. Click **Deploy** → **New Deployment**
8. Click the ⚙️ gear → select **Web app**
9. Set:
   - Execute as: **Me**
   - Who has access: **Anyone**
10. Click **Deploy** → **Authorize access** → approve all permissions
11. ✅ Copy the Web App URL:
    ```
    https://script.google.com/macros/s/AKfyc.../exec
    ```
    **This is your backend URL — save it**

---

### STEP 4 — Connect Form + Dashboard to Backend (2 min)
**Back on github.com → your camp-mahogany repo**

#### Update the Form:
1. Click into `src` → `components` → `Form` → `CampMahoganyForm.jsx`
2. Click the ✏️ pencil icon to edit
3. Find this line near the top:
   ```js
   const BACKEND_URL = "YOUR_APPS_SCRIPT_URL_HERE";
   ```
4. Replace with your actual URL:
   ```js
   const BACKEND_URL = "https://script.google.com/macros/s/AKfyc.../exec";
   ```
5. Click **Commit changes**

#### Update the Dashboard:
1. Click into `src` → `components` → `Dashboard` → `Dashboard.jsx`
2. Click the ✏️ pencil to edit
3. Find the same line and replace with the same URL
4. Click **Commit changes**

#### Vercel auto-redeploys in ~60 seconds ✅

---

### STEP 5 — Generate the QR Code (2 min)

1. Go to **qr-code-generator.com**
2. Paste your Vercel URL
3. Download the QR code as PNG
4. Drop it into the flyer where the checkerboard placeholder is

---

### STEP 6 — Send to the Developer

Send him these 3 links:

| What | Link |
|------|------|
| 🌐 Live form (QR destination) | your Vercel URL |
| 📊 Google Sheet (data storage) | Share your Sheet → Anyone with link can view |
| ⚙️ Backend script | Share your Apps Script project |

---

## AFTER SETUP — HOW THE SYSTEM WORKS

```
Parent scans QR code
    ↓
Fills out form on Vercel site
    ↓
Hits Submit
    ↓  (Google Apps Script)
    ├── Row saved to Google Sheet instantly
    └── Email sent to Valerie's inbox

Valerie opens Dashboard
    ↓
Sees all applications live
    ↓
Clicks Approve / Decline / Email parent
```

---

## IF SOMETHING BREAKS

- **Form not submitting** → check BACKEND_URL is correct in CampMahoganyForm.jsx
- **Dashboard showing nothing** → check BACKEND_URL is correct in Dashboard.jsx
- **Pages giving 404 on Vercel** → make sure vercel.json was uploaded to GitHub
- **No email arriving** → check NOTIFICATION_EMAIL in Code.gs and re-deploy the script
