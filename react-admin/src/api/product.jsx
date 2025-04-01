import axios from "axios";

export const createProduct = (form, token) => {
  return axios.post("http://localhost:5003/createproduct", form , {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const updateProduct = (id, form, token) => {
  return axios.put("http://localhost:5003/updateproduct/" + id, form, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const getProduct = (token) => {
  return axios.get("http://localhost:5003/getproducts", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const deleteProduct = (id, token) => {
  return axios.delete("http://localhost:5003/deleteproduct/" + id, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
