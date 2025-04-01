import axios from "axios";

export const tracksell = (form, token) => {
  return axios.post("http://localhost:5003/tracksell", form, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const tracksend = (form, token) => {
  return axios.post("http://localhost:5003/tracksend", form, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const trackexp = (form, token) => {
  return axios.post("http://localhost:5003/trackexp", form, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const checkTrackSell = (form, token) => {
  return axios.post("http://localhost:5003/checktracksell", form, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
export const checkTrackSend = (form, token) => {
  return axios.post("http://localhost:5003/checktracksend", form, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
export const checkTrackExp = (form, token) => {
  return axios.post("http://localhost:5003/checktrackexp", form, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const updateTrackSell = (id, form, token) => {
  return axios.put("http://localhost:5003/updatetracksell/" + id, form, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const updateTrackSend = (id, form, token) => {
  return axios.put("http://localhost:5003/updatetracksend/" + id, form, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const updateTrackExp = (id, form, token) => {
  return axios.put("http://localhost:5003/updatetrackexp/" + id, form, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const getTotalSell = (date, token) => {
  return axios.post('http://localhost:5003/totalsell', date, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
}

export const getDataLineChart = (date, token) => {
  return axios.post('http://localhost:5003/getdataline', date, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
}