import { useParams, Link } from 'react-router-dom';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { useZPSLData } from '@/hooks/useZPSLData';
import { 
  ArrowLeft, 
  TrendingUp, 
  TrendingDown, 
  Target, 
  Trophy,
  Clock,
  Users,
  Star,
  Shield,
  Zap
} from 'lucide-react';

const positionColors = {
  GK: 'bg-amber-500',
  DEF: 'bg-blue-500',
  MID: 'bg-green-500',
  FWD: 'bg-red-500',
};

const positionLabels = {
  GK: 'Goalkeeper',
  DEF: 'Defender',
  MID: 'Midfielder',
  FWD: 'Forward',
};

export const PlayerProfile = () => {
  const { id } = useParams<{ id: string }>();
  const { players, getTeamById, isLoading } = useZPSLData();
  
  const player = players.find(p => p.id === id);
  const team = player ? getTeamById(player.teamId) : undefined;

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <Navbar />
        <main className="flex-1 container px-4 py-8">
          <div className="animate-pulse space-y-6">
            <div className="h-8 bg-muted rounded w-32"></div>
            <div className="h-48 bg-muted rounded-xl"></div>
            <div className="grid md:grid-cols-3 gap-4">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="h-24 bg-muted rounded-xl"></div>
              ))}
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!player) {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <Navbar />
        <main className="flex-1 container px-4 py-8">
          <div className="text-center py-16">
            <h1 className="text-2xl font-heading font-bold text-foreground mb-4">Player Not Found</h1>
            <p className="text-muted-foreground mb-6">The player you're looking for doesn't exist.</p>
            <Link to="/statistics">
              <Button>
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Statistics
              </Button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const priceChangePercent = player.price > 0 ? ((player.priceChange / player.price) * 100).toFixed(1) : '0';
  const formRating = Math.min(player.form * 10, 100);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      
      <main className="flex-1">
        {/* Header */}
        <section className="bg-gradient-hero py-6 sm:py-8">
          <div className="container px-4">
            <Link to="/statistics" className="inline-flex items-center text-white/70 hover:text-white mb-4 transition-colors">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Statistics
            </Link>
            
            <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6">
              {/* Player Avatar */}
              <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-white/10 border-2 border-white/20 flex items-center justify-center">
                <span className="text-3xl sm:text-4xl font-heading font-bold text-white">
                  {player.firstName.charAt(0)}{player.lastName.charAt(0)}
                </span>
              </div>
              
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h1 className="font-heading font-bold text-2xl sm:text-3xl text-white">
                    {player.firstName} {player.lastName}
                  </h1>
                  <Badge className={`${positionColors[player.position]} text-white`}>
                    {player.position}
                  </Badge>
                </div>
                
                <div className="flex items-center gap-4 text-white/70">
                  {team && (
                    <span className="flex items-center gap-2">
                      <span className="text-lg">{team.badge}</span>
                      {team.name}
                    </span>
                  )}
                  <span>•</span>
                  <span>{positionLabels[player.position]}</span>
                </div>
              </div>
              
              <div className="flex flex-col items-end">
                <span className="text-3xl sm:text-4xl font-heading font-black text-white">
                  £{player.price.toFixed(1)}m
                </span>
                <div className={`flex items-center gap-1 ${player.priceChange >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                  {player.priceChange >= 0 ? (
                    <TrendingUp className="w-4 h-4" />
                  ) : (
                    <TrendingDown className="w-4 h-4" />
                  )}
                  <span className="text-sm">
                    £{Math.abs(player.priceChange).toFixed(1)}m ({priceChangePercent}%)
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className="container px-4 py-6 sm:py-8">
          {/* Key Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <Card>
              <CardContent className="p-4 text-center">
                <Trophy className="w-6 h-6 mx-auto mb-2 text-primary" />
                <p className="text-2xl font-heading font-bold text-foreground">{player.totalPoints}</p>
                <p className="text-sm text-muted-foreground">Total Points</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4 text-center">
                <Star className="w-6 h-6 mx-auto mb-2 text-accent" />
                <p className="text-2xl font-heading font-bold text-foreground">{player.form.toFixed(1)}</p>
                <p className="text-sm text-muted-foreground">Form</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4 text-center">
                <Users className="w-6 h-6 mx-auto mb-2 text-blue-500" />
                <p className="text-2xl font-heading font-bold text-foreground">{player.selected.toFixed(1)}%</p>
                <p className="text-sm text-muted-foreground">Selected By</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4 text-center">
                <Clock className="w-6 h-6 mx-auto mb-2 text-muted-foreground" />
                <p className="text-2xl font-heading font-bold text-foreground">{player.minutesPlayed}</p>
                <p className="text-sm text-muted-foreground">Minutes</p>
              </CardContent>
            </Card>
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            {/* Performance Stats */}
            <div className="lg:col-span-2 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Target className="w-5 h-5 text-primary" />
                    Season Performance
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Goals */}
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm font-medium">Goals</span>
                      <span className="text-sm font-bold text-primary">{player.goalsScored}</span>
                    </div>
                    <Progress value={Math.min(player.goalsScored * 5, 100)} className="h-2" />
                  </div>
                  
                  {/* Assists */}
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm font-medium">Assists</span>
                      <span className="text-sm font-bold text-primary">{player.assists}</span>
                    </div>
                    <Progress value={Math.min(player.assists * 5, 100)} className="h-2" />
                  </div>
                  
                  {/* Clean Sheets */}
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm font-medium">Clean Sheets</span>
                      <span className="text-sm font-bold text-primary">{player.cleanSheets}</span>
                    </div>
                    <Progress value={Math.min(player.cleanSheets * 5, 100)} className="h-2" />
                  </div>
                </CardContent>
              </Card>

              {/* Transfer Activity */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Zap className="w-5 h-5 text-accent" />
                    Transfer Activity
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="text-center p-4 bg-green-500/10 rounded-lg">
                      <TrendingUp className="w-5 h-5 mx-auto mb-2 text-green-600" />
                      <p className="text-xl font-bold text-green-600">{player.transfersIn.toLocaleString()}</p>
                      <p className="text-xs text-muted-foreground">Transfers In</p>
                    </div>
                    <div className="text-center p-4 bg-red-500/10 rounded-lg">
                      <TrendingDown className="w-5 h-5 mx-auto mb-2 text-red-600" />
                      <p className="text-xl font-bold text-red-600">{player.transfersOut.toLocaleString()}</p>
                      <p className="text-xs text-muted-foreground">Transfers Out</p>
                    </div>
                    <div className={`text-center p-4 rounded-lg ${player.netTransfers >= 0 ? 'bg-green-500/10' : 'bg-red-500/10'}`}>
                      {player.netTransfers >= 0 ? (
                        <TrendingUp className="w-5 h-5 mx-auto mb-2 text-green-600" />
                      ) : (
                        <TrendingDown className="w-5 h-5 mx-auto mb-2 text-red-600" />
                      )}
                      <p className={`text-xl font-bold ${player.netTransfers >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                        {player.netTransfers >= 0 ? '+' : ''}{player.netTransfers.toLocaleString()}
                      </p>
                      <p className="text-xs text-muted-foreground">Net Transfers</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Form Rating */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Star className="w-5 h-5 text-accent" />
                    Current Form
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="relative pt-4">
                    <div className="flex justify-center mb-4">
                      <div className="w-32 h-32 rounded-full border-8 border-primary/20 flex items-center justify-center relative">
                        <div 
                          className="absolute inset-0 rounded-full border-8 border-primary"
                          style={{
                            clipPath: `polygon(0 0, 100% 0, 100% 100%, 0 100%)`,
                            transform: `rotate(${formRating * 3.6 - 90}deg)`,
                            transformOrigin: 'center',
                          }}
                        />
                        <span className="text-3xl font-heading font-black text-foreground">
                          {player.form.toFixed(1)}
                        </span>
                      </div>
                    </div>
                    <p className="text-center text-sm text-muted-foreground">
                      {player.form >= 7 ? 'Excellent form' : 
                       player.form >= 5 ? 'Good form' : 
                       player.form >= 3 ? 'Average form' : 'Poor form'}
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Price History */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-green-600" />
                    Price Changes
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Current Price</span>
                    <span className="font-bold">£{player.price.toFixed(1)}m</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Season Change</span>
                    <span className={`font-bold ${player.priceChange >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {player.priceChange >= 0 ? '+' : ''}£{player.priceChange.toFixed(1)}m
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Weekly Change</span>
                    <span className={`font-bold ${player.priceChangeWeek >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {player.priceChangeWeek >= 0 ? '+' : ''}£{player.priceChangeWeek.toFixed(2)}m
                    </span>
                  </div>
                </CardContent>
              </Card>

              {/* Ownership Info */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="w-5 h-5 text-blue-500" />
                    Ownership
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm">Selected by</span>
                        <span className="text-sm font-bold">{player.selected.toFixed(1)}%</span>
                      </div>
                      <Progress value={player.selected} className="h-2" />
                    </div>
                    <p className="text-xs text-muted-foreground text-center">
                      {player.selected >= 30 ? 'Highly owned - differential risk' :
                       player.selected >= 10 ? 'Moderate ownership' :
                       'Low ownership - great differential'}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default PlayerProfile;
