import axios from "axios";


const BASE_URL = "http://192.168.1.8:5003";

export const currentUser = async (token) =>
  await axios.post(
    `${BASE_URL}/current-user`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

export const currentAdmin = async (token) => {
  return await axios.post(
    `${BASE_URL}/current-admin`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

export const updateBasicUser = async (id, form, token) => {
  return axios.put(`${BASE_URL}/updatefromuser/${id}`, form, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
