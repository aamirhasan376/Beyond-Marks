# Beyond Marks

A calm, self-discovery app to help students find a direction based on how they
naturally think and act — not their marks.

## Run it locally
```
npm install
npm run dev
```

## Build for deployment (e.g. Netlify)
```
npm run build
```
Outputs a `dist/` folder — connect your GitHub repo to Netlify with build
command `npm run build` and publish directory `dist`.

## Testing
```
npx vitest run
```
Runs an automated smoke test: signup → dashboard → answering the first
question → dark mode toggle.

## Usage logging (signups & logins → Google Sheet)
`src/context/AuthContext.jsx` has a `USAGE_LOG_URL` constant near the top.
Paste your Google Apps Script Web App URL there and every signup/login will
append a row (timestamp, event, name, email) to your Google Sheet. Leave it
blank to disable — the app works exactly the same either way.

## Important note on accounts
Login/signup is **local-only** — accounts and passwords are stored in the
browser's `localStorage`, unencrypted. Fine for demoing to friends, but:
- Progress won't follow a user across devices or browsers
- Not secure — don't use real passwords with this version
- Clearing browser data wipes all accounts and progress

When ready to launch for real, swap `AuthContext.jsx` for a real backend
(Firebase Auth is the easiest option and pairs well with Netlify hosting).

## Design notes
- Footer appears only on the Home (landing) page.
- Dark mode defaults to light on first visit, toggles from the header (Home)
  or the hamburger menu (logged-in pages).
- Responsive down to small phone widths.

## Project structure
- `src/pages/` — Home, Login, Signup, Dashboard, Reflect (quiz + reveal +
  journal + decision flow), Progress (history), Career Paths
- `src/context/` — AuthContext (local accounts + usage logging), ThemeContext
- `src/data/` — questions, zones, career paths, progress storage helpers
- `src/components/` — Footer, HamburgerMenu, AppHeader, ProtectedRoute
