import axios from "axios";



const BASE_URL = "http://192.168.1.8:5003";

export const createProduct = (form, token) => {
  return axios.post(`${BASE_URL}/createproduct`, form , {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const updateProduct = (id, form, token) => {
  return axios.put(`${BASE_URL}/updateproduct/` + id, form, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const getProduct = (token) => {
  return axios.get(`${BASE_URL}/getproducts`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const deleteProduct = (id, token) => {
  return axios.delete(`${BASE_URL}/deleteproduct/` + id, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
