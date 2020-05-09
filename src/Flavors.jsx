import React from "react";
import {
    required,
    List,
    Datagrid,
    Edit,
    Create,
    SimpleForm,
    Filter,
    TextField,
    EditButton,
    ShowButton,
    DisabledInput,
    TextInput, Show, TabbedShowLayout, Tab, ReferenceManyField, ReferenceField, DeleteButton
} from "react-admin";
import { Kitchen } from "@material-ui/icons";
import Typography from "@material-ui/core/Typography";
import { ColorField, ColorInput } from "react-admin-color-input";
export const FlavorIcon = Kitchen;

const FlavorFilter = props => (
    <Filter {...props}>
        <TextInput label="Search" source="q" alwaysOn />
    </Filter>
);

const FlavorListSidePanel = () => (
    <div style={{ width: 200, margin: "1em" }}>
        <Typography variant="title">Using icons?</Typography>
        <Typography variant="body1">Flavors will need a matching image. Not all flavors have an image yet.</Typography>
    </div>
);

export const FlavorShow = props => (
    <Show title={<FlavorTitle />} {...props}>
        <TabbedShowLayout>
            <Tab label="info">
                <h2>Product kinds with tag</h2>
                <ReferenceManyField reference="kinds-to-tags" target="flavor_id" addLabel={false}>
                    <Datagrid>
                        <ReferenceField source="kind_id" reference="kinds">
                            <TextField source="name" />
                        </ReferenceField>
                        <EditButton />
                        <DeleteButton />
                    </Datagrid>
                </ReferenceManyField>
            </Tab>
        </TabbedShowLayout>
    </Show>
);

export const FlavorList = props => (
    <List aside={<FlavorListSidePanel />} {...props} perPage="100" filters={<FlavorFilter/>}>
        <Datagrid>
            <TextField source="name" />
            <TextField source="icon" />
            <ColorField source="color" />
            <ShowButton />
            <EditButton />
            <DeleteButton />
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
