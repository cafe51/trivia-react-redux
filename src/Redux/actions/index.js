export const LOG_IN_SUCCESS = 'LOG_IN_SUCCESS';

export function logInSucces(userData) {
  return {
    type: LOG_IN_SUCCESS,
    payload: userData,
  };
}
