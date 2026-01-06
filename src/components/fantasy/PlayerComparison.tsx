import { useState, useMemo } from 'react';
import { useZPSLData, AppPlayer } from '@/hooks/useZPSLData';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { 
  User, 
  Search, 
  X, 
  ArrowRight, 
  Trophy, 
  Target, 
  Shield, 
  Clock,
  TrendingUp,
  TrendingDown,
  Minus,
  Shirt,
  Star
} from 'lucide-react';

interface StatRowProps {
  label: string;
  value1: number | string;
  value2: number | string;
  higherIsBetter?: boolean;
  icon?: React.ReactNode;
}

const StatRow = ({ label, value1, value2, higherIsBetter = true, icon }: StatRowProps) => {
  const num1 = typeof value1 === 'number' ? value1 : parseFloat(String(value1)) || 0;
  const num2 = typeof value2 === 'number' ? value2 : parseFloat(String(value2)) || 0;
  
  const winner = num1 === num2 ? 'tie' : (higherIsBetter ? (num1 > num2 ? 'left' : 'right') : (num1 < num2 ? 'left' : 'right'));

  return (
    <div className="grid grid-cols-[1fr_auto_1fr] gap-2 sm:gap-4 items-center py-2.5 sm:py-3 border-b border-border/50 last:border-0">
      <div className={cn(
        "flex items-center justify-end gap-2 transition-all",
        winner === 'left' && "text-primary font-bold scale-105"
      )}>
        <span className="text-sm sm:text-base">{value1}</span>
        {winner === 'left' && <TrendingUp className="w-3.5 h-3.5 text-primary" />}
      </div>
      
      <div className="flex items-center gap-1.5 px-2 sm:px-3 py-1.5 rounded-full bg-muted/50 min-w-[100px] sm:min-w-[140px] justify-center">
        {icon && <span className="text-muted-foreground">{icon}</span>}
        <span className="text-[10px] sm:text-xs font-medium text-muted-foreground uppercase tracking-wide">{label}</span>
      </div>
      
      <div className={cn(
        "flex items-center gap-2 transition-all",
        winner === 'right' && "text-primary font-bold scale-105"
      )}>
        {winner === 'right' && <TrendingUp className="w-3.5 h-3.5 text-primary" />}
        <span className="text-sm sm:text-base">{value2}</span>
      </div>
    </div>
  );
};

interface PlayerSelectorProps {
  player: AppPlayer | null;
  onSelect: (player: AppPlayer) => void;
  onClear: () => void;
  players: AppPlayer[];
  otherPlayerId?: string;
  position: 'left' | 'right';
}

const positionColors: Record<string, string> = {
  GK: 'from-amber-500 to-amber-600',
  DEF: 'from-primary to-primary/80',
  MID: 'from-sky-500 to-sky-600',
  FWD: 'from-destructive to-destructive/80',
};

