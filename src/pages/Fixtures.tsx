import { useState } from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { FixtureCard } from '@/components/fantasy/FixtureCard';
import { GameweekCountdown } from '@/components/fantasy/GameweekCountdown';
import { Button } from '@/components/ui/button';
import { useFantasy } from '@/hooks/useFantasy';
import { ChevronLeft, ChevronRight, Calendar } from 'lucide-react';
import { cn } from '@/lib/utils';

export const Fixtures = () => {
  const { fixtures, gameweeks, currentGameweek } = useFantasy();
  const [selectedGameweek, setSelectedGameweek] = useState(currentGameweek?.id || 18);

  const gameweekFixtures = fixtures.filter(f => f.gameweek === selectedGameweek);
  const selectedGW = gameweeks.find(g => g.id === selectedGameweek);

  const handlePrevGameweek = () => {
    const currentIndex = gameweeks.findIndex(g => g.id === selectedGameweek);
    if (currentIndex > 0) {
      setSelectedGameweek(gameweeks[currentIndex - 1].id);
    }
  };

  const handleNextGameweek = () => {
    const currentIndex = gameweeks.findIndex(g => g.id === selectedGameweek);
    if (currentIndex < gameweeks.length - 1) {
      setSelectedGameweek(gameweeks[currentIndex + 1].id);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-muted/30">
      <Navbar isAuthenticated />
      
      <main className="flex-1">
        {/* Header */}
        <section className="bg-gradient-hero text-primary-foreground py-8">
          <div className="container">
            <h1 className="font-heading font-bold text-2xl md:text-3xl mb-2">Fixtures & Results</h1>
            <p className="text-primary-foreground/70">View all ZPSL matches and results</p>
          </div>
        </section>

        <div className="container py-8">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Gameweek Selector */}
              <div className="bg-card rounded-xl border border-border shadow-card p-4">
                <div className="flex items-center justify-between">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={handlePrevGameweek}
                    disabled={selectedGameweek === gameweeks[0]?.id}
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </Button>
                  
                  <div className="text-center">
                    <h2 className="font-heading font-bold text-xl">
                      {selectedGW?.name || `Gameweek ${selectedGameweek}`}
                    </h2>
                    <div className="flex items-center justify-center gap-2 mt-1">
                      {selectedGW?.finished && (
                        <span className="px-2 py-0.5 rounded-full bg-muted text-xs font-medium">
                          Finished
                        </span>
                      )}
                      {selectedGW?.isCurrent && (
                        <span className="px-2 py-0.5 rounded-full bg-primary text-primary-foreground text-xs font-medium">
                          Current
                        </span>
                      )}
                      {selectedGW?.isNext && (
                        <span className="px-2 py-0.5 rounded-full bg-accent text-accent-foreground text-xs font-medium">
                          Next
                        </span>
                      )}
                    </div>
                  </div>

                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={handleNextGameweek}
                    disabled={selectedGameweek === gameweeks[gameweeks.length - 1]?.id}
                  >
                    <ChevronRight className="w-5 h-5" />
                  </Button>
                </div>
              </div>

              {/* Gameweek Tabs */}
              <div className="flex gap-2 overflow-x-auto pb-2">
                {gameweeks.map(gw => (
                  <Button
                    key={gw.id}
                    variant={selectedGameweek === gw.id ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedGameweek(gw.id)}
                    className={cn(
                      "flex-shrink-0",
                      gw.isCurrent && selectedGameweek !== gw.id && "border-primary"
                    )}
                  >
                    GW{gw.id}
                  </Button>
                ))}
              </div>

              {/* Fixtures Grid */}
              {gameweekFixtures.length > 0 ? (
                <div className="grid sm:grid-cols-2 gap-4">
                  {gameweekFixtures.map(fixture => (
                    <FixtureCard key={fixture.id} fixture={fixture} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 bg-card rounded-xl border border-border">
                  <Calendar className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="font-heading font-bold text-lg mb-2">No fixtures</h3>
                  <p className="text-muted-foreground">
                    No fixtures scheduled for this gameweek yet.
                  </p>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Countdown */}
              {currentGameweek && (
                <GameweekCountdown
                  deadline={currentGameweek.deadline}
                  gameweekName={currentGameweek.name}
                />
              )}

              {/* Recent Results */}
              <div className="bg-card rounded-xl border border-border shadow-card p-6">
                <h3 className="font-heading font-bold text-lg mb-4">Recent Results</h3>
                <div className="space-y-4">
                  {fixtures
                    .filter(f => f.finished)
                    .slice(0, 4)
                    .map(fixture => (
                      <FixtureCard key={fixture.id} fixture={fixture} />
                    ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Fixtures;
