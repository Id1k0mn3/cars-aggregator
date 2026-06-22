You are a senior frontend architect and codebase simplification reviewer.

Project:
I am working on a frontend website for classified ads / vehicle ads.

Main frontend features:

- product/ad list page
- product/ad details page
- ad creation page
- authentication flow
- filtering/searching ads
- communication with backend API
- typed API DTOs
- simplified frontend/domain models where useful
- strict TypeScript
- Feature-Sliced Design style structure where useful

Your task:
Review the current frontend structure and DTO layer. Find where the codebase can be simplified while keeping frontend API DTOs compatible with the API contract below.

Important rules:

- Do not edit files.
- Do not refactor code yet.
- Do not create new files.
- First result must be analysis only.
- Focus on reducing unnecessary abstractions, duplicated code, weak boundaries, over-engineering, and unclear ownership.
- Keep the structure practical for a real production frontend, not academic.
- Prefer simple, readable, maintainable code over complex patterns.
- Respect the existing stack and project direction.
- Do not suggest large rewrites unless there is a strong reason.

Important architecture rule:
The frontend should know only the public API contract below.

The frontend should NOT know about:

- backend framework
- backend folders
- backend controllers
- backend actions
- backend resources
- backend database tables
- backend internal DTO classes
- backend migrations
- backend implementation details

Use the API contract only to check frontend request types, response DTOs, query params, headers, and error handling.

# API Contract

## Base API URL

Local development base URL:

```text
http://localhost:8012/v1
```

Frontend should keep this configurable through environment configuration.

All requests should send:

```http
Accept: application/json
```

JSON body requests should also send:

```http
Content-Type: application/json
```

Authenticated requests should send:

```http
Authorization: Bearer <token>
```

---

## Common DTOs

### EnumItemDto

```ts
type EnumItemDto = {
  value: string;
  label: string;
};
```

### UserDto

```ts
type UserDto = {
  id: number;
  status: {
    value: "active" | "inactive" | string;
    label: string;
  };
  email: string;
  name: string;
  createdAt: number | null;
  updatedAt: number | null;
};
```

Important:
`createdAt` and `updatedAt` are Unix timestamps in seconds, not milliseconds.

---

## Auth API

### POST /auth/register

Request:

```ts
type RegisterRequestDto = {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
  device_name?: string;
};
```

Success status:

```text
201
```

Response:

```ts
type AuthTokenDto = {
  token: string;
  tokenType: "Bearer";
  user: UserDto;
};
```

---

### POST /auth/login

Request:

```ts
type LoginRequestDto = {
  email: string;
  password: string;
  device_name?: string;
};
```

Success status:

```text
200
```

Response:

```ts
type AuthTokenDto = {
  token: string;
  tokenType: "Bearer";
  user: UserDto;
};
```

Invalid credentials are returned as validation errors on `email`.

---

### POST /auth/logout

Headers:

```http
Authorization: Bearer <token>
Accept: application/json
```

Success status:

```text
204
```

Response body:
Empty.

Frontend behavior:
After successful logout, remove the token from frontend storage.

---

### GET /auth/me

Headers:

```http
Authorization: Bearer <token>
Accept: application/json
```

Success status:

```text
200
```

Response:

```ts
type UserDto = {
  id: number;
  status: {
    value: "active" | "inactive" | string;
    label: string;
  };
  email: string;
  name: string;
  createdAt: number | null;
  updatedAt: number | null;
};
```

Frontend behavior:
Use this endpoint to restore the current user when a token already exists.

---

### GET /auth/email/verify/{id}/{hash}

Success status:

```text
200
```

Response:

```ts
type VerifyEmailResponseDto = {
  verified: true;
};
```

Frontend behavior:
The frontend should not manually construct the signed verification URL. If the frontend handles an email verification screen, it should preserve and call the full URL including query params.

---

### POST /auth/email/verification-notification

Headers:

```http
Authorization: Bearer <token>
Accept: application/json
```

Success status:

```text
200
```

Response:

```ts
type SendVerificationEmailResponseDto = {
  sent: true;
};
```

---

## Vehicle dictionary API

Dictionary item DTO:

```ts
type VehicleTypeDto = {
  id: number;
  title: string;
  slug: string;
};
```

### GET /dictionaries/vehicles/brand-types

Response:

```ts
type VehicleBrandTypesResponseDto = VehicleTypeDto[];
```

Use `id` as `brand_type_id` in vehicle filters.

---

### GET /dictionaries/vehicles/fuel-types

Response:

```ts
type VehicleFuelTypesResponseDto = VehicleTypeDto[];
```

Use `id` as `fuel_type_id` in vehicle filters.

---

### GET /dictionaries/vehicles/body-types

Response:

```ts
type VehicleBodyTypesResponseDto = VehicleTypeDto[];
```

Use `id` as `body_type_id` in vehicle filters.

---

## Vehicle list API

### GET /vehicles/

Query params:

