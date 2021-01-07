import React, { Component } from 'react';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import { Link } from 'react-router-dom';
import { getProfileById } from '../../actions/profile';
import ProfileTop from './ProfileTop';
import ProfileAbout from './ProfileAbout';
import ProfileExperience from './ProfileExperience';
import ProfileEducation from './ProfileEducation';
import ProfileGithub from './ProfileGithub';
class Profile extends Component {
  componentDidMount() {
    this.props.getProfileById(this.props.match.params.id);
  }
  render() {
    return (
      <>
        {this.props.profile.profile === null || this.props.profile.loading ? (
          <Spinner />
        ) : (
          <>
            <Link to='/profiles' className='btn btn-light'>
              Back to profiles
            </Link>
            {this.props.auth.isAuthenticated &&
              this.props.auth.loading === false &&
              this.props.auth.user._id ===
                this.props.profile.profile.user._id && (
                <Link to='/edit-profile' className='btn btn-dark'>
                  Edit profile
                </Link>
              )}
            <div class='profile-grid my-1'>
              <ProfileTop profile={this.props.profile.profile} />
              <ProfileAbout profile={this.props.profile.profile} />
              <div className='profile-exp bg-white p-2'>
                <h2 className='text-primary'>Experience</h2>
                {this.props.profile.profile.experience.length > 0 ? (
                  <>
                    {this.props.profile.profile.experience.map((experience) => (
                      <ProfileExperience
                        key={experience._id}
                        experience={experience}
                      />
                    ))}
                  </>
                ) : (
                  <h4>No experience credentials</h4>
                )}
              </div>
              <div className='profile-edu bg-white p-2'>
                <h2 className='text-primary'>Education</h2>
                {this.props.profile.profile.education.length > 0 ? (
                  <>
                    {this.props.profile.profile.education.map((education) => (
                      <ProfileEducation
                        key={education._id}
                        education={education}
                      />
                    ))}
                  </>
                ) : (
                  <h4>No education credentials</h4>
                )}
              </div>
              {this.props.profile.profile.githubusername && (
                <ProfileGithub
                  username={this.props.profile.profile.githubusername}
                />
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
    auth: state.auth,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    getProfileById: (id) => dispatch(getProfileById(id)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Profile);
