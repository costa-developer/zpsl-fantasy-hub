import { format } from 'date-fns';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { useLiveMatches } from '@/hooks/useLiveMatches';
import { cn } from '@/lib/utils';

const statusColors: Record<string, string> = {
  'SCHEDULED': 'bg-muted text-muted-foreground',
  'LIVE': 'bg-green-500/20 text-green-500 animate-pulse',
  'IN_PLAY': 'bg-green-500/20 text-green-500 animate-pulse',
  'PAUSED': 'bg-yellow-500/20 text-yellow-500',
  'FINISHED': 'bg-primary/20 text-primary',
  'POSTPONED': 'bg-destructive/20 text-destructive',
};

const statusLabels: Record<string, string> = {
  'SCHEDULED': 'Upcoming',
  'LIVE': 'LIVE',
  'IN_PLAY': 'LIVE',
  'PAUSED': 'Half Time',
  'FINISHED': 'Full Time',
  'POSTPONED': 'Postponed',
};

export const LiveMatchesWidget = () => {
  const { data: matches, isLoading, error } = useLiveMatches();

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            Live Matches
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {[1, 2, 3].map((i) => (
            <Skeleton key={i} className="h-16 w-full rounded-lg" />
          ))}
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Live Matches</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground text-sm">Unable to load matches</p>
        </CardContent>
      </Card>
    );
  }

  const sortedMatches = [...(matches || [])].sort((a, b) => {
    const statusOrder = ['IN_PLAY', 'LIVE', 'PAUSED', 'SCHEDULED', 'FINISHED', 'POSTPONED'];
    return statusOrder.indexOf(a.status) - statusOrder.indexOf(b.status);
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
          Live Matches
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {sortedMatches.length === 0 ? (
          <p className="text-muted-foreground text-sm text-center py-4">No matches scheduled</p>
        ) : (
          sortedMatches.slice(0, 5).map((match) => (
            <div
              key={match.id}
              className="p-3 rounded-lg bg-muted/50 border border-border/50 hover:border-border transition-colors"
            >
              <div className="flex items-center justify-between mb-2">
                <Badge variant="secondary" className={cn('text-xs', statusColors[match.status])}>
                  {statusLabels[match.status] || match.status}
                </Badge>
                <span className="text-xs text-muted-foreground">
                  {format(new Date(match.utcDate), 'MMM d, HH:mm')}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex-1 text-right">
                  <span className="text-sm font-medium">{match.homeTeam.shortName || match.homeTeam.name}</span>
                </div>
                <div className="px-4 text-center min-w-[60px]">
                  {match.status === 'SCHEDULED' ? (
                    <span className="text-sm text-muted-foreground">vs</span>
                  ) : (
                    <span className="text-lg font-bold">
                      {match.score.fullTime.home ?? 0} - {match.score.fullTime.away ?? 0}
                    </span>
                  )}
                </div>
                <div className="flex-1 text-left">
                  <span className="text-sm font-medium">{match.awayTeam.shortName || match.awayTeam.name}</span>
                </div>
              </div>
            </div>
          ))
        )}
      </CardContent>
    </Card>
  );
};
