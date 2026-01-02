import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { useZPSLData, AppFixture } from '@/hooks/useZPSLData';

interface FixtureCardProps {
  fixture: AppFixture;
}

export const FixtureCard = ({ fixture }: FixtureCardProps) => {
  const { getTeamById } = useZPSLData();
  const homeTeam = getTeamById(fixture.homeTeamId);
  const awayTeam = getTeamById(fixture.awayTeamId);
  const kickoffDate = new Date(fixture.kickoffTime);

  return (
    <div className={cn(
      "relative overflow-hidden rounded-xl border bg-card shadow-card transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5 group",
      fixture.finished && "opacity-90"
    )}>
      {/* Match Status Indicator */}
      <div className={cn(
        "absolute top-0 left-0 right-0 h-1",
        fixture.finished ? "bg-muted-foreground/30" : "bg-primary"
      )} />

      <div className="p-4 sm:p-5">
        {/* Time/Status */}
        <div className="text-center mb-4">
          {fixture.finished ? (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-muted text-muted-foreground text-xs font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-muted-foreground/50" />
              Full Time
            </span>
          ) : (
            <div className="space-y-0.5">
              <p className="text-sm font-semibold text-foreground">{format(kickoffDate, 'EEE, MMM d')}</p>
              <p className="text-xs text-muted-foreground font-medium">{format(kickoffDate, 'HH:mm')}</p>
            </div>
          )}
        </div>

        {/* Teams */}
        <div className="flex items-center justify-between gap-3">
          {/* Home Team */}
          <div className="flex-1 text-center">
            <div className="w-12 h-12 sm:w-14 sm:h-14 mx-auto rounded-xl bg-muted/50 flex items-center justify-center text-2xl sm:text-3xl mb-2 group-hover:scale-105 transition-transform">
              {homeTeam?.badge}
            </div>
            <p className="font-heading font-bold text-sm">{homeTeam?.shortName}</p>
            <p className="text-[10px] sm:text-xs text-muted-foreground truncate max-w-[80px] mx-auto">{homeTeam?.name}</p>
          </div>

          {/* Score / VS */}
          <div className="flex-shrink-0 px-2">
            {fixture.finished ? (
              <div className="flex items-center gap-2 sm:gap-3">
                <span className={cn(
                  "text-2xl sm:text-3xl font-heading font-black",
                  (fixture.homeScore ?? 0) > (fixture.awayScore ?? 0) && "text-primary"
                )}>
                  {fixture.homeScore}
                </span>
                <span className="text-muted-foreground text-lg">-</span>
                <span className={cn(
                  "text-2xl sm:text-3xl font-heading font-black",
                  (fixture.awayScore ?? 0) > (fixture.homeScore ?? 0) && "text-primary"
                )}>
                  {fixture.awayScore}
                </span>
              </div>
            ) : (
              <div className="px-4 py-2.5 rounded-lg bg-primary/10 border border-primary/20">
                <span className="text-sm font-bold text-primary">VS</span>
              </div>
            )}
          </div>

          {/* Away Team */}
          <div className="flex-1 text-center">
            <div className="w-12 h-12 sm:w-14 sm:h-14 mx-auto rounded-xl bg-muted/50 flex items-center justify-center text-2xl sm:text-3xl mb-2 group-hover:scale-105 transition-transform">
              {awayTeam?.badge}
            </div>
            <p className="font-heading font-bold text-sm">{awayTeam?.shortName}</p>
            <p className="text-[10px] sm:text-xs text-muted-foreground truncate max-w-[80px] mx-auto">{awayTeam?.name}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FixtureCard;