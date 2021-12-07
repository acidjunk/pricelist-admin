import { ChromeReaderMode } from "@material-ui/icons";
import React from "react";
import {
    AutocompleteInput,
    BooleanField,
    BooleanInput,
    Create,
    Datagrid,
    Edit,
    EditButton,
    Filter,
    List,
    NumberField,
    NumberInput,
    ReferenceInput,
    SelectInput,
    ShowButton,
    SimpleForm,
    TextField,
    TextInput,
    required
} from "react-admin";
import { ColorField, ColorInput } from "react-admin-color-input";
export const CategoryIcon = ChromeReaderMode;

const iconChoices = [
    { name: "berry" },
    { name: "burgers" },
    { name: "candy" },
    { name: "cannabis" },
    { name: "coffee" },
    { name: "chevron" },
    { name: "coin" },
    { name: "deal" },
    { name: "downloads" },
    { name: "eat" },
    { name: "games" },
    { name: "hotdog" },
    { name: "love" },
    { name: "milkshakes" },
    { name: "mug" },
    { name: "network" },
    { name: "smoke" },
    { name: "smile" },
    { name: "soda" },
    { name: "spoon" },
    { name: "water" },
    { name: "wine" }
];

const CategoryFilter = props => (
    <Filter {...props}>
        <TextInput label="Search" source="q" alwaysOn />
        <ReferenceInput label="Shop" source="shop_id" reference="shops" allowEmpty alwaysOn>
            <SelectInput optionText="name" />
        </ReferenceInput>
    </Filter>
);

export const CategoryList = props => (
    <List {...props} filters={<CategoryFilter />} perPage={100}>
        <Datagrid>
            <NumberField source="order_number" />
            <TextField source="name" />
            <TextField source="name_en" />
            <BooleanField source="cannabis" />
            <TextField source="icon" />
            <ColorField source="color" />
            <TextField source="main_category_name" />
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
            <TextInput disabled source="id"/>
            <TextField source="shop_name" />
            <ReferenceInput source="main_category_id" reference="main-categories" perPage={100} validate={required()}>
                <SelectInput optionText="name" />
            </ReferenceInput>
            <TextInput source="name" validate={required()} fullWidth />
            <TextInput source="name_en" label="Name EN (only needed when different)" fullWidth />
            <AutocompleteInput source="icon" choices={iconChoices} optionText="name" optionValue="name" />
            <ColorInput source="color" />
            <NumberInput source="order_number" defaultValue={0} />
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
            <AutocompleteInput source="icon" choices={iconChoices} optionText="name" optionValue="name" />
            <ColorInput source="color" defaultValue="#376E1A" />
            <NumberInput source="order_number" defaultValue={0} />
            <BooleanInput source="cannabis" />
        </SimpleForm>
    </Create>
);
