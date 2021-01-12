import { default as api } from 'axios';

const login_call = (field, setResponse, handleLogin) => {
  const { email, password } = field;

  api
    .post(
      '/api/v1/sessions',
      {
        user: {
          email: email,
          password: password,
        },
      },
      { withCredentials: true }
    )
    .then(response => {
      setResponse(response.data.status);
      handleLogin();
    })
    .catch(() => {
      setResponse('Internal server error');
    })
  ;
};

export default login_call;