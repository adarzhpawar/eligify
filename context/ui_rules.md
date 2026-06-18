# ui_rules.md

# Purpose

This document converts design tokens into implementation behavior.

While `ui_tokens.md` defines visual values, this file defines how the interface behaves.

Every page, component, interaction, and layout must follow these rules.

The goal is to create:

* Trust
* Clarity
* Speed
* Premium Feel
* Low Cognitive Load

---

# Design Philosophy

Eligify is not a government portal.

Eligify is:

```txt
Premium AI Productivity Software
for Government Scheme Discovery
```

The UI should feel closer to:

* Linear
* Notion
* Perplexity
* Stripe

than traditional government websites.

---

# Global Layout Rules

## Layout Rule 01

### Warm Background Canvas

Every page uses:

```css
background:
var(--color-background);
```

Never place content directly on the page.

Content should sit inside cards.

---

## Layout Rule 02

### Maximum Width

Desktop:

```css
1440px
```

Container:

```css
max-width:
var(--container-max-width);
```

---

## Layout Rule 03

### Horizontal Margins

Desktop:

```css
64px
```

Mobile:

```css
20px
```

---

## Layout Rule 04

### Vertical Rhythm

Use spacing scale only.

Preferred spacing:

```txt
24px
32px
48px
64px
```

Avoid cramped layouts.

---

# Navigation Rules

## Navbar Structure

Layout:

```txt
[ Eligify Logo ]



[ Menu ] [ Logout ]
```

No navigation links.

No mega menus.

No breadcrumbs.

---

## Navbar Behavior

### Sticky

Always visible.

```css
position: sticky;
top: 0;
```

---

### Glass Effect

```css
background:
rgba(250,250,242,0.85);

backdrop-filter:
blur(12px);
```

---

### Height

```css
72px
```

---

### Shadow

Appears only after scrolling.

---

# ReactBits Menu Rules

ReactBits menu is mandatory.

---

Menu Items:

```txt
Dashboard

Browse Schemes

Find Me Scheme

Apply

Saved Schemes

Profile
```

---

Menu must read from:

```txt
src/config/navigation.ts
```

No hardcoded menu items.

---

# Dashboard Rules

## Dashboard Layout

Use:

```txt
Bento Grid Layout
```

Not a list.

Not stacked cards.

---

## Dashboard Sections

Required:

### Welcome Hero

```txt
Hello, Rahul 👋
```

Large typography.

---

### Recommended Schemes

Primary block.

Largest card.

---

### Saved Schemes

Secondary card.

---

### AI Insights

Accent card.

Uses AI background token.

---

### Profile Summary

Quick profile overview.

---

# Dashboard Card Rules

All dashboard cards:

```css
background:
white;

border-radius:
24px;
```

No borders.

Use shadow.

---

# Scheme List Rules

Route:

```txt
/schemes
```

---

## Layout

Desktop:

```txt
Filters Sidebar

+

Results Grid
```

---

Mobile:

```txt
Filter Drawer

+

Results
```

---

## Search

Always visible.

Pinned at top.

---

## Filters

Required:

```txt
State

Occupation

Gender

Income

Age
```

---

## Sorting

Required:

```txt
Newest

Closing Soon

Alphabetical
```

---

# Scheme Card Rules

Cards show only:

```txt
Scheme Name

Target Group

Start Date

End Date

Apply Button

View Details
```

Nothing else.

No long descriptions.

---

## Hover

```css
translateY(-4px);

scale(1.01);
```

Duration:

```css
200ms;
```

---

# Scheme Details Rules

Route:

```txt
/schemes/[id]
```

---

## Layout

Single-column reading experience.

---

## Required Sections

### Overview

---

### Benefits

---

### Eligibility

---

### Required Documents

---

### Application Process

---

### Official Apply Link

---

## Important Dates

Display using:

```txt
Vertical Timeline
```

Not tables.

---

# Find Me Scheme Rules

Route:

```txt
/find-scheme
```

---

## Layout

Desktop:

```txt
40%

Prompt Panel

60%

Results Panel
```

---

Mobile:

```txt
Stacked
```

Prompt first.

Results second.

---

## Prompt Panel

Contains:

* User prompt
* Conversation history

---

## Results Panel

Contains:

* AI Recommendations
* Match Scores
* Apply CTA

