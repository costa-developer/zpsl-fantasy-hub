import { Player, getTeamById } from '@/data/mockData';
import { cn } from '@/lib/utils';
import { User } from 'lucide-react';

interface PitchViewProps {
  players: Player[];
  captainId?: string;
  viceCaptainId?: string;
  onPlayerClick?: (player: Player) => void;
}

interface PitchPlayerProps {
  player: Player;
  isCaptain?: boolean;
  isViceCaptain?: boolean;
  onClick?: () => void;
}

const PitchPlayer = ({ player, isCaptain, isViceCaptain, onClick }: PitchPlayerProps) => {
  const team = getTeamById(player.teamId);

  return (
    <div 
      className="flex flex-col items-center cursor-pointer group"
      onClick={onClick}
    >
      <div className="relative">
        {/* Player Circle */}
        <div className={cn(
          "w-12 h-12 md:w-14 md:h-14 rounded-full flex items-center justify-center border-2 transition-transform group-hover:scale-110",
          "bg-card shadow-lg",
          player.position === 'GK' && "border-amber-400",
          player.position === 'DEF' && "border-emerald-400",
          player.position === 'MID' && "border-sky-400",
          player.position === 'FWD' && "border-rose-400",
        )}>
          <User className="w-6 h-6 text-muted-foreground" />
        </div>

        {/* Captain Badge */}
        {(isCaptain || isViceCaptain) && (
          <div className={cn(
            "absolute -bottom-1 -right-1 w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold",
            isCaptain ? "bg-accent text-accent-foreground" : "bg-muted text-muted-foreground"
          )}>
            {isCaptain ? 'C' : 'V'}
          </div>
        )}
      </div>

      {/* Player Name & Points */}
      <div className="mt-1.5 text-center">
        <div className="bg-pitch-dark/90 backdrop-blur-sm px-2 py-0.5 rounded">
          <p className="text-[10px] md:text-xs font-semibold text-white truncate max-w-16 md:max-w-20">
            {player.lastName}
          </p>
        </div>
        <div className="bg-card/90 backdrop-blur-sm px-2 py-0.5 rounded mt-0.5 shadow-sm">
          <p className="text-[10px] md:text-xs font-bold">{player.totalPoints}</p>
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

  const renderRow = (rowPlayers: Player[], className?: string) => (
    <div className={cn("flex justify-center gap-2 md:gap-4", className)}>
      {rowPlayers.map(player => (
        <PitchPlayer
          key={player.id}
          player={player}
          isCaptain={player.id === captainId}
          isViceCaptain={player.id === viceCaptainId}
          onClick={() => onPlayerClick?.(player)}
        />
      ))}
    </div>
  );

  return (
    <div className="relative w-full max-w-2xl mx-auto">
      {/* Pitch Background */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-b from-pitch-light to-pitch shadow-xl">
        {/* Pitch Lines */}
        <div className="absolute inset-0">
          {/* Center Circle */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 md:w-32 md:h-32 rounded-full border-2 border-white/20" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-white/20" />
          
          {/* Center Line */}
          <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-white/20 -translate-y-1/2" />
          
          {/* Goal Box */}
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-40 md:w-52 h-16 md:h-20 border-2 border-b-0 border-white/20 rounded-t-lg" />
          
          {/* 6 yard box */}
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-24 md:w-28 h-8 md:h-10 border-2 border-b-0 border-white/20 rounded-t-sm" />
        </div>

        {/* Players */}
        <div className="relative z-10 py-6 md:py-8 space-y-4 md:space-y-6">
          {/* Forwards */}
          {renderRow(forwards)}
          
          {/* Midfielders */}
          {renderRow(midfielders)}
          
          {/* Defenders */}
          {renderRow(defenders)}
          
          {/* Goalkeeper */}
          {renderRow(goalkeepers)}
        </div>
      </div>
    </div>
  );
};

export default PitchView;
