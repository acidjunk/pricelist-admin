import React from 'react';
import { List, Datagrid, Edit, Create, SimpleForm, ArrayField, SingleFieldList, ChipField, DateField, TextField, EditButton, DisabledInput, TextInput, LongTextInput, DateInput } from 'react-admin';
import {SmokingRooms} from "@material-ui/icons";
export const KindIcon = SmokingRooms;

export const KindList = (props) => (
    <List {...props}>
        <Datagrid rowClick="edit">
            <TextField source="name" />
            <TextField source="short_description_nl" />
            <TextField source="short_description_en" />
            <ArrayField source="tags"><SingleFieldList><ChipField source="name" /></SingleFieldList></ArrayField>
            <ArrayField source="flavors"><SingleFieldList><ChipField source="name" /></SingleFieldList></ArrayField>
        </Datagrid>
    </List>
);

const KindTitle = ({ record }) => {
    return <span>Kind {record ? `"${record.name}"` : ''}</span>;
};

export const KindEdit = (props) => (
    <Edit title={<KindTitle />} {...props}>
        <SimpleForm>
            <DisabledInput source="id" />
            <TextInput source="name" />
            <TextInput source="short_description_nl" />
            <LongTextInput source="description_nl" />
            <TextInput source="short_description_en" />
            <LongTextInput source="description_en" />
        </SimpleForm>
    </Edit>
);

export const KindCreate = (props) => (
    <Create title="Create a Kind" {...props}>
        <SimpleForm>
            <TextInput source="name" />
            <TextInput source="short_description_nl" />
            <LongTextInput source="description_nl" />
            <TextInput source="short_description_en" />
            <LongTextInput source="description_en" />
        </SimpleForm>
    </Create>
);
