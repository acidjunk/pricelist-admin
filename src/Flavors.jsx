import React from 'react';
import { List, Datagrid, Edit, Create, SimpleForm, DateField, TextField, EditButton, DisabledInput, TextInput, LongTextInput, DateInput } from 'react-admin';
import {Fastfood} from "@material-ui/icons";
import Typography from "@material-ui/core/Typography";
export const FlavorIcon = Fastfood;


const FlovorListSidePanel = () => (
    <div style={{ width: 200, margin: '1em' }}>
        <Typography variant="title">Post details</Typography>
        <Typography variant="body1">
            Posts will only be published one an editor approves them
        </Typography>
    </div>
);


export const FlavorList = (props) => (
    <List aside={<FlovorListSidePanel/>}{...props}>
        <Datagrid>
            <TextField source="name" />
            <TextField source="icon" />
            <TextField source="color" />
            <EditButton basePath="/flavors" />
        </Datagrid>
    </List>
);

const FlavorTitle = ({ record }) => {
    return <span>Flavor {record ? `"${record.title}"` : ''}</span>;
};

export const FlavorEdit = (props) => (
    <Edit title={<FlavorTitle />} {...props}>
        <SimpleForm>
            <DisabledInput source="id" />
            <TextInput source="name" />
            <TextInput source="icon" />
            <TextInput source="color" />
        </SimpleForm>
    </Edit>
);

export const FlavorCreate = (props) => (
    <Create title="Create a Flavor" {...props}>
        <SimpleForm>
            <TextInput source="name" />
            <TextInput source="icon" />
            <TextInput source="color" />
        </SimpleForm>
    </Create>
);
