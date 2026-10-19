# Ecomads website

Marketing site for [ecomads.com](https://ecomads.com) — multi-page static site for Netlify.

## Pages

| Page | URL |
|------|-----|
| Home | `/` |
| Services | `/services.html` |
| SEO | `/services/seo.html` |
| GEO | `/services/geo.html` |
| Paid Ads | `/services/paid-ads.html` |
| Google Business | `/services/google-business.html` |
| Vibe Coding | `/services/vibe-coding.html` |
| Approach | `/approach.html` |
| Contact | `/contact.html` |

## Local development

```bash
npm install
npm run dev
```

Then open:

- http://localhost:5173/
- http://localhost:5173/services.html
- http://localhost:5173/services/seo.html
- http://localhost:5173/approach.html
- http://localhost:5173/contact.html

## Build

```bash
npm run build
```

## Deploy to Netlify

1. Push this repo to GitHub
2. Netlify → **Import project** (settings in `netlify.toml`)
3. Add domain `ecomads.com` and update DNS

## Contact form (Netlify Forms → prem@ecomads.com)

After this deploy finishes, do this once in Netlify:

1. Open your site → **Forms**
2. If you see **Enable form detection**, click it, then **Deploys → Trigger deploy → Deploy site**
3. After that deploy, open **Forms** — you should see a form named **contact**
4. **Forms → Submission notifications → Add notification**
   - Email to: **prem@ecomads.com**
   - Form: **contact**
5. Test https://ecomads.com/contact.html — success goes to `/thanks.html`

If submit shows **404**, the form is not registered yet — repeat steps 2–3.
