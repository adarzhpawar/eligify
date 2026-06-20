import React from 'react';
import Link from 'next/link';
import { BentoGrid } from '@/components/layout/BentoGrid';
import { DashboardHero } from '@/components/dashboard/DashboardHero';
import { MetricCard } from '@/components/dashboard/MetricCard';
import { AIInsightCard } from '@/components/dashboard/AIInsightCard';

import { SchemeCard } from '@/components/schemes/SchemeCard';

import { redirect } from "next/navigation";
import { getAuthUser, getProfile } from "@/lib/auth-cache";
import { getRecommendedSchemes } from "@/actions/schemes";
import { getSavedSchemes } from "@/actions/saved-schemes";
import { SavedSchemesWidget } from "@/components/dashboard/SavedSchemesWidget";

export const metadata = {
  title: 'Dashboard | Eligify',
};

export default async function DashboardPage() {
  const user = await getAuthUser();

  if (!user) {
    redirect("/login");
  }

  const profile = await getProfile();
  const fullName = profile?.fullName ?? "Citizen";
  const firstName = fullName.split(" ")[0];

  // Parallelize independent data fetches
  const [{ success, data: recommendations }, { success: savedSuccess, data: savedData }] = await Promise.all([
    getRecommendedSchemes(),
    getSavedSchemes(),
  ]);

  const recommendedSchemes = success && recommendations ? recommendations : [];
  const savedSchemes = savedSuccess && savedData ? savedData : [];

  return (
    <div className="py-12">
      <BentoGrid>
        <DashboardHero name={firstName} schemeCount={Math.min(5, recommendedSchemes.length)} />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6 lg:col-span-2">
          <MetricCard 
            title="Eligible Schemes" 
            value={Math.min(5, recommendedSchemes.length)} 
            icon="assignment_turned_in" 
          />
          <MetricCard 
            title="Saved Schemes" 
            value={savedSchemes.length} 
            icon="bookmark" 
          />
        </div>
        
        <AIInsightCard 
          insightText={
            recommendedSchemes.length > 0 ? (
              <>
                Based on your profile, you should explore the <strong className="text-primary">{recommendedSchemes[0].title}</strong> scheme. It is highly recommended for you with a {recommendedSchemes[0].matchPercentage}% match.
              </>
            ) : (
              <>
                Complete your profile to get personalized AI scheme recommendations.
              </>
            )
          }
        />

        <div className="lg:col-span-4 flex justify-between items-center mt-6 mb-4 md:mb-0 pb-2">
          <h2 className="text-[20px] md:text-[24px] font-semibold text-primary leading-tight mr-4">Recommended</h2>
          <Link href="/schemes" className="text-[14px] font-semibold text-muted-foreground hover:text-primary transition-colors flex items-center gap-1 shrink-0 whitespace-nowrap">
            View all <span className="material-symbols-outlined text-sm">arrow_forward</span>
          </Link>
        </div>

        {recommendedSchemes.length > 0 ? (
          recommendedSchemes.slice(0, 5).map((scheme: { id: string; ministry: string; title: string; description: string; startDate: string | null; endDate: string | null; matchPercentage: number }) => (
            <SchemeCard 
              key={scheme.id}
              id={scheme.id}
              matchPercentage={scheme.matchPercentage}
              ministry={scheme.ministry}
              title={scheme.title}
              description={scheme.description}
              opens={scheme.startDate ? new Date(scheme.startDate).toLocaleDateString() : undefined}
              closes={scheme.endDate ? new Date(scheme.endDate).toLocaleDateString() : undefined}
            />
          ))
        ) : (
          <div className="lg:col-span-4 text-center py-10 bg-white/50 backdrop-blur-[10px] rounded-[20px] border border-white/20">
            <span className="material-symbols-outlined text-4xl text-muted-foreground mb-2">inbox</span>
            <h3 className="text-xl font-semibold text-primary">No schemes found</h3>
            <p className="text-muted-foreground">We couldn&apos;t find any schemes matching your profile criteria.</p>
          </div>
        )}

        <div className="lg:col-span-4 mt-6">
          <SavedSchemesWidget schemes={savedSchemes} />
        </div>
      </BentoGrid>
    </div>
  );
}
