import { Animals } from "../domain/entities/animals";
import { getAnimalsById } from ".";

export const getAnimalsByIds = async(ids:number[]): Promise<Animals[]> => {
    try{
        const animalsPromises: Promise<Animals>[] = ids.map((id) => {
            return getAnimalsById(id);
        });
        
        return Promise.all(animalsPromises);

    }catch(error){
        throw new Error('Error getting animals by ids: ${ids}');
    }
}