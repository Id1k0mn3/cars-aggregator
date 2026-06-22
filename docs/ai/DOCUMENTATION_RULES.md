# Documentation Rules

## Goal

Keep project documentation short, useful, and current.

Documentation should help future development decisions. It should not describe every small implementation detail.

## When to update documentation

Update documentation when a change affects:

- architecture
- Feature-Sliced Design rules
- API contract usage
- project setup
- dependency decisions
- important frontend conventions
- long-term product or technical decisions

Do not update documentation for tiny implementation details that are clear from the code.

## Documentation files

### `docs/ai/PROJECT_CONTEXT.md`

Use this file for:

- product goal
- repository scope
- current MVP scope
- API contract boundaries
- known blockers
- open product/API questions

Do not use it for detailed implementation notes.

### `docs/ai/FRONTEND_RULES.md`

Use this file for:

- FSD rules
- TypeScript rules
- API boundary rules
- state management rules
- component rules
- dependency rules
- validation expectations

Do not duplicate large parts of `AGENTS.md` unless the rule needs more detail.

### `docs/ai/DOCUMENTATION_RULES.md`

Use this file for documentation policy only.

### `docs/ai/CONTEXT_UPDATE.md`

Use this file for short project state updates after meaningful changes.

## What not to document

Do not document:

- obvious code behavior
- temporary implementation details
- every small component
- every prop
- backend internals
- experiments that were not accepted
- duplicate rules already covered elsewhere

## Backend information rule

Frontend documentation may mention backend API behavior only as an API contract boundary.

Allowed:

- endpoint path
- request/response shape
- authentication requirement
- frontend integration risk
- unclear contract that blocks frontend work

Avoid:

- backend class names
- backend database tables
- backend framework implementation details
- backend service internals

## Style

Use direct language.

Prefer:

- short sections
- bullet points
- clear decisions
- explicit open questions

Avoid:

- long essays
- vague rules
- motivational text
- duplicated content

## Documentation update output

When documentation is changed, report:

1. Documentation files changed
2. Reason for each change
3. Outdated information removed
4. Remaining documentation gaps
