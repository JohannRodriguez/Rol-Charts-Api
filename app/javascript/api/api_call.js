import axios from 'axios';

const api_call = async (method, url, data = null) => {
  return axios({
    method,
    url,
    data,
    withCredentials: true,
  })
    .then(response => response.data)
    .catch(error => error)
  ;
};

export default api_call;