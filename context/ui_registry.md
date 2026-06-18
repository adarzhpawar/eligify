# ui_registry.md

# Purpose

This file is the official UI component registry for Eligify AI.

Every reusable UI component must be registered here before implementation.

This registry acts as the single source of truth for:

* Component ownership
* Component usage
* Reusability
* Dependencies
* Design consistency

Agents must always check this file before creating new components.

---

# Component Status Definitions

## Planned

Component exists in registry but not implemented.

---

## In Progress

Currently being implemented.

---

## Complete

Fully implemented and tested.

---

## Deprecated

Should not be used in future development.

---

# Layout Components

---

## Component

### AppNavbar

#### Path

```txt
src/components/layout/AppNavbar.tsx
```

#### Purpose

Global navigation.

#### Props

```ts
type AppNavbarProps = {
  user?: User;
};
```

#### Dependencies

```txt
ReactBits Menu
LogoutButton
EligifyLogo
```

#### Tailwind Classes

```txt
sticky
top-0
backdrop-blur-md
h-[72px]
```

#### Reusability

Global

#### Status

Planned

---

## Component

### PageContainer

#### Path

```txt
src/components/layout/PageContainer.tsx
```

#### Purpose

Consistent page width.

#### Props

```ts
type PageContainerProps = {
  children: React.ReactNode;
};
```

#### Dependencies

None

#### Tailwind Classes

```txt
max-w-[1440px]
mx-auto
px-5
lg:px-16
```

#### Reusability

Global

#### Status

Planned

---

## Component

### BentoGrid

#### Path

```txt
src/components/layout/BentoGrid.tsx
```

#### Purpose

Dashboard layout system.

#### Props

```ts
type BentoGridProps = {
  children: React.ReactNode;
};
```

#### Dependencies

None

#### Reusability

Dashboard

#### Status

Planned

---

## Component

### SplitPane

#### Path

```txt
src/components/layout/SplitPane.tsx
```

#### Purpose

40/60 desktop layout.

#### Props

```ts
type SplitPaneProps = {
  left: React.ReactNode;
  right: React.ReactNode;
};
```

#### Dependencies

None

#### Reusability

Find Scheme
Apply

#### Status

Planned

---

## Component

### CenteredLayout

#### Path

```txt
src/components/layout/CenteredLayout.tsx
```

#### Purpose

Authentication and onboarding.

#### Status

Planned

---

# Navigation Components

---

## Component

### ReactBitsMenu

#### Path

```txt
src/components/navigation/ReactBitsMenu.tsx
```

#### Purpose

Primary navigation menu.

#### Dependencies

User supplied ReactBits component.

#### Reusability

Global

#### Status

Planned

---

## Component

### LogoutButton

#### Path

```txt
src/components/navigation/LogoutButton.tsx
```

#### Purpose

User logout action.

#### Status

Planned

---

## Component

### EligifyLogo

#### Path

```txt
src/components/navigation/EligifyLogo.tsx
```

#### Purpose

Brand logo.

#### Status

Planned

---

# Dashboard Components

---

## Component

### DashboardHero

#### Path

```txt
src/components/dashboard/DashboardHero.tsx
```

#### Purpose

Greeting section.

Example:

```txt
Hello, Rahul 👋
```

#### Status

Planned

---

## Component

### RecommendedSchemesWidget

#### Purpose

Display personalized recommendations.

#### Dependencies

SchemeCard

#### Status

Planned

---

## Component

### AIInsightCard

#### Purpose

AI generated suggestions.

#### Styling

Uses AI token colors.

#### Status

Planned

---

## Component

### SavedSchemesWidget

#### Purpose

Quick access to bookmarks.

#### Status

Planned

---

## Component

### ProfileSummaryCard

#### Purpose

Display user profile summary.

#### Status

Planned

---

# Scheme Components

---

## Component

### SchemeCard

#### Path

```txt
src/components/schemes/SchemeCard.tsx
```

#### Purpose

Display scheme preview.

#### Props

```ts
type SchemeCardProps = {
  scheme: Scheme;
};
```

#### Fields Displayed

```txt
Scheme Name
Target Group
Start Date
End Date
```

#### Actions

```txt
Apply
View Details
```

#### Status

Planned

---

## Component

### SchemeGrid

#### Purpose

Render collection of scheme cards.

#### Status

Planned

---

## Component

### SchemeSearch

#### Purpose

Search input.

#### Status

Planned

---

## Component

### SchemeFilters

#### Purpose

Filtering system.

#### Filters

```txt
State
Occupation
Gender
Income
Age
```

#### Status

Planned

---

## Component

### SchemeSort

#### Purpose

Sorting control.

#### Options

```txt
Newest
Closing Soon
Alphabetical
```

#### Status

Planned

---

## Component

### SchemeTimeline

#### Purpose

Display important dates.

#### Usage

Scheme Details Page

#### Status

Planned

