import { Link } from "@material-ui/icons";
import { parse } from "query-string";
import React from "react";
import {
    AutocompleteInput,
    Create,
    DisabledInput,
    Edit,
    ReferenceInput,
    SelectInput,
    SimpleForm,
    required
} from "react-admin";

export const KindsToStrainsIcon = Link;

const KindsToStrainsTitle = ({ record }) => {
    return <span>KindsToStrains {record ? `"${record.id}"` : ""}</span>;
};

const redirect = (basePath, id, data) => `/kinds/${data.kind_id}/show`;

export const KindsToStrainsEdit = props => (
    <Edit title={<KindsToStrainsTitle />} {...props}>
        <SimpleForm redirect={redirect}>
            <DisabledInput source="id" />
            <ReferenceInput
                source="strain_id"
                reference="strains"
                perPage={50}
                sort={{ field: "name" }}
                validate={required()}
            >
                <AutocompleteInput optionText="name" translateChoice={false} />
            </ReferenceInput>
        </SimpleForm>
    </Edit>
);

export const KindsToStrainsCreate = props => {
    const { kind_id } = parse(props.location.search);

    return (
        <Create title="Add a Strain" {...props}>
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
                <ReferenceInput
                    source="strain_id"
                    reference="strains"
                    perPage={50}
                    sort={{ field: "name" }}
                    validate={required()}
                >
                    <AutocompleteInput optionText="name" translateChoice={false} />
                </ReferenceInput>
            </SimpleForm>
        </Create>
    );
};
