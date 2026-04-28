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

## How It Works

**State management.** `MultiStepForm.jsx` holds all form state in a single `useState` object. Each phase component receives `formData`, `updateField`, `next`, and `back` as props. Phase 7 additionally receives `onSubmit`, `submitting`, and `submitError`.

**Conditional logic.** Phase 1's `riskTolerance` answer (Conservative / Moderate / Aggressive) drives which bubble sets render in Phase 2 (asset classes) and Phase 4 (specific investments). The mapping lives in `lib/formData.js` under `assetClassesByRisk` and `investmentsByRisk`.

**Bubble animations.** `BubbleSelector.jsx` generates randomized positions and float parameters (drift distance, duration, delay, size) on mount, then drives them with Framer Motion's `animate` prop on infinite easeInOut loops. Selected bubbles scale up and gain a glow via the `bubble-glow` utility in `globals.css`.

**Email pipeline.** On submit, the client POSTs `formData` to `/api/submit`. The route validates required fields, looks up display labels for selected option IDs, formats everything into a styled HTML email, and sends it via Resend to `ADMIN_EMAIL` with `replyTo` set to the prospect's email.


## Compliance Note

This form collects the standard suitability information required under Texas Administrative Code Title 7, Part 7 for registered investment advisor onboarding. It is a starting point. Have your compliance counsel review final field choices, retention policies, and disclosures before going live with real clients. Form submissions are emailed but not currently persisted to a database, so add a storage layer (Postgres, Supabase, Firestore) before relying on this for any record-keeping obligations under TAC §116.

