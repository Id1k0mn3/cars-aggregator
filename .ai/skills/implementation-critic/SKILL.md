# Codebase Simplifier Skill

Use this skill when reviewing new code, refactoring proposals, or implementation plans to reduce unnecessary complexity and keep the codebase maintainable.

## Required reading

Before review, read:

- `AGENTS.md`
- `docs/ai/PROJECT_CONTEXT.md`
- `docs/ai/FRONTEND_RULES.md`
- `docs/ai/DOCUMENTATION_RULES.md`

## Goal

Improve the codebase by making new code simpler, clearer, safer, and easier to maintain.

This skill should challenge unnecessary complexity before it enters the codebase.

## Focus

Review code and plans for:

- unnecessary abstractions
- over-engineering
- duplicated logic
- weak naming
- large components
- unclear responsibilities
- incorrect FSD layer placement
- excessive state
- unnecessary effects
- avoidable dependencies
- weak TypeScript types
- hidden coupling
- code that is hard to delete later

## Simplification rules

Prefer:

- fewer files when separation does not add value
- clear names over clever abstractions
- plain TypeScript over utility-heavy code
- local logic before global abstractions
- existing project patterns before new patterns
- composition over configuration-heavy components
- simple data flow over indirect data flow

Avoid:

- premature abstractions
- generic components with unclear purpose
- custom hooks that only hide simple logic
- services that only wrap one function without value
- global state for local UI state
- new packages for small utilities
- deep FSD nesting without real need

## FSD rules

Simplification must still respect Feature-Sliced Design.

Do not simplify by breaking FSD boundaries.

Check:

- whether code is in the correct layer
- whether slices import through public APIs
- whether business logic leaks into `shared`
- whether page-level code contains too much feature logic
- whether entity logic is mixed with feature actions

## TypeScript rules

Improve type safety without making types unreadable.

Prefer:

- explicit API boundary types
- clear domain models
- narrow union types where useful
- readable type aliases

Avoid:

- `any`
- complex generic types without strong reason
- type tricks that make code harder to understand
- optional fields used to hide unclear data modeling

## Dependency rules

Do not suggest new dependencies unless the benefit is clearly stronger than the cost.

Before accepting a dependency, check:

1. Can existing code solve this?
2. Can browser or framework APIs solve this?
3. Is the package maintained?
4. Does it increase bundle size or security risk?
5. Has the user approved it?

## Review behavior

Be strict.

Do not approve code only because it works.

Working code can still be weak if it is hard to maintain, hard to test, poorly typed, or badly placed in the architecture.

## Output format

1. Verdict
2. What is too complex
3. What should be simplified
4. FSD issues
5. TypeScript issues
6. Dependency risks
7. Suggested simpler design
8. Action plan

## Rules

- Do not edit files during review unless explicitly asked.
- Do not rewrite the whole feature unless necessary.
- Prefer small, safe simplification steps.
- Explain why the simpler version is better.
- Mention documentation updates only when the change affects architecture, setup, conventions, or long-term decisions.
