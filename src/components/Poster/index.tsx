import { useNavigation } from '@react-navigation/native';
import {
  Image,
  TouchableOpacity
} from 'react-native';
import Animated, {
  interpolate,
  useAnimatedStyle
} from 'react-native-reanimated';
import { ITEM_HEIGHT, ITEM_WIDTH, VISIBLE_ITEMS } from '../../constants';
import { ItemProps } from '../../types';

type PosterProps = {
  item: ItemProps;
  index: number;
  scrollXAnimated: any;
};

export const Poster = ({ index, item, scrollXAnimated, }: PosterProps) => {

  const navigation = useNavigation();

  const inputRange = [index - 1, index, index + 1];
  const animatedStyle = useAnimatedStyle(() => {
    const translateX = interpolate(scrollXAnimated.value, inputRange, [50, 0, -100]);
    const scale = interpolate(scrollXAnimated.value, inputRange, [0.8, 1, 1.3]);
    const opacity = interpolate(scrollXAnimated.value, inputRange, [1 - 1 / VISIBLE_ITEMS, 1, 0]);
    return {
      position: 'absolute',
      left: -ITEM_WIDTH / 2,
      opacity,
      transform: [
        { translateX },
        { scale },
      ],
    };
  });

  return (
    <Animated.View style={animatedStyle}>
      <TouchableOpacity
        activeOpacity={0.9}
        onPress={() => {
          navigation.navigate('EventDetails', { item });
        }}
      >
        <Animated.View sharedTransitionTag='image'>
          <Image
            source={{ uri: item.poster }}
            style={{
              width: ITEM_WIDTH,
              height: ITEM_HEIGHT,
              borderRadius: 14,

            }}
          />
        </Animated.View>
      </TouchableOpacity>
    </Animated.View>
  );
}
