# FixTogether

Community-first repair, borrow/lend, and neighborhood coordination UI — "FixTogether".

## What this repo contains
 
- Frontend: Single-file static app at index.html (Tailwind CSS, vanilla JS)
- Backend: Minimal Express scaffold in `backend/` for static serving and Paystack webhook/redirect demo

- Frontend: Single-file static app at [index.html](index.html) (Tailwind CSS, vanilla JS)
- Backend: Minimal Express scaffold in [backend/server.js](backend/server.js) for static serving and Paystack webhook/redirect demo

## Local development

- Frontend: open `index.html` in a browser for a live preview (no build step).
- Backend (optional):

  cd backend
  npm install
  npm start

Backend serves the parent directory so you can visit `http://localhost:3000` to load the frontend.

## Notes

- Paystack checkout URLs in the repo are placeholders — replace them with your production links and verify webhook signature validation before going live.
- I renamed the local default branch to `main` and pushed it to the remote; update GitHub settings if you want `main` as the repository default.

## License

This repo contains original code updated interactively. Add a LICENSE file if you want to open-source it.
