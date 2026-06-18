# library_docs.md

# Purpose

This document defines how every major library must be used inside Eligify AI.

This is not generic documentation.

This file contains project-specific implementation patterns, constraints, and rules.

Whenever an AI coding agent uses a library, it must follow the patterns described here.

---

# Library Priority Order

Before implementing any feature:

```txt id="a91kxt"
1. architecture.md

2. code_standards.md

3. library_docs.md

4. Official Documentation
```

If official documentation conflicts with this file:

Follow official documentation while preserving project architecture.

---

# Next.js 16

## Purpose

Application framework.

Responsible for:

* Routing
* Rendering
* API routes
* Server Actions
* Layouts

---

## App Router

Mandatory.

Never use:

```txt id="u4w1s0"
Pages Router
```

---

## Directory Structure

```txt id="0j5ekx"
app/

layout.tsx

page.tsx

loading.tsx

error.tsx
```

---

## Rendering Strategy

Default:

```txt id="7l4ph0"
Server Components
```

Use Client Components only when required.

---

## Server Component Example

```tsx id="kqczgi"
export default async function DashboardPage() {
  const schemes =
    await getRecommendedSchemes();

  return (
    <Dashboard schemes={schemes} />
  );
}
```

---

## Client Component Example

```tsx id="dlxj1y"
"use client";

import { useState } from "react";

export function SearchBar() {
}
```

---

## Route Handlers

Location:

```txt id="5wb5x6"
app/api
```

Purpose:

* Validation
* Authentication
* Service invocation

Not business logic.

---

## Server Actions

Location:

```txt id="cdy7k0"
src/actions
```

Purpose:

* Mutations
* Form submissions

---

# Supabase

## Purpose

Single backend provider.

Handles:

* Authentication
* Database
* Storage

---

# Authentication

## Methods

Allowed:

```txt id="rrmr3x"
Email

Password
```

Not allowed:

```txt id="8vqj9h"
Google

GitHub

OAuth
```

---

## Client Setup

```ts id="1ngw8r"
createBrowserClient()
```

Used only in:

```txt id="5ysr09"
Client Components
```

---

## Server Setup

```ts id="8v1g7m"
createServerClient()
```

Used only in:

```txt id="d0pl5j"
Server Components

Actions

API Routes
```

---

## Authentication Check

```ts id="1s0qxm"
const {
  data: { user },
} = await supabase.auth.getUser();
```

---

# Storage

Bucket:

```txt id="6dlyl0"
documents
```

---

## Upload Rules

Allowed:

```txt id="9l1jv7"
pdf

jpg

jpeg

png
```

Maximum:

```txt id="gfm7df"
10MB
```

---

## Path Structure

```txt id="7hyurw"
documents

/user_id

/file-name.pdf
```

---

# PostgreSQL

## Purpose

Primary database.

---

## Design Goals

* Fast filtering
* Deterministic recommendations
* Scalable querying

---

## Recommendation Queries

Recommendation logic should execute inside PostgreSQL.

Example:

```sql id="jlwm2e"
SELECT *
FROM schemes
WHERE
occupation_tags @> ARRAY['doctor']
```

Never send recommendations to AI.

---

# Drizzle ORM

## Purpose

Database schema management.

---

## Location

```txt id="frgkl3"
src/db
```

---

## Schema Example

```ts id="2h2zma"
export const schemes =
  pgTable("schemes", {
    id: uuid("id"),
  });
```

---

## Query Example

```ts id="k0xk7w"
const schemes =
  await db.query.schemes.findMany();
```

---

## Migrations

Location:

```txt id="5n4q1u"
src/db/migrations
```

Never edit existing migrations.

Always create new migration files.

---

# OpenAI

## Purpose

Allowed only for:

```txt id="3msqlu"
Find Me Scheme

Document Checker
```

---

## Forbidden Uses

Never use OpenAI for:

```txt id="zwj3u6"
Dashboard

Recommendations

Search

Filtering

Sorting
```

---

# Find Me Scheme Pattern

Correct:

```txt id="uwazjk"
User Prompt

↓

Retrieve Candidate Schemes

↓

OpenAI Ranking

↓

Response
```

---

Incorrect:

```txt id="yxeg8m"
User Prompt

↓

Entire Database

↓

OpenAI
```

---

# Model

Recommended:

```txt id="f0k0az"
gpt-4o
```

---

## Temperature

Recommended:

```txt id="4r9u9f"
0.3
```

Reason:

More deterministic responses.

---

# AI Response Format

