# database_schema.md

# Database Design Philosophy

The database is the heart of Eligify AI.

Recommendations, filtering, personalization, and eligibility matching are driven by structured data.

The system must never depend on AI for recommendation generation.

Instead:

* Users are structured into attributes.
* Schemes are structured into eligibility criteria.
* Matching is performed through SQL queries.

This approach provides:

* Faster responses
* Lower costs
* Better explainability
* Easier debugging

---

# Database Engine

## Provider

Supabase PostgreSQL

---

## ORM

Drizzle ORM

---

## Naming Standards

### Tables

Use:

```txt
snake_case
plural nouns
```

Examples:

```txt
profiles
schemes
saved_schemes
document_checks
```

---

### Columns

Use:

```txt
snake_case
```

Examples:

```txt
preferred_language

occupation_tags

income_min
```

---

# Entity Relationship Overview

```txt
auth.users
    │
    │ 1 : 1
    ▼
profiles

profiles
    │
    │ 1 : N
    ▼
saved_schemes

schemes
    │
    │ 1 : N
    ▼
saved_schemes

profiles
    │
    │ 1 : N
    ▼
document_checks

schemes
    │
    │ 1 : N
    ▼
document_checks
```

---

# Table: profiles

## Purpose

Stores all user information required for:

* Recommendations
* Eligibility matching
* Personalization

---

## Columns

| Column             | Type        | Nullable |
| ------------------ | ----------- | -------- |
| id                 | uuid        | no       |
| user_id            | uuid        | no       |
| full_name          | text        | no       |
| age                | integer     | no       |
| gender             | text        | yes      |
| state              | text        | no       |
| district           | text        | yes      |
| occupation         | text        | no       |
| annual_income      | numeric     | yes      |
| education          | text        | yes      |
| preferred_language | text        | yes      |
| profile_completed  | boolean     | no       |
| created_at         | timestamptz | no       |
| updated_at         | timestamptz | no       |

---

## Constraints

```sql
PRIMARY KEY(id)

UNIQUE(user_id)
```

---

## Relationship

```txt
One User
→ One Profile
```

---

## Indexes

```sql
INDEX(state)

INDEX(occupation)

INDEX(age)

INDEX(annual_income)
```

---

# Table: schemes

## Purpose

Stores all scheme metadata.

This is the most important table in the system.

---

## Columns

| Column              | Type        |
| ------------------- | ----------- |
| id                  | uuid        |
| slug                | text        |
| title               | text        |
| description         | text        |
| category            | text        |
| target_group        | text        |
| benefits            | text        |
| eligibility         | text        |
| application_process | text        |
| required_documents  | jsonb       |
| official_url        | text        |
| start_date          | date        |
| end_date            | date        |
| ministry            | text        |
| scheme_type         | text        |
| occupation_tags     | text[]      |
| state_tags          | text[]      |
| gender_tags         | text[]      |
| education_tags      | text[]      |
| age_min             | integer     |
| age_max             | integer     |
| income_min          | numeric     |
| income_max          | numeric     |
| is_active           | boolean     |
| created_at          | timestamptz |
| updated_at          | timestamptz |

---

## Example Record

```json
{
  "title": "Doctor Rural Incentive Scheme",

  "occupation_tags": [
    "doctor",
    "medical"
  ],

  "state_tags": [
    "madhya_pradesh"
  ],

  "age_min": 25,

  "age_max": 60,

  "income_max": 1000000
}
```

---

## Constraints

```sql
PRIMARY KEY(id)

UNIQUE(slug)
```

---

## Indexes

Critical:

```sql
GIN(occupation_tags)

GIN(state_tags)

GIN(gender_tags)

GIN(education_tags)
```

---

Additional:

```sql
INDEX(start_date)

INDEX(end_date)

INDEX(is_active)

INDEX(category)
```

---

# Table: saved_schemes

## Purpose

Allows users to bookmark schemes.

---

## Columns

| Column     | Type        |
| ---------- | ----------- |
| id         | uuid        |
| user_id    | uuid        |
| scheme_id  | uuid        |
| created_at | timestamptz |

---

## Constraints

