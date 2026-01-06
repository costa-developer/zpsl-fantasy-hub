import { cn } from '@/lib/utils';
import { Shirt, Star } from 'lucide-react';
import { useZPSLData, AppPlayer } from '@/hooks/useZPSLData';

interface PitchViewProps {
  players: AppPlayer[];
  captainId?: string;
  viceCaptainId?: string;
  onPlayerClick?: (player: AppPlayer) => void;
}

interface PitchPlayerProps {
  player: AppPlayer;
  isCaptain?: boolean;
  isViceCaptain?: boolean;
  onClick?: () => void;
}

const positionBorderColors: Record<string, string> = {
  GK: 'border-amber-400 shadow-amber-400/30',
  DEF: 'border-primary shadow-primary/30',
  MID: 'border-sky-400 shadow-sky-400/30',
  FWD: 'border-destructive shadow-destructive/30',
};

const positionBgColors: Record<string, string> = {
  GK: 'from-amber-500 to-amber-600',
  DEF: 'from-primary to-primary/80',
  MID: 'from-sky-500 to-sky-600',
  FWD: 'from-destructive to-destructive/80',
};

const PitchPlayer = ({ player, isCaptain, isViceCaptain, onClick }: PitchPlayerProps) => {
  const { getTeamById } = useZPSLData();
  const team = getTeamById(player.teamId);

  return (
    <div 
      className="flex flex-col items-center cursor-pointer group"
      onClick={onClick}
    >
      <div className="relative">
        {/* Jersey/Player Card */}
        <div className={cn(
          "relative w-14 h-16 sm:w-16 sm:h-[72px] md:w-[72px] md:h-20 rounded-xl flex flex-col items-center justify-center transition-all duration-300",
          "bg-card/95 backdrop-blur-sm border-2 shadow-lg",
          "group-hover:scale-110 group-hover:-translate-y-1 group-hover:shadow-xl",
          positionBorderColors[player.position]
        )}>
          {/* Jersey Icon */}
          <div className={cn(
            "w-7 h-7 sm:w-8 sm:h-8 md:w-9 md:h-9 rounded-lg flex items-center justify-center bg-gradient-to-br",
            positionBgColors[player.position]
          )}>
            <Shirt className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-white" />
          </div>
          
          {/* Points */}
          <div className="mt-1 flex items-center gap-0.5">
            <Star className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-accent fill-accent" />
            <span className="text-[10px] sm:text-xs font-bold text-foreground">{player.totalPoints}</span>
          </div>
        </div>

        {/* Captain/Vice Captain Badge */}
        {(isCaptain || isViceCaptain) && (
          <div className={cn(
            "absolute -top-1.5 -right-1.5 w-5 h-5 sm:w-6 sm:h-6 rounded-full flex items-center justify-center text-[9px] sm:text-[10px] font-black border-2 border-card shadow-md",
            isCaptain 
              ? "bg-accent text-accent-foreground" 
              : "bg-muted text-muted-foreground"
          )}>
            {isCaptain ? 'C' : 'V'}
          </div>
        )}

        {/* Form indicator */}
        {player.form >= 7 && (
          <div className="absolute -top-1 -left-1 w-4 h-4 rounded-full bg-primary flex items-center justify-center">
            <span className="text-[8px] font-bold text-primary-foreground">🔥</span>
          </div>
        )}
      </div>

      {/* Player Name Tag */}
      <div className="mt-1.5 sm:mt-2 w-full max-w-[60px] sm:max-w-[70px] md:max-w-[80px]">
        <div className={cn(
          "px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-md text-center transition-all",
          "bg-foreground/90 backdrop-blur-sm shadow-md",
          "group-hover:bg-foreground"
        )}>
          <p className="text-[8px] sm:text-[9px] md:text-[10px] font-bold text-background truncate leading-tight">
            {player.lastName}
          </p>
        </div>
        {/* Team Badge */}
        <div className="flex justify-center mt-0.5">
          <span className="text-xs sm:text-sm">{team?.badge}</span>
        </div>
      </div>
    </div>
  );
};

