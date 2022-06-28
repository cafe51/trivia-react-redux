// Esse reducer será responsável por tratar as informações da pessoa usuária
import { LOG_IN_SUCCES } from '../actions';

const INITIAL_STATE = {
  email: '',
  name: '',
};

// Mude esse reducer para algo que faça sentido com o seu projeto;
// Lembrando que ele pode ficar em outro arquivo também;
const loginReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case LOG_IN_SUCCES:
    return {
      ...state,
      email: action.payload.email,
      name: action.payload.name,
    };
  default:
    return state;
  }
};

export default loginReducer;
