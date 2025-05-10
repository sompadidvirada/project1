import axios from "axios";

const BASE_URL = "http://192.168.1.8:5003";

export const tracksell = (form, token) => {
  return axios.post(`${BASE_URL}/tracksell`, form, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const tracksend = (form, token) => {
  return axios.post(`${BASE_URL}/tracksend`, form, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const trackexp = (form, token) => {
  return axios.post(`${BASE_URL}/trackexp`, form, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const checkTrackSell = (form, token) => {
  return axios.post(`${BASE_URL}/checktracksell`, form, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
export const checkTrackSend = (form, token) => {
  return axios.post(`${BASE_URL}/checktracksend`, form, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
export const checkTrackExp = (form, token) => {
  return axios.post(`${BASE_URL}/checktrackexp`, form, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const updateTrackSell = (form, token) => {
  return axios.post(`${BASE_URL}/updatetracksell`, form, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const updateTrackSend = (form, token) => {
  return axios.post(`${BASE_URL}/updatetracksend`, form, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const updateTrackExp = (form, token) => {
  return axios.post(`${BASE_URL}/updatetrackexp`, form, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const getTotalSell = (date, token) => {
  return axios.post(`${BASE_URL}/totalsell`, date, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const getDataLineChart = (date, token) => {
  return axios.post(`${BASE_URL}/getdataline`, date, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const getDataPieChart = (data, token) => {
  return axios.post(`${BASE_URL}/getdatapiechart`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const deleteAllTrackSell = (form, token) => {
  return axios.post(`${BASE_URL}/deletealltracksell`, form, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const deleteAllTrackSend = (form, token) => {
  return axios.post(`${BASE_URL}/deletealltracksend`, form, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const deleteAllTrackEXP = (form, token) => {
  return axios.post(`${BASE_URL}/deletealltrackexp`, form, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const getDataTrack = (date, token) => {
  return axios.post(`${BASE_URL}/datatrack`, date, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
