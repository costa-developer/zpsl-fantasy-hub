import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { StatCard } from '@/components/fantasy/StatCard';
import { GameweekCountdown } from '@/components/fantasy/GameweekCountdown';
import { PitchView } from '@/components/fantasy/PitchView';
import { FixtureCard } from '@/components/fantasy/FixtureCard';
import { PlayerCard } from '@/components/fantasy/PlayerCard';
import { Button } from '@/components/ui/button';
import { useFantasy } from '@/hooks/useFantasy';
import { Link } from 'react-router-dom';
import { Trophy, TrendingUp, Users, ArrowRight, Calendar, Star, Zap } from 'lucide-react';

export const Dashboard = () => {
  const { 
    userTeam, 
    selectedPlayers, 
    currentGameweek, 
    currentFixtures,
    players,
  } = useFantasy();

  // Get top performers
  const topPlayers = [...players]
    .sort((a, b) => b.form - a.form)
    .slice(0, 3);

  return (
    <div className="min-h-screen flex flex-col bg-muted/30">
      <Navbar isAuthenticated />
      
      <main className="flex-1">
        {/* Header */}
        <section className="bg-gradient-hero text-primary-foreground py-8">
          <div className="container">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <p className="text-primary-foreground/60 text-sm mb-1">Welcome back</p>
                <h1 className="font-heading font-bold text-2xl md:text-3xl">{userTeam.name}</h1>
              </div>
              <div className="flex gap-3">
                <Link to="/pick-team">
                  <Button variant="gold" size="lg">
                    Edit Team
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        <div className="container py-8">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Stats Row */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <StatCard
                  title="Overall Rank"
                  value={userTeam.overallRank.toLocaleString()}
                  icon={Trophy}
                  trend="up"
                  trendValue="1,234"
                />
                <StatCard
                  title="Total Points"
                  value={userTeam.totalPoints}
                  icon={Star}
                  variant="primary"
                />
                <StatCard
                  title="GW Points"
                  value={userTeam.gameweekPoints}
                  icon={Zap}
                  variant="gold"
                />
                <StatCard
                  title="Transfers"
                  value={userTeam.freeTransfers}
                  subtitle="free available"
                  icon={Users}
                />
              </div>

              {/* Pitch View */}
              <div className="bg-card rounded-2xl border border-border shadow-card p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="font-heading font-bold text-xl">Your Squad</h2>
                  <Link to="/pick-team">
                    <Button variant="outline" size="sm">
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

              {/* Upcoming Fixtures */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h2 className="font-heading font-bold text-xl">Upcoming Fixtures</h2>
                  <Link to="/fixtures">
                    <Button variant="ghost" size="sm">
                      View All
                      <ArrowRight className="w-4 h-4" />
                    </Button>
                  </Link>
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  {currentFixtures.slice(0, 4).map(fixture => (
                    <FixtureCard key={fixture.id} fixture={fixture} />
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Gameweek Countdown */}
              {currentGameweek && (
                <GameweekCountdown
                  deadline={currentGameweek.deadline}
                  gameweekName={currentGameweek.name}
                />
              )}

              {/* Quick Actions */}
              <div className="bg-card rounded-2xl border border-border shadow-card p-6">
                <h3 className="font-heading font-bold text-lg mb-4">Quick Actions</h3>
                <div className="space-y-3">
                  <Link to="/transfers" className="block">
                    <Button variant="outline" className="w-full justify-start">
                      <TrendingUp className="w-4 h-4 mr-2" />
                      Make Transfers
                    </Button>
                  </Link>
                  <Link to="/leagues" className="block">
                    <Button variant="outline" className="w-full justify-start">
                      <Trophy className="w-4 h-4 mr-2" />
                      Join League
                    </Button>
                  </Link>
                  <Link to="/fixtures" className="block">
                    <Button variant="outline" className="w-full justify-start">
                      <Calendar className="w-4 h-4 mr-2" />
                      View Fixtures
                    </Button>
                  </Link>
                </div>
              </div>

              {/* Top Form Players */}
              <div className="bg-card rounded-2xl border border-border shadow-card p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-heading font-bold text-lg">Top Form</h3>
                  <Link to="/statistics">
                    <Button variant="ghost" size="sm">
                      View All
                    </Button>
                  </Link>
                </div>
                <div className="space-y-3">
                  {topPlayers.map((player, index) => (
                    <PlayerCard 
                      key={player.id} 
                      player={player} 
                      compact 
                      showActions={false}
                    />
                  ))}
                </div>
              </div>

              {/* Budget Info */}
              <div className="bg-gradient-gold rounded-2xl p-6 text-accent-foreground">
                <h3 className="font-heading font-bold text-lg mb-2">Team Value</h3>
                <p className="text-3xl font-heading font-black">
                  £{(100 - userTeam.budget).toFixed(1)}m
                </p>
                <p className="text-sm opacity-80 mt-1">
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
