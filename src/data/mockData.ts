// Zimbabwe Premier Soccer League Mock Data

export interface Team {
  id: string;
  name: string;
  shortName: string;
  badge: string;
  primaryColor: string;
}

export interface Player {
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
  selected: number; // percentage
  photo?: string;
  // Transfer trend data
  priceChange: number; // price change this GW
  priceChangeWeek: number; // price change this week
  transfersIn: number;
  transfersOut: number;
  netTransfers: number;
}

export interface Fixture {
  id: string;
  gameweek: number;
  homeTeamId: string;
  awayTeamId: string;
  kickoffTime: string;
  homeScore?: number;
  awayScore?: number;
  finished: boolean;
}

export interface Gameweek {
  id: number;
  name: string;
  deadline: string;
  isCurrent: boolean;
  isNext: boolean;
  finished: boolean;
}

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

// ZPSL Teams
export const teams: Team[] = [
  { id: '1', name: 'Dynamos FC', shortName: 'DYN', badge: '🔵', primaryColor: '#0066CC' },
  { id: '2', name: 'Highlanders FC', shortName: 'HIG', badge: '⚫', primaryColor: '#000000' },
  { id: '3', name: 'CAPS United', shortName: 'CAP', badge: '🟢', primaryColor: '#00AA00' },
  { id: '4', name: 'FC Platinum', shortName: 'PLA', badge: '⚪', primaryColor: '#C0C0C0' },
  { id: '5', name: 'Chicken Inn', shortName: 'CHI', badge: '🟡', primaryColor: '#FFD700' },
  { id: '6', name: 'Ngezi Platinum Stars', shortName: 'NGE', badge: '🟠', primaryColor: '#FF6600' },
  { id: '7', name: 'Manica Diamonds', shortName: 'MAN', badge: '💎', primaryColor: '#00CCFF' },
  { id: '8', name: 'Bulawayo Chiefs', shortName: 'BUL', badge: '🔴', primaryColor: '#CC0000' },
  { id: '9', name: 'ZPC Kariba', shortName: 'ZPC', badge: '🔷', primaryColor: '#003399' },
  { id: '10', name: 'Herentals', shortName: 'HER', badge: '🟣', primaryColor: '#9900CC' },
  { id: '11', name: 'Cranborne Bullets', shortName: 'CRA', badge: '🟤', primaryColor: '#8B4513' },
  { id: '12', name: 'Yadah FC', shortName: 'YAD', badge: '⬛', primaryColor: '#333333' },
];