```sql
PRIMARY KEY(id)
```

Prevent duplicates:

```sql
UNIQUE(user_id, scheme_id)
```

---

## Relationships

```txt
Profile
  └── Saved Schemes

Scheme
  └── Saved By Users
```

---

## Foreign Keys

```sql
user_id
→ profiles.user_id

scheme_id
→ schemes.id
```

---

# Table: document_checks

## Purpose

Stores AI analysis results.

---

## Columns

| Column             | Type        |
| ------------------ | ----------- |
| id                 | uuid        |
| user_id            | uuid        |
| scheme_id          | uuid        |
| readiness_score    | integer     |
| status             | text        |
| uploaded_documents | jsonb       |
| missing_documents  | jsonb       |
| ai_summary         | text        |
| created_at         | timestamptz |

---

## Status Values

```txt
pending

completed

failed
```

---

## Readiness Score

Range:

```txt
0 - 100
```

---

## Example

```json
{
  "readiness_score": 88,

  "missing_documents": [
    "Income Certificate"
  ]
}
```

---

# Table: scheme_views

## Purpose

Track user engagement.

Future recommendation improvements.

---

## Columns

| Column    | Type        |
| --------- | ----------- |
| id        | uuid        |
| user_id   | uuid        |
| scheme_id | uuid        |
| viewed_at | timestamptz |

---

# Table: ai_scheme_searches

## Purpose

Stores Find Me Scheme requests.

Analytics and future improvements.

---

## Columns

| Column             | Type        |
| ------------------ | ----------- |
| id                 | uuid        |
| user_id            | uuid        |
| user_prompt        | text        |
| matched_scheme_ids | uuid[]      |
| created_at         | timestamptz |

---

# Recommendation Engine Schema Rules

The recommendation engine depends on:

```txt
profiles

schemes
```

only.

---

# Matching Inputs

User:

```txt
occupation

state

gender

age

annual_income

education
```

---

Scheme:

```txt
occupation_tags

state_tags

gender_tags

education_tags

age_min

age_max

income_min

income_max
```

---

# Matching Query Example

```sql
SELECT *
FROM schemes

WHERE
is_active = true

AND age_min <= 25

AND age_max >= 25

AND occupation_tags @> ARRAY['doctor']

AND state_tags @> ARRAY['madhya_pradesh']

ORDER BY end_date ASC;
```

---

# AI Data Isolation Rules

AI should NEVER access:

```txt
all schemes table
```

directly.

---

Correct Flow:

```txt
User Prompt

↓

Database Retrieval

↓

Top Candidate Schemes

↓

AI Ranking

↓

Response
```

---

# Supabase Storage

## Bucket: documents

Purpose:

User uploads.

---

## Structure

```txt
documents

└── user_id

    ├── income-certificate.pdf

    ├── aadhaar.pdf

    ├── pan.pdf
```

---

## Access Rules

Only owner can:

* Upload
* View
* Delete

---

# Row Level Security

Required on:

```txt
profiles

saved_schemes

document_checks

scheme_views

ai_scheme_searches
```

---

# RLS Policy Example

```sql
user_id = auth.uid()
```

---

# Migration Strategy

Versioning:

```txt
001_profiles

002_schemes

003_saved_schemes

004_document_checks

005_scheme_views

006_ai_scheme_searches
```

Never modify old migrations.

Always create new migrations.

---

# Future Expansion Tables

Not included in MVP.

Possible future additions:

```txt
notifications

scheme_alerts

application_history

regional_translations

scheme_comparisons
```

---

# Database Non-Violation Rules

## Rule 1

Recommendation engine must only use database queries.

---

## Rule 2

AI cannot access entire scheme catalog.

---

## Rule 3

Every user-owned table requires RLS.

---

## Rule 4

All filtering happens in PostgreSQL.

---

## Rule 5

Every searchable field must be indexed.

---

## Rule 6

Tags must be normalized and lowercase.

Example:

```txt
doctor

student

farmer
```

Never:

```txt
Doctor

DOCTOR

Doctoring
```

---

## Rule 7

Scheme matching must remain deterministic.

No LLM-based recommendation generation is permitted.
