import { View } from 'react-native';
import { ItemProps } from '../../types';

type CellRendererComponentProps = {
  style: any;
  index: number;
  children: any;
  data: ItemProps[];
};


export const CellRendererComponent = ({ data, children, index, style, ...props }: CellRendererComponentProps) => {
  const newStyle = [style, { zIndex: data.length - index }];
  return (
    <View style={newStyle} {...props}>
      {children}
    </View>
  );
}
