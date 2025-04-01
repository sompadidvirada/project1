import axios from 'axios'

export const getDateSell = (form) => {
    return axios.post('http://localhost:5003/getDatesell', form)
}