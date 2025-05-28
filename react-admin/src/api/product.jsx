import axios from "axios";

export const createProduct = (form, token) => {
  return axios.post(`${process.env.REACT_APP_API_URL}/createproduct`, form, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const updateProduct = (id, form, token) => {
  return axios.put(
    `${process.env.REACT_APP_API_URL}/updateproduct/` + id,
    form,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

export const getProduct = (token) => {
  return axios.get(`${process.env.REACT_APP_API_URL}/getproducts`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const deleteProduct = (id, token) => {
  return axios.delete(`${process.env.REACT_APP_API_URL}/deleteproduct/` + id, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const updateStatusProduct = (id,form) => {
  return axios.put(`${process.env.REACT_APP_API_URL}/updateaviable/${id}`, form);
};
