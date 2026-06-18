# build_plan.md

# Development Roadmap

## Core Philosophy

The application must be built in layers.

Each phase must:

* Be independently testable
* Be visually complete before logic is added
* Have clear acceptance criteria
* Avoid dependencies on future phases

No feature should be started until its dependencies are complete.

---

# Phase 1 — Foundation

## Objective

Establish project infrastructure.

Deliver authentication, database setup, and application shell.

---

# Feature 01

## Feature Name

Project Initialization

### Description

Create base Next.js project architecture and install all required dependencies.

### Dependencies

None

### Files Impacted

```text
package.json

next.config.ts

tsconfig.json

src/
```

### Tasks

* Initialize Next.js App Router
* Configure TypeScript strict mode
* Install Tailwind v4
* Install Shadcn UI
* Install Supabase SDK
* Install Drizzle ORM
* Install GSAP
* Configure ESLint
* Configure Prettier

### Acceptance Criteria

* Application boots successfully
* No TypeScript errors
* No ESLint errors

### Verification

```bash
npm run dev
npm run lint
npm run build
```

---

# Feature 02

## Feature Name

Supabase Setup

### Description

Configure Supabase authentication, database access, and storage.

### Dependencies

Feature 01

### Files Impacted

```text
src/lib/supabase

.env.local
```

### Tasks

* Configure Supabase client
* Configure server client
* Configure auth helpers
* Configure storage access

### Acceptance Criteria

* Supabase connection succeeds
* Auth session accessible

### Verification

* Login works
* Session retrieval works

---

# Feature 03

## Feature Name

Drizzle ORM Setup

### Description

Create database schema and migration system.

### Dependencies

Feature 02

### Files Impacted

```text
src/db/schema

src/db/migrations
```

### Tasks

* Install Drizzle
* Configure PostgreSQL connection
* Create migration workflow

### Acceptance Criteria

* Schema generated successfully
* Migrations run successfully

### Verification

```bash
drizzle-kit generate

drizzle-kit migrate
```

---

# Feature 04

## Feature Name

Application Layout

### Description

Build root layout and navigation shell.

### Dependencies

Feature 01

### Files Impacted

```text
layout.tsx

Navbar.tsx
```

### Tasks

* Global layout
* Theme setup
* ReactBits menu integration
* Logout button
* Logo placement

### Acceptance Criteria

* Navigation visible
* Menu functional

### Verification

* Navigation works on desktop
* Navigation works on mobile

---

# Phase 2 — Authentication

## Objective

Allow users to register and login.

---

# Feature 05

## Feature Name

Register Page

### Description

Create registration page using Supabase Auth.

### Dependencies

Feature 02

### Route

```text
/register
```

### Fields

* Email
* Password
* Confirm Password

### Acceptance Criteria

* User account created successfully

### Verification

* User appears in Supabase Auth

---

# Feature 06

## Feature Name

Login Page

### Description

Allow users to authenticate.

### Dependencies

Feature 05

### Route

```text
/login
```

### Fields

* Email
* Password

### Acceptance Criteria

* User logs in successfully

### Verification

* Session created

---

# Feature 07

## Feature Name

Protected Routes

### Description

Prevent unauthorized access.

### Dependencies

Feature 06

### Protected Pages

```text
/dashboard

/profile

/apply

/saved-schemes
```

### Acceptance Criteria

* Unauthorized users redirected to login

### Verification

* Access blocked when logged out

---

# Phase 3 — User Onboarding

## Objective

Collect user information required for recommendations.

---

# Feature 08

## Feature Name

Profile Creation

### Description

Create onboarding form.

### Dependencies

Feature 06

### Route

```text
/onboarding
```

### Fields

* Name
* Age
* Gender
* State
* District
* Occupation
* Education
* Income
* Preferred Language

### Acceptance Criteria

* Profile saved

### Verification

* Profile record created

---

# Feature 09

## Feature Name

Profile Management

### Description

Allow editing profile information.

### Dependencies

Feature 08

### Route

```text
/profile
```

### Acceptance Criteria

* Profile updates correctly

### Verification

* Database reflects updates

---

# Phase 4 — Scheme Data System

## Objective

Create complete scheme database and retrieval system.

---

# Feature 10

## Feature Name

Scheme Database

### Description

Create schemes table and seed data pipeline.

### Dependencies

Feature 03

### Acceptance Criteria

* Schemes stored successfully

### Verification

* Query returns schemes

---

# Feature 11

## Feature Name

Recommendation Engine

### Description

Rule-based scheme recommendation engine.

### Dependencies

Feature 08
Feature 10

### Matching Inputs

