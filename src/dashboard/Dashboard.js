import React, { Component } from 'react';
import { GET_LIST, GET_MANY, Responsive, withDataProvider } from 'react-admin';
import compose from 'recompose/compose';
import { connect } from 'react-redux';

import Welcome from './Welcome';
import NewKinds from './NewKinds';
import NewUsers from './NewUsers';

const styles = {
    flex: { display: 'flex' },
    flexColumn: { display: 'flex', flexDirection: 'column' },
    leftCol: { flex: 1, marginRight: '1em' },
    rightCol: { flex: 1, marginLeft: '1em' },
    singleCol: { marginTop: '2em', marginBottom: '2em' },
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
        this.fetchKinds();
        this.fetchUsers();
    }


    async fetchKinds() {
        const { dataProvider } = this.props;
        const aMonthAgo = new Date();
        aMonthAgo.setDate(aMonthAgo.getDate() - 30);
        const { data: newKinds } = await dataProvider(
            GET_LIST,
            'kinds',
            {
                filter: {
                    has_ordered: true,
                    created_at_gte: aMonthAgo.toISOString(),
                },
                sort: { field: 'created_at', order: 'DESC' },
                pagination: { page: 1, perPage: 100 },
            }
        );
        this.setState({
            newKinds,
            nbNewKinds: newKinds.reduce(nb => ++nb, 0),
        });
    }

    async fetchUsers() {
        const { dataProvider } = this.props;
        const aMonthAgo = new Date();
        aMonthAgo.setDate(aMonthAgo.getDate() - 30);
        const { data: newUsers } = await dataProvider(
            GET_LIST,
            'users',
            {
                filter: {
                    has_ordered: true,
                    created_at_gte: aMonthAgo.toISOString(),
                },
                sort: { field: 'created_at', order: 'DESC' },
                pagination: { page: 1, perPage: 100 },
            }
        );
        this.setState({
            newUsers,
            nbNewUsers: newUsers.reduce(nb => ++nb, 0),
        });
    }

    render() {
        const {
            nbNewKinds,
            newKinds,
            nbNewUsers,
            newUsers,
        } = this.state;
        return (
            <Responsive
                small={
                    <div>
                        <div style={styles.flexColumn}>
                            <div style={{ marginBottom: '2em' }}>
                                <Welcome />
                            </div>
                            <div style={styles.singleCol}>
                                <NewKinds
                                    nb={nbNewKinds}
                                    visitors={newKinds}
                                />
                                <NewUsers
                                    nb={nbNewUsers}
                                    visitors={newUsers}
                                />
                            </div>
                        </div>
                    </div>
                }
                medium={
                    <div style={styles.flex}>
                        <div style={styles.leftCol}>
                            <div style={styles.singleCol}>
                                <Welcome />
                            </div>
                            <div style={styles.singleCol}>
                                <NewKinds
                                    nb={nbNewKinds}
                                    visitors={newKinds}
                                />
                            </div>
                        </div>
                        <div style={styles.rightCol}>
                            <div style={styles.flex}>
                                <NewUsers
                                    nb={nbNewUsers}
                                    visitors={newUsers}
                                />
                            </div>
                        </div>
                    </div>
                }
            />
        );
    }
}

const mapStateToProps = state => ({
    version: state.admin.ui.viewVersion,
});

export default compose(
    connect(mapStateToProps),
    withDataProvider
)(Dashboard);
