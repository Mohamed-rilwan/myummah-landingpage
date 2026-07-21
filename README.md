# My Ummah — Landing Page

Marketing site for **My Ummah**, a complete mosque management platform by Albain Group Inc.

## Stack

- React 18 + Vite + TypeScript
- Three.js (`@react-three/fiber` / `drei`) — Sheikh Zayed Grand Mosque backdrop with scroll-linked camera
- Lenis — smooth scrolling
- GSAP ScrollTrigger — section reveals

## Live site (GitHub Pages)

After deploy: **https://myummah.co.uk/**  
(GitHub project URL also works if configured: `https://mohamed-rilwan.github.io/myummah-landingpage/` — use custom domain as primary; Vite `base` is `/` for the apex domain.)

Pushing to `main` builds and publishes automatically via GitHub Actions.

Add these repository secrets (Settings → Secrets and variables → Actions) so the contact form works in production:

- `VITE_EMAILJS_SERVICE_ID`
- `VITE_EMAILJS_TEMPLATE_ID`
- `VITE_EMAILJS_PUBLIC_KEY`

Enable Pages: **Settings → Pages → Source: Deploy from a branch → Branch: `gh-pages` / `/ (root)`**.

## Run locally

```bash
npm install
npm run dev
```

Open the local URL shown in the terminal (usually `http://localhost:5173`).

## Build

```bash
npm run build
npm run preview
```

## Sections

1. **Home** — brand hero over the mosque scene  
2. **Why** — challenges & objectives from the product presentation  
3. **Platform** — personal, subscriber, and mosque-admin experiences  
4. **Revenue** — free vs paid tiers and ad-share model  
5. **Team** — product & engineering team  
6. **Join** — mosque registration interest form (mailto)

## Brand

Navy / gold palette and Cinzel + Cormorant Garamond typography aligned with the My Ummah mobile splash experience.

## EmailJS setup (registration form)

1. Create a free account at [emailjs.com](https://www.emailjs.com/).
2. **Email Services** → Add **Gmail** → connect `managoor@gmail.com`.
3. **Email Templates** → Create a template with these variables:

```
Subject: My Ummah — Mosque registration: {{mosque}}

From: {{from_name}} <{{from_email}}>
Phone: {{phone}}
Mosque: {{mosque}}
City: {{city}}
Role: {{role}}

Message:
{{message}}
```

   Set **To Email** to `managoor@gmail.com` (or `{{to_email}}`).  
   Set **Reply To** to `{{reply_to}}` or `{{from_email}}`.

4. Copy **Service ID**, **Template ID**, and **Public Key** (Account → API Keys).
5. Copy `.env.example` to `.env` and paste the values:

```env
VITE_EMAILJS_SERVICE_ID=service_xxxxx
VITE_EMAILJS_TEMPLATE_ID=template_xxxxx
VITE_EMAILJS_PUBLIC_KEY=xxxxxxxxxxxx
```

6. Restart the dev server (`npm run dev`).

Free plan: ~200 emails/month.
