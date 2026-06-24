# Context Update

## Purpose

Use this file to keep short project context after meaningful architecture, API, setup, or product decisions.

This file should not become a changelog for every small implementation step.

## Current state

- Repository contains frontend code for a car website aggregator.
- Frontend consumes a backend API through a documented API contract.
- Frontend must not depend on backend internals.
- Main architectural rule: Feature-Sliced Design.
- Main implementation rules: strict TypeScript, no `any`, no new packages without approval, API DTOs separated from frontend domain models.
- Home page data is now fetched server-side from `/v1/vehicles/home/` and mapped before reaching UI components.
- Vehicle detail pages are now fetched server-side from `/v1/vehicles/{id}/` and mapped before rendering UI.
- Similar ads on detail pages are currently a best-effort frontend selection from `/v1/vehicles/`, not a dedicated related-ads endpoint.
- API base URL resolution now prefers `API_BASE_URL` and keeps `NEXT_PUBLIC_API_BASE_URL` as a fallback for existing shared usage.
- Home page search labels use `car brand`; search options are mapped from the home API payload.

## Current product direction

The first frontend priority is a stable public vehicle catalog:

- vehicle list
- vehicle details
- dictionary-based filters
- pagination
- loading, error, and empty states

Authentication should come after the public catalog foundation is stable.

## Active blockers and open questions

- Final production API base URL is not confirmed.
- Token storage strategy is not finalized.
- User advertisement creation contract is not confirmed.
- Paid plans are not specified.
- Dedicated related advertisements endpoint is not confirmed.
- Crawler import should not be exposed as a public frontend feature unless backend protection is clarified.

## How to update this file

Update this file only when there is a meaningful change to:

- product direction
- architecture
- API assumptions
- setup
- dependency decisions
- long-term implementation rules

Keep updates short.
