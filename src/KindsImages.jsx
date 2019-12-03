import React from "react";
import {
    List,
    Datagrid,
    Edit,
    FormTab,
    TabbedForm,
    Filter,
    ImageField,
    ImageInput,
    TextField,
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
    <List {...props} perPage="100" filters={<KindImageFilter />}>
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
    <Edit {...props} undoable={false}>
        <TabbedForm>
            <FormTab label="lister image">
                <TextField source="image_1" />
                <ImageInput source="image_1" label="Image 1" accept="image/*">
                    <ImageField source="src" title="title" />
                </ImageInput>
            </FormTab>
            <FormTab label="image 2">
                <TextField source="image_2" />
                <ImageInput source="image_2" label="Image 2" accept="image/*">
                    <ImageField source="src" title="title" />
                </ImageInput>
            </FormTab>
            <FormTab label="image 3">
                <TextField source="image_3" />
                <ImageInput source="image_3" label="Image 3" accept="image/*">
                    <ImageField source="src" title="title" />
                </ImageInput>
            </FormTab>
            <FormTab label="image 4">
                <TextField source="image_4" />
                <ImageInput source="image_4" label="Image 4" accept="image/*">
                    <ImageField source="src" title="title" />
                </ImageInput>
            </FormTab>
            <FormTab label="image 5">
                <TextField source="image_5" />
                <ImageInput source="image_5" label="Image 5" accept="image/*">
                    <ImageField source="src" title="title" />
                </ImageInput>
            </FormTab>
            <FormTab label="image 6">
                <TextField source="image_6" />
                <ImageInput source="image_6" label="Image 6" accept="image/*">
                    <ImageField source="src" title="title" />
                </ImageInput>
            </FormTab>
        </TabbedForm>
    </Edit>
);