// Sample Players with transfer trend data
export const players: Player[] = [
  // Dynamos FC
  { id: '1', firstName: 'Taimon', lastName: 'Mvula', teamId: '1', position: 'GK', price: 5.0, totalPoints: 89, form: 6.2, goalsScored: 0, assists: 1, cleanSheets: 8, yellowCards: 1, redCards: 0, minutesPlayed: 1620, selected: 23.4, priceChange: 0, priceChangeWeek: 0.1, transfersIn: 12400, transfersOut: 8200, netTransfers: 4200 },
  { id: '2', firstName: 'Emmanuel', lastName: 'Jalai', teamId: '1', position: 'DEF', price: 5.5, totalPoints: 102, form: 7.1, goalsScored: 3, assists: 4, cleanSheets: 8, yellowCards: 3, redCards: 0, minutesPlayed: 1530, selected: 31.2, priceChange: 0.1, priceChangeWeek: 0.2, transfersIn: 28900, transfersOut: 12300, netTransfers: 16600 },
  { id: '3', firstName: 'Bill', lastName: 'Antonio', teamId: '1', position: 'MID', price: 8.5, totalPoints: 156, form: 8.9, goalsScored: 12, assists: 8, cleanSheets: 0, yellowCards: 2, redCards: 0, minutesPlayed: 1620, selected: 67.8, priceChange: 0.2, priceChangeWeek: 0.4, transfersIn: 89400, transfersOut: 15600, netTransfers: 73800 },
  { id: '4', firstName: 'Evans', lastName: 'Katema', teamId: '1', position: 'FWD', price: 7.5, totalPoints: 134, form: 7.8, goalsScored: 14, assists: 3, cleanSheets: 0, yellowCards: 4, redCards: 0, minutesPlayed: 1440, selected: 45.2, priceChange: 0.1, priceChangeWeek: 0.2, transfersIn: 34500, transfersOut: 21200, netTransfers: 13300 },
  
  // Highlanders FC
  { id: '5', firstName: 'Ariel', lastName: 'Sibanda', teamId: '2', position: 'GK', price: 5.5, totalPoints: 95, form: 6.8, goalsScored: 0, assists: 0, cleanSheets: 9, yellowCards: 0, redCards: 0, minutesPlayed: 1620, selected: 28.9, priceChange: 0.1, priceChangeWeek: 0.1, transfersIn: 18700, transfersOut: 9800, netTransfers: 8900 },
  { id: '6', firstName: 'Andrew', lastName: 'Mbeba', teamId: '2', position: 'DEF', price: 4.5, totalPoints: 78, form: 5.4, goalsScored: 1, assists: 2, cleanSheets: 9, yellowCards: 5, redCards: 0, minutesPlayed: 1350, selected: 18.3, priceChange: -0.1, priceChangeWeek: -0.2, transfersIn: 5600, transfersOut: 18900, netTransfers: -13300 },
  { id: '7', firstName: 'Divine', lastName: 'Mhindirira', teamId: '2', position: 'MID', price: 6.5, totalPoints: 112, form: 6.9, goalsScored: 5, assists: 9, cleanSheets: 0, yellowCards: 2, redCards: 0, minutesPlayed: 1530, selected: 34.7, priceChange: 0, priceChangeWeek: 0.1, transfersIn: 22100, transfersOut: 19800, netTransfers: 2300 },
  { id: '8', firstName: 'Lynoth', lastName: 'Chikuhwa', teamId: '2', position: 'FWD', price: 8.0, totalPoints: 145, form: 8.2, goalsScored: 16, assists: 4, cleanSheets: 0, yellowCards: 3, redCards: 0, minutesPlayed: 1620, selected: 52.1, priceChange: 0.1, priceChangeWeek: 0.3, transfersIn: 56200, transfersOut: 23400, netTransfers: 32800 },
  
  // CAPS United
  { id: '9', firstName: 'Chris', lastName: 'Mverechena', teamId: '3', position: 'GK', price: 4.5, totalPoints: 72, form: 5.1, goalsScored: 0, assists: 0, cleanSheets: 6, yellowCards: 1, redCards: 0, minutesPlayed: 1440, selected: 12.4, priceChange: -0.1, priceChangeWeek: -0.1, transfersIn: 4300, transfersOut: 12100, netTransfers: -7800 },
  { id: '10', firstName: 'Valentine', lastName: 'Musarurwa', teamId: '3', position: 'DEF', price: 5.0, totalPoints: 88, form: 6.3, goalsScored: 2, assists: 3, cleanSheets: 6, yellowCards: 4, redCards: 1, minutesPlayed: 1350, selected: 22.8, priceChange: 0, priceChangeWeek: 0, transfersIn: 11200, transfersOut: 10900, netTransfers: 300 },
  { id: '11', firstName: 'Phineas', lastName: 'Bhamusi', teamId: '3', position: 'MID', price: 7.0, totalPoints: 128, form: 7.5, goalsScored: 8, assists: 11, cleanSheets: 0, yellowCards: 1, redCards: 0, minutesPlayed: 1620, selected: 41.3, priceChange: 0.1, priceChangeWeek: 0.2, transfersIn: 38900, transfersOut: 18700, netTransfers: 20200 },
  { id: '12', firstName: 'William', lastName: 'Manondo', teamId: '3', position: 'FWD', price: 9.0, totalPoints: 168, form: 9.2, goalsScored: 18, assists: 6, cleanSheets: 0, yellowCards: 2, redCards: 0, minutesPlayed: 1530, selected: 71.5, priceChange: 0.3, priceChangeWeek: 0.5, transfersIn: 124500, transfersOut: 18900, netTransfers: 105600 },
  
  // FC Platinum
  { id: '13', firstName: 'Wallace', lastName: 'Magalane', teamId: '4', position: 'GK', price: 5.0, totalPoints: 82, form: 5.8, goalsScored: 0, assists: 0, cleanSheets: 7, yellowCards: 2, redCards: 0, minutesPlayed: 1530, selected: 19.7, priceChange: 0, priceChangeWeek: 0, transfersIn: 9800, transfersOut: 8700, netTransfers: 1100 },
  { id: '14', firstName: 'Gift', lastName: 'Bello', teamId: '4', position: 'DEF', price: 5.5, totalPoints: 96, form: 6.7, goalsScored: 2, assists: 5, cleanSheets: 7, yellowCards: 3, redCards: 0, minutesPlayed: 1440, selected: 27.4, priceChange: 0.1, priceChangeWeek: 0.1, transfersIn: 21300, transfersOut: 14500, netTransfers: 6800 },
  { id: '15', firstName: 'Juan', lastName: 'Mutudza', teamId: '4', position: 'MID', price: 7.5, totalPoints: 138, form: 8.0, goalsScored: 9, assists: 12, cleanSheets: 0, yellowCards: 2, redCards: 0, minutesPlayed: 1620, selected: 48.9, priceChange: 0.1, priceChangeWeek: 0.3, transfersIn: 52100, transfersOut: 19800, netTransfers: 32300 },
  { id: '16', firstName: 'Panashe', lastName: 'Mutimbanyoka', teamId: '4', position: 'FWD', price: 6.5, totalPoints: 108, form: 6.4, goalsScored: 10, assists: 3, cleanSheets: 0, yellowCards: 5, redCards: 1, minutesPlayed: 1260, selected: 29.3, priceChange: -0.1, priceChangeWeek: -0.2, transfersIn: 8900, transfersOut: 28700, netTransfers: -19800 },
  
  // More players for variety
  { id: '17', firstName: 'Clive', lastName: 'Augusto', teamId: '5', position: 'GK', price: 4.5, totalPoints: 68, form: 4.8, goalsScored: 0, assists: 0, cleanSheets: 5, yellowCards: 1, redCards: 0, minutesPlayed: 1350, selected: 8.9, priceChange: -0.1, priceChangeWeek: -0.1, transfersIn: 3200, transfersOut: 9800, netTransfers: -6600 },
  { id: '18', firstName: 'Xolani', lastName: 'Ndlovu', teamId: '5', position: 'DEF', price: 4.0, totalPoints: 62, form: 4.3, goalsScored: 0, assists: 1, cleanSheets: 5, yellowCards: 6, redCards: 0, minutesPlayed: 1260, selected: 5.2, priceChange: -0.1, priceChangeWeek: -0.2, transfersIn: 1800, transfersOut: 12400, netTransfers: -10600 },
  { id: '19', firstName: 'Malvin', lastName: 'Gaki', teamId: '5', position: 'MID', price: 6.0, totalPoints: 98, form: 6.0, goalsScored: 4, assists: 7, cleanSheets: 0, yellowCards: 3, redCards: 0, minutesPlayed: 1440, selected: 25.6, priceChange: 0, priceChangeWeek: 0.1, transfersIn: 18700, transfersOut: 15400, netTransfers: 3300 },
  { id: '20', firstName: 'Brian', lastName: 'Muza', teamId: '5', position: 'FWD', price: 7.0, totalPoints: 122, form: 7.2, goalsScored: 12, assists: 4, cleanSheets: 0, yellowCards: 2, redCards: 0, minutesPlayed: 1530, selected: 38.4, priceChange: 0.1, priceChangeWeek: 0.2, transfersIn: 34200, transfersOut: 21100, netTransfers: 13100 },
  
  { id: '21', firstName: 'Nelson', lastName: 'Chadya', teamId: '6', position: 'GK', price: 4.5, totalPoints: 75, form: 5.3, goalsScored: 0, assists: 0, cleanSheets: 6, yellowCards: 0, redCards: 0, minutesPlayed: 1440, selected: 14.2, priceChange: 0, priceChangeWeek: 0, transfersIn: 8900, transfersOut: 7600, netTransfers: 1300 },
  { id: '22', firstName: 'Godknows', lastName: 'Murwira', teamId: '6', position: 'DEF', price: 4.5, totalPoints: 71, form: 5.0, goalsScored: 1, assists: 2, cleanSheets: 6, yellowCards: 4, redCards: 0, minutesPlayed: 1350, selected: 11.8, priceChange: 0, priceChangeWeek: -0.1, transfersIn: 6700, transfersOut: 9100, netTransfers: -2400 },
  { id: '23', firstName: 'Walter', lastName: 'Musona', teamId: '6', position: 'MID', price: 8.0, totalPoints: 148, form: 8.4, goalsScored: 11, assists: 10, cleanSheets: 0, yellowCards: 1, redCards: 0, minutesPlayed: 1620, selected: 55.7, priceChange: 0.2, priceChangeWeek: 0.3, transfersIn: 67800, transfersOut: 21400, netTransfers: 46400 },
  { id: '24', firstName: 'Terrence', lastName: 'Dzvukamanja', teamId: '6', position: 'FWD', price: 7.5, totalPoints: 132, form: 7.6, goalsScored: 13, assists: 5, cleanSheets: 0, yellowCards: 3, redCards: 0, minutesPlayed: 1440, selected: 43.8, priceChange: 0.1, priceChangeWeek: 0.2, transfersIn: 41200, transfersOut: 24300, netTransfers: 16900 },
];

