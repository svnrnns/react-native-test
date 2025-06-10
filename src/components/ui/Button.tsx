import { Pressable, Text } from 'react-native';

interface Props {
  children: React.ReactNode;
  disabled: boolean;
  onPress: () => void;
}

export default function Button({ children, disabled, onPress }: Props) {
  return (
    <Pressable
      onPress={onPress}
      className={`${disabled && 'pointer-events-none opacity-60'} w-full `}
    >
      <Text className="p-3 leading-none rounded-lg text-center bg-main text-white font-medium">
        {children}
      </Text>
    </Pressable>
  );
}
