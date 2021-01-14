import { default as api } from 'axios';

const update_call = (field, setResponse) => {
  let { username, email, password, password_confirmation } = field;

  console.log('calling api...');

  // for (let i = 0; i < array.length; i++) {
  //   const element = array[i];
    
  // }
  // api
  //   .patch(
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
  //     setResponse(response)
  //   })
  //   .catch(() => {
  //     setResponse('Server error')
  //   })
  // ;
};

export default update_call;
