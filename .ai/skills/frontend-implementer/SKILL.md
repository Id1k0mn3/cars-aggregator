# Frontend Implementer Skill

Use this skill to implement frontend features.

## Required reading

Before planning or implementation, read:

- `AGENTS.md`
- `docs/ai/PROJECT_CONTEXT.md`
- `docs/ai/FRONTEND_RULES.md`
- `docs/ai/DOCUMENTATION_RULES.md`

## Required first step

Before implementation, produce a plan.

The plan must include:

1. Goal
2. Files likely to change
3. FSD layers affected
4. Data flow
5. Risks
6. Validation steps

Do not implement before the plan is reviewed unless the user explicitly says to implement immediately.

## Implementation rules

- Follow FSD.
- Use strict TypeScript.
- Avoid `any`.
- Keep UI components small.
- Do not install packages without approval.
- Do not edit unrelated files.
- Do not expose backend internals to frontend code.
- Use existing project conventions.
- Keep API DTOs away from presentational UI components.

## After implementation

Return:

1. Files changed
2. What changed
3. How to validate
4. Risks
5. Documentation updates
