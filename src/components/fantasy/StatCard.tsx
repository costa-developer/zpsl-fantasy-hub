import { cn } from '@/lib/utils';
import { LucideIcon } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon?: LucideIcon;
  trend?: 'up' | 'down' | 'neutral';
  trendValue?: string;
  variant?: 'default' | 'primary' | 'gold';
}

export const StatCard = ({
  title,
  value,
  subtitle,
  icon: Icon,
  trend,
  trendValue,
  variant = 'default',
}: StatCardProps) => {
  return (
    <div className={cn(
      "relative overflow-hidden rounded-xl p-5 transition-all duration-300 card-hover",
      variant === 'default' && "bg-card border border-border shadow-card",
      variant === 'primary' && "bg-gradient-hero text-primary-foreground",
      variant === 'gold' && "bg-gradient-gold text-accent-foreground"
    )}>
      {/* Background Pattern */}
      {variant !== 'default' && (
        <div className="absolute inset-0 pitch-lines opacity-10" />
      )}

      <div className="relative z-10">
        <div className="flex items-start justify-between">
          <div>
            <p className={cn(
              "text-sm font-medium mb-1",
              variant === 'default' ? "text-muted-foreground" : "opacity-80"
            )}>
              {title}
            </p>
            <p className="font-heading font-black text-3xl md:text-4xl">
              {value}
            </p>
            {subtitle && (
              <p className={cn(
                "text-sm mt-1",
                variant === 'default' ? "text-muted-foreground" : "opacity-70"
              )}>
                {subtitle}
              </p>
            )}
          </div>

          {Icon && (
            <div className={cn(
              "p-3 rounded-lg",
              variant === 'default' && "bg-primary/10 text-primary",
              variant === 'primary' && "bg-primary-foreground/20",
              variant === 'gold' && "bg-accent-foreground/20"
            )}>
              <Icon className="w-6 h-6" />
            </div>
          )}
        </div>

        {trend && trendValue && (
          <div className="mt-4 flex items-center gap-1">
            <span className={cn(
              "text-xs font-semibold px-2 py-0.5 rounded-full",
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
