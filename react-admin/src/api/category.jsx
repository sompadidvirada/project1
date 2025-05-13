import axios from "axios";



export const createCategory = (form, token) => {
  return axios.post(`${process.env.REACT_APP_API_URL}/createcategory`, form, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const deleteCategory = (id, token) => {
  return axios.delete(`${process.env.REACT_APP_API_URL}/deletecategory/` + id, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const updateCategory = (form, id, token) => {
  return axios.put(
    `${process.env.REACT_APP_API_URL}/updatecategory/` + id,
    { categoryName: form },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};
