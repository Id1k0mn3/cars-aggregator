# AGENTS.md

## Repository

This repository contains only the frontend codebase for a car website aggregator.

The frontend communicates with a backend API, but frontend code must not depend on backend internals.

## Required reading

Before architectural or feature work, read:

- `docs/ai/PROJECT_CONTEXT.md`
- `docs/ai/FRONTEND_RULES.md`
- `docs/ai/DOCUMENTATION_RULES.md`

## Main rules

- Use Feature-Sliced Design.
- Provide an implementation plan before changing code.
- Do not install new packages without user approval.
- Do not modify unrelated files.
- Use strict TypeScript.
- Avoid `any`.
- Keep API contracts separate from frontend domain models.
- Do not leak backend internals into frontend code or frontend documentation.
- Update documentation only when the change affects architecture, setup, conventions, or long-term decisions.

## Before implementation

Return a plan with:

1. Goal
2. Files likely to change
3. FSD layers affected
4. Data flow
5. Risks
6. Validation steps

Do not implement until the plan is reviewed unless the user explicitly asks for immediate implementation.

## Package policy

Do not add new packages by default.

A new package is allowed only if:

- existing project tools cannot reasonably solve the problem
- the benefit is clear
- security and maintenance risks are considered
- the user approves it

Before suggesting a package, explain:

1. Why it is needed
2. Why existing tools are not enough
3. What risks it adds
4. How it affects maintenance

## Validation

Before finishing implementation, inspect `package.json`.

Use available scripts when relevant:

- type check
- lint
- tests
- build

If a command fails, report it clearly.