const PlayerSelector = ({ player, onSelect, onClear, players, otherPlayerId, position }: PlayerSelectorProps) => {
  const [search, setSearch] = useState('');
  const [positionFilter, setPositionFilter] = useState<string>('all');
  const { getTeamById } = useZPSLData();

  const filteredPlayers = useMemo(() => {
    return players.filter(p => {
      if (p.id === otherPlayerId) return false;
      if (positionFilter !== 'all' && p.position !== positionFilter) return false;
      if (search) {
        const searchLower = search.toLowerCase();
        return (
          p.firstName.toLowerCase().includes(searchLower) ||
          p.lastName.toLowerCase().includes(searchLower)
        );
      }
      return true;
    }).slice(0, 10);
  }, [players, otherPlayerId, positionFilter, search]);

  if (player) {
    const team = getTeamById(player.teamId);
    return (
      <div className={cn(
        "relative bg-card rounded-2xl border border-border p-4 sm:p-6 text-center animate-scale-in",
        position === 'left' ? 'animate-fade-in' : 'animate-fade-in'
      )}>
        <Button 
          variant="ghost" 
          size="icon"
          className="absolute top-2 right-2 h-7 w-7 rounded-full"
          onClick={onClear}
        >
          <X className="w-4 h-4" />
        </Button>
        
        <div className={cn(
          "w-16 h-16 sm:w-20 sm:h-20 mx-auto rounded-2xl flex items-center justify-center bg-gradient-to-br shadow-lg mb-3",
          positionColors[player.position]
        )}>
          <Shirt className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
        </div>
        
        <h3 className="font-heading font-bold text-base sm:text-lg">
          {player.firstName} {player.lastName}
        </h3>
        <div className="flex items-center justify-center gap-2 mt-1 text-sm text-muted-foreground">
          <span>{team?.badge}</span>
          <span>{team?.name}</span>
        </div>
        <div className="flex items-center justify-center gap-2 mt-2">
          <span className={cn(
            "px-2 py-0.5 rounded text-xs font-bold text-white",
            player.position === 'GK' && 'bg-amber-500',
            player.position === 'DEF' && 'bg-primary',
            player.position === 'MID' && 'bg-sky-500',
            player.position === 'FWD' && 'bg-destructive',
          )}>
            {player.position}
          </span>
          <span className="text-sm font-semibold">£{player.price}m</span>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-card rounded-2xl border border-dashed border-border p-4 sm:p-6">
      <div className="text-center mb-4">
        <div className="w-14 h-14 sm:w-16 sm:h-16 mx-auto rounded-full bg-muted/50 flex items-center justify-center mb-3">
          <User className="w-7 h-7 sm:w-8 sm:h-8 text-muted-foreground" />
        </div>
        <p className="text-sm font-medium text-muted-foreground">Select a player</p>
      </div>

      <div className="space-y-3">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search players..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9 h-10 text-sm"
          />
        </div>

        <Select value={positionFilter} onValueChange={setPositionFilter}>
          <SelectTrigger className="h-10 text-sm">
            <SelectValue placeholder="All positions" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Positions</SelectItem>
            <SelectItem value="GK">Goalkeepers</SelectItem>
            <SelectItem value="DEF">Defenders</SelectItem>
            <SelectItem value="MID">Midfielders</SelectItem>
            <SelectItem value="FWD">Forwards</SelectItem>
          </SelectContent>
        </Select>

        <div className="max-h-48 overflow-y-auto space-y-1 scrollbar-thin">
          {filteredPlayers.map(p => {
            const team = getTeamById(p.teamId);
            return (
              <button
                key={p.id}
                onClick={() => onSelect(p)}
                className="w-full flex items-center gap-2 p-2 rounded-lg hover:bg-muted/50 transition-colors text-left"
              >
                <div className={cn(
                  "w-8 h-8 rounded-lg flex items-center justify-center text-white text-[10px] font-bold flex-shrink-0",
                  p.position === 'GK' && 'bg-amber-500',
                  p.position === 'DEF' && 'bg-primary',
                  p.position === 'MID' && 'bg-sky-500',
                  p.position === 'FWD' && 'bg-destructive',
                )}>
                  {p.position}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{p.firstName.charAt(0)}. {p.lastName}</p>
                  <p className="text-xs text-muted-foreground">{team?.shortName}</p>
                </div>
                <span className="text-xs font-semibold text-muted-foreground">£{p.price}m</span>
              </button>
            );
          })}
          {filteredPlayers.length === 0 && (
            <p className="text-center text-sm text-muted-foreground py-4">No players found</p>
          )}
        </div>
      </div>
    </div>
  );
};

export const PlayerComparison = () => {
  const { players } = useZPSLData();
  const [player1, setPlayer1] = useState<AppPlayer | null>(null);
  const [player2, setPlayer2] = useState<AppPlayer | null>(null);

  const bothSelected = player1 && player2;

  return (
    <div className="space-y-6">
      {/* Player Selection */}
      <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] gap-4 items-start">
        <PlayerSelector
          player={player1}
          onSelect={setPlayer1}
          onClear={() => setPlayer1(null)}
          players={players}
          otherPlayerId={player2?.id}
          position="left"
        />

        <div className="hidden md:flex items-center justify-center h-full">
          <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center">
            <span className="text-lg font-bold text-muted-foreground">VS</span>
          </div>
        </div>

        <div className="md:hidden flex justify-center">
          <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
            <ArrowRight className="w-5 h-5 text-muted-foreground rotate-90" />
          </div>
        </div>

        <PlayerSelector
          player={player2}
          onSelect={setPlayer2}
          onClear={() => setPlayer2(null)}
          players={players}
          otherPlayerId={player1?.id}
          position="right"
        />
      </div>

      {/* Stats Comparison */}
      {bothSelected && (
        <div className="bg-card rounded-2xl border border-border overflow-hidden animate-fade-in">
          <div className="p-4 sm:p-6 border-b border-border bg-muted/30">
            <h3 className="font-heading font-bold text-base sm:text-lg text-center flex items-center justify-center gap-2">
              <Trophy className="w-5 h-5 text-accent" />
              Stats Comparison
            </h3>
          </div>

          <div className="p-4 sm:p-6">
            {/* Header with player names */}
            <div className="grid grid-cols-[1fr_auto_1fr] gap-2 sm:gap-4 items-center pb-4 border-b border-border mb-2">
              <p className="text-right font-heading font-bold text-sm sm:text-base truncate">
                {player1.lastName}
              </p>
              <div className="w-[100px] sm:w-[140px]" />
              <p className="font-heading font-bold text-sm sm:text-base truncate">
                {player2.lastName}
              </p>
            </div>

            {/* Stats */}
            <div className="space-y-0">
              <StatRow 
                label="Total Pts" 
                value1={player1.totalPoints} 
                value2={player2.totalPoints}
                icon={<Star className="w-3 h-3" />}
              />
              <StatRow 
                label="Form" 
                value1={player1.form.toFixed(1)} 
                value2={player2.form.toFixed(1)}
                icon={<TrendingUp className="w-3 h-3" />}
              />
              <StatRow 
                label="Goals" 
                value1={player1.goalsScored} 
                value2={player2.goalsScored}
                icon={<Target className="w-3 h-3" />}
              />
              <StatRow 
                label="Assists" 
                value1={player1.assists} 
                value2={player2.assists}
                icon={<Trophy className="w-3 h-3" />}
              />
              <StatRow 
                label="Clean Sheets" 
                value1={player1.cleanSheets} 
                value2={player2.cleanSheets}
                icon={<Shield className="w-3 h-3" />}
              />
              <StatRow 
                label="Minutes" 
                value1={player1.minutesPlayed.toLocaleString()} 
                value2={player2.minutesPlayed.toLocaleString()}
                icon={<Clock className="w-3 h-3" />}
              />
              <StatRow 
                label="Price" 
                value1={`£${player1.price}m`} 
                value2={`£${player2.price}m`}
                higherIsBetter={false}
              />
              <StatRow 
                label="Selected %" 
                value1={`${player1.selected}%`} 
                value2={`${player2.selected}%`}
              />
              <StatRow 
                label="Transfers In" 
                value1={player1.transfersIn.toLocaleString()} 
                value2={player2.transfersIn.toLocaleString()}
              />
              <StatRow 
                label="Transfers Out" 
                value1={player1.transfersOut.toLocaleString()} 
                value2={player2.transfersOut.toLocaleString()}
                higherIsBetter={false}
              />
            </div>

            {/* Points per million */}
            <div className="mt-4 pt-4 border-t border-border">
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-3 rounded-xl bg-muted/50">
                  <p className="text-xs text-muted-foreground mb-1">Pts per £m</p>
                  <p className="font-heading font-bold text-lg text-primary">
                    {(player1.totalPoints / player1.price).toFixed(1)}
                  </p>
                </div>
                <div className="text-center p-3 rounded-xl bg-muted/50">
                  <p className="text-xs text-muted-foreground mb-1">Pts per £m</p>
                  <p className="font-heading font-bold text-lg text-primary">
                    {(player2.totalPoints / player2.price).toFixed(1)}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Empty state */}
      {!bothSelected && (
        <div className="text-center py-8 sm:py-12 text-muted-foreground">
          <div className="w-16 h-16 mx-auto rounded-full bg-muted/50 flex items-center justify-center mb-4">
            <Minus className="w-8 h-8" />
          </div>
          <p className="text-sm sm:text-base">Select two players to compare their stats</p>
        </div>
      )}
    </div>
  );
};

export default PlayerComparison;