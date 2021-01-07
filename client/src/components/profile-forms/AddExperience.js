import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { addExperience } from '../../actions/profile';
class AddExperience extends Component {
  state = {
    formData: {
      location: '',
      title: '',
      company: '',
      from: '',
      to: '',
      current: true,
      description: '',
    },
    toDateDisabled: false,
  };
  onChange = (e) => {
    const updatedForm = { ...this.state.formData };
    if (e.target.name == 'current') {
      updatedForm[e.target.name] = !updatedForm[e.target.name];
      return this.setState({
        formData: updatedForm,
        toDateDisabled: !this.state.toDateDisabled,
      });
    }
    updatedForm[e.target.name] = e.target.value;
    this.setState({ formData: updatedForm });
  };
  render() {
    return (
      <>
        <h1 class='large text-primary'>Add An Experience</h1>
        <p class='lead'>
          <i class='fas fa-code-branch'></i> Add any developer/programming
          positions that you have had in the past
        </p>
        <small>* = required field</small>
        <form
          class='form'
          onSubmit={(e) => {
            e.preventDefault();
            this.props.addExperience(this.state.formData, this.props.history);
          }}
        >
          <div class='form-group'>
            <input
              value={this.state.formData.title}
              onChange={this.onChange}
              type='text'
              placeholder='* Job Title'
              name='title'
              required
            />
          </div>
          <div class='form-group'>
            <input
              value={this.state.formData.company}
              onChange={this.onChange}
              type='text'
              placeholder='* Company'
              name='company'
              required
            />
          </div>
          <div class='form-group'>
            <input
              value={this.state.formData.location}
              onChange={this.onChange}
              type='text'
              placeholder='Location'
              name='location'
            />
          </div>
          <div class='form-group'>
            <h4>From Date</h4>
            <input
              value={this.state.formData.from}
              onChange={this.onChange}
              type='date'
              name='from'
            />
          </div>
          <div class='form-group'>
            <p>
              <input
                checked={this.state.formData.current}
                value={this.state.formData.current}
                onChange={this.onChange}
                type='checkbox'
                name='current'
              />{' '}
              Current Job
            </p>
          </div>
          <div class='form-group'>
            <h4>To Date</h4>
            <input
              value={this.state.formData.to}
              onChange={this.onChange}
              disabled={this.state.toDateDisabled ? 'disabled' : ''}
              type='date'
              name='to'
            />
          </div>
          <div class='form-group'>
            <textarea
              value={this.state.formData.description}
              onChange={this.onChange}
              name='description'
              cols='30'
              rows='5'
              placeholder='Job Description'
            ></textarea>
          </div>
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
    addExperience: (formData, history) =>
      dispatch(addExperience(formData, history)),
  };
};

export default connect(null, mapDispatchToProps)(AddExperience);
