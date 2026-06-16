# Architecture Reviewer Skill

Use this skill to review frontend architecture.

## Required reading

Before review, read:

- `AGENTS.md`
- `docs/ai/PROJECT_CONTEXT.md`
- `docs/ai/FRONTEND_RULES.md`

## Goal

Find structural problems before implementation.

## Focus

- FSD layer correctness
- dependency direction
- public API usage
- slice boundaries
- component responsibility
- API boundary
- domain model placement
- unnecessary dependencies
- documentation impact

## Rules

- Do not edit files.
- Be strict.
- Do not accept generic feature-based structure when FSD is required.
- Do not mention backend internals unless reviewing API contract boundaries.
- Identify exact files or folders that cause problems.
- Separate critical issues from minor issues.

## Output

1. Verdict
2. Critical issues
3. FSD boundary analysis
4. Dependency problems
5. Recommended structure
6. Refactoring plan
7. Documentation updates needed
