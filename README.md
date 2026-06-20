# Camp Mahogany 2026 🌴

Summer enrichment camp registration system — built with React + Vite.

## Pages
| Route | Description |
|-------|-------------|
| `/` | Home page with camp info |
| `/register` | Parent registration form + Code of Conduct |
| `/admin/qr` | QR code generator (paste form URL → get QR) |
| `/admin/dashboard` | Valerie's view of all submissions |

## Setup

```bash
npm install
npm run dev
```

## Deploy
```bash
npm run build
# Upload /dist folder to Netlify, Vercel, or any static host
```

## Stack
- React 18
- React Router v6
- Vite
- Pure CSS (no UI library)

## Next Steps
- [ ] Connect form to a backend (Google Apps Script → Google Sheet, or Supabase)
- [ ] Replace mock data in Dashboard with live API calls
- [ ] Generate real QR code once form URL is live
- [ ] Add email notifications when new registration comes in
