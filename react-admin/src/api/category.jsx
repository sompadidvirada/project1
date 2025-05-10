import axios from "axios";


const BASE_URL = "http://192.168.1.8:5003";

export const createCategory = (form, token) => {
  return axios.post(`${BASE_URL}/createcategory`, form, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const deleteCategory = (id, token) => {
  return axios.delete(`${BASE_URL}/deletecategory/` + id, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const updateCategory = (form, id, token) => {
  return axios.put(
    `${BASE_URL}/updatecategory/` + id,
    { categoryName: form },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};
