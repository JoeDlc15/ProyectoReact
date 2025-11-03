import axios from "axios";

export const animalsApi = axios.create({
    baseURL: 'https://pokeapi.co/api/v2/',
});