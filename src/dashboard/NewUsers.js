import Avatar from "@material-ui/core/Avatar";
import Card from "@material-ui/core/Card";
import Divider from "@material-ui/core/Divider";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import CustomerIcon from "@material-ui/icons/Person";
import React from "react";
import { translate } from "react-admin";
import { Link } from "react-router-dom";
import compose from "recompose/compose";

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
    }
});

const NewUsers = ({ users = [], nb, translate, classes }) => (
    <div className={classes.main}>
        <CardIcon Icon={CustomerIcon} bgColor="#4caf50" />
        <Card className={classes.card}>
            <Typography className={classes.title} color="textSecondary">
                {translate("pos.dashboard.users")}
            </Typography>
            <Typography variant="headline" component="h2" className={classes.value}>
                {nb}
            </Typography>
            <Divider />
            <List>
                {users.map(record => (
                    <ListItem button to={`/users/${record.id}`} component={Link} key={record.id}>
                        {/*<Avatar*/}
                        {/*    src={`${record.avatar}?size=32x32`}*/}
                        {/*    className={classes.avatar}*/}
                        {/*/>*/}
                        <ListItemText
                            primary={`${record.first_name} ${record.last_name}`}
                            secondary={`${record.email}`}
                            className={classes.listItemText}
                        />
                    </ListItem>
                ))}
            </List>
        </Card>
    </div>
);

const enhance = compose(withStyles(styles), translate);

export default enhance(NewUsers);
