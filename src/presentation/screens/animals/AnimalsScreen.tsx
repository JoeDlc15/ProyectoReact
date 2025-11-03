import { FlatList, Image, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { Component, useContext } from 'react'
import { StackScreenProps } from '@react-navigation/stack'
import { RootStackParams } from '../../navigator/StacksNavigator'
import { useQuery } from '@tanstack/react-query'
import { getAnimalsById } from '../../../actions'
import { FullScreenLoader } from '../../components/ui/FullScreenLoader'
import { Formatter } from '../../../config/helpers/formatter'
import { Chip, useTheme } from 'react-native-paper'
import { FadeInImage } from '../../components/ui/FadeInImage'
import { useSafeAreaFrame, useSafeAreaInsets } from 'react-native-safe-area-context'
import { ThemeContext } from '../../context/ThemeContext'

interface Props extends StackScreenProps<RootStackParams, 'AnimalsScreen'> {}

export const AnimalsScreen = ({navigation,route}:Props) => {

    const {isDark} = useContext(ThemeContext);
    const {top} = useSafeAreaInsets();
    const {pokemonId:animalsId} = route.params;

    const animalsImg = isDark
    ? require('../../../assets/animals_dark.png')
    : require('../../../assets/animals_light.png');

    const {isLoading,data:animals} = useQuery({
      queryKey: ['animals',animalsId],
      queryFn: () => getAnimalsById(animalsId),
      staleTime: 1000 * 60 * 60,
    })

    if(!animals){
      return(
        <FullScreenLoader />
      )
    }

    return (
      <ScrollView
      style={ { flex: 1, backgroundColor: animals.color } }
      bounces={ false }
      showsVerticalScrollIndicator={ false }>
      {/* Header Container */ }
      <View style={ styles.headerContainer }>
        {/* Nombre del Pokemon */ }
        <Text
          style={ {
            ...styles.pokemonName,
            top: top + 5,
          } }>
          { Formatter.capitalize( animals.name ) + '\n' }#{ animals.id }
        </Text>

        {/* Pokeball */ }
        <Image source={ animalsImg } style={ styles.pokeball } />

        <FadeInImage uri={ animals.avatar } style={ styles.pokemonImage } />
      </View>

      {/* Types */ }
      <View
        style={ { flexDirection: 'row', marginHorizontal: 20, marginTop: 10 } }>
        { animals.types.map( type => (
          <Chip
            key={ type }
            mode="outlined"
            selectedColor="white"
            style={ { 
              marginLeft: 10, 
              backgroundColor: animals.color + '80', // Color del animal con transparencia
              borderColor: 'white' 
            } }>
            { type }
          </Chip>
        ) ) }
      </View>

      {/* Sprites */ }
      <FlatList
        data={ animals.sprites }
        horizontal
        keyExtractor={ item => item }
        showsHorizontalScrollIndicator={ false }
        centerContent
        style={ {
          marginTop: 20,
          height: 100,
        } }
        renderItem={ ( { item } ) => (
          <FadeInImage
            uri={ item }
            style={ { width: 100, height: 100, marginHorizontal: 5 } }
          />
        ) }
      />


      {/* abilities */}
      <Text style={styles.subTitle}>Abilities</Text>
      <FlatList
        data={animals.abilities}
        horizontal
        keyExtractor={item => item}
        showsHorizontalScrollIndicator={false}
        renderItem={({item}) => (
          <Chip selectedColor="white" 
          style={ { 
              marginLeft: 10, 
              backgroundColor: animals.color + '80', // Color del animal con transparencia
              borderColor: 'white' 
            } }>
              {Formatter.capitalize(item)}</Chip>
        )}
        
      />

      {/* Stats */}
      <Text style={styles.subTitle}>Stats</Text>

      <FlatList
        data={animals.stats}
        keyExtractor={item => item.name}
        horizontal
        showsHorizontalScrollIndicator={false}
        renderItem={({item}) => (
          <View style={styles.statsContainer}>
            <Text style={{flex: 1, color: 'white'}}>
              {Formatter.capitalize(item.name)}
            </Text>
            <Text style={{color: 'white'}}>{item.value}</Text>
          </View>
        )}
      />

      {/* Moves */}
      <Text style={styles.subTitle}>Moves</Text>
      <FlatList
        data={animals.moves}
        horizontal
        showsHorizontalScrollIndicator={false}
        centerContent
        renderItem={({item}) => (
          <View style={styles.statsContainer}>
            <Text style={{flex: 1, color: 'white'}}>
              {Formatter.capitalize(item.name)}
            </Text>
            <Text style={{color: 'white'}}>lvl {item.level}</Text>
          </View>
        )}
      />

      {/* Games */}
      <Text style={styles.subTitle}>Games</Text>
      <FlatList
        data={animals.games}
        horizontal
        keyExtractor={item => item}
        showsHorizontalScrollIndicator={false}
        centerContent
        renderItem={({item}) => (
          <Chip selectedColor="white"
          style={ { 
              marginLeft: 10, 
              backgroundColor: animals.color + '80', // Color del animal con transparencia
              borderColor: 'white' 
            } }>
              {Formatter.capitalize(item)}</Chip>
        )}
      />

      <View style={{height: 100}} />
    </ScrollView>
    )
 
} 



const styles = StyleSheet.create({
  headerContainer: {
    height: 370,
    zIndex: 999,
    alignItems: 'center',
    borderBottomRightRadius: 1000,
    borderBottomLeftRadius: 1000,
    backgroundColor: 'rgba(0,0,0,0.2)',
  },
  pokemonName: {
    color: 'white',
    fontSize: 40,
    alignSelf: 'flex-start',
    left: 20,
  },
  pokeball: {
    width: 250,
    height: 250,
    bottom: -20,
    opacity: 0.7,
  },
  pokemonImage: {
    width: 240,
    height: 240,
    position: 'absolute',
    bottom: -40,
  },
  loadingIndicator: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  subTitle: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    marginHorizontal: 20,
    marginTop: 20,
  },
  statsContainer: {
    flexDirection: 'column',
    marginHorizontal: 20,
    alignItems: 'center',
  },
  
});