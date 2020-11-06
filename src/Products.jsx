import CardActions from "@material-ui/core/CardActions";
import MaterialList from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Typography from "@material-ui/core/Typography";
import { Add, LocalDrink } from "@material-ui/icons";
import MarkdownInput from "ra-input-markdown";
import React from "react";
import {
    BooleanField,
    BooleanInput,
    Create,
    Datagrid,
    DateField,
    DeleteButton,
    DisabledInput,
    Edit,
    EditButton,
    Filter,
    List,
    ListButton,
    Pagination,
    Show,
    SimpleForm,
    SimpleShowLayout,
    TextField,
    TextInput,
    required
} from "react-admin";
import ReactMarkdown from "react-markdown/with-html";

export const ProductIcon = LocalDrink;

const productRowStyle = (record, index) => ({
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

const ProductFilter = props => (
    <Filter {...props}>
        <TextInput label="Search" source="q" alwaysOn />
        <BooleanInput source="complete" />
        <BooleanInput source="approved" />
    </Filter>
);

const ProductPagination = props => <Pagination rowsPerPageOptions={[10, 25, 50, 100]} {...props} />;

export const ProductList = props => (
    <List
        {...props}
        sort={{ field: "name", order: "ASC" }}
        filters={<ProductFilter />}
        pagination={<ProductPagination />}
        perPage={50}
    >
        <Datagrid rowClick="show" rowStyle={productRowStyle}>
            <TextField source="name" />
            <TextField source="short_description_nl" />
            <TextField source="short_description_en" />
            <TextField source="images_amount" sortable={false} />
            <BooleanField source="complete" />
            <BooleanField source="approved" />
            <DateField source="modified_at" />
        </Datagrid>
    </List>
);

const ProductTitle = ({ record }) => {
    return <span>Product {record ? `"${record.name}"` : ""}</span>;
};

const ProductShowActions = ({ basePath, data }) => (
    <CardActions>
        <ListButton basePath={basePath} />
        <EditButton basePath="/products" record={data} />
    </CardActions>
);

export const ProductShow = props => (
    <Show title={<ProductTitle />} actions={<ProductShowActions />} {...props}>
        <SimpleShowLayout>
            <TextField source="id" />
            <TextField source="name" />
            <TextField source="short_description_nl" />
            <MarkDownField source="description_nl" />
            <TextField source="short_description_en" />
            <MarkDownField source="description_en" />
            <BooleanField source="complete" />
            <TextField source="images_amount" sortable={false} />
            <DateField source="created_at" />
            <DateField source="modified_at" />
            <BooleanField source="approved" />
            <DateField source="approved_at" />
        </SimpleShowLayout>
    </Show>
);

export const ProductEdit = props => (
    <Edit title={<ProductTitle />} {...props} redirect="show">
        <SimpleForm redirect="show">
            <DisabledInput source="id" />
            <TextInput source="name" autoFocus fullWidth validate={required()} />
            <TextInput source="short_description_nl" fullWidth />
            <MarkdownInput source="description_nl" />
            <TextInput source="short_description_en" fullWidth />
            <MarkdownInput source="description_en" />
            <BooleanInput source="approved" />
        </SimpleForm>
    </Edit>
);

export const ProductCreate = props => (
    <Create title="Create a Product" {...props} redirect="show">
        <SimpleForm redirect="show">
            <TextInput source="name" autoFocus fullWidth validate={required()} />
            <TextInput source="short_description_nl" fullWidth />
            <MarkdownInput source="description_nl" />
            <TextInput source="short_description_en" fullWidth />
            <MarkdownInput source="description_en" />
        </SimpleForm>
    </Create>
);
