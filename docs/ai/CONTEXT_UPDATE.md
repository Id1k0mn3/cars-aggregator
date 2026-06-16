# Context Update Log

## Current status

The repository contains only the frontend codebase for a car website aggregator.

## Current architecture

The frontend should follow Feature-Sliced Design.

## Active decisions

- The frontend must not depend on backend internals.
- The frontend should know only backend API contracts.
- New packages require explicit justification and user approval.
- Implementation should start with a reviewable plan.
- Meaningful architecture changes should be documented.

## Deprecated context

- This repository is not a multi-project workspace.
- This repository is not responsible for backend implementation.
- This repository should not document data collection or parser internals.
