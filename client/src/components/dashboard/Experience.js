import React, { Component } from 'react';
import { connect } from 'react-redux';
import Moment from 'react-moment';
import { deleteExperience } from '../../actions/profile';
class Experience extends Component {
  render() {
    const experiences = this.props.experience.map((exp) => {
      return (
        <tr key={exp._id}>
          <td>{exp.company}</td>
          <td className='hide-sm'>{exp.title}</td>
          <td>
            <Moment format='YYYY/MM/DD'>{exp.from}</Moment> -{' '}
            {exp.to === null ? (
              ' Now'
            ) : (
              <Moment format='YYYY/MM/DD'>{exp.to}</Moment>
            )}
          </td>
          <td>
            <button
              onClick={() => this.props.deleteExperience(exp._id)}
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
        <h2 className='my-2'>Experience Credentials</h2>
        <table className='table'>
          <thead>
            <tr>
              <th>Company</th>
              <th className='hide-sm'>Title</th>
              <th className='hide-sm'>Years</th>
              <th />
            </tr>
          </thead>
          <tbody>{experiences}</tbody>
        </table>
      </>
    );
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    deleteExperience: (id) => dispatch(deleteExperience(id)),
  };
};

export default connect(null, mapDispatchToProps)(Experience);
