import { LOG_IN_SUCCESS, RIGHT_ANSWER, NEXT_QUESTION,
  SEND_ARRAY_ANSWERS } from '../actions';

const INITIAL_STATE = {
  gravatarEmail: '',
  name: '',
  score: 0,
  assertions: 0,
  question: 0,
  answers: [],
};

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
  case NEXT_QUESTION:
    return {
      ...state,
      question: state.question + 1,
    };
  case SEND_ARRAY_ANSWERS:
    return {
      ...state,
      answers: action.payload,
    };

  default:
    return state;
  }
};

export default loginReducer;
