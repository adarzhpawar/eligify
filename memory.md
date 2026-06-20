# Memory — Individual Document Feedback & Storage Fixes

Last updated: 2026-06-20 16:53:00

## What was built
- **Individual Document Feedback:** Upgraded the "Apply Now" document AI checking feature. Modified `src/actions/documents.ts` so Gemini evaluates each uploaded file individually rather than just giving a blanket readiness score.
- **AI UI Mapping:** Updated `ApplyClient.tsx` and `DocumentStatusCard.tsx` to map specific AI feedback, statuses (valid, invalid, unrelated), and confidence scores directly to individual document cards.
- **Processing Overlay:** Added a full-screen blurred loading overlay with `LogoLoader` that activates while the AI is reviewing documents, solving UX issues where users thought the page froze.
- **Copy Changes:** Updated the heading in `src/app/schemes/page.tsx` from "Matching Schemes" to "All Schemes".

## Decisions made
- **Strict Confidence Threshold:** Added logic in `ApplyClient.tsx` ensuring that if the AI's `confidence` score for a specific document falls below 50%, the document is strictly rendered as `invalid` and loses its "Verified" badge.
- **UI Error Handling:** Replaced native browser `alert()` popups with inline error UI components when document processing fails.
- **Design Tokens:** Purged hardcoded hex colors (`#ffdad6`, `#5f613a`) from apply components and replaced them with the project's official CSS variables (e.g., `var(--color-eg-error-light)`).

## Problems solved
- **Drizzle db:push bug:** Generated a migration for the new `document_feedback` JSONB column, but `db:push` crashed due to a known bug. Fixed by manually executing the SQL via a one-off node script.
- **Supabase Bucket Missing:** Uploads were failing due to a missing `documents` bucket. Wrote and executed a script to create the bucket and apply the correct Row-Level Security (RLS) policies for user uploads.

## Current state
- The AI document checker is fully functional, type-safe, and provides granular file-by-file feedback.
- File uploads work correctly with the Supabase storage bucket.

## Next session starts with
- Proceeding with the next major feature on the roadmap or refining the user onboarding flow.

## Open questions
- None.