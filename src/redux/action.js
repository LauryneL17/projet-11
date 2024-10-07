
export const login = (token, user) => ({
  type: 'LOGIN',
  payload: { token, user },
});

export const logout = () => ({
  type: 'LOGOUT',
});

export const getUser = (firstName, lastName, userName) => ({
  type: 'GETUSER',
  payload :{ firstName, lastName, userName },
});