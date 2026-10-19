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

After deploy, do this once in Netlify:

1. **Site** → **Forms** → **Enable form detection** (if shown)
2. Redeploy (this push triggers one) so Netlify registers the form
3. **Forms** → **Submission notifications** → **Add notification**
   - Type: **Email notification**
   - Email to: **prem@ecomads.com**
   - Form: **contact** (or all forms)
4. Save, then test https://ecomads.com/contact.html

Submissions also appear under **Forms** in the Netlify dashboard.
