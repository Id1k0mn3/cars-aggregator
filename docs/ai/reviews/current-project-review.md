# Current Project Review

## Executive Summary

The project has a usable FSD-style foundation for a frontend-only car aggregator. The public catalog and homepage are now connected to API data, DTOs are mostly isolated from UI components, and validation currently passes for typecheck and lint.

The codebase is still early-stage. The homepage is in better shape after recent mapping refactors, but the catalog page is carrying too much orchestration in one component, the vehicle detail and create-ad pages are still mock or placeholder screens, and the production build is currently blocked in this environment by remote Google Fonts fetching through `next/font/google`.

## Verdict

Acceptable but needs cleanup

The architecture is not risky, but it is not yet stable enough to call a clean foundation. The main FSD boundaries are generally respected, DTO-to-model mapping exists, and client components are limited to interactive filter UI. The cleanup work should focus on reducing page-level orchestration, clarifying API contracts, and removing known build/runtime risks before adding more features.

## Critical Issues

### Issue 1

- Severity: High
- Location: `src/app/layout.tsx`
- Problem: The production build depends on fetching `Geist` and `Geist Mono` from Google Fonts through `next/font/google`.
- Why it matters: `pnpm run build` fails when network access to `fonts.googleapis.com` is unavailable. This makes production builds environment-dependent and currently blocks validation in this workspace.
- Recommended fix: Use local fonts, committed font assets, or a font stack that does not require network fetch during build.

### Issue 2

- Severity: Medium
- Location: `src/views/home/api/home-page-api.ts`, `src/views/home/model/home-page-mappers.ts`
- Problem: `HomePageDto` includes an optional `models` field, but the current observed `/v1/vehicles/home/` response does not include `models`.
- Why it matters: The frontend is modeling a future or uncertain API contract. The mapper has fallback logic, but the DTO type may imply a backend guarantee that does not exist yet.
- Recommended fix: Confirm whether `models` is part of the official home API contract. If not, remove `models` from the DTO and keep model-option derivation explicitly documented as a frontend fallback.

### Issue 3

- Severity: Medium
- Location: `src/views/home/model/home-page-mappers.ts`
- Problem: Home "car brand" category tiles are mapped from `dto.brands`, but the current sample/live response appears to contain body-type-like values under `brands`.
- Why it matters: If the backend response is wrong, the UI will render misleading "Popular car brands" links. If the frontend assumption is wrong, the mapping will route users to incorrect `brand_type_id` filters.
- Recommended fix: Verify the backend contract for `brands`. Until confirmed, treat this as an API contract risk rather than adding frontend workarounds.

### Issue 4

- Severity: Medium
- Location: `src/views/vehicles-page/ui/vehicles-page.tsx`
- Problem: The catalog page combines server data fetching, dictionary loading, filter parsing, error handling, pagination calculations, layout, and rendering in one component.
- Why it matters: The component is still readable but will become hard to modify as sorting, model filtering, detail links, and richer pagination are added.
- Recommended fix: Extract small model helpers for catalog page state preparation. Keep fetching in the page/view layer, but move total labels, pagination flags, and settled-result normalization into `views/vehicles-page/model`.

### Issue 5

- Severity: Low
- Location: production deployment configuration
- Problem: Production API access is currently documented with a plain HTTP IP address.
- Why it matters: Plain HTTP IP access is acceptable for temporary testing but is not a strong production deployment target.
- Recommended fix: Move production traffic to an HTTPS domain when DNS and TLS are ready.

## Architecture Review

The project broadly follows the expected FSD direction:

- `src/app` contains Next.js route entries and layout.
- `src/views` contains page-level orchestration and page-specific models.
- `src/widgets` contains shared page shell UI such as `SiteHeader`.
- `src/features` contains interactive filter behavior.
- `src/entities` contains vehicle, dictionary, and user API/model/UI units.
- `src/shared` contains API client, config, and small utilities.

Layer direction is mostly clean. Views import widgets, features, entities, and shared utilities. Features import entities and local model helpers. Entities import shared API/config and dictionary types. Shared does not import higher layers.

The main structural concern is not layer violation, but uneven responsibility size. `views/home` now has a fairly clear DTO -> mapper -> UI flow. `views/vehicles-page` still has too much state preparation in `vehicles-page.tsx`. `views/vehicle-detail-page` and `views/create-ad-page` are placeholders, which is acceptable for the current product stage but should not be mistaken for completed architecture.

There are a few unused or obsolete files that should be reviewed:

- `src/views/vehicles-page/model/mock-vehicles.ts` appears unused after API integration.
- `src/views/vehicle-detail-page/model/mock-vehicle-detail.ts` is still active because the detail endpoint is not defined.
- `response.json` exists at repo root and is useful as an API sample, but should either be documented as a fixture or moved to a clearer docs/test location.

