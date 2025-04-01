import axios from "axios";

export const createCategory = (form, token) => {
  return axios.post("http://localhost:5003/createcategory", form, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const deleteCategory = (id, token) => {
  return axios.delete("http://localhost:5003/deletecategory/" + id, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const updateCategory = (form, id, token) => {
  return axios.put(
    "http://localhost:5003/updatecategory/" + id,
    { categoryName: form },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};
