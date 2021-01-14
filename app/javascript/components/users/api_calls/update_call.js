import { default as api } from 'axios';

const update_call = (object, type, call, url, setResponse) => {
  const params = {

  }

  params[type] = object

  switch (call) {
    case 'patch':
      api
        .patch(
          url, params, { withCredentials: true }
        )
        .then(response => {
          setResponse(response.data);
        })
        .catch(() => {
          setResponse('Internal Server Error');
        })
      ;
      break;
    default:
      console.log('There was an issue');
      break;
  }  
  
};

export default update_call;
