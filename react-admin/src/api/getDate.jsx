import axios from 'axios'


export const getDateSell = (form, token) => {
    return axios.post(`${process.env.REACT_APP_API_URL}/getDatesell`, form, {
        headers:{
            Authorization: `Bearer ${token}`
        }
    })
}