import React from "react";
import { parse } from "query-string";

import {
    ArrayField,
    BooleanField,
    Button,
    Create,
    Datagrid,
    DisabledInput,
    Edit,
    EditButton,
    Filter,
    Labeled,
    Link,
    List,
    ListButton,
    NumberField,
    required,
    ReferenceInput,
    SelectInput,
    Show,
    ShowButton,
    SimpleForm,
    Tab,
    TabbedShowLayout,
    TextField,
    TextInput
} from "react-admin";
import { Add, StoreMallDirectory } from "@material-ui/icons";
import CardActions from "@material-ui/core/CardActions";

export const ShopIcon = StoreMallDirectory;

const ShopFilter = props => (
    <Filter {...props}>
        <TextInput label="Search" source="q" alwaysOn />
    </Filter>
);

export const ShopList = props => (
    <List {...props} filters={<ShopFilter/>}>
        <Datagrid>
            <TextField source="name" />
            <TextField source="description" />
            <ShowButton basePath="/shops" />
            <EditButton basePath="/shops" />
        </Datagrid>
    </List>
);

const ShopTitle = ({ record }) => {
    return <span>Shop {record ? `"${record.name}"` : ""}</span>;
};

const AddPriceButton = ({ record }) => (
    <Button
        component={Link}
        to={{
            pathname: "/shops-to-prices/create",
            search: `?shop_id=${record ? record.id : ""}`
        }}
        label="Add a price"
    >
        <Add />
    </Button>
);

const ShopShowActions = ({ basePath, data }) => (
    <CardActions>
        <ListButton basePath={basePath} />
        <EditButton basePath="/shops" record={data} />
        <AddPriceButton record={data} />
    </CardActions>
);

export const ShopShow = props => (
    <Show title={<ShopTitle />} actions={<ShopShowActions />} {...props}>
        <TabbedShowLayout>
            <Tab label="Prices">
                <ArrayField source="prices" label="">
                    <Datagrid>
                        <NumberField source="internal_product_id" sortable={false} />
                        <TextField source="category_name" sortable={false} />
                        <TextField source="kind_name" sortable={false} />
                        <BooleanField source="active" sortable={false} />
                        <NumberField
                            source="half"
                            locales="nl-NL"
                            options={{ style: "currency", currency: "EUR" }}
                            sortable={false}
                        />
                        <NumberField
                            source="one"
                            locales="nl-NL"
                            options={{ style: "currency", currency: "EUR" }}
                            sortable={false}
                        />
                        <NumberField
                            source="two_five"
                            locales="nl-NL"
                            options={{ style: "currency", currency: "EUR" }}
                            sortable={false}
                        />
                        <NumberField
                            source="five"
                            locales="nl-NL"
                            options={{ style: "currency", currency: "EUR" }}
                            sortable={false}
                        />
                        <NumberField
                            source="joint"
                            locales="nl-NL"
                            options={{ style: "currency", currency: "EUR" }}
                            sortable={false}
                        />
                        <NumberField
                            source="piece"
                            locales="nl-NL"
                            options={{ style: "currency", currency: "EUR" }}
                            sortable={false}
                        />
                        <EditButton basePath="/shops-to-prices" />
                    </Datagrid>
                </ArrayField>
            </Tab>
            <Tab label="Shop Info" path="info">
                <TextField source="name" />
                <TextField source="description" />
                <Labeled label="Logo">
                    <img src={`https://www.prijslijst.info/static/uploaded/shops/${props.id}.png`} />
                </Labeled>
                {console.log(props)}
            </Tab>
        </TabbedShowLayout>
    </Show>
);

export const ShopEdit = props => (
    <Edit title={<ShopTitle />} {...props}>
        <SimpleForm>
            <DisabledInput source="id" />
            <TextInput source="name" validate={required()} />
            <TextInput source="description" />
        </SimpleForm>
    </Edit>
);

export const ShopCreate = props => (
    <Create title="Create a Shop" {...props}>
        <SimpleForm>
            <TextInput source="name" validate={required()} />
            <TextInput source="description" />
        </SimpleForm>
    </Create>
);
