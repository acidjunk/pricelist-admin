import { AttachMoney } from "@material-ui/icons";
import React from "react";
import {
    Create,
    Datagrid,
    DisabledInput,
    Edit,
    EditButton,
    Filter,
    List,
    NumberField,
    NumberInput,
    SimpleForm,
    TextField,
    TextInput,
    required
} from "react-admin";

export const PriceIcon = AttachMoney;

const PriceFilter = props => (
    <Filter {...props}>
        <TextInput label="Search" source="q" alwaysOn />
    </Filter>
);

export const PriceList = props => (
    <List {...props} perPage="25" sort={{ field: "internal_product_id", order: "ASC" }} filters={<PriceFilter />}>
        <Datagrid>
            <TextField source="internal_product_id" />
            <NumberField source="half" locales="nl-NL" options={{ style: "currency", currency: "EUR" }} />
            <NumberField source="one" locales="nl-NL" options={{ style: "currency", currency: "EUR" }} />
            <NumberField source="two_five" locales="nl-NL" options={{ style: "currency", currency: "EUR" }} />
            <NumberField source="five" locales="nl-NL" options={{ style: "currency", currency: "EUR" }} />
            <NumberField source="joint" locales="nl-NL" options={{ style: "currency", currency: "EUR" }} />
            <NumberField source="piece" locales="nl-NL" options={{ style: "currency", currency: "EUR" }} />
            <EditButton basePath="/prices" />
        </Datagrid>
    </List>
);

const PriceTitle = ({ record }) => {
    return <span>Price Nr: {record ? `"${record.internal_product_id}"` : ""}</span>;
};

export const PriceEdit = props => (
    <Edit title={<PriceTitle />} {...props}>
        <SimpleForm>
            <DisabledInput source="id" />
            <TextInput source="internal_product_id" autoFocus validate={required()} />
            <NumberInput source="half" locales="nl-NL" />
            <NumberInput source="one" locales="nl-NL" />
            <NumberInput source="two_five" locales="nl-NL" />
            <NumberInput source="five" locales="nl-NL" />
            <NumberInput source="joint" locales="nl-NL" />
            <NumberInput source="piece" locales="nl-NL" />
        </SimpleForm>
    </Edit>
);

export const PriceCreate = props => (
    <Create title="Create a Price" {...props}>
        <SimpleForm>
            <TextInput source="internal_product_id" autoFocus validate={required()} />
            <NumberInput source="half" locales="nl-NL" />
            <NumberInput source="one" locales="nl-NL" />
            <NumberInput source="two_five" locales="nl-NL" />
            <NumberInput source="five" locales="nl-NL" />
            <NumberInput source="joint" locales="nl-NL" />
            <NumberInput source="piece" locales="nl-NL" />
        </SimpleForm>
    </Create>
);
