import React, { Component } from 'react';
import { connect } from 'react-redux';
import Moment from 'react-moment';
import { Link } from 'react-router-dom';
import { addLike, removeLike, deletePost } from '../../actions/post';
class PostItem extends Component {
  render() {
    return (
      <div class='post bg-white p-1 my-1'>
        <div>
          <Link to={`/profile/${this.props.post.user}`}>
            <img class='round-img' src={this.props.post.avatar} alt='' />
            <h4>{this.props.post.name}</h4>
          </Link>
        </div>
        <div>
          <p class='my-1'>{this.props.post.text}</p>
          <p class='post-date'>
            Posted on{' '}
            <Moment format='YYYY/MM/DD'>{this.props.post.date}</Moment>
          </p>
          {this.props.showActions && (
            <>
              {' '}
              <button
                onClick={(e) => this.props.addLike(this.props.post._id)}
                type='button'
                class='btn btn-light'
              >
                <i class='fas fa-thumbs-up'> </i>
                <span>
                  {this.props.post.likes.length > 0 &&
                    this.props.post.likes.length}
                </span>
              </button>
              <button
                onClick={(e) => this.props.removeLike(this.props.post._id)}
                type='button'
                class='btn btn-light'
              >
                <i class='fas fa-thumbs-down'></i>
              </button>
              <Link to={`/post/${this.props.post._id}`} class='btn btn-primary'>
                Discussion{' '}
                {this.props.post.comments.length > 0 && (
                  <span class='comment-count'>
                    {this.props.post.comments.length}
                  </span>
                )}
              </Link>
              {this.props.auth.user._id === this.props.post.user && (
                <button
                  onClick={(e) => this.props.deletePost(this.props.post._id)}
                  type='button'
                  class='btn btn-danger'
                >
                  <i class='fas fa-times'></i>
                </button>
              )}
            </>
          )}
        </div>
      </div>
    );
  }
}
PostItem.defaultProps = {
  showActions: true,
};
const mapStateToProps = (state) => {
  return {
    auth: state.auth,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    addLike: (postId) => dispatch(addLike(postId)),
    removeLike: (postId) => dispatch(removeLike(postId)),
    deletePost: (postId) => dispatch(deletePost(postId)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(PostItem);
