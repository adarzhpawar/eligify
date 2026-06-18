import React from 'react';

type DashboardHeroProps = {
  name: string;
  schemeCount: number;
};

export const DashboardHero = ({ name, schemeCount }: DashboardHeroProps) => {
  return (
    <div className="bg-white/90 backdrop-blur-[10px] border border-white/20 shadow-[0px_10px_30px_rgba(34,34,34,0.05)] rounded-[20px] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0px_15px_40px_rgba(34,34,34,0.08)] p-12 lg:col-span-2 flex flex-col justify-center">
      <h1 className="text-[48px] md:text-[64px] font-bold text-primary mb-2 leading-tight">
        Hello <span className="italic">{name}</span>
      </h1>
      <p className="text-[18px] text-muted-foreground">
        {schemeCount} government schemes match your profile
      </p>
    </div>
  );
};
