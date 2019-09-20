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
export const KindsToFlavorsIcon = Link;

export const KindsToFlavorsList = props => (
    <List {...props}>
        <Datagrid rowClick="edit">
            <TextField source="id" />
            <TextField source="kind_id" />
            <TextField source="flavor_id" />
        </Datagrid>
    </List>
);

const KindsToFlavorsTitle = ({ record }) => {
    return <span>KindsToFlavors {record ? `"${record.id}"` : ""}</span>;
};

const redirect = (basePath, id, data) => `/kinds/${data.kind_id}/show`;

export const KindsToFlavorsEdit = props => (
    <Edit title={<KindsToFlavorsTitle />} {...props}>
        <SimpleForm redirect={redirect}>
            <DisabledInput source="id" />
            <ReferenceInput source="flavor_id" reference="flavors" perPage={100}>
                <SelectInput optionText="name" />
            </ReferenceInput>
        </SimpleForm>
    </Edit>
);


export const KindsToFlavorsCreate = props => {
    const { kind_id } = parse(props.location.search);

    return (
    <Create title="Create a KindsToFlavors" {...props}>
        <SimpleForm redirect={redirect} defaultValue={{ kind_id }}>
            <ReferenceInput source="kind_id" reference="kinds" perPage={100}>
                <SelectInput optionText="name" />
            </ReferenceInput>
            <ReferenceInput source="flavor_id" reference="flavors" perPage={100}>
                <SelectInput optionText="name" />
            </ReferenceInput>
        </SimpleForm>
    </Create>
    )
};
