export const LOG_IN_SUCCES = 'LOG_IN_SUCCES';

export function logInSucces(userData) {
  return {
    type: LOG_IN_SUCCES,
    payload: {
      email: userData.email,
      name: userData.name,
    },
  };
}
