import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
const Alert = (props) => {
  console.log(props.alerts, 'ALERT');
  let showAlert = null;
  if (props.alerts !== null && props.alerts.length > 0) {
    showAlert = props.alerts.map((alert) => {
      return (
        <div key={alert.id} className={`alert alert-${alert.alertType}`}>
          {alert.msg}
        </div>
      );
    });
  }
  return showAlert;
};

Alert.propTypes = {
  alerts: PropTypes.array.isRequired,
};
const mapStateToProps = (state) => {
  return {
    alerts: state.alert,
  };
};
export default connect(mapStateToProps)(Alert);
