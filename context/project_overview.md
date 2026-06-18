# project_overview.md

# Eligify AI

## Core Vision

Eligify AI is an intelligent government scheme discovery and application readiness platform that helps Indian citizens identify, understand, and prepare for government schemes they are eligible for.

The platform does not attempt to replace official government portals.

Instead, it acts as an intelligent layer above existing government infrastructure by simplifying discovery, reducing information overload, and helping users prepare stronger applications.

The primary goal is to reduce the effort required for citizens to:

* Discover schemes
* Understand eligibility
* Compare opportunities
* Prepare required documents
* Navigate application processes

while maintaining fast performance, low operating costs, and high reliability.

---

# Problem Statement

India has thousands of central and state government schemes.

Most citizens face several challenges:

### Discovery Problem

Users often do not know:

* Which schemes exist
* Which schemes are relevant
* Which schemes they qualify for

### Information Fragmentation

Scheme information is spread across:

* Government websites
* Department portals
* PDFs
* News articles

making it difficult to understand.

### Eligibility Confusion

Users often struggle to determine:

* Whether they qualify
* Which criteria apply
* Which documents are required

### Application Readiness Problem

Many applications fail because:

* Documents are incomplete
* Documents are invalid
* Users misunderstand requirements

### Existing Portal Limitation

Government portals such as MyScheme already provide scheme discovery.

However they primarily function as information repositories.

Eligify AI focuses on:

* Faster discovery
* Better personalization
* Natural language assistance
* Document readiness verification

---

# Product Positioning

Eligify AI is NOT:

* A government portal
* An application submission platform
* A scheme approval authority

Eligify AI IS:

* A discovery platform
* An eligibility assistant
* A scheme recommendation engine
* A document readiness assistant

---

# Target Audience

## Primary Audience

Indian citizens seeking benefits from government schemes.

### Students

Seeking:

* Scholarships
* Education grants
* Skill development programs

### Farmers

Seeking:

* Agricultural subsidies
* Compensation schemes
* Equipment assistance
* Insurance benefits

### Entrepreneurs

Seeking:

* Startup grants
* MSME support
* Loans
* Business incentives

### Healthcare Workers

Seeking:

* Medical assistance programs
* Rural service incentives
* Healthcare grants

### Women

Seeking:

* Women empowerment schemes
* Financial assistance programs
* Education opportunities

### Senior Citizens

Seeking:

* Pension programs
* Healthcare support
* Social welfare benefits

---

# User Personas

## Persona 1

### Rahul Sharma

Age: 22

Occupation: Student

Location: Madhya Pradesh

Goals:

* Find scholarship opportunities
* Discover education grants

Pain Points:

* Doesn't know available schemes
* Finds government websites confusing

Success Criteria:

* Receives relevant scholarship recommendations in under 10 seconds

---

## Persona 2

### Suresh Verma

Age: 45

Occupation: Farmer

Location: Uttar Pradesh

Goals:

* Find subsidy schemes
* Find compensation programs

Pain Points:

* Limited digital literacy
* Limited awareness of available schemes

Success Criteria:

* Receives relevant agriculture schemes without searching manually

---

## Persona 3

### Dr. Mehta

Age: 34

Occupation: Doctor

Location: Rajasthan

Goals:

* Discover healthcare incentives
* Find rural service grants

Pain Points:

* Difficult to identify relevant programs

Success Criteria:

* Relevant schemes automatically appear on dashboard

---

# User Journey

## Registration

User creates account using:

* Email
* Password

---

## Profile Setup

User completes onboarding.

Required fields:

* Full Name
* Age
* Gender
* State
* District
* Occupation
* Education
* Annual Income
* Preferred Language

---

## Dashboard

System automatically matches profile against scheme database.

User sees:

* Personalized recommendations
* Recently added schemes
* Saved schemes

No AI calls occur during this process.

---

## Browse Schemes

User explores all schemes using:

* Search
* Filters
* Sorting

---

## Find Me Scheme

User describes needs in natural language.

Example:

"I am a farmer whose crops were damaged due to heavy rain."

System:

