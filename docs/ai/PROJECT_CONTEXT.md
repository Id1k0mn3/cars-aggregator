# Project Context

## Product

This repository contains the frontend for a car website aggregator.

The product goal is to help users browse, search, filter, and inspect car advertisements through a clean marketplace-style interface.

## Repository boundary

This is a frontend-only repository.

The frontend communicates with a backend API.

The frontend must not know how backend data is collected, parsed, normalized, stored, or updated.

Frontend code should depend only on:

- API contracts
- frontend domain models
- UI state
- user interactions

## Current architecture direction

The frontend should follow Feature-Sliced Design.

Expected source structure:

```txt
src/
  app/
  pages/
  widgets/
  features/
  entities/
  shared/
```
