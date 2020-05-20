import Avatar from "@material-ui/core/Avatar";
import Card from "@material-ui/core/Card";
import Divider from "@material-ui/core/Divider";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import React from "react";
import { translate } from "react-admin";
import { Link } from "react-router-dom";
import compose from "recompose/compose";

import { KindIcon } from "../Kinds";
import CardIcon from "./CardIcon";

const styles = theme => ({
    main: {
        flex: "1",
        marginLeft: "1em",
        marginTop: 20
    },
    card: {
        padding: "16px 0",
        overflow: "inherit",
        textAlign: "right"
    },
    title: {
        padding: "0 16px"
    },
    value: {
        padding: "0 16px",
        minHeight: 48
    },
    avatar: {
        background: theme.palette.background.avatar
    },
    listItemText: {
        paddingRight: 0
    },
    inline: {
        display: "inline"
    }
});

const NewKinds = ({ kinds = [], nb, translate, classes }) => (
    <div className={classes.main}>
        <CardIcon Icon={KindIcon} bgColor="#4caf50" />
        <Card className={classes.card}>
            <Typography className={classes.title} color="textSecondary">
                {translate("pos.dashboard.modified_kinds")}
            </Typography>
            <Typography variant="headline" component="h2" className={classes.value}>
                {nb}
            </Typography>
            <Divider />
            <List>
                {kinds.map(record => (
                    <React.Fragment key={record.id}>
                        <ListItem button to={`/kinds/${record.id}/show`} component={Link} key={record.id}>
                            {/*<Avatar*/}
                            {/*src={`${record.avatar}?size=32x32`}*/}
                            {/*className={classes.avatar}*/}
                            {/*/>*/}
                            <ListItemText
                                primary={`${record.name}`}
                                secondary={
                                    <React.Fragment>
                                        <Typography
                                            component="span"
                                            variant="body2"
                                            className={classes.inline}
                                            color="textPrimary"
                                        >
                                            {record.short_description_en}
                                        </Typography>
                                        {` - ${record.description_en ? record.description_en : "N/A"}`}
                                    </React.Fragment>
                                }
                                className={classes.listItemText}
                            />
                        </ListItem>
                        <Divider />
                    </React.Fragment>
                ))}
            </List>
        </Card>
    </div>
);

const enhance = compose(withStyles(styles), translate);

export default enhance(NewKinds);
