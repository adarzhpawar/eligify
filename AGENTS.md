# agent.md

# Eligify AI Agent Operating Manual

---

# Project Mission

Build a premium AI-powered Government Scheme Discovery Platform that helps citizens:

* Discover relevant government schemes
* Understand eligibility requirements
* Prepare application documents
* Reduce application mistakes
* Navigate government opportunities efficiently

The platform must feel modern, premium, and trustworthy while remaining fast and cost-effective.

Eligify is not attempting to replace government portals.

Eligify acts as an intelligent guidance layer on top of official government systems.

---

# Product Goals

## Primary Goal

Help users discover eligible government schemes within minutes.

---

## Secondary Goal

Help users become application-ready before visiting official portals.

---

## Tertiary Goal

Reduce unnecessary AI costs through deterministic recommendation systems.

---

# Core Product Principles

## Principle 01

Recommendations should be instant.

---

## Principle 02

Users should never feel overwhelmed.

---

## Principle 03

AI should only be used where reasoning adds value.

---

## Principle 04

Government workflows should feel modern.

---

## Principle 05

Every screen should increase user confidence.

---

# Project Identity

## Product Name

```txt
Eligify AI
```

---

## Product Type

```txt
AI Government Scheme Discovery Platform
```

---

## Target Audience

```txt
Students
Farmers
Doctors
Women
Senior Citizens
Entrepreneurs
General Citizens
```

---

# Tech Stack Summary

## Frontend

```txt
Next.js 16

React 19

TypeScript

Tailwind CSS v4

Shadcn UI

GSAP

ReactBits Navigation
```

---

## Backend

```txt
Supabase

PostgreSQL

Drizzle ORM
```

---

## AI

```txt
OpenAI
```

---

## Validation

```txt
Zod

React Hook Form
```

---

# Architecture Summary

The architecture follows a:

```txt
Fast First Architecture
```

Model.

---

# Recommendation Engine

Recommendations are generated using:

```txt
Database Queries

Filtering

Tag Matching

Scoring
```

NOT AI.

---

## Matching Inputs

User:

```txt
Occupation

State

Gender

Income

Age

Education
```

Scheme:

```txt
occupation_tags

state_tags

gender_tags

education_tags

income_min

income_max

age_min

age_max
```

---

# AI Architecture

AI is restricted to:

```txt
Find Me Scheme

Document Checker
```

Only.

---

# AI Usage Rules

## Allowed

### Find Me Scheme

Natural language discovery.

---

### Document Checker

Readiness verification.

---

## Forbidden

AI must never be used for:

```txt
Dashboard

Recommendations

Search

Filtering

Sorting

Profile Matching
```

---

# Database Summary

Primary Tables:

```txt
profiles

schemes

saved_schemes

document_checks

scheme_views

ai_scheme_searches
```

---

# Database Rules

## Rule 01

Drizzle ORM only.

---

## Rule 02

No direct database calls from components.

---

## Rule 03

All recommendation logic must run in SQL.

---

## Rule 04

Every searchable field must be indexed.

---

## Rule 05

Every user-owned table must enforce RLS.

---

# API Summary

Available Routes:

```txt
/api/profile

/api/schemes

/api/saved-schemes

/api/find-scheme

/api/document-check
```

---

# Design System Summary

Design Language:

```txt
Premium Government SaaS
```

Emotion:

```txt
Assisted Confidence
```

---

## Colors

```txt
Background:
#FAFAF2

Surface:
#FFFFFF

Text:
#222222

Accent:
#FEFECC
```

---

## Typography

```txt
Plus Jakarta Sans
```

Only.

---

## Layout Systems

### Dashboard

```txt
Bento Layout
```

---

### Find Me Scheme

```txt
40 / 60 Split Layout
```

---

### Apply

```txt
40 / 60 Split Layout
```

---

### Authentication

```txt
Centered Layout
```

---

# Navigation Summary

Navbar Structure:

```txt
Logo

Menu

Logout
```

Only.

---

ReactBits navigation is mandatory.

Never replace it.

---

# Component Architecture

Component Registry:

```txt
ui_registry.md
```

is the source of truth.

---

Before creating any component:

