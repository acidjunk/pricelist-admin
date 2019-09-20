import React from 'react';
import { List, Datagrid, Edit, Create, SimpleForm, DateField, TextField, EditButton, DisabledInput, TextInput, LongTextInput, DateInput, NumberField, NumberInput } from 'react-admin';
import {Toc} from "@material-ui/icons";
import Typography from "@material-ui/core/Typography";
export const PriceIcon = Toc;


export const PriceList = (props) => (
    <List {...props} perPage="25" sort={{field: "internal_product_id", order: "ASC"}}>
        <Datagrid>
            <NumberField source="internal_product_id" />
            <NumberField source="half" locales="nl-NL" options={{ style: 'currency', currency: 'EUR' }}/>
            <NumberField source="one" locales="nl-NL" options={{ style: 'currency', currency: 'EUR' }}/>
            <NumberField source="two_five" locales="nl-NL" options={{ style: 'currency', currency: 'EUR' }}/>
            <NumberField source="five" locales="nl-NL" options={{ style: 'currency', currency: 'EUR' }}/>
            <NumberField source="joint" locales="nl-NL" options={{ style: 'currency', currency: 'EUR' }}/>
            <NumberField source="piece" locales="nl-NL" options={{ style: 'currency', currency: 'EUR' }}/>
            <EditButton basePath="/prices"/>
        </Datagrid>
    </List>
);

const PriceTitle = ({ record }) => {
    return <span>Price Nr: {record ? `"${record.internal_product_id}"` : ''}</span>;
};

export const PriceEdit = (props) => (
    <Edit title={<PriceTitle />} {...props}>
        <SimpleForm>
            <DisabledInput source="id" />
            <NumberInput source="internal_product_id" />
            <NumberInput source="half" locales="nl-NL" />
            <NumberInput source="one" locales="nl-NL" />
            <NumberInput source="two_five" locales="nl-NL" />
            <NumberInput source="five" locales="nl-NL" />
            <NumberInput source="joint" locales="nl-NL" />
            <NumberInput source="piece" locales="nl-NL" />
        </SimpleForm>
    </Edit>
);

export const PriceCreate = (props) => (
    <Create title="Create a Price" {...props}>
        <SimpleForm>
            <NumberInput source="internal_product_id" />
            <NumberInput source="half" locales="nl-NL" />
            <NumberInput source="one" locales="nl-NL" />
            <NumberInput source="two_five" locales="nl-NL" />
            <NumberInput source="five" locales="nl-NL" />
            <NumberInput source="joint" locales="nl-NL" />
            <NumberInput source="piece" locales="nl-NL" />
        </SimpleForm>
    </Create>
);
