export interface Habit {
  // user_id: string (This won't be implemented as this is a test app)
  id: string;
  title: string;
  description: string;
  streak_count: number;
  frequency: 'daily' | 'weekly' | 'monthly';
  last_completed: Date | undefined;
  created_at: Date;
}
