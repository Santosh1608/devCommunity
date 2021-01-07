import axios from 'axios';
import { setAlert } from './alert';
// Get POSTS

export const getPosts = () => async (dispatch) => {
  try {
    const res = await axios.get('/api/posts');
    console.log(res);
    dispatch({
      type: 'GET_POSTS',
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: 'POST_ERROR',
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

//ADD LIKE
export const addLike = (postId) => async (dispatch) => {
  try {
    const res = await axios.put(`/api/posts/like/${postId}`);
    dispatch({
      type: 'UPDATE_LIKES',
      payload: { id: postId, likes: res.data },
    });
  } catch (err) {
    dispatch({
      type: 'POST_ERROR',
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

//REMOVE LIKE
export const removeLike = (postId) => async (dispatch) => {
  try {
    const res = await axios.put(`/api/posts/unlike/${postId}`);
    dispatch({
      type: 'UPDATE_LIKES',
      payload: { id: postId, likes: res.data },
    });
  } catch (err) {
    dispatch({
      type: 'POST_ERROR',
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

//DELETE POST
export const deletePost = (postId) => async (dispatch) => {
  try {
    const res = await axios.delete(`/api/posts/${postId}`);
    dispatch({
      type: 'DELETE_POST',
      payload: postId,
    });
    dispatch(setAlert('Post Removed', 'success'));
  } catch (err) {
    dispatch({
      type: 'POST_ERROR',
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

//ADD POST
export const addPost = (formData) => async (dispatch) => {
  try {
    const res = await axios.post(`/api/posts`, formData);
    console.log(res);
    dispatch({
      type: 'ADD_POST',
      payload: res.data,
    });
    dispatch(setAlert('Post Created', 'success'));
  } catch (err) {
    dispatch({
      type: 'POST_ERROR',
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

//GET POST
export const getPost = (id) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/posts/${id}`);
    dispatch({
      type: 'GET_POST',
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: 'POST_ERROR',
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

//ADD comment
export const addComment = (postId, formData) => async (dispatch) => {
  try {
    const res = await axios.post(`/api/posts/comment/${postId}`, formData);
    console.log(res);
    dispatch({
      type: 'ADD_COMMENT',
      payload: res.data,
    });
    dispatch(setAlert('Comment added', 'success'));
  } catch (err) {
    dispatch({
      type: 'POST_ERROR',
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

//DELETE comment
export const deleteComment = (postId, commentId) => async (dispatch) => {
  try {
    const res = await axios.delete(`/api/posts/comment/${postId}/${commentId}`);
    console.log(res);
    dispatch({
      type: 'REMOVE_COMMENT',
      payload: commentId,
    });
    dispatch(setAlert('Comment removed', 'success'));
  } catch (err) {
    dispatch({
      type: 'POST_ERROR',
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};
