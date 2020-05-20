import Typography from "@material-ui/core/Typography";
import { CallSplit } from "@material-ui/icons";
import React from "react";
import {
    Create,
    Datagrid,
    DeleteButton,
    DisabledInput,
    Edit,
    EditButton,
    Filter,
    List,
    Pagination,
    ReferenceField,
    ReferenceManyField,
    Show,
    ShowButton,
    SimpleForm,
    Tab,
    TabbedShowLayout,
    TextField,
    TextInput,
    required
} from "react-admin";
import { ColorField, ColorInput } from "react-admin-color-input";
export const StrainIcon = CallSplit;

const StrainFilter = props => (
    <Filter {...props}>
        <TextInput label="Search" source="q" alwaysOn />
    </Filter>
);

const StrainPagination = props => <Pagination rowsPerPageOptions={[10, 20]} {...props} />;

export const StrainShow = props => (
    <Show title={<StrainTitle />} {...props}>
        <TabbedShowLayout>
            <Tab label="info">
                {/*<h2>Product kinds with this Strain</h2>*/}
                {/*<ReferenceManyField reference="kinds-to-strains" target="strain_id" addLabel={false}                     pagination={<StrainPagination />}*/}
                {/*                    perPage={20}>*/}
                {/*    <Datagrid>*/}
                {/*        <ReferenceField source="kind_id" reference="kinds">*/}
                {/*            <TextField source="name" />*/}
                {/*        </ReferenceField>*/}
                {/*        <EditButton />*/}
                {/*        <DeleteButton />*/}
                {/*    </Datagrid>*/}
                {/*</ReferenceManyField>*/}
            </Tab>
        </TabbedShowLayout>
    </Show>
);

export const StrainList = props => (
    <List {...props} perPage="100" filters={<StrainFilter />}>
        <Datagrid>
            <TextField source="name" />
            <ShowButton />
            <EditButton />
            <DeleteButton />
        </Datagrid>
    </List>
);

const StrainTitle = ({ record }) => {
    return <span>Strain {record ? `"${record.name}"` : ""}</span>;
};

export const StrainEdit = props => (
    <Edit title={<StrainTitle />} {...props}>
        <SimpleForm>
            <DisabledInput source="id" />
            <TextInput source="name" validate={required()} />
        </SimpleForm>
    </Edit>
);

export const StrainCreate = props => (
    <Create title="Create a Strain" {...props}>
        <SimpleForm>
            <TextInput source="name" validate={required()} />
        </SimpleForm>
    </Create>
);
