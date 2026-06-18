import { createClient } from '@supabase/supabase-js'
import postgres from 'postgres'
import 'dotenv/config'

async function checkConnection() {
  console.log('--- Checking Supabase Client Connection ---')
  createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  )
  
  // Test connection by fetching the current time from the DB, or just checking auth state
  // Wait, the anon key might not have access to select random tables. 
  // Let's just use the Postgres connection string which has direct access.
  console.log('Supabase client initialized successfully.\n')

  console.log('--- Checking Direct Postgres Connection (for Drizzle) ---')
  if (!process.env.DATABASE_URL) {
    console.error('DATABASE_URL is not set!')
    process.exit(1)
  }

  const sql = postgres(process.env.DATABASE_URL)
  try {
    const result = await sql`SELECT version()`
    console.log('✅ Successfully connected to the database!')
    console.log('Postgres Version:', result[0].version)
  } catch (error) {
    console.error('❌ Failed to connect to the database:')
    console.error(error.message)
  } finally {
    await sql.end()
  }
}

checkConnection()
