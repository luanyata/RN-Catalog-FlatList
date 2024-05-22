import {
  StyleSheet,
  View
} from 'react-native';
import Animated, {
  interpolate,
  useAnimatedStyle
} from 'react-native-reanimated';
import { OVERFLOW_HEIGHT } from '../../constants';
import { ItemProps } from '../../types';
import { Header } from '../Header';


type OverFlowListProps = {
  data: ItemProps[];
  scrollXAnimated: any;
};

export const OverFlowList = ({ data, scrollXAnimated }: OverFlowListProps) => {
  const animatedStyle = useAnimatedStyle(() => {
    const translateY = interpolate(scrollXAnimated.value, [-1, 0, 1], [OVERFLOW_HEIGHT, 0, -OVERFLOW_HEIGHT]);
    return { transform: [{ translateY, }] };
  });

  return (
    <View style={styles.overflowContainer}>
      <Animated.View style={animatedStyle}>
        {data.map((item: ItemProps, index: number) => (
          <Header key={index} item={item} index={index} />
        ))}
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  overflowContainer: {
    height: OVERFLOW_HEIGHT,
    overflow: 'hidden',
  },
});
