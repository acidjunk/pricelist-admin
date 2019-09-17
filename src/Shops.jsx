import React from 'react';
import { List, Datagrid, Edit, Create, SimpleForm, DateField, TextField, EditButton, DisabledInput, TextInput, LongTextInput, DateInput } from 'react-admin';
import {StoreMallDirectory} from "@material-ui/icons";
import Typography from "@material-ui/core/Typography";
export const ShopIcon = StoreMallDirectory;


const ShopSidePanel = () => (
    <div style={{ width: 200, margin: '1em' }}>
        <Typography variant="title">Todo quick menu to prices in shops</Typography>
        <Typography variant="body1">
            WIP WIP WIP
        </Typography>
    </div>
);


export const ShopList = (props) => (
    <List aside={<ShopSidePanel/>}{...props}>
        <Datagrid>
            <TextField source="name" />
            <TextField source="description" />
            <EditButton basePath="/shops" />
        </Datagrid>
    </List>
);

const ShopTitle = ({ record }) => {
    return <span>Shop {record ? `"${record.name}"` : ''}</span>;
};

export const ShopEdit = (props) => (
    <Edit title={<ShopTitle />} {...props}>
        <SimpleForm>
            <DisabledInput source="id" />
            <TextInput source="name" />
            <TextInput source="description" />
        </SimpleForm>
    </Edit>
);

export const ShopCreate = (props) => (
    <Create title="Create a Shop" {...props}>
        <SimpleForm>
            <TextInput source="name" />
            <TextInput source="description" />
        </SimpleForm>
    </Create>
);
