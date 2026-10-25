# FixTogether Backend (Minimal)

This small Express server serves the frontend (one directory up) and provides:

- `POST /webhook/paystack` — a demo endpoint to receive Paystack webhooks.
- `GET /create-checkout?plan=...&mode=...` — initializes a Paystack transaction and redirects to the real Paystack checkout page.

Quick start:

```bash
cd backend
npm install
cp .env.example .env
# Set PAYSTACK_SECRET_KEY in backend/.env
npm start
```

Visit http://localhost:3000 to view the frontend.

Notes:

- In production you must verify webhook signatures and secure endpoints.
- This implementation uses the Paystack `/transaction/initialize` API to generate a real hosted checkout URL.
- Use a valid Paystack secret key in `backend/.env`.
