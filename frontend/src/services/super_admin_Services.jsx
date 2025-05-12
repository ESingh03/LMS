import api from './api';

export const get_All_User_detail = async () => {
  try {
    const response = await api.get('get-user-detail');
    return response.data; 
  } catch (err) {
    const message = err.response?.data?.message || "failed";
    throw new Error(message);
  }
};

export const fetchDesignationsapi = async () => {
    try {
      const res = await api.get('/fetch-designations');
      return res.data;
    } catch (err) {
      const message = err.response?.data?.message || "failed";
    throw new Error(message);
    }
  };