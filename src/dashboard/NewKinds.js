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
import ReactMarkdown from "react-markdown/with-html";
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
            <Typography variant="h2" component="h2" className={classes.value}>
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
                            <div className={classes.listItemText}>
                                <b>NL</b> <span>{record.name}</span>
                                {record.description_nl && <ReactMarkdown source={record.description_nl} />}
                                <b>EN</b> <span>{record.name}</span>
                                {record.description_en && <ReactMarkdown source={record.description_en} />}
                            </div>
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
