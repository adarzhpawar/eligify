import { db } from '@/db'
import { profiles, schemes } from '@/db/schema'
import { eq, sql, and, gte, desc } from 'drizzle-orm'

/**
 * Maps profile occupation slugs → scheme occupation tag values.
 * The scheme data uses mixed-case tags like "Farmer", "Doctor", "Student".
 * The profile form saves lowercase slugs like "farmer", "doctor", "student".
 * This mapping bridges that gap and expands generic profile values
 * (e.g. "tech") into multiple applicable scheme tags.
 *
 * All mapped values are stored in lowercase for case-insensitive comparison.
 */
const OCCUPATION_MAP: Record<string, string[]> = {
  farmer: ['farmer', 'self-employed'],
  doctor: ['doctor', 'medical', 'healthcare'],
  student: ['student'],
  tech: ['salaried', 'self-employed'],
  healthcare: ['doctor', 'medical', 'healthcare', 'salaried'],
  education: ['salaried', 'student'],
  finance: ['salaried', 'self-employed'],
  government: ['salaried', 'government'],
  other: ['self-employed'],
}

/** Scoring weights — must sum to 100 */
const WEIGHTS = {
  occupation: 25,
  state: 20,
  age: 20,
  income: 15,
  gender: 10,
  education: 10,
} as const

/** Columns selected for recommendation scoring + display */
const RECOMMENDATION_COLUMNS = {
  id: schemes.id,
  title: schemes.title,
  description: schemes.description,
  ministry: schemes.ministry,
  startDate: schemes.startDate,
  endDate: schemes.endDate,
  category: schemes.category,
  targetGroup: schemes.targetGroup,
  occupationTags: schemes.occupationTags,
  stateTags: schemes.stateTags,
  genderTags: schemes.genderTags,
  educationTags: schemes.educationTags,
  ageMin: schemes.ageMin,
  ageMax: schemes.ageMax,
  incomeMin: schemes.incomeMin,
  incomeMax: schemes.incomeMax,
} as const

type RecommendationScheme = {
  id: string
  title: string
  description: string
  ministry: string
  startDate: string | null
  endDate: string | null
  category: string
  targetGroup: string
  occupationTags: string[]
  stateTags: string[]
  genderTags: string[]
  educationTags: string[]
  ageMin: number | null
  ageMax: number | null
  incomeMin: string | null
  incomeMax: string | null
}

type ScoredScheme = RecommendationScheme & {
  matchPercentage: number
}

export type UserAttributes = {
  age: number
  income: number
  occupationTags: string[]
  state: string
  gender: string
  education: string
}

export async function getUserAttributes(userId: string): Promise<UserAttributes | null> {
  const profile = await db.query.profiles.findFirst({
    where: eq(profiles.userId, userId),
  })

  if (!profile) return null

  return {
    age: profile.age,
    income: profile.annualIncome ? parseFloat(profile.annualIncome.toString()) : 0,
    occupationTags: OCCUPATION_MAP[(profile.occupation ?? '').toLowerCase()] ?? [(profile.occupation ?? '').toLowerCase()],
    state: (profile.state ?? '').toLowerCase(),
    gender: (profile.gender ?? '').toLowerCase(),
    education: (profile.education ?? '').toLowerCase(),
  }
}

export function computeMatchScoreSql(userAttrs: UserAttributes) {
  const userGender = userAttrs.gender || ''
  const noGenderProvided = !userGender || userGender === 'prefer-not'
  const userEducation = userAttrs.education || ''
  const noEduProvided = !userEducation
  const userOccTags = userAttrs.occupationTags.length > 0 
    ? sql.join(userAttrs.occupationTags.map(t => sql`${t}`), sql`, `)
    : sql``

  return sql<number>`ROUND(
    CASE 
      WHEN cardinality(${schemes.occupationTags}) = 0 OR 'all' = ANY(${schemes.occupationTags}) THEN 15
      WHEN ${schemes.occupationTags} && ARRAY[${userOccTags}]::text[] THEN 25
      ELSE 0 
    END +
    CASE 
      WHEN cardinality(${schemes.stateTags}) = 0 OR 'all' = ANY(${schemes.stateTags}) THEN 12
      WHEN ${userAttrs.state} = ANY(${schemes.stateTags}) THEN 20
      ELSE 0 
    END +
    CASE 
      WHEN ${schemes.ageMin} IS NULL AND ${schemes.ageMax} IS NULL THEN 10
      WHEN (${schemes.ageMin} IS NULL OR ${userAttrs.age} >= ${schemes.ageMin}) 
       AND (${schemes.ageMax} IS NULL OR ${userAttrs.age} <= ${schemes.ageMax}) THEN 20
      WHEN (${schemes.ageMin} IS NOT NULL AND ${userAttrs.age} >= ${schemes.ageMin} - 5 AND ${userAttrs.age} < ${schemes.ageMin}) 
        OR (${schemes.ageMax} IS NOT NULL AND ${userAttrs.age} <= ${schemes.ageMax} + 5 AND ${userAttrs.age} > ${schemes.ageMax}) THEN 10
      ELSE 0 
    END +
    CASE 
      WHEN ${schemes.incomeMin} IS NULL AND ${schemes.incomeMax} IS NULL THEN 10.5
      WHEN (${schemes.incomeMin} IS NULL OR ${userAttrs.income} >= ${schemes.incomeMin}::numeric) 
       AND (${schemes.incomeMax} IS NULL OR ${userAttrs.income} <= ${schemes.incomeMax}::numeric) THEN 15
      ELSE 0 
    END +
    CASE 
      WHEN cardinality(${schemes.genderTags}) = 0 OR 'all' = ANY(${schemes.genderTags}) THEN 8
      WHEN ${noGenderProvided} THEN 4
      WHEN ${userGender} = ANY(${schemes.genderTags}) THEN 10
      ELSE 0 
    END +
    CASE 
      WHEN cardinality(${schemes.educationTags}) = 0 OR 'all' = ANY(${schemes.educationTags}) THEN 7
      WHEN ${noEduProvided} THEN 3
      WHEN ${userEducation} = ANY(${schemes.educationTags}) THEN 10
      ELSE 0 
    END
  )`
}

