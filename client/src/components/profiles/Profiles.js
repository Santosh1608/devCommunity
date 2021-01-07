import React, { Component } from 'react';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import { getProfiles } from '../../actions/profile';
import ProfileItem from './ProfileItem';
class Profiles extends Component {
  componentDidMount() {
    this.props.getProfiles();
  }
  render() {
    return (
      <>
        {this.props.profile.loading ? (
          <Spinner />
        ) : (
          <>
            <h1 className='large text-primary'>Developers</h1>
            <p className='lead'>
              <i className='fab fa-connectdevelop'></i>Browse and connect with
              developers
            </p>
            <div className='profiles'>
              {this.props.profile.profiles.length > 0 ? (
                this.props.profile.profiles.map((profile) => (
                  <ProfileItem key={profile._id} profile={profile} />
                ))
              ) : (
                <h4>No profiles Found...</h4>
              )}
            </div>
          </>
        )}
      </>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    profile: state.profile,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    getProfiles: () => dispatch(getProfiles()),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Profiles);
