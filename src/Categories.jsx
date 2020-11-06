import { ChromeReaderMode } from "@material-ui/icons";
import React from "react";
import {
    BooleanField,
    BooleanInput,
    Create,
    Datagrid,
    DisabledInput,
    Edit,
    EditButton,
    Filter,
    List,
    ReferenceInput,
    SelectInput,
    ShowButton,
    SimpleForm,
    TextField,
    TextInput,
    required
} from "react-admin";
export const CategoryIcon = ChromeReaderMode;

const CategoryFilter = props => (
    <Filter {...props}>
        <TextInput label="Search" source="q" alwaysOn />
        <ReferenceInput label="Shop" source="shop_id" reference="shops" allowEmpty alwaysOn>
            <SelectInput optionText="name" />
        </ReferenceInput>
    </Filter>
);

export const CategoryList = props => (
    <List {...props} filters={<CategoryFilter />} perPage="100">
        <Datagrid>
            <TextField source="name" />
            <BooleanField source="cannabis" />
            <TextField source="shop_name" sortable={false} />
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
            <TextInput source="name" autoFocus validate={required()} />
            <BooleanInput source="cannabis" />
            <TextField source="shop_name" />
        </SimpleForm>
    </Edit>
);

export const CategoryCreate = props => (
    <Create title="Create a Category" {...props}>
        <SimpleForm>
            <TextInput source="name" autoFocus validate={required()} />
            <BooleanInput source="cannabis" />
            <ReferenceInput source="shop_id" reference="shops" perPage={100} validate={required()}>
                <SelectInput optionText="name" />
            </ReferenceInput>
        </SimpleForm>
    </Create>
);
