import { default as api } from 'axios';

const confirm_email_call = (token, setResponse) => {

  api
    .post(
      '/api/v1/email_confirmation',
      {
        token: token,
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

export default confirm_email_call;
