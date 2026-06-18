# architecture.md

# System Architecture

## Architecture Philosophy

Eligify AI follows a **Fast-First Architecture**.

The system is designed around the principle that:

> Deterministic problems should be solved using data and rules. AI should only be used where reasoning is required.

Most government scheme recommendation platforms make the mistake of routing every user request through an LLM.

This increases:

* Cost
* Latency
* Infrastructure complexity
* Failure rate

Eligify AI avoids this problem by using:

* Database filtering
* Rule-based recommendation engine
* Indexed scheme matching

for 95% of platform functionality.

AI is reserved for:

* Natural language scheme discovery
* Document verification

only.

---

# Core Architecture Principles

## Principle 1

### Database Before AI

Whenever a solution can be achieved through:

* SQL
* Indexing
* Filtering
* Tagging

the database solution must be preferred.

---

## Principle 2

### AI Is Enhancement Layer

AI should improve user experience.

AI should never become a dependency for:

* Dashboard recommendations
* Scheme filtering
* Search
* User profiling

---

## Principle 3

### Server Components First

All pages should be built as:

* Next.js Server Components

unless interactivity requires:

* useState
* useEffect
* Event listeners
* GSAP

---

## Principle 4

### Fast User Experience

Users should perceive:

* Instant recommendations
* Instant filtering
* Minimal loading

across the platform.

---

# Technology Stack

## Frontend

### Next.js 16

Purpose:

* Full stack framework
* Server rendering
* App Router

Reason:

* Excellent performance
* Server Components
* AI-friendly architecture

---

### React 19

Purpose:

* UI rendering

Reason:

* Latest React ecosystem
* Future compatibility

---

### TypeScript

Purpose:

* Type safety

Reason:

* Reduced runtime errors
* Better AI-generated code quality

---

### Tailwind CSS v4

Purpose:

* Styling

Reason:

* Rapid development
* Excellent DX
* Design token support

---

### Shadcn UI

Purpose:

* Base UI components

Reason:

* Accessibility
* Customizability
* Production-ready patterns

---

### GSAP

Purpose:

* Micro interactions

Reason:

* Smooth animation performance

Used only for:

* Cursor follower
* Page transitions
* Card interactions

---

### ReactBits

Purpose:

* Navigation menu

Reason:

* User-provided component

Constraint:

Must be used.

Cannot be replaced.

---

# Backend

## Supabase

Purpose:

* Authentication
* Database
* Storage

Reason:

* Managed infrastructure
* PostgreSQL
* Built-in auth

---

## PostgreSQL

Purpose:

* Primary database

Reason:

* Reliability
* Scalability
* Powerful filtering

---

## Drizzle ORM

Purpose:

* Schema management
* Type-safe queries

Reason:

* Excellent TypeScript support
* Lightweight
* AI-friendly

---

# AI Layer

## OpenAI

Purpose:

* Find Me Scheme
* Document Checker

Reason:

* Strong reasoning capabilities

Important:

OpenAI is NOT used for recommendation generation.

---

# Authentication Architecture

## Provider

Supabase Auth

Authentication Methods:

* Email
* Password

Not Included:

* Google Login
* GitHub Login
* OTP

---

## Authentication Flow

```text
Login

↓

Check Session

↓

Authenticated

↓

Check Profile

↓

Profile Exists
     ↓
 Dashboard

Profile Missing
     ↓
 Onboarding
```

---

# Application Structure

```text
app

├── (auth)
│   ├── login
│   └── register

├── onboarding

├── dashboard

├── schemes
│   ├── page.tsx
│   └── [id]

├── find-scheme

├── apply

├── profile

├── saved-schemes

├── api

│   ├── schemes
│   ├── find-scheme
│   ├── document-check
│   └── profile
```

---

# Folder Structure

```text
src

├── app

├── actions

├── components

│   ├── ui

│   ├── layout

│   ├── dashboard

│   ├── schemes

│   ├── profile

│   ├── apply

│   └── find-scheme

├── db

│   ├── schema
│   ├── migrations

├── lib

│   ├── supabase
│   ├── ai
│   ├── recommendation
│   ├── validators

├── hooks

├── types

├── constants

├── config

└── public
```

