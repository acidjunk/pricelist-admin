import { BrokenImage } from "@material-ui/icons";
import React from "react";
import {
    Datagrid,
    Edit,
    Filter,
    FormTab,
    ImageField,
    ImageInput,
    List,
    TabbedForm,
    TextField,
    TextInput
} from "react-admin";
export const KindImageIcon = BrokenImage;

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

const ProductImageField = ({ record, source }) => {
    if (!record[source]) {
        return null;
    }
    const options = {
        bucket: "images-prijslijst-info",
        key: record[source],
        edits: {
            resize: {
                width: 200,
                height: 200,
                fit: "contain"
            }
        }
    };
    console.log(source);
    const strRequest = JSON.stringify(options);
    const encRequest = btoa(strRequest);

    return <img width="200" src={`https://d3sticxdmgvhkp.cloudfront.net/${encRequest}`} />;
};
ProductImageField.defaultProps = { addLabel: true };

const KindImageTitle = ({ record }) => {
    return <span>Image {record ? `"${record.name}"` : ""}</span>;
};

export const KindImageEdit = props => (
    <Edit {...props} undoable={false} redirect="edit">
        <TabbedForm redirect="edit">
            <FormTab label="lister image">
                <TextField source="image_1" />
                <ProductImageField source="image_1" />
                <ImageInput source="image_1" label="Image 1" accept="image/*">
                    <ImageField source="src" title="title" />
                </ImageInput>
            </FormTab>
            <FormTab label="image 2">
                <TextField source="image_2" />
                <ProductImageField source="image_2" />
                <ImageInput source="image_2" label="Image 2" accept="image/*">
                    <ImageField source="src" title="title" />
                </ImageInput>
            </FormTab>
            <FormTab label="image 3">
                <TextField source="image_3" />
                <ProductImageField source="image_3" />
                <ImageInput source="image_3" label="Image 3" accept="image/*">
                    <ImageField source="src" title="title" />
                </ImageInput>
            </FormTab>
            <FormTab label="image 4">
                <TextField source="image_4" />
                <ProductImageField source="image_4" />
                <ImageInput source="image_4" label="Image 4" accept="image/*">
                    <ImageField source="src" title="title" />
                </ImageInput>
            </FormTab>
            <FormTab label="image 5">
                <TextField source="image_5" />
                <ProductImageField source="image_5" />
                <ImageInput source="image_5" label="Image 5" accept="image/*">
                    <ImageField source="src" title="title" />
                </ImageInput>
            </FormTab>
            <FormTab label="image 6">
                <TextField source="image_6" />
                <ProductImageField source="image_6" />
                <ImageInput source="image_6" label="Image 6" accept="image/*">
                    <ImageField source="src" title="title" />
                </ImageInput>
            </FormTab>
        </TabbedForm>
    </Edit>
);
