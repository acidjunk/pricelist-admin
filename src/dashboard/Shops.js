import React from "react";
import compose from "recompose/compose";
import Card from "@material-ui/core/Card";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Avatar from "@material-ui/core/Avatar";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import CustomerIcon from "@material-ui/icons/PersonAdd";
import Divider from "@material-ui/core/Divider";
import { Link } from "react-router-dom";
import { translate } from "react-admin";

import CardIcon from "./CardIcon";
import { makeStyles } from "@material-ui/core";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import ListSubheader from "@material-ui/core/ListSubheader";
import GridListTileBar from "@material-ui/core/GridListTileBar";
import IconButton from "@material-ui/core/IconButton";
import InfoIcon from "@material-ui/icons/Info";
import { ShopIcon } from "../Shops";

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
    gridList: {
        flexWrap: "nowrap",
        // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
        transform: "translateZ(0)"
    },
    titleBar: {
        background: "linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)"
    }
});

const Shops = ({ shops = [], nb, translate, classes }) => (
    <div className={classes.main}>
        <Card className={classes.card}>
            <CardIcon Icon={ShopIcon} bgColor="#4caf50" />
            <Typography className={classes.title} color="textSecondary">
                {translate("pos.dashboard.shops")}
            </Typography>
            <Typography variant="headline" component="h2" className={classes.value}>
                {nb}
            </Typography>

            <div className={classes.root}>
                <GridList cols={3} className={classes.gridList}>
                    {shops.map(shop => (
                        <GridListTile
                            key={shop.id}
                            style={{ cursor: "grab" }}
                            onClick={() => (document.location.href = `/#/shops/${shop.id}/show`)}
                        >
                            <img
                                src={`https://www.prijslijst.info/static/uploaded/shops/${shop.id}.png`}
                                alt={shop.name}
                            />
                            <GridListTileBar
                                title={shop.name}
                                subtitle={<span>description: {shop.description}</span>}
                            />
                        </GridListTile>
                    ))}
                </GridList>
            </div>
        </Card>
    </div>
);

const enhance = compose(
    withStyles(styles),
    translate
);

export default enhance(Shops);
