import axios from "axios";


export const currentUser = async (token) =>
  await axios.post(
    `${process.env.REACT_APP_API_URL}/current-user`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

export const currentAdmin = async (token) => {
  return await axios.post(
    `${process.env.REACT_APP_API_URL}/current-admin`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

export const updateBasicUser = async (id, form, token) => {
  return axios.put(`${process.env.REACT_APP_API_URL}/updatefromuser/${id}`, form, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
