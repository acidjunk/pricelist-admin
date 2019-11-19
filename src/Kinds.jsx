import React from "react";
import {
    ArrayField,
    Button,
    ChipField,
    Create,
    Datagrid,
    DisabledInput,
    Edit,
    EditButton,
    Link,
    List,
    ListButton,
    LongTextInput,
    BooleanField,
    BooleanInput,
    required,
    Show,
    SimpleForm,
    SimpleShowLayout,
    SingleFieldList,
    TextField,
    TextInput
} from "react-admin";
import {Add, SmokingRooms} from "@material-ui/icons";
import Typography from "@material-ui/core/Typography";
import ListItem from "@material-ui/core/ListItem";
import MaterialList from "@material-ui/core/List";
import CardActions from "@material-ui/core/CardActions";

export const KindIcon = SmokingRooms;

export const KindList = props => (
    <List {...props} sort={{ field: "name", order: "ASC" }}>
        <Datagrid rowClick="show">
            <TextField source="name" />
            <TextField source="short_description_nl" />
            <TextField source="short_description_en" />
            <ArrayField source="tags" sortable={false}>
                <SingleFieldList>
                    <ChipField source="name" />
                </SingleFieldList>
            </ArrayField>
            <ArrayField source="flavors" sortable={false}>
                <SingleFieldList>
                    <ChipField source="name" />
                </SingleFieldList>
            </ArrayField>
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
        label="Add a tag"
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
        label="Add a flavor"
    >
        <Add />
    </Button>
);

const KindShowActions = ({ basePath, data }) => (
    <CardActions>
        <ListButton basePath={basePath} />
        <EditButton basePath="/kinds" record={data} />
        <AddTagButton record={data} />
        <AddFlavorButton record={data} />
    </CardActions>
);

const ShowSide = ({ record }) => (
    <div style={{ width: 350, margin: "1em" }}>
        <Typography variant="title">Effects</Typography>
        {record && (
            <MaterialList>
                {record.tags.map(tag => (
                    <ListItem>
                        {tag.name}
                        <EditButton basePath="/kinds-to-tags" record={tag} />
                    </ListItem>
                ))}
            </MaterialList>
        )}
        {/*<CreateButton basePath="/kinds-to-tags" record={tag}/>*/}
        <Typography variant="title">Flavors</Typography>
        {record && (
            <MaterialList>
                {record.flavors.map(flavor => (
                    <ListItem>
                        {flavor.name}
                        <EditButton basePath="/kinds-to-flavors" record={flavor} />
                    </ListItem>
                ))}
            </MaterialList>
        )}
    </div>
);

export const KindShow = props => (
    <Show title={<KindTitle />} aside={<ShowSide />} actions={<KindShowActions />} {...props}>
        <SimpleShowLayout>
            <TextField source="id" />
            <TextField source="name" />
            <TextField source="short_description_nl" />
            <TextField source="description_nl" />
            <TextField source="short_description_en" />
            <TextField source="description_en" />
            <BooleanField source="c" />
            <BooleanField source="h" />
            <BooleanField source="i" />
            <BooleanField source="s" />
        </SimpleShowLayout>
    </Show>
);

export const KindEdit = props => (
    <Edit title={<KindTitle />} {...props}>
        <SimpleForm>
            <DisabledInput source="id" />
            <TextInput source="name" validate={required()} />
            <TextInput source="short_description_nl" />
            <LongTextInput source="description_nl" />
            <TextInput source="short_description_en" />
            <LongTextInput source="description_en" />
            <BooleanInput source="c" />
            <BooleanInput source="h" />
            <BooleanInput source="i" />
            <BooleanInput source="s" />
        </SimpleForm>
    </Edit>
);

export const KindCreate = props => (
    <Create title="Create a Kind" {...props}>
        <SimpleForm>
            <TextInput source="name" validate={required()} />
            <TextInput source="short_description_nl" />
            <LongTextInput source="description_nl" />
            <TextInput source="short_description_en" />
            <LongTextInput source="description_en" />
            <BooleanInput source="c" />
            <BooleanInput source="h" />
            <BooleanInput source="i" />
            <BooleanInput source="s" />
        </SimpleForm>
    </Create>
);
