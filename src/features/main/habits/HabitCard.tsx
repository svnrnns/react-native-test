import { Habit } from '@/lib/habits/types/Habit';
import LucideIcon from '@/lib/LucideIcon';
import { Text, View } from 'react-native';

interface Props {
  habit: Habit;
}

const frequencyRelationship: {
  [key in Habit['frequency']]: string;
} = {
  daily: 'days',
  weekly: 'weeks',
  monthly: 'months',
};
export default function HabitCard({ habit }: Props) {
  return (
    <View className="w-full mb-3 p-4 rounded-2xl bg-module flex flex-col shadow-[0_0_14px_rgba(0,0,0,0.05)]">
      <Text className="text-lg text-heading font-medium">{habit.title}</Text>
      <Text className="text-sm text-placeholder font-medium">
        {habit.description}
      </Text>
      <View className="flex flex-row items-center gap-1.5 mt-3">
        <View className="px-2 py-1 rounded-lg bg-main/20">
          <Text className="text-sm text-main font-medium">
            {habit.frequency.toUpperCase()}
          </Text>
        </View>
        <View className="w-fit px-2 py-1 gap-1 rounded-lg bg-warning/20 flex flex-row items-center justify-between">
          <LucideIcon
            name="Flame"
            className="size-4 text-warning"
          />
          <Text className="text-sm text-warning font-medium">
            {habit.streak_count} {frequencyRelationship[habit.frequency]} streak
          </Text>
        </View>
      </View>
    </View>
  );
}
