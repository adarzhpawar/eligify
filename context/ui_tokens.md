# ui_tokens.md

# Eligify AI Design Tokens

## Purpose

This file defines the complete visual design language of Eligify AI.

All UI styling must derive from these tokens.

Components must never use:

* Hardcoded colors
* Raw Tailwind colors
* Arbitrary spacing values

The design system is inspired by:

* Premium SaaS products
* Modern government technology
* Editorial interfaces
* AI-native workflows

Core emotion:

> Assisted Confidence

The interface should feel:

* Trustworthy
* Premium
* Calm
* Intelligent
* Fast

---

# Tailwind v4 Theme

All tokens must be defined inside:

```css
app/globals.css
```

using:

```css
@theme
```

---

# Color System

## Core Brand Colors

```css
--color-background: #FAFAF2;
--color-surface: #FFFFFF;

--color-text-primary: #222222;
--color-text-secondary: #666666;

--color-accent: #FEFECC;
```

---

## Extended Surface Scale

```css
--color-surface-dim: #DBDAD9;

--color-surface-low: #F5F3F3;

--color-surface-container: #EFEDED;

--color-surface-high: #E9E8E7;

--color-surface-highest: #E4E2E2;
```

---

## Text Colors

```css
--color-text-primary: #222222;

--color-text-secondary: #666666;

--color-text-muted: #8A8989;

--color-text-disabled: #A9A8A8;

--color-text-inverse: #FFFFFF;
```

---

## Border Colors

```css
--color-border: rgba(34, 34, 34, 0.1);

--color-border-strong: rgba(34, 34, 34, 0.2);

--color-border-focus: #222222;
```

---

## Status Colors

### Success

```css
--color-success: #4CAF50;

--color-success-light: #E8F5E9;

--color-success-dark: #2E7D32;
```

---

### Warning

```css
--color-warning: #F59E0B;

--color-warning-light: #FEF3C7;
```

---

### Error

```css
--color-error: #BA1A1A;

--color-error-light: #FFDAD6;
```

---

### Information

```css
--color-info: #2563EB;

--color-info-light: #DBEAFE;
```

---

# AI Color System

Used only for:

* AI Recommendations
* AI Insights
* AI Suggestions
* Document Analysis

```css
--color-ai-background: #FEFECC;

--color-ai-border: #F3F3A0;

--color-ai-text: #222222;
```

---

# Typography

## Font Family

```css
--font-sans: "Plus Jakarta Sans", sans-serif;
```

This is the only approved font family.

---

# Font Weights

```css
--font-weight-regular: 400;

--font-weight-medium: 500;

--font-weight-semibold: 600;

--font-weight-bold: 700;

--font-weight-extrabold: 800;
```

---

# Display Scale

## Display XL

Used for:

* Landing Hero
* Dashboard Greeting

```css
--text-display-xl: 48px;
--leading-display-xl: 1.1;
--tracking-display-xl: -0.02em;
```

---

## Display Mobile

```css
--text-display-mobile: 32px;
--leading-display-mobile: 1.2;
```

---

# Headings

## Heading XL

```css
--text-heading-xl: 32px;
--leading-heading-xl: 1.2;
--tracking-heading-xl: -0.01em;
```

---

## Heading LG

```css
--text-heading-lg: 24px;
--leading-heading-lg: 1.3;
```

---

## Heading MD

```css
--text-heading-md: 20px;
--leading-heading-md: 1.4;
```

---

## Heading SM

```css
--text-heading-sm: 18px;
--leading-heading-sm: 1.4;
```

---

# Body Text

## Body Large

```css
--text-body-lg: 18px;
--leading-body-lg: 1.6;
```

---

## Body Medium

```css
--text-body-md: 16px;
--leading-body-md: 1.6;
```

---

## Body Small

```css
--text-body-sm: 14px;
--leading-body-sm: 1.6;
```

---

# Labels

## Label Medium

