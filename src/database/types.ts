export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export interface Database {
  public: {
    Tables: {
      [key: string]: {
        Row: Record<string, Json>;
        Insert: Record<string, Json>;
        Update: Record<string, Json>;
        Relationships: never[];
      };
    };
    Views: {
      [key: string]: {
        Row: Record<string, Json>;
      };
    };
    Functions: {
      [key: string]: {
        Args: Record<string, Json>;
        Returns: Json;
      };
    };
    Enums: Record<string, string[]>;
    CompositeTypes: Record<string, Record<string, Json>>;
  };
}
