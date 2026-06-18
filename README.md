# Eligify AI

Eligify AI is a premium AI-powered Government Scheme Discovery Platform designed to help citizens effortlessly navigate government opportunities, discover eligible schemes within minutes, and become application-ready.

It acts as an intelligent guidance layer on top of official government systems.

## Features

- **Instant Recommendations:** Powered by a fast, deterministic SQL-based recommendation engine matching your profile (Occupation, State, Gender, Income, Age, Education).
- **AI Scheme Finder:** A natural language discovery tool leveraging OpenAI to help you find schemes when you aren't sure what to search for.
- **Document Readiness Checker:** Uses AI to verify if you have the correct documents prepared before applying, reducing application mistakes.
- **Saved Schemes:** Keep track of your relevant schemes.
- **Premium User Interface:** Built with Shadcn UI, GSAP micro-interactions, and tailored typography for a modern, assisted, and confident user experience.

## Tech Stack

**Frontend:**
- [Next.js 16](https://nextjs.org/) (App Router)
- React 19
- TypeScript
- Tailwind CSS v4
- Shadcn UI
- GSAP & Framer Motion
- ReactBits Navigation

**Backend & Database:**
- [Supabase](https://supabase.com/) (Authentication & Database)
- PostgreSQL
- [Drizzle ORM](https://orm.drizzle.team/)

**AI Engine:**
- OpenAI (Restricted strictly to the Natural Language Finder and Document Checker)

## Getting Started

First, make sure you have the required environment variables set up in your `.env.local` file:
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `OPENAI_API_KEY`
- `DATABASE_URL` (for Drizzle)

Then, install dependencies and run the development server:

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Database Migrations

This project uses Drizzle ORM to manage database schemas. To push changes to the database:

```bash
npm run db:push
```

## Architecture Notes

- **Fast First Architecture:** Recommendations and filtering run fully in SQL via Postgres, avoiding high memory footprints on the server. AI is used *only* where reasoning adds value, preserving deterministic speed for standard matching.
- **Strict Separation of Concerns:** UI components are kept separate from business logic, which is housed in `/services` and `/actions`. 

## License

MIT
