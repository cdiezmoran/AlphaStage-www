import jwtDecode from 'jwt-decode';

const token = localStorage.getItem('token');
const initialState = token ? jwtDecode(token) : null;

const users = (state = initialState, { type, user, profilePic }) => {
  switch (type) {
    case 'ADD_USER':
      return { ...user };

    case 'REMOVE_USER':
      return null;

    case 'UPDATE_PROFILE_PIC':
      return { ...state, profilePic };

    default:
      return state;
  }
};

export default users;
