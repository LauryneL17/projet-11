
const initialState = { token: null, user: null };

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'LOGIN':
      return { ...state, token: action.payload.token, user: action.payload.user };
    case 'LOGOUT':
      return { token: null, user: null };
    default:
      return state;
  }
};

export default authReducer;
