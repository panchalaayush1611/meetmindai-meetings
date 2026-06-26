# MeetMind AI — Frontend

An enterprise-grade UI for an AI meeting intelligence platform. Built as a frontend-only
showcase with realistic mock data — no backend required to run it.

## Stack

- **React 19** + **Vite**
- **Redux Toolkit** for app state (meetings, tasks, notifications, workspace, chat, auth, UI)
- **React Router v7** for routing, with a mock auth guard on the app shell
- **Tailwind CSS** for styling, themed to the MeetMind color palette (light + dark mode)
- **Framer Motion** for transitions and micro-interactions
- **Recharts** for the Analytics dashboard
- **React Hook Form** for Login / Register / Settings / Invite forms

## Getting started

```bash
npm install
npm run dev
```

Then open the printed local URL. Click **"Start for free"** on the landing page (or just
hit Login — any email/password works, this is a frontend demo) to get into the app.

```bash
npm run build     # production build to /dist
npm run preview   # preview the production build locally
npm run lint       # oxlint
```

## What's real vs. mocked

This is a **frontend-only** build, as specified — there's no backend or database.

- All data (meetings, transcripts, tasks, team members, analytics, notifications) lives in
  `src/data/*.js` and is loaded into Redux on startup.
- **Upload Meeting** actually runs through a simulated processing flow (transcribing →
  analyzing → done) and adds a real entry to the Meetings list.
- The **AI Assistant** does simple keyword matching against the mock meeting corpus in
  `src/services/mockApi.js` to decide which meeting to "answer from" — swap this function
  out for a real LLM call (e.g. the Anthropic API) and the rest of the chat UI keeps working
  as-is.
- Marking tasks done, inviting teammates, adding comments, exporting a meeting summary
  (real `.md`/`.txt` file download), and dark mode are all functional, just backed by
  Redux state instead of a server.

## Project structure

```
src/
├── assets/        
├── components/     # organized by feature: common, layout, meetings, dashboard,
│                    # workspace, analytics, assistant, tasks, landing, settings
├── layouts/         # DashboardLayout, AuthLayout, PublicLayout
├── pages/           # one file per route
├── hooks/           # useDebounce, useOutsideClick
├── services/        # mockApi.js — swap for real API calls later
├── redux/           # store + slices
├── routes/          # AppRoutes.jsx
├── utils/           # date + formatting helpers
├── constants/       # nav items, route paths
├── context/         # ThemeContext (light/dark)
└── data/            # mock dataset (meetings, members, tasks, analytics, landing copy)
```

## Notes

- Built with the enterprise palette and design direction specified for the project
  (Linear / Notion / Stripe-style: lots of whitespace, soft shadows, minimal color).
- The production bundle is a single ~970KB chunk (Recharts + Framer Motion are the biggest
  contributors). For a real deployment, look at route-based `lazy()` code-splitting in
  `src/routes/AppRoutes.jsx`.
