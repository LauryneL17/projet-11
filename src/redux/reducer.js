const initialState = { token: null, user: null };

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'LOGIN':
      return { ...state, token: action.payload.token, user: action.payload.user };
    case 'LOGOUT':
      return { token: null, user: null };
    case 'GETUSER':
      return {
        ...state,
        user: {
          firstName: action.payload.firstName,
          lastName: action.payload.lastName,
          userName: action.payload.userName,
        },
      };
    default:
      return state;
  }
};

export default authReducer;
