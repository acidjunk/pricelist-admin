import { Mood } from "@material-ui/icons";
import React from "react";
import {
    Create,
    Datagrid,
    DeleteButton,
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
export const TagIcon = Mood;

const TagFilter = props => (
    <Filter {...props}>
        <TextInput label="Search" source="q" alwaysOn />
    </Filter>
);
const TagPagination = props => <Pagination rowsPerPageOptions={[10, 20]} {...props} />;

export const TagShow = props => (
    <Show title={<TagTitle />} {...props}>
        <TabbedShowLayout>
            <Tab label="info">
                <h2>Product kinds with this tag</h2>
                <ReferenceManyField
                    reference="kinds-to-tags"
                    target="tag_id"
                    addLabel={false}
                    pagination={<TagPagination />}
                    perPage={20}
                >
                    <Datagrid>
                        <ReferenceField label="Product Kind" source="kind_id" reference="kinds" linkType="show">
                            <TextField source="name" />
                        </ReferenceField>
                        <EditButton />
                        <DeleteButton />
                    </Datagrid>
                </ReferenceManyField>
            </Tab>
        </TabbedShowLayout>
    </Show>
);

export const TagList = props => (
    <List {...props} perPage={25} filters={<TagFilter />}>
        <Datagrid>
            <TextField source="name" validate={required()} />
            <ShowButton />
            <EditButton />
            <DeleteButton />
        </Datagrid>
    </List>
);

const TagTitle = ({ record }) => {
    return <span>Effect {record ? `"${record.name}"` : ""}</span>;
};

export const TagEdit = props => (
    <Edit title={<TagTitle />} {...props}>
        <SimpleForm>
            <TextInput disabled source="id" />
            <TextInput source="name" autoFocus validate={required()} />
        </SimpleForm>
    </Edit>
);

export const TagCreate = props => (
    <Create title="Create a Effect" {...props}>
        <SimpleForm>
            <TextInput source="name" autoFocus validate={required()} />
        </SimpleForm>
    </Create>
);
