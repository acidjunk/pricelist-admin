import React, { Component } from 'react';

import { fetchUtils, Admin, Resource, ListGuesser } from 'react-admin';
import simpleRestProvider from 'ra-data-simple-rest';
import AuthProvider from './AuthProvider';
import englishMessages from './i18n/en';
import { FlavorList, FlavorEdit, FlavorCreate, FlavorIcon } from './Flavors';
import { TagList, TagEdit, TagCreate, TagIcon } from './Tags';
import { UserList, UserEdit, UserCreate, UserIcon } from './Users';
import Dashboard from "./dashboard/Dashboard";
import {KindCreate, KindEdit, KindIcon, KindList} from "./Kinds";
import {ShopCreate, ShopEdit, ShopIcon, ShopList} from "./Shops";
import apiUrl from "./Constants";
import {PriceCreate, PriceEdit, PriceIcon, PriceList} from "./Prices";

const i18nProvider = locale => {
    if (locale === 'nl') {
        return import('./i18n/nl').then(messages => messages.default);
    }

    // Always fallback on english
    return englishMessages;
};

const httpClient = (url, options = {}) => {
    if (!options.headers) {
        options.headers = new Headers({ Accept: 'application/json' });
    }
    // Cookie auth
    options.credentials = 'include';

    // Token auth:
    // const token = localStorage.getItem('token');
    // options.headers.set('Authentication-Token', token);
    return fetchUtils.fetchJson(url, options);
}
const dataProvider = simpleRestProvider(`${apiUrl}/v1`, httpClient);


class App extends Component {

render() {

    return (
        <Admin
            dataProvider={dataProvider}
            title="Shop Admin"
            authProvider={AuthProvider}
            dashboard={Dashboard}
            i18nProvider={i18nProvider}
        >
            <Resource name="shops" list={ShopList} edit={ShopEdit} create={ShopCreate} icon={ShopIcon}/>
            <Resource name="prices" list={PriceList} edit={PriceEdit} create={PriceCreate} icon={PriceIcon}/>
            <Resource name="kinds" list={KindList} edit={KindEdit} create={KindCreate} icon={KindIcon}/>
            <Resource name="flavors" list={FlavorList} edit={FlavorEdit} create={FlavorCreate} icon={FlavorIcon}/>
            <Resource name="tags" options={{ label: 'Effects' }} list={TagList} edit={TagEdit} create={TagCreate} icon={TagIcon}/>
            <Resource name="users" list={UserList} edit={UserEdit} create={UserCreate} icon={UserIcon}/>
        </Admin>
    )
}
}
export default App;
