import axios from 'axios';
import { setAlert } from './alert';

//GET current users profile

export const getCurrentProfile = () => {
  return async (dispatch) => {
    console.log('++++++++++++++++++++++==');
    try {
      const res = await axios.get('/api/profile/me');
      dispatch({
        type: 'GET_PROFILE',
        payload: res.data,
      });
    } catch (err) {
      dispatch({
        type: 'PROFILE_ERROR',
        payload: { msg: err.response.statusText, status: err.response.status },
      });
    }
  };
};
//Get all profiles
export const getProfiles = () => {
  return async (dispatch) => {
    dispatch({ type: 'CLEAR_PROFILE' });
    try {
      dispatch({ type: 'SET_LOADING' });
      const res = await axios.get('/api/profile');
      dispatch({
        type: 'GET_PROFILES',
        payload: res.data,
      });
    } catch (err) {
      console.log(err);
      dispatch({
        type: 'PROFILE_ERROR',
        payload: { msg: err.response.statusText, status: err.response.status },
      });
    }
  };
};
//Get profile by ID
export const getProfileById = (userId) => {
  return async (dispatch) => {
    try {
      const res = await axios.get(`/api/profile/user/${userId}`);
      dispatch({
        type: 'GET_PROFILE',
        payload: res.data,
      });
    } catch (err) {
      dispatch({
        type: 'PROFILE_ERROR',
        payload: { msg: err.response.statusText, status: err.response.status },
      });
    }
  };
};
//Get Github repos
export const getGithubRepos = (username) => {
  return async (dispatch) => {
    try {
      const res = await axios.get(`/api/profile/github/${username}`);
      dispatch({
        type: 'GET_REPOS',
        payload: res.data,
      });
    } catch (err) {
      dispatch({
        type: 'PROFILE_ERROR',
        payload: { msg: err.response.statusText, status: err.response.status },
      });
    }
  };
};
//CREATE or UPDATE a profile

export const createProfile = (formdata, history, edit = false) => async (
  dispatch
) => {
  dispatch({ type: 'CLEAR_PROFILE' });
  try {
    const res = await axios.post('/api/profile', formdata);
    dispatch({
      type: 'GET_PROFILE',
      payload: res.data,
    });
    dispatch(setAlert(edit ? 'Profile Updated' : 'Profile created', 'success'));
    if (!edit) {
      history.push('/dashboard');
    }
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((error) => {
        dispatch(setAlert(error.msg, 'danger'));
      });
    }
    dispatch({
      type: 'PROFILE_ERROR',
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

//Add Experience

export const addExperience = (formdata, history) => async (dispatch) => {
  try {
    const res = await axios.put('/api/profile/experience', formdata);
    dispatch({
      type: 'UPDATE_PROFILE',
      payload: res.data,
    });
    dispatch(setAlert('Experience Added', 'success'));
    history.push('/dashboard');
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((error) => {
        dispatch(setAlert(error.msg, 'danger'));
      });
    }
    dispatch({
      type: 'PROFILE_ERROR',
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

//Add Education
export const addEducation = (formdata, history) => async (dispatch) => {
  try {
    const res = await axios.put('/api/profile/education', formdata);
    dispatch({
      type: 'UPDATE_PROFILE',
      payload: res.data,
    });
    dispatch(setAlert('Education Added', 'success'));
    history.push('/dashboard');
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((error) => {
        dispatch(setAlert(error.msg, 'danger'));
      });
    }
    dispatch({
      type: 'PROFILE_ERROR',
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

//Delete experience

export const deleteExperience = (id) => async (dispatch) => {
  try {
    const res = await axios.delete(`/api/profile/experience/${id}`);
    dispatch({
      type: 'UPDATE_PROFILE',
      payload: res.data,
    });
    dispatch(setAlert('Experience removed', 'success'));
  } catch (err) {
    dispatch({
      type: 'PROFILE_ERROR',
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

//Delete education

export const deleteEducation = (id) => async (dispatch) => {
  try {
    const res = await axios.delete(`/api/profile/education/${id}`);
    dispatch({
      type: 'UPDATE_PROFILE',
      payload: res.data,
    });
    dispatch(setAlert('Education removed', 'success'));
  } catch (err) {
    dispatch({
      type: 'PROFILE_ERROR',
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

//Delete account & profile
export const deleteAccount = () => async (dispatch) => {
  if (window.confirm('Are u sure? This can not be undone')) {
    try {
      const res = await axios.delete(`/api/profile/`);
      dispatch({
        type: 'CLEAR_PROFILE',
      });
      dispatch({
        type: 'ACCOUNT_DELETED',
      });
      dispatch(setAlert('Ur account has been deleted', 'success'));
    } catch (err) {
      dispatch({
        type: 'PROFILE_ERROR',
        payload: { msg: err.response.statusText, status: err.response.status },
      });
    }
  }
};
