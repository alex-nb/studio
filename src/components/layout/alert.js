import React from 'react';
import { connect } from 'react-redux';
import "./alert.css";

const Alert = ({ alerts }) =>
    alerts !== null &&
    alerts.length > 0 &&
    alerts.map(alert => (
        <div key={alert.id} className={`col-md-10 float-right alert alert-${alert.alertType}`}>
            {alert.msg}
        </div>
    ));
const mapStateToProps = ({ alert }) => ({
    alerts: alert
});

export default connect(mapStateToProps)(Alert);