```ts
type VehicleListQueryDto = {
  page?: number;
  per_page?: number;
  brand_type_id?: number;
  fuel_type_id?: number;
  body_type_id?: number;
  price_from?: number;
  price_to?: number;
  first_registration_from?: string;
  first_registration_to?: string;
};
```

Rules:

- `per_page`: min 1, max 100, default 20
- `brand_type_id`: number
- `fuel_type_id`: number
- `body_type_id`: number
- `price_from`: number, min 0
- `price_to`: number, min 0, must be greater than or equal to `price_from`
- `first_registration_from`: date string
- `first_registration_to`: date string, must be after or equal to `first_registration_from`
- `page`: supported by pagination

Success status:

```text
200
```

Response body:

```ts
type VehicleListResponseDto = VehicleItemDto[];
```

Important pagination rule:
The response body is a plain array, not `{ data, meta }`.

Total count is returned in the `Content-Range` response header.

Example header:

```http
Content-Range: vehicles 0-9/42
Access-Control-Expose-Headers: Content-Range
```

Frontend must read `Content-Range` to get the total count.

---

## Vehicle item DTO

```ts
type VehicleItemDto = {
  id: number;
  adId: string;
  sourceUrl: string;
  title: string;
  general: {
    price: number | null;
    mileage: number | null;
    firstRegistration: string | null;
    brandType: VehicleTypeDto | null;
    fuelType: VehicleTypeDto | null;
    bodyType: VehicleTypeDto | null;
    gearboxType: string | null;
    engineCapacity: number | null;
    enginePowerHp: number | null;
    enginePowerKw: number | null;
  };
  technical: {
    doors: string | null;
    seats: number | null;
    driveType: string | null;
    climateControl: string | null;
    color: string | null;
    technicalInspectionUntil: string | null;
    euroStandard: string | null;
    co2Emission: number | null;
    registrationFee: number | null;
    ownerDeclarationCode: string | null;
  };
  links: {
    historyCheck: string | null;
  };
  images: string[];
  createdAt: number | null;
  updatedAt: number | null;
};
```

Important frontend notes:

- Vehicle response data is nested into `general`, `technical`, `links`, and `images`.
- Do not assume `price`, `mileage`, or `brandType` are top-level fields.
- Many vehicle fields can be `null`.
- UI components should handle missing values safely.
- Frontend domain/view models may simplify this shape if it improves rendering.
- API DTOs should still match this exact response shape.

---

## Vehicle creation / ad creation

Current API contract does not describe a normal user-facing `POST /vehicles` endpoint.

There is this endpoint:

```text
POST /vehicles/from-crawler
```

This endpoint accepts crawler/import-style payloads and returns `VehicleItemDto`.

Important frontend rule:
Do not treat `/vehicles/from-crawler` as a normal public “create ad” endpoint unless the current frontend project intentionally uses it.

If the frontend has an ad creation page, review whether it is using a real user-facing create-ad API. If it uses `/vehicles/from-crawler`, mark this as a product/API contract risk.

Crawler/import request shape:

```ts
type CreateVehicleFromCrawlerRequestDto = {
  url: string;
  adId: string;
  brand: string;
  name: string;
  images?: string[];
  general: {
    firstRegistration: string;
    fuelType: string;
    gearboxType: string;
    mileage: number;
    engineCapacity: number;
    enginePowerHp: number;
    enginePowerKw: number;
  };
  technical: {
    bodyType: string;
    doors?: string | null;
    seats?: number | null;
    driveType?: string | null;
    climateControl?: string | null;
    color?: string | null;
    technicalInspectionUntil?: string | null;
    euroStandard?: string | null;
    co2Emission?: number | null;
    registrationFee?: number | null;
    ownerDeclarationCode?: string | null;
  };
  links?: {
    historyCheck?: string | null;
  };
};
```

Success status:

```text
201
```

Response:

```ts
type CreateVehicleFromCrawlerResponseDto = VehicleItemDto;
```

---

## Public user API

### GET /users/{user}/

Response:

```ts
type UserDto = {
  id: number;
  status: {
    value: "active" | "inactive" | string;
    label: string;
  };
  email: string;
  name: string;
  createdAt: number | null;
  updatedAt: number | null;
};
```

Important frontend rule:
This endpoint is public according to the API contract, but exposing user email publicly may be a product/security concern. Do not hide this issue during review.

---

## API error format

Common error response:

```ts
type ApiErrorDto = {
  error: string;
  message: string;
};
```

Validation error response:

```ts
type ApiValidationErrorDto = {
  error: "request_validationFailed" | string;
  message: string;
  errors: Record<string, string[]>;
};
```

Known status codes:

```ts
type ApiStatusCode = 200 | 201 | 204 | 401 | 403 | 404 | 405 | 409 | 422 | 429 | 503;
```

Frontend behavior:

- `401`: treat as unauthenticated and clear/re-request credentials.
- `422`: expose field validation errors to forms.
- `429`: show rate-limit/general retry message.
- `503`: show server error message.
- Unknown errors should still be handled safely.

