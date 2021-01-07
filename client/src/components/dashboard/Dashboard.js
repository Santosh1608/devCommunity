import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getCurrentProfile, deleteAccount } from '../../actions/profile';
import Spinner from '../layout/Spinner';
import axios from 'axios';
import { Link } from 'react-router-dom';
import DashboardActions from './DashboardActions';
import Experience from './Experience';
import Education from './Education';

class Dashboard extends Component {
  componentDidMount() {
    axios.defaults.headers.common['x-auth-token'] = localStorage.getItem(
      'token'
    );
    console.log('+++++++++++++++++++');
    this.props.getCurrentProfile();
  }
  render() {
    console.log('dashboard');
    console.log('loading state', this.props.profile.loading);
    return this.props.profile.loading && this.props.profile.profile === null ? (
      <Spinner />
    ) : (
      <>
        <h1 className='large text-primary'>Dashboard</h1>
        <p className='lead'>
          <i className='fas fa-user'></i>Welcome{' '}
          {this.props.auth.user && this.props.auth.user.name}
        </p>
        {this.props.profile.profile !== null ? (
          <>
            <DashboardActions />
            <Experience experience={this.props.profile.profile.experience} />
            <Education education={this.props.profile.profile.education} />
            <div className='my-2'>
              <button
                onClick={() => this.props.deleteAccount()}
                className='btn btn-danger'
              >
                <i className='fas fa-user-minus'></i>Delete My account
              </button>
            </div>
          </>
        ) : (
          <>
            <p>You have not set any profile,please add some info</p>
            <Link to='/create-profile' className='btn btn-primary my-1'>
              CREATE PROFILE
            </Link>
          </>
        )}
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
    profile: state.profile,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    getCurrentProfile: () => dispatch(getCurrentProfile()),
    deleteAccount: () => dispatch(deleteAccount()),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