1. Check registry.
2. Reuse existing component.
3. Create new component only if necessary.
4. Register new component.

---

# Required Reading Order

Before writing code:

```txt
1. project_overview.md

2. architecture.md

3. build_plan.md

4. database_schema.md

5. api_contracts.md

6. code_standards.md

7. ui_tokens.md

8. ui_rules.md

9. ui_registry.md

10. progress_tracker.md
```

---

# Development Workflow

## Before Coding

### Step 01

Read active feature.

---

### Step 02

Verify dependencies.

---

### Step 03

Review acceptance criteria.

---

### Step 04

Review affected files.

---

### Step 05

Review architecture constraints.

---

### Step 06

Implement only current feature.

---

# During Development

Always:

```txt
Small Commits

Small Changes

Clear Naming

Reusable Components
```

---

Avoid:

```txt
Massive Refactors

Unrelated Changes

Premature Optimization
```

---

# After Coding

## Required Checklist

### Build

```bash
npm run build
```

---

### Lint

```bash
npm run lint
```

---

### Type Check

```bash
npm run type-check
```

---

### Verification

Validate acceptance criteria.

---

### Documentation

Update:

```txt
progress_tracker.md
```

---

# File Modification Rules

Agents must:

---

## Reuse Existing Components

Always search registry first.

---

## Reuse Existing Services

Do not duplicate business logic.

---

## Reuse Existing Types

Centralize types.

---

## Preserve Architecture

Do not bypass architecture rules.

---

# Folder Responsibilities

## app/

Routing only.

---

## components/

Presentation only.

---

## actions/

Mutations.

---

## services/

Business logic.

---

## db/

Database.

---

## lib/

Utilities.

---

## hooks/

React hooks.

---

## types/

Shared types.

---

# Naming Conventions

## Components

```txt
PascalCase
```

Example:

```txt
SchemeCard.tsx
```

---

## Hooks

```txt
camelCase
```

Example:

```txt
useProfile.ts
```

---

## Database

```txt
snake_case
```

Example:

```txt
saved_schemes
```

---

# Security Rules

## Authentication

Supabase Auth only.

---

## Authorization

Every query must be scoped.

Example:

```txt
user_id
```

---

## Storage

Only allowed bucket:

```txt
documents
```

---

# Performance Rules

Dashboard:

```txt
< 2 seconds
```

---

Recommendation Engine:

```txt
< 1 second
```

---

Scheme Search:

```txt
< 1 second
```

---

# Cursor Follower Rules

Desktop only.

---

Size:

```txt
8px
```

---

Color:

```txt
#FEFECC
```

---

Hidden on:

```txt
Touch Devices
```

---

# OpenAI Rules

## Allowed Flow

```txt
User Prompt

↓

Candidate Retrieval

↓

OpenAI

↓

Result
```

---

## Forbidden Flow

```txt
User Prompt

↓

Entire Scheme Database

↓

OpenAI
```

---

# Definition Of Done

A feature is complete only when:

* Acceptance criteria pass
* Build succeeds
* Lint succeeds
* Type checks succeed
* No console errors
* Manual verification passes
* Documentation updated
* Progress tracker updated

---

# Forbidden Actions

Agents must never:

---

## Use AI for recommendations

Forbidden.

---

## Replace ReactBits Navigation

Forbidden.

---

## Add OAuth Providers

Forbidden.

---

## Hardcode Colors

Forbidden.

---

## Use Raw Tailwind Colors

Forbidden.

---

## Put Business Logic In Components

Forbidden.

---

## Access Database Directly From UI

Forbidden.

---

## Ignore Design Tokens

Forbidden.

---

## Skip Validation

Forbidden.

---

## Modify Unrelated Files

Forbidden.

---

# Emergency Rule

When unsure:

1. Follow architecture.md
2. Follow code_standards.md
3. Follow ui_rules.md
4. Choose the simplest solution
5. Preserve existing patterns

---

# Agent Success Criteria

The project is successful when:

* Recommendations are instant
* AI costs remain minimal
* UI feels premium
* Government workflows feel simple
* Codebase remains maintainable
* New agents can contribute without additional explanation

This document is the operational source of truth for all future AI coding agents working on Eligify AI.