import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addComment } from '../../actions/post';
class CommentForm extends Component {
  state = {
    text: '',
  };
  render() {
    return (
      <div class='post-form'>
        <div class='bg-primary p'>
          <h3>Leave A Comment</h3>
        </div>
        <form
          class='form my-1'
          onSubmit={(e) => {
            e.preventDefault();
            this.props.addComment(this.props.postId, { text: this.state.text });
            this.setState({ text: '' });
          }}
        >
          <textarea
            name='text'
            cols='30'
            rows='5'
            placeholder='Create a comment'
            value={this.state.text}
            onChange={(e) => this.setState({ text: e.target.value })}
            required
          ></textarea>
          <input type='submit' class='btn btn-dark my-1' value='Submit' />
        </form>
      </div>
    );
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    addComment: (postId, commentForm) =>
      dispatch(addComment(postId, commentForm)),
  };
};
export default connect(null, mapDispatchToProps)(CommentForm);
