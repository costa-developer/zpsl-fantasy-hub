import { useState, useMemo } from 'react';
import { ArrowLeftRight, Search, TrendingUp, TrendingDown, AlertCircle, Check, Flame, Users } from 'lucide-react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useFantasy } from '@/hooks/useFantasy';
import { Player, getTeamById } from '@/data/mockData';
import { PriceChangeIndicator } from '@/components/fantasy/PriceChangeIndicator';
import { TransferTrendBadge } from '@/components/fantasy/TransferTrendBadge';
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
  const [sortBy, setSortBy] = useState<'points' | 'price' | 'form' | 'transfers'>('points');
  const [transfersIn, setTransfersIn] = useState<string[]>([]);
  const [transfersOut, setTransfersOut] = useState<string[]>([]);
  const [selectedPlayerOut, setSelectedPlayerOut] = useState<Player | null>(null);

  const positions = ['ALL', 'GK', 'DEF', 'MID', 'FWD'];

  // Most transferred players
  const hotPlayers = useMemo(() => {
    return [...players]
      .sort((a, b) => b.netTransfers - a.netTransfers)
      .slice(0, 5);
  }, [players]);

  const availablePlayers = useMemo(() => {
    return players.filter(player => {
      const matchesSearch = player.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           player.lastName.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesPosition = selectedPosition === 'ALL' || player.position === selectedPosition;
      const notInSquad = !userTeam.players.includes(player.id);
      const notAlreadyIn = !transfersIn.includes(player.id);
      
      return matchesSearch && matchesPosition && notInSquad && notAlreadyIn;
    }).sort((a, b) => {
      switch (sortBy) {
        case 'price': return b.price - a.price;
        case 'form': return b.form - a.form;
        case 'transfers': return b.netTransfers - a.netTransfers;
        default: return b.totalPoints - a.totalPoints;
      }
    });
  }, [players, searchQuery, selectedPosition, userTeam.players, transfersIn, sortBy]);

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

  const formatNumber = (num: number): string => {
    if (Math.abs(num) >= 1000000) return (num / 1000000).toFixed(1) + 'M';
    if (Math.abs(num) >= 1000) return (num / 1000).toFixed(1) + 'K';
    return num.toString();
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      
      <main className="flex-1 container py-4 sm:py-8">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6 sm:mb-8">
          <div>
            <h1 className="text-2xl sm:text-3xl font-heading font-bold text-foreground mb-2">Transfers</h1>
            <p className="text-sm sm:text-base text-muted-foreground">
              Manage your squad for the upcoming gameweek
            </p>
          </div>
          
          <div className="flex items-center gap-3 sm:gap-4">
            <Card className="bg-card border-border">
              <CardContent className="p-3 sm:p-4 flex items-center gap-3 sm:gap-4">
                <div className="text-center">
                  <p className="text-xl sm:text-2xl font-bold text-primary">{userTeam.freeTransfers}</p>
                  <p className="text-[10px] sm:text-xs text-muted-foreground">Free Transfers</p>
                </div>
                <div className="h-8 sm:h-10 w-px bg-border" />
                <div className="text-center">
                  <p className="text-xl sm:text-2xl font-bold text-accent">${remainingBudget.toFixed(1)}m</p>
                  <p className="text-[10px] sm:text-xs text-muted-foreground">Budget</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Hot Players Ticker */}
        <Card className="mb-6 sm:mb-8 border-orange-500/30 bg-gradient-to-r from-orange-500/5 to-red-500/5">
          <CardContent className="p-3 sm:p-4">
            <div className="flex items-center gap-2 mb-3">
              <Flame className="w-4 h-4 sm:w-5 sm:h-5 text-orange-500" />
              <h3 className="font-heading font-bold text-sm sm:text-base text-foreground">Trending Players</h3>
            </div>
            <div className="flex gap-2 sm:gap-3 overflow-x-auto pb-2 scrollbar-hide">
              {hotPlayers.map(player => {
                const team = getTeamById(player.teamId);
                return (
                  <div 
                    key={player.id} 
                    className="flex-shrink-0 flex items-center gap-2 sm:gap-3 p-2 sm:p-3 rounded-lg bg-card border border-border hover:border-orange-500/50 transition-colors cursor-pointer"
                    onClick={() => handleTransferIn(player)}
                  >
                    <span className="text-lg sm:text-xl">{team?.badge}</span>
                    <div>
                      <p className="font-medium text-xs sm:text-sm text-foreground whitespace-nowrap">
                        {player.firstName.charAt(0)}. {player.lastName}
                      </p>
                      <div className="flex items-center gap-1 sm:gap-2">
                        <span className="text-[10px] sm:text-xs text-muted-foreground">${player.price}m</span>
                        <PriceChangeIndicator change={player.priceChange} size="sm" />
                      </div>
                    </div>
                    <div className="flex items-center gap-1 text-emerald-500">
                      <TrendingUp className="w-3 h-3" />
                      <span className="text-[10px] sm:text-xs font-medium">{formatNumber(player.netTransfers)}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Pending Transfers */}
        {(transfersIn.length > 0 || transfersOut.length > 0) && (
          <Card className="mb-6 sm:mb-8 border-accent/50 bg-accent/5">
            <CardHeader className="p-4 sm:p-6">
              <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
                <ArrowLeftRight className="w-4 h-4 sm:w-5 sm:h-5 text-accent" />
                Pending Transfers
                {transferCost > 0 && (
                  <Badge variant="destructive" className="ml-2 text-xs">
                    -{transferCost} pts cost
                  </Badge>
                )}
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 sm:p-6 pt-0">
              <div className="grid md:grid-cols-2 gap-4 sm:gap-6">
                {/* Transfers Out */}
                <div>
                  <h4 className="text-xs sm:text-sm font-medium text-destructive mb-2 sm:mb-3 flex items-center gap-2">
                    <TrendingDown className="w-3 h-3 sm:w-4 sm:h-4" /> Out
                  </h4>
                  <div className="space-y-2">
                    {transfersOut.map(id => {
                      const player = selectedPlayers.find(p => p.id === id);
                      if (!player) return null;
                      const team = getTeamById(player.teamId);
                      return (
                        <div key={id} className="flex items-center justify-between p-2 sm:p-3 rounded-lg bg-destructive/10 border border-destructive/20">
                          <div className="flex items-center gap-2 sm:gap-3">
                            <span className="text-base sm:text-lg">{team?.badge}</span>
                            <div>
                              <p className="font-medium text-sm text-foreground">{player.firstName} {player.lastName}</p>
                              <p className="text-[10px] sm:text-xs text-muted-foreground">{player.position} • ${player.price}m</p>
                            </div>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleTransferOut(player)}
                            className="text-xs"
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
                  <h4 className="text-xs sm:text-sm font-medium text-primary mb-2 sm:mb-3 flex items-center gap-2">
                    <TrendingUp className="w-3 h-3 sm:w-4 sm:h-4" /> In
                  </h4>
                  <div className="space-y-2">
                    {pendingTransfersIn.map(player => {
                      const team = getTeamById(player.teamId);
                      return (
                        <div key={player.id} className="flex items-center justify-between p-2 sm:p-3 rounded-lg bg-primary/10 border border-primary/20">
                          <div className="flex items-center gap-2 sm:gap-3">
                            <span className="text-base sm:text-lg">{team?.badge}</span>
                            <div>
                              <p className="font-medium text-sm text-foreground">{player.firstName} {player.lastName}</p>
                              <p className="text-[10px] sm:text-xs text-muted-foreground">{player.position} • ${player.price}m</p>
                            </div>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => cancelTransferIn(player.id)}
                            className="text-xs"
                          >
                            Cancel
                          </Button>
                        </div>
                      );
                    })}
                    {transfersOut.length > transfersIn.length && (
                      <div className="p-2 sm:p-3 rounded-lg border-2 border-dashed border-muted-foreground/30 text-center text-muted-foreground text-xs sm:text-sm">
                        Select a player to bring in
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="mt-4 sm:mt-6 flex justify-end gap-2 sm:gap-3">
                <Button
                  variant="outline"
                  size="sm"
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
                  size="sm"
                  onClick={confirmTransfers}
                  disabled={transfersIn.length !== transfersOut.length}
                >
                  <Check className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                  Confirm Transfers
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        <div className="grid lg:grid-cols-3 gap-4 sm:gap-8">
          {/* Current Squad */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader className="p-4 sm:p-6">
                <CardTitle className="text-base sm:text-lg">Your Squad</CardTitle>
              </CardHeader>
              <CardContent className="p-4 sm:p-6 pt-0 space-y-2">
                {selectedPlayers.map(player => {
                  const team = getTeamById(player.teamId);
                  const isOut = transfersOut.includes(player.id);
                  return (
                    <div
                      key={player.id}
                      onClick={() => !isOut && handleTransferOut(player)}
                      className={cn(
                        "flex items-center justify-between p-2 sm:p-3 rounded-lg cursor-pointer transition-all",
                        isOut 
                          ? "bg-destructive/20 border border-destructive/40 opacity-60" 
                          : "bg-muted hover:bg-muted/80 border border-transparent hover:border-destructive/40"
                      )}
                    >
                      <div className="flex items-center gap-2 sm:gap-3">
                        <span className="text-base sm:text-lg">{team?.badge}</span>
                        <div>
                          <p className="font-medium text-foreground text-xs sm:text-sm">
                            {player.firstName.charAt(0)}. {player.lastName}
                          </p>
                          <div className="flex items-center gap-1 sm:gap-2">
                            <Badge variant="outline" className="text-[8px] sm:text-[10px] px-1 sm:px-1.5 py-0">
                              {player.position}
                            </Badge>
                            <span className="text-[10px] sm:text-xs text-muted-foreground">${player.price}m</span>
                            <PriceChangeIndicator change={player.priceChange} size="sm" showValue={false} />
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-xs sm:text-sm font-bold text-primary">{player.totalPoints}</p>
                        <p className="text-[8px] sm:text-[10px] text-muted-foreground">pts</p>
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
              <CardHeader className="p-4 sm:p-6">
                <CardTitle className="text-base sm:text-lg">Available Players</CardTitle>
                <div className="flex flex-col gap-3 sm:gap-4 mt-3 sm:mt-4">
                  {/* Search */}
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      placeholder="Search players..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10 text-sm"
                    />
                  </div>
                  
                  {/* Filters Row */}
                  <div className="flex flex-col sm:flex-row gap-2 sm:gap-4">
                    {/* Position Filter */}
                    <div className="flex gap-1 sm:gap-2 overflow-x-auto">
                      {positions.map(pos => (
                        <Button
                          key={pos}
                          variant={selectedPosition === pos ? "default" : "outline"}
                          size="sm"
                          onClick={() => setSelectedPosition(pos)}
                          className="text-xs px-2 sm:px-3"
                        >
                          {pos}
                        </Button>
                      ))}
                    </div>
                    
                    {/* Sort Options */}
                    <div className="flex gap-1 sm:gap-2 overflow-x-auto">
                      <Button
                        variant={sortBy === 'points' ? 'secondary' : 'ghost'}
                        size="sm"
                        onClick={() => setSortBy('points')}
                        className="text-xs px-2 sm:px-3"
                      >
                        Points
                      </Button>
                      <Button
                        variant={sortBy === 'form' ? 'secondary' : 'ghost'}
                        size="sm"
                        onClick={() => setSortBy('form')}
                        className="text-xs px-2 sm:px-3"
                      >
                        Form
                      </Button>
                      <Button
                        variant={sortBy === 'price' ? 'secondary' : 'ghost'}
                        size="sm"
                        onClick={() => setSortBy('price')}
                        className="text-xs px-2 sm:px-3"
                      >
                        Price
                      </Button>
                      <Button
                        variant={sortBy === 'transfers' ? 'secondary' : 'ghost'}
                        size="sm"
                        onClick={() => setSortBy('transfers')}
                        className="text-xs px-2 sm:px-3 gap-1"
                      >
                        <Flame className="w-3 h-3" />
                        Hot
                      </Button>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-4 sm:p-6 pt-0">
                {transfersOut.length === transfersIn.length && (
                  <div className="flex items-center gap-2 p-3 sm:p-4 mb-3 sm:mb-4 rounded-lg bg-muted border border-border">
                    <AlertCircle className="w-4 h-4 sm:w-5 sm:h-5 text-muted-foreground flex-shrink-0" />
                    <p className="text-xs sm:text-sm text-muted-foreground">
                      Select a player from your squad to transfer out first
                    </p>
                  </div>
                )}
                
                <div className="space-y-2 max-h-[500px] sm:max-h-[600px] overflow-y-auto">
                  {availablePlayers.map(player => {
                    const team = getTeamById(player.teamId);
                    const { allowed, reason } = canAddPlayer(player);
                    const canSelect = transfersOut.length > transfersIn.length;
                    
                    return (
                      <div
                        key={player.id}
                        onClick={() => canSelect && allowed && handleTransferIn(player)}
                        className={cn(
                          "flex flex-col sm:flex-row sm:items-center justify-between p-3 sm:p-4 rounded-lg transition-all gap-2 sm:gap-0",
                          canSelect && allowed
                            ? "bg-muted hover:bg-primary/10 cursor-pointer border border-transparent hover:border-primary/40"
                            : "bg-muted/50 opacity-60 cursor-not-allowed"
                        )}
                      >
                        <div className="flex items-center gap-3 sm:gap-4">
                          <span className="text-xl sm:text-2xl">{team?.badge}</span>
                          <div>
                            <div className="flex items-center gap-2">
                              <p className="font-medium text-sm text-foreground">
                                {player.firstName} {player.lastName}
                              </p>
                              <TransferTrendBadge 
                                transfersIn={player.transfersIn}
                                transfersOut={player.transfersOut}
                                netTransfers={player.netTransfers}
                              />
                            </div>
                            <div className="flex items-center gap-2 mt-0.5">
                              <span className="text-[10px] sm:text-xs text-muted-foreground">{team?.name}</span>
                              <Badge variant="outline" className="text-[8px] sm:text-[10px] px-1">
                                {player.position}
                              </Badge>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center justify-between sm:justify-end gap-3 sm:gap-6 ml-9 sm:ml-0">
                          <div className="text-center">
                            <p className="text-xs sm:text-sm font-bold text-primary">{player.totalPoints}</p>
                            <p className="text-[8px] sm:text-[10px] text-muted-foreground">Total pts</p>
                          </div>
                          <div className="text-center">
                            <p className="text-xs sm:text-sm font-bold text-accent">{player.form}</p>
                            <p className="text-[8px] sm:text-[10px] text-muted-foreground">Form</p>
                          </div>
                          <div className="text-center">
                            <TransferTrendBadge 
                              transfersIn={player.transfersIn}
                              transfersOut={player.transfersOut}
                              netTransfers={player.netTransfers}
                              showDetails
                            />
                          </div>
                          <div className="text-right min-w-[50px] sm:min-w-[60px]">
                            <div className="flex items-center gap-1 justify-end">
                              <p className="text-xs sm:text-sm font-bold text-foreground">${player.price}m</p>
                              <PriceChangeIndicator change={player.priceChange} size="sm" showValue={false} />
                            </div>
                            {player.priceChangeWeek !== 0 && (
                              <p className="text-[8px] sm:text-[10px] text-muted-foreground">
                                Week: {player.priceChangeWeek > 0 ? '+' : ''}${player.priceChangeWeek.toFixed(1)}m
                              </p>
                            )}
                            {!allowed && reason && (
                              <p className="text-[8px] sm:text-[10px] text-destructive">{reason}</p>
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