* Occupation
* State
* Gender
* Age
* Income

### AI Usage

NOT ALLOWED

### Acceptance Criteria

* Relevant schemes returned

### Verification

* Test profiles return expected schemes

---

# Phase 5 — Dashboard

## Objective

Deliver personalized experience.

---

# Feature 12

## Feature Name

Dashboard

### Description

Display personalized recommendations.

### Dependencies

Feature 11

### Route

```text
/dashboard
```

### Sections

* Welcome Message
* Recommended Schemes
* Quick Actions
* Recently Saved Schemes

### Acceptance Criteria

* Recommendations appear

### Verification

* User sees relevant schemes

---

# Phase 6 — Scheme Directory

## Objective

Create scheme browsing experience.

---

# Feature 13

## Feature Name

Scheme List Page

### Route

```text
/schemes
```

### Features

* Search
* Filters
* Sorting

### Filters

* State
* Occupation
* Gender
* Age
* Income

### Acceptance Criteria

* Filters work correctly

### Verification

* Results update correctly

---

# Feature 14

## Feature Name

Scheme Details

### Route

```text
/schemes/[id]
```

### Sections

* Overview
* Benefits
* Eligibility
* Required Documents
* Application Process
* Official Link

### Acceptance Criteria

* Scheme information displayed

### Verification

* Details match database

---

# Phase 7 — Saved Schemes

## Objective

Allow bookmarking.

---

# Feature 15

## Feature Name

Save Scheme

### Description

Users can bookmark schemes.

### Dependencies

Feature 12

### Acceptance Criteria

* Scheme saved

### Verification

* Record created

---

# Feature 16

## Feature Name

Saved Schemes Page

### Route

```text
/saved-schemes
```

### Acceptance Criteria

* Saved schemes visible

### Verification

* User sees bookmarks

---

# Phase 8 — AI Scheme Finder

## Objective

Natural language discovery.

---

# Feature 17

## Feature Name

Find Me Scheme

### Route

```text
/find-scheme
```

### Description

User describes needs.

### Example

```text
I am a farmer whose crop was damaged due to rain.
```

### Process

1. Retrieve candidate schemes
2. Send candidates to AI
3. AI ranks results

### Acceptance Criteria

* Relevant schemes returned

### Verification

* AI returns ranked recommendations

---

# Phase 9 — Apply Flow

## Objective

Application preparation.

---

# Feature 18

## Feature Name

Apply Page

### Route

```text
/apply
```

### Features

* Select scheme
* Upload documents
* Review requirements

### Acceptance Criteria

* Documents upload successfully

### Verification

* Files stored

---

# Feature 19

## Feature Name

Document Checker

### Description

AI-powered readiness analysis.

### Dependencies

Feature 18

### AI Usage

ALLOWED

### Validation

* Readability
* Missing pages
* Missing documents
* Image quality
* Name consistency

### Acceptance Criteria

* Readiness score generated

### Verification

* AI analysis returned

---

# Phase 10 — UI Polish

## Objective

Improve user experience.

---

# Feature 20

## Feature Name

Cursor Follower

### Dependencies

Feature 04

### Requirements

* Accent color dot
* Hidden on touch devices
* GSAP animation

### Acceptance Criteria

* Smooth cursor tracking

---

# Feature 21

## Feature Name

Micro Interactions

### Dependencies

Feature 20

### Features

* Card hover
* Button feedback
* Page transitions

### Acceptance Criteria

* Animations feel smooth

---

# Feature 22

## Feature Name

Performance Optimization

### Description

Optimize application for production.

### Tasks

* Query optimization
* Index optimization
* Bundle optimization
* Cache optimization

### Acceptance Criteria

Dashboard:

```text
< 2 seconds
```

Scheme Search:

```text
< 1 second
```

Recommendation Engine:

```text
< 1 second
```

---

# Definition Of Done

A feature is complete only when:

* Acceptance criteria pass
* Verification passes
* Build succeeds
* Lint succeeds
* Type checks succeed
* No console errors
* No TypeScript errors
* Documentation updated

---

# Build Order (Mandatory)

```text
01 Project Initialization

02 Supabase Setup

03 Drizzle Setup

04 Application Layout

05 Register

06 Login

07 Protected Routes

08 Onboarding

09 Profile

10 Scheme Database

11 Recommendation Engine

12 Dashboard

13 Scheme List

14 Scheme Details

15 Save Scheme

16 Saved Schemes

17 Find Me Scheme

18 Apply

19 Document Checker

20 Cursor Follower

21 Micro Interactions

22 Performance Optimization
```

Agents must follow this order unless explicitly instructed otherwise.
