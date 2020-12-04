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
            <TextField source="name_en" />
            <TextField source="icon" />
            <TextField source="main_category_name" />
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
            <TextField source="shop_name" />
            <ReferenceInput source="main_category_id" reference="main-categories" perPage={100} validate={required()}>
                <SelectInput optionText="name" />
            </ReferenceInput>
            <TextInput source="name" validate={required()} fullWidth />
            <TextInput source="name_en" label="Name EN (only needed when different)" fullWidth />
            <TextInput source="icon" label="Icon name" fullWidth />
            <BooleanInput source="cannabis" />
        </SimpleForm>
    </Edit>
);

export const CategoryCreate = props => (
    <Create title="Create a Category" {...props}>
        <SimpleForm>
            <ReferenceInput source="shop_id" reference="shops" perPage={100} validate={required()}>
                <SelectInput optionText="name" />
            </ReferenceInput>
            <ReferenceInput source="main_category_id" reference="main-categories" perPage={100} validate={required()}>
                <SelectInput optionText="main_category_and_shop" />
            </ReferenceInput>
            <TextInput source="name" validate={required()} fullWidth />
            <TextInput source="name_en" label="Name EN (only needed when different)" fullWidth />
            <TextInput source="icon" label="Icon name" fullWidth />
            <BooleanInput source="cannabis" />
        </SimpleForm>
    </Create>
);