## Homepage Review

The homepage is in a better state after API integration and UI refactoring:

- DTOs are defined in `src/views/home/api/home-page-api.ts`.
- UI-ready models are defined in `src/views/home/model/home-page-types.ts`.
- Mapping, URL building, filtering, formatting, search options, footer content, trust content, and hero summary/stats are prepared in `src/views/home/model/home-page-mappers.ts`.
- `src/views/home/ui/home-page.tsx` mostly orchestrates sections and passes prepared data.
- `src/views/home/ui/featured-vehicles-section.tsx` renders prepared vehicle card data and no longer maps DTO fields.
- `src/views/home/ui/home-filter-section.tsx` renders prepared filters/categories and no longer builds query strings.

The current homepage model is practical, but there are still tradeoffs:

- `HomePageData` includes static footer and trust content. This keeps UI simple, but these are not API-derived. It is acceptable for now because they are homepage-specific and not reused.
- `HomeHeroData` is passed as one object. That is simple, but if the hero becomes interactive, search form behavior may need its own small component.
- Model options are derived from vehicle titles when `models` is absent. This is a fallback, not a reliable domain model.

The homepage does not currently expose DTOs to UI components. That boundary is clean.

## API Integration Review

The shared API client is simple and consistent:

- `src/shared/api/client.ts` centralizes URL construction, JSON parsing, error parsing, and request body serialization.
- API-specific error payloads remain in `shared/api`.
- Entity APIs and home APIs call the shared client.

Base URL handling is centralized:

- `src/shared/config/env.ts` validates `NEXT_PUBLIC_API_URL` as the API origin.
- `src/shared/config/api.ts` appends `/v1` centrally for API requests.
- `NEXT_PUBLIC_*` variables are public browser-bundle values and must not contain secrets.

Cache strategy is explicit where it matters:

- `src/views/home/api/home-page-api.ts` uses `cache: "no-store"`.
- `src/entities/vehicle/api/vehicle-api.ts` uses `cache: "no-store"`.
- Dictionary API calls do not currently specify cache behavior. This may be acceptable, but dictionary data is a good candidate for `revalidate` if backend values are stable.

Error handling is adequate for current pages:

- `src/app/page.tsx` catches home feed failures and renders an empty home model plus visible message.
- `src/views/vehicles-page/ui/vehicles-page.tsx` uses `Promise.allSettled` to tolerate partial dictionary/list failures.
- The fallback path is visible and practical.

Main API risks:

- The home `models` field is uncertain.
- The current `brands` payload should be verified.
- Home search submits `model`, but the vehicle list filter parser does not currently support a `model` query param. This means the submitted model select may not affect results yet.

## TypeScript Review

TypeScript strictness is enabled and current typecheck passes.

Strengths:

- DTOs and frontend models are separate for home and vehicle list data.
- API errors are modeled explicitly.
- Filter parsing avoids `any` and validates URL query values.
- UI props are mostly explicit and readable.

Concerns:

- `HomeVehicleModelDto` has optional `id` and `slug`, which is flexible but reflects an uncertain contract.
- `HomePageData` is clear, but static content in the mapper makes the model layer a mix of API mapping and page content assembly.
- `VehicleTypeDto` and `VehicleType` are currently identical in `src/entities/dictionary/model/types.ts`. That is acceptable for now, but it is not a true DTO/domain separation if dictionary display requirements diverge.
- Several mock view models under `vehicle-detail-page` are still typed as if they were real UI models. That is acceptable only while the feature is explicitly blocked by missing API contract.

The type model is readable overall. Avoid adding more narrow component-specific types unless a component truly owns a distinct data shape.

## React / Next.js Review

Server/client split is mostly correct:

- Home page fetching happens in `src/app/page.tsx`, a server route component.
- Vehicles page fetching happens in `src/views/vehicles-page/ui/vehicles-page.tsx`, which is an async server component.
- Client components are limited to interactive filter UI: `VehicleFilterPanel` and `SelectedVehicleFilters`.
- Presentational home sections are server components.

Data fetching placement is acceptable:

- The app route fetches home data and passes mapped data into the home view.
- Catalog page fetches dictionaries and vehicle data server-side.

Issues:

- `src/views/vehicles-page/ui/vehicles-page.tsx` is overloaded.
- `src/app/layout.tsx` uses `next/font/google`, which blocks production builds in network-restricted environments.
- `src/views/vehicle-detail-page/ui/vehicle-detail-page.tsx` is large and mock-based. It should not be expanded until the vehicle detail API contract is available.

