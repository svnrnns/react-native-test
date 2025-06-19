import HabitCard from '@/features/main/habits/HabitCard';
import { Habit } from '@/lib/habits/types/Habit';
import { useEventListener } from 'mitt-react-native';

import { getItemAsync } from 'expo-secure-store';
import { useCallback, useEffect, useRef, useState } from 'react';
import { Pressable, ScrollView, StatusBar, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import ToggleThemeIcon from '@/components/ui/ToggleThemeIcon';
import { useThemeVariables } from '@/styles/ThemeProvider';
import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetBackdropProps,
  BottomSheetView,
} from '@gorhom/bottom-sheet';

const fetchHabits = async () => {
  const habitsData = await getItemAsync('habits');
  if (habitsData) return JSON.parse(habitsData) as Habit[];
  else return [];
};

function BackdropComponent(props: BottomSheetBackdropProps) {
  return (
    <BottomSheetBackdrop
      {...props}
      pressBehavior="close"
      appearsOnIndex={0}
      disappearsOnIndex={-1}
      style={[props.style, { backgroundColor: 'rgba(0, 0, 0, 0.1)' }]}
    />
  );
}

export default function Index() {
  const [habits, setHabits] = useState<Habit[]>([]);
  const sheetRef = useRef<BottomSheet>(null);
  const theme = useThemeVariables();

  useEffect(() => {
    const fetch = async () => {
      setHabits(await fetchHabits());
    };

    fetch();
  }, []);

  useEventListener('onNewHabit', async () => {
    setHabits(await fetchHabits());
  });

  useEventListener('onHabitEdit', () => {
    sheetRef.current?.snapToIndex(0);
  });

  const onDeleteHabit = useCallback((id: string) => {
    setHabits((prevHabits) => {
      const updatedHabits = prevHabits.filter((el) => el.id !== id);
      return updatedHabits;
    });
  }, []);

  return (
    <>
      <StatusBar />
      <SafeAreaView
        style={{
          flex: 1,
        }}
        className="bg-body"
        edges={['top']}
      >
        <View className="flex-1 flex flex-col">
          <View className="flex flex-row items-center justify-between px-12">
            <Text className="text-2xl font-bold text-heading ">Habits</Text>
            <ToggleThemeIcon />
          </View>
          <ScrollView
            showsVerticalScrollIndicator={false}
            className="p-6"
          >
            {/* no habits */}
            {habits.length === 0 && (
              <Text className="text-font">
                You haven&apos;t created any habit yet
              </Text>
            )}
            {/* yep there are habits */}
            {habits.length > 0 &&
              habits.map((el) => (
                <View key={el.id}>
                  <HabitCard
                    habit={el}
                    onDelete={() => onDeleteHabit(el.id)}
                  />
                  <View className="h-3" />
                </View>
              ))}
          </ScrollView>
        </View>
      </SafeAreaView>
      <BottomSheet
        ref={sheetRef}
        snapPoints={['33%', '66%']}
        enableDynamicSizing={false}
        enablePanDownToClose
        index={-1}
        backdropComponent={BackdropComponent}
        backgroundStyle={{ backgroundColor: theme.module }}
        handleIndicatorStyle={{
          backgroundColor: theme.font,
          width: 40,
          height: 2,
          borderRadius: 3,
        }}
      >
        <BottomSheetView className="p-6">
          <View className="flex flex-row items-center justify-between">
            <Text className="text-xl font-medium text-heading">Edit Habit</Text>
            <Pressable onPress={() => sheetRef.current?.close()}>
              <Text className="text-heading">Cerrar</Text>
            </Pressable>
          </View>
          <Text className="mt-3 text-font">
            I believe this won&apos;t be implement at all xd, just testing React
            Native
          </Text>
        </BottomSheetView>
      </BottomSheet>
    </>
  );
}
