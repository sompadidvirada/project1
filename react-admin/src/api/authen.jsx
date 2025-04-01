import axios from "axios";

export const currentUser = async (token) =>
  await axios.post(
    "http://localhost:5003/current-user",
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

export const currentAdmin = async (token) => {
  return await axios.post(
    "http://localhost:5003/current-admin",
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

export const updateBasicUser = async (id, form, token) => {
  return axios.put("http://localhost:5003/updatefromuser/" + id, form, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
}