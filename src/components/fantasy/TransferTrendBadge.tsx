import { Flame, TrendingUp, TrendingDown, Users } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

interface TransferTrendBadgeProps {
  transfersIn: number;
  transfersOut: number;
  netTransfers: number;
  showDetails?: boolean;
}

export const TransferTrendBadge = ({ 
  transfersIn, 
  transfersOut, 
  netTransfers,
  showDetails = false 
}: TransferTrendBadgeProps) => {
  const isHot = netTransfers > 5000;
  const isCold = netTransfers < -5000;

  const formatNumber = (num: number): string => {
    if (Math.abs(num) >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M';
    }
    if (Math.abs(num) >= 1000) {
      return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
  };

  if (showDetails) {
    return (
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-1 text-emerald-500">
          <TrendingUp className="w-3 h-3" />
          <span className="text-xs font-medium">{formatNumber(transfersIn)}</span>
        </div>
        <div className="flex items-center gap-1 text-red-500">
          <TrendingDown className="w-3 h-3" />
          <span className="text-xs font-medium">{formatNumber(transfersOut)}</span>
        </div>
        <Badge 
          variant="outline" 
          className={cn(
            "text-[10px] px-1.5",
            isHot && "border-orange-500/50 text-orange-500 bg-orange-500/10",
            isCold && "border-blue-500/50 text-blue-500 bg-blue-500/10"
          )}
        >
          <Users className="w-3 h-3 mr-1" />
          Net: {netTransfers >= 0 ? '+' : ''}{formatNumber(netTransfers)}
        </Badge>
      </div>
    );
  }

  if (isHot) {
    return (
      <Badge className="bg-gradient-to-r from-orange-500 to-red-500 text-white border-0 animate-pulse gap-1">
        <Flame className="w-3 h-3" />
        Hot
      </Badge>
    );
  }

  if (isCold) {
    return (
      <Badge variant="outline" className="border-blue-500/50 text-blue-500 bg-blue-500/10 gap-1">
        <TrendingDown className="w-3 h-3" />
        Falling
      </Badge>
    );
  }

  return null;
};

export default TransferTrendBadge;
