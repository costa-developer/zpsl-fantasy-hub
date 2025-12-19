import { useState, useMemo } from 'react';
import { ArrowLeftRight, Search, Filter, TrendingUp, TrendingDown, AlertCircle, Check } from 'lucide-react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useFantasy } from '@/hooks/useFantasy';
import { Player, getTeamById } from '@/data/mockData';
import { cn } from '@/lib/utils';

const Transfers = () => {
  const { 
    players, 
    selectedPlayers, 
    userTeam, 
    remainingBudget, 
    addPlayer, 
    removePlayer,
    canAddPlayer 
  } = useFantasy();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPosition, setSelectedPosition] = useState<string>('ALL');
  const [transfersIn, setTransfersIn] = useState<string[]>([]);
  const [transfersOut, setTransfersOut] = useState<string[]>([]);
  const [selectedPlayerOut, setSelectedPlayerOut] = useState<Player | null>(null);

  const positions = ['ALL', 'GK', 'DEF', 'MID', 'FWD'];

  const availablePlayers = useMemo(() => {
    return players.filter(player => {
      const matchesSearch = player.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           player.lastName.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesPosition = selectedPosition === 'ALL' || player.position === selectedPosition;
      const notInSquad = !userTeam.players.includes(player.id);
      const notAlreadyIn = !transfersIn.includes(player.id);
      
      return matchesSearch && matchesPosition && notInSquad && notAlreadyIn;
    }).sort((a, b) => b.totalPoints - a.totalPoints);
  }, [players, searchQuery, selectedPosition, userTeam.players, transfersIn]);

  const currentSquad = useMemo(() => {
    return selectedPlayers.filter(p => !transfersOut.includes(p.id));
  }, [selectedPlayers, transfersOut]);

  const pendingTransfersIn = useMemo(() => {
    return transfersIn.map(id => players.find(p => p.id === id)).filter(Boolean) as Player[];
  }, [transfersIn, players]);

  const handleTransferOut = (player: Player) => {
    if (transfersOut.includes(player.id)) {
      setTransfersOut(prev => prev.filter(id => id !== player.id));
      setSelectedPlayerOut(null);
    } else {
      setTransfersOut(prev => [...prev, player.id]);
      setSelectedPlayerOut(player);
    }
  };

  const handleTransferIn = (player: Player) => {
    if (transfersOut.length > transfersIn.length) {
      setTransfersIn(prev => [...prev, player.id]);
      setSelectedPlayerOut(null);
    }
  };

  const cancelTransferIn = (playerId: string) => {
    setTransfersIn(prev => prev.filter(id => id !== playerId));
  };

  const confirmTransfers = () => {
    transfersOut.forEach(id => removePlayer(id));
    transfersIn.forEach(id => addPlayer(id));
    setTransfersIn([]);
    setTransfersOut([]);
    setSelectedPlayerOut(null);
  };

  const transferCost = Math.max(0, (transfersIn.length - userTeam.freeTransfers) * 4);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar isAuthenticated={true} />
      
      <main className="flex-1 container py-8">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-heading font-bold text-foreground mb-2">Transfers</h1>
            <p className="text-muted-foreground">
              Manage your squad for the upcoming gameweek
            </p>
          </div>
          
          <div className="flex items-center gap-4">
            <Card className="bg-card border-border">
              <CardContent className="p-4 flex items-center gap-4">
                <div className="text-center">
                  <p className="text-2xl font-bold text-primary">{userTeam.freeTransfers}</p>
                  <p className="text-xs text-muted-foreground">Free Transfers</p>
                </div>
                <div className="h-10 w-px bg-border" />
                <div className="text-center">
                  <p className="text-2xl font-bold text-accent">${remainingBudget.toFixed(1)}m</p>
                  <p className="text-xs text-muted-foreground">Budget</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Pending Transfers */}
        {(transfersIn.length > 0 || transfersOut.length > 0) && (
          <Card className="mb-8 border-accent/50 bg-accent/5">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <ArrowLeftRight className="w-5 h-5 text-accent" />
                Pending Transfers
                {transferCost > 0 && (
                  <Badge variant="destructive" className="ml-2">
                    -{transferCost} pts cost
                  </Badge>
                )}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                {/* Transfers Out */}
                <div>
                  <h4 className="text-sm font-medium text-destructive mb-3 flex items-center gap-2">
                    <TrendingDown className="w-4 h-4" /> Out
                  </h4>
                  <div className="space-y-2">
                    {transfersOut.map(id => {
                      const player = selectedPlayers.find(p => p.id === id);
                      if (!player) return null;
                      const team = getTeamById(player.teamId);
                      return (
                        <div key={id} className="flex items-center justify-between p-3 rounded-lg bg-destructive/10 border border-destructive/20">
                          <div className="flex items-center gap-3">
                            <span className="text-lg">{team?.badge}</span>
                            <div>
                              <p className="font-medium text-foreground">{player.firstName} {player.lastName}</p>
                              <p className="text-xs text-muted-foreground">{player.position} • ${player.price}m</p>
                            </div>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleTransferOut(player)}
                          >
                            Cancel
                          </Button>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Transfers In */}
                <div>
                  <h4 className="text-sm font-medium text-primary mb-3 flex items-center gap-2">
                    <TrendingUp className="w-4 h-4" /> In
                  </h4>
                  <div className="space-y-2">
                    {pendingTransfersIn.map(player => {
                      const team = getTeamById(player.teamId);
                      return (
                        <div key={player.id} className="flex items-center justify-between p-3 rounded-lg bg-primary/10 border border-primary/20">
                          <div className="flex items-center gap-3">
                            <span className="text-lg">{team?.badge}</span>
                            <div>
                              <p className="font-medium text-foreground">{player.firstName} {player.lastName}</p>
                              <p className="text-xs text-muted-foreground">{player.position} • ${player.price}m</p>
                            </div>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => cancelTransferIn(player.id)}
                          >
                            Cancel
                          </Button>
                        </div>
                      );
                    })}
                    {transfersOut.length > transfersIn.length && (
                      <div className="p-3 rounded-lg border-2 border-dashed border-muted-foreground/30 text-center text-muted-foreground text-sm">
                        Select a player to bring in
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="mt-6 flex justify-end gap-3">
                <Button
                  variant="outline"
                  onClick={() => {
                    setTransfersIn([]);
                    setTransfersOut([]);
                    setSelectedPlayerOut(null);
                  }}
                >
                  Reset
                </Button>
                <Button
                  variant="gold"
                  onClick={confirmTransfers}
                  disabled={transfersIn.length !== transfersOut.length}
                >
                  <Check className="w-4 h-4 mr-2" />
                  Confirm Transfers
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Current Squad */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Your Squad</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {selectedPlayers.map(player => {
                  const team = getTeamById(player.teamId);
                  const isOut = transfersOut.includes(player.id);
                  return (
                    <div
                      key={player.id}
                      onClick={() => !isOut && handleTransferOut(player)}
                      className={cn(
                        "flex items-center justify-between p-3 rounded-lg cursor-pointer transition-all",
                        isOut 
                          ? "bg-destructive/20 border border-destructive/40 opacity-60" 
                          : "bg-muted hover:bg-muted/80 border border-transparent hover:border-destructive/40"
                      )}
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-lg">{team?.badge}</span>
                        <div>
                          <p className="font-medium text-foreground text-sm">
                            {player.firstName.charAt(0)}. {player.lastName}
                          </p>
                          <div className="flex items-center gap-2">
                            <Badge variant="outline" className="text-[10px] px-1.5 py-0">
                              {player.position}
                            </Badge>
                            <span className="text-xs text-muted-foreground">${player.price}m</span>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-bold text-primary">{player.totalPoints}</p>
                        <p className="text-[10px] text-muted-foreground">pts</p>
                      </div>
                    </div>
                  );
                })}
              </CardContent>
            </Card>
          </div>

          {/* Available Players */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Available Players</CardTitle>
                <div className="flex flex-col sm:flex-row gap-4 mt-4">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      placeholder="Search players..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                  <div className="flex gap-2">
                    {positions.map(pos => (
                      <Button
                        key={pos}
                        variant={selectedPosition === pos ? "default" : "outline"}
                        size="sm"
                        onClick={() => setSelectedPosition(pos)}
                      >
                        {pos}
                      </Button>
                    ))}
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                {transfersOut.length === transfersIn.length && (
                  <div className="flex items-center gap-2 p-4 mb-4 rounded-lg bg-muted border border-border">
                    <AlertCircle className="w-5 h-5 text-muted-foreground" />
                    <p className="text-sm text-muted-foreground">
                      Select a player from your squad to transfer out first
                    </p>
                  </div>
                )}
                
                <div className="space-y-2 max-h-[600px] overflow-y-auto">
                  {availablePlayers.map(player => {
                    const team = getTeamById(player.teamId);
                    const { allowed, reason } = canAddPlayer(player);
                    const canSelect = transfersOut.length > transfersIn.length;
                    
                    return (
                      <div
                        key={player.id}
                        onClick={() => canSelect && allowed && handleTransferIn(player)}
                        className={cn(
                          "flex items-center justify-between p-4 rounded-lg transition-all",
                          canSelect && allowed
                            ? "bg-muted hover:bg-primary/10 cursor-pointer border border-transparent hover:border-primary/40"
                            : "bg-muted/50 opacity-60 cursor-not-allowed"
                        )}
                      >
                        <div className="flex items-center gap-4">
                          <span className="text-2xl">{team?.badge}</span>
                          <div>
                            <p className="font-medium text-foreground">
                              {player.firstName} {player.lastName}
                            </p>
                            <div className="flex items-center gap-2">
                              <span className="text-xs text-muted-foreground">{team?.name}</span>
                              <Badge variant="outline" className="text-[10px]">
                                {player.position}
                              </Badge>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-6">
                          <div className="text-center">
                            <p className="text-sm font-bold text-primary">{player.totalPoints}</p>
                            <p className="text-[10px] text-muted-foreground">Total pts</p>
                          </div>
                          <div className="text-center">
                            <p className="text-sm font-bold text-accent">{player.form}</p>
                            <p className="text-[10px] text-muted-foreground">Form</p>
                          </div>
                          <div className="text-right min-w-[60px]">
                            <p className="text-sm font-bold text-foreground">${player.price}m</p>
                            {!allowed && reason && (
                              <p className="text-[10px] text-destructive">{reason}</p>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Transfers;