```css
--text-label-md: 14px;
--leading-label-md: 1.4;
```

Weight:

```css
600
```

---

## Label Small

```css
--text-label-sm: 12px;
--leading-label-sm: 1.4;
```

Weight:

```css
500
```

---

# Radius Scale

The platform uses a soft premium shape language.

---

## Radius XS

```css
--radius-xs: 8px;
```

---

## Radius SM

```css
--radius-sm: 12px;
```

Used for:

* Inputs
* Buttons

---

## Radius MD

```css
--radius-md: 16px;
```

Used for:

* Dropdowns
* Side Panels

---

## Radius LG

```css
--radius-lg: 20px;
```

Used for:

* Primary Cards

---

## Radius XL

```css
--radius-xl: 24px;
```

Used for:

* Hero Cards
* AI Panels
* Dashboard Widgets

---

## Radius Full

```css
--radius-full: 9999px;
```

Used for:

* Chips
* Badges
* Status Pills

---

# Spacing System

Base Unit:

```css
8px
```

---

## Spacing Scale

```css
--space-1: 4px;

--space-2: 8px;

--space-3: 12px;

--space-4: 16px;

--space-5: 20px;

--space-6: 24px;

--space-8: 32px;

--space-10: 40px;

--space-12: 48px;

--space-16: 64px;

--space-20: 80px;

--space-24: 96px;
```

---

# Layout Tokens

## Container Width

```css
--container-max-width: 1440px;
```

---

## Desktop Margin

```css
--page-margin-desktop: 64px;
```

---

## Mobile Margin

```css
--page-margin-mobile: 20px;
```

---

## Grid Gutter

```css
--grid-gutter: 24px;
```

---

# Shadow System

## Elevation 1

Cards

```css
--shadow-sm:
0px 10px 30px rgba(34,34,34,0.05);
```

---

## Elevation 2

Modals

```css
--shadow-md:
0px 20px 50px rgba(34,34,34,0.1);
```

---

## Elevation Hover

Interactive Cards

```css
--shadow-hover:
0px 25px 60px rgba(34,34,34,0.12);
```

---

# Motion System

## Standard Duration

```css
--duration-fast: 200ms;

--duration-normal: 300ms;

--duration-slow: 500ms;
```

---

## Standard Easing

```css
--ease-standard:
cubic-bezier(0.4, 0, 0.2, 1);
```

Mandatory for:

* Hover
* Focus
* Menu transitions
* Page transitions

---

# Z Index Scale

```css
--z-base: 1;

--z-dropdown: 100;

--z-sticky: 200;

--z-overlay: 500;

--z-modal: 1000;

--z-toast: 1200;

--z-cursor: 9999;
```

---

# Cursor Follower Tokens

```css
--cursor-size: 8px;

--cursor-color: #FEFECC;

--cursor-blur: 0px;
```

---

# Scheme Status Tokens

## Eligible

```css
--scheme-status-eligible:
var(--color-success);
```

---

## Closing Soon

```css
--scheme-status-closing:
var(--color-warning);
```

---

## Expired

```css
--scheme-status-expired:
var(--color-error);
```

---

# AI Match Score Tokens

## High Match

```css
--match-high:
#4CAF50;
```

---

## Medium Match

```css
--match-medium:
#F59E0B;
```

---

## Low Match

```css
--match-low:
#BA1A1A;
```

---

# Non-Violation Rules

## Rule 1

Never hardcode colors.

---

## Rule 2

Never use raw Tailwind colors.

Forbidden:

```tsx
bg-yellow-100
text-gray-600
border-black
```

---

## Rule 3

Only Plus Jakarta Sans.

---

## Rule 4

Cards must use radius LG or XL.

---

## Rule 5

AI-generated content must use AI color tokens.

---

## Rule 6

All transitions must use:

```css
300ms cubic-bezier(0.4,0,0.2,1)
```

---

## Rule 7

All design decisions must derive from this file.
