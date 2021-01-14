import { default as api } from 'axios';

const register_call = (field, setResponse) => {
  const { username, email, password, password_confirmation } = field;
  console.log('register!');

  // api
  //   .post(
  //     '/api/v1/users',
  //     {
  //       user: {
  //         username: username,
  //         email: email,
  //         password: password,
  //         password_confirmation: password_confirmation,
  //       },
  //     },
  //     { withCredentials: true }
  //   )
  //   .then(response => {
  //     console.log(response);
  //   })
  //   .catch(error => {
  //     console.log('registration error', error);
  //   })
  // ;
};

export default register_call;
