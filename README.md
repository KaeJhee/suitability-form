# Ghost Strategies Client Onboarding

TSSB-compliant multi-step suitability and onboarding intake. Built with Next.js 14 (App Router), Tailwind CSS, Framer Motion, and Resend for email notifications.

## Stack

- Next.js 14 (App Router)
- React 18
- Tailwind CSS 3
- Framer Motion 11
- Resend (transactional email)

## Project Structure

```
client-suitability-form/
├── app/
│   ├── api/submit/route.js       # POST handler, Resend email
│   ├── globals.css
│   ├── layout.js
│   └── page.js
├── components/
│   ├── BubbleSelector.jsx        # Floating Framer Motion bubbles
│   ├── MultiStepForm.jsx         # State container, phase router
│   ├── ProgressBar.jsx
│   └── phases/
│       ├── Phase1BasicInfo.jsx       # TSSB suitability fields
│       ├── Phase2AssetClasses.jsx    # Bubble UI (risk-conditional)
│       ├── Phase3Industries.jsx      # Bubble UI
│       ├── Phase4Investments.jsx     # Bubble UI (risk-conditional)
│       ├── Phase5LossAversion.jsx    # Single-select
│       ├── Phase6ProfitTaking.jsx    # Single-select
│       ├── Phase7Services.jsx        # Multi-select + submit
│       └── Phase8Congrats.jsx        # Animated completion
├── lib/
│   └── formData.js               # All option arrays + initial state
├── .env.local.example
├── .gitignore
├── jsconfig.json
├── next.config.js
├── package.json
├── postcss.config.js
└── tailwind.config.js
```

## Setup

### 1. Install dependencies

```bash
npm install
```

### 2. Configure environment

```bash
cp .env.local.example .env.local
```

Edit `.env.local`:

```
RESEND_API_KEY=re_your_actual_key
ADMIN_EMAIL=kris@ghoststrategies.io
FROM_EMAIL=onboarding@resend.dev
```

Get a Resend API key at https://resend.com/api-keys (free tier: 3,000 emails/month, 100/day).

For production, verify your domain at https://resend.com/domains and use a sender like `noreply@ghoststrategies.io` for `FROM_EMAIL`. Until then, `onboarding@resend.dev` works for testing.

### 3. Run dev server

```bash
npm run dev
```

Open http://localhost:3000.

### 4. Build for production

```bash
npm run build
npm start
```

## How It Works

**State management.** `MultiStepForm.jsx` holds all form state in a single `useState` object. Each phase component receives `formData`, `updateField`, `next`, and `back` as props. Phase 7 additionally receives `onSubmit`, `submitting`, and `submitError`.

**Conditional logic.** Phase 1's `riskTolerance` answer (Conservative / Moderate / Aggressive) drives which bubble sets render in Phase 2 (asset classes) and Phase 4 (specific investments). The mapping lives in `lib/formData.js` under `assetClassesByRisk` and `investmentsByRisk`.

**Bubble animations.** `BubbleSelector.jsx` generates randomized positions and float parameters (drift distance, duration, delay, size) on mount, then drives them with Framer Motion's `animate` prop on infinite easeInOut loops. Selected bubbles scale up and gain a glow via the `bubble-glow` utility in `globals.css`.

**Email pipeline.** On submit, the client POSTs `formData` to `/api/submit`. The route validates required fields, looks up display labels for selected option IDs, formats everything into a styled HTML email, and sends it via Resend to `ADMIN_EMAIL` with `replyTo` set to the prospect's email.

## Deploy to GitHub

Run from the project root:

```bash
git init
git add .
git commit -m "Initial commit: TSSB client onboarding form"
git branch -M main
```

Create a new repo at https://github.com/new (do NOT initialize with README/license/gitignore since you already have them locally). Then:

```bash
git remote add origin https://github.com/YOUR_USERNAME/client-suitability-form.git
git push -u origin main
```

## Deploy to Vercel

The fastest path:

```bash
npm install -g vercel
vercel
```

Follow the prompts to link your GitHub repo. Add the three environment variables (`RESEND_API_KEY`, `ADMIN_EMAIL`, `FROM_EMAIL`) in the Vercel dashboard under Project Settings > Environment Variables, then redeploy.

## Compliance Note

This form collects the standard suitability information required under Texas Administrative Code Title 7, Part 7 for registered investment advisor onboarding. It is a starting point. Have your compliance counsel review final field choices, retention policies, and disclosures before going live with real clients. Form submissions are emailed but not currently persisted to a database, so add a storage layer (Postgres, Supabase, Firestore) before relying on this for any record-keeping obligations under TAC §116.

## Customization

- **Add or change options.** Edit the arrays in `lib/formData.js`. All phases pull from there.
- **Change colors.** Edit `tailwind.config.js` (the `ghost.*` palette) and `globals.css` (CSS variables).
- **Change phase order or count.** Update `TOTAL_PHASES` and the `switch` block in `MultiStepForm.jsx`.
- **Add database persistence.** Insert a write call in `app/api/submit/route.js` before the Resend call.
