const initialState = {
  profile: null,
  profiles: [],
  repos: [],
  loading: true,
  error: {},
};

export default function (state = initialState, action) {
  switch (action.type) {
    case 'GET_PROFILE':
    case 'UPDATE_PROFILE':
      return {
        ...state,
        profile: action.payload,
        loading: false,
      };
    case 'GET_PROFILES':
      return {
        ...state,
        profiles: action.payload,
        loading: false,
      };
    case 'CLEAR_PROFILE':
      return {
        ...state,
        profile: null,
        repos: [],
        loading: false,
      };
    case 'PROFILE_ERROR':
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    case 'GET_REPOS':
      return {
        ...state,
        repos: action.payload,
        loading: false,
      };
    case 'SET_LOADING':
      return {
        ...state,
        loading: true,
      };
    default:
      return state;
  }
}
