import { KeyboardTypeOptions, Text, TextInput, View } from 'react-native';

interface Props {
  label: string | null;
  value: string;
  onChange: (text: string) => void;
  autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters';
  keyboardType?: KeyboardTypeOptions;
  placeholder?: string;
}
export default function Input({
  label,
  value,
  onChange,
  autoCapitalize,
  keyboardType = 'default',
  placeholder,
}: Props) {
  return (
    <View className="flex flex-col gap-1.5 w-full">
      <Text className="text-heading"> {label}</Text>
      <TextInput
        autoCapitalize={autoCapitalize}
        placeholder={placeholder}
        keyboardType={keyboardType}
        className="w-full bg-box text-heading font-medium text-[16px] px-3 py-4 rounded-lg"
        onChangeText={onChange}
        value={value}
      />
    </View>
  );
}
