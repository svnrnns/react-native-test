import HabitCard from '@/features/main/habits/HabitCard';
import MainTabBar from '@/features/main/MainTabBar';
import { Habit } from '@/lib/habits/types/Habit';
import { useEventListener } from '@/lib/mitt';
// import { useEventListener } from 'mitt-react';

import { getItemAsync } from 'expo-secure-store';
import { useEffect, useState } from 'react';
import { SafeAreaView, ScrollView, Text, View } from 'react-native';

const fetchHabits = async () => {
  const habitsData = await getItemAsync('habits');
  if (habitsData) return JSON.parse(habitsData) as Habit[];
  else return [];
};

export default function Index() {
  const [habits, setHabits] = useState<Habit[]>([]);

  useEffect(() => {
    const fetch = async () => {
      setHabits(await fetchHabits());
    };

    fetch();
  }, []);

  useEventListener('onNewHabit', async () => {
    setHabits(await fetchHabits());
  });
  return (
    <>
      <SafeAreaView
        style={{
          flex: 1,
        }}
        className="bg-body"
      >
        <View className="flex-1 flex flex-col ">
          <Text className="text-2xl font-bold text-heading px-12">Habits</Text>
          <ScrollView className="p-6">
            {/* no habits */}
            {habits.length === 0 && (
              <Text className="text-font">
                You haven&apos;t created any habit yet
              </Text>
            )}
            {/* yep there are habits */}
            {habits.length > 0 &&
              habits.map((el, i) => (
                <HabitCard
                  habit={el}
                  key={i}
                />
              ))}
          </ScrollView>
        </View>
      </SafeAreaView>
      <MainTabBar />
    </>
  );
}
