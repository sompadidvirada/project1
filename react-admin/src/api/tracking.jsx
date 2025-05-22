import axios from "axios";


export const tracksell = (form, token) => {
  return axios.post(`${process.env.REACT_APP_API_URL}/tracksell`, form, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const tracksend = (form, token) => {
  return axios.post(`${process.env.REACT_APP_API_URL}/tracksend`, form, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const trackexp = (form, token) => {
  return axios.post(`${process.env.REACT_APP_API_URL}/trackexp`, form, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const checkTrackSell = (form, token) => {
  return axios.post(`${process.env.REACT_APP_API_URL}/checktracksell`, form, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
export const checkTrackSend = (form, token) => {
  return axios.post(`${process.env.REACT_APP_API_URL}/checktracksend`, form, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
export const checkTrackExp = (form, token) => {
  return axios.post(`${process.env.REACT_APP_API_URL}/checktrackexp`, form, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const updateTrackSell = (form, token) => {
  return axios.post(`${process.env.REACT_APP_API_URL}/updatetracksell`, form, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const updateTrackSend = (form, token) => {
  return axios.post(`${process.env.REACT_APP_API_URL}/updatetracksend`, form, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const updateTrackExp = (form, token) => {
  return axios.post(`${process.env.REACT_APP_API_URL}/updatetrackexp`, form, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const getTotalSell = (date, token) => {
  return axios.post(`${process.env.REACT_APP_API_URL}/totalsell`, date, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const getDataLineChart = (date, token) => {
  return axios.post(`${process.env.REACT_APP_API_URL}/getdataline`, date, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const getDataPieChart = (data, token) => {
  return axios.post(`${process.env.REACT_APP_API_URL}/getdatapiechart`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const deleteAllTrackSell = (form, token) => {
  return axios.post(`${process.env.REACT_APP_API_URL}/deletealltracksell`, form, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const deleteAllTrackSend = (form, token) => {
  return axios.post(`${process.env.REACT_APP_API_URL}/deletealltracksend`, form, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const deleteAllTrackEXP = (form, token) => {
  return axios.post(`${process.env.REACT_APP_API_URL}/deletealltrackexp`, form, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const getDataTrack = (date, token) => {
  return axios.post(`${process.env.REACT_APP_API_URL}/datatrack`, date, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const getTotalData = (date, token) => {
  return axios.post(`${process.env.REACT_APP_API_URL}/totaldata`, date, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
