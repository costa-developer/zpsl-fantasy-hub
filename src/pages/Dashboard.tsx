import { useCallback, useMemo } from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { StatCard } from '@/components/fantasy/StatCard';
import { GameweekCountdown } from '@/components/fantasy/GameweekCountdown';
import { PitchView } from '@/components/fantasy/PitchView';
import { FixtureCard } from '@/components/fantasy/FixtureCard';
import { PlayerCard } from '@/components/fantasy/PlayerCard';
import { StandingsTable } from '@/components/fantasy/StandingsTable';
import { SocialShare } from '@/components/fantasy/SocialShare';
import { PullToRefreshIndicator } from '@/components/ui/PullToRefresh';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { useFantasy } from '@/hooks/useFantasy';
import { useZPSLData } from '@/hooks/useZPSLData';
import { usePullToRefresh } from '@/hooks/usePullToRefresh';
import { useIsMobile } from '@/hooks/use-mobile';
import { Link } from 'react-router-dom';
import { 
  Trophy, TrendingUp, Users, ArrowRight, Calendar, Star, Zap, 
  Target, Award, Clock, ChevronRight, Wallet, BarChart3
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { format } from 'date-fns';

export const Dashboard = () => {
  const { 
    userTeam, 
    selectedPlayers, 
    currentGameweek,
    remainingBudget,
    positionCounts,
  } = useFantasy();

  const { players, fixtures, teams, isLoading, refetch, getTeamById } = useZPSLData();
  const isMobile = useIsMobile();
  const { toast } = useToast();

  // Pull to refresh handler
  const handleRefresh = useCallback(async () => {
    try {
      await refetch();
      toast({
        title: 'Refreshed',
        description: 'Dashboard data updated successfully.',
      });
    } catch (error) {
      toast({
        title: 'Refresh failed',
        description: 'Could not update data. Please try again.',
        variant: 'destructive',
      });
    }
  }, [refetch, toast]);

  const { pullDistance, isRefreshing, progress } = usePullToRefresh({
    onRefresh: handleRefresh,
    disabled: !isMobile,
  });

  // Get top performers from real data
  const topPlayers = useMemo(() => 
    [...players].sort((a, b) => b.form - a.form).slice(0, 3),
    [players]
  );

  // Top scorers
  const topScorers = useMemo(() => 
    [...players].sort((a, b) => b.goalsScored - a.goalsScored).slice(0, 3),
    [players]
  );

  // Get upcoming fixtures (not finished)
  const upcomingFixtures = useMemo(() => 
    fixtures.filter(f => !f.finished).slice(0, 6),
    [fixtures]
  );

  // Get recent results
  const recentResults = useMemo(() => 
    fixtures.filter(f => f.finished).slice(-4).reverse(),
    [fixtures]
  );

  // Team stats summary
  const teamStats = useMemo(() => {
    const totalGoals = selectedPlayers.reduce((sum, p) => sum + p.goalsScored, 0);
    const totalAssists = selectedPlayers.reduce((sum, p) => sum + p.assists, 0);
    const avgForm = selectedPlayers.length 
      ? (selectedPlayers.reduce((sum, p) => sum + p.form, 0) / selectedPlayers.length).toFixed(1)
      : '0.0';
    const squadValue = selectedPlayers.reduce((sum, p) => sum + p.price, 0);
    
    return { totalGoals, totalAssists, avgForm, squadValue };
  }, [selectedPlayers]);

  // Squad completeness
  const squadProgress = (selectedPlayers.length / 15) * 100;

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Pull to refresh indicator - mobile only */}
      {isMobile && (
        <PullToRefreshIndicator 
          pullDistance={pullDistance}
          isRefreshing={isRefreshing}
          progress={progress}
        />
      )}
      
      <Navbar />
      
      <main className="flex-1">
        {/* Header */}
        <section className="bg-primary py-8 sm:py-10">
          <div className="container px-4">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <p className="text-primary-foreground/70 text-xs sm:text-sm mb-1">Welcome back</p>
                <h1 className="font-heading font-bold text-2xl sm:text-3xl md:text-4xl text-primary-foreground">{userTeam.name}</h1>
                <div className="flex items-center gap-4 mt-2">
                  <span className="text-primary-foreground/80 text-sm flex items-center gap-1.5">
                    <Trophy className="w-4 h-4" />
                    Rank #{userTeam.overallRank.toLocaleString()}
                  </span>
                  <span className="text-primary-foreground/80 text-sm flex items-center gap-1.5">
                    <Star className="w-4 h-4" />
                    {userTeam.totalPoints} pts
                  </span>
                </div>
              </div>
              <div className="flex gap-3">
                <Link to="/pick-team">
                  <Button className="bg-accent text-accent-foreground hover:bg-accent/90 font-semibold">
                    Edit Team
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        <div className="container px-4 py-6 sm:py-8">
          <div className="grid lg:grid-cols-3 gap-6 sm:gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6 sm:space-y-8">
              
              {/* Performance Overview */}
              <div>
                <h2 className="font-heading font-bold text-lg sm:text-xl mb-4 text-foreground flex items-center gap-2">
                  <BarChart3 className="w-5 h-5 text-primary" />
                  Performance Overview
                </h2>
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
                  <StatCard
                    title="Overall Rank"
                    value={userTeam.overallRank.toLocaleString()}
                    icon={<Trophy className="w-4 sm:w-5 h-4 sm:h-5" />}
                    trend="up"
                    trendValue="1,234"
                  />
                  <StatCard
                    title="Total Points"
                    value={userTeam.totalPoints}
                    icon={<Star className="w-4 sm:w-5 h-4 sm:h-5" />}
                    variant="primary"
                  />
                  <StatCard
                    title="GW Points"
                    value={userTeam.gameweekPoints}
                    icon={<Zap className="w-4 sm:w-5 h-4 sm:h-5" />}
                    variant="gold"
                  />
                  <StatCard
                    title="Free Transfers"
                    value={userTeam.freeTransfers}
                    subtitle="available"
                    icon={<TrendingUp className="w-4 sm:w-5 h-4 sm:h-5" />}
                  />
                </div>
              </div>

              {/* Team Stats */}
              <div className="bg-card rounded-2xl border border-border shadow-card p-5 sm:p-6">
                <h3 className="font-heading font-bold text-lg mb-4 text-foreground flex items-center gap-2">
                  <Target className="w-5 h-5 text-primary" />
                  Squad Statistics
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  <div className="text-center p-4 rounded-xl bg-muted/50">
                    <p className="text-2xl sm:text-3xl font-heading font-bold text-foreground">{teamStats.totalGoals}</p>
                    <p className="text-xs sm:text-sm text-muted-foreground mt-1">Total Goals</p>
                  </div>
                  <div className="text-center p-4 rounded-xl bg-muted/50">
                    <p className="text-2xl sm:text-3xl font-heading font-bold text-foreground">{teamStats.totalAssists}</p>
                    <p className="text-xs sm:text-sm text-muted-foreground mt-1">Total Assists</p>
                  </div>
                  <div className="text-center p-4 rounded-xl bg-muted/50">
                    <p className="text-2xl sm:text-3xl font-heading font-bold text-primary">{teamStats.avgForm}</p>
                    <p className="text-xs sm:text-sm text-muted-foreground mt-1">Avg. Form</p>
                  </div>
                  <div className="text-center p-4 rounded-xl bg-muted/50">
                    <p className="text-2xl sm:text-3xl font-heading font-bold text-foreground">£{teamStats.squadValue.toFixed(1)}m</p>
                    <p className="text-xs sm:text-sm text-muted-foreground mt-1">Squad Value</p>
                  </div>
                </div>
                
                {/* Squad Progress */}
                <div className="mt-5 pt-5 border-t border-border">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-foreground">Squad Completion</span>
                    <span className="text-sm text-muted-foreground">{selectedPlayers.length}/15 players</span>
                  </div>
                  <Progress value={squadProgress} className="h-2" />
                  <div className="flex justify-between mt-3 text-xs text-muted-foreground">
                    <span>GK: {positionCounts['GK'] || 0}/2</span>
                    <span>DEF: {positionCounts['DEF'] || 0}/5</span>
                    <span>MID: {positionCounts['MID'] || 0}/5</span>
                    <span>FWD: {positionCounts['FWD'] || 0}/3</span>
                  </div>
                </div>
              </div>

              {/* Upcoming Fixtures */}
              {upcomingFixtures.length > 0 && (
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="font-heading font-bold text-lg sm:text-xl text-foreground flex items-center gap-2">
                      <Calendar className="w-5 h-5 text-primary" />
                      Upcoming Fixtures
                    </h2>
                    <Link to="/fixtures">
                      <Button variant="ghost" size="sm" className="text-sm">
                        View All
                        <ChevronRight className="w-4 h-4" />
                      </Button>
                    </Link>
                  </div>
                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
                    {upcomingFixtures.map(fixture => (
                      <FixtureCard key={fixture.id} fixture={fixture} />
                    ))}
                  </div>
                </div>
              )}

              {/* Recent Results */}
              {recentResults.length > 0 && (
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="font-heading font-bold text-lg sm:text-xl text-foreground flex items-center gap-2">
                      <Award className="w-5 h-5 text-primary" />
                      Recent Results
                    </h2>
                    <Link to="/fixtures">
                      <Button variant="ghost" size="sm" className="text-sm">
                        View All
                        <ChevronRight className="w-4 h-4" />
                      </Button>
                    </Link>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-3 sm:gap-4">
                    {recentResults.map(fixture => (
                      <FixtureCard key={fixture.id} fixture={fixture} />
                    ))}
                  </div>
                </div>
              )}

              {/* Pitch View */}
              <div className="bg-card rounded-2xl border border-border shadow-card p-4 sm:p-6">
                <div className="flex items-center justify-between mb-4 sm:mb-6">
                  <h2 className="font-heading font-bold text-lg sm:text-xl text-foreground flex items-center gap-2">
                    <Users className="w-5 h-5 text-primary" />
                    Your Squad
                  </h2>
                  <Link to="/pick-team">
                    <Button variant="outline" size="sm" className="text-sm">
                      Manage Team
                    </Button>
                  </Link>
                </div>
                <PitchView
                  players={selectedPlayers}
                  captainId={userTeam.captainId}
                  viceCaptainId={userTeam.viceCaptainId}
                />
              </div>

              {/* League Standings */}
              <StandingsTable />
            </div>

            {/* Sidebar */}
            <div className="space-y-4 sm:space-y-6">
              {/* Gameweek Countdown */}
              {currentGameweek && (
                <GameweekCountdown
                  deadline={currentGameweek.deadline}
                  gameweekName={currentGameweek.name}
                />
              )}

              {/* Budget Card */}
              <div className="bg-card rounded-2xl border border-border shadow-card p-5 sm:p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                    <Wallet className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-heading font-bold text-base text-foreground">Team Budget</h3>
                    <p className="text-xs text-muted-foreground">Manage your funds wisely</p>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between items-end">
                    <div>
                      <p className="text-xs text-muted-foreground">Squad Value</p>
                      <p className="text-xl font-heading font-bold text-foreground">£{teamStats.squadValue.toFixed(1)}m</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-muted-foreground">In the Bank</p>
                      <p className="text-xl font-heading font-bold text-primary">£{remainingBudget.toFixed(1)}m</p>
                    </div>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-primary rounded-full transition-all"
                      style={{ width: `${(teamStats.squadValue / 100) * 100}%` }}
                    />
                  </div>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="bg-card rounded-2xl border border-border shadow-card p-5 sm:p-6">
                <h3 className="font-heading font-bold text-base sm:text-lg mb-4 text-foreground">Quick Actions</h3>
                <div className="space-y-2 sm:space-y-3">
                  <Link to="/transfers" className="block">
                    <Button variant="outline" className="w-full justify-start text-sm h-11">
                      <TrendingUp className="w-4 h-4 mr-3 text-primary" />
                      Make Transfers
                    </Button>
                  </Link>
                  <Link to="/leagues" className="block">
                    <Button variant="outline" className="w-full justify-start text-sm h-11">
                      <Trophy className="w-4 h-4 mr-3 text-primary" />
                      Join League
                    </Button>
                  </Link>
                  <Link to="/fixtures" className="block">
                    <Button variant="outline" className="w-full justify-start text-sm h-11">
                      <Calendar className="w-4 h-4 mr-3 text-primary" />
                      View Fixtures
                    </Button>
                  </Link>
                  <Link to="/statistics" className="block">
                    <Button variant="outline" className="w-full justify-start text-sm h-11">
                      <BarChart3 className="w-4 h-4 mr-3 text-primary" />
                      Player Stats
                    </Button>
                  </Link>
                </div>
              </div>

              {/* Top Form Players */}
              <div className="bg-card rounded-2xl border border-border shadow-card p-5 sm:p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-heading font-bold text-base sm:text-lg text-foreground flex items-center gap-2">
                    <Zap className="w-4 h-4 text-accent" />
                    In Form
                  </h3>
                  <Link to="/statistics">
                    <Button variant="ghost" size="sm" className="text-xs">
                      View All
                    </Button>
                  </Link>
                </div>
                {isLoading ? (
                  <div className="space-y-2">
                    {[...Array(3)].map((_, i) => (
                      <div key={i} className="h-16 bg-muted rounded-xl animate-pulse"></div>
                    ))}
                  </div>
                ) : (
                  <div className="space-y-2 sm:space-y-3">
                    {topPlayers.map((player) => (
                      <PlayerCard 
                        key={player.id} 
                        player={player} 
                        compact 
                        showActions={false}
                      />
                    ))}
                  </div>
                )}
              </div>

              {/* Top Scorers */}
              <div className="bg-card rounded-2xl border border-border shadow-card p-5 sm:p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-heading font-bold text-base sm:text-lg text-foreground flex items-center gap-2">
                    <Target className="w-4 h-4 text-primary" />
                    Top Scorers
                  </h3>
                  <Link to="/statistics">
                    <Button variant="ghost" size="sm" className="text-xs">
                      View All
                    </Button>
                  </Link>
                </div>
                {isLoading ? (
                  <div className="space-y-2">
                    {[...Array(3)].map((_, i) => (
                      <div key={i} className="h-14 bg-muted rounded-xl animate-pulse"></div>
                    ))}
                  </div>
                ) : (
                  <div className="space-y-2">
                    {topScorers.map((player, idx) => (
                      <div 
                        key={player.id} 
                        className="flex items-center gap-3 p-3 rounded-xl bg-muted/50 hover:bg-muted transition-colors"
                      >
                        <span className="w-6 h-6 rounded-full bg-primary/10 text-primary text-xs font-bold flex items-center justify-center">
                          {idx + 1}
                        </span>
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-sm text-foreground truncate">
                            {player.firstName} {player.lastName}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {getTeamById(player.teamId)?.shortName || 'Unknown'}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-foreground">{player.goalsScored}</p>
                          <p className="text-xs text-muted-foreground">goals</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Social Share */}
              <SocialShare 
                teamName={userTeam.name}
                rank={userTeam.overallRank}
                points={userTeam.totalPoints}
                gameweekPoints={userTeam.gameweekPoints}
              />
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Dashboard;
