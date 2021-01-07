import React, { Component } from 'react';
import { connect } from 'react-redux';
import Moment from 'react-moment';
import { deleteEducation } from '../../actions/profile';
class Education extends Component {
  render() {
    const educations = this.props.education.map((edu) => {
      return (
        <tr key={edu._id}>
          <td>{edu.school}</td>
          <td className='hide-sm'>{edu.degree}</td>
          <td>
            <Moment format='YYYY/MM/DD'>{edu.from}</Moment> -{' '}
            {edu.to === null ? (
              ' Now'
            ) : (
              <Moment format='YYYY/MM/DD'>{edu.to}</Moment>
            )}
          </td>
          <td>
            <button
              onClick={() => this.props.deleteEducation(edu._id)}
              className='btn btn-danger'
            >
              Delete
            </button>
          </td>
        </tr>
      );
    });
    return (
      <>
        <h2 className='my-2'>Education Credentials</h2>
        <table className='table'>
          <thead>
            <tr>
              <th>School</th>
              <th className='hide-sm'>Degree</th>
              <th className='hide-sm'>Years</th>
              <th />
            </tr>
          </thead>
          <tbody>{educations}</tbody>
        </table>
      </>
    );
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    deleteEducation: (id) => dispatch(deleteEducation(id)),
  };
};

export default connect(null, mapDispatchToProps)(Education);
