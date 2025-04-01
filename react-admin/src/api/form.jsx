import axios from "axios";

export const createUser = (form) => {
  return axios.post("http://localhost:5003/createuser", form);
};

export const getAllUser = (token) => {
  return axios.get("http://localhost:5003/getalluser", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const updateUserRole = (userId, newRole, token) => {
  return axios.put(
    "http://localhost:5003/updaterole" + userId,
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
    "http://localhost:5003/updatestatus" + userId,
    { newStatus },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};
