import { cn } from '@/lib/utils';
import { User, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useZPSLData, AppPlayer } from '@/hooks/useZPSLData';
import { Link } from 'react-router-dom';

interface PlayerCardProps {
  player: AppPlayer;
  onSelect?: (player: AppPlayer) => void;
  onRemove?: (player: AppPlayer) => void;
  isCaptain?: boolean;
  isViceCaptain?: boolean;
  isSelected?: boolean;
  showActions?: boolean;
  compact?: boolean;
}

const positionColors: Record<string, string> = {
  GK: 'bg-amber-500',
  DEF: 'bg-emerald-500',
  MID: 'bg-sky-500',
  FWD: 'bg-rose-500',
};

export const PlayerCard = ({
  player,
  onSelect,
  onRemove,
  isCaptain = false,
  isViceCaptain = false,
  isSelected = false,
  showActions = true,
  compact = false,
}: PlayerCardProps) => {
  const { getTeamById } = useZPSLData();
  const team = getTeamById(player.teamId);

  if (compact) {
    return (
      <Link to={`/player/${player.id}`}>
        <div
          className={cn(
            "relative flex items-center gap-3 p-3 rounded-lg border transition-all cursor-pointer",
            isSelected
              ? "bg-primary/10 border-primary"
              : "bg-card border-border hover:border-primary/50 hover:shadow-card"
          )}
        >
          {/* Position Badge */}
          <div className={cn("w-10 h-10 rounded-lg flex items-center justify-center text-white font-bold text-xs", positionColors[player.position])}>
            {player.position}
          </div>

          {/* Player Info */}
          <div className="flex-1 min-w-0">
            <p className="font-semibold text-sm truncate">
              {player.firstName.charAt(0)}. {player.lastName}
            </p>
            <p className="text-xs text-muted-foreground">{team?.shortName}</p>
          </div>

          {/* Stats */}
          <div className="text-right">
            <p className="font-bold text-sm">{player.totalPoints} pts</p>
            <p className="text-xs text-muted-foreground">£{player.price}m</p>
          </div>

          {/* Captain Badge */}
          {(isCaptain || isViceCaptain) && (
            <div className={cn(
              "absolute -top-1 -right-1 w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold",
              isCaptain ? "bg-accent text-accent-foreground" : "bg-muted text-muted-foreground"
            )}>
              {isCaptain ? 'C' : 'V'}
            </div>
          )}
        </div>
      </Link>
    );
  }

  return (
    <div className={cn(
      "group relative overflow-hidden rounded-xl border bg-card shadow-card transition-all duration-300 card-hover",
      isSelected && "ring-2 ring-primary"
    )}>
      {/* Header */}
      <div className="relative p-4 pb-2">
        <div className="flex items-start justify-between">
          <div className={cn("px-2 py-1 rounded-md text-xs font-bold text-white", positionColors[player.position])}>
            {player.position}
          </div>
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <TrendingUp className="w-3 h-3" />
            <span>{player.form}</span>
          </div>
        </div>

        {/* Player Avatar */}
        <div className="mt-4 flex justify-center">
          <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center border-4 border-background shadow-lg">
            <User className="w-10 h-10 text-muted-foreground" />
          </div>
        </div>

        {/* Captain Badges */}
        {(isCaptain || isViceCaptain) && (
          <div className={cn(
            "absolute top-4 right-4 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold shadow-lg",
            isCaptain ? "bg-accent text-accent-foreground" : "bg-card text-foreground border-2 border-border"
          )}>
            {isCaptain ? 'C' : 'V'}
          </div>
        )}
      </div>

      {/* Player Info */}
      <div className="p-4 pt-2 text-center">
        <h3 className="font-heading font-bold text-lg leading-tight">
          {player.firstName.charAt(0)}. {player.lastName}
        </h3>
        <p className="text-sm text-muted-foreground flex items-center justify-center gap-1 mt-1">
          <span>{team?.badge}</span>
          <span>{team?.name}</span>
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-3 gap-px bg-border">
        <div className="bg-card p-3 text-center">
          <p className="text-lg font-bold text-primary">{player.totalPoints}</p>
          <p className="text-[10px] text-muted-foreground uppercase">Points</p>
        </div>
        <div className="bg-card p-3 text-center">
          <p className="text-lg font-bold">{player.goalsScored}</p>
          <p className="text-[10px] text-muted-foreground uppercase">Goals</p>
        </div>
        <div className="bg-card p-3 text-center">
          <p className="text-lg font-bold">{player.assists}</p>
          <p className="text-[10px] text-muted-foreground uppercase">Assists</p>
        </div>
      </div>

      {/* Price & Selection */}
      <div className="p-4 border-t border-border bg-muted/30">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-2xl font-heading font-bold text-gradient-gold">£{player.price}m</p>
            <p className="text-xs text-muted-foreground">{player.selected}% selected</p>
          </div>
          {showActions && (
            <div className="flex gap-2">
              {isSelected ? (
                <Button variant="destructive" size="sm" onClick={() => onRemove?.(player)}>
                  Remove
                </Button>
              ) : (
                <Button variant="gold" size="sm" onClick={() => onSelect?.(player)}>
                  Add
                </Button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PlayerCard;
