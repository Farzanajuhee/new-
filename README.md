# T-Axis Booking — Next.js Demo

Next.js 14 (App Router) + TypeScript + Tailwind rebuild of the T-Axis Booking product
demo (client booking view + owner dashboard view), based on Mathias The Barber.
Now includes a **live Stripe deposit payment** and a **live AI booking concierge** —
both real integrations, not mockups, once you drop in API keys.

## Run it

```bash
npm install
cp .env.example .env.local   # then fill in your keys
npm run dev
```

Open http://localhost:3000

Without keys in `.env.local` the app still runs — the payment modal and AI chat
will just show a "not configured" message instead of erroring the whole page.

## What's real vs. what's still a stub

| Feature | Status |
|---|---|
| Stripe deposit payment (Payment Element: card, iDEAL, Apple/Google Pay) | **Live** — needs `STRIPE_SECRET_KEY` + `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` |
| AI booking concierge chat (answers questions using shop data as context) | **Live** — needs `AI_API_KEY`, works with Claude or OpenAI |
| AI "best time to book" chip, AI dashboard insights (no-show risk, pricing tip, busy-hour prediction) | Demo data in `lib/demo-data.ts` — the *pattern* is real, the numbers aren't computed from real bookings yet |
| Actually saving a booking, sending the WhatsApp reminder, per-shop multi-tenancy | Not built — see below |

## Structure

- `app/page.tsx` — tab state, switches between the two views
- `components/BookingView.tsx` — client-facing booking flow (services, slots, AI time
  suggestion, deposit payment, WhatsApp reminder preview, about, team, gallery, address)
- `components/DashboardView.tsx` — owner metrics, AI insights card, per-chair commission view
- `components/DepositPaymentModal.tsx` — Stripe Elements payment form
- `components/AIConcierge.tsx` — floating chat widget wired to `/api/ai-concierge`
- `app/api/create-deposit-intent/route.ts` — creates the Stripe PaymentIntent server-side
- `app/api/ai-concierge/route.ts` — calls the AI provider with shop data as system context
- `lib/demo-data.ts` — all demo content in one place, edit this first to reskin for
  another shop
- `app/globals.css` — Tailwind base + the two custom bits (ticket-slot notches, hero glow)

## Wiring this up for real

Still needed to go from demo to product:

- A database (Postgres via Prisma/Supabase) for shops, barbers, services, bookings —
  right now `lib/demo-data.ts` is the only "database"
- Auth for shop owners (Clerk/Auth.js) and a public booking route per shop (`/[shopSlug]`)
- **Stripe Connect** instead of a single platform account, so each shop's deposits land
  in *their* bank account — see the comment in `create-deposit-intent/route.ts`
- WhatsApp Business API (or Twilio) to actually send the reminder shown in the preview
- A cron/queue (Vercel Cron + a jobs table) to fire reminders 24h out and compute the
  AI insights (no-show risk, busy-hour prediction) from real booking history instead
  of the demo data
- Rate limiting on `/api/ai-concierge` before this goes anywhere public — it's an
  unauthenticated route calling a paid API right now
