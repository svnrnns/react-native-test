import LucideIcon from '@/lib/LucideIcon';
import { useColorScheme } from 'nativewind';
import { Pressable } from 'react-native';

export default function ToggleThemeIcon() {
  const { toggleColorScheme } = useColorScheme();

  return (
    <Pressable onPress={() => toggleColorScheme()}>
      <LucideIcon
        name="Moon"
        className="size-5 color-placeholder"
      />
    </Pressable>
  );
}
