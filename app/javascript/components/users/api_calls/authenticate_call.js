import { default as api } from 'axios';

const authenticate_call = (field, setResponse) => {
  const { password } = field;
  api
    .post(
      '/api/v1/authenticate',
      {
        user: {
          password: password,
        },
      },
      { withCredentials: true, }
    )
    .then(response => {
      setResponse(response.data.status);
    })
    .catch(() => {
      setResponse('There was an error with this request');
    })
  ;
};

export default authenticate_call;
