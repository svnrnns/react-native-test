import Button from '@/components/ui/Button';
import InlineSelector from '@/components/ui/InlineSelector';
import Input from '@/components/ui/Input';
import { Habit } from '@/lib/habits/types/Habit';
import * as Haptics from 'expo-haptics';
import { useRouter } from 'expo-router';
import { getItemAsync, setItemAsync } from 'expo-secure-store';
import { eventEmit } from 'mitt-react-native';
import { useCallback, useState } from 'react';
import { KeyboardAvoidingView, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

type Frequency = Habit['frequency'];

interface FrequencyItem {
  id: Frequency;
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

const generateUUID = () => {
  const timestamp = Date.now().toString(36);
  const randomStr = Math.random().toString(36).slice(2, 10);
  return `${timestamp}-${randomStr}`;
};

export default function AddHabitScreen() {
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [frequency, setFrequency] = useState<Frequency>('daily');

  const submit = useCallback(async () => {
    if (!title.trim() || !description.trim()) return;

    const newHabit: Habit = {
      id: generateUUID(), // Add UUID to the habit
      title,
      description,
      frequency,
      streak_count: 0,
      last_completed: undefined,
      created_at: new Date(),
    };

    const habitsData = await getItemAsync('habits');
    const existingHabits: Habit[] = habitsData ? JSON.parse(habitsData) : [];

    const updatedHabits = [...existingHabits, newHabit];
    await setItemAsync('habits', JSON.stringify(updatedHabits));

    await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    eventEmit('onNewHabit');
    router.push('/(main)');
  }, [title, description, frequency, router]);

  return (
    <SafeAreaView
      style={{
        flex: 1,
      }}
      className="bg-body"
      edges={['top']}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        className="flex-1 p-6 flex gap-6 items-center justify-center"
      >
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
        <InlineSelector
          items={FREQUENCIES}
          initialSelectedItemId={FREQUENCIES[0].id}
          onChange={(newFrequency) => setFrequency(newFrequency as Frequency)}
        />
        <Button
          disabled={false}
          onPress={submit}
        >
          Add Habit
        </Button>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
