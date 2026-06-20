import { useState, useEffect } from 'react'

// ── Same URL as the form — just a GET request ────────────────
const BACKEND_URL = "YOUR_APPS_SCRIPT_URL_HERE";
// ────────────────────────────────────────────────────────────

const G    = '#071810'
const GOLD = '#F5C400'
const CREAM = '#F5F0E8'

const STATUS_STYLE = {
  Pending:  { bg: '#FFF8E0', color: '#8B6900', border: '#FFCE3D' },
  Approved: { bg: '#E8F5E9', color: '#1B5E20', border: '#4CAF50' },
  Declined: { bg: '#FFEBEE', color: '#B71C1C', border: '#EF5350' },
}

export default function Dashboard() {
  const [registrations, setRegistrations] = useState([])
  const [loading, setLoading]             = useState(true)
  const [error, setError]                 = useState(null)
  const [filter, setFilter]               = useState('All')

  useEffect(() => {
    fetchRegistrations()
  }, [])

  const fetchRegistrations = async () => {
    setLoading(true)
    setError(null)
    try {
      const res  = await fetch(BACKEND_URL)
      const json = await res.json()
      setRegistrations(json.registrations || [])
    } catch (err) {
      setError('Could not load registrations. Check BACKEND_URL is set.')
    } finally {
      setLoading(false)
    }
  }

  const filtered = filter === 'All'
    ? registrations
    : registrations.filter(r => r['Status'] === filter)

  const count = (s) => registrations.filter(r => r['Status'] === s).length

  return (
    <div style={{ background: CREAM, minHeight: '100vh' }}>

      {/* Header */}
      <div style={{ background: G, padding: '24px 32px' }}>
        <div style={{ maxWidth: 900, margin: '0 auto' }}>
          <div style={{ fontSize: 10, fontWeight: 800, letterSpacing: 4, color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase', marginBottom: 4 }}>
            Admin · Summer 2026
          </div>
          <div style={{ fontFamily: 'Georgia, serif', fontSize: 28, fontWeight: 900, color: '#fff', letterSpacing: 2 }}>
            REGISTRATIONS <span style={{ color: GOLD }}>DASHBOARD</span>
          </div>
          <div style={{ color: 'rgba(255,255,255,0.6)', fontSize: 13, marginTop: 6 }}>
            Live data from Google Sheets · Review, approve or decline applications
          </div>
        </div>
      </div>

      <div style={{ maxWidth: 900, margin: '0 auto', padding: '28px 24px' }}>

        {/* Stats */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12, marginBottom: 28 }}>
          {[
            { label: 'Total',    value: registrations.length, color: G },
            { label: 'Pending',  value: count('Pending'),     color: '#8B6900' },
            { label: 'Approved', value: count('Approved'),    color: '#1B5E20' },
            { label: 'Declined', value: count('Declined'),    color: '#B71C1C' },
          ].map(s => (
            <div key={s.label} style={{ background: '#fff', borderRadius: 10, padding: '16px 18px', borderLeft: `4px solid ${s.color}` }}>
              <div style={{ fontSize: 9, fontWeight: 800, letterSpacing: 2, textTransform: 'uppercase', color: '#aaa', marginBottom: 6 }}>{s.label}</div>
              <div style={{ fontFamily: 'Georgia, serif', fontSize: 34, fontWeight: 900, color: s.color, lineHeight: 1 }}>{s.value}</div>
            </div>
          ))}
        </div>

        {/* Filter tabs + refresh */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
          <div style={{ display: 'flex', gap: 8 }}>
            {['All', 'Pending', 'Approved', 'Declined'].map(f => (
              <button key={f} onClick={() => setFilter(f)} style={{
                padding: '7px 16px', borderRadius: 50, border: 'none',
                fontWeight: 700, fontSize: 12, cursor: 'pointer', letterSpacing: 0.5,
                background: filter === f ? G : '#fff',
                color: filter === f ? GOLD : G,
                boxShadow: '0 1px 4px rgba(0,0,0,0.1)',
              }}>{f}</button>
            ))}
          </div>
          <button onClick={fetchRegistrations} style={{
            padding: '7px 16px', borderRadius: 50,
            border: `2px solid ${G}`, background: 'transparent',
            color: G, fontWeight: 700, fontSize: 12, cursor: 'pointer',
          }}>
            ↻ Refresh
          </button>
        </div>

        {/* Loading / Error / Empty */}
        {loading && (
          <div style={{ textAlign: 'center', padding: '48px', color: '#888', fontSize: 14 }}>
            Loading registrations...
          </div>
        )}
        {error && (
          <div style={{ background: '#FFEBEE', border: '2px solid #EF5350', borderRadius: 10, padding: '16px 20px', color: '#B71C1C', fontSize: 13, marginBottom: 16 }}>
            ⚠️ {error}
          </div>
        )}
        {!loading && !error && filtered.length === 0 && (
          <div style={{ textAlign: 'center', padding: '48px', color: '#888', fontSize: 14 }}>
            No registrations yet.
          </div>
        )}

        {/* Registration cards */}
        {!loading && filtered.map((reg, i) => {
          const status = reg['Status'] || 'Pending'
          const sc     = STATUS_STYLE[status] || STATUS_STYLE.Pending
          return (
            <div key={i} style={{
              background: '#fff', borderRadius: 12, padding: '20px 24px',
              marginBottom: 14, border: '1.5px solid #e8e0d0',
              boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 14 }}>
                <div>
                  <div style={{ fontWeight: 900, fontSize: 17, color: G }}>{reg['Child Name']}</div>
                  <div style={{ fontSize: 12, color: '#888', marginTop: 2 }}>
                    Age {reg['Child Age']} · {reg['Enrollment']}
                  </div>
                </div>
                <div style={{
                  background: sc.bg, color: sc.color, border: `1.5px solid ${sc.border}`,
                  borderRadius: 50, padding: '4px 14px',
                  fontSize: 11, fontWeight: 900, letterSpacing: 1, textTransform: 'uppercase',
                }}>{status}</div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 14 }}>
                {[
                  ['Parent',      reg['Parent Name']],
                  ['Email',       reg['Parent Email']],
                  ['Phone',       reg['Parent Phone']],
                  ['Emergency',   `${reg['Emergency Name']} — ${reg['Emergency Phone']}`],
                  ['Medical',     reg['Medical Conditions']],
                  ['Allergies',   reg['Allergies']],
                  ['Heard via',   reg['Heard About Us']],
                  ['Submitted',   reg['Submitted At'] ? new Date(reg['Submitted At']).toLocaleDateString('en-CA') : ''],
                ].map(([label, val]) => (
                  <div key={label}>
                    <div style={{ fontSize: 9, fontWeight: 800, letterSpacing: 2, textTransform: 'uppercase', color: '#aaa', marginBottom: 2 }}>{label}</div>
                    <div style={{ fontSize: 13, fontWeight: 600, color: G }}>{val || '—'}</div>
                  </div>
                ))}
              </div>

              {reg["Goal / Reason"] && (
                <div style={{ background: CREAM, borderRadius: 7, padding: '10px 14px', fontSize: 13, color: '#444', lineHeight: 1.6, marginBottom: 14 }}>
                  <strong style={{ color: G }}>Parent's goal: </strong>{reg["Goal / Reason"]}
                </div>
              )}

              {status === 'Pending' && (
                <div style={{ display: 'flex', gap: 10 }}>
                  <button style={{
                    flex: 1, padding: '10px', borderRadius: 8, border: 'none',
                    background: '#E8F5E9', color: '#1B5E20',
                    fontWeight: 900, fontSize: 13, cursor: 'pointer',
                  }}>✓ Approve</button>
                  <button style={{
                    flex: 1, padding: '10px', borderRadius: 8, border: 'none',
                    background: '#FFEBEE', color: '#B71C1C',
                    fontWeight: 900, fontSize: 13, cursor: 'pointer',
                  }}>✕ Decline</button>
                  <a href={`mailto:${reg['Parent Email']}?subject=Camp Mahogany 2026 — Your Application`}
                    style={{
                      padding: '10px 18px', borderRadius: 8, textDecoration: 'none',
                      border: `2px solid ${G}`, color: G,
                      fontWeight: 900, fontSize: 13,
                    }}>✉ Email</a>
                </div>
              )}
              {status === 'Approved' && (
                <div style={{ fontSize: 12, color: '#1B5E20', fontWeight: 700 }}>✓ Confirmed</div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
