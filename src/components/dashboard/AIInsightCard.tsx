import React from 'react';
import { HoverCard } from '../ui/motion/hover-card';
import { FadeIn } from '../ui/motion/fade-in';

type AIInsightCardProps = {
  insightText: React.ReactNode;
  onReviewAction?: () => void;
};

export const AIInsightCard = ({ insightText, onReviewAction }: AIInsightCardProps) => {
  return (
    <FadeIn delay={0.2} className="lg:col-span-2">
      <HoverCard className="bg-card/90 backdrop-blur-[10px] border border-border shadow-eg-sm rounded-[20px] transition-all duration-300 p-6 bg-gradient-to-br from-card to-[var(--color-eg-ai-background)] border-l-4 border-l-primary h-full">
        <div className="flex items-center gap-2 mb-3">
          <span 
            className="material-symbols-outlined text-primary" 
            style={{ fontVariationSettings: '"FILL" 1' }}
          >
            auto_awesome
          </span>
          <h3 className="text-[24px] font-semibold text-primary">AI Insights</h3>
        </div>
        <p className="text-[16px] text-muted-foreground mb-4">
          {insightText}
        </p>
        <button 
          onClick={onReviewAction}
          className="text-[14px] font-semibold text-primary underline hover:text-muted-foreground transition-colors"
        >
          Review Eligibility Criteria
        </button>
      </HoverCard>
    </FadeIn>
  );
};
