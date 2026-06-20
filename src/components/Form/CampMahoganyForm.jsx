import { useState } from "react";

// ── Replace this with your deployed Apps Script URL ──────────
const BACKEND_URL = "YOUR_APPS_SCRIPT_URL_HERE";
// ────────────────────────────────────────────────────────────

const GREEN = "#071810";
const GOLD = "#F5C400";
const CREAM = "#F5F0E8";
const LIGHT = "#FAFAF6";

function Label({ children, required }) {
  return (
    <div style={{ fontSize: 12, fontWeight: 800, letterSpacing: 1.5, textTransform: "uppercase", color: GREEN, marginBottom: 6, opacity: 0.75 }}>
      {children}{required && <span style={{ color: GOLD, marginLeft: 3 }}>*</span>}
    </div>
  );
}

function Input({ placeholder, value, onChange, type = "text", multiline }) {
  const base = {
    width: "100%", padding: "11px 14px", borderRadius: 8,
    border: "2px solid #ddd", fontSize: 14, fontFamily: "inherit",
    background: "#fff", color: GREEN, outline: "none", boxSizing: "border-box",
    transition: "border 0.2s",
  };
  return multiline
    ? <textarea rows={3} placeholder={placeholder} value={value} onChange={onChange}
        style={{ ...base, resize: "vertical", lineHeight: 1.5 }} />
    : <input type={type} placeholder={placeholder} value={value} onChange={onChange} style={base} />;
}

function Section({ title, children }) {
  return (
    <div style={{ marginBottom: 28 }}>
      <div style={{
        fontWeight: 900, fontSize: 13, letterSpacing: 3, textTransform: "uppercase",
        color: GREEN, borderLeft: `4px solid ${GOLD}`, paddingLeft: 10, marginBottom: 18,
      }}>{title}</div>
      {children}
    </div>
  );
}

function Field({ label, required, children }) {
  return (
    <div style={{ marginBottom: 16 }}>
      <Label required={required}>{label}</Label>
      {children}
    </div>
  );
}

function Row({ children }) {
  return <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>{children}</div>;
}

const CONDUCT_ITEMS = [
  "Camp Mahogany is a structured enrichment program — not a drop-in or daycare service.",
  "Parents/guardians agree to on-time pickup by 4:30 PM. Late pickup may result in a fee.",
  "Children are expected to treat staff and fellow campers with respect at all times.",
  "Disruptive, aggressive, or repeated misbehaviour may result in removal from the program without refund.",
  "A reachable parent/guardian contact must be available during all camp hours.",
  "Camp coordinators reserve the right to refuse or remove any participant whose behaviour is incompatible with a positive group experience.",
  "By registering, you confirm that your child is in good health and able to participate in group activities.",
  "Photos taken during camp activities may be used for promotional purposes unless you opt out below.",
];

