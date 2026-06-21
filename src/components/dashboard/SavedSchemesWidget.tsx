import React from 'react';
import Link from 'next/link';
import { HoverCard } from '../ui/motion/hover-card';
import { FadeIn } from '../ui/motion/fade-in';

type SavedScheme = {
  id: string;
  title: string;
  ministry: string;
};

type SavedSchemesWidgetProps = {
  schemes: SavedScheme[];
};

export const SavedSchemesWidget = ({ schemes }: SavedSchemesWidgetProps) => {
  return (
    <HoverCard className="bg-card/90 backdrop-blur-[10px] border border-border shadow-eg-sm rounded-[20px] transition-all duration-300 p-6 flex flex-col flex-1 h-full">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-[20px] font-semibold text-primary flex items-center gap-2">
          <span className="material-symbols-outlined text-muted-foreground">bookmark</span>
          Saved Schemes
        </h3>
        {schemes.length > 0 && (
          <Link href="/saved" className="text-[12px] font-semibold text-muted-foreground hover:text-primary transition-colors">
            View All
          </Link>
        )}
      </div>

      <div className="flex-grow flex flex-col gap-4 overflow-y-auto">
        {schemes.length > 0 ? (
          schemes.slice(0, 3).map((scheme, index) => (
            <FadeIn key={scheme.id} delay={index * 0.1} yOffset={10}>
              <div className="group p-4 rounded-xl border border-border/50 hover:border-border transition-colors cursor-pointer bg-card/50">
                <h4 className="text-[14px] font-semibold text-primary line-clamp-1 group-hover:text-foreground">{scheme.title}</h4>
                <p className="text-[12px] text-muted-foreground mt-1 line-clamp-1">{scheme.ministry}</p>
              </div>
            </FadeIn>
          ))
        ) : (
          <FadeIn delay={0.1} yOffset={10} className="flex-grow flex flex-col items-center justify-center text-center p-4 border border-dashed border-border rounded-xl bg-card/30">
            <span className="material-symbols-outlined text-3xl text-muted-foreground/50 mb-2">bookmark_add</span>
            <p className="text-[13px] text-muted-foreground">No saved schemes yet.<br/>Bookmark schemes to track them here.</p>
          </FadeIn>
        )}
      </div>
    </HoverCard>
  );
};
