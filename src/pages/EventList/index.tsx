import { useCallback, useEffect, useState } from 'react';
import {
  FlatList,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  View
} from 'react-native';
import {
  Directions,
  FlingGestureHandler,
  GestureHandlerRootView,
  State
} from 'react-native-gesture-handler';
import Animated, {
  runOnJS,
  useSharedValue,
  withSpring
} from 'react-native-reanimated';
import { DATA } from '../../../data';
import { CellRendererComponent } from '../../components/CellRendereComponent';
import { OverFlowList } from '../../components/OverflowList';
import { Poster } from '../../components/Poster';
import { HEIGHT, SPACING, VISIBLE_ITEMS } from '../../constants';


export const EventList = () => {
  const [data, setData] = useState(DATA);
  const scrollXIndex = useSharedValue(0);
  const scrollXAnimated = useSharedValue(0);
  const [index, setIndex] = useState(0);

  const setActiveIndex = useCallback((activeIndex: number) => {
    scrollXIndex.value = activeIndex;
    setIndex(activeIndex);
  }, [scrollXIndex]);

  useEffect(() => {
    if (index === data.length - VISIBLE_ITEMS - 1) {
      const newData = [...data, ...data];
      setData(newData);
    }
  }, [index, data]);

  useEffect(() => {
    scrollXAnimated.value = withSpring(scrollXIndex.value);
  }, [scrollXIndex.value]);

  return (

    <GestureHandlerRootView style={{ flex: 1 }}>
      <FlingGestureHandler
        key='left'
        direction={Directions.LEFT}
        onHandlerStateChange={(ev) => {
          if (ev.nativeEvent.state === State.END) {
            if (index === data.length - 1) {
              return;
            }
            runOnJS(setActiveIndex)(index + 1);
          }
        }}
      >
        <FlingGestureHandler
          key='right'
          direction={Directions.RIGHT}
          onHandlerStateChange={(ev) => {
            if (ev.nativeEvent.state === State.END) {
              if (index === 0) {
                return;
              }
              runOnJS(setActiveIndex)(index - 1);
            }
          }}
        >
          <SafeAreaView style={styles.container}>
            <StatusBar hidden />
            <OverFlowList data={data} scrollXAnimated={scrollXAnimated} />
            <FlatList
              data={data}
              keyExtractor={(_, index) => String(index)}
              horizontal
              inverted
              contentContainerStyle={styles.content}
              scrollEnabled={false}
              removeClippedSubviews={false}
              CellRendererComponent={({ item, index, children, style, ...props }) =>
                <CellRendererComponent data={data} index={index} style={style} children={children} {...props} />}
              renderItem={({ item, index }) =>
                <Poster item={item} index={index} scrollXAnimated={scrollXAnimated} />}
            />
            <Animated.View sharedTransitionTag='poster' style={[
              StyleSheet.absoluteFillObject,
              {
                transform: [{ translateY: HEIGHT }],
              }
            ]} >
              <View style={[
                StyleSheet.absoluteFillObject,
                {
                  backgroundColor: '#fff',

                  borderRadius: 16
                }]} />
            </Animated.View>


          </SafeAreaView>
        </FlingGestureHandler>
      </FlingGestureHandler>
    </GestureHandlerRootView>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    padding: SPACING * 2,
    marginTop: 50,
  }
});
