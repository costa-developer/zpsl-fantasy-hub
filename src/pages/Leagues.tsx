import { useState } from 'react';
import { Trophy, Users, Plus, Search, Lock, Globe, Crown, Medal, Award } from 'lucide-react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogDescription } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { cn } from '@/lib/utils';

interface League {
  id: string;
  name: string;
  type: 'classic' | 'head-to-head';
  isPrivate: boolean;
  members: number;
  rank?: number;
  adminName: string;
  code?: string;
}

interface LeagueStanding {
  rank: number;
  previousRank: number;
  teamName: string;
  managerName: string;
  gameweekPoints: number;
  totalPoints: number;
}

// Mock data
const myLeagues: League[] = [
  { id: '1', name: 'ZPSL Overall', type: 'classic', isPrivate: false, members: 125847, rank: 12847, adminName: 'ZPSL Fantasy' },
  { id: '2', name: 'Harare Ballers', type: 'classic', isPrivate: true, members: 24, rank: 3, adminName: 'Tendai M.', code: 'ZBL2024' },
  { id: '3', name: 'Work Fantasy League', type: 'head-to-head', isPrivate: true, members: 12, rank: 1, adminName: 'You', code: 'WORK99' },
];

const leagueStandings: LeagueStanding[] = [
  { rank: 1, previousRank: 2, teamName: 'Zimbabwe Warriors XI', managerName: 'Tapfuma C.', gameweekPoints: 78, totalPoints: 1324 },
  { rank: 2, previousRank: 1, teamName: 'Dynamos Faithful', managerName: 'Blessing M.', gameweekPoints: 65, totalPoints: 1298 },
  { rank: 3, previousRank: 3, teamName: 'Bosso Army', managerName: 'Sibusiso N.', gameweekPoints: 72, totalPoints: 1267 },
  { rank: 4, previousRank: 5, teamName: 'CAPS Forever', managerName: 'Tatenda K.', gameweekPoints: 81, totalPoints: 1245 },
  { rank: 5, previousRank: 4, teamName: 'Platinum Stars FC', managerName: 'Rumbidzai T.', gameweekPoints: 58, totalPoints: 1234 },
  { rank: 6, previousRank: 7, teamName: 'Harare United', managerName: 'Farai D.', gameweekPoints: 69, totalPoints: 1198 },
  { rank: 7, previousRank: 6, teamName: 'Bulawayo Boys', managerName: 'Nkosana M.', gameweekPoints: 54, totalPoints: 1187 },
  { rank: 8, previousRank: 8, teamName: 'Zim Fantasy Kings', managerName: 'Tinotenda S.', gameweekPoints: 62, totalPoints: 1156 },
];

