import { Link } from 'react-router-dom'

const G = '#071810'
const GOLD = '#F5C400'
const CREAM = '#F5F0E8'

export default function Home() {
  return (
    <div style={{ background: CREAM, minHeight: '100vh' }}>

      {/* Hero */}
      <div style={{
        background: `linear-gradient(158deg, #071810 0%, #0F3320 50%, #175E2E 100%)`,
        padding: '56px 40px 48px',
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden',
      }}>
        <div style={{ fontSize: 11, fontWeight: 800, letterSpacing: 4, color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase', marginBottom: 8 }}>
          Summer 2026
        </div>
        <div style={{ fontFamily: 'Georgia, serif', fontSize: 72, fontWeight: 900, color: '#fff', letterSpacing: 4, lineHeight: 1 }}>
          CAMP
        </div>
        <div style={{ fontFamily: 'Georgia, serif', fontSize: 56, fontWeight: 900, color: GOLD, letterSpacing: 4, lineHeight: 1, marginBottom: 16 }}>
          MAHOGANY
        </div>
        <div style={{ color: 'rgba(255,255,255,0.7)', fontSize: 15, fontWeight: 600, marginBottom: 32 }}>
          A Summer Enrichment Experience · Mahogany Place, Brampton ON
        </div>
        <Link to="/register" style={{
          display: 'inline-block',
          background: GOLD, color: G,
          padding: '14px 36px', borderRadius: 50,
          fontWeight: 900, fontSize: 15, letterSpacing: 1.5,
          textTransform: 'uppercase',
        }}>
          ⚡ Register Now — Limited Spots
        </Link>
      </div>

      {/* Info grid */}
      <div style={{ maxWidth: 700, margin: '0 auto', padding: '40px 24px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 14, marginBottom: 40 }}>
          {[
            { label: 'Dates', value: 'Jul 6 – Aug 7', sub: '2026' },
            { label: 'Ages',  value: '4 – 10/11',    sub: 'Years old' },
            { label: 'Hours', value: '9:30AM',        sub: '– 4:30PM daily' },
          ].map(item => (
            <div key={item.label} style={{
              background: G, color: '#fff', borderRadius: 12,
              padding: '20px 16px', textAlign: 'center',
            }}>
              <div style={{ fontSize: 10, letterSpacing: 2.5, color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase', marginBottom: 6 }}>{item.label}</div>
              <div style={{ fontFamily: 'Georgia, serif', fontSize: 24, fontWeight: 900, color: GOLD }}>{item.value}</div>
              <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.6)', marginTop: 4 }}>{item.sub}</div>
            </div>
          ))}
        </div>

        {/* Pricing */}
        <div style={{ fontWeight: 900, fontSize: 12, letterSpacing: 3, textTransform: 'uppercase', color: G, borderLeft: `4px solid ${GOLD}`, paddingLeft: 10, marginBottom: 14 }}>
          Pricing
        </div>
        <div style={{ display: 'flex', gap: 12, marginBottom: 40 }}>
          <div style={{ flex: 1, background: G, color: '#fff', borderRadius: 12, padding: '20px', textAlign: 'center' }}>
            <div style={{ fontFamily: 'Georgia, serif', fontSize: 42, color: GOLD, lineHeight: 1 }}>$200</div>
            <div style={{ fontSize: 13, opacity: 0.8, marginTop: 6 }}>Full 5 Weeks · Best Value</div>
          </div>
          <div style={{ flex: 1, background: '#fff', border: `2.5px solid ${G}`, borderRadius: 12, padding: '20px', textAlign: 'center' }}>
            <div style={{ fontFamily: 'Georgia, serif', fontSize: 42, color: G, lineHeight: 1 }}>$50</div>
            <div style={{ fontSize: 13, color: G, opacity: 0.8, marginTop: 6 }}>Per Week · Flexible</div>
          </div>
        </div>

        {/* Activities */}
        <div style={{ fontWeight: 900, fontSize: 12, letterSpacing: 3, textTransform: 'uppercase', color: G, borderLeft: `4px solid ${GOLD}`, paddingLeft: 10, marginBottom: 14 }}>
          What Your Child Will Experience
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginBottom: 40 }}>
          {['📚 Educational Workshops','🎨 Arts, Crafts & Games','🎵 Music & Dance','🤝 Social Skills Building','🚌 Field Trips & Outings','⭐ Caring, Guided Staff'].map(a => (
            <div key={a} style={{ background: '#fff', border: '1.5px solid #ddd', borderRadius: 7, padding: '10px 14px', fontSize: 13, fontWeight: 700 }}>{a}</div>
          ))}
        </div>

        {/* CTA */}
        <Link to="/register" style={{
          display: 'block', width: '100%',
          background: G, color: GOLD,
          padding: '16px', borderRadius: 12,
          fontWeight: 900, fontSize: 15, letterSpacing: 2,
          textTransform: 'uppercase', textAlign: 'center',
        }}>
          Register Now →
        </Link>
        <div style={{ textAlign: 'center', fontSize: 12, color: '#888', marginTop: 10 }}>
          📍 7820 McLaughlin Rd S, Brampton ON &nbsp;·&nbsp; ✉️ vc_mahoganyplace@bellnet.ca
        </div>
      </div>
    </div>
  )
}
