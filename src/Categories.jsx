import React from "react";
import {
    required,
    List,
    Datagrid,
    Edit,
    Create,
    SimpleForm,
    DateField,
    TextField,
    EditButton,
    ShowButton,
    DisabledInput,
    TextInput,
    LongTextInput,
    ReferenceInput,
    SelectInput,
    DateInput
} from "react-admin";
import { ChromeReaderMode } from "@material-ui/icons";
export const CategoryIcon = ChromeReaderMode;

export const CategoryList = props => (
    <List {...props} perPage="100">
        <Datagrid>
            <TextField source="name" />
            <TextField source="shop_name" sortable={false}/>
            <EditButton basePath="/categories" />
            <ShowButton basePath="/categories" />
        </Datagrid>
    </List>
);

const CategoryTitle = ({ record }) => {
    return <span>Category {record ? `"${record.name}"` : ""}</span>;
};

export const CategoryEdit = props => (
    <Edit title={<CategoryTitle />} {...props}>
        <SimpleForm>
            <DisabledInput source="id" />
            <TextInput source="name" validate={required()}/>
            <TextField source="shop_name" />
        </SimpleForm>
    </Edit>
);

export const CategoryCreate = props => (
    <Create title="Create a Category" {...props}>
        <SimpleForm>
            <TextInput source="name" validate={required()}/>
            <ReferenceInput source="shop_id" reference="shops" perPage={100} validate={required()}>
                <SelectInput optionText="name"/>
            </ReferenceInput>
        </SimpleForm>
    </Create>
);
