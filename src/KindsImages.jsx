import React from "react";
import {
    required,
    List,
    Datagrid,
    Edit,
    Create,
    SimpleForm,
    Filter,
    ImageField,
    ImageInput,
    TextField,
    EditButton,
    ReferenceInput,
    SelectInput,
    ShowButton,
    DisabledInput,
    TextInput
} from "react-admin";
import { Image } from "@material-ui/icons";
export const KindImageIcon = Image;

const KindImageFilter = props => (
    <Filter {...props}>
        <TextInput label="Search" source="q" alwaysOn />
    </Filter>
);

export const KindImageList = props => (
    <List {...props} perPage="100" filters={<KindImageFilter/>}>
        <Datagrid rowClick="edit">
            <TextField source="name" />
            <TextField source="image_1" />
            <TextField source="image_2" />
            <TextField source="image_3" />
            <TextField source="image_4" />
            <TextField source="image_5" />
            <TextField source="image_6" />
        </Datagrid>
    </List>
);

const KindImageTitle = ({ record }) => {
    return <span>Image {record ? `"${record.name}"` : ""}</span>;
};

export const KindImageEdit = props => (
    <Edit {...props}>
        <SimpleForm>
            <ImageInput source="image_1" label="Image 1" accept="image/*">
                <ImageField source="src" title="title" />
            </ImageInput>
        </SimpleForm>
    </Edit>
);
