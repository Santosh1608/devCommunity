import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';
import { deleteComment } from '../../actions/post';
class CommentItem extends Component {
  render() {
    return (
      <div class='post bg-white p-1 my-1'>
        <div>
          <Link to={`/profile/${this.props.comment.user}`}>
            <img class='round-img' src={this.props.comment.avatar} alt='' />
            <h4>{this.props.comment.name}</h4>
          </Link>
        </div>
        <div>
          <p class='my-1'>{this.props.comment.text}</p>
          <p class='post-date'>
            Posted on{' '}
            <Moment format='YYYY/MM/DD'>{this.props.comment.date}</Moment>
          </p>
          {this.props.auth.user._id === this.props.comment.user && (
            <button
              onClick={(e) =>
                this.props.deleteComment(
                  this.props.postId,
                  this.props.comment._id
                )
              }
              className='btn btn-danger'
              type='button'
            >
              <i className='fas fa-times'></i>
            </button>
          )}
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    auth: state.auth,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    deleteComment: (postId, commentId) =>
      dispatch(deleteComment(postId, commentId)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(CommentItem);
