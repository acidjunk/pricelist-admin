import { Link } from "@material-ui/icons";
import { parse } from "query-string";
import React from "react";
import {
    AutocompleteInput,
    Create,
    Edit,
    ReferenceInput,
    SelectInput,
    SimpleForm,
    TextInput,
    required
} from "react-admin";

export const KindsToFlavorsIcon = Link;

const KindsToFlavorsTitle = ({ record }) => {
    return <span>KindsToFlavors {record ? `"${record.id}"` : ""}</span>;
};

const redirect = (basePath, id, data) => `/kinds/${data.kind_id}/show`;

export const KindsToFlavorsEdit = props => (
    <Edit title={<KindsToFlavorsTitle />} {...props}>
        <SimpleForm redirect={redirect}>
            <TextInput disabled source="id" />
            <ReferenceInput
                source="flavor_id"
                reference="flavors"
                perPage={50}
                sort={{ field: "name" }}
                validate={required()}
            >
                <AutocompleteInput optionText="name" translateChoice={false} />
            </ReferenceInput>
        </SimpleForm>
    </Edit>
);

export const KindsToFlavorsCreate = props => {
    const { kind_id } = parse(props.location.search);

    return (
        <Create title="Add a Flavor" {...props}>
            <SimpleForm redirect={redirect} defaultValue={{ kind_id }}>
                <ReferenceInput
                    source="kind_id"
                    reference="kinds"
                    perPage={50}
                    sort={{ field: "name" }}
                    validate={required()}
                >
                    <SelectInput optionText="name" />
                </ReferenceInput>
                <ReferenceInput source="flavor_id" reference="flavors" sort={{ field: "name" }} validate={required()}>
                    <AutocompleteInput optionText="name" translateChoice={false} />
                </ReferenceInput>
            </SimpleForm>
        </Create>
    );
};