// Fixtures
export const fixtures: Fixture[] = [
  { id: '1', gameweek: 18, homeTeamId: '1', awayTeamId: '2', kickoffTime: '2025-12-21T14:00:00Z', finished: false },
  { id: '2', gameweek: 18, homeTeamId: '3', awayTeamId: '4', kickoffTime: '2025-12-21T14:00:00Z', finished: false },
  { id: '3', gameweek: 18, homeTeamId: '5', awayTeamId: '6', kickoffTime: '2025-12-21T16:00:00Z', finished: false },
  { id: '4', gameweek: 18, homeTeamId: '7', awayTeamId: '8', kickoffTime: '2025-12-22T14:00:00Z', finished: false },
  { id: '5', gameweek: 18, homeTeamId: '9', awayTeamId: '10', kickoffTime: '2025-12-22T14:00:00Z', finished: false },
  { id: '6', gameweek: 18, homeTeamId: '11', awayTeamId: '12', kickoffTime: '2025-12-22T16:00:00Z', finished: false },
  { id: '7', gameweek: 17, homeTeamId: '2', awayTeamId: '1', kickoffTime: '2025-12-14T14:00:00Z', homeScore: 1, awayScore: 2, finished: true },
  { id: '8', gameweek: 17, homeTeamId: '4', awayTeamId: '3', kickoffTime: '2025-12-14T14:00:00Z', homeScore: 0, awayScore: 0, finished: true },
];

