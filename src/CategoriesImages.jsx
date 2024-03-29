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
    ReferenceField,
    ReferenceInput,
    SelectInput,
    TabbedForm,
    TextField,
    TextInput
} from "react-admin";

import DeleteImageButton from "./components/DeleteImageButton";
import { IMAGE_URL } from "./Constants";

export const CategoryImageIcon = BrokenImage;

const CategoryImageFilter = props => (
    <Filter {...props}>
        <TextInput label="Search" source="q" alwaysOn />
        <ReferenceInput label="Shop" source="shop_id" reference="shops" allowEmpty alwaysOn>
            <SelectInput optionText="name" />
        </ReferenceInput>
    </Filter>
);

export const CategoryImageList = props => (
    <List {...props} perPage="100" filters={<CategoryImageFilter />}>
        <Datagrid rowClick="edit">
            <TextField source="name" />
            <ReferenceField source="shop_id" reference="shops" label="Shop" allowEmpty={true}>
                <TextField source="name" />
            </ReferenceField>
            <ProductImageListField source="image_1" />
            <ProductImageListField source="image_2" />
        </Datagrid>
    </List>
);

const ProductImageListField = ({ record, source }) => {
    if (!record[source]) {
        return null;
    }
    const options = {
        bucket: "images-prijslijst-info",
        key: record[source],
        edits: {
            resize: {
                width: 192,
                height: 33,
                fit: "contain",
                background: {
                    r: 255,
                    g: 255,
                    b: 255,
                    alpha: 1
                }
            }
        }
    };
    const strRequest = JSON.stringify(options);
    const encRequest = btoa(strRequest);

    return <img width={192} src={`${IMAGE_URL}/${encRequest}`} />;
};

const ProductImageField = ({ record, source }) => {
    if (!record[source]) {
        return null;
    }
    const options = {
        bucket: "images-prijslijst-info",
        key: record[source],
        edits: {
            resize: {
                width: 576,
                height: 99,
                fit: "contain"
            }
        }
    };
    const strRequest = JSON.stringify(options);
    const encRequest = btoa(strRequest);

    return <img width="250" src={`https://d3sticxdmgvhkp.cloudfront.net/${encRequest}`} />;
};
ProductImageField.defaultProps = { addLabel: true };

const CategoryImageTitle = ({ record }) => {
    return <span>Image {record ? `"${record.name}"` : ""}</span>;
};

export const CategoryImageEdit = props => (
    <Edit {...props} undoable={false} redirect="edit">
        <TabbedForm redirect="edit">
            <FormTab label="lister image">
                <TextField source="image_1" />
                <ProductImageField source="image_1" />
                <DeleteImageButton source="image_1" />
                <ImageInput source="image_1" label="Image 1: (aspect 5 / 2.2 or 1920 x 326)" accept="image/*">
                    <ImageField source="src" src="image_1" title="title" />
                </ImageInput>
            </FormTab>
            <FormTab label="image 2">
                <TextField source="image_2" />
                <ProductImageField source="image_2" />
                <DeleteImageButton source="image_2" />
                <ImageInput source="image_2" label="Image 2: (aspect 5 / 2.2 or 1920 x 326)" accept="image/*">
                    <ImageField source="src" src="image_2" title="title" />
                </ImageInput>
            </FormTab>
        </TabbedForm>
    </Edit>
);
