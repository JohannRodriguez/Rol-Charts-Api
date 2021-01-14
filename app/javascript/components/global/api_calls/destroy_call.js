import { default as api } from 'axios';

const destroy_call = (path, id, setResponse) => {
  api
    .delete(
      `/api/v1/${path}/${id}`,
      { withCredentials: true }
    )
    .then(response => {
      console.log(response);
      setResponse(response.data.status);
    })
    .catch(() => {
      
    })
  ;
}

export default destroy_call;