export const PitchView = ({ players, captainId, viceCaptainId, onPlayerClick }: PitchViewProps) => {
  const goalkeepers = players.filter(p => p.position === 'GK').slice(0, 1);
  const defenders = players.filter(p => p.position === 'DEF').slice(0, 4);
  const midfielders = players.filter(p => p.position === 'MID').slice(0, 4);
  const forwards = players.filter(p => p.position === 'FWD').slice(0, 2);

  const renderRow = (rowPlayers: AppPlayer[], className?: string) => (
    <div className={cn("flex justify-center gap-1 sm:gap-3 md:gap-5", className)}>
      {rowPlayers.map((player, index) => (
        <div 
          key={player.id}
          className="animate-fade-in"
          style={{ animationDelay: `${index * 0.05}s` }}
        >
          <PitchPlayer
            player={player}
            isCaptain={player.id === captainId}
            isViceCaptain={player.id === viceCaptainId}
            onClick={() => onPlayerClick?.(player)}
          />
        </div>
      ))}
    </div>
  );

  return (
    <div className="relative w-full max-w-2xl mx-auto">
      {/* Pitch Background */}
      <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl bg-pitch shadow-xl">
        {/* Grass texture overlay */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute inset-0" style={{
            backgroundImage: `repeating-linear-gradient(
              0deg,
              transparent,
              transparent 20px,
              rgba(255,255,255,0.03) 20px,
              rgba(255,255,255,0.03) 40px
            )`
          }} />
        </div>

        {/* Pitch Lines */}
        <div className="absolute inset-0">
          {/* Outer border */}
          <div className="absolute inset-3 sm:inset-4 border-2 border-white/25 rounded-lg" />
          
          {/* Center Circle */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 sm:w-28 sm:h-28 md:w-36 md:h-36 rounded-full border-2 border-white/25" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-white/30" />
          
          {/* Center Line */}
          <div className="absolute top-1/2 left-3 right-3 sm:left-4 sm:right-4 h-0.5 bg-white/25 -translate-y-1/2" />
          
          {/* Goal Box - Bottom */}
          <div className="absolute bottom-3 sm:bottom-4 left-1/2 -translate-x-1/2 w-32 sm:w-44 md:w-56 h-12 sm:h-16 md:h-20 border-2 border-b-0 border-white/25 rounded-t-lg" />
          
          {/* 6 yard box - Bottom */}
          <div className="absolute bottom-3 sm:bottom-4 left-1/2 -translate-x-1/2 w-20 sm:w-24 md:w-32 h-6 sm:h-8 md:h-10 border-2 border-b-0 border-white/25 rounded-t-sm" />

          {/* Penalty spot */}
          <div className="absolute bottom-16 sm:bottom-20 md:bottom-24 left-1/2 -translate-x-1/2 w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-white/30" />
          
          {/* Goal Box - Top */}
          <div className="absolute top-3 sm:top-4 left-1/2 -translate-x-1/2 w-32 sm:w-44 md:w-56 h-8 sm:h-10 md:h-12 border-2 border-t-0 border-white/25 rounded-b-lg" />
        </div>

        {/* Corner arcs */}
        <div className="absolute top-3 left-3 sm:top-4 sm:left-4 w-4 h-4 sm:w-6 sm:h-6 border-r-2 border-b-2 border-white/25 rounded-br-full" />
        <div className="absolute top-3 right-3 sm:top-4 sm:right-4 w-4 h-4 sm:w-6 sm:h-6 border-l-2 border-b-2 border-white/25 rounded-bl-full" />
        <div className="absolute bottom-3 left-3 sm:bottom-4 sm:left-4 w-4 h-4 sm:w-6 sm:h-6 border-r-2 border-t-2 border-white/25 rounded-tr-full" />
        <div className="absolute bottom-3 right-3 sm:bottom-4 sm:right-4 w-4 h-4 sm:w-6 sm:h-6 border-l-2 border-t-2 border-white/25 rounded-tl-full" />

        {/* Players */}
        <div className="relative z-10 py-5 sm:py-6 md:py-8 space-y-3 sm:space-y-4 md:space-y-6">
          {/* Forwards */}
          {renderRow(forwards)}
          
          {/* Midfielders */}
          {renderRow(midfielders)}
          
          {/* Defenders */}
          {renderRow(defenders)}
          
          {/* Goalkeeper */}
          {renderRow(goalkeepers)}
        </div>

        {/* Subtle vignette */}
        <div className="absolute inset-0 pointer-events-none rounded-2xl sm:rounded-3xl shadow-[inset_0_0_60px_rgba(0,0,0,0.3)]" />
      </div>

      {/* Position Legend */}
      <div className="flex justify-center gap-3 sm:gap-4 mt-3 sm:mt-4 flex-wrap">
        {[
          { pos: 'GK', label: 'Goalkeeper', color: 'bg-amber-500' },
          { pos: 'DEF', label: 'Defender', color: 'bg-primary' },
          { pos: 'MID', label: 'Midfielder', color: 'bg-sky-500' },
          { pos: 'FWD', label: 'Forward', color: 'bg-destructive' },
        ].map(({ pos, label, color }) => (
          <div key={pos} className="flex items-center gap-1.5">
            <div className={cn("w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full", color)} />
            <span className="text-[10px] sm:text-xs text-muted-foreground">{label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PitchView;
