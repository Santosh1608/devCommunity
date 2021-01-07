import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addPost } from '../../actions/post';
class PostForm extends Component {
  state = {
    text: '',
  };
  render() {
    return (
      <div class='post-form'>
        <div class='bg-primary p'>
          <h3>ADD POST</h3>
        </div>
        <form
          class='form my-1'
          onSubmit={(e) => {
            e.preventDefault();
            this.props.addPost({ text: this.state.text });
            this.setState({ text: '' });
          }}
        >
          <textarea
            name='text'
            cols='30'
            rows='5'
            placeholder='Create a Post'
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
    addPost: (formData) => dispatch(addPost(formData)),
  };
};
export default connect(null, mapDispatchToProps)(PostForm);
