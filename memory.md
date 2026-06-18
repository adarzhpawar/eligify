# Memory — Scheme List Enhancements & Apply Page UI Fixes

Last updated: 2026-06-18 12:27:00

## What was built

- **Scheme Sorting**: Created `src/components/schemes/SchemeSort.tsx` adding 5 sort options (Relevance, Match Score, Newest Added, Closing Soon, Alphabetical) to the scheme list page.
- **Match Score Sorting**: Updated `src/app/schemes/page.tsx` and `src/services/schemes.ts` to support fetching all schemes when `sort='match'`, allowing us to compute match scores for the entire pool in memory and then perform pagination locally.
- **Extended Filters**: Overhauled `src/components/schemes/SchemeFilters.tsx` to include an exhaustive list of all 32 Indian States and Union Territories, and expanded the Occupation filter from 4 to 11 distinct categories.

## Decisions made

- **In-Memory Sorting for Match Scores**: Since `matchPercentage` is calculated in JavaScript (based on logged-in user profile) rather than in SQL, sorting by match score requires fetching all active filtered schemes from the database, calculating the score for each, and then slicing the array for pagination on the frontend server. Added a `fetchAll` flag to the `getFilteredSchemes` service.

## Problems solved

- **Hardcoded Date Bug**: Fixed a UI issue in `src/app/schemes/[id]/apply/ApplyClient.tsx` where the "Application Closes: 14 Days" red banner was statically hardcoded. Now, it calculates the remaining days dynamically using `scheme.endDate`. If the `endDate` is null, it displays a green "Accepting Applications (Open Enrollment)" badge instead.

## Current state

- The Scheme List page provides robust sorting and comprehensive filtering.
- The Apply page correctly reflects scheme deadlines and open enrollment statuses.
- The application passes standard `npm run type-check`.

## Next session starts with

- Continuing work on feature enhancements or reviewing any incoming user feedback for the newly added sorting and filtering capabilities.

## Open questions

- The `fetchAll` flag in `getFilteredSchemes` retrieves all matches into memory to sort by Match Score. If the scheme database grows to tens of thousands of records, we may need to reconsider moving the scoring logic to SQL or setting an upper limit to prevent memory bloating.