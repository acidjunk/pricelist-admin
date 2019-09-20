import React from 'react';
import { List, Datagrid, Edit, Create, SimpleForm, DateField, TextField, EditButton, DisabledInput, TextInput, LongTextInput, DateInput } from 'react-admin';
import {Mood} from "@material-ui/icons";
export const TagIcon = Mood;

export const TagList = (props) => (
    <List {...props} perPage="25">
        <Datagrid>
            <TextField source="name" />
            <EditButton basePath="/tags" />
        </Datagrid>
    </List>
);

const TagTitle = ({ record }) => {
    return <span>Effect {record ? `"${record.name}"` : ''}</span>;
};

export const TagEdit = (props) => (
    <Edit title={<TagTitle />} {...props}>
        <SimpleForm>
            <DisabledInput source="id" />
            <TextInput source="name" />
        </SimpleForm>
    </Edit>
);

export const TagCreate = (props) => (
    <Create title="Create a Effect" {...props}>
        <SimpleForm>
            <TextInput source="name" />
        </SimpleForm>
    </Create>
);
