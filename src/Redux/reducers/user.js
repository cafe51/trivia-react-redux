// Esse reducer será responsável por tratar as informações da pessoa usuária
import { LOG_IN_SUCCESS, RIGHT_ANSWER } from '../actions';

const INITIAL_STATE = {
  gravatarEmail: '',
  name: '',
  score: 0,
  assertions: 0,
};

// Mude esse reducer para algo que faça sentido com o seu projeto;
// Lembrando que ele pode ficar em outro arquivo também;
const loginReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case LOG_IN_SUCCESS:
    return {
      ...state,
      gravatarEmail: action.payload.email,
      name: action.payload.name,
    };
  case RIGHT_ANSWER:
    return {
      ...state,
      score: action.payload + state.score,
      assertions: state.assertions + 1,
    };
  default:
    return state;
  }
};

export default loginReducer;
