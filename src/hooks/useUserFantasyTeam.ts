import { useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

interface UserFantasyTeamEntry {
  id: string;
  user_id: string;
  player_id: string;
  is_captain: boolean;
  is_vice_captain: boolean;
  is_benched: boolean;
}

export const useUserFantasyTeam = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const { data: fantasyTeam = [], isLoading } = useQuery({
    queryKey: ['user-fantasy-team', user?.id],
    queryFn: async () => {
      if (!user?.id) return [];
      
      const { data, error } = await supabase
        .from('user_fantasy_teams')
        .select('*')
        .eq('user_id', user.id);
      
      if (error) throw error;
      return data as UserFantasyTeamEntry[];
    },
    enabled: !!user?.id
  });

  const { data: profile } = useQuery({
    queryKey: ['profile', user?.id],
    queryFn: async () => {
      if (!user?.id) return null;
      
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('user_id', user.id)
        .maybeSingle();
      
      if (error) throw error;
      return data;
    },
    enabled: !!user?.id
  });

  // Subscribe to realtime updates
  useEffect(() => {
    if (!user?.id) return;

    const channel = supabase
      .channel('user-fantasy-team-realtime')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'user_fantasy_teams',
          filter: `user_id=eq.${user.id}`
        },
        () => {
          queryClient.invalidateQueries({ queryKey: ['user-fantasy-team', user.id] });
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [user?.id, queryClient]);

  const addPlayerMutation = useMutation({
    mutationFn: async (playerId: string) => {
      if (!user?.id) throw new Error('Not authenticated');
      
      const { error } = await supabase
        .from('user_fantasy_teams')
        .insert({
          user_id: user.id,
          player_id: playerId
        });
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user-fantasy-team', user?.id] });
      toast({ title: 'Player added to your team!' });
    },
    onError: (error: Error) => {
      toast({ 
        title: 'Failed to add player', 
        description: error.message,
        variant: 'destructive'
      });
    }
  });

  const removePlayerMutation = useMutation({
    mutationFn: async (playerId: string) => {
      if (!user?.id) throw new Error('Not authenticated');
      
      const { error } = await supabase
        .from('user_fantasy_teams')
        .delete()
        .eq('user_id', user.id)
        .eq('player_id', playerId);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user-fantasy-team', user?.id] });
      toast({ title: 'Player removed from your team' });
    },
    onError: (error: Error) => {
      toast({ 
        title: 'Failed to remove player', 
        description: error.message,
        variant: 'destructive'
      });
    }
  });

  const setCaptainMutation = useMutation({
    mutationFn: async (playerId: string) => {
      if (!user?.id) throw new Error('Not authenticated');
      
      // First, remove captain from all
      await supabase
        .from('user_fantasy_teams')
        .update({ is_captain: false })
        .eq('user_id', user.id);
      
      // Set new captain
      const { error } = await supabase
        .from('user_fantasy_teams')
        .update({ is_captain: true })
        .eq('user_id', user.id)
        .eq('player_id', playerId);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user-fantasy-team', user?.id] });
      toast({ title: 'Captain updated!' });
    }
  });

  const setViceCaptainMutation = useMutation({
    mutationFn: async (playerId: string) => {
      if (!user?.id) throw new Error('Not authenticated');
      
      // First, remove vice captain from all
      await supabase
        .from('user_fantasy_teams')
        .update({ is_vice_captain: false })
        .eq('user_id', user.id);
      
      // Set new vice captain
      const { error } = await supabase
        .from('user_fantasy_teams')
        .update({ is_vice_captain: true })
        .eq('user_id', user.id)
        .eq('player_id', playerId);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user-fantasy-team', user?.id] });
      toast({ title: 'Vice captain updated!' });
    }
  });

  return {
    fantasyTeam,
    profile,
    isLoading,
    addPlayer: addPlayerMutation.mutate,
    removePlayer: removePlayerMutation.mutate,
    setCaptain: setCaptainMutation.mutate,
    setViceCaptain: setViceCaptainMutation.mutate,
    isAddingPlayer: addPlayerMutation.isPending,
    isRemovingPlayer: removePlayerMutation.isPending
  };
};
