import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { addEducation } from '../../actions/profile';
class AddEducation extends Component {
  state = {
    formData: {
      fieldofstudy: '',
      degree: '',
      school: '',
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
        <h1 class='large text-primary'>Add Your Education</h1>
        <p class='lead'>
          <i class='fas fa-code-branch'></i> Add any school/college positions
          that you have had in the past
        </p>
        <small>* = required field</small>
        <form
          class='form'
          onSubmit={(e) => {
            e.preventDefault();
            this.props.addEducation(this.state.formData, this.props.history);
          }}
        >
          <div class='form-group'>
            <input
              value={this.state.formData.degree}
              onChange={this.onChange}
              type='text'
              placeholder='* Degree'
              name='degree'
              required
            />
          </div>
          <div class='form-group'>
            <input
              value={this.state.formData.school}
              onChange={this.onChange}
              type='text'
              placeholder='* School'
              name='school'
              required
            />
          </div>
          <div class='form-group'>
            <input
              value={this.state.formData.fieldofstudy}
              onChange={this.onChange}
              type='text'
              placeholder='FieldOfStudy'
              name='fieldofstudy'
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
              Current School
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
              placeholder='Program Description'
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
    addEducation: (formData, history) =>
      dispatch(addEducation(formData, history)),
  };
};

export default connect(null, mapDispatchToProps)(AddEducation);
