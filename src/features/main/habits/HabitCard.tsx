import { Habit } from '@/lib/habits/types/Habit';
import LucideIcon from '@/lib/LucideIcon';
import * as Haptics from 'expo-haptics';
import { eventEmit } from 'mitt-react-native';
import { useCallback, useRef } from 'react';
import { Pressable, Text, View } from 'react-native';
import Swipeable, {
  SwipeableMethods,
} from 'react-native-gesture-handler/ReanimatedSwipeable';
import Animated, {
  FadeOut,
  LinearTransition,
  runOnJS,
  SharedValue,
  useAnimatedReaction,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';

const vibrate = async () => {
  await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Soft);
};

interface SwipableProps {
  progress: SharedValue<number>;
  willClose: SharedValue<boolean>;
  methods: SwipeableMethods;
}
const SWIPABLE_THRESHOLD = 0.18;
function SwipeableAction({ progress, willClose, methods }: SwipableProps) {
  const animatedStyle = useAnimatedStyle(() => {
    const size = progress.value > SWIPABLE_THRESHOLD ? 24 : 16;
    return {
      width: withTiming(size, { duration: 200 }),
      height: withTiming(size, { duration: 200 }),
    };
  });

  const hasVibrated = useSharedValue(false);
  useAnimatedReaction(
    () => progress.value > SWIPABLE_THRESHOLD,
    (prepared) => {
      if (prepared && !hasVibrated.value) {
        runOnJS(vibrate)();
        hasVibrated.value = true;
      }
      if (!prepared && hasVibrated.value) hasVibrated.value = false;
      if (prepared && willClose.value) {
        methods.openLeft();
      }
    },
    [progress]
  );

  return (
    <Animated.View
      layout={LinearTransition.springify().damping(14)}
      exiting={FadeOut.springify().damping(14)}
      className="flex-1 bg-danger rounded-2xl px-8 justify-center"
    >
      <View className="size-6 items-center justify-center">
        <Animated.View
          className="size-6"
          style={animatedStyle}
        >
          <LucideIcon
            name="Trash"
            className="size-full text-white"
          />
        </Animated.View>
      </View>
    </Animated.View>
  );
}

interface Props {
  habit: Habit;
  onDelete: Function;
}

const frequencyRelationship: {
  [key in Habit['frequency']]: string;
} = {
  daily: 'days',
  weekly: 'weeks',
  monthly: 'months',
};

export default function HabitCard({ habit, onDelete }: Props) {
  const swipeableRef = useRef<SwipeableMethods | null>(null);
  const swipeableWillClose = useSharedValue(false);

  const scale = useSharedValue(1);

  const animatedCardStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
    };
  });

  const deleteHabit = useCallback(() => {
    onDelete();
  }, [onDelete]);

  const blinkAnimation = useCallback(() => {
    scale.value = withSpring(1.05);
    setTimeout(() => {
      scale.value = withSpring(1);
    }, 100);
  }, [scale]);

  return (
    <Swipeable
      ref={swipeableRef}
      overshootLeft={false}
      overshootRight={false}
      renderLeftActions={(progress, _, methods) => (
        <SwipeableAction
          progress={progress}
          methods={methods}
          willClose={swipeableWillClose}
        />
      )}
      onSwipeableWillClose={() => {
        swipeableWillClose.value = true;
      }}
      onSwipeableWillOpen={() => {
        swipeableWillClose.value = false;
      }}
      onSwipeableOpenStartDrag={() => {
        swipeableWillClose.value = false;
      }}
      onSwipeableOpen={() => {
        deleteHabit();
      }}
      containerStyle={{ overflow: 'visible' }}
    >
      <Pressable
        onLongPress={async () => {
          blinkAnimation();
          eventEmit('onHabitEdit', habit);
          await vibrate();
        }}
      >
        <Animated.View
          style={animatedCardStyle}
          exiting={FadeOut.springify().damping(14)}
          layout={LinearTransition.springify().damping(14)}
          className="w-full p-4 rounded-2xl bg-module flex flex-col shadow-[0_0_14px_rgba(0,0,0,0.1)]"
        >
          <Text className="text-lg text-heading font-medium">
            {habit.title}
          </Text>
          <Text className="text-sm text-placeholder font-medium">
            {habit.description}
          </Text>
          <View className="flex flex-row items-center gap-1.5 mt-3">
            <View className="px-2 py-1 rounded-lg bg-main/20">
              <Text className="text-sm text-main font-medium">
                {habit.frequency.toUpperCase()}
              </Text>
            </View>
            <View className="w-fit px-2 py-1 gap-1 rounded-lg border border-warning flex flex-row items-center justify-between">
              <LucideIcon
                name="Flame"
                className="size-4 text-warning"
              />
              <Text className="text-sm text-warning font-medium">
                {habit.streak_count} {frequencyRelationship[habit.frequency]}{' '}
                streak
              </Text>
            </View>
          </View>
        </Animated.View>
      </Pressable>
    </Swipeable>
  );
}
