import axios from "axios";


const BASE_URL = "http://192.168.1.8:5003";

export const createUser = (form, token) => {
  return axios.post(`${BASE_URL}/createuser`, form, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
};

export const getAllUser = (token) => {
  return axios.get(`${BASE_URL}/getalluser`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const updateUserRole = (userId, newRole, token) => {
  return axios.put(
    `${BASE_URL}/updaterole` + userId,
    { newRole },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

export const updateUserStatus = (userId, newStatus, token) => {
  return axios.put(
    `${BASE_URL}/updatestatus` + userId,
    { newStatus },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};
