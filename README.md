# Boost Track: Rapid Frontend Development for Backend APIs

Boost Track is a React starter for backend developers who need a frontend for their API fast. It ships with the authentication screens, protected routes and API plumbing already wired up, so you can start building the parts specific to your app.

## Key Features

- **Ready-to-use authentication screens:** sign in, sign up, email confirmation, password reset request and password reset.
- **Protected routing:** separate guards for signed-in users (`/dashboard`) and admins (`/admin`), with automatic redirects for expired or invalid sessions.
- **API client:** a preconfigured axios instance that attaches the bearer token to every request and signs the user out on a `401`.
- **Tailwind CSS:** utility-first styling, responsive from mobile to desktop.
- **Modern tooling:** Vite, React Router 7, Vitest and ESLint.

## Getting Started

Requires **Node.js 20.19+ or 22.12+**.

1. Clone the repository.
2. Install dependencies:
   ```sh
   npm install
   ```
3. Point the app at your API:
   ```sh
   cp .env.example .env
   # then set VITE_API_URL, e.g. VITE_API_URL=http://localhost:8000
   ```
4. Start the dev server on http://localhost:3000:
   ```sh
   npm start
   ```

## Scripts

| Command           | What it does                              |
| ----------------- | ----------------------------------------- |
| `npm start`       | Start the dev server (alias: `npm run dev`) |
| `npm run build`   | Build for production into `build/`        |
| `npm run preview` | Serve the production build locally        |
| `npm test`        | Run the tests with Vitest                 |
| `npm run lint`    | Lint with ESLint                          |

## Backend API Contract

Boost Track expects the API (FastAPI-style, but any framework works) to provide:

| Method & path                     | Input                                             | Returns                                 |
| --------------------------------- | ------------------------------------------------- | --------------------------------------- |
| `POST /auth/token`                | form fields `username` (email), `password`         | `{ "access_token": "<JWT>" }`           |
| `POST /auth/users/`               | JSON `{ email, password, full_name }`              | created user                            |
| `POST /auth/confirm_email/`       | query `token`                                     | success                                 |
| `POST /auth/request_password_reset/` | query `email`                                  | success                                 |
| `POST /auth/reset_password/`      | query `token`, `new_password`                     | success                                 |

- The JWT should include an `exp` claim. A `user: "admin"` claim sends the user to the admin area.
- Errors should return `{ "detail": "message" }` (or FastAPI's list of validation errors). Boost Track shows them as toasts.
- Confirmation and reset emails should link to `/auth/confirm-email?token=…` and `/auth/password/reset?token=…` on the frontend.

### Security notes

- Route guards in the browser are for UX only. **Your API must enforce authentication and admin permissions on every endpoint.**
- The token is stored in `localStorage`. For stronger protection against XSS, have the API issue an httpOnly cookie instead.
- `reset_password` currently sends the new password as a query parameter, which can end up in server logs. Prefer accepting it in the request body and update `src/services/auth.js` to match.
