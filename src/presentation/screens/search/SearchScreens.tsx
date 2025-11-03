import {  ActivityIndicator, View } from 'react-native'
import { useState } from 'react'
import React, { Component, use, useMemo } from 'react'
import { globalTheme } from '../../../config/theme/global-theme'
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Text,TextInput } from 'react-native-paper';
import { FlatList } from 'react-native-gesture-handler';
import { Animals } from '../../../domain/entities/animals';
import { AnimalsCard } from '../../components/animals/AnimalsCard';
import { useQuery } from '@tanstack/react-query';
import { getAnimalsById, getAnimalsByIds, getAnimalsWithNamesId } from '../../../actions';
import { FullScreenLoader } from '../../components/ui/FullScreenLoader';
import { useDebouncedValue } from '../../hooks/useDebouncedValue';

export const SearchScreens = () => {
  
    const {top} = useSafeAreaInsets();
    const [term, setTerm] = useState('');

    const debouncedValue = useDebouncedValue(term);

    const {isLoading, data:animalNameList = []} = useQuery({
      queryKey: ['animals','all'],
      queryFn: () => getAnimalsWithNamesId(),      
    });

    // Todo: aplicar debounce
    const animalNameIdList = useMemo(() => {
      // Es un número
      if (!isNaN(Number(debouncedValue))){
        const animal = animalNameList.find((animal) => animal.id === Number(debouncedValue));
        return animal ? [animal] : [];
      } 

      if (debouncedValue.length === 0) return [];

      if (debouncedValue.length < 3) return [];

      return animalNameList.filter((animal) => 
        animal.name.toLowerCase().includes(debouncedValue.toLowerCase()));
    }, [debouncedValue])

    const {isLoading:isLoadingAnimals,data:animals =[]} = useQuery({
      queryKey: ['animals','by', animalNameIdList],
      queryFn: () => getAnimalsByIds(animalNameIdList.map((animal) => animal.id)),  
      staleTime: 1000 * 60 * 5, // 5 minutes
    })


    if (isLoading){
      return(<FullScreenLoader/>);
    }


    return (
      <View style={[globalTheme.globalMargin,{paddingTop: top+10}]}>
        <TextInput 
        placeholder='Buscar Animal' 
        mode='flat'
        autoFocus
        autoCorrect={false}
        onChangeText={setTerm}
        value={term}/>

        {isLoadingAnimals && <ActivityIndicator style={{paddingTop:20}}/>}

        
        {/*<Text>{JSON.stringify(animalNameIdList,null,2)}</Text>*/}

        <FlatList
          data={animals}
          keyExtractor={(animal,index) => `${animal.id}-${index}` }
          numColumns={2}
          style={{paddingTop:top + 20}}
          renderItem={({item}) => <AnimalsCard animal={item} />}
          showsHorizontalScrollIndicator={false}
          ListFooterComponent={<View style={{height:120}}/>}
        />
      </View>
    )
 
}