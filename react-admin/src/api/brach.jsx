import axios from "axios";

const BASE_URL = "http://192.168.1.8:5003";

export const createBrach = (form, token) => {
  return axios.post(`${BASE_URL}/createbrach`, form , {
    headers: {
        Authorization: `Bearer ${token}`
    }
  });
};

export const updateBrach = (form, id, token) => {
    return axios.put(`${BASE_URL}/updatebrach/` + id, {brachName: form}, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}

export const deleteBrach = (id, token) => {
    return axios.delete(`${BASE_URL}/deletebrach/` + id, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}