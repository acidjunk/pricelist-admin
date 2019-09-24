import React from "react";
import {parse} from "query-string";

import {required, Create, DisabledInput, Edit, ReferenceInput, SelectInput, SimpleForm} from "react-admin";
import {Link} from "@material-ui/icons";

export const KindsToFlavorsIcon = Link;


const KindsToFlavorsTitle = ({ record }) => {
    return <span>KindsToFlavors {record ? `"${record.id}"` : ""}</span>;
};

const redirect = (basePath, id, data) => `/kinds/${data.kind_id}/show`;

export const KindsToFlavorsEdit = props => (
    <Edit title={<KindsToFlavorsTitle />} {...props}>
        <SimpleForm redirect={redirect}>
            <DisabledInput source="id" />
            <ReferenceInput source="flavor_id" reference="flavors" perPage={100} validate={required()}>
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
            <ReferenceInput source="kind_id" reference="kinds" perPage={100} validate={required()}>
                <SelectInput optionText="name" />
            </ReferenceInput>
            <ReferenceInput source="flavor_id" reference="flavors" perPage={100} validate={required()}>
                <SelectInput optionText="name" />
            </ReferenceInput>
        </SimpleForm>
    </Create>
    )
};
