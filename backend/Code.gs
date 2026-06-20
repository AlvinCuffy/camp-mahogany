// ============================================================
// CAMP MAHOGANY 2026 — Google Apps Script Backend
// ============================================================
// SETUP:
//   1. Go to script.google.com → New Project
//   2. Paste this entire file
//   3. Replace SHEET_ID and NOTIFICATION_EMAIL below
//   4. Deploy → New deployment → Web app
//      → Execute as: Me | Who has access: Anyone
//   5. Copy the web app URL → paste into CampMahoganyForm.jsx
// ============================================================

const SHEET_ID          = 'YOUR_GOOGLE_SHEET_ID_HERE'; // ← Replace
const NOTIFICATION_EMAIL = 'vc_mahoganyplace@bellnet.ca'; // ← Valerie's email
const SHEET_NAME         = 'Registrations';

// ── Headers (column order in the Sheet) ────────────────────
const HEADERS = [
  'Submitted At', 'Status',
  'Child Name', 'Child Age', 'Date of Birth',
  'Medical Conditions', 'Allergies',
  'Parent Name', 'Parent Phone', 'Parent Email',
  'Emergency Name', 'Emergency Relationship', 'Emergency Phone',
  'Enrollment', 'Goal / Reason',
  'Heard About Us', 'Photo Opt-Out',
  'Signed By (Digital Signature)',
];


// ============================================================
// POST — Receives form submission
// ============================================================
function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);

    saveToSheet(data);
    sendNotificationEmail(data);

    return respond({ success: true, message: 'Registration received.' });

  } catch (err) {
    return respond({ success: false, error: err.message });
  }
}


// ============================================================
// GET — Returns all registrations as JSON (for Dashboard)
// ============================================================
function doGet(e) {
  try {
    const sheet = getSheet();
    const rows  = sheet.getDataRange().getValues();

    if (rows.length <= 1) {
      return respond({ registrations: [] });
    }

    const headers = rows[0];
    const records = rows.slice(1).map((row, i) => {
      const obj = { _rowIndex: i + 2 }; // 1-indexed, offset for header row
      headers.forEach((h, j) => { obj[h] = row[j]; });
      return obj;
    });

    return respond({ registrations: records });

  } catch (err) {
    return respond({ error: err.message });
  }
}


// ============================================================
// SAVE ROW TO GOOGLE SHEET
// ============================================================
function saveToSheet(data) {
  const sheet = getSheet();

  // Write headers if the sheet is brand new
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(HEADERS);
    sheet.getRange(1, 1, 1, HEADERS.length)
      .setFontWeight('bold')
      .setBackground('#071810')
      .setFontColor('#F5C400');
    sheet.setFrozenRows(1);
  }

  sheet.appendRow([
    new Date(data.submittedAt),
    'Pending',                                     // Status — Valerie updates this
    data.childName      || '',
    data.childAge       || '',
    data.childDOB       || '',
    data.medical        || 'None',
    data.allergy        || 'None',
    data.parentName     || '',
    data.parentPhone    || '',
    data.parentEmail    || '',
    data.emergencyName  || '',
    data.emergencyRelation || '',
    data.emergencyPhone || '',
    data.pricing === 'full' ? '$200 — Full 5 Weeks' : '$50/wk — Flexible',
    data.goal           || '',
    data.hearAbout      || '',
    data.photoOptOut    ? 'Opted Out' : 'OK to use',
    data.conductName    || '',
  ]);
}


