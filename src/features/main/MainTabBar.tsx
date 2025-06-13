import LucideIcon from '@/lib/LucideIcon';
import { usePathname, useRouter } from 'expo-router';
import { icons } from 'lucide-react-native';
import { useMemo } from 'react';
import { Pressable, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

interface TabBarItem {
  name: string;
  icon: keyof typeof icons;
  isActive: boolean;
  onPress: () => void;
}

export default function MainTabBar() {
  const router = useRouter();
  const pathname = usePathname();

  const items = useMemo<TabBarItem[]>(() => {
    return [
      {
        name: 'Habits',
        icon: 'CircleCheckBig',
        isActive: pathname === '/',
        onPress: () => router.push('/(main)'),
      },
      {
        name: 'Streak',
        icon: 'Flame',
        isActive: pathname === '/streaks',
        onPress: () => router.push('/(main)/streaks'),
      },
      {
        name: 'Add',
        icon: 'Plus',
        isActive: pathname === '/add-habit',
        onPress: () => router.push('/(main)/add-habit'),
      },
    ];
  }, [router, pathname]);

  return (
    <SafeAreaView
      className="bg-body"
      edges={['bottom']}
    >
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
      </View>
    </SafeAreaView>
  );
}
