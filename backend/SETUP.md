# Camp Mahogany — Backend Setup Guide

## What This Does
One Google Apps Script handles everything:
- ✅ Receives form submissions (POST)
- ✅ Saves every registration to a Google Sheet
- ✅ Sends a formatted email to Valerie instantly
- ✅ Returns all registrations as JSON (for the Dashboard)
- ✅ Free — hosted entirely by Google

---

## Step 1 — Create the Google Sheet

1. Go to [sheets.google.com](https://sheets.google.com)
2. Create a new blank spreadsheet
3. Name it: **Camp Mahogany Registrations**
4. Copy the Sheet ID from the URL:
   ```
   https://docs.google.com/spreadsheets/d/THIS_PART_IS_YOUR_ID/edit
   ```

---

## Step 2 — Set Up the Apps Script

1. Go to [script.google.com](https://script.google.com)
2. Click **New Project**
3. Delete all default code
4. Paste the entire contents of `Code.gs`
5. Replace these two lines at the top:
   ```js
   const SHEET_ID           = 'YOUR_GOOGLE_SHEET_ID_HERE'; // ← paste Sheet ID
   const NOTIFICATION_EMAIL = 'vc_mahoganyplace@bellnet.ca'; // ← Valerie's email
   ```
6. Click **Save** (name the project: Camp Mahogany Backend)

---

## Step 3 — Deploy as a Web App

1. Click **Deploy** → **New Deployment**
2. Click the gear icon → select **Web app**
3. Set:
   - **Execute as:** Me
   - **Who has access:** Anyone
4. Click **Deploy**
5. Click **Authorize access** → allow permissions
6. Copy the **Web App URL** — it looks like:
   ```
   https://script.google.com/macros/s/AKfyc.../exec
   ```

---

## Step 4 — Connect the Form

Open `src/components/Form/CampMahoganyForm.jsx`

Find this line near the top:
```js
const BACKEND_URL = 'YOUR_APPS_SCRIPT_URL_HERE';
```

Replace with your actual URL:
```js
const BACKEND_URL = 'https://script.google.com/macros/s/AKfyc.../exec';
```

---

## Step 5 — Test It

1. Run `npm run dev` locally
2. Fill out the form and submit
3. Check:
   - **Google Sheet** → new row should appear instantly
   - **Valerie's inbox** → formatted email notification

---

## How the Sheet Looks

| Submitted At | Status | Child Name | Age | Parent Name | Parent Email | ... |
|---|---|---|---|---|---|---|
| Jun 20 2026 | Pending | Amara Johnson | 7 | Sandra Johnson | s@email.com | ... |

Valerie updates the **Status** column to `Approved` or `Declined` directly in the Sheet.

---

## Dashboard Connection

The Dashboard reads from the same backend URL with a GET request.
Once `BACKEND_URL` is set in the form, update Dashboard.jsx with the same URL
and it will pull live data automatically.

---

## Redeploy After Changes

If you edit Code.gs, you must redeploy:
1. **Deploy** → **Manage Deployments**
2. Click the pencil icon on your deployment
3. Set **Version** to **New Version**
4. Click **Deploy**
