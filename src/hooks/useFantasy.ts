import { useState, useCallback, useMemo } from 'react';
import { useZPSLData, AppPlayer, AppTeam, AppFixture } from '@/hooks/useZPSLData';
import { useAuth } from '@/contexts/AuthContext';

const SQUAD_SIZE = 15;
const BUDGET_LIMIT = 100;
const MAX_PLAYERS_PER_TEAM = 3;

interface SquadConstraints {
  GK: { min: number; max: number };
  DEF: { min: number; max: number };
  MID: { min: number; max: number };
  FWD: { min: number; max: number };
}

const SQUAD_CONSTRAINTS: SquadConstraints = {
  GK: { min: 2, max: 2 },
  DEF: { min: 5, max: 5 },
  MID: { min: 5, max: 5 },
  FWD: { min: 3, max: 3 },
};

export interface UserTeam {
  id: string;
  name: string;
  players: string[];
  captainId: string;
  viceCaptainId: string;
  budget: number;
  totalPoints: number;
  gameweekPoints: number;
  overallRank: number;
  transfers: number;
  freeTransfers: number;
}

export interface Gameweek {
  id: number;
  name: string;
  deadline: string;
  isCurrent: boolean;
  isNext: boolean;
  finished: boolean;
}

// Generate gameweeks
const generateGameweeks = (): Gameweek[] => {
  const now = new Date();
  const currentGW = 18;
  
  return [
    { id: currentGW - 1, name: `Gameweek ${currentGW - 1}`, deadline: new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000).toISOString(), isCurrent: false, isNext: false, finished: true },
    { id: currentGW, name: `Gameweek ${currentGW}`, deadline: new Date(now.getTime() + 3 * 24 * 60 * 60 * 1000).toISOString(), isCurrent: true, isNext: false, finished: false },
    { id: currentGW + 1, name: `Gameweek ${currentGW + 1}`, deadline: new Date(now.getTime() + 10 * 24 * 60 * 60 * 1000).toISOString(), isCurrent: false, isNext: true, finished: false },
  ];
};

export const useFantasy = () => {
  const { user } = useAuth();
  const { teams, players, fixtures, isLoading: dataLoading, getTeamById, getPlayerById } = useZPSLData();
  
  const [userTeam, setUserTeam] = useState<UserTeam>({
    id: 'user-1',
    name: 'Zimbabwe Warriors XI',
    players: [],
    captainId: '',
    viceCaptainId: '',
    budget: 100,
    totalPoints: 0,
    gameweekPoints: 0,
    overallRank: 0,
    transfers: 0,
    freeTransfers: 2,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const gameweeks = useMemo(() => generateGameweeks(), []);

  const selectedPlayers = useMemo(() => {
    return userTeam.players
      .map(id => getPlayerById(id))
      .filter(Boolean) as AppPlayer[];
  }, [userTeam.players, getPlayerById]);

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

  const canAddPlayer = useCallback((player: AppPlayer): { allowed: boolean; reason?: string } => {
    if (userTeam.players.includes(player.id)) {
      return { allowed: false, reason: 'Player already in squad' };
    }

    if (userTeam.players.length >= SQUAD_SIZE) {
      return { allowed: false, reason: 'Squad is full' };
    }

    if (player.price > remainingBudget) {
      return { allowed: false, reason: 'Insufficient budget' };
    }

    const currentPositionCount = positionCounts[player.position] || 0;
    const constraint = SQUAD_CONSTRAINTS[player.position as keyof SquadConstraints];
    if (constraint && currentPositionCount >= constraint.max) {
      return { allowed: false, reason: `Maximum ${player.position} players reached` };
    }

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
  }, [canAddPlayer, getPlayerById]);

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

  const currentGameweek = gameweeks.find(g => g.isCurrent);
  const currentFixtures = currentGameweek 
    ? fixtures.filter(f => f.gameweek === currentGameweek.id)
    : fixtures.slice(0, 6);

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
    isLoading: isLoading || dataLoading,
    error,
    setError,
    
    // Helpers
    getPlayerById,
    getTeamById,
  };
};

export default useFantasy;