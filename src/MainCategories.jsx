import { Dns } from "@material-ui/icons";
import React from "react";
import {
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
export const MainCategoryIcon = Dns;

const MainCategoryFilter = props => (
    <Filter {...props}>
        <TextInput label="Search" source="q" alwaysOn />
        <ReferenceInput label="Shop" source="shop_id" reference="shops" allowEmpty alwaysOn>
            <SelectInput optionText="name" />
        </ReferenceInput>
    </Filter>
);

export const MainCategoryList = props => (
    <List {...props} filters={<MainCategoryFilter />} perPage="100">
        <Datagrid>
            <TextField source="name" />
            <TextField source="shop_name" sortable={false} />
            <EditButton basePath="/main-categories" />
            <ShowButton basePath="/main-categories" />
        </Datagrid>
    </List>
);

const MainCategoryTitle = ({ record }) => {
    return <span>MainCategory {record ? `"${record.name}"` : ""}</span>;
};

export const MainCategoryEdit = props => (
    <Edit title={<MainCategoryTitle />} {...props}>
        <SimpleForm>
            <DisabledInput source="id" />
            <TextInput source="name" validate={required()} fullWidth autoFocus />
            <TextInput source="name_en" label="Name EN (only needed when different)" fullWidth />
            <TextField source="shop_name" />
        </SimpleForm>
    </Edit>
);

export const MainCategoryCreate = props => (
    <Create title="Create a MainCategory" {...props}>
        <SimpleForm>
            <TextInput source="name" validate={required()} fullWidth autoFocus />
            <TextInput source="name_en" label="Name EN (only needed when different)" fullWidth />
            <ReferenceInput source="shop_id" reference="shops" perPage={100} validate={required()}>
                <SelectInput optionText="name" />
            </ReferenceInput>
        </SimpleForm>
    </Create>
);
