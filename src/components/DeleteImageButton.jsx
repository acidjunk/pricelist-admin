import Button from "@material-ui/core/Button";
import PropTypes from "prop-types";
import React, { Component } from "react";
import { showNotification as showNotificationAction } from "react-admin";
import { UPDATE } from "react-admin";
import { connect } from "react-redux";
import { push as pushAction } from "react-router-redux";

import { uploadDataProvider } from "../App";

class DeleteImageButton extends Component {
    handleClick = () => {
        const { push, source, basePath, record, showNotification } = this.props;
        const updatedRecord = { image: source };
        uploadDataProvider(UPDATE, `${basePath.replace("/", "")}/delete`, { id: record.id, data: updatedRecord })
            .then(() => {
                showNotification("image deleted");
                window.location.reload();
            })
            .catch(e => {
                console.error(e);
                showNotification("Error: image delete failed", "warning");
            });
    };

    render() {
        const { record } = this.props;
        return <Button onClick={this.handleClick}>delete</Button>;
    }
}

DeleteImageButton.propTypes = {
    push: PropTypes.func,
    record: PropTypes.object,
    showNotification: PropTypes.func
};

export default connect(null, {
    showNotification: showNotificationAction,
    push: pushAction
})(DeleteImageButton);
