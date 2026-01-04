import { useCallback } from 'react';
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
import { useFantasy } from '@/hooks/useFantasy';
import { useZPSLData } from '@/hooks/useZPSLData';
import { usePullToRefresh } from '@/hooks/usePullToRefresh';
import { useIsMobile } from '@/hooks/use-mobile';
import { Link } from 'react-router-dom';
import { Trophy, TrendingUp, Users, ArrowRight, Calendar, Star, Zap } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export const Dashboard = () => {
  const { 
    userTeam, 
    selectedPlayers, 
    currentGameweek, 
  } = useFantasy();

  const { players, fixtures, isLoading, refetch } = useZPSLData();
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
  const topPlayers = [...players]
    .sort((a, b) => b.form - a.form)
    .slice(0, 3);

  // Get upcoming fixtures (not finished)
  const upcomingFixtures = fixtures
    .filter(f => !f.finished)
    .slice(0, 4);

  // Get recent results
  const recentResults = fixtures
    .filter(f => f.finished)
    .slice(-4)
    .reverse();

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
        <section className="bg-gradient-hero py-6 sm:py-8">
          <div className="container px-4">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <p className="text-white/60 text-xs sm:text-sm mb-1">Welcome back</p>
                <h1 className="font-heading font-bold text-xl sm:text-2xl md:text-3xl text-white">{userTeam.name}</h1>
              </div>
              <div className="flex gap-3">
                <Link to="/pick-team">
                  <Button variant="gold" size="default" className="text-sm sm:text-base">
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
              {/* Stats Row */}
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
                  title="Transfers"
                  value={userTeam.freeTransfers}
                  subtitle="free available"
                  icon={<Users className="w-4 sm:w-5 h-4 sm:h-5" />}
                />
              </div>

              {/* League Standings */}
              <StandingsTable />

              {/* Pitch View */}
              <div className="bg-card rounded-xl sm:rounded-2xl border border-border shadow-card p-4 sm:p-6">
                <div className="flex items-center justify-between mb-4 sm:mb-6">
                  <h2 className="font-heading font-bold text-lg sm:text-xl text-foreground">Your Squad</h2>
                  <Link to="/pick-team">
                    <Button variant="outline" size="sm" className="text-xs sm:text-sm">
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

              {/* Recent Results */}
              {recentResults.length > 0 && (
                <div>
                  <div className="flex items-center justify-between mb-3 sm:mb-4">
                    <h2 className="font-heading font-bold text-lg sm:text-xl text-foreground">Recent Results</h2>
                    <Link to="/fixtures">
                      <Button variant="ghost" size="sm" className="text-xs sm:text-sm">
                        View All
                        <ArrowRight className="w-4 h-4" />
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

              {/* Upcoming Fixtures */}
              {upcomingFixtures.length > 0 && (
                <div>
                  <div className="flex items-center justify-between mb-3 sm:mb-4">
                    <h2 className="font-heading font-bold text-lg sm:text-xl text-foreground">Upcoming Fixtures</h2>
                    <Link to="/fixtures">
                      <Button variant="ghost" size="sm" className="text-xs sm:text-sm">
                        View All
                        <ArrowRight className="w-4 h-4" />
                      </Button>
                    </Link>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-3 sm:gap-4">
                    {upcomingFixtures.map(fixture => (
                      <FixtureCard key={fixture.id} fixture={fixture} />
                    ))}
                  </div>
                </div>
              )}
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

              {/* Quick Actions */}
              <div className="bg-card rounded-xl sm:rounded-2xl border border-border shadow-card p-4 sm:p-6">
                <h3 className="font-heading font-bold text-base sm:text-lg mb-3 sm:mb-4 text-foreground">Quick Actions</h3>
                <div className="space-y-2 sm:space-y-3">
                  <Link to="/transfers" className="block">
                    <Button variant="outline" className="w-full justify-start text-sm">
                      <TrendingUp className="w-4 h-4 mr-2" />
                      Make Transfers
                    </Button>
                  </Link>
                  <Link to="/leagues" className="block">
                    <Button variant="outline" className="w-full justify-start text-sm">
                      <Trophy className="w-4 h-4 mr-2" />
                      Join League
                    </Button>
                  </Link>
                  <Link to="/fixtures" className="block">
                    <Button variant="outline" className="w-full justify-start text-sm">
                      <Calendar className="w-4 h-4 mr-2" />
                      View Fixtures
                    </Button>
                  </Link>
                </div>
              </div>

              {/* Top Form Players */}
              <div className="bg-card rounded-xl sm:rounded-2xl border border-border shadow-card p-4 sm:p-6">
                <div className="flex items-center justify-between mb-3 sm:mb-4">
                  <h3 className="font-heading font-bold text-base sm:text-lg text-foreground">Top Form</h3>
                  <Link to="/statistics">
                    <Button variant="ghost" size="sm" className="text-xs sm:text-sm">
                      View All
                    </Button>
                  </Link>
                </div>
                {isLoading ? (
                  <div className="space-y-2">
                    {[...Array(3)].map((_, i) => (
                      <div key={i} className="h-16 bg-muted rounded animate-pulse"></div>
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

              {/* Social Share */}
              <SocialShare 
                teamName={userTeam.name}
                rank={userTeam.overallRank}
                points={userTeam.totalPoints}
                gameweekPoints={userTeam.gameweekPoints}
              />

              {/* Budget Info */}
              <div className="bg-gradient-gold rounded-xl sm:rounded-2xl p-4 sm:p-6">
                <h3 className="font-heading font-bold text-base sm:text-lg mb-2 text-foreground">Team Value</h3>
                <p className="text-2xl sm:text-3xl font-heading font-black text-foreground">
                  £{(100 - userTeam.budget).toFixed(1)}m
                </p>
                <p className="text-xs sm:text-sm text-foreground/70 mt-1">
                  £{userTeam.budget.toFixed(1)}m in the bank
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Dashboard;
