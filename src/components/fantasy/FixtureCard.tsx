import { Fixture, getTeamById } from '@/data/mockData';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';

interface FixtureCardProps {
  fixture: Fixture;
}

export const FixtureCard = ({ fixture }: FixtureCardProps) => {
  const homeTeam = getTeamById(fixture.homeTeamId);
  const awayTeam = getTeamById(fixture.awayTeamId);
  const kickoffDate = new Date(fixture.kickoffTime);

  return (
    <div className={cn(
      "relative overflow-hidden rounded-xl border bg-card shadow-card transition-all duration-300 hover:shadow-card-hover",
      fixture.finished && "opacity-80"
    )}>
      {/* Match Status */}
      <div className={cn(
        "absolute top-0 left-0 right-0 h-1",
        fixture.finished ? "bg-muted" : "bg-primary"
      )} />

      <div className="p-4">
        {/* Time/Status */}
        <div className="text-center mb-4">
          {fixture.finished ? (
            <span className="px-3 py-1 rounded-full bg-muted text-muted-foreground text-xs font-medium">
              Full Time
            </span>
          ) : (
            <div className="space-y-1">
              <p className="text-sm font-semibold">{format(kickoffDate, 'EEE, MMM d')}</p>
              <p className="text-xs text-muted-foreground">{format(kickoffDate, 'HH:mm')}</p>
            </div>
          )}
        </div>

        {/* Teams */}
        <div className="flex items-center justify-between gap-4">
          {/* Home Team */}
          <div className="flex-1 text-center">
            <div className="w-12 h-12 mx-auto rounded-lg bg-muted flex items-center justify-center text-2xl mb-2">
              {homeTeam?.badge}
            </div>
            <p className="font-heading font-bold text-sm">{homeTeam?.shortName}</p>
            <p className="text-xs text-muted-foreground truncate">{homeTeam?.name}</p>
          </div>

          {/* Score / VS */}
          <div className="flex-shrink-0">
            {fixture.finished ? (
              <div className="flex items-center gap-2">
                <span className={cn(
                  "text-2xl font-heading font-black",
                  (fixture.homeScore ?? 0) > (fixture.awayScore ?? 0) && "text-primary"
                )}>
                  {fixture.homeScore}
                </span>
                <span className="text-muted-foreground">-</span>
                <span className={cn(
                  "text-2xl font-heading font-black",
                  (fixture.awayScore ?? 0) > (fixture.homeScore ?? 0) && "text-primary"
                )}>
                  {fixture.awayScore}
                </span>
              </div>
            ) : (
              <div className="px-4 py-2 rounded-lg bg-muted">
                <span className="text-sm font-bold text-muted-foreground">VS</span>
              </div>
            )}
          </div>

          {/* Away Team */}
          <div className="flex-1 text-center">
            <div className="w-12 h-12 mx-auto rounded-lg bg-muted flex items-center justify-center text-2xl mb-2">
              {awayTeam?.badge}
            </div>
            <p className="font-heading font-bold text-sm">{awayTeam?.shortName}</p>
            <p className="text-xs text-muted-foreground truncate">{awayTeam?.name}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FixtureCard;
