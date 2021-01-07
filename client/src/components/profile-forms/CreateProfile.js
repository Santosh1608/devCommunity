import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { createProfile } from '../../actions/profile';
class CreateProfile extends Component {
  state = {
    formData: {
      company: '',
      website: '',
      location: '',
      status: '',
      skills: '',
      githubusername: '',
      bio: '',
      twitter: '',
      facebook: '',
      linkedin: '',
      youtube: '',
      instagram: '',
    },
    displaySocialInputs: false,
  };
  toggleSocialInputs = () => {
    this.setState((prevState) => {
      this.setState({ displaySocialInputs: !prevState.displaySocialInputs });
    });
  };
  onChange = (e) => {
    const dupFormData = { ...this.state.formData };
    dupFormData[e.target.name] = e.target.value;
    this.setState({ formData: dupFormData });
  };
  onSubmit = (e) => {
    e.preventDefault();
    this.props.createProfile(this.state.formData, this.props.history);
  };
  render() {
    return (
      <>
        {' '}
        <h1 class='large text-primary'>Create Your Profile</h1>
        <p class='lead'>
          <i class='fas fa-user'></i> Let's get some information to make your
          profile stand out
        </p>
        <small>* = required field</small>
        <form class='form' onSubmit={this.onSubmit}>
          <div class='form-group'>
            <select
              name='status'
              value={this.state.status}
              onChange={this.onChange}
            >
              <option value='0'>* Select Professional Status</option>
              <option value='Developer'>Developer</option>
              <option value='Junior Developer'>Junior Developer</option>
              <option value='Senior Developer'>Senior Developer</option>
              <option value='Manager'>Manager</option>
              <option value='Student or Learning'>Student or Learning</option>
              <option value='Instructor'>Instructor or Teacher</option>
              <option value='Intern'>Intern</option>
              <option value='Other'>Other</option>
            </select>
            <small class='form-text'>
              Give us an idea of where you are at in your career
            </small>
          </div>
          <div class='form-group'>
            <input
              type='text'
              placeholder='Company'
              name='company'
              value={this.state.company}
              onChange={this.onChange}
            />
            <small class='form-text'>
              Could be your own company or one you work for
            </small>
          </div>
          <div class='form-group'>
            <input
              type='text'
              placeholder='Website'
              name='website'
              value={this.state.website}
              onChange={this.onChange}
            />
            <small class='form-text'>
              Could be your own or a company website
            </small>
          </div>
          <div class='form-group'>
            <input
              type='text'
              placeholder='Location'
              name='location'
              value={this.state.location}
              onChange={this.onChange}
            />
            <small class='form-text'>
              City & state suggested (eg. Boston, MA)
            </small>
          </div>
          <div class='form-group'>
            <input
              type='text'
              placeholder='* Skills'
              name='skills'
              value={this.state.skills}
              onChange={this.onChange}
            />
            <small class='form-text'>
              Please use comma separated values (eg. HTML,CSS,JavaScript,PHP)
            </small>
          </div>
          <div class='form-group'>
            <input
              type='text'
              placeholder='Github Username'
              name='githubusername'
              value={this.state.githubusername}
              onChange={this.onChange}
            />
            <small class='form-text'>
              If you want your latest repos and a Github link, include your
              username
            </small>
          </div>
          <div class='form-group'>
            <textarea
              placeholder='A short bio of yourself'
              name='bio'
              value={this.state.bio}
              onChange={this.onChange}
            ></textarea>
            <small class='form-text'>Tell us a little about yourself</small>
          </div>

          <div class='my-2'>
            <button
              onClick={this.toggleSocialInputs}
              type='button'
              class='btn btn-light'
            >
              Add Social Network Links
            </button>
            <span>Optional</span>
          </div>
          {this.state.displaySocialInputs && (
            <>
              <div class='form-group social-input'>
                <i class='fab fa-twitter fa-2x'></i>
                <input
                  type='text'
                  placeholder='Twitter URL'
                  name='twitter'
                  value={this.state.twitter}
                  onChange={this.onChange}
                />
              </div>

              <div class='form-group social-input'>
                <i class='fab fa-facebook fa-2x'></i>
                <input
                  type='text'
                  placeholder='Facebook URL'
                  name='facebook'
                  value={this.state.facebook}
                  onChange={this.onChange}
                />
              </div>

              <div class='form-group social-input'>
                <i class='fab fa-youtube fa-2x'></i>
                <input
                  type='text'
                  placeholder='YouTube URL'
                  name='youtube'
                  value={this.state.youtube}
                  onChange={this.onChange}
                />
              </div>

              <div class='form-group social-input'>
                <i class='fab fa-linkedin fa-2x'></i>
                <input
                  type='text'
                  placeholder='Linkedin URL'
                  name='linkedin'
                  value={this.state.linkedin}
                  onChange={this.onChange}
                />
              </div>

              <div class='form-group social-input'>
                <i class='fab fa-instagram fa-2x'></i>
                <input
                  type='text'
                  placeholder='Instagram URL'
                  name='instagram'
                  value={this.state.instagram}
                  onChange={this.onChange}
                />
              </div>
            </>
          )}

          <input type='submit' class='btn btn-primary my-1' />
          <Link class='btn btn-light my-1' to='/dashboard'>
            Go Back
          </Link>
        </form>
      </>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    createProfile: (formData, history) => {
      console.log(formData);
      return dispatch(createProfile(formData, history));
    },
  };
};

export default connect(null, mapDispatchToProps)(withRouter(CreateProfile));
