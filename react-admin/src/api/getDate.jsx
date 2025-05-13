import axios from 'axios'


const BASE_URL = "http://192.168.1.8:5003";

export const getDateSell = (form, token) => {
    return axios.post(`${process.env.REACT_APP_API_URL}/getDatesell`, form, {
        headers:{
            Authorization: `Bearer ${token}`
        }
    })
}