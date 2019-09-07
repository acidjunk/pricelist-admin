import React from 'react';
import { List, Datagrid, Edit, Create, SimpleForm, DateField, TextField, EditButton, DisabledInput, TextInput, LongTextInput, DateInput } from 'react-admin';
import {AccountCircle} from "@material-ui/icons";
export const UserIcon = AccountCircle;

export const UserList = (props) => (
    <List {...props}>
        <Datagrid>
            <TextField source="id" />
            <TextField source="username" />
            <TextField source="email" />
            <TextField source="first_name" />
            <TextField source="last_name" />
            <DateField source="created_at" />
            <TextField source="roles" />
        </Datagrid>
    </List>
);

const UserTitle = ({ record }) => {
    return <span>User {record ? `"${record.title}"` : ''}</span>;
};

export const UserEdit = (props) => (
    <Edit title={<UserTitle />} {...props}>
        <SimpleForm>
            <DisabledInput source="id" />
            <TextInput source="username" />
            <TextInput source="email" />
            <TextInput source="first_name" />
            <TextInput source="last_name" />
            <DateInput source="created_at" />
            <TextInput source="roles" />
        </SimpleForm>
    </Edit>
);

export const UserCreate = (props) => (
    <Create title="Create a User" {...props}>
        <SimpleForm>
            <TextInput source="name" />
            <TextInput source="icon" />
            <TextInput source="color" />
        </SimpleForm>
    </Create>
);
