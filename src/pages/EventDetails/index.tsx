import { AntDesign } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Image, StyleSheet, Text, View } from 'react-native';
import Animated from 'react-native-reanimated';
import { HEIGHT, SPACING } from '../../constants';
import { ItemProps } from '../../types';

type Params = {
  item: ItemProps;
};


export const EventDetails = () => {

  const { goBack } = useNavigation();

  const route = useRoute()
  const { item } = route.params as Params

  return (
    <View style={{ flex: 1 }}>
      <Animated.View style={[StyleSheet.absoluteFillObject]} >
        <Image source={{ uri: item.poster }} style={[StyleSheet.absoluteFillObject]} />
      </Animated.View>
      <View style={[StyleSheet.absoluteFillObject, { backgroundColor: '#000', opacity: 0.3 }]} />

      <AntDesign
        name='close'
        size={28}
        style={styles.closeBtn}
        color={'#333'}
        onPress={goBack}
      />
      <View style={[StyleSheet.absoluteFillObject, styles.info]}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.location}>{item.location}</Text>
        <Text style={styles.date}>{item.date}</Text>
      </View>

    </View>
  )
}

const styles = StyleSheet.create({
  closeBtn: {
    padding: SPACING,
    position: 'absolute',
    top: SPACING,
    right: SPACING,
    zIndex: 2
  },
  info: {
    backgroundColor: '#fff',
    transform: [{ translateY: HEIGHT * .7 }],
    padding: SPACING * 2,
    borderRadius: 16
  },
  title: {
    fontSize: 28,
    fontWeight: '900'
  },
  location: {
    fontSize: 16,
    fontWeight: '500'
  },
  date: {
    fontSize: 12,
  }
});