import React from 'react';
import { List, Datagrid, Edit, Create, SimpleForm, DateField, TextField, EditButton, DisabledInput, TextInput, LongTextInput, DateInput } from 'admin-on-rest';
import BookIcon from 'material-ui/svg-icons/action/book';
export const FlavorIcon = BookIcon;

export const FlavorList = (props) => (
    <List {...props}>
        <Datagrid>
            <TextField source="id" />
            <TextField source="name" />
            <DateField source="icon" />
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