---

## Component

### SchemeDetailsSection

#### Purpose

Reusable details block.

#### Usage

Benefits
Eligibility
Documents
Process

#### Status

Planned

---

# Find Me Scheme Components

---

## Component

### PromptPanel

#### Path

```txt
src/components/find-scheme/PromptPanel.tsx
```

#### Purpose

User prompt input.

#### Status

Planned

---

## Component

### ConversationHistory

#### Purpose

Display previous prompts.

#### Status

Planned

---

## Component

### AIRecommendationCard

#### Purpose

Display AI ranked schemes.

#### Styling

AI tokens only.

#### Status

Planned

---

## Component

### MatchScoreBadge

#### Purpose

Display recommendation score.

#### Status

Planned

---

# Apply Components

---

## Component

### DocumentChecklist

#### Purpose

Required documents.

#### Status

Planned

---

## Component

### UploadZone

#### Purpose

Drag and drop uploads.

#### Status

Planned

---

## Component

### UploadedDocumentCard

#### Purpose

Preview uploaded files.

#### Status

Planned

---

## Component

### ReadinessScore

#### Purpose

Display AI readiness score.

#### Status

Planned

---

## Component

### MissingDocumentsCard

#### Purpose

Missing document summary.

#### Status

Planned

---

# Profile Components

---

## Component

### ProfileForm

#### Purpose

Edit profile.

#### Status

Planned

---

## Component

### ProfileSummary

#### Purpose

Profile overview.

#### Status

Planned

---

# Authentication Components

---

## Component

### LoginForm

#### Route

```txt
/login
```

#### Status

Planned

---

## Component

### RegisterForm

#### Route

```txt
/register
```

#### Status

Planned

---

## Component

### OnboardingForm

#### Route

```txt
/onboarding
```

#### Status

Planned

---

# Button Components

---

## Component

### PrimaryButton

#### Purpose

Main actions.

#### Styling

```txt
Background:
#222222

Text:
#FFFFFF
```

#### Status

Planned

---

## Component

### SecondaryButton

#### Purpose

Secondary actions.

#### Status

Planned

---

## Component

### AIActionButton

#### Purpose

AI-specific actions.

#### Usage

```txt
Find Me Scheme

Document Checker
```

Only.

#### Status

Planned

---

# Input Components

---

## Component

### TextInput

#### Purpose

Standard input.

#### Status

Planned

---

## Component

### SelectInput

#### Purpose

Dropdown.

#### Status

Planned

---

## Component

### SearchInput

#### Purpose

Search field.

#### Status

Planned

---

## Component

### TextareaInput

#### Purpose

Long-form input.

#### Status

Planned

---

# Card Components

---

## Component

### BaseCard

#### Purpose

Foundation card component.

#### Styling

```txt
White
24px Radius
Ambient Shadow
```

#### Status

Planned

---

## Component

### AIInsightCard

#### Purpose

AI-highlighted content.

#### Status

Planned

---

## Component

### StatusCard

#### Purpose

Success
Warning
Error

#### Status

Planned

---

# Modal Components

---

## Component

### BaseModal

#### Purpose

Reusable modal.

#### Status

Planned

---

## Component

### ConfirmationModal

#### Purpose

Destructive actions.

#### Status

Planned

---

# State Components

---

## Component

### EmptyState

#### Purpose

No data available.

#### Status

Planned

---

## Component

### LoadingState

#### Purpose

Skeleton loaders.

#### Status

Planned

---

## Component

### ErrorState

#### Purpose

Recoverable errors.

#### Status

Planned

---

# Utility Components

---

## Component

### CursorFollower

#### Purpose

Accent cursor dot.

#### Size

```txt
8px
```

#### Color

```txt
#FEFECC
```

#### Status

Planned

---

## Component

### PageTransition

#### Purpose

Page entry animations.

#### Status

Planned

---

## Component

### ScrollShadow

#### Purpose

Navbar shadow on scroll.

#### Status

Planned

---

# Future Components

Not included in MVP.

---

## SchemeComparison

Compare schemes side by side.

---

## DeadlineReminder

Upcoming deadlines.

---

## NotificationCenter

Alerts and reminders.

---

## VoiceAssistant

Voice-based discovery.

---

# Registry Rules

## Rule 01

No component may be created unless registered here.

---

## Rule 02

Components must be reused before creating new ones.

---

## Rule 03

Every page-specific component belongs in its page directory.

---

## Rule 04

Global UI belongs inside:

```txt
src/components/ui
```

---

## Rule 05

Layout components belong inside:

```txt
src/components/layout
```

---

## Rule 06

ReactBitsMenu is mandatory.

---

## Rule 07

BaseCard must be used before creating custom card variants.

---

## Rule 08

Every component must have a single responsibility.

---

## Rule 09

AI-specific components must use AI design tokens.

---

## Rule 10

This registry is the source of truth for all UI development.
