import React from 'react'
import { getSchemeById } from '@/services/schemes'
import { notFound } from 'next/navigation'
import PageContainer from '@/components/layout/PageContainer'
import { ApplyClient } from './ApplyClient'
import { createClient } from '@/lib/supabase/server'
import { db } from '@/db'
import { documentChecks } from '@/db/schema'
import { eq, and } from 'drizzle-orm'

type Params = Promise<{ id: string }>

export default async function ApplyPage({ params }: { params: Params }) {
  const resolvedParams = await params
  const schemeId = resolvedParams.id
  
  const scheme = await getSchemeById(schemeId)
  if (!scheme) {
    notFound()
  }

  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  let existingCheck = null;
  if (user) {
    const checks = await db
      .select()
      .from(documentChecks)
      .where(and(eq(documentChecks.userId, user.id), eq(documentChecks.schemeId, schemeId)))
      .limit(1);
    if (checks.length > 0) {
      existingCheck = checks[0];
    }
  }

  return (
    <div className="bg-background min-h-screen pb-32">
      <PageContainer>
        <main className="py-12 space-y-12">
          <ApplyClient scheme={scheme} initialCheck={existingCheck ? {
            ...existingCheck,
            readinessScore: existingCheck.readinessScore ?? undefined,
            aiSummary: existingCheck.aiSummary ?? undefined,
          } : null} />
        </main>
      </PageContainer>

      {/* Bottom Sticky Action Bar */}
      <div className="fixed bottom-0 left-0 w-full bg-card/90 backdrop-blur-md border-t border-border/20 shadow-[0px_-10px_30px_rgba(34,34,34,0.05)] z-40 transition-all duration-300">
        <div className="max-w-[1440px] mx-auto px-5 lg:px-16 py-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
              <span className="material-symbols-outlined text-muted-foreground">info</span>
            </div>
            <div>
              <span className="block text-[14px] font-semibold text-foreground">
                {existingCheck?.readinessScore === 100 ? "Ready to apply!" : "Not quite ready yet."}
              </span>
              <span className="block text-[14px] text-muted-foreground text-sm">
                {existingCheck?.readinessScore === 100 ? "All documents verified." : "Complete all required documents to proceed."}
              </span>
            </div>
          </div>
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button className="flex-1 sm:flex-none px-6 py-3 rounded-full border border-border text-[14px] font-semibold text-foreground hover:bg-muted transition-colors h-[48px]">
              Save Progress
            </button>
            {scheme.officialUrl ? (
              <a 
                href={scheme.officialUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center flex-1 sm:flex-none px-6 py-3 rounded-full bg-foreground text-background text-[14px] font-semibold transition-all duration-300 shadow-[0px_10px_30px_rgba(34,34,34,0.05)] h-[48px] hover:bg-foreground/90"
              >
                Proceed to Official Application
              </a>
            ) : (
              <button 
                disabled={true} 
                className="flex-1 sm:flex-none px-6 py-3 rounded-full bg-foreground text-background text-[14px] font-semibold transition-all duration-300 shadow-[0px_10px_30px_rgba(34,34,34,0.05)] h-[48px] opacity-50 cursor-not-allowed"
              >
                Proceed to Official Application
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
