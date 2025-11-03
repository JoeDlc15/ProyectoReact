import { Image, Pressable, StyleSheet,  View } from "react-native"
import { Animals } from "../../../domain/entities/animals";
import { Text,Card } from "react-native-paper";
import React from "react";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { RootStackParams } from "../../navigator/StacksNavigator";
import { FadeInImage } from "../ui/FadeInImage";

interface Props {
    animal:Animals;
}
export const AnimalsCard = ({animal}:Props) => {

  const navigation = useNavigation<NavigationProp<RootStackParams>>();
  const [isFavorite, setIsFavorite] = React.useState(false);

  const toggleFavorite = () => {
        setIsFavorite(!isFavorite);
  };

    return (
      <Pressable
        style={{flex:1}}
        onPress={() => navigation.navigate('AnimalsScreen', {pokemonId: animal.id})}
      >        
          <Card style={[styles.cardContainer, {backgroundColor: animal.color}]}>
              <Text style={styles.name} variant="bodyLarge" lineBreakMode="middle">
                  {animal.name}
                  {'\n#'+animal.id}
              </Text>

              {/* Botón de favoritos */}
                <Pressable 
                    style={styles.favoriteButton} 
                    onPress={toggleFavorite}
                    hitSlop={10}
                >
                    <Image
                        source={isFavorite 
                            ? require('../../../assets/heart_filled.png') 
                            : require('../../../assets/heart_outline.png')}
                        style={styles.heartIcon}
                    />
                </Pressable>

              {/*Annimales background image */}
              <View style={styles.pokeballContainer}>
                  <Image
                      source={require('../../../assets/animals_light.png')}
                      style={styles.pokeball}
                  />
              </View>
              
              {/*Annimales Image */}
              <FadeInImage 
                uri={animal.avatar} 
                style={styles.pokemonImage} 
              />
              
              {/*Types*/}
              <Text style={[styles.name, {marginTop: 35   }]} >{animal.types[0]}</Text>
          </Card>
        </Pressable>
    )
}


const styles = StyleSheet.create({
  cardContainer: {
    marginHorizontal: 10,
    backgroundColor: 'grey',
    height: 120,
    flex: 0.5,
    marginBottom: 25,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  name: {
    color: 'white',
    top: 10,
    left: 10,
  },
  pokeball: {
    width: 100,
    height: 100,
    right: -25,
    top: -25,
    opacity: 0.4,
  },
  pokemonImage: {
    width: 120,
    height: 120,
    position: 'absolute',
    right: -15,
    top: -30,
  },

  pokeballContainer: {
    alignItems: 'flex-end',
    width: '100%',
    position: 'absolute',

    overflow: 'hidden',
    opacity: 0.5,
  },

  // Botón de favoritos
  favoriteButton: {
      position: 'absolute',
      top: 65,
      left: 10,
      zIndex: 1,
  },
  heartIcon: {
      width: 20,
      height: 20,
      tintColor: 'white',
  },
});