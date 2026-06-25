# Auth Implementation Report

## Changed files

- `src/shared/config/api.ts`
- `src/shared/api/client.ts`
- `src/shared/api/errors.ts`
- `src/shared/api/index.ts`
- `src/shared/api/types.ts`
- `src/entities/user/index.ts`
- `src/entities/user/model/types.ts`
- `src/app/layout.tsx`
- `src/app/providers.tsx`
- `src/app/sign-in/page.tsx`
- `src/app/sign-up/page.tsx`
- `src/features/auth/index.ts`
- `src/features/auth/api/auth-api.ts`
- `src/features/auth/model/auth-errors.ts`
- `src/features/auth/model/auth-session.tsx`
- `src/features/auth/model/auth-storage.ts`
- `src/features/auth/ui/header-auth-actions.tsx`
- `src/features/auth/ui/sign-in-form.tsx`
- `src/features/auth/ui/sign-up-form.tsx`
- `src/views/sign-in-page/index.ts`
- `src/views/sign-in-page/ui/sign-in-page.tsx`
- `src/views/sign-up-page/index.ts`
- `src/views/sign-up-page/ui/sign-up-page.tsx`
- `src/widgets/site-header/ui/site-header.tsx`

## Auth data flow

1. Sign-in and sign-up forms keep local input, submit loading, field errors, and general error state.
2. Forms call `useAuthSession().login` or `useAuthSession().register`.
3. The auth session model maps form-friendly credentials to auth request DTOs.
4. Auth API functions call `/auth/login`, `/auth/register`, `/auth/me`, and `/auth/logout` through `shared/api`.
5. Auth response DTOs are mapped to the frontend `User` domain model before entering session state.
6. Successful login/register stores the token and sets session status to `authenticated`.
7. Session restoration reads the token, calls `GET /auth/me`, and clears token/user when the API returns `401`.
8. Logout calls `POST /auth/logout` when a token exists, then always clears frontend token and user.

## Provider placement

`src/app/layout.tsx` remains a server component. It renders `src/app/providers.tsx`, which is a client component and wraps children with `AuthSessionProvider`.

## Shared API and auth dependency rule

`shared/api` does not import auth storage, auth session, or feature code. It accepts an optional `authToken` request option and attaches `Authorization: Bearer <token>` only when that option is provided.

## Token storage decision

The MVP stores the Sanctum bearer token in `localStorage` through `src/features/auth/model/auth-storage.ts`.

This keeps storage access isolated and simple for MVP, but it is vulnerable to token exposure if the app has an XSS issue. A safer production storage strategy remains an open decision.

## Known limitations

- No refresh tokens are implemented.
- No roles or permissions are implemented.
- No route protection is implemented yet.
- Email verification is not enforced by the frontend because login currently does not require verified email.
- If `GET /auth/me` fails for a non-`401` reason during restoration, the UI becomes unauthenticated for that render and the token is not cleared.
- Manual backend/browser testing was not executed in this environment.

## Manual test checklist result

- User can register: not run.
- Token is stored after registration: not run.
- User can log in: not run.
- Token is stored after login: not run.
- Authenticated requests include `Authorization: Bearer <token>`: implemented, not manually inspected against backend.
- Page reload restores the session through `GET /auth/me`: implemented, not manually tested.
- Wrong login credentials show backend validation error: implemented for `422` field errors, not manually tested.
- Duplicate email during registration shows backend validation error: implemented for `422` field errors, not manually tested.
- Logout calls backend and clears local auth state: implemented, not manually tested.
- Invalid token causes frontend auth state to be cleared: implemented for `401`, not manually tested.

## Validation results

- `pnpm run typecheck`: passed.
- `pnpm run lint`: passed.
- `pnpm run build`: passed.
- Scoped Prettier check for auth-related touched files: passed.
- `pnpm run format:check`: failed because existing unrelated files are not formatted. The new auth-related files were formatted and passed the scoped check.
