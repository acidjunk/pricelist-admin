import React, { Component } from "react";
import { GET_LIST, withDataProvider } from "react-admin";
import { connect } from "react-redux";
import compose from "recompose/compose";

import NewKinds from "./NewKinds";
import NewUsers from "./NewUsers";
import Shops from "./Shops";

const styles = {
    flex: { display: "flex" },
    flexColumn: { display: "flex", flexDirection: "column" },
    leftCol: { flex: 1, marginRight: "1em" },
    rightCol: { flex: 1, marginLeft: "1em" },
    singleCol: { marginTop: "2em", marginBottom: "2em" }
};

class Dashboard extends Component {
    state = {};

    componentDidMount() {
        this.fetchData();
    }

    componentDidUpdate(prevProps) {
        // handle refresh
        if (this.props.version !== prevProps.version) {
            this.fetchData();
        }
    }

    fetchData() {
        this.fetchShops();
        this.fetchKinds();
        // this.fetchUsers();
    }

    async fetchShops() {
        const { dataProvider } = this.props;
        const aMonthAgo = new Date();
        aMonthAgo.setDate(aMonthAgo.getDate() - 30);
        const { data: shops } = await dataProvider(GET_LIST, "shops", {
            filter: {},
            sort: { field: "name", order: "DESC" },
            pagination: { page: 1, perPage: 100 }
        });
        this.setState({
            shops,
            nbShops: shops.reduce(nb => ++nb, 0)
        });
    }
    async fetchKinds() {
        const { dataProvider } = this.props;
        const aMonthAgo = new Date();
        aMonthAgo.setDate(aMonthAgo.getDate() - 30);
        const { data: newKinds } = await dataProvider(GET_LIST, "kinds", {
            filter: {
                // has_ordered: true,
                modified_at_gte: aMonthAgo.toISOString()
            },
            sort: { field: "created_at", order: "DESC" },
            pagination: { page: 1, perPage: 20 }
        });
        this.setState({
            newKinds,
            nbNewKinds: newKinds.reduce(nb => ++nb, 0)
        });
    }

    async fetchUsers() {
        const { dataProvider } = this.props;
        const aMonthAgo = new Date();
        aMonthAgo.setDate(aMonthAgo.getDate() - 30);
        const { data: newUsers } = await dataProvider(GET_LIST, "users", {
            filter: {
                // has_ordered: true,
                // created_at_gte: aMonthAgo.toISOString(),
            },
            sort: { field: "created_at", order: "DESC" },
            pagination: { page: 1, perPage: 100 }
        });
        this.setState({
            newUsers,
            nbNewUsers: newUsers.reduce(nb => ++nb, 0)
        });
    }

    render() {
        const { shops, nbShops, nbNewKinds, newKinds, nbNewUsers, newUsers } = this.state;
        return (
            <div style={styles.flexColumn}>
                <div style={styles.singleCol}>
                    <Shops nb={nbShops} shops={shops} />
                </div>
                <div style={styles.flex}>
                    <NewKinds nb={nbNewKinds} kinds={newKinds} />
                </div>
                <div style={styles.singleCol}>
                    <NewUsers nb={nbNewUsers} users={newUsers} />
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    version: state.admin.ui.viewVersion
});

export default compose(connect(mapStateToProps), withDataProvider)(Dashboard);
