import Button from '@/components/ui/Button';
import InlineSelector from '@/components/ui/InlineSelector';
import Input from '@/components/ui/Input';
import MainTabBar from '@/features/main/MainTabBar';
import { Habit } from '@/lib/habits/types/Habit';
import { useState } from 'react';
import { SafeAreaView, View } from 'react-native';

interface FrequencyItem {
  id: Habit['frequency'];
  name: string;
}
const FREQUENCIES: FrequencyItem[] = [
  {
    id: 'daily',
    name: 'Daily',
  },
  {
    id: 'weekly',
    name: 'Weekly',
  },
  {
    id: 'monthly',
    name: 'Monthly',
  },
];

export default function AddHabitScreen() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  return (
    <>
      <SafeAreaView
        style={{
          flex: 1,
        }}
        className="bg-body"
      >
        <View className="flex-1 p-6 flex gap-6 items-center justify-center">
          <Input
            label="Title"
            value={title}
            onChange={(text) => setTitle(text)}
          />
          <Input
            label="Description"
            value={description}
            onChange={(text) => setDescription(text)}
          />
          <InlineSelector items={FREQUENCIES} />
          <Button
            disabled={false}
            onPress={() => {}}
          >
            Add Habit
          </Button>
        </View>
      </SafeAreaView>
      <MainTabBar />
    </>
  );
}
