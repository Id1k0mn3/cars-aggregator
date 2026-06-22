# Frontend Rules

## Architecture

Use Feature-Sliced Design.

Allowed top-level layers:

```txt
src/
  app/
  pages/
  widgets/
  features/
  entities/
  shared/
```

Use only the layers that are needed. Do not create deep folders before there is a real reason.

## Dependency direction

Higher layers may import from lower layers.

Recommended direction:

```txt
app -> pages -> widgets -> features -> entities -> shared
```

Lower layers must not import from higher layers.

Examples:

- `shared` must not import from `entities`, `features`, `widgets`, or `pages`.
- `entities` must not import from `features`, `widgets`, or `pages`.
- `features` must not import from `widgets` or `pages`.

## Public APIs

Slices should expose reusable code through a public API when the slice is imported from outside.

Prefer:

```ts
import { VehicleCard } from '@/entities/vehicle';
```

Avoid deep imports across slices:

```ts
import { VehicleCard } from '@/entities/vehicle/ui/vehicle-card/VehicleCard';
```

Deep imports are allowed only inside the same slice.

## API boundary

Keep backend API DTOs separate from frontend domain models.

Prefer this flow:

```txt
API DTO -> mapper -> frontend model -> UI component
```

Rules:

- Do not pass raw API DTOs into presentational components.
- Do not expose backend naming problems to UI components.
- Do not import backend concepts such as server models, database entities, or framework-specific names.
- Keep request/response types close to the API integration code.
- Keep UI types focused on what the UI actually needs.

## TypeScript

Use strict TypeScript.

Rules:

- Avoid `any`.
- Prefer `unknown` plus narrowing when the value is not trusted.
- Type API boundaries explicitly.
- Use readable types over clever generic utilities.
- Use discriminated unions for async UI state when it improves clarity.
- Do not make fields optional only to hide unclear data modeling.

## Components

Keep components small and focused.

A component should usually do one of these jobs:

- layout composition
- presentational rendering
- feature interaction
- page orchestration

Avoid components that combine API calls, data mapping, form state, layout, and complex UI rendering in one file.

## State management

Use the smallest state scope that works.

Prefer:

- local component state for local UI state
- URL query params for catalog filters and pagination
- server-state tools only if already approved and installed
- global state only for cross-app state such as authentication

Avoid:

- global state for simple form fields
- duplicated derived state
- storing values that can be calculated during render
- effects for logic that belongs in event handlers

## Effects and async logic

Use effects only for synchronization with external systems.

Do not use effects for:

- derived values
- user actions such as submit, create, delete, or logout
- data transformations that can happen during render or in mappers

When fetching data manually, handle:

- loading state
- error state
- empty state
- stale responses
- request cancellation or ignore logic where needed

## Dependencies

Do not add new packages by default.

A package can be suggested only when:

1. existing project tools cannot reasonably solve the problem
2. the benefit is clear
3. security and maintenance risks are considered
4. the user approves it

Small utilities should usually be written in plain TypeScript.

## Styling

Follow the existing project styling approach.

Rules:

- Do not introduce a new styling library without approval.
- Keep reusable UI components in `shared/ui` only when they are truly generic.
- Keep feature-specific UI inside the related feature/entity/widget.
- Avoid generic configurable components before there are multiple real use cases.

## Validation before finishing work

Before finishing implementation, inspect `package.json` and use available scripts when relevant:

- type check
- lint
- tests
- build

If a command fails, report:

- command used
- failure reason
- whether the failure is related to the current change
