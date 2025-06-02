import axios from "axios";

export const API_URL ='http://localhost:5570' //https://ksenkapi.ru/apimobile

export const myAxios = axios.create({
    baseURL:`${API_URL}/api`
})