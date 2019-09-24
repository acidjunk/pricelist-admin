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
    DateInput
} from "react-admin";
import { Kitchen } from "@material-ui/icons";
import Typography from "@material-ui/core/Typography";
import { ColorField, ColorInput } from "react-admin-color-input";
export const FlavorIcon = Kitchen;

const FlavorListSidePanel = () => (
    <div style={{ width: 200, margin: "1em" }}>
        <Typography variant="title">Using icons?</Typography>
        <Typography variant="body1">
            Flavors will need a matching semantic-ui icon. A list can be found{" "}
            <a href="https://semantic-ui.com/elements/icon.html">here</a>.
        </Typography>
    </div>
);

export const FlavorList = props => (
    <List aside={<FlavorListSidePanel />} {...props} perPage="100">
        <Datagrid>
            <TextField source="name" />
            <TextField source="icon" />
            <ColorField source="color" />
            <EditButton basePath="/flavors" />
            <ShowButton basePath="/flavors" />
        </Datagrid>
    </List>
);

const FlavorTitle = ({ record }) => {
    return <span>Flavor {record ? `"${record.name}"` : ""}</span>;
};

export const FlavorEdit = props => (
    <Edit title={<FlavorTitle />} {...props}>
        <SimpleForm>
            <DisabledInput source="id" />
            <TextInput source="name" validate={required()} />
            <TextInput source="icon" />
            <ColorInput source="color" />
        </SimpleForm>
    </Edit>
);

export const FlavorCreate = props => (
    <Create title="Create a Flavor" {...props}>
        <SimpleForm>
            <TextInput source="name" validate={required()} />
            <TextInput source="icon" />
            <ColorInput source="color" />
        </SimpleForm>
    </Create>
);
