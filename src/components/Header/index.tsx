import { EvilIcons } from '@expo/vector-icons';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';
import { OVERFLOW_HEIGHT, SPACING } from '../../constants';
import { ItemProps } from '../../types';


type HeaderProps = {
  item: ItemProps;
  index: number;
};

export const Header = ({ item, index }: HeaderProps) => {
  return (
    <View key={index} style={styles.itemContainer}>
      <Text style={[styles.title]} numberOfLines={1}>
        {item.title}
      </Text>
      <View style={styles.itemContainerRow}>
        <Text style={[styles.location]}>
          <EvilIcons
            name='location'
            size={16}
            color='black'
            style={{ marginRight: 5 }}
          />
          {item.location}
        </Text>
        <Text style={[styles.date]}>{item.date}</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  title: {
    fontSize: 28,
    fontWeight: '900',
    textTransform: 'uppercase',
    letterSpacing: -1,
  },
  location: {
    fontSize: 16,
  },
  date: {
    fontSize: 12,
  },
  itemContainer: {
    height: OVERFLOW_HEIGHT,
    padding: SPACING * 2,
  },
  itemContainerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});
