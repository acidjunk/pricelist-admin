import React, { Component } from 'react';

import { Admin, Resource, ListGuesser } from 'react-admin';
import simpleRestProvider from 'ra-data-simple-rest';


import { FlavorList, FlavorEdit, FlavorCreate, FlavorIcon } from './Flavors';
import { TagList, TagEdit, TagCreate, TagIcon } from './Tags';
import { UserList, UserEdit, UserCreate, UserIcon } from './Users';
import {CollectionsBookmark} from "@material-ui/icons";
import Dashboard from "./dashboard/Dashboard";
import {KindCreate, KindEdit, KindList} from "./Kinds";

class App extends Component {

    // state = { dataProvider: null };
    //
    // async componentWillMount() {
    //     this.restoreFetch = await fakeServerFactory(
    //         process.env.REACT_APP_DATA_PROVIDER
    //     );
    //
    //     const dataProvider = await dataProviderFactory(
    //         process.env.REACT_APP_DATA_PROVIDER
    //     );
    //
    //     this.setState({ dataProvider });
    // }
    //
    // componentWillUnmount() {
    //     this.restoreFetch();
    // }

render() {
    const apiUrl = "https://api.prijslijst.info/v1"
    // const apiUrl = "http://localhost:5000/v1"

    // const { dataProvider } = this.state;
    //
    // if (!dataProvider) {
    //     return (
    //         <div className="loader-container">
    //             <div className="loader">Loading...</div>
    //         </div>
    //     );
    // }


    return (
        <Admin
            dataProvider={simpleRestProvider(apiUrl)}
            title="Shop Admin"
            dashboard={Dashboard}
        >
            <Resource name="kinds" list={KindList} edit={KindEdit} create={KindCreate} icon={CollectionsBookmark}/>
            <Resource name="flavors" list={FlavorList} edit={FlavorEdit} create={FlavorCreate} icon={FlavorIcon}/>
            <Resource name="tags" list={TagList} edit={TagEdit} create={TagCreate} icon={TagIcon}/>
            <Resource name="users" list={UserList} edit={UserEdit} create={UserCreate} icon={UserIcon}/>
        </Admin>
    )
}
}
export default App;