Always structured JSON.

Example:

```json id="mb2hje"
{
  "recommendations": [
    {
      "scheme_id": "uuid",
      "reason": "..."
    }
  ]
}
```

---

# GSAP

## Purpose

Micro interactions.

Only.

---

## Allowed Uses

```txt id="g4x5hm"
Cursor Follower

Card Hover

Page Entry Animation
```

---

## Forbidden Uses

```txt id="8r6k2z"
Layout Rendering

Navigation

Business Logic
```

---

# Cursor Follower Pattern

Size:

```txt id="e6epm0"
8px
```

Color:

```txt id="1xz7gk"
Accent Token
```

Behavior:

```txt id="j9w84g"
Smooth interpolation
```

Disabled on:

```txt id="3zj0wd"
Touch devices
```

---

# ReactBits

## Purpose

Primary navigation system.

---

## Constraint

ReactBits menu is mandatory.

Do not replace with:

```txt id="gdc4e6"
Sheet

Drawer

Dropdown

Popover
```

---

## Location

```txt id="f3th8p"
src/components/layout
```

---

## Configuration

Menu items stored in:

```txt id="fghl4x"
src/config/navigation.ts
```

---

## Example

```ts id="dzwjdo"
export const navigationItems = [
  {
    label: "Dashboard",
    href: "/dashboard",
  },
];
```

---

# Tailwind CSS v4

## Purpose

Styling system.

---

## Token Source

All design tokens come from:

```txt id="wtg2qe"
ui_tokens.md
```

---

## Never

```tsx id="j2y8vl"
bg-red-500
```

or

```tsx id="qtfkmu"
text-gray-600
```

---

## Always

```tsx id="u0h8yf"
bg-surface

text-text-primary
```

---

# Shadcn UI

## Purpose

Base UI primitives.

---

## Allowed Components

```txt id="5j8o8n"
Button

Input

Textarea

Dialog

Popover

Tabs

Card

Badge
```

---

## Customization

Must use project tokens.

Never ship default styles unchanged.

---

# Zod

## Purpose

Validation layer.

---

## Required For

```txt id="k4g8v4"
API Inputs

Forms

Server Actions
```

---

## Example

```ts id="nmwpaf"
const schema = z.object({
  name: z.string(),
});
```

---

# React Hook Form

## Purpose

Complex forms.

---

## Use For

```txt id="q8zjv3"
Onboarding

Profile

Document Upload
```

---

## Pair With

```txt id="fzjv4d"
Zod
```

Always.

---

# Lucide React

## Purpose

Icons.

---

## Usage

Use Lucide exclusively.

Do not mix icon libraries.

---

# TanStack Query

## Purpose

Client-side data synchronization.

---

## Use Cases

Allowed:

```txt id="k2tlgm"
Document Checker

Find Me Scheme
```

---

Not needed for:

```txt id="m4pj7d"
Dashboard

Recommendations

Scheme List
```

because Server Components should handle those.

---

# clsx

## Purpose

Conditional classes.

---

## Example

```ts id="xzuxk7"
cn(
  isActive && "bg-accent"
);
```

---

# date-fns

## Purpose

Date formatting.

---

## Use Cases

```txt id="yxvjlwm"
Start Date

End Date

Deadlines
```

---

## Example

```ts id="2zpr0q"
format(date, "dd MMM yyyy")
```

---

# Sonner

## Purpose

Toast notifications.

---

## Use Cases

```txt id="6v5n7u"
Profile Saved

Scheme Saved

Upload Success

Upload Failed
```

---

# Recommended Package List

```txt id="b52c0x"
next

react

typescript

tailwindcss

@supabase/supabase-js

@supabase/ssr

drizzle-orm

drizzle-kit

openai

gsap

react-hook-form

zod

@hookform/resolvers

lucide-react

sonner

clsx

tailwind-merge

date-fns
```

---

# Non-Violation Rules

## Rule 1

Supabase is the only backend.

---

## Rule 2

Drizzle is the only ORM.

---

## Rule 3

ReactBits navigation cannot be replaced.

---

## Rule 4

OpenAI may only be used in:

```txt id="shw8tr"
Find Me Scheme

Document Checker
```

---

## Rule 5

Tailwind styles must come from design tokens.

---

## Rule 6

Every form must use:

```txt id="7i3xuo"
React Hook Form

+

Zod
```

---

## Rule 7

Server Components first.

Client Components second.

---

## Rule 8

Never send the full scheme database to OpenAI.

Only filtered candidates.