---

# Review Focus

## 1. DTO correctness against the API contract

Check whether frontend API DTOs match the API contract above:

- auth register request
- auth login request
- auth token response
- current user response
- email verification responses
- vehicle list query params
- vehicle list response
- vehicle item response
- dictionary response types
- API error response shape
- validation error response shape
- pagination total from `Content-Range`
- ad creation request/response if currently implemented

For every mismatch, report:

- Frontend DTO/type
- Expected API contract shape
- Actual frontend shape
- Why this mismatch is risky
- Suggested fix

Important:
DTOs at the API boundary should match the backend response/request contract as closely as possible.

But frontend domain/UI models do not need to mirror the backend shape if a simpler frontend model is better.

---

## 2. DTO/domain simplification

Analyze whether the frontend has too many types, duplicated types, or unnecessary mappers.

Check:

- Are DTOs separated from frontend domain models only where useful?
- Are mappers used only at API boundaries?
- Are backend response shapes leaking into UI components?
- Are UI components depending directly on raw API DTOs?
- Are there duplicate User, Vehicle, Dictionary, Filter, or Error types?
- Are some domain types just copies of DTOs without real value?
- Are some mappers useless pass-through functions?
- Are API DTO names clear enough?

Preferred approach:

- Keep API DTOs close to the API layer.
- Keep frontend domain models only when they simplify UI logic.
- Do not create domain models just because “clean architecture” says so.
- Use mappers only when they actually transform data.
- Avoid backend-style naming in frontend when it is not needed.
- Keep public frontend exports small and predictable.

---

## 3. Folder structure

Review:

- Are layers/slices placed correctly?
- Are there unnecessary folders?
- Are some files placed too deeply?
- Are some modules split too early?
- Are imports clean and predictable?
- Are API DTOs placed near API functions or scattered across the app?
- Are entity models, feature models, and shared API types mixed incorrectly?

---

## 4. Feature boundaries

Review:

- Are product list, product details, create ad, auth, and filters separated clearly?
- Are there mixed responsibilities between pages, features, entities, widgets, and shared code?
- Are there places where one feature knows too much about another feature?
- Are filters too coupled to product list rendering?
- Is auth too coupled to unrelated features?

---

## 5. API and data model structure

Review:

- Is the API client simple enough?
- Are API errors typed clearly?
- Is `Content-Range` handled in the right layer?
- Are request params for filters modeled cleanly?
- Are dictionary values used correctly for filters?
- Is backend communication too abstract or too manual?

---

## 6. State and business logic

Review:

- Is logic placed close to where it is used?
- Is there unnecessary global state?
- Are filters URL-driven in a clean way?
- Are form states, auth state, and loading/error states modeled clearly?
- Is API loading/error/success state duplicated too often?

---

## 7. UI structure

Review:

- Are components split reasonably?
- Are there too many tiny components?
- Are reusable components truly reusable?
- Are page-level components too large?
- Are DTO fields used directly in UI where a simpler view model would be better?

---

## 8. TypeScript quality

Review:

- Are types clear and strict?
- Are there weak types, duplicated types, or types that exist only because of over-abstraction?
- Are nullable fields handled safely?
- Are public exports clean?
- Are API response types strict enough to catch backend contract changes?

# Output Format

# Frontend Structure and DTO Review

## Verdict

Give a short overall judgment:

- healthy
- acceptable
- over-engineered
- unclear
- risky

Explain the verdict briefly.

## Critical DTO contract mismatches

List only real mismatches between frontend DTOs and the API contract above.

For each issue:

- Problem
- Frontend file/type
- Expected API contract
- Current frontend shape
- Why it is risky
- Severity: critical / medium / low
- Suggested fix

## DTO simplification opportunities

List places where DTO/domain/model code can be simplified.

For each issue:

- Current structure
- Suggested structure
- Why this is simpler
- Risk of the change

## Main structural problems

List the most important structural problems.

For each problem:

- Problem
- Why it is a problem
- Files/folders involved
- Severity: critical / medium / low

## What should be simplified

Give concrete simplification suggestions.

For each suggestion:

- Current structure
- Suggested structure
- Why this is simpler
- Risk of the change

## What should not be changed

List parts of the structure that are already good or should not be refactored now.

## Recommended target structure

Propose a clean folder structure for the current stage of the project.

The structure should keep API DTOs close to API functions and avoid unnecessary frontend domain layers unless they provide real value.

## Step-by-step refactoring plan

Create a small, safe refactoring plan.

Rules:

- Each step must be independently reviewable.
- Start with DTO contract fixes before structural cleanup.
- Do not mix API contract fixes with visual UI changes.
- Do not introduce new abstractions unless they remove real duplication or risk.

## Questions before implementation

List only important questions that must be answered before editing files.

Do not ask questions that can be answered by reading the current codebase or the API contract above.

Remember:
This first response must be analysis only. Do not modify the codebase.
