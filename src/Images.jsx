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
    ReferenceInput,
    SelectInput,
    ShowButton,
    DisabledInput,
    TextInput
} from "react-admin";
import { Image } from "@material-ui/icons";
import Typography from "@material-ui/core/Typography";
import { ColorField, ColorInput } from "react-admin-color-input";
export const ImageIcon = Image;

const ImageFilter = props => (
    <Filter {...props}>
        <ReferenceInput label="Kind" source="kind_id" reference="kinds" allowEmpty alwaysOn>
            <SelectInput optionText="name" />
        </ReferenceInput>
    </Filter>
);

const ImageListSidePanel = () => (
    <div style={{ width: 200, margin: "1em" }}>
        <Typography variant="title">Using icons?</Typography>
        <Typography variant="body1">Images will need a matching image. Not all Images have an image yet.</Typography>
    </div>
);

export const ImageList = props => (
    <List aside={<ImageListSidePanel />} {...props} perPage="100" filters={<ImageFilter/>}>
        <Datagrid>
            <TextField source="name" />
            <TextField source="icon" />
            <ColorField source="color" />
            <EditButton basePath="/Images" />
            <ShowButton basePath="/Images" />
        </Datagrid>
    </List>
);

const ImageTitle = ({ record }) => {
    return <span>Image {record ? `"${record.name}"` : ""}</span>;
};

export const ImageEdit = props => (
    <Edit title={<ImageTitle />} {...props}>
        <SimpleForm>
            <DisabledInput source="id" />
            <TextInput source="name" validate={required()} />
            <TextInput source="icon" />
            <ColorInput source="color" />
        </SimpleForm>
    </Edit>
);

export const ImageCreate = props => (
    <Create title="Create a Image" {...props}>
        <SimpleForm>
            <TextInput source="name" validate={required()} />
            <TextInput source="icon" />
            <ColorInput source="color" />
        </SimpleForm>
    </Create>
);
