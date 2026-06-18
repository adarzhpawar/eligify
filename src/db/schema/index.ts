import { pgTable, uuid, timestamp, text, integer, numeric, boolean, date, jsonb, index, unique } from 'drizzle-orm/pg-core'

export const profiles = pgTable('profiles', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: uuid('user_id').notNull().unique(),
  fullName: text('full_name').notNull(),
  age: integer('age').notNull(),
  gender: text('gender'),
  state: text('state').notNull(),
  district: text('district'),
  occupation: text('occupation').notNull(),
  employmentStatus: text('employment_status'),
  annualIncome: numeric('annual_income'),
  education: text('education'),
  preferredLanguage: text('preferred_language'),
  profileCompleted: boolean('profile_completed').default(false).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
})

export const schemes = pgTable('schemes', {
  id: uuid('id').primaryKey().defaultRandom(),
  slug: text('slug').notNull().unique(),
  title: text('title').notNull(),
  description: text('description').notNull(),
  category: text('category').notNull(),
  targetGroup: text('target_group').notNull(),
  benefits: text('benefits').notNull(),
  eligibility: text('eligibility').notNull(),
  applicationProcess: text('application_process').notNull(),
  requiredDocuments: jsonb('required_documents').$type<string[]>().default([]).notNull(),
  officialUrl: text('official_url'),
  startDate: date('start_date'),
  endDate: date('end_date'),
  ministry: text('ministry').notNull(),
  schemeType: text('scheme_type').notNull(),
  occupationTags: text('occupation_tags').array().default([]).notNull(),
  stateTags: text('state_tags').array().default([]).notNull(),
  genderTags: text('gender_tags').array().default([]).notNull(),
  educationTags: text('education_tags').array().default([]).notNull(),
  ageMin: integer('age_min'),
  ageMax: integer('age_max'),
  incomeMin: numeric('income_min'),
  incomeMax: numeric('income_max'),
  isActive: boolean('is_active').default(true).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
}, (table) => [
  index('schemes_occupation_tags_idx').using('gin', table.occupationTags),
  index('schemes_state_tags_idx').using('gin', table.stateTags),
  index('schemes_gender_tags_idx').using('gin', table.genderTags),
  index('schemes_education_tags_idx').using('gin', table.educationTags),
  index('schemes_start_date_idx').on(table.startDate),
  index('schemes_end_date_idx').on(table.endDate),
  index('schemes_is_active_idx').on(table.isActive),
  index('schemes_category_idx').on(table.category),
])

export const savedSchemes = pgTable('saved_schemes', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: uuid('user_id')
    .notNull()
    .references(() => profiles.userId, { onDelete: 'cascade' }),
  schemeId: uuid('scheme_id')
    .notNull()
    .references(() => schemes.id, { onDelete: 'cascade' }),
  createdAt: timestamp('created_at').defaultNow().notNull(),
}, (table) => [
  unique('saved_schemes_user_id_scheme_id_key').on(table.userId, table.schemeId),
  index('saved_schemes_user_id_idx').on(table.userId),
])

export const aiSchemeSearches = pgTable('ai_scheme_searches', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: uuid('user_id').references(() => profiles.userId, { onDelete: 'cascade' }),
  userPrompt: text('user_prompt').notNull(),
  matchedSchemeIds: uuid('matched_scheme_ids').array().default([]).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
}, (table) => [
  index('ai_scheme_searches_user_id_idx').on(table.userId),
])

export const documentChecks = pgTable('document_checks', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: uuid('user_id')
    .notNull()
    .references(() => profiles.userId, { onDelete: 'cascade' }),
  schemeId: uuid('scheme_id')
    .notNull()
    .references(() => schemes.id, { onDelete: 'cascade' }),
  readinessScore: integer('readiness_score'),
  status: text('status').notNull().default('pending'),
  uploadedDocuments: jsonb('uploaded_documents').$type<string[]>().default([]).notNull(),
  missingDocuments: jsonb('missing_documents').$type<string[]>().default([]).notNull(),
  aiSummary: text('ai_summary'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
}, (table) => [
  index('document_checks_user_id_idx').on(table.userId),
  index('document_checks_scheme_id_idx').on(table.schemeId),
])
