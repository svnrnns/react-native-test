import LucideIcon from '@/lib/LucideIcon';
import { useRoute } from '@react-navigation/native';
import { useRouter } from 'expo-router';
import { icons } from 'lucide-react-native';
import { useMemo } from 'react';
import { Pressable, SafeAreaView, Text, View } from 'react-native';

interface TabBarItem {
  name: string;
  icon: keyof typeof icons;
  isActive: boolean;
  onPress: () => void;
}

export default function MainTabBar() {
  const route = useRoute();
  const router = useRouter();

  const items = useMemo<TabBarItem[]>(() => {
    return [
      {
        name: 'Habits',
        icon: 'CircleCheckBig',
        isActive: route.name === 'index',
        onPress: () => router.push('/(main)'),
      },
      {
        name: 'Streak',
        icon: 'Flame',
        isActive: route.name === 'streaks',
        onPress: () => router.push('/(main)/streaks'),
      },
      {
        name: 'Add',
        icon: 'Plus',
        isActive: route.name === 'add-habit',
        onPress: () => router.push('/(main)/add-habit'),
      },
    ];
  }, [route.name, router]);

  return (
    <SafeAreaView className="bg-body">
      <View className="w-full flex flex-row items-center justify-between pt-2">
        {items.map((el) => (
          <Pressable
            key={el.name}
            onPress={el.onPress}
            className="w-1/3"
          >
            <View className="flex flex-col items-center ">
              <LucideIcon
                name={el.icon}
                className={`${
                  el.isActive ? 'text-main' : 'text-heading'
                } size-6`}
              />
              <Text
                className={`${
                  el.isActive ? 'text-main' : 'text-heading'
                } text-sm font-medium`}
              >
                {el.name}
              </Text>
            </View>
          </Pressable>
        ))}
        {/* <Pressable
          onPress={() => router.push('/(main)')}
          className="w-1/3"
        >
          <View className="flex flex-col items-center border">
            <LucideIcon
              name="CircleCheckBig"
              className={`${isIndex ? 'text-main' : 'text-heading'} size-6`}
            />
            <Text
              className={`${
                isIndex ? 'text-main' : 'text-heading'
              } text-sm font-medium`}
            >
              Habits
            </Text>
          </View>
        </Pressable>
        <Link href="/streaks">
          <View className="bg-red-500 flex flex-col items-center border w-1/3">
            <LucideIcon
              name="Flame"
              className={`${isStreaks ? 'text-main' : 'text-heading'} size-6`}
            />
            <Text
              className={`${
                isStreaks ? 'text-main' : 'text-heading'
              } text-sm font-medium`}
            >
              Streaks
            </Text>
          </View>
        </Link>
        <Link href="/add-habit">
          <View className="flex flex-col items-center">
            <LucideIcon
              name="Plus"
              className={`${isAddHabit ? 'text-main' : 'text-heading'} size-6`}
            />
            <Text
              className={`${
                isAddHabit ? 'text-main' : 'text-heading'
              } text-sm font-medium`}
            >
              Add
            </Text>
          </View>
        </Link> */}
      </View>
    </SafeAreaView>
  );
}
