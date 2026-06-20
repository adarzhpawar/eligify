import React from 'react';

type MetricCardProps = {
  title: string;
  value: string | number;
  icon: string;
  valueColor?: string;
};

export const MetricCard = ({ title, value, icon, valueColor = 'text-primary' }: MetricCardProps) => {
  return (
    <div className="bg-white/90 backdrop-blur-[10px] border border-white/20 shadow-[0px_10px_30px_rgba(34,34,34,0.05)] rounded-[20px] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0px_15px_40px_rgba(34,34,34,0.08)] p-4 md:p-6 flex flex-col justify-between min-h-[140px] lg:col-span-1">
      <div className="flex justify-between items-start gap-2">
        <span className="text-[10px] md:text-[12px] font-medium text-muted-foreground uppercase tracking-wider line-clamp-2">
          {title}
        </span>
        <span className="material-symbols-outlined text-muted-foreground">{icon}</span>
      </div>
      <div className={`text-[36px] md:text-[48px] font-bold leading-[1.1] tracking-[-0.02em] ${valueColor}`}>
        {value}
      </div>
    </div>
  );
};
