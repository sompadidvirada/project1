import axios from "axios";

export const createBrach = (form, token) => {
  return axios.post("http://localhost:5003/createbrach", form , {
    headers: {
        Authorization: `Bearer ${token}`
    }
  });
};

export const updateBrach = (form, id, token) => {
    return axios.put('http://localhost:5003/updatebrach/' + id, {brachName: form}, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}

export const deleteBrach = (id, token) => {
    return axios.delete('http://localhost:5003/deletebrach/' + id, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}