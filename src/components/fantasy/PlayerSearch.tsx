import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import { Search } from 'lucide-react';
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useZPSLData } from '@/hooks/useZPSLData';
import { cn } from '@/lib/utils';

const positionColors = {
  GK: 'bg-amber-500',
  DEF: 'bg-blue-500',
  MID: 'bg-green-500',
  FWD: 'bg-red-500',
};

interface PlayerSearchProps {
  trigger?: 'button' | 'icon';
  className?: string;
}

export const PlayerSearch = ({ trigger = 'button', className }: PlayerSearchProps) => {
  const [open, setOpen] = React.useState(false);
  const navigate = useNavigate();
  const { players, getTeamById, isLoading } = useZPSLData();

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  }, []);

  const handleSelect = (playerId: string) => {
    setOpen(false);
    navigate(`/player/${playerId}`);
  };

  // Group players by position
  const groupedPlayers = React.useMemo(() => {
    const groups: Record<string, typeof players> = {
      GK: [],
      DEF: [],
      MID: [],
      FWD: [],
    };
    
    players.forEach((player) => {
      if (groups[player.position]) {
        groups[player.position].push(player);
      }
    });

    return groups;
  }, [players]);

  return (
    <>
      {trigger === 'button' ? (
        <Button
          variant="outline"
          className={cn(
            'relative h-9 w-full justify-start rounded-xl bg-muted/50 text-sm font-normal text-muted-foreground shadow-none sm:w-64 md:w-80',
            className
          )}
          onClick={() => setOpen(true)}
        >
          <Search className="mr-2 h-4 w-4" />
          Search players...
          <kbd className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 hidden h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100 sm:flex">
            <span className="text-xs">⌘</span>K
          </kbd>
        </Button>
      ) : (
        <Button
          variant="ghost"
          size="icon"
          className={cn('rounded-xl hover:bg-muted', className)}
          onClick={() => setOpen(true)}
        >
          <Search className="h-5 w-5" />
          <span className="sr-only">Search players</span>
        </Button>
      )}

      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Search players by name..." />
        <CommandList>
          <CommandEmpty>
            {isLoading ? 'Loading players...' : 'No players found.'}
          </CommandEmpty>
          
          {Object.entries(groupedPlayers).map(([position, positionPlayers]) => (
            positionPlayers.length > 0 && (
              <CommandGroup 
                key={position} 
                heading={
                  position === 'GK' ? 'Goalkeepers' :
                  position === 'DEF' ? 'Defenders' :
                  position === 'MID' ? 'Midfielders' : 'Forwards'
                }
              >
                {positionPlayers.slice(0, 10).map((player) => {
                  const team = getTeamById(player.teamId);
                  return (
                    <CommandItem
                      key={player.id}
                      value={`${player.firstName} ${player.lastName} ${team?.name || ''}`}
                      onSelect={() => handleSelect(player.id)}
                      className="flex items-center justify-between cursor-pointer"
                    >
                      <div className="flex items-center gap-3">
                        <Badge className={cn('text-white text-xs', positionColors[player.position])}>
                          {player.position}
                        </Badge>
                        <div className="flex flex-col">
                          <span className="font-medium">
                            {player.firstName} {player.lastName}
                          </span>
                          <span className="text-xs text-muted-foreground">
                            {team?.badge} {team?.name || 'Unknown Team'}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 text-sm">
                        <span className="text-muted-foreground">
                          £{player.price.toFixed(1)}m
                        </span>
                        <span className="font-semibold text-primary">
                          {player.totalPoints} pts
                        </span>
                      </div>
                    </CommandItem>
                  );
                })}
              </CommandGroup>
            )
          ))}
        </CommandList>
      </CommandDialog>
    </>
  );
};

export default PlayerSearch;
