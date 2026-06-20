import React from 'react';
import Link from 'next/link';

interface AIRecommendationCardProps {
  schemeId: string;
  relevanceScore: number;
  explanation: string;
  schemeDetails: {
    title: string;
    description: string;
    category: string;
  };
  isSaved?: boolean;
  isTopMatch?: boolean;
}

export const AIRecommendationCard = ({ schemeId, relevanceScore, explanation, schemeDetails, isTopMatch = false }: AIRecommendationCardProps) => {
  if (isTopMatch) {
    return (
      <div className="card-item bg-surface-container-lowest rounded-3xl shadow-[0px_20px_50px_rgba(34,34,34,0.06)] border border-outline-variant/10 p-8 hover:-translate-y-2 transition-all duration-500 group relative">
        <Link href={`/schemes/${schemeId}`} className="absolute inset-0 z-0"></Link>
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6 relative z-10 pointer-events-none">
          <div>
            <h3 className="font-headline-lg text-[24px] md:text-[32px] text-primary font-bold mb-2 group-hover:text-secondary transition-colors leading-[1.2] tracking-[-0.01em]">{schemeDetails.title}</h3>
            <p className="font-body-md text-[16px] text-on-surface-variant leading-[1.6]">{schemeDetails.category} Scheme</p>
          </div>
          <div className="bg-[#e2f5e9] text-[#0f5132] font-label-md text-[14px] font-semibold px-4 py-2 rounded-full flex items-center gap-2 border border-[#c3e6cb] shadow-sm tracking-[0.01em] whitespace-nowrap self-start md:self-auto">
            <span className="material-symbols-outlined text-[18px]" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
            {relevanceScore}% Match
          </div>
        </div>
        
        <div className="bg-surface-container-low p-6 rounded-2xl mb-8 border border-outline-variant/10 flex items-start gap-4 relative z-10 pointer-events-none">
          <span className="material-symbols-outlined text-primary text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>auto_awesome</span>
          <div>
            <p className="font-label-sm text-[12px] font-medium text-on-surface-variant mb-2 uppercase tracking-widest">Why it matches</p>
            <p className="font-body-md text-[16px] text-on-surface leading-[1.6]">{explanation}</p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8 relative z-10 pointer-events-none">
          <div className="flex items-start gap-4">
            <div className="bg-surface-container p-3 rounded-xl text-primary flex items-center justify-center">
              <span className="material-symbols-outlined">description</span>
            </div>
            <div>
              <p className="font-label-sm text-[12px] font-medium text-on-surface-variant mb-1 uppercase tracking-widest">Description</p>
              <p className="font-body-md text-[16px] text-primary leading-[1.6] line-clamp-2">{schemeDetails.description}</p>
            </div>
          </div>
        </div>
        
        <div className="flex flex-col md:flex-row justify-end items-center pt-8 border-t border-outline-variant/10 gap-6 relative z-10">
          <Link href={`/schemes/${schemeId}`} className="w-full md:w-auto bg-primary text-primary-foreground font-label-md text-[14px] font-semibold px-10 py-4 rounded-2xl hover:bg-primary/90 transition-all shadow-xl flex items-center justify-center gap-3 group/btn">
            View Details
            <span className="material-symbols-outlined text-[20px] group-hover/btn:translate-x-2 transition-transform">arrow_forward</span>
          </Link>
        </div>
      </div>
    );
  }

  // Compact layout for non-top matches
  return (
    <Link href={`/schemes/${schemeId}`} className="card-item bg-surface-container-lowest rounded-3xl shadow-[0px_10px_30px_rgba(34,34,34,0.03)] border border-outline-variant/10 p-8 hover:-translate-y-1 transition-all duration-500 flex flex-col md:flex-row justify-between items-center gap-6 cursor-pointer group">
      <div className="flex-grow">
        <div className="flex items-center gap-3 mb-2">
          <h3 className="font-headline-md text-[24px] text-primary font-bold leading-[1.3]">{schemeDetails.title}</h3>
          <span className="text-xs bg-outline-variant/20 text-on-surface-variant px-2 py-0.5 rounded-md font-medium uppercase tracking-wider">{schemeDetails.category}</span>
        </div>
        <p className="font-body-md text-[16px] text-on-surface-variant leading-[1.6] line-clamp-1">{explanation}</p>
      </div>
      <div className="flex items-center gap-6">
        <div className="bg-[#e2f5e9]/50 text-[#0f5132] font-label-md text-[14px] font-semibold px-4 py-2 rounded-full border border-[#c3e6cb]/50 tracking-[0.01em]">
          {relevanceScore}% Match
        </div>
        <span className="material-symbols-outlined text-primary group-hover:translate-x-1 transition-transform">chevron_right</span>
      </div>
    </Link>
  );
};