// Gameweeks
export const gameweeks: Gameweek[] = [
  { id: 17, name: 'Gameweek 17', deadline: '2025-12-14T12:00:00Z', isCurrent: false, isNext: false, finished: true },
  { id: 18, name: 'Gameweek 18', deadline: '2025-12-21T12:00:00Z', isCurrent: true, isNext: false, finished: false },
  { id: 19, name: 'Gameweek 19', deadline: '2025-12-28T12:00:00Z', isCurrent: false, isNext: true, finished: false },
];

// Sample User Team
export const userTeam: UserTeam = {
  id: 'user-1',
  name: 'Zimbabwe Warriors XI',
  players: ['1', '2', '5', '6', '10', '3', '7', '11', '15', '4', '8'],
  captainId: '12',
  viceCaptainId: '3',
  budget: 2.5,
  totalPoints: 1245,
  gameweekPoints: 68,
  overallRank: 12847,
  transfers: 1,
  freeTransfers: 2,
};

// Helper functions
export const getTeamById = (id: string): Team | undefined => teams.find(t => t.id === id);
export const getPlayerById = (id: string): Player | undefined => players.find(p => p.id === id);
export const getPlayersByTeam = (teamId: string): Player[] => players.filter(p => p.teamId === teamId);
export const getPlayersByPosition = (position: Player['position']): Player[] => players.filter(p => p.position === position);
export const getCurrentGameweek = (): Gameweek | undefined => gameweeks.find(g => g.isCurrent);
export const getFixturesByGameweek = (gameweekId: number): Fixture[] => fixtures.filter(f => f.gameweek === gameweekId);
