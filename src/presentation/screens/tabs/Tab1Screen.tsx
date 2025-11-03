import {Text, View} from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';
import { IonIcon } from '../../shared/IonIcon';

export const Tab1Screen = () => {
  
  return (
    <View>
      <Text>HomeScreenMenu</Text>
      <Icon name="caret-back-outline" size={30} color="black" />
      <Icon name="home-outline" size={30} color="black" />
      <Icon name="heart-outline" size={30} color="black" />
      <Icon name="star-outline" size={30} color="black" />
      <Icon name="invert-mode" size={30} color="red" />
      <IonIcon name="home-outline" size={50} color="red" />
    </View>
  );
} 