* Retrieves candidate schemes
* Sends candidate schemes to AI
* AI ranks results

---

## Scheme Details

User reviews:

* Benefits
* Eligibility
* Required documents
* Application process

---

## Document Check

User uploads documents.

AI analyzes:

* Readability
* Completeness
* Missing documents
* Potential issues

---

## Apply

User follows official government application link.

Eligify AI does not submit applications.

---

# User Stories

## Authentication

As a user,

I want to create an account

so that my profile and recommendations are saved.

---

## Profile

As a user,

I want to complete a profile

so that schemes can be matched to me automatically.

---

## Dashboard

As a user,

I want personalized recommendations

so that I don't need to search manually.

---

## Scheme Search

As a user,

I want filters and search

so that I can quickly find relevant schemes.

---

## AI Scheme Finder

As a user,

I want to describe my situation naturally

so that I receive better recommendations.

---

## Document Checker

As a user,

I want my documents reviewed

so that I can avoid application mistakes.

---

# Features In Scope

## Authentication

* Email signup
* Email login
* Logout

---

## Profile Management

* Create profile
* Edit profile
* Save profile

---

## Dashboard

* Personalized recommendations
* Saved schemes
* Quick actions

---

## Scheme Directory

* Search
* Filters
* Sorting
* Scheme details

---

## AI Scheme Finder

Natural language scheme discovery.

---

## Document Checker

AI-powered readiness verification.

---

## Saved Schemes

Bookmark schemes for later review.

---

# Features Out Of Scope

The following are intentionally excluded from MVP:

* Direct government integration
* Auto application submission
* Form auto-filling
* WhatsApp integration
* Mobile applications
* Aadhaar authentication
* OTP login
* Multi-user organizations
* Government official dashboard
* Application tracking from government portals

---

# Functional Requirements

## FR-01

Users must be able to register.

## FR-02

Users must be able to login.

## FR-03

Users must be able to create profiles.

## FR-04

System must generate personalized recommendations.

## FR-05

Users must browse all schemes.

## FR-06

Users must search schemes.

## FR-07

Users must filter schemes.

## FR-08

Users must save schemes.

## FR-09

Users must use AI Scheme Finder.

## FR-10

Users must upload documents.

## FR-11

System must analyze uploaded documents.

## FR-12

Users must access official scheme application links.

---

# Non Functional Requirements

## Performance

Dashboard load:

< 2 seconds

Scheme search:

< 1 second

Recommendation generation:

< 1 second

---

## Scalability

Support:

* 100,000+ users
* 50,000+ schemes

without architectural changes.

---

## Security

* Supabase Auth
* Row Level Security
* Secure file uploads
* Protected API routes

---

## Reliability

Target uptime:

99.9%

---

## Accessibility

WCAG AA compliance.

---

# AI Usage Policy

AI usage must remain limited.

AI is expensive and unnecessary for deterministic matching.

AI MAY ONLY be used for:

* Find Me Scheme
* Document Checker

AI MUST NOT be used for:

* Dashboard recommendations
* Scheme filtering
* Scheme search
* Profile matching
* Sorting

---

# Recommendation Engine Policy

Recommendations are generated through:

* Occupation matching
* State matching
* Gender matching
* Income matching
* Age matching

using database queries.

No LLM calls are permitted.

---

# Success Criteria

The MVP is successful when:

### User Success

* Users discover relevant schemes within 2 minutes

### Technical Success

* Dashboard loads under 2 seconds
* Recommendations generated without AI

### Business Success

* Low AI costs
* High recommendation relevance
* High engagement with saved schemes

---

# Future Expansion

Potential future features:

* Regional language support
* Voice search
* Scheme alerts
* Application deadline reminders
* Mobile app
* AI application guidance
* Scheme comparison engine
* Government API integrations

---

# Assumptions

The project assumes:

* Scheme data will be available through manual imports, APIs, or structured datasets.
* Users will apply through official government portals.
* Supabase will be used for authentication and database management.
* OpenAI API keys will be provided later.
* Google Stitch generated designs will become the final UI source of truth.
