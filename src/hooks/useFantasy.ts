import { useState, useCallback, useMemo } from 'react';
import { 
  players, 
  teams, 
  fixtures, 
  gameweeks, 
  userTeam as initialUserTeam,
  Player,
  UserTeam,
  getPlayerById,
  getTeamById,
  getCurrentGameweek,
  getFixturesByGameweek
} from '@/data/mockData';

const SQUAD_SIZE = 15;
const STARTING_XI = 11;
const BUDGET_LIMIT = 100;
const MAX_PLAYERS_PER_TEAM = 3;

interface SquadConstraints {
  GK: { min: 2, max: 2 };
  DEF: { min: 5, max: 5 };
  MID: { min: 5, max: 5 };
  FWD: { min: 3, max: 3 };
}

const SQUAD_CONSTRAINTS: SquadConstraints = {
  GK: { min: 2, max: 2 },
  DEF: { min: 5, max: 5 },
  MID: { min: 5, max: 5 },
  FWD: { min: 3, max: 3 },
};

export const useFantasy = () => {
  const [userTeam, setUserTeam] = useState<UserTeam>(initialUserTeam);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const selectedPlayers = useMemo(() => {
    return userTeam.players.map(id => getPlayerById(id)).filter(Boolean) as Player[];
  }, [userTeam.players]);

  const remainingBudget = useMemo(() => {
    const spent = selectedPlayers.reduce((sum, p) => sum + p.price, 0);
    return BUDGET_LIMIT - spent;
  }, [selectedPlayers]);

  const positionCounts = useMemo(() => {
    return selectedPlayers.reduce((counts, player) => {
      counts[player.position] = (counts[player.position] || 0) + 1;
      return counts;
    }, {} as Record<string, number>);
  }, [selectedPlayers]);

  const teamCounts = useMemo(() => {
    return selectedPlayers.reduce((counts, player) => {
      counts[player.teamId] = (counts[player.teamId] || 0) + 1;
      return counts;
    }, {} as Record<string, number>);
  }, [selectedPlayers]);

  const canAddPlayer = useCallback((player: Player): { allowed: boolean; reason?: string } => {
    // Check if already selected
    if (userTeam.players.includes(player.id)) {
      return { allowed: false, reason: 'Player already in squad' };
    }

    // Check squad size
    if (userTeam.players.length >= SQUAD_SIZE) {
      return { allowed: false, reason: 'Squad is full' };
    }

    // Check budget
    if (player.price > remainingBudget) {
      return { allowed: false, reason: 'Insufficient budget' };
    }

    // Check position limit
    const currentPositionCount = positionCounts[player.position] || 0;
    if (currentPositionCount >= SQUAD_CONSTRAINTS[player.position].max) {
      return { allowed: false, reason: `Maximum ${player.position} players reached` };
    }

    // Check team limit
    const currentTeamCount = teamCounts[player.teamId] || 0;
    if (currentTeamCount >= MAX_PLAYERS_PER_TEAM) {
      return { allowed: false, reason: 'Maximum 3 players from same team' };
    }

    return { allowed: true };
  }, [userTeam.players, remainingBudget, positionCounts, teamCounts]);

  const addPlayer = useCallback((playerId: string) => {
    const player = getPlayerById(playerId);
    if (!player) return;

    const { allowed, reason } = canAddPlayer(player);
    if (!allowed) {
      setError(reason || 'Cannot add player');
      return;
    }

    setUserTeam(prev => ({
      ...prev,
      players: [...prev.players, playerId],
    }));
    setError(null);
  }, [canAddPlayer]);

  const removePlayer = useCallback((playerId: string) => {
    setUserTeam(prev => ({
      ...prev,
      players: prev.players.filter(id => id !== playerId),
      captainId: prev.captainId === playerId ? '' : prev.captainId,
      viceCaptainId: prev.viceCaptainId === playerId ? '' : prev.viceCaptainId,
    }));
  }, []);

  const setCaptain = useCallback((playerId: string) => {
    if (!userTeam.players.includes(playerId)) return;
    
    setUserTeam(prev => ({
      ...prev,
      captainId: playerId,
      viceCaptainId: prev.viceCaptainId === playerId ? prev.captainId : prev.viceCaptainId,
    }));
  }, [userTeam.players]);

  const setViceCaptain = useCallback((playerId: string) => {
    if (!userTeam.players.includes(playerId)) return;
    
    setUserTeam(prev => ({
      ...prev,
      viceCaptainId: playerId,
      captainId: prev.captainId === playerId ? prev.viceCaptainId : prev.captainId,
    }));
  }, [userTeam.players]);

  const currentGameweek = getCurrentGameweek();
  const currentFixtures = currentGameweek ? getFixturesByGameweek(currentGameweek.id) : [];

  return {
    // Data
    players,
    teams,
    fixtures,
    gameweeks,
    userTeam,
    selectedPlayers,
    currentGameweek,
    currentFixtures,
    
    // Computed
    remainingBudget,
    positionCounts,
    teamCounts,
    
    // Actions
    addPlayer,
    removePlayer,
    setCaptain,
    setViceCaptain,
    canAddPlayer,
    
    // State
    isLoading,
    error,
    setError,
    
    // Helpers
    getPlayerById,
    getTeamById,
  };
};

export default useFantasy;
