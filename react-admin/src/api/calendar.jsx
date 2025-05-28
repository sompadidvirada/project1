import axios from "axios";

export const createCalendar = (form) => {
    return axios.post(`${process.env.REACT_APP_API_URL}/createcalendar`, form)
}