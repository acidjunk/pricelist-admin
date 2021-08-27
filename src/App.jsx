import simpleRestProvider from "ra-data-simple-rest";
import React, { Component } from "react";
import { Admin, Resource, fetchUtils, resolveBrowserLocale } from "react-admin";

import AuthProvider from "./AuthProvider";

import polyglotI18nProvider from 'ra-i18n-polyglot';

import { CategoryCreate, CategoryEdit, CategoryIcon, CategoryList } from "./Categories";
import { CategoryImageEdit, CategoryImageIcon, CategoryImageList } from "./CategoriesImages";
import API_URL from "./Constants";
import Dashboard from "./dashboard/Dashboard";
import addUploadFeature from "./dataProvider/decorator";
import { FlavorCreate, FlavorEdit, FlavorIcon, FlavorList, FlavorShow } from "./Flavors";
// import englishMessages from "./i18n/en";
import { KindCreate, KindEdit, KindIcon, KindList, KindShow } from "./Kinds";
import { KindImageEdit, KindImageIcon, KindImageList } from "./KindsImages";
import { KindsToFlavorsCreate, KindsToFlavorsEdit } from "./KindsToFlavors";
import { KindsToStrainsCreate, KindsToStrainsEdit } from "./KindsToStrains";
import { KindsToTagsCreate, KindsToTagsEdit } from "./KindsToTags";
import { MainCategoryCreate, MainCategoryEdit, MainCategoryIcon, MainCategoryList } from "./MainCategories";
import { OrderCreate, OrderEdit, OrderIcon, OrderList, OrderShow } from "./Orders";
import { PriceCreate, PriceEdit, PriceIcon, PriceList } from "./Prices";
import { ProductCreate, ProductEdit, ProductIcon, ProductList, ProductShow } from "./Products";
import { ProductImageEdit, ProductImageIcon, ProductImageList } from "./ProductsImages";
import { ShopCreate, ShopEdit, ShopIcon, ShopList, ShopShow } from "./Shops";
import { ShopsToPricesCreate, ShopsToPricesEdit } from "./ShopsToPrices";
import { StrainCreate, StrainEdit, StrainIcon, StrainList, StrainShow } from "./Strains";
import { TableCreate, TableEdit, TableIcon, TableList } from "./Tables";
import { TagCreate, TagEdit, TagIcon, TagList, TagShow } from "./Tags";
import { adminTheme } from "./Theme";
import { UserCreate, UserEdit, UserIcon, UserList } from "./Users";
import englishMessages from './i18n/en';

// const i18nProvider = polyglotI18nProvider(locale => {
//     if (locale === "nl") {
//         return import("./i18n/nl").then(messages => messages.default);
//     }

//     // Always fallback on english
//     return englishMessages;
// });

const translations = {
    en: import("./i18n/en").then(messages => messages.default),
    nl: import("./i18n/nl").then(messages => messages.default)
}

// const i18nProvider = polyglotI18nProvider(locale => translations[locale]);
const i18nProvider = polyglotI18nProvider(locale => {
    if (locale === 'nl') {
        return translations[locale];
    }
    // Always fallback on english
    return englishMessages;
}, 'en');

// const i18nProvider = {import("./i18n/nl").then(messages => messages.default)
//     translate: key => lodashGet(messages, key),
//     changeLocale: newLocale => {
//         messages = (newLocale === 'fr') ? frenchMessages : englishMessages;
//         locale = newLocale;
//         return Promise.resolve();
//     },
//     getLocale: () => locale
// }

console.log("API_URL => ", API_URL);

const httpClient = (url, options = {}) => {
    console.log("WHAT IS GOING ON +> ", url);
    if (!options.headers) {
        options.headers = new Headers({ Accept: "application/json" });
    }
    // Cookie auth
    options.credentials = "include";

    // Token auth:
    const token = localStorage.getItem('token');
    options.headers.set('Authentication-Token', token);
    return fetchUtils.fetchJson(url, options);
};
const dataProvider = simpleRestProvider(`${API_URL}/v1`, httpClient);

export const uploadDataProvider = addUploadFeature(dataProvider);

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
                    name="orders"
                    list={OrderList}
                    edit={OrderEdit}
                    create={OrderCreate}
                    show={OrderShow}
                    icon={OrderIcon}
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
                    name="main-categories"
                    list={MainCategoryList}
                    edit={MainCategoryEdit}
                    create={MainCategoryCreate}
                    icon={MainCategoryIcon}
                />
                <Resource
                    name="categories"
                    list={CategoryList}
                    edit={CategoryEdit}
                    create={CategoryCreate}
                    icon={CategoryIcon}
                />
                <Resource
                    name="categories-images"
                    list={CategoryImageList}
                    edit={CategoryImageEdit}
                    icon={CategoryImageIcon}
                />
                <Resource
                    name="kinds"
                    options={{ label: "Cannabis Kinds" }}
                    list={KindList}
                    edit={KindEdit}
                    create={KindCreate}
                    show={KindShow}
                    icon={KindIcon}
                />
                <Resource
                    name="kinds-images"
                    options={{ label: "Cannabis-images" }}
                    list={KindImageList}
                    edit={KindImageEdit}
                    icon={KindImageIcon}
                />
                {/*  
                <Resource
                    name="products"
                    list={ProductList}
                    edit={ProductEdit}
                    create={ProductCreate}
                    show={ProductShow}
                    icon={ProductIcon}
                />
                <Resource
                    name="products-images"
                    list={ProductImageList}
                    edit={ProductImageEdit}
                    icon={ProductImageIcon}
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
                <Resource name="tables" list={TableList} edit={TableEdit} create={TableCreate} icon={TableIcon} />
                <Resource name="users" list={UserList} edit={UserEdit} create={UserCreate} icon={UserIcon} />
                <Resource
                    name="shops-to-prices"
                    edit={ShopsToPricesEdit}
                    create={ShopsToPricesCreate}
                    icon={UserIcon}
                />
                <Resource
                    name="kinds-to-strains"
                    edit={KindsToStrainsEdit}
                    create={KindsToStrainsCreate}
                    icon={UserIcon}
                />
                <Resource name="kinds-to-tags" edit={KindsToTagsEdit} create={KindsToTagsCreate} icon={UserIcon} />
                <Resource
                    name="kinds-to-flavors"
                    edit={KindsToFlavorsEdit}
                    create={KindsToFlavorsCreate}
                    icon={UserIcon}
                /> */}
            </Admin>
        );
    }
}
export default App;
