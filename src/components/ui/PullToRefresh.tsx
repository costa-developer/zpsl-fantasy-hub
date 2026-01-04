import { RefreshCw } from 'lucide-react';
import { cn } from '@/lib/utils';

interface PullToRefreshIndicatorProps {
  pullDistance: number;
  isRefreshing: boolean;
  progress: number;
  threshold?: number;
}

export function PullToRefreshIndicator({ 
  pullDistance, 
  isRefreshing, 
  progress,
  threshold = 80 
}: PullToRefreshIndicatorProps) {
  const isVisible = pullDistance > 0 || isRefreshing;
  
  if (!isVisible) return null;

  return (
    <div 
      className="fixed left-1/2 -translate-x-1/2 z-50 transition-opacity duration-200"
      style={{ 
        top: `${Math.min(pullDistance, threshold * 0.8) + 60}px`,
        opacity: Math.min(progress * 1.5, 1)
      }}
    >
      <div 
        className={cn(
          "flex items-center justify-center w-10 h-10 rounded-full bg-card border border-border shadow-lg",
          isRefreshing && "bg-primary/10"
        )}
      >
        <RefreshCw 
          className={cn(
            "w-5 h-5 text-primary transition-transform",
            isRefreshing && "animate-spin"
          )}
          style={{ 
            transform: isRefreshing 
              ? undefined 
              : `rotate(${progress * 360}deg)`,
          }}
        />
      </div>
    </div>
  );
}
