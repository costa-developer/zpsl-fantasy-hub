import { useState } from 'react';
import { User, Trophy, Calendar, TrendingUp, Edit2, Camera, Save, Medal, Target } from 'lucide-react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Label } from '@/components/ui/label';
import { userTeam } from '@/data/mockData';
import { StatCard } from '@/components/fantasy/StatCard';

// Mock user data
const userData = {
  name: 'Tapfuma Chikwanha',
  email: 'tapfuma@example.com',
  teamName: userTeam.name,
  joined: 'August 2024',
  country: 'Zimbabwe',
  favoriteTeam: 'Dynamos FC',
};

// Mock history data
const gameweekHistory = [
  { gw: 18, points: 68, rank: 12847, highestScore: 112 },
  { gw: 17, points: 82, rank: 11234, highestScore: 98 },
  { gw: 16, points: 45, rank: 14567, highestScore: 105 },
  { gw: 15, points: 72, rank: 12100, highestScore: 89 },
  { gw: 14, points: 91, rank: 9876, highestScore: 102 },
];

const achievements = [
  { id: 1, name: 'First Pick', description: 'Created your first fantasy team', icon: '🏆', unlocked: true },
  { id: 2, name: 'Top 1000', description: 'Reached top 1000 overall', icon: '🥇', unlocked: false },
  { id: 3, name: 'Century', description: 'Scored 100+ points in a gameweek', icon: '💯', unlocked: false },
  { id: 4, name: 'Transfer Genius', description: 'Made a transfer that gained 20+ points', icon: '🧠', unlocked: true },
  { id: 5, name: 'Captain Fantastic', description: 'Your captain scored a hat-trick', icon: '⚡', unlocked: false },
  { id: 6, name: 'Clean Sheet King', description: 'Had 4+ clean sheets in one week', icon: '🛡️', unlocked: true },
];

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [teamName, setTeamName] = useState(userData.teamName);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar isAuthenticated={true} />
      
      <main className="flex-1 container py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Profile Card */}
          <div className="lg:col-span-1">
            <Card>
              <CardContent className="pt-6">
                <div className="flex flex-col items-center text-center">
                  {/* Avatar */}
                  <div className="relative mb-4">
                    <Avatar className="w-24 h-24 border-4 border-primary">
                      <AvatarFallback className="text-2xl font-bold bg-gradient-hero text-primary-foreground">
                        {userData.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <Button
                      size="icon"
                      variant="outline"
                      className="absolute -bottom-2 -right-2 rounded-full w-8 h-8"
                    >
                      <Camera className="w-4 h-4" />
                    </Button>
                  </div>

                  <h2 className="text-xl font-heading font-bold text-foreground mb-1">
                    {userData.name}
                  </h2>
                  <p className="text-sm text-muted-foreground mb-4">{userData.email}</p>

                  {/* Team Name */}
                  <div className="w-full mb-6">
                    {isEditing ? (
                      <div className="flex gap-2">
                        <Input
                          value={teamName}
                          onChange={(e) => setTeamName(e.target.value)}
                          className="text-center"
                        />
                        <Button size="icon" onClick={() => setIsEditing(false)}>
                          <Save className="w-4 h-4" />
                        </Button>
                      </div>
                    ) : (
                      <div className="flex items-center justify-center gap-2">
                        <Badge variant="outline" className="text-lg py-1.5 px-4">
                          {teamName}
                        </Badge>
                        <Button size="icon" variant="ghost" onClick={() => setIsEditing(true)}>
                          <Edit2 className="w-4 h-4" />
                        </Button>
                      </div>
                    )}
                  </div>

                  {/* Quick Stats */}
                  <div className="grid grid-cols-2 gap-4 w-full">
                    <div className="p-4 rounded-lg bg-muted text-center">
                      <Trophy className="w-5 h-5 text-accent mx-auto mb-1" />
                      <p className="text-2xl font-bold text-foreground">{userTeam.totalPoints}</p>
                      <p className="text-xs text-muted-foreground">Total Points</p>
                    </div>
                    <div className="p-4 rounded-lg bg-muted text-center">
                      <TrendingUp className="w-5 h-5 text-primary mx-auto mb-1" />
                      <p className="text-2xl font-bold text-foreground">#{userTeam.overallRank.toLocaleString()}</p>
                      <p className="text-xs text-muted-foreground">Overall Rank</p>
                    </div>
                  </div>

                  {/* Info */}
                  <div className="w-full mt-6 space-y-3 text-left">
                    <div className="flex justify-between py-2 border-b border-border">
                      <span className="text-muted-foreground text-sm">Joined</span>
                      <span className="text-foreground text-sm font-medium">{userData.joined}</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-border">
                      <span className="text-muted-foreground text-sm">Country</span>
                      <span className="text-foreground text-sm font-medium">{userData.country} 🇿🇼</span>
                    </div>
                    <div className="flex justify-between py-2">
                      <span className="text-muted-foreground text-sm">Favorite Team</span>
                      <span className="text-foreground text-sm font-medium">{userData.favoriteTeam}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2">
            <Tabs defaultValue="history">
              <TabsList className="mb-6">
                <TabsTrigger value="history" className="gap-2">
                  <Calendar className="w-4 h-4" />
                  History
                </TabsTrigger>
                <TabsTrigger value="achievements" className="gap-2">
                  <Medal className="w-4 h-4" />
                  Achievements
                </TabsTrigger>
              </TabsList>

              <TabsContent value="history">
                {/* Season Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                  <StatCard
                    title="Best GW"
                    value="91"
                    subtitle="Gameweek 14"
                    icon={<Target className="w-5 h-5" />}
                  />
                  <StatCard
                    title="Avg Points"
                    value="71.6"
                    subtitle="Per gameweek"
                    icon={<TrendingUp className="w-5 h-5" />}
                  />
                  <StatCard
                    title="Best Rank"
                    value="#9,876"
                    subtitle="Gameweek 14"
                    icon={<Trophy className="w-5 h-5" />}
                  />
                  <StatCard
                    title="Transfers"
                    value="23"
                    subtitle="This season"
                    icon={<User className="w-5 h-5" />}
                  />
                </div>

                {/* Gameweek History */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Gameweek History</CardTitle>
                    <CardDescription>Your recent performance</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead>
                          <tr className="border-b border-border">
                            <th className="text-left py-3 text-xs font-medium text-muted-foreground">Gameweek</th>
                            <th className="text-center py-3 text-xs font-medium text-muted-foreground">Points</th>
                            <th className="text-center py-3 text-xs font-medium text-muted-foreground">Rank</th>
                            <th className="text-right py-3 text-xs font-medium text-muted-foreground">Highest</th>
                          </tr>
                        </thead>
                        <tbody>
                          {gameweekHistory.map((gw) => (
                            <tr key={gw.gw} className="border-b border-border/50">
                              <td className="py-3">
                                <span className="font-medium text-foreground">GW{gw.gw}</span>
                              </td>
                              <td className="py-3 text-center">
                                <span className="font-bold text-primary">{gw.points}</span>
                              </td>
                              <td className="py-3 text-center">
                                <span className="text-muted-foreground">#{gw.rank.toLocaleString()}</span>
                              </td>
                              <td className="py-3 text-right">
                                <span className="text-muted-foreground">{gw.highestScore}</span>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="achievements">
                <div className="grid md:grid-cols-2 gap-4">
                  {achievements.map((achievement) => (
                    <Card
                      key={achievement.id}
                      className={achievement.unlocked ? 'border-accent/50 bg-accent/5' : 'opacity-60'}
                    >
                      <CardContent className="p-4 flex items-center gap-4">
                        <div className={`
                          w-12 h-12 rounded-full flex items-center justify-center text-2xl
                          ${achievement.unlocked ? 'bg-accent/20' : 'bg-muted grayscale'}
                        `}>
                          {achievement.icon}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <h3 className="font-medium text-foreground">{achievement.name}</h3>
                            {achievement.unlocked && (
                              <Badge variant="default" className="text-[10px] px-1.5">Unlocked</Badge>
                            )}
                          </div>
                          <p className="text-sm text-muted-foreground">{achievement.description}</p>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Profile;
