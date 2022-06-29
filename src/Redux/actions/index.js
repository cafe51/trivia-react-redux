export const LOG_IN_SUCCESS = 'LOG_IN_SUCCESS';
export const RIGHT_ANSWER = 'RIGHT_ANSWER';

export function logInSucces(userData) {
  return {
    type: LOG_IN_SUCCESS,
    payload: userData,
  };
}

export function rightAnswer(points) {
  return {
    type: RIGHT_ANSWER,
    payload: points,
  };
}
