import axios from "axios";

export const createCalendar = (form) => {
  return axios.post(`${process.env.REACT_APP_API_URL}/createcalendar`, form);
};
export const getCalendar = (id) => {
  return axios.get(`${process.env.REACT_APP_API_URL}/getcalendar/${id}`);
};

export const updateCalendar = (id, form) => {
  return axios.put(
    `${process.env.REACT_APP_API_URL}/updatecalendar/${id}`,
    form
  );
};

export const deleteCalendar = (id) => {
  return axios.delete(`${process.env.REACT_APP_API_URL}/deletecalendar/${id}`);
};

export const getCalendarAdmin = () => {
  return axios.get(`${process.env.REACT_APP_API_URL}/getcalendaradmin`);
};

export const updateSuccessPo = (id, status) => {
  return axios.put(`${process.env.REACT_APP_API_URL}/updatesuccesspo/${id}`, {
    status: status,
  });
};

export const detailUpdate = (id, form) => {
  return axios.put(`${process.env.REACT_APP_API_URL}/detailupdate/${id}`, form);
};