export default function CampMahoganyForm() {
  const [form, setForm] = useState({
    childName: "", childAge: "", childDOB: "",
    parentName: "", parentPhone: "", parentEmail: "",
    emergencyName: "", emergencyPhone: "", emergencyRelation: "",
    medical: "", allergy: "",
    goal: "",
    weeks: "full",
    photoOptOut: false,
    conductSigned: false,
    conductName: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const set = (key) => (e) => setForm(f => ({ ...f, [key]: e.target.type === "checkbox" ? e.target.checked : e.target.value }));

  const validate = () => {
    const e = {};
    if (!form.childName) e.childName = true;
    if (!form.childAge) e.childAge = true;
    if (!form.parentName) e.parentName = true;
    if (!form.parentPhone) e.parentPhone = true;
    if (!form.parentEmail) e.parentEmail = true;
    if (!form.emergencyName) e.emergencyName = true;
    if (!form.emergencyPhone) e.emergencyPhone = true;
    if (!form.conductSigned) e.conductSigned = true;
    if (!form.conductName) e.conductName = true;
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async () => {
    if (!validate()) return;
    setLoading(true);
    const payload = {
      childName: form.childName, childAge: form.childAge, childDOB: form.childDOB,
      medical: form.medical, allergy: form.allergy,
      parentName: form.parentName, parentPhone: form.parentPhone, parentEmail: form.parentEmail,
      emergencyName: form.emergencyName, emergencyRelation: form.emergencyRelation,
      emergencyPhone: form.emergencyPhone,
      pricing: form.weeks, goal: form.goal, hearAbout: form.hearAbout,
      photoOptOut: form.photoOptOut, conductName: form.conductName,
      submittedAt: new Date().toISOString(),
    };
    try {
      await fetch(BACKEND_URL, {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      setSubmitted(true);
    } catch (err) {
      console.error("Submission error:", err);
      alert("Something went wrong. Please email vc_mahoganyplace@bellnet.ca directly.");
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div style={{ background: CREAM, minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", padding: 24 }}>
        <div style={{ background: "#fff", borderRadius: 16, padding: "48px 40px", maxWidth: 480, textAlign: "center", boxShadow: "0 8px 40px rgba(0,0,0,0.1)" }}>
          <div style={{ fontSize: 52, marginBottom: 16 }}>🌴</div>
          <div style={{ fontWeight: 900, fontSize: 26, color: GREEN, marginBottom: 10 }}>Application Received!</div>
          <div style={{ fontSize: 14, color: "#555", lineHeight: 1.7, marginBottom: 24 }}>
            Thank you, <strong>{form.parentName}</strong>. We've received your registration for <strong>{form.childName}</strong>.
            Valerie will review your application and follow up at <strong>{form.parentEmail}</strong> to confirm your spot.
          </div>
          <div style={{ background: CREAM, borderRadius: 10, padding: "14px 20px", fontSize: 13, color: GREEN, fontWeight: 700 }}>
            📍 Camp Mahogany · 7820 McLaughlin Rd S, Brampton ON<br />
            ✉️ vc_mahoganyplace@bellnet.ca
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ background: CREAM, minHeight: "100vh", fontFamily: "'Segoe UI', Arial, sans-serif" }}>

      {/* Header */}
      <div style={{ background: GREEN, padding: "28px 32px 22px" }}>
        <div style={{ maxWidth: 640, margin: "0 auto" }}>
          <div style={{ fontSize: 11, fontWeight: 800, letterSpacing: 4, color: "rgba(255,255,255,0.5)", textTransform: "uppercase", marginBottom: 4 }}>
            Summer 2026 · Registration
          </div>
          <div style={{ fontFamily: "Georgia, serif", fontSize: 36, fontWeight: 900, color: "#fff", letterSpacing: 2, lineHeight: 1 }}>
            CAMP <span style={{ color: GOLD }}>MAHOGANY</span>
          </div>
          <div style={{ color: "rgba(255,255,255,0.65)", fontSize: 13, marginTop: 8, fontWeight: 600 }}>
            July 6 – Aug 7, 2026 &nbsp;·&nbsp; Ages 4–10/11 &nbsp;·&nbsp; 9:30AM – 4:30PM
          </div>
        </div>
      </div>

      {/* Urgency bar */}
      <div style={{ background: GOLD, padding: "9px 32px", textAlign: "center" }}>
        <span style={{ fontWeight: 900, fontSize: 13, letterSpacing: 1, color: GREEN }}>
          ⚡ LIMITED ENROLLMENT — Spots are confirmed by coordinator after review
        </span>
      </div>

      {/* Form body */}
      <div style={{ maxWidth: 640, margin: "0 auto", padding: "32px 24px 48px" }}>

        {/* Child Info */}
        <Section title="Child's Information">
          <Field label="Child's Full Name" required>
            <Input placeholder="First and last name" value={form.childName} onChange={set("childName")} />
            {errors.childName && <div style={{ color: "red", fontSize: 11, marginTop: 4 }}>Required</div>}
          </Field>
          <Row>
            <Field label="Age" required>
              <Input placeholder="e.g. 7" value={form.childAge} onChange={set("childAge")} type="number" />
              {errors.childAge && <div style={{ color: "red", fontSize: 11, marginTop: 4 }}>Required</div>}
            </Field>
            <Field label="Date of Birth">
              <Input type="date" value={form.childDOB} onChange={set("childDOB")} />
            </Field>
          </Row>
          <Field label="Medical Conditions or Needs">
            <Input placeholder="e.g. asthma, ADHD — or write 'none'" value={form.medical} onChange={set("medical")} multiline />
          </Field>
          <Field label="Allergies">
            <Input placeholder="e.g. peanuts, bee stings — or write 'none'" value={form.allergy} onChange={set("allergy")} />
          </Field>
        </Section>

        {/* Parent Info */}
        <Section title="Parent / Guardian Information">
          <Field label="Full Name" required>
            <Input placeholder="Your full name" value={form.parentName} onChange={set("parentName")} />
            {errors.parentName && <div style={{ color: "red", fontSize: 11, marginTop: 4 }}>Required</div>}
          </Field>
          <Row>
            <Field label="Phone Number" required>
              <Input placeholder="(416) 000-0000" value={form.parentPhone} onChange={set("parentPhone")} type="tel" />
              {errors.parentPhone && <div style={{ color: "red", fontSize: 11, marginTop: 4 }}>Required</div>}
            </Field>
            <Field label="Email Address" required>
              <Input placeholder="your@email.com" value={form.parentEmail} onChange={set("parentEmail")} type="email" />
              {errors.parentEmail && <div style={{ color: "red", fontSize: 11, marginTop: 4 }}>Required</div>}
            </Field>
          </Row>
        </Section>

        {/* Emergency Contact */}
        <Section title="Emergency Contact">
          <Row>
            <Field label="Contact Name" required>
              <Input placeholder="Full name" value={form.emergencyName} onChange={set("emergencyName")} />
              {errors.emergencyName && <div style={{ color: "red", fontSize: 11, marginTop: 4 }}>Required</div>}
            </Field>
            <Field label="Relationship">
              <Input placeholder="e.g. Grandmother" value={form.emergencyRelation} onChange={set("emergencyRelation")} />
            </Field>
          </Row>
          <Field label="Emergency Phone" required>
            <Input placeholder="(416) 000-0000" value={form.emergencyPhone} onChange={set("emergencyPhone")} type="tel" />
            {errors.emergencyPhone && <div style={{ color: "red", fontSize: 11, marginTop: 4 }}>Required</div>}
          </Field>
        </Section>

        {/* Enrollment */}
        <Section title="Enrollment Preference">
          <Field label="Registration Option" required>
            <div style={{ display: "flex", gap: 12 }}>
              {[
                { val: "full", label: "$200", sub: "Full 5 Weeks" },
                { val: "weekly", label: "$50 / wk", sub: "Weekly Flexible" },
              ].map(opt => (
                <div key={opt.val}
                  onClick={() => setForm(f => ({ ...f, weeks: opt.val }))}
                  style={{
                    flex: 1, border: `2.5px solid ${form.weeks === opt.val ? GREEN : "#ddd"}`,
                    background: form.weeks === opt.val ? GREEN : "#fff",
                    color: form.weeks === opt.val ? "#fff" : GREEN,
                    borderRadius: 10, padding: "14px 16px", cursor: "pointer",
                    textAlign: "center", transition: "all 0.2s",
                  }}>
                  <div style={{ fontWeight: 900, fontSize: 20 }}>{opt.label}</div>
                  <div style={{ fontSize: 12, opacity: 0.75, marginTop: 3 }}>{opt.sub}</div>
                </div>
              ))}
            </div>
          </Field>
          <Field label="What are you hoping your child gets out of this summer?">
            <Input
              placeholder="Tell us a little about your child and what you're looking for..."
              value={form.goal} onChange={set("goal")} multiline />
          </Field>
        </Section>

        {/* Code of Conduct */}
        <Section title="Code of Conduct">
          <div style={{
            background: "#fff", border: `2px solid ${GREEN}`, borderRadius: 10,
            padding: "18px 20px", marginBottom: 16,
          }}>
            <div style={{ fontSize: 12, fontWeight: 800, color: GREEN, marginBottom: 12, letterSpacing: 1 }}>
              PLEASE READ CAREFULLY BEFORE SIGNING
            </div>
            {CONDUCT_ITEMS.map((item, i) => (
              <div key={i} style={{ display: "flex", gap: 10, marginBottom: 10, alignItems: "flex-start" }}>
                <div style={{
                  width: 20, height: 20, borderRadius: "50%", background: GOLD,
                  color: GREEN, fontSize: 10, fontWeight: 900,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  flexShrink: 0, marginTop: 1,
                }}>
                  {i + 1}
                </div>
                <div style={{ fontSize: 13, color: "#333", lineHeight: 1.6 }}>{item}</div>
              </div>
            ))}
          </div>

          <Field label="Photo opt-out">
            <label style={{ display: "flex", alignItems: "center", gap: 10, cursor: "pointer", fontSize: 13, color: GREEN, fontWeight: 600 }}>
              <input type="checkbox" checked={form.photoOptOut} onChange={set("photoOptOut")}
                style={{ width: 16, height: 16, accentColor: GREEN }} />
              I do NOT want my child's photos used for promotional purposes
            </label>
          </Field>

          <Field label="I have read and agree to the Code of Conduct" required>
            <label style={{ display: "flex", alignItems: "flex-start", gap: 10, cursor: "pointer", fontSize: 13, color: GREEN, fontWeight: 600, lineHeight: 1.5 }}>
              <input type="checkbox" checked={form.conductSigned} onChange={set("conductSigned")}
                style={{ width: 16, height: 16, accentColor: GREEN, marginTop: 2 }} />
              I confirm that I have read the Camp Mahogany Code of Conduct and agree to its terms on behalf of myself and my child.
            </label>
            {errors.conductSigned && <div style={{ color: "red", fontSize: 11, marginTop: 6 }}>You must agree to the Code of Conduct to register.</div>}
          </Field>

          <Field label="Your full name (as digital signature)" required>
            <Input placeholder="Type your full name to sign" value={form.conductName} onChange={set("conductName")} />
            {errors.conductName && <div style={{ color: "red", fontSize: 11, marginTop: 4 }}>Required</div>}
          </Field>
        </Section>

        {/* Submit */}
        <button
          onClick={handleSubmit}
          style={{
            width: "100%", padding: "16px 24px",
            background: GREEN, color: GOLD,
            border: "none", borderRadius: 12,
            fontFamily: "inherit", fontWeight: 900,
            fontSize: 16, letterSpacing: 2,
            textTransform: "uppercase", cursor: "pointer",
            boxShadow: "0 4px 20px rgba(7,24,16,0.3)",
          }}>
          {loading ? "Submitting..." : "Submit Registration →"}
        </button>
        <div style={{ textAlign: "center", fontSize: 12, color: "#888", marginTop: 12, lineHeight: 1.6 }}>
          Submitting this form does not guarantee a spot.<br />
          Valerie will review and confirm your registration by email.
        </div>
      </div>
    </div>
  );
}
