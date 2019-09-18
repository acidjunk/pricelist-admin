import React from "react";
import { parse } from "query-string";

import {
    List,
    Datagrid,
    Edit,
    Create,
    SimpleForm,
    ArrayField,
    SingleFieldList,
    ChipField,
    DateField,
    TextField,
    EditButton,
    DisabledInput,
    TextInput,
    ReferenceInput,
    SelectInput,
    Show,
    SimpleShowLayout,
    LongTextInput,
    DateInput
} from "react-admin";
import { Link } from "@material-ui/icons";
export const KindsToTagsIcon = Link;

export const KindsToTagsList = props => (
    <List {...props}>
        <Datagrid rowClick="edit">
            <TextField source="id" />
            <TextField source="kind_id" />
            <TextField source="tag_id" />
            <TextField source="amount" />
        </Datagrid>
    </List>
);

const KindsToTagsTitle = ({ record }) => {
    return <span>KindsToTags {record ? `"${record.id}"` : ""}</span>;
};

const redirect = (basePath, id, data) => `/kinds/${data.kind_id}/show`;

export const KindsToTagsEdit = props => (
    <Edit title={<KindsToTagsTitle />} {...props}>
        <SimpleForm redirect={redirect}>
            <DisabledInput source="id" />
            <ReferenceInput source="tag_id" reference="tags" perPage={100}>
                <SelectInput optionText="name" />
            </ReferenceInput>
            <TextInput source="amount" />
        </SimpleForm>
    </Edit>
);


export const KindsToTagsCreate = props => {
    const { kind_id } = parse(props.location.search);

    return (
    <Create title="Create a KindsToTags" {...props}>
        <SimpleForm redirect={redirect} defaultValue={{ kind_id }}>
            <ReferenceInput source="kind_id" reference="kinds" perPage={100}>
                <SelectInput optionText="name" />
            </ReferenceInput>
            <ReferenceInput source="tag_id" reference="tags" perPage={100}>
                <SelectInput optionText="name" />
            </ReferenceInput>
            <TextInput source="amount" />
        </SimpleForm>
    </Create>
    )
};
