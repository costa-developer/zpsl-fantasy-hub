import { TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { cn } from '@/lib/utils';

interface PriceChangeIndicatorProps {
  change: number;
  showValue?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

export const PriceChangeIndicator = ({ 
  change, 
  showValue = true,
  size = 'md' 
}: PriceChangeIndicatorProps) => {
  const sizeClasses = {
    sm: 'text-[10px]',
    md: 'text-xs',
    lg: 'text-sm'
  };

  const iconSizes = {
    sm: 'w-3 h-3',
    md: 'w-4 h-4',
    lg: 'w-5 h-5'
  };

  if (change === 0) {
    return (
      <span className={cn(
        "flex items-center gap-0.5 text-muted-foreground",
        sizeClasses[size]
      )}>
        <Minus className={iconSizes[size]} />
        {showValue && <span>$0.0m</span>}
      </span>
    );
  }

  const isPositive = change > 0;

  return (
    <span className={cn(
      "flex items-center gap-0.5 font-medium",
      isPositive ? "text-emerald-500" : "text-red-500",
      sizeClasses[size]
    )}>
      {isPositive ? (
        <TrendingUp className={iconSizes[size]} />
      ) : (
        <TrendingDown className={iconSizes[size]} />
      )}
      {showValue && (
        <span>
          {isPositive ? '+' : ''}${change.toFixed(1)}m
        </span>
      )}
    </span>
  );
};

export default PriceChangeIndicator;
