import { useState } from 'react';
import { Pressable, Text, View } from 'react-native';

interface SelectorItem {
  id: string;
  name: string;
}

interface Props {
  items: SelectorItem[];
  initialSelectedItemId: string;
  onChange: (id: string) => void;
}

export default function InlineSelector({
  items,
  initialSelectedItemId,
  onChange,
}: Props) {
  const [selectedItemId, setSelectedItemId] = useState<string | undefined>(
    initialSelectedItemId ?? undefined
  );
  return (
    <View className="w-full py-2 gap rounded-lg bg-box flex flex-row items-center">
      {items.map((el) => (
        <Pressable
          className="w-full px-1.5"
          style={{ width: `${100 / items.length}%` }}
          key={el.id}
          onPress={() => {
            setSelectedItemId(el.id);
            onChange(el.id);
          }}
        >
          <Text
            className={`${
              selectedItemId === el.id && 'bg-body'
            } p-2 font-medium text-center text-heading shadow shadow-black/10 rounded-lg`}
          >
            {el.name}
          </Text>
        </Pressable>
      ))}
    </View>
  );
}
