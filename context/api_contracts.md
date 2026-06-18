# api_contracts.md

# API Design Philosophy

The API layer exists to:

* Provide structured access to data
* Handle authentication
* Execute AI operations
* Validate requests
* Protect business logic

The API layer must remain thin.

Business logic belongs in:

```txt
lib/
services/
actions/
```

not inside route handlers.

---

# Global Standards

## Response Format

Every endpoint must return:

### Success

```json
{
  "success": true,
  "data": {}
}
```

---

### Error

```json
{
  "success": false,
  "error": "Error message"
}
```

---

# Authentication

## Provider

Supabase Auth

Authentication handled via:

```txt
supabase.auth
```

No custom authentication endpoints.

---

# Route Groups

```txt
/api/profile

/api/schemes

/api/saved-schemes

/api/find-scheme

/api/document-check
```

---

# Profile APIs

---

# Get Current Profile

## Route

```txt
GET /api/profile
```

---

## Purpose

Retrieve authenticated user's profile.

---

## Authentication

Required

---

## Request

No body.

---

## Response

```json
{
  "success": true,
  "data": {
    "full_name": "Rahul Sharma",
    "age": 22,
    "occupation": "student",
    "state": "madhya_pradesh"
  }
}
```

---

## Errors

### Unauthorized

```json
{
  "success": false,
  "error": "Unauthorized"
}
```

Status:

```txt
401
```

---

# Create Profile

## Route

```txt
POST /api/profile
```

---

## Purpose

Create onboarding profile.

---

## Authentication

Required

---

## Request Schema

```json
{
  "full_name": "Rahul Sharma",
  "age": 22,
  "gender": "male",
  "state": "madhya_pradesh",
  "district": "bhopal",
  "occupation": "student",
  "annual_income": 200000,
  "education": "bachelor",
  "preferred_language": "english"
}
```

---

## Validation Rules

### full_name

Required

Minimum:

```txt
2 characters
```

---

### age

Required

Range:

```txt
18 - 120
```

---

### occupation

Required

---

### state

Required

---

## Success Response

```json
{
  "success": true,
  "data": {
    "profile_created": true
  }
}
```

---

# Update Profile

## Route

```txt
PUT /api/profile
```

---

## Purpose

Update existing profile.

---

## Authentication

Required

---

## Request

Same schema as profile creation.

---

## Success

```json
{
  "success": true
}
```

---

# Scheme APIs

---

# Get Recommended Schemes

## Route

```txt
GET /api/schemes/recommended
```

---

## Purpose

Return personalized recommendations.

---

## Authentication

Required

---

## AI Usage

NOT ALLOWED

---

## Recommendation Inputs

```txt
occupation

state

gender

age

annual_income

education
```

---

## Example Response

```json
{
  "success": true,
  "data": [
    {
      "id": "scheme-id",
      "title": "National Scholarship Scheme",
      "end_date": "2026-12-31"
    }
  ]
}
```

---

# Get All Schemes

## Route

```txt
GET /api/schemes
```

---

## Purpose

Paginated scheme directory.

---

## Authentication

Optional

---

## Query Parameters

```txt
page

limit

search

state

occupation

gender

education

income_min

income_max
```

---

## Example

```txt
/api/schemes?page=1&limit=20
```

---

## Response

```json
{
  "success": true,
  "data": {
    "schemes": [],
    "pagination": {
      "page": 1,
      "limit": 20,
      "total": 200
    }
  }
}
```

---

# Get Scheme Details

## Route

```txt
GET /api/schemes/:id
```

---

## Purpose

Return complete scheme information.

---

## Response

```json
{
  "success": true,
  "data": {
    "id": "scheme-id",
    "title": "Scheme",
    "benefits": "...",
    "eligibility": "...",
    "required_documents": [],
    "application_process": "...",
    "official_url": "..."
  }
}
```

---

## Error

```json
{
  "success": false,
  "error": "Scheme not found"
}
```

Status:

```txt
404
```

---

# Saved Scheme APIs

---

# Save Scheme

## Route

```txt
POST /api/saved-schemes
```

---

## Authentication

Required

---

## Request

```json
{
  "scheme_id": "uuid"
}
```

---

## Validation

Scheme must exist.

---

## Success

```json
{
  "success": true,
  "data": {
    "saved": true
  }
}
```

---

# Remove Saved Scheme

