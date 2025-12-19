
export interface LashModel {
  id: string;
  user_id?: string;
  name: string;
  description: string;
  image_url?: string; // Changed from imagePlaceholder to match DB
  imagePlaceholder?: string; // Keeping for compatibility or fallback
  price: number;
  maintenance_price?: number; // Changed to match DB snake_case
  maintenancePrice?: number; // Keeping for compatibility
  category?: 'lash' | 'combo' | 'additional';
  active?: boolean;
}

export interface UserProfile {
  id: string; // UUID of the profile row
  user_id: string; // Auth User ID
  email: string;
  full_name: string;
  avatar_url?: string;
  vip_stars: number;
  eye_shape?: string;
  style_preference?: string;
  experience_level?: string;
  created_at?: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: Date;
}

export enum LashStyleId {
  VOLUME_PREMIUM = 'volume_premium',
  PRINCESS_EFFECT = 'princess_effect',
  VOLUME_HAVILAH = 'volume_havilah',
  FOX_EYES = 'fox_eyes',
  VOLUME_DIVINE = 'volume_divine',
  CAPPING = 'capping',
  COMBO_GLAMOUR = 'combo_glamour',
  NATURAL_SOFT = 'natural_soft',
}

export enum AppRoute {
  WELCOME = '/',
  LOGIN = '/login',
  REGISTER = '/register',
  ONBOARDING = '/onboarding',
  DASHBOARD = '/dashboard',
  PRICING = '/valores',
  BOOKING = '/agendamento',
  CONSULTANCY = '/consultoria',
  CARE = '/cuidados',
  PROFILE = '/perfil',
  CHAT = '/chat-ai',
}
