import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

// Types matching database schema
export interface Team {
  id: string;
  name: string;
  short_name: string | null;
  badge_url: string | null;
  external_id: number | null;
}

export interface Player {
  id: string;
  name: string;
  position: string;
  team_id: string | null;
  price: number;
  total_points: number | null;
  goals: number | null;
  assists: number | null;
  clean_sheets: number | null;
  minutes_played: number | null;
  form: number | null;
  selected_by_percent: number | null;
  price_change: number | null;
  transfers_in: number | null;
  transfers_out: number | null;
}

export interface Match {
  id: string;
  gameweek: number | null;
  home_team_id: string | null;
  away_team_id: string | null;
  home_score: number | null;
  away_score: number | null;
  match_date: string | null;
  status: string | null;
}

// Transform DB player to app Player format for compatibility with existing components
export interface AppPlayer {
  id: string;
  firstName: string;
  lastName: string;
  teamId: string;
  position: 'GK' | 'DEF' | 'MID' | 'FWD';
  price: number;
  totalPoints: number;
  form: number;
  goalsScored: number;
  assists: number;
  cleanSheets: number;
  yellowCards: number;
  redCards: number;
  minutesPlayed: number;
  selected: number;
  priceChange: number;
  priceChangeWeek: number;
  transfersIn: number;
  transfersOut: number;
  netTransfers: number;
}

export interface AppTeam {
  id: string;
  name: string;
  shortName: string;
  badge: string;
  primaryColor: string;
}

export interface AppFixture {
  id: string;
  gameweek: number;
  homeTeamId: string;
  awayTeamId: string;
  kickoffTime: string;
  homeScore?: number;
  awayScore?: number;
  finished: boolean;
}

// Team badges mapping
const teamBadges: Record<string, { badge: string; color: string }> = {
  'Dynamos FC': { badge: '🔵', color: '#0066CC' },
  'Highlanders FC': { badge: '⚫', color: '#000000' },
  'CAPS United': { badge: '🟢', color: '#00AA00' },
  'FC Platinum': { badge: '⚪', color: '#C0C0C0' },
  'Chicken Inn': { badge: '🟡', color: '#FFD700' },
  'Ngezi Platinum Stars': { badge: '🟠', color: '#FF6600' },
  'Manica Diamonds': { badge: '💎', color: '#00CCFF' },
  'Bulawayo Chiefs': { badge: '🔴', color: '#CC0000' },
  'ZPC Kariba': { badge: '🔷', color: '#003399' },
  'Herentals FC': { badge: '🟣', color: '#9900CC' },
  'Yadah FC': { badge: '⬛', color: '#333333' },
  'Bikita Minerals': { badge: '🟤', color: '#8B4513' },
  'Hwange FC': { badge: '🔶', color: '#FF8C00' },
  'Telone FC': { badge: '📞', color: '#0088CC' },
  'Simba Bhora': { badge: '🦁', color: '#DAA520' },
  'Greenfuel FC': { badge: '🌿', color: '#228B22' },
};

// Transform DB player to app format
function transformPlayer(player: Player): AppPlayer {
  const nameParts = player.name.split(' ');
  const firstName = nameParts[0] || '';
  const lastName = nameParts.slice(1).join(' ') || '';
  
  return {
    id: player.id,
    firstName,
    lastName,
    teamId: player.team_id || '',
    position: (player.position as 'GK' | 'DEF' | 'MID' | 'FWD') || 'MID',
    price: player.price,
    totalPoints: player.total_points || 0,
    form: player.form || 0,
    goalsScored: player.goals || 0,
    assists: player.assists || 0,
    cleanSheets: player.clean_sheets || 0,
    yellowCards: 0,
    redCards: 0,
    minutesPlayed: player.minutes_played || 0,
    selected: player.selected_by_percent || 0,
    priceChange: player.price_change || 0,
    priceChangeWeek: (player.price_change || 0) * 2,
    transfersIn: player.transfers_in || 0,
    transfersOut: player.transfers_out || 0,
    netTransfers: (player.transfers_in || 0) - (player.transfers_out || 0),
  };
}

// Transform DB team to app format
function transformTeam(team: Team): AppTeam {
  const badges = teamBadges[team.name] || { badge: '⚽', color: '#006B3F' };
  
  return {
    id: team.id,
    name: team.name,
    shortName: team.short_name || team.name.substring(0, 3).toUpperCase(),
    badge: badges.badge,
    primaryColor: badges.color,
  };
}

// Transform DB match to app fixture format
function transformMatch(match: Match): AppFixture {
  return {
    id: match.id,
    gameweek: match.gameweek || 1,
    homeTeamId: match.home_team_id || '',
    awayTeamId: match.away_team_id || '',
    kickoffTime: match.match_date || new Date().toISOString(),
    homeScore: match.home_score ?? undefined,
    awayScore: match.away_score ?? undefined,
    finished: match.status === 'FINISHED',
  };
}

export function useZPSLData() {
  // Fetch teams
  const { data: teamsData, isLoading: teamsLoading } = useQuery({
    queryKey: ['zpsl-teams'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('teams')
        .select('*')
        .order('name');
      
      if (error) throw error;
      return data as Team[];
    },
  });

  // Fetch players
  const { data: playersData, isLoading: playersLoading } = useQuery({
    queryKey: ['zpsl-players'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('players')
        .select('*')
        .order('total_points', { ascending: false });
      
      if (error) throw error;
      return data as Player[];
    },
  });

  // Fetch matches
  const { data: matchesData, isLoading: matchesLoading } = useQuery({
    queryKey: ['zpsl-matches'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('matches')
        .select('*')
        .order('match_date', { ascending: true });
      
      if (error) throw error;
      return data as Match[];
    },
  });

  // Transform data
  const teams: AppTeam[] = (teamsData || []).map(transformTeam);
  const players: AppPlayer[] = (playersData || []).map(transformPlayer);
  const fixtures: AppFixture[] = (matchesData || []).map(transformMatch);

  // Helper functions
  const getTeamById = (id: string): AppTeam | undefined => teams.find(t => t.id === id);
  const getPlayerById = (id: string): AppPlayer | undefined => players.find(p => p.id === id);
  const getPlayersByTeam = (teamId: string): AppPlayer[] => players.filter(p => p.teamId === teamId);
  const getPlayersByPosition = (position: AppPlayer['position']): AppPlayer[] => players.filter(p => p.position === position);
  const getFixturesByGameweek = (gameweekId: number): AppFixture[] => fixtures.filter(f => f.gameweek === gameweekId);

  return {
    teams,
    players,
    fixtures,
    isLoading: teamsLoading || playersLoading || matchesLoading,
    getTeamById,
    getPlayerById,
    getPlayersByTeam,
    getPlayersByPosition,
    getFixturesByGameweek,
  };
}

export default useZPSLData;