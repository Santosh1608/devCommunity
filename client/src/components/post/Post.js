import React, { Component } from 'react';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import { getPost } from '../../actions/post';
import PostItem from '../posts/PostItem';
import { Link } from 'react-router-dom';
import CommentForm from './CommentForm';
import CommentItem from './CommentItem';
class Post extends Component {
  componentDidMount() {
    this.props.getPost(this.props.match.params.id);
  }
  render() {
    return this.props.post.loading || this.props.post.post === null ? (
      <Spinner />
    ) : (
      <>
        <Link to='/posts' className='btn'>
          Back To Posts
        </Link>
        <PostItem post={this.props.post.post} showActions={false} />
        <CommentForm postId={this.props.post.post._id} />
        <div className='comments'>
          {this.props.post.post.comments.map((comment) => {
            return (
              <CommentItem
                key={comment._id}
                comment={comment}
                postId={this.props.post.post._id}
              />
            );
          })}
        </div>
      </>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    post: state.post,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    getPost: (id) => dispatch(getPost(id)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Post);
