import { animalsApi } from "../config/api/animalsApi";
import { Animals } from "../domain/entities/animals";
import { animAPIanimals } from "../infrastructure/interfaces/animalsApi.interfaces";
import { AnimalsMapper } from "../infrastructure/mappers/animals.mapper";

export const getAnimalsById = async(id: number): Promise<Animals> => {
    try{

        const {data} = await animalsApi.get<animAPIanimals>(`/pokemon/${id}`);
        const animals = await AnimalsMapper.animaApiAnimalsToEntity(data);

        return animals;
        
    }catch(error){
        throw new Error(`Error getting pokemon by id: ${id}`);
    }
}