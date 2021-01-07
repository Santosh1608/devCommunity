import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { setAlert } from '../../actions/alert';
import { register } from '../../actions/auth';
class Register extends Component {
  state = {
    name: '',
    email: '',
    password: '',
    password2: '',
  };
  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };
  onSubmit = async (e) => {
    e.preventDefault();
    if (this.state.password !== this.state.password2) {
      console.log('Passwords do not match');
      this.props.setAlert('Passwords do not match', 'danger');
    } else {
      console.log('SUCCESS');
      this.props.register({
        name: this.state.name,
        email: this.state.email,
        password: this.state.password,
      });
    }
  };
  render() {
    if (this.props.isAuthenticated) {
      return <Redirect to='/dashboard' />;
    }
    return (
      <>
        <h1 className='large text-primary'>Sign Up</h1>
        <p className='lead'>
          <i className='fas fa-user'></i> Create Your Account
        </p>
        <form className='form' onSubmit={this.onSubmit}>
          <div className='form-group'>
            <input
              type='text'
              placeholder='Name'
              name='name'
              value={this.state.name}
              onChange={this.onChange}
              //   required
            />
          </div>
          <div className='form-group'>
            <input
              value={this.state.email}
              onChange={this.onChange}
              type='email'
              placeholder='Email Address'
              name='email'
              //   required
            />
            <small className='form-text'>
              This site uses Gravatar so if you want a profile image, use a
              Gravatar email
            </small>
          </div>
          <div className='form-group'>
            <input
              value={this.state.password}
              onChange={this.onChange}
              type='password'
              placeholder='Password'
              name='password'
              //   minLength='6'
            />
          </div>
          <div className='form-group'>
            <input
              value={this.state.password2}
              onChange={this.onChange}
              type='password'
              placeholder='Confirm Password'
              name='password2'
              //   minLength='6'
            />
          </div>
          <input type='submit' className='btn btn-primary' value='Register' />
        </form>
        <p className='my-1'>
          Already have an account? <Link to='/login'>Sign In</Link>
        </p>
      </>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.isAuthenticated,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    setAlert: (msg, alertType) => {
      dispatch(setAlert(msg, alertType));
    },
    register: (registerData) => {
      dispatch(register(registerData));
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Register);
