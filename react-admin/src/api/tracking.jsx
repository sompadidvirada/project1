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

export const updateTrackSell = (form, token) => {
  return axios.post("http://localhost:5003/updatetracksell", form, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const updateTrackSend = (form, token) => {
  return axios.post("http://localhost:5003/updatetracksend", form, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const updateTrackExp = (form, token) => {
  return axios.post("http://localhost:5003/updatetrackexp", form, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const getTotalSell = (date, token) => {
  return axios.post("http://localhost:5003/totalsell", date, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const getDataLineChart = (date, token) => {
  return axios.post("http://localhost:5003/getdataline", date, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const getDataPieChart = (data, token) => {
  return axios.post("http://localhost:5003/getdatapiechart", data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const deleteAllTrackSell = (form, token) => {
  return axios.post("http://localhost:5003/deletealltracksell", form, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const deleteAllTrackSend = (form, token) => {
  return axios.post("http://localhost:5003/deletealltracksend", form, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const deleteAllTrackEXP = (form, token) => {
  return axios.post("http://localhost:5003/deletealltrackexp", form, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};