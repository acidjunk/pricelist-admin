import CardActions from "@material-ui/core/CardActions";
import MaterialList from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Typography from "@material-ui/core/Typography";
import { Add, SmokingRooms } from "@material-ui/icons";
import MarkdownInput from "ra-input-markdown";
import React from "react";
import {
    ArrayField,
    BooleanField,
    BooleanInput,
    Button,
    ChipField,
    Create,
    Datagrid,
    DateField,
    DeleteButton,
    DisabledInput,
    Edit,
    EditButton,
    Filter,
    Link,
    List,
    ListButton,
    LongTextInput,
    Pagination,
    ReferenceField,
    ReferenceInput,
    ReferenceManyField,
    SelectInput,
    Show,
    SimpleForm,
    SimpleShowLayout,
    Tab,
    TabbedShowLayout,
    TextField,
    TextInput,
    SingleFieldList,
    required
} from "react-admin";
import ReactMarkdown from "react-markdown/with-html";

export const KindIcon = SmokingRooms;

const kindRowStyle = (record, index) => ({
    backgroundColor: record.approved === true ? "#eeffee" : record.complete === true ? "#fff9df" : "white"
});

export const MarkDownField = ({ record, source }) => {
    if (!record[source]) {
        return null;
    }
    console.log(record[source]);

    return <ReactMarkdown source={record[source]} />;
};
MarkDownField.defaultProps = { addLabel: true };


const KindFilter = props => (
    <Filter {...props}>
        <TextInput label="Search" source="q" alwaysOn />
        <BooleanInput source="complete" />
        <BooleanInput source="approved" />
        <BooleanInput source="c" />
        <BooleanInput source="h" />
        <BooleanInput source="i" />
        <BooleanInput source="s" />
    </Filter>
);

const KindPagination = props => <Pagination rowsPerPageOptions={[10, 25, 50, 100]} {...props} />;

export const KindList = props => (
    <List
        {...props}
        sort={{ field: "name", order: "ASC" }}
        filters={<KindFilter />}
        pagination={<KindPagination />}
        perPage={50}
    >
        <Datagrid rowClick="show" rowStyle={kindRowStyle}>
            <TextField source="name" />
            <BooleanField source="c" />
            <BooleanField source="h" />
            <BooleanField source="i" />
            <BooleanField source="s" />
            <TextField source="tags_amount" sortable={false} />
            <TextField source="flavors_amount" sortable={false} />
            <TextField source="strains_amount" sortable={false} />
            <TextField source="images_amount" sortable={false} />
            <BooleanField source="complete" />
            <BooleanField source="approved" />
            <DateField source="modified_at" />
        </Datagrid>
    </List>
);

const KindTitle = ({ record }) => {
    return <span>Kind {record ? `"${record.name}"` : ""}</span>;
};

const AddTagButton = ({ record }) => (
    <Button
        component={Link}
        to={{
            pathname: "/kinds-to-tags/create",
            search: `?kind_id=${record ? record.id : ""}`
        }}
        label="Add effect"
    >
        <Add />
    </Button>
);

const AddFlavorButton = ({ record }) => (
    <Button
        component={Link}
        to={{
            pathname: "/kinds-to-flavors/create",
            search: `?kind_id=${record ? record.id : ""}`
        }}
        label="Add flavor"
    >
        <Add />
    </Button>
);

const AddStrainButton = ({ record }) => (
    <Button
        component={Link}
        to={{
            pathname: "/kinds-to-strains/create",
            search: `?kind_id=${record ? record.id : ""}`
        }}
        label="Add strain"
    >
        <Add />
    </Button>
);

const KindShowActions = ({ basePath, data }) => (
    <CardActions>
        <ListButton basePath={basePath} />
        <EditButton basePath="/kinds" record={data} />
        <AddStrainButton record={data} />
        <AddTagButton record={data} />
        <AddFlavorButton record={data} />
    </CardActions>
);

export const KindShow = props => (
    <Show title={<KindTitle />} actions={<KindShowActions />} {...props}>
        <TabbedShowLayout>
            <Tab label="summary">
                <h2>Product Kind Summary</h2>
                <TextField source="id" />
                <TextField source="name" />
                <ArrayField source="strains" sortable={false}>
                    <SingleFieldList>
                        <ChipField source="name" />
                    </SingleFieldList>
                </ArrayField>
                <ArrayField source="tags" sortable={false} labels="Effects">
                    <SingleFieldList>
                        <ChipField source="name" />
                    </SingleFieldList>
                </ArrayField>
                <ArrayField source="flavors" sortable={false}>
                    <SingleFieldList>
                        <ChipField source="name" />
                    </SingleFieldList>
                </ArrayField>
                <MarkDownField source="description_nl" />
                <TextField source="short_description_en" />
                <MarkDownField source="description_en" />
                <BooleanField source="c" />
                <BooleanField source="h" />
                <BooleanField source="i" />
                <BooleanField source="s" />
                <BooleanField source="complete" />
                <TextField source="images_amount" sortable={false} />
                <DateField source="created_at" />
                <DateField source="modified_at" />
                <BooleanField source="approved" />
                <DateField source="approved_at" />
            </Tab>
            <Tab label="Strains" path="kinds-to-strains">
                <h2>Strains</h2>
                <TextField source="name"/>
                <ReferenceManyField reference="kinds-to-strains" target="kind_id" addLabel={false}>
                    <Datagrid>
                        <ReferenceField source="strain_id" reference="strains">
                            <TextField source="name" />
                        </ReferenceField>
                        <EditButton />
                        <DeleteButton />
                    </Datagrid>
                </ReferenceManyField>
            </Tab>
            <Tab label="Effects" path="kinds-to-tags">
                <h2>Effects</h2>
                <TextField source="name"/>
                <ReferenceManyField reference="kinds-to-tags" target="kind_id" addLabel={false}>
                    <Datagrid>
                        <ReferenceField source="tag_id" reference="tags">
                            <TextField source="name" />
                        </ReferenceField>
                        <TextField source="amount"/>
                        <EditButton />
                        <DeleteButton />
                    </Datagrid>
                </ReferenceManyField>
            </Tab>
            <Tab label="Flavors" path="kinds-to-flavors">
                <h2>flavors</h2>
                <TextField source="name"/>
                <ReferenceManyField reference="kinds-to-flavors" target="kind_id" addLabel={false}>
                    <Datagrid>
                        <ReferenceField source="flavor_id" reference="flavors">
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

export const KindEdit = props => (
    <Edit title={<KindTitle />} {...props} redirect="show">
        <SimpleForm redirect="show">
            <DisabledInput source="id" />
            <TextInput source="name" fullWidth validate={required()} />
            <TextInput source="short_description_nl" fullWidth />
            <MarkdownInput source="description_nl" />
            <TextInput source="short_description_en" fullWidth />
            <MarkdownInput source="description_en" />
            <BooleanInput source="c" />
            <BooleanInput source="h" />
            <BooleanInput source="i" />
            <BooleanInput source="s" />
            <BooleanInput source="approved" />
        </SimpleForm>
    </Edit>
);

export const KindCreate = props => (
    <Create title="Create a Kind" {...props} redirect="show">
        <SimpleForm redirect="show">
            <TextInput source="name" fullWidth validate={required()} />
            <TextInput source="short_description_nl" fullWidth />
            <MarkdownInput source="description_nl" />
            <TextInput source="short_description_en" fullWidth />
            <MarkdownInput source="description_en" />
            <BooleanInput source="c" />
            <BooleanInput source="h" />
            <BooleanInput source="i" />
            <BooleanInput source="s" />
        </SimpleForm>
    </Create>
);
