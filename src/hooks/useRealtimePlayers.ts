import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useQuery, useQueryClient } from '@tanstack/react-query';

interface Player {
  id: string;
  external_id: number | null;
  name: string;
  position: string;
  team_id: string | null;
  price: number;
  total_points: number;
  goals: number;
  assists: number;
  clean_sheets: number;
  minutes_played: number;
  price_change: number;
  transfers_in: number;
  transfers_out: number;
  form: number;
  selected_by_percent: number;
}

interface Team {
  id: string;
  external_id: number | null;
  name: string;
  short_name: string | null;
  badge_url: string | null;
}

export const useRealtimePlayers = () => {
  const queryClient = useQueryClient();
  const [isRealtime, setIsRealtime] = useState(false);

  const { data: players = [], isLoading: playersLoading } = useQuery({
    queryKey: ['players'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('players')
        .select('*')
        .order('total_points', { ascending: false });
      
      if (error) throw error;
      return data as Player[];
    }
  });

  const { data: teams = [], isLoading: teamsLoading } = useQuery({
    queryKey: ['teams'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('teams')
        .select('*');
      
      if (error) throw error;
      return data as Team[];
    }
  });

  useEffect(() => {
    const channel = supabase
      .channel('players-realtime')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'players'
        },
        () => {
          queryClient.invalidateQueries({ queryKey: ['players'] });
        }
      )
      .subscribe((status) => {
        setIsRealtime(status === 'SUBSCRIBED');
      });

    return () => {
      supabase.removeChannel(channel);
    };
  }, [queryClient]);

  const getTeamById = (teamId: string | null) => {
    if (!teamId) return null;
    return teams.find(t => t.id === teamId) || null;
  };

  return {
    players,
    teams,
    isLoading: playersLoading || teamsLoading,
    isRealtime,
    getTeamById
  };
};
