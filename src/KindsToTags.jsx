import { Link } from "@material-ui/icons";
import { parse } from "query-string";
import React from "react";
import { Create, DisabledInput, Edit, ReferenceInput, SelectInput, SimpleForm, TextInput, required } from "react-admin";

export const KindsToTagsIcon = Link;

const KindsToTagsTitle = ({ record }) => {
    return <span>KindsToTags {record ? `"${record.id}"` : ""}</span>;
};

const redirect = (basePath, id, data) => `/kinds/${data.kind_id}/show`;

export const KindsToTagsEdit = props => (
    <Edit title={<KindsToTagsTitle />} {...props}>
        <SimpleForm redirect={redirect}>
            <DisabledInput source="id" />
            <ReferenceInput source="tag_id" reference="tags" perPage={100} validate={required()}>
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
                <ReferenceInput source="kind_id" reference="kinds" perPage={100} validate={required()}>
                    <SelectInput optionText="name" />
                </ReferenceInput>
                <ReferenceInput source="tag_id" reference="tags" perPage={100} validate={required()}>
                    <SelectInput optionText="name" />
                </ReferenceInput>
                <TextInput source="amount" />
            </SimpleForm>
        </Create>
    );
};
