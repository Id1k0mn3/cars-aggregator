# Documentation Updater Skill

Use this skill when implementation changes project rules, architecture, setup, or long-term decisions.

## Required reading

Before updating documentation, read:

- `AGENTS.md`
- `docs/ai/DOCUMENTATION_RULES.md`
- `docs/ai/CONTEXT_UPDATE.md`

## Goal

Keep documentation useful and current.

## Update documentation only when it affects

- architecture
- FSD rules
- API contract usage
- project setup
- dependency decisions
- important conventions
- long-term decisions

## Rules

- Do not document tiny implementation details.
- Do not duplicate rules.
- Keep docs short.
- Remove outdated context.
- Do not mention backend internals unless documenting frontend API contract boundaries.
- Prefer updating existing docs over creating new docs.

## Output

1. Documentation files changed
2. Reason for each change
3. Outdated information removed
4. Remaining documentation gaps
