export interface Habit {
  // user_id: string (This won't be implemented as this is a test app)
  title: string;
  description: string;
  streak_count: number;
  frequency: 'daily' | 'weekly' | 'monthly';
  last_completed: Date;
  created_at: Date;
}
