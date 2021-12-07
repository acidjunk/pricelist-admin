import React from "react";
import Card from "@material-ui/core/Card";
import ImageList from "@material-ui/core/ImageList";
import ImageListItem from "@material-ui/core/ImageListItem";
import ImageListItemBar from "@material-ui/core/ImageListItemBar";
import { withStyles } from "@material-ui/styles";
import Typography from "@material-ui/core/Typography";
import { translate } from "react-admin";
import compose from "recompose/compose";

import { ShopIcon } from "../Shops";
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
            <Typography variant="h2" component="h2" className={classes.value}>
                {nb}
            </Typography>

            <div className={classes.root}>
                <ImageList cols={3} className={classes.gridList}>
                    {shops.map(shop => (
                        <ImageListItem
                            key={shop.id}
                            style={{ cursor: "grab" }}
                            onClick={() => (document.location.href = `/#/shops/${shop.id}/show`)}
                        >
                            <img
                                src={`https://www.prijslijst.info/static/uploaded/shops/${shop.id}.png`}
                                alt={shop.name}
                            />
                            <ImageListItemBar
                                title={shop.name}
                                subtitle={<span>description: {shop.description}</span>}
                            />
                        </ImageListItem>
                    ))}
                </ImageList>
            </div>
        </Card>
    </div>
);

const enhance = compose(withStyles(styles), translate);

export default enhance(Shops);