---

## Recommendation Cards

Use:

```css
background:
var(--color-ai-background);
```

Must visually stand out.

---

# Apply Page Rules

Route:

```txt
/apply
```

---

## Layout

Desktop:

```txt
40%

Document Checklist

60%

Upload Workspace
```

---

## Left Side

Required Documents

Checklist

Progress

---

## Right Side

Upload Area

AI Analysis

Readiness Score

---

# Document Status Rules

Verified:

```txt
Green
```

Missing:

```txt
Red
```

Processing:

```txt
Yellow
```

---

# Profile Rules

Route:

```txt
/profile
```

---

## Layout

Centered.

Maximum width:

```css
900px
```

---

## Sections

### Personal Information

---

### Occupation

---

### Income

---

### Education

---

### Language

---

### Save Button

Sticky on mobile.

---

# Form Rules

## Inputs

Height:

```css
56px
```

Radius:

```css
12px
```

---

## Focus State

Border:

```css
2px solid #222222;
```

---

## Labels

Always visible.

Never rely on placeholders.

---

## Validation

Inline.

Immediate feedback.

---

# Button Rules

## Primary

Background:

```css
#222222
```

Text:

```css
#FFFFFF
```

Height:

```css
56px
```

---

## Secondary

White background.

Dark text.

Subtle border.

---

## AI Button

Uses accent glow.

Reserved for:

```txt
Find Me Scheme

Document Checker
```

Only.

---

# Card Rules

## Standard Cards

Background:

```css
#FFFFFF
```

Radius:

```css
24px
```

Shadow:

```css
var(--shadow-sm)
```

---

## Hoverable Cards

Add:

```css
translateY(-4px);
```

and

```css
var(--shadow-hover)
```

---

# Modal Rules

Radius:

```css
24px
```

---

Shadow:

```css
var(--shadow-md)
```

---

Maximum Width:

```css
640px
```

---

# Empty State Rules

Every page must have an empty state.

---

## Saved Schemes

```txt
No saved schemes yet.

Start exploring schemes.
```

---

## Recommendations

```txt
Complete your profile
to receive recommendations.
```

---

# Loading State Rules

Never use spinners alone.

Use skeletons.

---

Dashboard:

```txt
Bento Skeletons
```

---

Scheme Cards:

```txt
Card Skeletons
```

---

# Error State Rules

Show:

```txt
Problem

Explanation

Retry Action
```

Always.

---

Never show:

```txt
Something went wrong
```

without context.

---

# Responsive Rules

## Mobile

0 → 767px

---

## Tablet

768 → 1023px

---

## Desktop

1024px+

````

---

## Mobile Layout Principles

Everything stacks vertically.

No horizontal scrolling.

---

## AI Pages

Split layouts become:

```txt
Top

Prompt

Bottom

Results
````

---

# Accessibility Rules

Minimum:

```txt
WCAG AA
```

---

## Focus Visibility

All interactive elements require visible focus.

---

## Touch Targets

Minimum:

```css
44px
```

---

## Contrast

All text must pass:

```txt
AA contrast ratio
```

---

# Animation Rules

Animations must feel premium.

Never distracting.

---

## Duration

Default:

```css
300ms
```

---

## Easing

```css
cubic-bezier(
0.4,
0,
0.2,
1
)
```

---

## Allowed Animations

### Fade

### Slide

### Scale

### Lift

---

## Forbidden

### Bounce

### Elastic

### Flash

### Shake

---

# Cursor Follower Rules

Desktop only.

---

Size:

```css
8px
```

---

Color:

```css
#FEFECC
```

---

Hidden:

```txt
Touch Devices
```

---

# Non-Violation Rules

## Rule 01

Dashboard must use Bento layout.

---

## Rule 02

Find Me Scheme must use split-pane layout.

---

## Rule 03

Apply page must use split-pane layout.

---

## Rule 04

Scheme cards remain minimal.

---

## Rule 05

ReactBits menu cannot be replaced.

---

## Rule 06

No page may use raw Tailwind colors.

---

## Rule 07

All cards use rounded corners and shadows.

---

## Rule 08

AI-generated content must be visually differentiated.

---

## Rule 09

Loading states must use skeletons.

---

## Rule 10

Every interaction must feel smooth, calm, and premium.
