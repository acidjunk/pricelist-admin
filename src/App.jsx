import simpleRestProvider from "ra-data-simple-rest";
import React, { Component } from "react";
import { Admin, Resource, fetchUtils } from "react-admin";

import AuthProvider from "./AuthProvider";
import { CategoryCreate, CategoryEdit, CategoryIcon, CategoryList } from "./Categories";
import apiUrl from "./Constants";
import Dashboard from "./dashboard/Dashboard";
import addUploadFeature from "./dataProvider/decorator";
import { FlavorCreate, FlavorEdit, FlavorIcon, FlavorList, FlavorShow } from "./Flavors";
import englishMessages from "./i18n/en";
import { KindCreate, KindEdit, KindIcon, KindList, KindShow } from "./Kinds";
import { KindImageEdit, KindImageIcon, KindImageList } from "./KindsImages";
import { KindsToFlavorsCreate, KindsToFlavorsEdit } from "./KindsToFlavors";
import { KindsToTagsCreate, KindsToTagsEdit } from "./KindsToTags";
import { PriceCreate, PriceEdit, PriceIcon, PriceList } from "./Prices";
import { ShopCreate, ShopEdit, ShopIcon, ShopList, ShopShow } from "./Shops";
import { ShopsToPricesCreate, ShopsToPricesEdit } from "./ShopsToPrices";
import { StrainCreate, StrainEdit, StrainIcon, StrainList, StrainShow } from "./Strains";
import { TagCreate, TagEdit, TagIcon, TagList, TagShow } from "./Tags";
import { adminTheme } from "./Theme";
import { UserCreate, UserEdit, UserIcon, UserList } from "./Users";

const i18nProvider = locale => {
    if (locale === "nl") {
        return import("./i18n/nl").then(messages => messages.default);
    }

    // Always fallback on english
    return englishMessages;
};

const httpClient = (url, options = {}) => {
    if (!options.headers) {
        options.headers = new Headers({ Accept: "application/json" });
    }
    // Cookie auth
    options.credentials = "include";

    // Token auth:
    // const token = localStorage.getItem('token');
    // options.headers.set('Authentication-Token', token);
    return fetchUtils.fetchJson(url, options);
};
const dataProvider = simpleRestProvider(`${apiUrl}/v1`, httpClient);

const uploadDataProvider = addUploadFeature(dataProvider);

class App extends Component {
    render() {
        return (
            <Admin
                dataProvider={uploadDataProvider}
                title="Shop Admin"
                authProvider={AuthProvider}
                dashboard={Dashboard}
                i18nProvider={i18nProvider}
                theme={adminTheme}
            >
                <Resource
                    name="shops"
                    list={ShopList}
                    edit={ShopEdit}
                    create={ShopCreate}
                    show={ShopShow}
                    icon={ShopIcon}
                />
                <Resource
                    name="prices"
                    options={{ label: "Price templates" }}
                    list={PriceList}
                    edit={PriceEdit}
                    create={PriceCreate}
                    icon={PriceIcon}
                />
                <Resource
                    name="categories"
                    list={CategoryList}
                    edit={CategoryEdit}
                    create={CategoryCreate}
                    icon={CategoryIcon}
                />
                <Resource
                    name="kinds"
                    options={{ label: "Product Kinds" }}
                    list={KindList}
                    edit={KindEdit}
                    create={KindCreate}
                    show={KindShow}
                    icon={KindIcon}
                />
                <Resource
                    name="kinds-images"
                    options={{ label: "Product Images" }}
                    list={KindImageList}
                    edit={KindImageEdit}
                    icon={KindImageIcon}
                />
                <Resource
                    name="strains"
                    show={StrainShow}
                    list={StrainList}
                    edit={StrainEdit}
                    create={StrainCreate}
                    icon={StrainIcon}
                />
                <Resource
                    name="flavors"
                    show={FlavorShow}
                    list={FlavorList}
                    edit={FlavorEdit}
                    create={FlavorCreate}
                    icon={FlavorIcon}
                />
                <Resource
                    name="tags"
                    options={{ label: "Effects" }}
                    show={TagShow}
                    list={TagList}
                    edit={TagEdit}
                    create={TagCreate}
                    icon={TagIcon}
                />
                <Resource name="users" list={UserList} edit={UserEdit} create={UserCreate} icon={UserIcon} />
                <Resource
                    name="shops-to-prices"
                    edit={ShopsToPricesEdit}
                    create={ShopsToPricesCreate}
                    icon={UserIcon}
                />
                <Resource name="kinds-to-tags" edit={KindsToTagsEdit} create={KindsToTagsCreate} icon={UserIcon} />
                <Resource
                    name="kinds-to-flavors"
                    edit={KindsToFlavorsEdit}
                    create={KindsToFlavorsCreate}
                    icon={UserIcon}
                />
            </Admin>
        );
    }
}
export default App;