## Route

```txt
DELETE /api/saved-schemes/:id
```

---

## Authentication

Required

---

## Success

```json
{
  "success": true
}
```

---

# Get Saved Schemes

## Route

```txt
GET /api/saved-schemes
```

---

## Authentication

Required

---

## Response

```json
{
  "success": true,
  "data": [
    {
      "scheme_id": "uuid",
      "title": "Scholarship Program"
    }
  ]
}
```

---

# AI Scheme Finder APIs

---

# Find Me Scheme

## Route

```txt
POST /api/find-scheme
```

---

## Purpose

Natural language scheme discovery.

---

## Authentication

Required

---

## AI Usage

ALLOWED

---

# Important Architecture Rule

Before AI execution:

```txt
Database Retrieval
MUST occur first.
```

AI never receives entire scheme database.

---

## Flow

```txt
User Prompt

↓

Keyword Extraction

↓

Retrieve Candidate Schemes

↓

Send Candidate Schemes

↓

AI Ranking

↓

Response
```

---

## Request

```json
{
  "prompt": "I am a farmer whose crop was damaged by rain."
}
```

---

## AI Prompt Context

Must include:

```txt
User Profile

Candidate Schemes
```

Only.

---

## Response

```json
{
  "success": true,
  "data": {
    "recommendations": [
      {
        "scheme_id": "uuid",
        "title": "Farmer Relief Program",
        "reason": "Relevant because..."
      }
    ]
  }
}
```

---

## Validation

Prompt length:

Minimum:

```txt
10 characters
```

Maximum:

```txt
1000 characters
```

---

# Document Checker APIs

---

# Check Documents

## Route

```txt
POST /api/document-check
```

---

## Authentication

Required

---

## AI Usage

ALLOWED

---

## Purpose

Analyze uploaded documents for readiness.

---

## Content Type

```txt
multipart/form-data
```

---

## Request

Fields:

```txt
scheme_id

documents[]
```

---

## Supported Formats

```txt
pdf

jpg

jpeg

png
```

---

## Maximum File Size

```txt
10MB per file
```

---

## Process

```txt
Upload

↓

Store

↓

Extract

↓

AI Analysis

↓

Readiness Score

↓

Response
```

---

## Example Response

```json
{
  "success": true,
  "data": {
    "readiness_score": 92,
    "missing_documents": [
      "Income Certificate"
    ],
    "summary": "Most documents are valid."
  }
}
```

---

## Error Response

```json
{
  "success": false,
  "error": "Unsupported file type"
}
```

Status:

```txt
400
```

---

# Scheme Analytics APIs

---

# Track Scheme View

## Route

```txt
POST /api/schemes/view
```

---

## Purpose

Track engagement.

---

## Authentication

Required

---

## Request

```json
{
  "scheme_id": "uuid"
}
```

---

## Response

```json
{
  "success": true
}
```

---

# Health Check

## Route

```txt
GET /api/health
```

---

## Purpose

System monitoring.

---

## Response

```json
{
  "success": true,
  "data": {
    "status": "healthy"
  }
}
```

---

# Error Codes

## 400

Bad Request

---

## 401

Unauthorized

---

## 403

Forbidden

---

## 404

Not Found

---

## 429

Rate Limited

---

## 500

Internal Server Error

---

# Security Requirements

## Authentication

Protected Routes:

```txt
/profile

/dashboard

/saved-schemes

/apply

/find-scheme
```

---

## Authorization

Every user-owned query must include:

```txt
user_id
```

filter.

---

## Input Validation

All request bodies must use:

```txt
Zod
```

validation schemas.

---

# Non-Violation Rules

## Rule 1

Dashboard recommendations must never call AI.

---

## Rule 2

Scheme filtering must never call AI.

---

## Rule 3

AI can only be used in:

```txt
POST /api/find-scheme

POST /api/document-check
```

---

## Rule 4

All endpoints must return standardized responses.

---

## Rule 5

All inputs must be validated before processing.

---

## Rule 6

AI must never receive the entire schemes table.

Only filtered candidate schemes may be sent.

---

## Rule 7

Route handlers remain thin.

Business logic belongs in service layers.

---

## Future APIs

Reserved for later releases:

```txt
/api/notifications

/api/reminders

/api/scheme-alerts

/api/translations

/api/comparisons
```

These are intentionally excluded from MVP.
