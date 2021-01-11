import { default as api } from 'axios';

const authenticate_call = (state, setState) => {
  const { password } = state;
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
      setState({
        ...state,
        response: response.data.status,
      });
    })
    .catch(() => {
      setState({
        ...state,
        response: 'There was an error with this request',
      });
    })
  ;
};

export default authenticate_call;
