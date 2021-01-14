import { default as api } from 'axios';

const resend_email_call = ({ email } = field,setResponse) => {
  api
    .post(
      '/api/v1/email_resend',
      { user: { email: email}},
      { withCredentials: true }
    )
    .then(response => setResponse(response.data.status))
    .catch(() => setResponse('Internal server error'))
  ;
};

export default resend_email_call;