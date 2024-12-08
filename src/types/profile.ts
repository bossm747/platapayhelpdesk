export interface Profile {
  id: string;
  full_name: string | null;
  email: string | null;
  avatar_url: string | null;
  notifications_email: boolean;
  notifications_push: boolean;
  notifications_updates: boolean;
  theme: string;
  language: string;
  created_at: string;
  updated_at: string;
}