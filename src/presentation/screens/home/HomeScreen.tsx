import {  StyleSheet, View } from 'react-native'
import React, { Component } from 'react'
import { ActivityIndicator, Button,FAB,Text, useTheme  } from 'react-native-paper';
import { useInfiniteQuery, useQuery, useQueryClient } from '@tanstack/react-query';
import { getAnimals } from '../../../actions';
import { AnimalsBg } from '../../components/ui/AnimalsBg';
import { FlatList } from 'react-native-gesture-handler';
import { globalTheme } from '../../../config/theme/global-theme';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { AnimalsCard } from '../../components/animals/AnimalsCard';
import { get } from 'react-native/Libraries/TurboModule/TurboModuleRegistry';
import { RootStackParams } from '../../navigator/StacksNavigator';
import { StackScreenProps } from '@react-navigation/stack';

interface Props extends StackScreenProps<RootStackParams,'HomeScren'>{};

export const HomeScreen = ({navigation}:Props) => {

    const {top} = useSafeAreaInsets();
    const queryClient = useQueryClient();
    const theme = useTheme();

//* Esta es la forma tradicional de una petición http
//    const {isLoading,data:animals=[]} = useQuery({
//      queryKey: ['animals'],
//      queryFn: () => getAnimals(0),
//      staleTime: 1000 * 60 * 60, // 1 hour
//    });

    const {isLoading,data,fetchNextPage} = useInfiniteQuery({
      queryKey: ['animals','infinite'],
      initialPageParam: 0,
      queryFn: async(params) => {
        const animals =await getAnimals(params.pageParam);
        animals.forEach(animal => {
          queryClient.setQueryData(['animal',animal.id], animal)
        });
          return animals;
      },   
      //getNextPageParam: (lastPage, pages) => pages.length,
      getNextPageParam: (lastPage, allPages) => {
          if (!lastPage || lastPage.length < 20) return undefined;
          return allPages.length;
        },
      staleTime: 1000 * 60 * 60, // 1 hour
      
    });

    return (
      <View style={globalTheme.globalMargin}>
        <AnimalsBg style={styles.imgPosition}/>

          <FlatList
            data={data?.pages.flat() ?? []}
            keyExtractor={(animal, index) => `${animal.id}-${index}`}
            numColumns={2}
            style={{ paddingTop: top}}
            /*ListHeaderComponent={() => (
              <Text variant='displayMedium'>Pokédex</Text>
            )} */

            renderItem={({item}) => <AnimalsCard animal={item} />}
            onEndReachedThreshold={0.5}
            onEndReached={() => fetchNextPage()}
            showsVerticalScrollIndicator={false}
          />
          
        {/*
        <FlatList
          data={animals}
          keyExtractor={(animal, index) => `${animal.id}-${index}`}
          numColumns={2}
          style={{ paddingTop: top +20}}
          ListHeaderComponent={() => (
            <Text variant='displayMedium'>Pokedex</Text>
          )} 

          renderItem={({item}) => <AnimalsCard animal={item} />}
          />
           */}

           <FAB
              label="Buscar"
              style={[globalTheme.fab, { backgroundColor: theme.colors.primary }]}
              mode = "elevated"
              color={theme.dark? '#fff' : '#000'}
              onPress={() => navigation.push('SearchScreens')}
           />
      </View>
      
    )
 
}


const styles = StyleSheet.create({
  imgPosition: {
    position: 'absolute',
    top: -100,
    right: -100,
  },
});
