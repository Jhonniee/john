# FixTogether Backend (Minimal)

This small Express server serves the frontend (one directory up) and provides:

- `POST /webhook/paystack` — a demo endpoint to receive Paystack webhooks.
- `GET /create-checkout?plan=...&mode=...` — server-side redirect to Paystack checkout URLs.

Quick start:

```bash
cd backend
npm install
npm start
```

Visit http://localhost:3000 to view the frontend.

Notes:

- In production you must verify webhook signatures and secure endpoints.
- Replace placeholder Paystack URLs with your real checkout links.
