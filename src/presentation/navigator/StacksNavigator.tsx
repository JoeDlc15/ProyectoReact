import { createStackNavigator } from '@react-navigation/stack';
import { HomeScreen } from '../screens/home/HomeScreen';
import { AnimalsScreen } from '../screens/animals/AnimalsScreen';
import { SearchScreens } from '../screens/search/SearchScreens';

export type RootStackParams = {
    HomeScren: undefined;
    AnimalsScreen: {pokemonId: number};
    SearchScreens: undefined;
}

const Stack = createStackNavigator<RootStackParams>();

export const StacksNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown:false}}>
      <Stack.Screen name="HomeScren" component={HomeScreen} />
      <Stack.Screen name="AnimalsScreen" component={AnimalsScreen} />
      <Stack.Screen name="SearchScreens" component={SearchScreens} />
    </Stack.Navigator>
  );
}