import CardActions from "@material-ui/core/CardActions";
import { Add, StoreMallDirectory } from "@material-ui/icons";
import { parse } from "query-string";
import React from "react";
import {
    ArrayField,
    AutocompleteInput,
    BooleanField,
    Button,
    Create,
    Datagrid,
    DeleteButton,
    DisabledInput,
    Edit,
    EditButton,
    Filter,
    Labeled,
    Link,
    List,
    ListButton,
    NumberField,
    Pagination,
    ReferenceField,
    ReferenceInput,
    ReferenceManyField,
    SelectInput,
    Show,
    ShowButton,
    SimpleForm,
    Tab,
    TabbedShowLayout,
    TextField,
    TextInput,
    required
} from "react-admin";

export const ShopIcon = StoreMallDirectory;

const ShopFilter = props => (
    <Filter {...props}>
        <TextInput label="Search" source="q" alwaysOn />
    </Filter>
);

export const ShopList = props => (
    <List {...props} filters={<ShopFilter />}>
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

const ShopPricePagination = props => <Pagination rowsPerPageOptions={[10, 20]} {...props} />;

export const ShopShow = props => (
    <Show title={<ShopTitle />} actions={<ShopShowActions />} {...props}>
        <TabbedShowLayout>
            <Tab label="Prices">
                <ReferenceManyField
                    reference="shops-to-prices"
                    target="shop_id"
                    addLabel={false}
                    pagination={<ShopPricePagination />}
                    perPage={20}
                    sort={{ field: "category_id", order: "ASC" }}
                >
                    <Datagrid>
                        <ReferenceField source="price_id" reference="prices" label="Price template">
                            <TextField source="internal_product_id" />
                        </ReferenceField>
                        <ReferenceField source="kind_id" reference="kinds" label="Product Kind">
                            <TextField source="name" />
                        </ReferenceField>
                        <ReferenceField source="category_id" reference="categories" label="Category">
                            <TextField source="name" />
                        </ReferenceField>
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
                        <DeleteButton basePath={`/shops/${props.id}/show`} />
                    </Datagrid>
                </ReferenceManyField>
            </Tab>
            <Tab label="Shop Info" path="info">
                <TextField source="name" />
                <TextField source="description" />
                <Labeled label="Logo">
                    <img src={`https://www.prijslijst.info/static/uploaded/shops/${props.id}.png`} />
                </Labeled>
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
