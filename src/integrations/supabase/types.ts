export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.1"
  }
  public: {
    Tables: {
      matches: {
        Row: {
          away_score: number | null
          away_team_id: string | null
          created_at: string | null
          external_id: number | null
          gameweek: number | null
          home_score: number | null
          home_team_id: string | null
          id: string
          match_date: string | null
          status: string | null
          updated_at: string | null
        }
        Insert: {
          away_score?: number | null
          away_team_id?: string | null
          created_at?: string | null
          external_id?: number | null
          gameweek?: number | null
          home_score?: number | null
          home_team_id?: string | null
          id?: string
          match_date?: string | null
          status?: string | null
          updated_at?: string | null
        }
        Update: {
          away_score?: number | null
          away_team_id?: string | null
          created_at?: string | null
          external_id?: number | null
          gameweek?: number | null
          home_score?: number | null
          home_team_id?: string | null
          id?: string
          match_date?: string | null
          status?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "matches_away_team_id_fkey"
            columns: ["away_team_id"]
            isOneToOne: false
            referencedRelation: "teams"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "matches_home_team_id_fkey"
            columns: ["home_team_id"]
            isOneToOne: false
            referencedRelation: "teams"
            referencedColumns: ["id"]
          },
        ]
      }
      player_performances: {
        Row: {
          assists: number | null
          bonus: number | null
          clean_sheet: boolean | null
          created_at: string | null
          goals: number | null
          id: string
          match_id: string
          minutes: number | null
          player_id: string
          points: number | null
          red_cards: number | null
          saves: number | null
          yellow_cards: number | null
        }
        Insert: {
          assists?: number | null
          bonus?: number | null
          clean_sheet?: boolean | null
          created_at?: string | null
          goals?: number | null
          id?: string
          match_id: string
          minutes?: number | null
          player_id: string
          points?: number | null
          red_cards?: number | null
          saves?: number | null
          yellow_cards?: number | null
        }
        Update: {
          assists?: number | null
          bonus?: number | null
          clean_sheet?: boolean | null
          created_at?: string | null
          goals?: number | null
          id?: string
          match_id?: string
          minutes?: number | null
          player_id?: string
          points?: number | null
          red_cards?: number | null
          saves?: number | null
          yellow_cards?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "player_performances_match_id_fkey"
            columns: ["match_id"]
            isOneToOne: false
            referencedRelation: "matches"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "player_performances_player_id_fkey"
            columns: ["player_id"]
            isOneToOne: false
            referencedRelation: "players"
            referencedColumns: ["id"]
          },
        ]
      }
      players: {
        Row: {
          assists: number | null
          clean_sheets: number | null
          created_at: string | null
          external_id: number | null
          form: number | null
          goals: number | null
          id: string
          minutes_played: number | null
          name: string
          position: string
          price: number
          price_change: number | null
          selected_by_percent: number | null
          team_id: string | null
          total_points: number | null
          transfers_in: number | null
          transfers_out: number | null
          updated_at: string | null
        }
        Insert: {
          assists?: number | null
          clean_sheets?: number | null
          created_at?: string | null
          external_id?: number | null
          form?: number | null
          goals?: number | null
          id?: string
          minutes_played?: number | null
          name: string
          position: string
          price?: number
          price_change?: number | null
          selected_by_percent?: number | null
          team_id?: string | null
          total_points?: number | null
          transfers_in?: number | null
          transfers_out?: number | null
          updated_at?: string | null
        }
        Update: {
          assists?: number | null
          clean_sheets?: number | null
          created_at?: string | null
          external_id?: number | null
          form?: number | null
          goals?: number | null
          id?: string
          minutes_played?: number | null
          name?: string
          position?: string
          price?: number
          price_change?: number | null
          selected_by_percent?: number | null
          team_id?: string | null
          total_points?: number | null
          transfers_in?: number | null
          transfers_out?: number | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "players_team_id_fkey"
            columns: ["team_id"]
            isOneToOne: false
            referencedRelation: "teams"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          budget: number | null
          created_at: string | null
          gameweek_points: number | null
          id: string
          overall_rank: number | null
          team_name: string | null
          total_points: number | null
          updated_at: string | null
          user_id: string
          username: string | null
        }
        Insert: {
          budget?: number | null
          created_at?: string | null
          gameweek_points?: number | null
          id?: string
          overall_rank?: number | null
          team_name?: string | null
          total_points?: number | null
          updated_at?: string | null
          user_id: string
          username?: string | null
        }
        Update: {
          budget?: number | null
          created_at?: string | null
          gameweek_points?: number | null
          id?: string
          overall_rank?: number | null
          team_name?: string | null
          total_points?: number | null
          updated_at?: string | null
          user_id?: string
          username?: string | null
        }
        Relationships: []
      }
      teams: {
        Row: {
          badge_url: string | null
          created_at: string | null
          external_id: number | null
          id: string
          name: string
          short_name: string | null
        }
        Insert: {
          badge_url?: string | null
          created_at?: string | null
          external_id?: number | null
          id?: string
          name: string
          short_name?: string | null
        }
        Update: {
          badge_url?: string | null
          created_at?: string | null
          external_id?: number | null
          id?: string
          name?: string
          short_name?: string | null
        }
        Relationships: []
      }
      user_fantasy_teams: {
        Row: {
          created_at: string | null
          id: string
          is_benched: boolean | null
          is_captain: boolean | null
          is_vice_captain: boolean | null
          player_id: string
          user_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          is_benched?: boolean | null
          is_captain?: boolean | null
          is_vice_captain?: boolean | null
          player_id: string
          user_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          is_benched?: boolean | null
          is_captain?: boolean | null
          is_vice_captain?: boolean | null
          player_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_fantasy_teams_player_id_fkey"
            columns: ["player_id"]
            isOneToOne: false
            referencedRelation: "players"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
