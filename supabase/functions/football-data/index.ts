import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Free football data API - no API key required for basic endpoints
const FOOTBALL_DATA_API = 'https://api.football-data.org/v4';

interface Match {
  id: number;
  homeTeam: { name: string; shortName: string; crest: string };
  awayTeam: { name: string; shortName: string; crest: string };
  score: { 
    fullTime: { home: number | null; away: number | null };
    halfTime: { home: number | null; away: number | null };
  };
  status: string;
  utcDate: string;
  matchday: number;
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const url = new URL(req.url);
    const action = url.searchParams.get('action') || 'matches';
    const competition = url.searchParams.get('competition') || 'PL'; // Premier League by default

    console.log(`Football data request: action=${action}, competition=${competition}`);

    let apiUrl = '';
    
    switch (action) {
      case 'matches':
        // Get current matchday matches
        apiUrl = `${FOOTBALL_DATA_API}/competitions/${competition}/matches?status=SCHEDULED,LIVE,IN_PLAY,PAUSED,FINISHED`;
        break;
      case 'standings':
        apiUrl = `${FOOTBALL_DATA_API}/competitions/${competition}/standings`;
        break;
      case 'teams':
        apiUrl = `${FOOTBALL_DATA_API}/competitions/${competition}/teams`;
        break;
      case 'scorers':
        apiUrl = `${FOOTBALL_DATA_API}/competitions/${competition}/scorers`;
        break;
      default:
        apiUrl = `${FOOTBALL_DATA_API}/competitions/${competition}/matches`;
    }

    const apiKey = Deno.env.get('FOOTBALL_DATA_API_KEY');
    
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
    };
    
    // Only add API key if available (for higher rate limits)
    if (apiKey) {
      headers['X-Auth-Token'] = apiKey;
    }

    console.log(`Fetching from: ${apiUrl}`);

    const response = await fetch(apiUrl, { headers });
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error(`API error: ${response.status} - ${errorText}`);
      
      // Return mock data if API fails
      return new Response(
        JSON.stringify({
          success: true,
          data: getMockData(action),
          source: 'mock'
        }),
        { 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 200
        }
      );
    }

    const data = await response.json();
    console.log(`Successfully fetched ${action} data`);

    return new Response(
      JSON.stringify({
        success: true,
        data: data,
        source: 'api'
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200
      }
    );

  } catch (error) {
    console.error('Error fetching football data:', error);
    
    // Return mock data on error
    const url = new URL(req.url);
    const action = url.searchParams.get('action') || 'matches';
    
    return new Response(
      JSON.stringify({
        success: true,
        data: getMockData(action),
        source: 'mock'
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200
      }
    );
  }
});

function getMockData(action: string) {
  const now = new Date();
  
  switch (action) {
    case 'matches':
      return {
        matches: [
          {
            id: 1,
            homeTeam: { name: 'Arsenal', shortName: 'ARS', crest: '' },
            awayTeam: { name: 'Liverpool', shortName: 'LIV', crest: '' },
            score: { fullTime: { home: null, away: null }, halfTime: { home: null, away: null } },
            status: 'SCHEDULED',
            utcDate: new Date(now.getTime() + 86400000).toISOString(),
            matchday: 1
          },
          {
            id: 2,
            homeTeam: { name: 'Manchester City', shortName: 'MCI', crest: '' },
            awayTeam: { name: 'Chelsea', shortName: 'CHE', crest: '' },
            score: { fullTime: { home: 2, away: 1 }, halfTime: { home: 1, away: 0 } },
            status: 'FINISHED',
            utcDate: new Date(now.getTime() - 86400000).toISOString(),
            matchday: 1
          },
          {
            id: 3,
            homeTeam: { name: 'Manchester United', shortName: 'MUN', crest: '' },
            awayTeam: { name: 'Tottenham', shortName: 'TOT', crest: '' },
            score: { fullTime: { home: 1, away: 1 }, halfTime: { home: 0, away: 1 } },
            status: 'IN_PLAY',
            utcDate: now.toISOString(),
            matchday: 1
          }
        ],
        competition: { name: 'Premier League', code: 'PL' }
      };
    case 'scorers':
      return {
        scorers: [
          { player: { name: 'Erling Haaland' }, team: { name: 'Manchester City' }, goals: 15, assists: 3 },
          { player: { name: 'Mohamed Salah' }, team: { name: 'Liverpool' }, goals: 12, assists: 8 },
          { player: { name: 'Bukayo Saka' }, team: { name: 'Arsenal' }, goals: 10, assists: 6 }
        ]
      };
    case 'standings':
      return {
        standings: [{
          table: [
            { position: 1, team: { name: 'Liverpool', shortName: 'LIV' }, points: 45, playedGames: 18 },
            { position: 2, team: { name: 'Arsenal', shortName: 'ARS' }, points: 40, playedGames: 18 },
            { position: 3, team: { name: 'Chelsea', shortName: 'CHE' }, points: 38, playedGames: 18 }
          ]
        }]
      };
    default:
      return {};
  }
}
