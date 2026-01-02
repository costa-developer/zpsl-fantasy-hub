import { cn } from '@/lib/utils';
import { ReactNode } from 'react';

interface StatCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon?: ReactNode;
  trend?: 'up' | 'down' | 'neutral';
  trendValue?: string;
  variant?: 'default' | 'primary' | 'gold';
}

export const StatCard = ({
  title,
  value,
  subtitle,
  icon,
  trend,
  trendValue,
  variant = 'default',
}: StatCardProps) => {
  return (
    <div className={cn(
      "relative overflow-hidden rounded-xl p-4 sm:p-5 transition-all duration-300 card-hover group",
      variant === 'default' && "bg-card border border-border shadow-card",
      variant === 'primary' && "bg-primary text-primary-foreground",
      variant === 'gold' && "bg-accent text-accent-foreground"
    )}>
      {/* Shine effect on hover */}
      {variant !== 'default' && (
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 translate-x-[-100%] group-hover:translate-x-[100%]" style={{ transition: 'transform 0.7s, opacity 0.3s' }} />
      )}

      <div className="relative z-10">
        <div className="flex items-start justify-between gap-2">
          <div className="flex-1 min-w-0">
            <p className={cn(
              "text-xs sm:text-sm font-medium mb-1 truncate",
              variant === 'default' ? "text-muted-foreground" : "opacity-80"
            )}>
              {title}
            </p>
            <p className="font-heading font-black text-2xl sm:text-3xl md:text-4xl">
              {value}
            </p>
            {subtitle && (
              <p className={cn(
                "text-xs sm:text-sm mt-1",
                variant === 'default' ? "text-muted-foreground" : "opacity-70"
              )}>
                {subtitle}
              </p>
            )}
          </div>

          {icon && (
            <div className={cn(
              "p-2 sm:p-3 rounded-lg flex-shrink-0",
              variant === 'default' && "bg-primary/10 text-primary",
              variant === 'primary' && "bg-primary-foreground/20",
              variant === 'gold' && "bg-accent-foreground/20"
            )}>
              {icon}
            </div>
          )}
        </div>

        {trend && trendValue && (
          <div className="mt-3 sm:mt-4 flex items-center gap-1.5">
            <span className={cn(
              "text-xs font-semibold px-2 py-0.5 rounded-full inline-flex items-center gap-0.5",
              trend === 'up' && "bg-green-500/20 text-green-600",
              trend === 'down' && "bg-red-500/20 text-red-600",
              trend === 'neutral' && "bg-muted text-muted-foreground"
            )}>
              {trend === 'up' && '↑'}
              {trend === 'down' && '↓'}
              {trendValue}
            </span>
            <span className={cn(
              "text-xs",
              variant === 'default' ? "text-muted-foreground" : "opacity-70"
            )}>
              vs last GW
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default StatCard;
