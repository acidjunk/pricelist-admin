import Button from "@material-ui/core/Button";
import PropTypes from "prop-types";
import React, { Component } from "react";
import { showNotification as showNotificationAction } from "react-admin";
import { UPDATE } from "react-admin";
import { connect } from "react-redux";
import { push as pushAction } from "react-router-redux";

import { uploadDataProvider } from "../App";
import API_URL from "../Constants";

class ToggleAvailabilityButton extends Component {
    handleClick = () => {
        const { push, record, showNotification } = this.props;
        debugger;
        const updatedRecord = { ...record, active: !record.active };
        uploadDataProvider(UPDATE, "shops-to-prices", { id: record.id, data: updatedRecord })
            .then(() => {
                showNotification("Price row disabled");
                window.location.reload();
            })
            .catch(e => {
                console.error(e);
                showNotification("Error: price row update failed", "warning");
            });
    };

    render() {
        const { record } = this.props;
        return <Button onClick={this.handleClick}>{record.active ? "STOP" : "START"}</Button>;
    }
}

ToggleAvailabilityButton.propTypes = {
    push: PropTypes.func,
    record: PropTypes.object,
    showNotification: PropTypes.func
};

export default connect(null, {
    showNotification: showNotificationAction,
    push: pushAction
})(ToggleAvailabilityButton);
