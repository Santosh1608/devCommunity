import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { login } from '../../actions/auth';
class Login extends Component {
  state = {
    email: '',
    password: '',
  };
  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };
  onSubmit = async (e) => {
    e.preventDefault();
    this.props.login(this.state.email, this.state.password);
    console.log('SUCCESS');
  };
  render() {
    console.log('logging', this.props.isAuthenticated);
    if (this.props.isAuthenticated) {
      return <Redirect to='/dashboard' />;
    }
    return (
      <>
        <h1 className='large text-primary'>Sign In</h1>
        <p className='lead'>
          <i className='fas fa-user'></i> Sign Into Your Account
        </p>
        <form className='form' onSubmit={this.onSubmit}>
          <div className='form-group'>
            <input
              value={this.state.email}
              onChange={this.onChange}
              type='email'
              placeholder='Email Address'
              name='email'
              required
            />
          </div>
          <div className='form-group'>
            <input
              value={this.state.password}
              onChange={this.onChange}
              type='password'
              placeholder='Password'
              name='password'
              minLength='6'
            />
          </div>
          <input type='submit' className='btn btn-primary' value='Login' />
        </form>
        <p className='my-1'>
          Don't have an account? <Link to='/register'>Sign Up</Link>
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
    login: (email, password) => dispatch(login(email, password)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