Rendering logic is readable in the homepage. Catalog rendering is still readable, but it is the next file likely to become difficult to maintain.

## UI Logic Simplification

Concrete simplification opportunities:

- Move catalog list state preparation from `vehicles-page.tsx` to a `views/vehicles-page/model` helper.
- Extract the catalog ad CTA block from `vehicles-page.tsx` into a small local component if more catalog content is added.
- Move pagination calculation into a small helper that receives `vehicleList`, `currentPage`, and `perPage`.
- Keep `HomeFooter` local for now, but consider a `widgets/site-footer` only if other pages need the same footer.
- Remove or relocate `src/views/vehicles-page/model/mock-vehicles.ts` if it is unused.
- Decide whether `response.json` is a fixture. If yes, move it under `docs/ai` or a test fixture folder and name it clearly.
- Align home search query params with catalog parser before relying on `model` filtering.

## Recommended Refactoring Plan

### 1. Quick fixes

1. Move production API access from plain HTTP IP access to an HTTPS domain.
2. Confirm or remove `models?: HomeVehicleModelDto[]` from the home DTO.
3. Verify the `/v1/vehicles/home/` `brands` payload with the backend/API owner.
4. Remove unused `src/views/vehicles-page/model/mock-vehicles.ts` if no longer referenced.
5. Either move `response.json` to a named fixture location or document it as a temporary API sample.

### 2. Medium refactors

1. Extract catalog page result normalization from `src/views/vehicles-page/ui/vehicles-page.tsx`.
2. Extract catalog pagination state and href creation into `views/vehicles-page/model`.
3. Decide whether dictionary requests should use `revalidate`.
4. Align home search form params with supported catalog filters. Do not keep submitting unsupported `model` unless the catalog parser/API supports it.
5. Replace `next/font/google` with local or non-fetching font handling to unblock production builds.

### 3. Optional improvements

1. Add a `widgets/site-footer` only when more than one page needs the same footer.
2. Add focused tests for URL query parsing and serialization in `features/vehicle-filters/model`.
3. Add mapper tests for `mapHomePageDtoToData` once the home API contract is stable.
4. Split `VehicleDetailPage` only when a real detail endpoint exists.

## Files That Need Attention

| File | Problem | Recommended action | Priority |
| --- | --- | --- | --- |
| `src/app/layout.tsx` | Production build depends on remote Google Fonts fetch. | Replace `next/font/google` with local fonts or a non-fetching font strategy. | High |
| `src/views/home/api/home-page-api.ts` | Optional `models` field may not be part of the real home API contract. | Confirm contract; remove or keep with explicit documentation. | High |
| `src/views/home/model/home-page-mappers.ts` | Assumes `dto.brands` is valid car brand data; current observed data may not match. | Verify backend response and adjust only after contract is clear. | High |
| `src/views/home/ui/home-hero.tsx` | Submits `model` query param, but catalog parser does not support it. | Either add supported filter handling or remove/disable model submission. | Medium |
| `src/views/vehicles-page/ui/vehicles-page.tsx` | Too much orchestration and derived state in one server component. | Move derived list/pagination state into model helpers. | Medium |
| production deployment config | API access currently uses a plain HTTP IP target. | Move production traffic to an HTTPS domain. | Low |
| `src/views/vehicles-page/model/mock-vehicles.ts` | Appears unused after API integration. | Remove if confirmed unused. | Low |
| `response.json` | Root-level API sample has unclear ownership. | Move to a fixture/docs location or document its purpose. | Low |
| `src/views/vehicle-detail-page/ui/vehicle-detail-page.tsx` | Mock-based large page. | Keep as placeholder until detail API contract exists; do not expand yet. | Low |
| `next.config.ts` | Allows localhost and current production IP image hosts. | Replace IP host with production domain when media host is finalized. | Low |

## What Not To Refactor Yet

- Do not move home-specific mappers to `entities` or `shared`; they are not reused outside the homepage.
- Do not introduce a server-state library. Current server component fetching is enough.
- Do not build a full vehicle detail integration until the detail endpoint is confirmed.
- Do not generalize vehicle cards beyond current reuse. The existing entity cards are sufficient.
- Do not create a global layout shell abstraction unless multiple pages need the same header/footer/body composition.
- Do not add packages for small formatting, parsing, or query-building helpers.

## Final Recommendation

The next development step should be API contract cleanup, not UI expansion. Confirm the home `brands` and `models` contract, align the homepage search form with supported catalog filters, and unblock production builds by removing the remote Google Fonts dependency. After that, refactor `vehicles-page.tsx` into smaller model helpers so the catalog remains maintainable as sorting, model filtering, and richer pagination are added.
