import axios from "axios";


export const createBrach = (form, token) => {
  return axios.post(`${process.env.REACT_APP_API_URL}/createbrach`, form , {
    headers: {
        Authorization: `Bearer ${token}`
    }
  });
};

export const updateBrach = (form, id, token) => {
    return axios.put(`${process.env.REACT_APP_API_URL}/updatebrach/` + id, {brachName: form}, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}

export const deleteBrach = (id, token) => {
    return axios.delete(`${process.env.REACT_APP_API_URL}/deletebrach/` + id, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}