export async function getRecommendedSchemes(userId: string): Promise<ScoredScheme[]> {
  const userAttrs = await getUserAttributes(userId)

  if (!userAttrs) {
    return []
  }

  const scoreSql = computeMatchScoreSql(userAttrs)

  const results = await db
    .select({
      ...RECOMMENDATION_COLUMNS,
      matchPercentage: scoreSql
    })
    .from(schemes)
    .where(
      and(
        eq(schemes.isActive, true),
        gte(scoreSql, 30)
      )
    )
    .orderBy(desc(scoreSql))

  return results as ScoredScheme[]
}

// ────────────────────────────────────────────────────────────────
// Scoring Engine
// ────────────────────────────────────────────────────────────────

/** Minimal shape required by the scoring functions */
type ScoringInput = {
  occupationTags: string[]
  stateTags: string[]
  genderTags: string[]
  educationTags: string[]
  ageMin: number | null
  ageMax: number | null
  incomeMin: string | null
  incomeMax: string | null
}

export function computeMatchScore(
  scheme: ScoringInput,
  user: UserAttributes
): number {
  let total = 0

  total += scoreOccupation(scheme, user)
  total += scoreState(scheme, user)
  total += scoreAge(scheme, user)
  total += scoreIncome(scheme, user)
  total += scoreGender(scheme, user)
  total += scoreEducation(scheme, user)

  return Math.round(total)
}

/**
 * Helper: normalize an array of tags to lowercase for comparison.
 * Treats "All" as a wildcard indicator.
 */
function normalizeTags(tags: string[]): string[] {
  return tags.map((t) => t.toLowerCase().trim())
}

function hasWildcard(normalizedTags: string[]): boolean {
  return normalizedTags.includes('all')
}

// ── Occupation (25 pts) ──

function scoreOccupation(
  scheme: ScoringInput,
  user: UserAttributes
): number {
  const tags = normalizeTags(scheme.occupationTags)

  // No tags or wildcard "All" → open to everyone, partial credit
  if (tags.length === 0 || hasWildcard(tags)) return WEIGHTS.occupation * 0.6

  // Check if any user occupation tag matches any scheme tag
  const matched = user.occupationTags.some((ut) => tags.includes(ut))
  return matched ? WEIGHTS.occupation : 0
}

// ── State (20 pts) ──

function scoreState(
  scheme: ScoringInput,
  user: UserAttributes
): number {
  const tags = normalizeTags(scheme.stateTags)

  if (tags.length === 0 || hasWildcard(tags)) return WEIGHTS.state * 0.6

  const matched = tags.includes(user.state)
  return matched ? WEIGHTS.state : 0
}

// ── Age (20 pts) ──

function scoreAge(
  scheme: ScoringInput,
  user: UserAttributes
): number {
  const min = scheme.ageMin
  const max = scheme.ageMax

  // No age constraints → open to all, partial credit
  if (min === null && max === null) return WEIGHTS.age * 0.5

  const withinMin = min === null || user.age >= min
  const withinMax = max === null || user.age <= max

  if (withinMin && withinMax) return WEIGHTS.age

  // Near boundary (within 5 years) → partial credit
  const AGE_MARGIN = 5
  const nearMin = min !== null && user.age >= min - AGE_MARGIN && user.age < min
  const nearMax = max !== null && user.age <= max + AGE_MARGIN && user.age > max

  if (nearMin || nearMax) return WEIGHTS.age * 0.5

  return 0
}

// ── Income (15 pts) ──

function scoreIncome(
  scheme: ScoringInput,
  user: UserAttributes
): number {
  const incomeMin = scheme.incomeMin ? parseFloat(scheme.incomeMin.toString()) : null
  const incomeMax = scheme.incomeMax ? parseFloat(scheme.incomeMax.toString()) : null

  // No income constraints → open to all, partial credit
  if (incomeMin === null && incomeMax === null) return WEIGHTS.income * 0.7

  const aboveMin = incomeMin === null || user.income >= incomeMin
  const belowMax = incomeMax === null || user.income <= incomeMax

  if (aboveMin && belowMax) return WEIGHTS.income

  return 0
}

// ── Gender (10 pts) ──

function scoreGender(
  scheme: ScoringInput,
  user: UserAttributes
): number {
  const tags = normalizeTags(scheme.genderTags)

  if (tags.length === 0 || hasWildcard(tags)) return WEIGHTS.gender * 0.8

  // If user hasn't specified gender, give partial credit
  if (!user.gender || user.gender === 'prefer-not') return WEIGHTS.gender * 0.4

  const matched = tags.includes(user.gender)
  return matched ? WEIGHTS.gender : 0
}

// ── Education (10 pts) ──

function scoreEducation(
  scheme: ScoringInput,
  user: UserAttributes
): number {
  const tags = normalizeTags(scheme.educationTags)

  if (tags.length === 0 || hasWildcard(tags)) return WEIGHTS.education * 0.7

  // If user hasn't specified education, give partial credit
  if (!user.education) return WEIGHTS.education * 0.3

  const matched = tags.includes(user.education)
  return matched ? WEIGHTS.education : 0
}
