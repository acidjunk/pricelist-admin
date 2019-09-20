import React from "react";
import {
    List,
    Datagrid,
    Edit,
    Create,
    SimpleForm,
    Show,
    SimpleShowLayout,
    TabbedShowLayout,
    ArrayField,
    Tab,
    DateField,
    NumberField,
    TextField,
    EditButton,
    ShowButton,
    DisabledInput,
    ReferenceField,
    TextInput,
    LongTextInput,
    ReferenceManyField,
    DateInput
} from "react-admin";
import { StoreMallDirectory } from "@material-ui/icons";
import Typography from "@material-ui/core/Typography";
import MaterialList from "@material-ui/core/List/List";
import ListItem from "@material-ui/core/ListItem";
export const ShopIcon = StoreMallDirectory;

export const ShopList = props => (
    <List {...props}>
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

export const ShopShow = props => (
    <Show title={<ShopTitle />} {...props}>
        <TabbedShowLayout>
            <Tab label="Prices">
                <ArrayField source="prices">
                    <Datagrid>
                        <NumberField source="internal_product_id" />
                        <ReferenceField source="kind_id" reference="kinds">
                            <TextField source="name" />
                        </ReferenceField>
                        <NumberField source="half" locales="nl-NL" options={{ style: 'currency', currency: 'EUR' }}/>
                        <NumberField source="one" locales="nl-NL" options={{ style: 'currency', currency: 'EUR' }}/>
                        <NumberField source="two_five" locales="nl-NL" options={{ style: 'currency', currency: 'EUR' }}/>
                        <NumberField source="five" locales="nl-NL" options={{ style: 'currency', currency: 'EUR' }}/>
                        <NumberField source="joint" locales="nl-NL" options={{ style: 'currency', currency: 'EUR' }}/>
                        <NumberField source="piece" locales="nl-NL" options={{ style: 'currency', currency: 'EUR' }}/>
                    </Datagrid>
                </ArrayField>
                {/*<ReferenceManyField reference="prices" target="price_id" addLabel={false}>*/}
                {/*    <Datagrid>*/}
                {/*        <TextField source="id" />*/}
                {/*        <DateField source="joint" />*/}
                {/*        <EditButton />*/}
                {/*    </Datagrid>*/}
                {/*</ReferenceManyField>*/}
            </Tab>
            <Tab label="Shop Info" path="info">
                <TextField source="name" />
                <TextField source="description" />
            </Tab>
        </TabbedShowLayout>
    </Show>
);

export const ShopEdit = props => (
    <Edit title={<ShopTitle />} {...props}>
        <SimpleForm>
            <DisabledInput source="id" />
            <TextInput source="name" />
            <TextInput source="description" />
        </SimpleForm>
    </Edit>
);

export const ShopCreate = props => (
    <Create title="Create a Shop" {...props}>
        <SimpleForm>
            <TextInput source="name" />
            <TextInput source="description" />
        </SimpleForm>
    </Create>
);
