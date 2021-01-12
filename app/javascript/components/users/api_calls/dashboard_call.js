import { default as api } from 'axios';

const dashboard_call = handleLogout => {
  api
    .delete('/api/v1/logout', { withCredentials: true })
    .then(response => {
      console.log(response);
      handleLogout();
    })
    .catch(error => console.log(error))
  ;
};

export default dashboard_call;
