import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useZPSLData, AppTeam, AppFixture } from '@/hooks/useZPSLData';
import { useMemo } from 'react';
import { Trophy } from 'lucide-react';
import { cn } from '@/lib/utils';

interface TeamStanding {
  team: AppTeam;
  played: number;
  won: number;
  drawn: number;
  lost: number;
  goalsFor: number;
  goalsAgainst: number;
  goalDifference: number;
  points: number;
}

export const StandingsTable = () => {
  const { teams, fixtures, isLoading } = useZPSLData();

  const standings = useMemo(() => {
    const finishedFixtures = fixtures.filter(f => f.finished);
    
    const standingsMap = new Map<string, TeamStanding>();
    
    // Initialize all teams
    teams.forEach(team => {
      standingsMap.set(team.id, {
        team,
        played: 0,
        won: 0,
        drawn: 0,
        lost: 0,
        goalsFor: 0,
        goalsAgainst: 0,
        goalDifference: 0,
        points: 0,
      });
    });

    // Calculate stats from fixtures
    finishedFixtures.forEach(fixture => {
      const homeStanding = standingsMap.get(fixture.homeTeamId);
      const awayStanding = standingsMap.get(fixture.awayTeamId);
      
      if (!homeStanding || !awayStanding) return;
      
      const homeScore = fixture.homeScore ?? 0;
      const awayScore = fixture.awayScore ?? 0;

      // Update played
      homeStanding.played++;
      awayStanding.played++;

      // Update goals
      homeStanding.goalsFor += homeScore;
      homeStanding.goalsAgainst += awayScore;
      awayStanding.goalsFor += awayScore;
      awayStanding.goalsAgainst += homeScore;

      // Update results
      if (homeScore > awayScore) {
        homeStanding.won++;
        homeStanding.points += 3;
        awayStanding.lost++;
      } else if (homeScore < awayScore) {
        awayStanding.won++;
        awayStanding.points += 3;
        homeStanding.lost++;
      } else {
        homeStanding.drawn++;
        awayStanding.drawn++;
        homeStanding.points += 1;
        awayStanding.points += 1;
      }

      // Update goal difference
      homeStanding.goalDifference = homeStanding.goalsFor - homeStanding.goalsAgainst;
      awayStanding.goalDifference = awayStanding.goalsFor - awayStanding.goalsAgainst;
    });

    // Sort by points, then goal difference, then goals scored
    return Array.from(standingsMap.values())
      .filter(s => s.played > 0)
      .sort((a, b) => {
        if (b.points !== a.points) return b.points - a.points;
        if (b.goalDifference !== a.goalDifference) return b.goalDifference - a.goalDifference;
        return b.goalsFor - a.goalsFor;
      });
  }, [teams, fixtures]);

  if (isLoading) {
    return (
      <div className="bg-card rounded-xl border border-border p-4 animate-pulse">
        <div className="h-6 bg-muted rounded w-32 mb-4"></div>
        <div className="space-y-2">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="h-10 bg-muted rounded"></div>
          ))}
        </div>
      </div>
    );
  }

  if (standings.length === 0) {
    return (
      <div className="bg-card rounded-xl border border-border p-4">
        <h3 className="font-heading font-bold text-base sm:text-lg mb-3 text-foreground">ZPSL Standings</h3>
        <p className="text-sm text-muted-foreground">No matches played yet.</p>
      </div>
    );
  }

  return (
    <div className="bg-card rounded-xl border border-border shadow-card overflow-hidden">
      <div className="p-4 sm:p-5 border-b border-border bg-muted/30">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
            <Trophy className="w-4 h-4 text-primary" />
          </div>
          <h3 className="font-heading font-bold text-base sm:text-lg text-foreground">ZPSL Standings</h3>
        </div>
      </div>
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/30 hover:bg-muted/30">
              <TableHead className="w-10 text-center font-semibold">#</TableHead>
              <TableHead className="font-semibold">Team</TableHead>
              <TableHead className="text-center w-10 font-semibold">P</TableHead>
              <TableHead className="text-center w-10 font-semibold">W</TableHead>
              <TableHead className="text-center w-10 font-semibold">D</TableHead>
              <TableHead className="text-center w-10 font-semibold">L</TableHead>
              <TableHead className="text-center w-10 hidden sm:table-cell font-semibold">GF</TableHead>
              <TableHead className="text-center w-10 hidden sm:table-cell font-semibold">GA</TableHead>
              <TableHead className="text-center w-10 font-semibold">GD</TableHead>
              <TableHead className="text-center w-12 font-bold">Pts</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {standings.map((standing, index) => (
              <TableRow 
                key={standing.team.id}
                className={cn(
                  "transition-colors",
                  index < 3 && "bg-primary/5 hover:bg-primary/10"
                )}
              >
                <TableCell className="text-center font-medium">
                  <span className={cn(
                    "inline-flex items-center justify-center w-6 h-6 rounded-full text-xs",
                    index === 0 && "bg-accent text-accent-foreground font-bold",
                    index === 1 && "bg-muted-foreground/20 text-foreground font-semibold",
                    index === 2 && "bg-amber-700/20 text-amber-700 font-semibold",
                    index > 2 && "text-muted-foreground"
                  )}>
                    {index + 1}
                  </span>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <span className="text-lg">{standing.team.badge}</span>
                    <span className="font-medium text-sm truncate max-w-[100px] sm:max-w-none">
                      {standing.team.name}
                    </span>
                  </div>
                </TableCell>
                <TableCell className="text-center text-sm text-muted-foreground">{standing.played}</TableCell>
                <TableCell className="text-center text-sm font-medium text-primary">{standing.won}</TableCell>
                <TableCell className="text-center text-sm text-muted-foreground">{standing.drawn}</TableCell>
                <TableCell className="text-center text-sm text-destructive">{standing.lost}</TableCell>
                <TableCell className="text-center text-sm hidden sm:table-cell text-muted-foreground">{standing.goalsFor}</TableCell>
                <TableCell className="text-center text-sm hidden sm:table-cell text-muted-foreground">{standing.goalsAgainst}</TableCell>
                <TableCell className="text-center text-sm font-medium">
                  <span className={cn(
                    standing.goalDifference > 0 && "text-primary",
                    standing.goalDifference < 0 && "text-destructive"
                  )}>
                    {standing.goalDifference > 0 ? '+' : ''}{standing.goalDifference}
                  </span>
                </TableCell>
                <TableCell className="text-center">
                  <span className="font-bold text-accent text-base">{standing.points}</span>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};
