import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

interface Team {
  name: string;
  shortName: string;
  crest: string;
}

interface Score {
  fullTime: { home: number | null; away: number | null };
  halfTime: { home: number | null; away: number | null };
}

interface Match {
  id: number;
  homeTeam: Team;
  awayTeam: Team;
  score: Score;
  status: string;
  utcDate: string;
  matchday: number;
}

interface Scorer {
  player: { name: string };
  team: { name: string };
  goals: number;
  assists: number;
}

interface StandingEntry {
  position: number;
  team: { name: string; shortName: string };
  points: number;
  playedGames: number;
}

interface FootballDataResponse {
  success: boolean;
  data: {
    matches?: Match[];
    scorers?: Scorer[];
    standings?: { table: StandingEntry[] }[];
    competition?: { name: string; code: string };
  };
  source: 'api' | 'mock';
}

export const useLiveMatches = () => {
  return useQuery<Match[]>({
    queryKey: ['live-matches'],
    queryFn: async () => {
      const { data, error } = await supabase.functions.invoke<FootballDataResponse>('football-data', {
        body: {},
      });
      
      if (error) {
        console.error('Error fetching matches:', error);
        throw error;
      }
      
      return data?.data?.matches || [];
    },
    refetchInterval: 60000, // Refetch every minute for live updates
    staleTime: 30000
  });
};

export const useTopScorers = () => {
  return useQuery<Scorer[]>({
    queryKey: ['top-scorers'],
    queryFn: async () => {
      const response = await supabase.functions.invoke<FootballDataResponse>('football-data', {
        body: { action: 'scorers' }
      });
      
      if (response.error) throw response.error;
      return response.data?.data?.scorers || [];
    },
    staleTime: 300000 // 5 minutes
  });
};

export const useStandings = () => {
  return useQuery<StandingEntry[]>({
    queryKey: ['standings'],
    queryFn: async () => {
      const response = await supabase.functions.invoke<FootballDataResponse>('football-data', {
        body: { action: 'standings' }
      });
      
      if (response.error) throw response.error;
      return response.data?.data?.standings?.[0]?.table || [];
    },
    staleTime: 300000 // 5 minutes
  });
};
