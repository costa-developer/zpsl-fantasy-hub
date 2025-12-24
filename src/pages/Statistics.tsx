import { useState, useMemo } from 'react';
import { BarChart3, Search, TrendingUp, Target, Shield, Zap, Loader2 } from 'lucide-react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useZPSLData, AppPlayer } from '@/hooks/useZPSLData';
import { cn } from '@/lib/utils';

type SortKey = 'totalPoints' | 'goalsScored' | 'assists' | 'cleanSheets' | 'form' | 'price' | 'selected';

const Statistics = () => {
  const { players, teams, getTeamById, isLoading } = useZPSLData();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPosition, setSelectedPosition] = useState<string>('ALL');
  const [selectedTeam, setSelectedTeam] = useState<string>('ALL');
  const [sortBy, setSortBy] = useState<SortKey>('totalPoints');
  const [activeTab, setActiveTab] = useState('players');

  const positions = ['ALL', 'GK', 'DEF', 'MID', 'FWD'];

  const sortedPlayers = useMemo(() => {
    return players
      .filter(player => {
        const fullName = `${player.firstName} ${player.lastName}`.toLowerCase();
        const matchesSearch = fullName.includes(searchQuery.toLowerCase());
        const matchesPosition = selectedPosition === 'ALL' || player.position === selectedPosition;
        const matchesTeam = selectedTeam === 'ALL' || player.teamId === selectedTeam;
        return matchesSearch && matchesPosition && matchesTeam;
      })
      .sort((a, b) => {
        const aVal = sortBy === 'goalsScored' ? a.goalsScored : sortBy === 'selected' ? a.selected : a[sortBy];
        const bVal = sortBy === 'goalsScored' ? b.goalsScored : sortBy === 'selected' ? b.selected : b[sortBy];
        return bVal - aVal;
      });
  }, [players, searchQuery, selectedPosition, selectedTeam, sortBy]);

  const topScorers = useMemo(() => 
    [...players].sort((a, b) => b.goalsScored - a.goalsScored).slice(0, 5),
    [players]
  );

  const topAssists = useMemo(() => 
    [...players].sort((a, b) => b.assists - a.assists).slice(0, 5),
    [players]
  );

  const topCleanSheets = useMemo(() => 
    [...players].filter(p => p.position === 'GK' || p.position === 'DEF')
      .sort((a, b) => b.cleanSheets - a.cleanSheets).slice(0, 5),
    [players]
  );

  const mostSelected = useMemo(() => 
    [...players].sort((a, b) => b.selected - a.selected).slice(0, 5),
    [players]
  );

  const StatLeaderCard = ({ title, icon, data, statKey, statLabel }: {
    title: string;
    icon: React.ReactNode;
    data: AppPlayer[];
    statKey: keyof AppPlayer;
    statLabel: string;
  }) => (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium flex items-center gap-2">
          {icon}
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        {data.map((player, index) => {
          const team = getTeamById(player.teamId);
          return (
            <div key={player.id} className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className={cn(
                  "w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold",
                  index === 0 ? "bg-accent text-accent-foreground" : "bg-muted text-muted-foreground"
                )}>
                  {index + 1}
                </span>
                <span className="text-sm">{team?.badge}</span>
                <span className="text-sm font-medium text-foreground">
                  {player.firstName.charAt(0)}. {player.lastName}
                </span>
              </div>
              <Badge variant={index === 0 ? "default" : "outline"}>
                {player[statKey]} {statLabel}
              </Badge>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <Navbar />
        <main className="flex-1 container py-8 flex items-center justify-center">
          <div className="text-center">
            <Loader2 className="w-8 h-8 animate-spin mx-auto text-primary" />
            <p className="mt-2 text-muted-foreground">Loading player statistics...</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      
      <main className="flex-1 container py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-heading font-bold text-foreground mb-2">Player Statistics</h1>
          <p className="text-muted-foreground">
            Analyze player performance and make informed decisions
          </p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-6">
            <TabsTrigger value="players" className="gap-2">
              <BarChart3 className="w-4 h-4" />
              All Players
            </TabsTrigger>
            <TabsTrigger value="leaders" className="gap-2">
              <TrendingUp className="w-4 h-4" />
              Leaders
            </TabsTrigger>
          </TabsList>

          <TabsContent value="leaders">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <StatLeaderCard
                title="Top Scorers"
                icon={<Target className="w-4 h-4 text-primary" />}
                data={topScorers}
                statKey="goalsScored"
                statLabel="goals"
              />
              <StatLeaderCard
                title="Top Assists"
                icon={<Zap className="w-4 h-4 text-accent" />}
                data={topAssists}
                statKey="assists"
                statLabel="assists"
              />
              <StatLeaderCard
                title="Clean Sheets"
                icon={<Shield className="w-4 h-4 text-primary" />}
                data={topCleanSheets}
                statKey="cleanSheets"
                statLabel="CS"
              />
              <StatLeaderCard
                title="Most Selected"
                icon={<TrendingUp className="w-4 h-4 text-accent" />}
                data={mostSelected}
                statKey="selected"
                statLabel="%"
              />
            </div>
          </TabsContent>

          <TabsContent value="players">
            {/* Filters */}
            <Card className="mb-6">
              <CardContent className="p-4">
                <div className="flex flex-col lg:flex-row gap-4">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      placeholder="Search players..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                  <div className="flex flex-wrap gap-2">
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
                  <Select value={selectedTeam} onValueChange={setSelectedTeam}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="All Teams" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ALL">All Teams</SelectItem>
                      {teams.map(team => (
                        <SelectItem key={team.id} value={team.id}>
                          {team.badge} {team.shortName}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Select value={sortBy} onValueChange={(v) => setSortBy(v as SortKey)}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Sort by" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="totalPoints">Total Points</SelectItem>
                      <SelectItem value="goalsScored">Goals</SelectItem>
                      <SelectItem value="assists">Assists</SelectItem>
                      <SelectItem value="cleanSheets">Clean Sheets</SelectItem>
                      <SelectItem value="form">Form</SelectItem>
                      <SelectItem value="price">Price</SelectItem>
                      <SelectItem value="selected">Ownership %</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            {/* Stats Table */}
            <Card>
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-border bg-muted/50">
                        <th className="text-left py-4 px-4 text-xs font-medium text-muted-foreground">Player</th>
                        <th className="text-center py-4 px-2 text-xs font-medium text-muted-foreground">Pos</th>
                        <th className="text-center py-4 px-2 text-xs font-medium text-muted-foreground">Price</th>
                        <th className="text-center py-4 px-2 text-xs font-medium text-muted-foreground">Form</th>
                        <th className="text-center py-4 px-2 text-xs font-medium text-muted-foreground">Pts</th>
                        <th className="text-center py-4 px-2 text-xs font-medium text-muted-foreground">G</th>
                        <th className="text-center py-4 px-2 text-xs font-medium text-muted-foreground">A</th>
                        <th className="text-center py-4 px-2 text-xs font-medium text-muted-foreground">CS</th>
                        <th className="text-center py-4 px-2 text-xs font-medium text-muted-foreground">Mins</th>
                        <th className="text-center py-4 px-2 text-xs font-medium text-muted-foreground">Own%</th>
                      </tr>
                    </thead>
                    <tbody>
                      {sortedPlayers.map((player, index) => {
                        const team = getTeamById(player.teamId);
                        return (
                          <tr
                            key={player.id}
                            className={cn(
                              "border-b border-border/50 transition-colors hover:bg-muted/50",
                              index % 2 === 0 && "bg-muted/20"
                            )}
                          >
                            <td className="py-3 px-4">
                              <div className="flex items-center gap-3">
                                <span className="text-lg">{team?.badge}</span>
                                <div>
                                  <p className="font-medium text-foreground">
                                    {player.firstName} {player.lastName}
                                  </p>
                                  <p className="text-xs text-muted-foreground">{team?.shortName}</p>
                                </div>
                              </div>
                            </td>
                            <td className="py-3 px-2 text-center">
                              <Badge variant="outline" className="text-xs">
                                {player.position}
                              </Badge>
                            </td>
                            <td className="py-3 px-2 text-center font-medium text-accent">
                              ${player.price}m
                            </td>
                            <td className="py-3 px-2 text-center">
                              <span className={cn(
                                "font-bold",
                                player.form >= 7 ? "text-primary" : 
                                player.form >= 5 ? "text-foreground" : "text-destructive"
                              )}>
                                {player.form}
                              </span>
                            </td>
                            <td className="py-3 px-2 text-center font-bold text-primary">
                              {player.totalPoints}
                            </td>
                            <td className="py-3 px-2 text-center text-foreground">
                              {player.goalsScored}
                            </td>
                            <td className="py-3 px-2 text-center text-foreground">
                              {player.assists}
                            </td>
                            <td className="py-3 px-2 text-center text-foreground">
                              {player.cleanSheets}
                            </td>
                            <td className="py-3 px-2 text-center text-muted-foreground text-sm">
                              {player.minutesPlayed.toLocaleString()}
                            </td>
                            <td className="py-3 px-2 text-center text-muted-foreground text-sm">
                              {player.selected}%
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>

      <Footer />
    </div>
  );
};

export default Statistics;
