import { animalsApi } from "../config/api/animalsApi";
import type{ Animals } from "../domain/entities/animals";
import type{ AnimalsAPIPaginatedResponse } from "../infrastructure/interfaces/animalsApi.interfaces";
import { AnimalsMapper } from "../infrastructure/mappers/animals.mapper";
import { animAPIanimals } from "../infrastructure/interfaces/animalsApi.interfaces";


export const getAnimals = async(
    page: number,
    limit: number=20,
):Promise<Animals[]> => {
 
    try{
        const url =  `/pokemon?offset=${page *limit}&limit=${limit}`;
        const {data} = await animalsApi.get<AnimalsAPIPaginatedResponse>(url);

        const animalsPromises = data.results.map((info) => {
            return animalsApi.get<animAPIanimals>(info.url);
        })

        const animAPIanimals = await Promise.all(animalsPromises);
        const animaPromises = animAPIanimals.map((item) => AnimalsMapper.animaApiAnimalsToEntity(item.data));


        return await Promise.all(animaPromises);
    }catch(error){
        throw new Error('Error getting animals');
    }
};