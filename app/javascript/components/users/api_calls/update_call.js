import { default as api } from 'axios';

const update_call = (field, setResponse) => {
  console.log('update call');
  const { username, email, password, password_confirmation } = field;

  api
    .patch(
      '/api/v1/users',
      {
        user: {
          username: username,
          email: email,
          password: password,
          password_confirmation: password_confirmation,
        },
      },
      { withCredentials: true }
    )
    .then(response => {
      console.log(response);
    })
    .catch(error => {
      console.log('registration error', error);
    })
  ;
};

export default update_call;
