import axios from 'axios'


const BASE_URL = "http://192.168.1.8:5003";

export const getDateSell = (form, token) => {
    return axios.post(`${BASE_URL}/getDatesell`, form, {
        headers:{
            Authorization: `Bearer ${token}`
        }
    })
}