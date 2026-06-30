# Production Preparation

## Environment Variables

Required public variables:

```env
NEXT_PUBLIC_API_URL=http://localhost:8000
```

Optional public variables:

```env
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

`NEXT_PUBLIC_*` variables are embedded into the browser bundle. Do not put secrets,
JWT secrets, database credentials, private API keys, admin tokens, or other private
values in them.

## Local Configuration

Use an ignored local file for development:

```env
# .env.local
NEXT_PUBLIC_API_URL=http://localhost:8000
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

Only `.env.example` should be committed. Real `.env.local` and `.env.production`
files must stay ignored by Git.

## Production Configuration

Configure production values on the server or deployment platform:

```env
NEXT_PUBLIC_API_URL=http://167.99.241.255
NEXT_PUBLIC_SITE_URL=https://your-production-domain.example
```

Do not commit `.env.production`. If one is created locally for testing, it must stay
ignored by Git.

## API URL Convention

`NEXT_PUBLIC_API_URL` contains only the API origin:

```txt
http://localhost:8000
http://167.99.241.255
```

The shared API client appends `/v1` centrally. Feature and entity API functions must
not hardcode API origins.

## Image Hosts

`next.config.ts` allows optimized remote images from:

- local development API hosts: `localhost` and `127.0.0.1`
- production API host: `167.99.241.255`

If production media moves to a real domain or HTTPS host, update `images.remotePatterns`.

## Build And Validation

Use the normal Next.js production build flow:

```bash
pnpm run typecheck
pnpm run lint
pnpm run build
pnpm run validate
```

Do not disable production optimization or add custom minification packages. Frontend
minification is not a security boundary.

## Security Checklist

- Keep private values out of `NEXT_PUBLIC_*` variables.
- Use deployment environment variables for production configuration.
- Keep `poweredByHeader` disabled.
- Keep basic security headers enabled.
- Do not add a strict Content Security Policy until images, fonts, scripts, and other
  external resources are fully verified.
- Use HTTPS and a real production domain instead of plain HTTP IP access.

The backend must enforce real permissions and validation for:

- create-ad requests
- edit-ad requests
- delete-ad requests
- image uploads
- authenticated user ownership

Frontend checks improve UX only. They do not protect backend data or permissions.

## Remaining Risks And TODOs

- Replace plain HTTP API access with HTTPS before real production traffic.
- Replace the IP-based API host with a real domain when DNS and TLS are ready.
- Revisit Content Security Policy after production asset hosts are finalized.