const Leagues = () => {
  const [activeTab, setActiveTab] = useState('my-leagues');
  const [selectedLeague, setSelectedLeague] = useState<League | null>(myLeagues[1]);
  const [joinCode, setJoinCode] = useState('');
  const [createLeagueName, setCreateLeagueName] = useState('');
  const [isPrivateLeague, setIsPrivateLeague] = useState(true);

  const getRankIcon = (rank: number) => {
    if (rank === 1) return <Crown className="w-5 h-5 text-accent" />;
    if (rank === 2) return <Medal className="w-5 h-5 text-muted-foreground" />;
    if (rank === 3) return <Award className="w-5 h-5 text-amber-700" />;
    return null;
  };

  const getRankChange = (current: number, previous: number) => {
    const change = previous - current;
    if (change > 0) return <span className="text-primary text-xs">▲{change}</span>;
    if (change < 0) return <span className="text-destructive text-xs">▼{Math.abs(change)}</span>;
    return <span className="text-muted-foreground text-xs">-</span>;
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar isAuthenticated={true} />
      
      <main className="flex-1 container py-8">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-heading font-bold text-foreground mb-2">Leagues</h1>
            <p className="text-muted-foreground">
              Compete with friends and climb the rankings
            </p>
          </div>
          
          <div className="flex gap-3">
            {/* Join League Dialog */}
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline" className="gap-2">
                  <Users className="w-4 h-4" />
                  Join League
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle>Join a Private League</DialogTitle>
                  <DialogDescription>
                    Enter the league code shared by your league administrator
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div className="space-y-2">
                    <Label htmlFor="code">League Code</Label>
                    <Input
                      id="code"
                      placeholder="e.g. ZBL2024"
                      value={joinCode}
                      onChange={(e) => setJoinCode(e.target.value.toUpperCase())}
                      className="font-mono"
                    />
                  </div>
                  <Button variant="gold" className="w-full">
                    Join League
                  </Button>
                </div>
              </DialogContent>
            </Dialog>

            {/* Create League Dialog */}
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="gold" className="gap-2">
                  <Plus className="w-4 h-4" />
                  Create League
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle>Create New League</DialogTitle>
                  <DialogDescription>
                    Start your own league and invite friends to compete
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">League Name</Label>
                    <Input
                      id="name"
                      placeholder="e.g. Office Champions"
                      value={createLeagueName}
                      onChange={(e) => setCreateLeagueName(e.target.value)}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="private">Private League</Label>
                      <p className="text-xs text-muted-foreground">Invite only via code</p>
                    </div>
                    <Switch
                      id="private"
                      checked={isPrivateLeague}
                      onCheckedChange={setIsPrivateLeague}
                    />
                  </div>
                  <Button variant="gold" className="w-full">
                    Create League
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Leagues List */}
          <div className="lg:col-span-1">
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="w-full mb-4">
                <TabsTrigger value="my-leagues" className="flex-1">My Leagues</TabsTrigger>
                <TabsTrigger value="public" className="flex-1">Public</TabsTrigger>
              </TabsList>

              <TabsContent value="my-leagues" className="space-y-3">
                {myLeagues.map(league => (
                  <Card
                    key={league.id}
                    onClick={() => setSelectedLeague(league)}
                    className={cn(
                      "cursor-pointer transition-all hover:border-primary/50",
                      selectedLeague?.id === league.id && "border-primary bg-primary/5"
                    )}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-3">
                          <div className={cn(
                            "w-10 h-10 rounded-lg flex items-center justify-center",
                            league.isPrivate ? "bg-muted" : "bg-gradient-hero"
                          )}>
                            {league.isPrivate ? (
                              <Lock className="w-5 h-5 text-muted-foreground" />
                            ) : (
                              <Trophy className="w-5 h-5 text-primary-foreground" />
                            )}
                          </div>
                          <div>
                            <h3 className="font-medium text-foreground">{league.name}</h3>
                            <div className="flex items-center gap-2 text-xs text-muted-foreground">
                              <Users className="w-3 h-3" />
                              {league.members.toLocaleString()} members
                            </div>
                          </div>
                        </div>
                        {league.rank && (
                          <Badge variant={league.rank <= 3 ? "default" : "outline"}>
                            #{league.rank}
                          </Badge>
                        )}
                      </div>
                      <div className="mt-3 flex items-center justify-between text-xs">
                        <span className="text-muted-foreground">
                          {league.type === 'classic' ? 'Classic' : 'Head-to-Head'}
                        </span>
                        <span className="text-muted-foreground">by {league.adminName}</span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </TabsContent>

              <TabsContent value="public" className="space-y-3">
                <div className="relative mb-4">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input placeholder="Search public leagues..." className="pl-10" />
                </div>
                <Card className="cursor-pointer transition-all hover:border-primary/50">
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-gradient-hero flex items-center justify-center">
                          <Globe className="w-5 h-5 text-primary-foreground" />
                        </div>
                        <div>
                          <h3 className="font-medium text-foreground">Zimbabwe Overall</h3>
                          <div className="flex items-center gap-2 text-xs text-muted-foreground">
                            <Users className="w-3 h-3" />
                            125,847 members
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card className="cursor-pointer transition-all hover:border-primary/50">
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-gradient-hero flex items-center justify-center">
                          <Globe className="w-5 h-5 text-primary-foreground" />
                        </div>
                        <div>
                          <h3 className="font-medium text-foreground">Harare Region</h3>
                          <div className="flex items-center gap-2 text-xs text-muted-foreground">
                            <Users className="w-3 h-3" />
                            45,231 members
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* League Details */}
          <div className="lg:col-span-2">
            {selectedLeague ? (
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="flex items-center gap-2">
                        {selectedLeague.isPrivate ? (
                          <Lock className="w-5 h-5 text-muted-foreground" />
                        ) : (
                          <Trophy className="w-5 h-5 text-accent" />
                        )}
                        {selectedLeague.name}
                      </CardTitle>
                      <CardDescription className="mt-1">
                        {selectedLeague.type === 'classic' ? 'Classic Scoring' : 'Head-to-Head'} • 
                        {selectedLeague.members.toLocaleString()} members
                      </CardDescription>
                    </div>
                    {selectedLeague.code && (
                      <div className="text-right">
                        <p className="text-xs text-muted-foreground">League Code</p>
                        <p className="font-mono font-bold text-foreground">{selectedLeague.code}</p>
                      </div>
                    )}
                  </div>
                </CardHeader>
                <CardContent>
                  {/* Standings Table */}
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-border">
                          <th className="text-left py-3 px-2 text-xs font-medium text-muted-foreground">Rank</th>
                          <th className="text-left py-3 px-2 text-xs font-medium text-muted-foreground">Team</th>
                          <th className="text-center py-3 px-2 text-xs font-medium text-muted-foreground">GW</th>
                          <th className="text-right py-3 px-2 text-xs font-medium text-muted-foreground">Total</th>
                        </tr>
                      </thead>
                      <tbody>
                        {leagueStandings.map((standing) => (
                          <tr
                            key={standing.rank}
                            className={cn(
                              "border-b border-border/50 transition-colors hover:bg-muted/50",
                              standing.rank <= 3 && "bg-gradient-to-r from-accent/5 to-transparent"
                            )}
                          >
                            <td className="py-3 px-2">
                              <div className="flex items-center gap-2">
                                {getRankIcon(standing.rank)}
                                <span className={cn(
                                  "font-bold",
                                  standing.rank === 1 && "text-accent",
                                  standing.rank > 1 && "text-foreground"
                                )}>
                                  {standing.rank}
                                </span>
                                {getRankChange(standing.rank, standing.previousRank)}
                              </div>
                            </td>
                            <td className="py-3 px-2">
                              <div>
                                <p className="font-medium text-foreground">{standing.teamName}</p>
                                <p className="text-xs text-muted-foreground">{standing.managerName}</p>
                              </div>
                            </td>
                            <td className="py-3 px-2 text-center">
                              <span className="font-medium text-primary">{standing.gameweekPoints}</span>
                            </td>
                            <td className="py-3 px-2 text-right">
                              <span className="font-bold text-foreground">{standing.totalPoints}</span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  <div className="mt-4 flex justify-center">
                    <Button variant="outline" size="sm">
                      View Full Standings
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <Card className="h-full flex items-center justify-center">
                <CardContent className="text-center py-12">
                  <Trophy className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-foreground mb-2">Select a League</h3>
                  <p className="text-muted-foreground">
                    Choose a league from the list to view standings
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Leagues;
