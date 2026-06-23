# Project Context

## Repository scope

This repository contains only the frontend codebase for a car website aggregator.

The frontend communicates with a backend API, but frontend code must not depend on backend internals, backend framework classes, database models, or server-side implementation details.

## Product goal

Build a frontend application for browsing vehicle advertisements from an external/backend data source.

The first stable product goal is a public vehicle catalog with filters. Authentication and user-specific features should be added after the public catalog is stable.

## Current backend API capabilities

The current backend API contract supports:

- user registration
- user login
- user logout
- current user lookup
- email verification
- public vehicle listing
- vehicle filters
- vehicle dictionaries for brand, fuel, and body types
- home page feed for brands, bodies, and featured vehicles
- crawler-based vehicle import

The crawler import endpoint is not a normal frontend user feature. Do not expose it in the public frontend unless the backend contract explicitly makes it safe for frontend usage.

## Current MVP scope

### MVP 1 — Public catalog

- vehicle list page
- vehicle cards
- dictionary-based filters
- price and registration date filters
- pagination using the API contract
- loading, error, and empty states

### MVP 2 — Authentication

- registration
- login
- logout
- current user restore
- unauthorized state handling

### MVP 3 — Email verification

- verification result page
- resend verification email action
- handling for expired or invalid links

## Not implemented or not clarified yet

Do not build these as full frontend features until the API/product contract is clear:

- normal user advertisement creation
- vehicle editing
- vehicle deletion
- paid plans
- user-owned advertisements
- public user profiles
- vehicle details endpoint
- related advertisements
- crawler/admin import UI

## API integration principles

- Treat backend responses as API DTOs, not frontend domain models.
- Map API DTOs into frontend models before passing data into presentational components.
- Keep API-specific error shapes at the API/model boundary.
- Do not document backend internals in frontend docs unless needed to describe the frontend API contract boundary.
- The home page uses the server-side `/v1/vehicles/home/` contract and maps it before rendering UI components.

## Open questions

- What is the final production API base URL?
- Should unverified users access authenticated frontend features?
- Should vehicle details have a dedicated endpoint?
- Should normal users be able to create advertisements?
- What is the safe token storage strategy for this frontend?
- Should public user data be shown in the frontend?
