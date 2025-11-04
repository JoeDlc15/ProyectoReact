import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Tab1Screen } from '../screens/tabs/Tab1Screen';
import { Tab2Screen } from '../screens/tabs/Tab2Screen';
import { Tab3Screen } from '../screens/tabs/Tab3Screen';
import { globalColors } from '../../config/theme/theme';
import { Text } from 'react-native-gesture-handler';
import { StacksNavigator } from './StacksNavigator';
import { IonIcon } from '../shared/IonIcon';
import { StacksNavigatorMaps } from './StacksNavigatorMaps';

const Tab = createBottomTabNavigator();

export const BottomTabsNavigator = () => {

  return (
    <Tab.Navigator
        /*sceneContainerStyle={{
        backgroundColor: globalColors.background
        }}*/

      screenOptions={{        
        //headerShown:false,
        tabBarLabelStyle: {
            marginBottom: 5,
        },
        headerStyle: {
            elevation: 0,
            borderColor: 'transparent',
            shadowColor: 'transparent'
        },
        tabBarStyle: {
            borderTopWidth: 0,
        },
      }}
      >
      <Tab.Screen 
            name="Pokedex" options={{title:'PokeFinder', tabBarIcon: ( {color}) => 
            (<IonIcon name="invert-mode" size={30} color={color} />)}} component={StacksNavigator} />
      <Tab.Screen 
            name="Tab1" options={{title:'Favoritos', tabBarIcon: ({color}) => 
             (<IonIcon name="bookmark" size={30} color={color} />)}} component={Tab1Screen} />
      <Tab.Screen 
            name="Tab2" options={{title:'Mapa', tabBarIcon: ({color}) => 
            (<IonIcon name="map" size={30} color={color} />)}} component={StacksNavigatorMaps} />
        <Tab.Screen 
            name="Tab4" options={{title:'Boleteria', tabBarIcon: ({color}) => 
           (<IonIcon name="ticket" size={30} color={color} />)}} component={Tab3Screen} />
      <Tab.Screen 
            name="Tab3" options={{title:'Perfil', tabBarIcon: ({color}) => 
           (<IonIcon name="person" size={30} color={color} />)}} component={Tab3Screen} />
    </Tab.Navigator>
  );
}