---

# Navigation Architecture

## Navbar

Layout:

```text
[ Eligify Logo ]

              

[ Menu ] [ Logout ]
```

No traditional navigation links.

---

## Menu

The ReactBits menu contains:

```text
Dashboard

Browse Schemes

Find Me Scheme

Apply

Saved Schemes

Profile
```

---

# Database Architecture

## Core Tables

### profiles

Stores:

* User data
* Recommendation inputs

---

### schemes

Stores:

* Scheme metadata
* Tags
* Eligibility

---

### saved_schemes

Stores:

* User bookmarks

---

### document_checks

Stores:

* AI document analysis results

---

# Recommendation Engine Architecture

## Overview

Recommendations are generated through database matching.

No AI involved.

---

## User Attributes

Used for matching:

```text
Occupation

State

Age

Gender

Income

Education
```

---

## Scheme Attributes

Used for matching:

```text
occupation_tags

state_tags

gender_tags

age_min

age_max

income_min

income_max
```

---

## Matching Process

```text
User Profile

↓

Retrieve Matching Schemes

↓

Calculate Relevance Score

↓

Sort Results

↓

Return Recommendations
```

---

## Example

User:

```json
{
  "occupation": "doctor",
  "state": "madhya_pradesh",
  "age": 31
}
```

Scheme:

```json
{
  "occupation_tags": ["doctor"],
  "state_tags": ["madhya_pradesh"]
}
```

Result:

```text
Recommendation Score: High
```

No AI request made.

---

# AI Architecture

## Feature 1

### Find Me Scheme

Route:

```text
/find-scheme
```

User enters:

```text
I am a farmer affected by floods.
```

Process:

```text
User Input

↓

Keyword Extraction

↓

Retrieve Candidate Schemes

↓

Send Candidates + User Prompt to AI

↓

AI Ranking

↓

Response
```

---

## Feature 2

### Document Checker

Route:

```text
/apply
```

Process:

```text
Upload Document

↓

Extract Content

↓

AI Validation

↓

Missing Items Detection

↓

Readiness Score
```

---

# Storage Architecture

## Supabase Storage

Bucket:

```text
documents
```

Stores:

* Uploaded certificates
* Verification documents

---

# State Management

## Strategy

Minimal client-side state.

Primary source of truth:

* Database

Use:

* Server Components
* Server Actions

Client state only for:

* Form inputs
* Filters
* Menu state
* Animation state

---

# Performance Strategy

## Caching

Scheme data is relatively static.

Cache:

* Scheme lists
* Categories
* States

---

## Pagination

Always paginate:

```text
20 schemes per page
```

---

## Search

Use database indexes.

Never load all schemes into memory.

---

# Security

## Authentication

Protected Routes:

```text
/dashboard

/profile

/apply

/saved-schemes
```

---

## Authorization

Every database query must be scoped to:

```text
user_id
```

---

## Row Level Security

Enabled on all user-owned tables.

---

# Animations

## Cursor Follower

Size:

```text
8px
```

Color:

```css
#FEFECC
```

Rules:

* Hidden on touch devices
* Smooth GSAP interpolation

---

## Card Hover

```text
translateY(-4px)

scale(1.01)
```

Duration:

```text
0.2s
```

---

## Page Entry

```text
opacity

translateY(12px)
```

Duration:

```text
0.4s
```

---

# Monitoring

Future Ready:

* Vercel Analytics
* Supabase Monitoring
* OpenAI Usage Tracking

---

# Non-Violation Rules

These rules must never be broken.

### Rule 1

Business logic never lives in UI components.

---

### Rule 2

Database access never occurs inside components.

---

### Rule 3

Recommendation engine never uses AI.

---

### Rule 4

OpenAI may only be called from:

* Find Me Scheme
* Document Checker

---

### Rule 5

ReactBits navigation component must not be replaced.

---

### Rule 6

Supabase Auth is the only authentication provider.

---

### Rule 7

All database access must use Drizzle ORM.

---

### Rule 8

Every user-owned table must enforce RLS.

---

### Rule 9

Scheme filtering must happen in SQL.

---

### Rule 10

Server Components are default. Client Components are exceptions.