// ============================================================
// SEND EMAIL NOTIFICATION TO VALERIE
// ============================================================
function sendNotificationEmail(data) {
  const subject = `🌴 New Camp Mahogany Registration — ${data.childName}`;

  const htmlBody = `
    <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;">
      <div style="background:#071810;padding:20px 28px;border-radius:8px 8px 0 0;">
        <h2 style="color:#fff;margin:0;font-size:22px;letter-spacing:2px;">
          CAMP <span style="color:#F5C400;">MAHOGANY</span>
        </h2>
        <p style="color:rgba(255,255,255,0.6);margin:4px 0 0;font-size:13px;">
          New Registration Received — Summer 2026
        </p>
      </div>

      <div style="background:#F5F0E8;padding:24px 28px;">

        <table style="width:100%;border-collapse:collapse;">

          <tr><td colspan="2" style="padding:10px 0 6px;">
            <strong style="font-size:11px;letter-spacing:2px;text-transform:uppercase;color:#999;">
              Child Information
            </strong>
          </td></tr>
          <tr style="background:#fff;">
            <td style="padding:8px 12px;font-size:13px;color:#555;width:40%;">Name</td>
            <td style="padding:8px 12px;font-size:13px;font-weight:700;color:#071810;">${data.childName}</td>
          </tr>
          <tr>
            <td style="padding:8px 12px;font-size:13px;color:#555;">Age</td>
            <td style="padding:8px 12px;font-size:13px;font-weight:700;color:#071810;">${data.childAge}</td>
          </tr>
          <tr style="background:#fff;">
            <td style="padding:8px 12px;font-size:13px;color:#555;">Medical</td>
            <td style="padding:8px 12px;font-size:13px;color:#071810;">${data.medical || 'None'}</td>
          </tr>
          <tr>
            <td style="padding:8px 12px;font-size:13px;color:#555;">Allergies</td>
            <td style="padding:8px 12px;font-size:13px;color:#071810;">${data.allergy || 'None'}</td>
          </tr>

          <tr><td colspan="2" style="padding:16px 0 6px;">
            <strong style="font-size:11px;letter-spacing:2px;text-transform:uppercase;color:#999;">
              Parent / Guardian
            </strong>
          </td></tr>
          <tr style="background:#fff;">
            <td style="padding:8px 12px;font-size:13px;color:#555;">Name</td>
            <td style="padding:8px 12px;font-size:13px;font-weight:700;color:#071810;">${data.parentName}</td>
          </tr>
          <tr>
            <td style="padding:8px 12px;font-size:13px;color:#555;">Phone</td>
            <td style="padding:8px 12px;font-size:13px;color:#071810;">${data.parentPhone}</td>
          </tr>
          <tr style="background:#fff;">
            <td style="padding:8px 12px;font-size:13px;color:#555;">Email</td>
            <td style="padding:8px 12px;font-size:13px;color:#071810;">${data.parentEmail}</td>
          </tr>

          <tr><td colspan="2" style="padding:16px 0 6px;">
            <strong style="font-size:11px;letter-spacing:2px;text-transform:uppercase;color:#999;">
              Emergency Contact
            </strong>
          </td></tr>
          <tr style="background:#fff;">
            <td style="padding:8px 12px;font-size:13px;color:#555;">Name</td>
            <td style="padding:8px 12px;font-size:13px;font-weight:700;color:#071810;">${data.emergencyName} (${data.emergencyRelation})</td>
          </tr>
          <tr>
            <td style="padding:8px 12px;font-size:13px;color:#555;">Phone</td>
            <td style="padding:8px 12px;font-size:13px;color:#071810;">${data.emergencyPhone}</td>
          </tr>

          <tr><td colspan="2" style="padding:16px 0 6px;">
            <strong style="font-size:11px;letter-spacing:2px;text-transform:uppercase;color:#999;">
              Enrollment
            </strong>
          </td></tr>
          <tr style="background:#fff;">
            <td style="padding:8px 12px;font-size:13px;color:#555;">Option</td>
            <td style="padding:8px 12px;font-size:13px;font-weight:700;color:#071810;">
              ${data.pricing === 'full' ? '$200 — Full 5 Weeks' : '$50/wk — Flexible'}
            </td>
          </tr>
          <tr>
            <td style="padding:8px 12px;font-size:13px;color:#555;">Heard via</td>
            <td style="padding:8px 12px;font-size:13px;color:#071810;">${data.hearAbout}</td>
          </tr>

          <tr><td colspan="2" style="padding:16px 0 6px;">
            <strong style="font-size:11px;letter-spacing:2px;text-transform:uppercase;color:#999;">
              Parent's Goal
            </strong>
          </td></tr>
          <tr style="background:#fff;">
            <td colspan="2" style="padding:12px;font-size:13px;color:#071810;font-style:italic;">
              "${data.goal}"
            </td>
          </tr>

        </table>

        <div style="margin-top:24px;padding:14px 16px;background:#071810;border-radius:8px;text-align:center;">
          <p style="color:#F5C400;font-weight:700;font-size:13px;margin:0;letter-spacing:1px;">
            ⚡ ACTION REQUIRED — Log into your Google Sheet to Approve or Decline
          </p>
        </div>

        <p style="font-size:11px;color:#999;margin-top:16px;text-align:center;">
          Signed by: ${data.conductName} &nbsp;·&nbsp;
          Submitted: ${new Date(data.submittedAt).toLocaleString('en-CA', { timeZone: 'America/Toronto' })}
        </p>
      </div>
    </div>
  `;

  GmailApp.sendEmail(
    NOTIFICATION_EMAIL,
    subject,
    `New registration from ${data.parentName} for ${data.childName}. Log into Google Sheets to review.`,
    { htmlBody }
  );
}


// ============================================================
// HELPERS
// ============================================================
function getSheet() {
  const ss    = SpreadsheetApp.openById(SHEET_ID);
  const sheet = ss.getSheetByName(SHEET_NAME);
  return sheet || ss.getActiveSheet();
}

function respond(data) {
  return ContentService
    .createTextOutput(JSON.stringify(data))
    .setMimeType(ContentService.MimeType.JSON);
}
