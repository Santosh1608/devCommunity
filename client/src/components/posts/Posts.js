import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getPosts } from '../../actions/post';
import Spinner from '../layout/Spinner';
import PostItem from './PostItem';
import PostForm from './PostForm';
class Posts extends Component {
  componentDidMount() {
    this.props.getPosts();
  }
  render() {
    return this.props.post.loading ? (
      <Spinner />
    ) : (
      <>
        <h1 className='large text-primary'>Posts</h1>
        <p className='lead'>
          <i className='fas fa-user'></i> Welcome to the community
        </p>
        <PostForm />
        {
          <div className='posts'>
            {this.props.post.posts.map((post) => (
              <PostItem key={post._id} post={post} />
            ))}
          </div>
        }
      </>
    );
  }
}
const mapStateToProps = (state) => ({ post: state.post });
const mapDispatchToProps = (dispatch) => {
  return {
    getPosts: () => dispatch(getPosts()),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Posts);
