import { animalsApi } from "../config/api/animalsApi";
import { AnimalsAPIPaginatedResponse } from "../infrastructure/interfaces/animalsApi.interfaces";

export const getAnimalsWithNamesId = async () =>{
    const url = `/pokemon?limit=1000`;
    const {data} = await animalsApi.get<AnimalsAPIPaginatedResponse>(url);

    return data.results.map((info) => ({
        id: Number(info.url.split('/')[6]),
        name: info.name,
    }));
    

}