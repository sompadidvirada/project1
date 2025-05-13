import axios from "axios";

export const createUser = (form, token) => {
  return axios.post(`${process.env.REACT_APP_API_URL}/createuser`, form, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
};

export const getAllUser = (token) => {
  return axios.get(`${process.env.REACT_APP_API_URL}/getalluser`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const updateUserRole = (userId, newRole, token) => {
  return axios.put(
    `${process.env.REACT_APP_API_URL}/updaterole` + userId,
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
    `${process.env.REACT_APP_API_URL}/updatestatus` + userId,
    { newStatus },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};
