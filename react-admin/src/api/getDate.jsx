import axios from 'axios'


export const getDateSell = (form, token) => {
    return axios.post(`${process.env.REACT_APP_API_URL}/getDatesell`, form, {
        headers:{
            Authorization: `Bearer ${token}`
        }
    })
}
export const barChartSend = (form, token) => {
    return axios.post(`${process.env.REACT_APP_API_URL}/barchartsend`, form, {
        headers:{
            Authorization: `Bearer ${token}`
        }
    })
}
export const barChartExp = (form, token) => {
    return axios.post(`${process.env.REACT_APP_API_URL}/barchartexp`, form, {
        headers:{
            Authorization: `Bearer ${token}`
        }
    })
}