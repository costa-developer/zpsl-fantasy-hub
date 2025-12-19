import { useState } from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { PitchView } from '@/components/fantasy/PitchView';
import { PlayerCard } from '@/components/fantasy/PlayerCard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useFantasy } from '@/hooks/useFantasy';
import { Player } from '@/data/mockData';
import { Search, Filter, AlertCircle, Check, X } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';

export const PickTeam = () => {
  const { 
    players,
    teams,
    userTeam,
    selectedPlayers,
    remainingBudget,
    positionCounts,
    addPlayer,
    removePlayer,
    setCaptain,
    setViceCaptain,
    canAddPlayer,
    error,
    setError,
  } = useFantasy();

  const [searchQuery, setSearchQuery] = useState('');
  const [positionFilter, setPositionFilter] = useState<string>('all');
  const [teamFilter, setTeamFilter] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('totalPoints');
  const [selectedPlayer, setSelectedPlayer] = useState<Player | null>(null);

  const { toast } = useToast();

  // Filter and sort players
  const filteredPlayers = players
    .filter(player => {
      const matchesSearch = 
        player.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        player.lastName.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesPosition = positionFilter === 'all' || player.position === positionFilter;
      const matchesTeam = teamFilter === 'all' || player.teamId === teamFilter;
      return matchesSearch && matchesPosition && matchesTeam;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'price':
          return b.price - a.price;
        case 'form':
          return b.form - a.form;
        case 'selected':
          return b.selected - a.selected;
        default:
          return b.totalPoints - a.totalPoints;
      }
    });

  const handleAddPlayer = (player: Player) => {
    const { allowed, reason } = canAddPlayer(player);
    if (!allowed) {
      toast({
        title: 'Cannot add player',
        description: reason,
        variant: 'destructive',
      });
      return;
    }
    addPlayer(player.id);
    toast({
      title: 'Player added',
      description: `${player.firstName} ${player.lastName} has been added to your squad.`,
    });
  };

  const handleRemovePlayer = (player: Player) => {
    removePlayer(player.id);
    toast({
      title: 'Player removed',
      description: `${player.firstName} ${player.lastName} has been removed from your squad.`,
    });
  };

  const handlePlayerClick = (player: Player) => {
    setSelectedPlayer(player);
  };

  const isPlayerSelected = (playerId: string) => userTeam.players.includes(playerId);

  return (
    <div className="min-h-screen flex flex-col bg-muted/30">
      <Navbar isAuthenticated />
      
      <main className="flex-1">
        {/* Header */}
        <section className="bg-gradient-hero text-primary-foreground py-8">
          <div className="container">
            <h1 className="font-heading font-bold text-2xl md:text-3xl mb-2">Pick Your Team</h1>
            <p className="text-primary-foreground/70">Select 15 players within your £100m budget</p>
          </div>
        </section>

        <div className="container py-8">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Player Selection */}
            <div className="lg:col-span-2 space-y-6">
              {/* Filters */}
              <div className="bg-card rounded-xl border border-border shadow-card p-4">
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="flex-1 relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      placeholder="Search players..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                  <div className="flex gap-2">
                    <Select value={positionFilter} onValueChange={setPositionFilter}>
                      <SelectTrigger className="w-[120px]">
                        <SelectValue placeholder="Position" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Positions</SelectItem>
                        <SelectItem value="GK">Goalkeepers</SelectItem>
                        <SelectItem value="DEF">Defenders</SelectItem>
                        <SelectItem value="MID">Midfielders</SelectItem>
                        <SelectItem value="FWD">Forwards</SelectItem>
                      </SelectContent>
                    </Select>
                    <Select value={teamFilter} onValueChange={setTeamFilter}>
                      <SelectTrigger className="w-[140px]">
                        <SelectValue placeholder="Team" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Teams</SelectItem>
                        {teams.map(team => (
                          <SelectItem key={team.id} value={team.id}>
                            {team.badge} {team.shortName}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <Select value={sortBy} onValueChange={setSortBy}>
                      <SelectTrigger className="w-[130px]">
                        <SelectValue placeholder="Sort by" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="totalPoints">Total Points</SelectItem>
                        <SelectItem value="price">Price</SelectItem>
                        <SelectItem value="form">Form</SelectItem>
                        <SelectItem value="selected">% Selected</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              {/* Player List */}
              <Tabs defaultValue="list" className="w-full">
                <TabsList className="mb-4">
                  <TabsTrigger value="list">List View</TabsTrigger>
                  <TabsTrigger value="grid">Grid View</TabsTrigger>
                </TabsList>

                <TabsContent value="list" className="space-y-2">
                  {filteredPlayers.map(player => (
                    <PlayerCard
                      key={player.id}
                      player={player}
                      compact
                      isSelected={isPlayerSelected(player.id)}
                      onSelect={() => isPlayerSelected(player.id) 
                        ? handleRemovePlayer(player) 
                        : handleAddPlayer(player)
                      }
                    />
                  ))}
                </TabsContent>

                <TabsContent value="grid">
                  <div className="grid sm:grid-cols-2 gap-4">
                    {filteredPlayers.slice(0, 10).map(player => (
                      <PlayerCard
                        key={player.id}
                        player={player}
                        isSelected={isPlayerSelected(player.id)}
                        onSelect={() => handleAddPlayer(player)}
                        onRemove={() => handleRemovePlayer(player)}
                      />
                    ))}
                  </div>
                </TabsContent>
              </Tabs>
            </div>

            {/* Sidebar - Squad View */}
            <div className="space-y-6">
              {/* Budget & Squad Info */}
              <div className="bg-card rounded-xl border border-border shadow-card p-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-3 rounded-lg bg-muted">
                    <p className="text-sm text-muted-foreground">Budget</p>
                    <p className={cn(
                      "text-2xl font-heading font-bold",
                      remainingBudget < 0 && "text-destructive"
                    )}>
                      £{remainingBudget.toFixed(1)}m
                    </p>
                  </div>
                  <div className="text-center p-3 rounded-lg bg-muted">
                    <p className="text-sm text-muted-foreground">Players</p>
                    <p className="text-2xl font-heading font-bold">
                      {selectedPlayers.length}/15
                    </p>
                  </div>
                </div>

                {/* Position Breakdown */}
                <div className="mt-4 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Goalkeepers</span>
                    <span className={cn(
                      "font-medium",
                      (positionCounts['GK'] || 0) === 2 ? "text-primary" : ""
                    )}>
                      {positionCounts['GK'] || 0}/2
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Defenders</span>
                    <span className={cn(
                      "font-medium",
                      (positionCounts['DEF'] || 0) === 5 ? "text-primary" : ""
                    )}>
                      {positionCounts['DEF'] || 0}/5
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Midfielders</span>
                    <span className={cn(
                      "font-medium",
                      (positionCounts['MID'] || 0) === 5 ? "text-primary" : ""
                    )}>
                      {positionCounts['MID'] || 0}/5
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Forwards</span>
                    <span className={cn(
                      "font-medium",
                      (positionCounts['FWD'] || 0) === 3 ? "text-primary" : ""
                    )}>
                      {positionCounts['FWD'] || 0}/3
                    </span>
                  </div>
                </div>
              </div>

              {/* Pitch View */}
              <div className="bg-card rounded-xl border border-border shadow-card p-4">
                <h3 className="font-heading font-bold text-lg mb-4">Your Formation</h3>
                <PitchView
                  players={selectedPlayers}
                  captainId={userTeam.captainId}
                  viceCaptainId={userTeam.viceCaptainId}
                  onPlayerClick={handlePlayerClick}
                />
              </div>

              {/* Captain Selection */}
              {selectedPlayers.length > 0 && (
                <div className="bg-card rounded-xl border border-border shadow-card p-4">
                  <h3 className="font-heading font-bold text-lg mb-4">Captain Selection</h3>
                  <div className="space-y-2">
                    <Select 
                      value={userTeam.captainId} 
                      onValueChange={setCaptain}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select Captain (2x points)" />
                      </SelectTrigger>
                      <SelectContent>
                        {selectedPlayers.map(player => (
                          <SelectItem key={player.id} value={player.id}>
                            {player.firstName} {player.lastName}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <Select 
                      value={userTeam.viceCaptainId} 
                      onValueChange={setViceCaptain}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select Vice-Captain" />
                      </SelectTrigger>
                      <SelectContent>
                        {selectedPlayers.map(player => (
                          <SelectItem key={player.id} value={player.id}>
                            {player.firstName} {player.lastName}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              )}

              {/* Save Button */}
              <Button 
                variant="gold" 
                size="lg" 
                className="w-full"
                disabled={selectedPlayers.length !== 15}
              >
                {selectedPlayers.length === 15 ? (
                  <>
                    <Check className="w-4 h-4" />
                    Save Team
                  </>
                ) : (
                  <>
                    <AlertCircle className="w-4 h-4" />
                    Select {15 - selectedPlayers.length} more players
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default PickTeam;
